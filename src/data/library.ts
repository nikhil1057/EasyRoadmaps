import { systemDesignSource, type HtmlTopicLevel } from './systemDesignSource'

export type TopicLevel = 'beginner' | 'intermediate' | 'advanced'

export type ResourceType = 'article' | 'video' | 'book' | 'course' | 'doc' | 'repo' | 'practice'

export type Resource = {
  title: string
  url: string
  type?: ResourceType
  note?: string
}

export type TopicReadingSection = {
  id: string
  title: string
  body: string
}

export type TopicReading = {
  intro: string
  sections: TopicReadingSection[]
  takeaway: string
  draftNote: string
}

export type RoadmapTopic = {
  id: string
  slug: string
  title: string
  level: TopicLevel
  phaseId: string
  phaseLabel: string
  phaseTitle: string
  phaseMeta: string
  categoryId: string
  categorySlug: string
  categoryTitle: string
  categoryLabel: string
  summary: string
  readingTime: string
  resources: Resource[]
  content: TopicReading
  comingSoon: boolean
}

export type RoadmapCategory = {
  id: string
  slug: string
  title: string
  label: string
  phaseId: string
  phaseLabel: string
  phaseTitle: string
  accent: string
  dependency: string | null
  sources: string[]
  topics: RoadmapTopic[]
}

export type RoadmapPhase = {
  id: string
  label: string
  title: string
  meta: string
  color: string
  summary: string
  categories: RoadmapCategory[]
}

export type RoadmapStats = {
  phaseCount: number
  categoryCount: number
  topicCount: number
  beginnerCount: number
  intermediateCount: number
  advancedCount: number
}

export type Roadmap = {
  id: string
  slug: string
  title: string
  kicker: string
  description: string
  intro: string
  accent: string
  glow: string
  icon: string
  status: 'live' | 'planned'
  phases: RoadmapPhase[]
  categories: RoadmapCategory[]
  topics: RoadmapTopic[]
  stats: RoadmapStats
}

export type PlannedRoadmap = {
  id: string
  title: string
  summary: string
  status: 'planned'
}

const LEVEL_MAP: Record<HtmlTopicLevel, TopicLevel> = {
  beg: 'beginner',
  int: 'intermediate',
  adv: 'advanced',
}

const LEVEL_READING_TIME: Record<TopicLevel, string> = {
  beginner: '8 min read',
  intermediate: '12 min read',
  advanced: '16 min read',
}

const LEVEL_SUMMARY: Record<TopicLevel, string> = {
  beginner: 'Core foundation you should understand early.',
  intermediate: 'Important bridge topic for applying system design ideas.',
  advanced: 'Higher-leverage concept that builds on earlier fundamentals.',
}

function toSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function buildReading(topicTitle: string, categoryTitle: string, phaseTitle: string): TopicReading {
  return {
    intro: `This reading page is ready for your ${topicTitle} content. Use it to explain the concept, connect it to ${categoryTitle}, and show where it fits inside ${phaseTitle}.`,
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        body: `Add the plain-English explanation for ${topicTitle}. Start with the problem it solves and the vocabulary a learner should know before going deeper.`,
      },
      {
        id: 'core-ideas',
        title: 'Core Ideas',
        body: `Capture the main principles, mental models, and tradeoffs behind ${topicTitle}. Keep this section focused on the concepts you want readers to retain.`,
      },
      {
        id: 'practical-usage',
        title: 'Practical Usage',
        body: `Add examples, diagrams, or interview scenarios that show how ${topicTitle} appears in real systems and design discussions.`,
      },
      {
        id: 'pitfalls',
        title: 'Pitfalls and Edge Cases',
        body: `List common misunderstandings, limitations, and failure modes that someone should watch for when applying ${topicTitle}.`,
      },
    ],
    takeaway: `Close the page with the one idea you want a learner to remember about ${topicTitle}.`,
    draftNote: `Placeholder content is being shown for now. Replace these sections when you are ready to publish the full article for ${topicTitle}.`,
  }
}

const systemDesignPhases: RoadmapPhase[] = systemDesignSource.map((phase) => {
  const categories: RoadmapCategory[] = phase.modules.map((module) => {
    const categorySlug = `${phase.id}-${toSlug(module.title)}`
    const topics: RoadmapTopic[] = module.topics.map((topic) => {
      const level = LEVEL_MAP[topic.l]
      const topicSlug = toSlug(topic.t)

      return {
        id: `${phase.id}.${categorySlug}.${topicSlug}`,
        slug: topicSlug,
        title: topic.t,
        level,
        phaseId: phase.id,
        phaseLabel: phase.label,
        phaseTitle: phase.title,
        phaseMeta: phase.meta,
        categoryId: module.id,
        categorySlug,
        categoryTitle: module.title,
        categoryLabel: module.tag,
        summary: `${LEVEL_SUMMARY[level]} Category: ${module.title}.`,
        readingTime: LEVEL_READING_TIME[level],
        resources: [],
        content: buildReading(topic.t, module.title, phase.title),
        comingSoon: true,
      }
    })

    return {
      id: module.id,
      slug: categorySlug,
      title: module.title,
      label: module.tag,
      phaseId: phase.id,
      phaseLabel: phase.label,
      phaseTitle: phase.title,
      accent: module.tagColor,
      dependency: module.dep,
      sources: module.source,
      topics,
    }
  })

  return {
    id: phase.id,
    label: phase.label,
    title: phase.title,
    meta: phase.meta,
    color: phase.color,
    summary: phase.why,
    categories,
  }
})

const systemDesignCategories = systemDesignPhases.flatMap((phase) => phase.categories)
const systemDesignTopics = systemDesignCategories.flatMap((category) => category.topics)

const systemDesignStats: RoadmapStats = {
  phaseCount: systemDesignPhases.length,
  categoryCount: systemDesignCategories.length,
  topicCount: systemDesignTopics.length,
  beginnerCount: systemDesignTopics.filter((topic) => topic.level === 'beginner').length,
  intermediateCount: systemDesignTopics.filter((topic) => topic.level === 'intermediate').length,
  advancedCount: systemDesignTopics.filter((topic) => topic.level === 'advanced').length,
}

export const roadmaps: Roadmap[] = [
  {
    id: 'system-design',
    slug: 'system-design',
    title: 'System Design',
    kicker: 'A guided roadmap for interviews and real-world thinking',
    description:
      'A structured learning journey from computing foundations to full system design practice, organized into clear stages and reading-first topic pages.',
    intro:
      'Follow a guided path through foundations, low-level design, concurrency, distributed systems, and full design problems. Each stop opens into focused reading pages you can build out over time.',
    accent: '#cb5b37',
    glow: 'rgba(203, 91, 55, 0.18)',
    icon: 'SD',
    status: 'live',
    phases: systemDesignPhases,
    categories: systemDesignCategories,
    topics: systemDesignTopics,
    stats: systemDesignStats,
  },
]

export const plannedRoadmaps: PlannedRoadmap[] = [
    {
      id: 'dsa',
      title: 'DSA',
      summary: 'Data structures, algorithms, patterns, and guided interview practice.',
      status: 'planned',
    },
  ]

export function getRoadmapBySlug(slug: string) {
  return roadmaps.find((roadmap) => roadmap.slug === slug) ?? null
}

export function getPrimaryRoadmap() {
  return roadmaps[0] ?? null
}

export function getRoadmapTopic(roadmapSlug: string, topicId: string) {
  const roadmap = getRoadmapBySlug(roadmapSlug)
  if (!roadmap) return null

  const topic = roadmap.topics.find((entry) => entry.id === topicId)
  if (!topic) return null

  const category = roadmap.categories.find((entry) => entry.id === topic.categoryId) ?? null
  const phase = roadmap.phases.find((entry) => entry.id === topic.phaseId) ?? null

  return { roadmap, topic, category, phase }
}

export function getAdjacentTopics(roadmapSlug: string, topicId: string) {
  const roadmap = getRoadmapBySlug(roadmapSlug)
  if (!roadmap) return { previous: null, next: null }

  const index = roadmap.topics.findIndex((topic) => topic.id === topicId)
  if (index < 0) return { previous: null, next: null }

  return {
    previous: roadmap.topics[index - 1] ?? null,
    next: roadmap.topics[index + 1] ?? null,
  }
}
