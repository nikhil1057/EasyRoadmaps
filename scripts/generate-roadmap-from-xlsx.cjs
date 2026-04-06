const fs = require('fs')
const x = require('xlsx')

const wb = x.readFile('system_design_roadmap_prefilled.xlsx')
const rows = x.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { defval: '' })

const slug = (s) =>
  String(s)
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const levelMap = { beg: 'beginner', int: 'intermediate', adv: 'advanced' }

const durationMap = {
  'Phase 0': '~1 week',
  'Phase 1': '~2 weeks',
  'Phase 2': '~1 week',
  'Phase 3': '~2 weeks',
  'Phase 4': '~2 weeks',
  'Phase 5': '~2 weeks',
  'Phase 6': '~1 week',
  'Phase 7': 'Ongoing',
}

const phaseOrder = ['Phase 0', 'Phase 1', 'Phase 2', 'Phase 3', 'Phase 4', 'Phase 5', 'Phase 6', 'Phase 7']
const phaseGroups = {}

for (const r of rows) {
  const phase = String(r['Phase'] || '').trim()
  if (!phase) continue
  if (!phaseGroups[phase]) {
    phaseGroups[phase] = { title: String(r['Phase Title'] || phase).trim(), modules: {} }
  }

  const moduleTitle = String(r['Module Title'] || 'Module').trim()
  const moduleTag = String(r['Module Tag'] || 'Module').trim()
  const moduleKey = `${moduleTag}||${moduleTitle}`
  if (!phaseGroups[phase].modules[moduleKey]) {
    phaseGroups[phase].modules[moduleKey] = { tag: moduleTag, title: moduleTitle, topics: [] }
  }

  const topic = String(r['Topic'] || '').trim()
  const lvlKey = String(r['Level'] || '').trim().toLowerCase()
  const level = levelMap[lvlKey] || 'intermediate'
  if (topic) {
    phaseGroups[phase].modules[moduleKey].topics.push({ name: topic, level })
  }
}

const phasesWithModules = phaseOrder
  .filter((phase) => phaseGroups[phase])
  .map((phase, phaseIdx) => {
    const phaseData = phaseGroups[phase]
    const phaseId = `p${phaseIdx}`
    const modules = Object.values(phaseData.modules).map((m, mi, arr) => {
      const moduleId = `m${mi + 1}-${slug(m.title)}`
      return {
        id: moduleId,
        tag: m.tag,
        color: mi % 3 === 0 ? '#5748b1' : mi % 3 === 1 ? '#2f6a45' : '#234f79',
        title: m.title,
        sources: ['Roadmap'],
        dependency: mi > 0 ? arr[mi - 1].title : null,
        topics: m.topics.map((t) => ({
          id: `${phaseId}.${moduleId}.${slug(t.name)}`,
          name: t.name,
          level: t.level,
          comingSoon: true,
          resources: [],
        })),
      }
    })
    const allTopics = modules.flatMap((m) => m.topics)
    return {
      id: phaseId,
      label: phase,
      title: phaseData.title,
      duration: durationMap[phase] || 'TBD',
      status: 'live',
      modulesCount: modules.length,
      summary: `${phaseData.title} with ${allTopics.length} topics across ${modules.length} modules.`,
      highlights: modules.slice(0, 10).map((m) => m.title),
      modules,
    }
  })

const out = `export type TopicLevel = 'beginner' | 'intermediate' | 'advanced'

export type ResourceType = 'article' | 'video' | 'book' | 'course' | 'doc' | 'repo' | 'practice'

export type Resource = {
  title: string
  url: string
  type?: ResourceType
  note?: string
}

export type Topic = {
  id: string
  name: string
  level: TopicLevel
  resources?: Resource[]
  comingSoon?: boolean
}

export type Module = {
  id: string
  tag: string
  color: string
  title: string
  sources: string[]
  dependency?: string | null
  topics: Topic[]
}

export type PhaseStatus = 'live' | 'preview' | 'planned'

export type Phase = {
  id: string
  label: string
  title: string
  duration: string
  status: PhaseStatus
  modulesCount: number
  summary: string
  highlights: string[]
}

export type PhaseWithModules = Phase & { modules: Module[] }

export const phasesWithModules: PhaseWithModules[] = ${JSON.stringify(phasesWithModules, null, 2)}

export const phases: Phase[] = phasesWithModules.map(({ modules, ...phase }) => phase)

export function getPhase(phaseId: string) {
  return phasesWithModules.find((p) => p.id === phaseId) ?? null
}

export function getPhaseModules(phaseId: string): Module[] {
  const found = phasesWithModules.find((p) => p.id === phaseId)
  return found ? [...found.modules] : []
}

export function allTopics() {
  return phasesWithModules.flatMap((phase) =>
    phase.modules.flatMap((module) => module.topics.map((topic) => ({ phase, module, topic }))),
  )
}

export function findTopicById(id: string) {
  return allTopics().find((x) => x.topic.id === id) ?? null
}
`

fs.writeFileSync('src/data/roadmap.ts', out)
console.log(`Generated ${phasesWithModules.length} phases from Excel.`)

