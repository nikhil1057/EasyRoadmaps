import { useMemo, useEffect, useState } from 'react'
import clsx from 'clsx'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, Circle } from 'lucide-react'
import { TopicContentRenderer } from '../components/TopicContentRenderer'
import { fetchPublishedTopicContent } from '../content/api'
import type { StoredTopicContent } from '../content/types'
import { getAdjacentTopics, getRoadmapTopic } from '../data/library'
import { useProgress } from '../state/progress'

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function TopicPage() {
  const { roadmapSlug = '', topicId = '' } = useParams()
  const found = getRoadmapTopic(roadmapSlug, topicId)
  const { completed, toggleTopic } = useProgress()
  const [page, setPage] = useState<StoredTopicContent | null>(null)

  useEffect(() => {
    let active = true

    async function load() {
      const nextPage = await fetchPublishedTopicContent(topicId).catch(() => null)
      if (!active) return
      setPage(nextPage)
    }

    void load()

    return () => {
      active = false
    }
  }, [topicId])

  if (!found || !found.category || !found.phase) {
    return (
      <div className="card p-8">
        <h1 className="font-display text-3xl font-semibold">Topic not found</h1>
        <p className="mt-3 max-w-[60ch] text-sm leading-6 text-[color:var(--muted)]">
          That topic is not available in the current roadmap library.
        </p>
        <Link to="/roadmaps" className="btn-secondary mt-6">
          Back to library
        </Link>
      </div>
    )
  }

  const { roadmap, topic, category, phase } = found
  const { previous, next } = getAdjacentTopics(roadmap.slug, topic.id)
  const isDone = Boolean(completed[topic.id])

  const renderedContent = useMemo(() => {
    if (!page?.contentHtml) {
      return { html: '', headings: [] as { id: string; text: string }[] }
    }

    const parser = new DOMParser()
    const doc = parser.parseFromString(page.contentHtml, 'text/html')
    const usedIds = new Set<string>()
    const headings = Array.from(doc.body.querySelectorAll('h2, h3, h4')).map((node, index) => {
      const text = (node.textContent || '').trim()
      const baseId = slugify(text) || `section-${index + 1}`
      let id = baseId

      while (usedIds.has(id)) {
        id = `${baseId}-${usedIds.size + 1}`
      }

      usedIds.add(id)
      node.id = id

      return { id, text }
    })

    return { html: doc.body.innerHTML, headings: headings.filter((heading) => heading.text) }
  }, [page?.contentHtml])

  return (
    <div className="page-stack">
      <section className="topic-hero">
        <div className="grid gap-4">
          <div className="flex flex-wrap items-center gap-2 text-sm text-[color:var(--muted)]">
            <Link to={`/roadmaps/${roadmap.slug}`} className="crumb-link">
              <ArrowLeft className="h-3.5 w-3.5" />
              {roadmap.title}
            </Link>
            <span className="ghost-chip">{phase.label}</span>
            <span className="ghost-chip">{category.label}</span>
            <span className={clsx('level-pill', topic.level)}>{topic.level}</span>
          </div>

          <div className="grid gap-3">
            <h1 className="font-display topic-title">{topic.title}</h1>
            <p className="topic-summary">{topic.summary}</p>
          </div>

          <div className="topic-meta-row">
            <span>{phase.title}</span>
            <span>{category.title}</span>
            <span>{topic.readingTime}</span>
            {page?.publishedAt ? <span>Updated {new Date(page.publishedAt).toLocaleDateString()}</span> : null}
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => toggleTopic(topic.id)}
              className={clsx('btn-primary', isDone && 'done')}
            >
              {isDone ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
              {isDone ? 'Marked complete' : 'Mark as complete'}
            </button>
          </div>
        </div>
      </section>

      <div className="topic-layout">
        <article className="article-sheet lesson-sheet">
          {page?.contentHtml ? (
            <TopicContentRenderer html={renderedContent.html} />
          ) : (
            <section className="content-empty-state">
              <div className="section-kicker">Lesson</div>
              <h2 className="font-display text-2xl font-semibold">This lesson is coming soon.</h2>
              <p className="text-sm leading-7 text-[color:var(--muted)]">
                The topic is part of the roadmap already, and the full lesson will be published here soon.
              </p>
            </section>
          )}
        </article>

        <aside className="topic-sidebar">
          {renderedContent.headings.length ? (
            <section className="topic-sideblock">
              <div className="section-kicker">On this page</div>
              <div className="mt-4 grid gap-3">
                {renderedContent.headings.map((heading) => (
                  <a key={heading.id} href={`#${heading.id}`} className="topic-anchor-link">
                    {heading.text}
                  </a>
                ))}
              </div>
            </section>
          ) : null}

          <section className="topic-sideblock">
            <div className="section-kicker">Continue reading</div>
            <div className="mt-4 grid gap-3">
              {previous ? (
                <Link to={`/roadmaps/${roadmap.slug}/topics/${previous.id}`} className="topic-anchor-link">
                  {previous.title}
                </Link>
              ) : null}
              {next ? (
                <Link to={`/roadmaps/${roadmap.slug}/topics/${next.id}`} className="topic-anchor-link">
                  {next.title}
                </Link>
              ) : null}
            </div>
          </section>
        </aside>
      </div>
    </div>
  )
}
