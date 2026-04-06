import { useMemo, useState } from 'react'
import clsx from 'clsx'
import { Link, useParams } from 'react-router-dom'
import { ArrowRight, CheckCircle2, LockKeyhole, Search, Sparkles } from 'lucide-react'
import { getRoadmapBySlug } from '../data/library'
import { useProgress } from '../state/progress'

function previewTopics(topics: { title: string }[]) {
  return topics.slice(0, 3).map((topic) => topic.title)
}

export function RoadmapPage() {
  const { roadmapSlug = '' } = useParams()
  const roadmap = getRoadmapBySlug(roadmapSlug)
  const [query, setQuery] = useState('')
  const [phaseFilter, setPhaseFilter] = useState<string>('all')
  const { completed, toggleTopic, roadmapProgress, categoryProgress } = useProgress()

  if (!roadmap) {
    return (
      <div className="card p-8">
        <h1 className="font-display text-3xl font-semibold">Roadmap not found</h1>
        <p className="mt-3 max-w-[60ch] text-sm leading-6 text-[color:var(--muted)]">
          This roadmap does not exist in the current library yet.
        </p>
        <Link to="/roadmaps" className="btn-secondary mt-6">
          Back to library
        </Link>
      </div>
    )
  }

  const progress = roadmapProgress[roadmap.id]
  const normalizedQuery = query.trim().toLowerCase()

  const visiblePhases = useMemo(
    () =>
      roadmap.phases
        .filter((phase) => phaseFilter === 'all' || phase.id === phaseFilter)
        .map((phase) => {
          const categories = phase.categories
            .map((category) => {
              const topics = category.topics.filter((topic) => {
                if (!normalizedQuery) return true

                const haystack = [
                  topic.title,
                  topic.summary,
                  category.title,
                  category.label,
                  phase.title,
                  phase.label,
                ]
                  .join(' ')
                  .toLowerCase()

                return haystack.includes(normalizedQuery)
              })

              return { ...category, topics }
            })
            .filter((category) => category.topics.length > 0)

          return { ...phase, categories }
        })
        .filter((phase) => phase.categories.length > 0),
    [normalizedQuery, phaseFilter, roadmap.phases],
  )

  return (
    <div className="page-stack">
      <section className="hero-panel roadmap-hero">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr]">
          <div className="grid gap-4">
            <span className="eyebrow">
              <Sparkles className="h-4 w-4" />
              {roadmap.kicker}
            </span>
            <div className="grid gap-3">
              <h1 className="font-display text-[clamp(2.2rem,4.8vw,4rem)] leading-[0.96] tracking-tight">
                {roadmap.title}
              </h1>
              <p className="max-w-[64ch] text-base leading-7 text-[color:var(--muted)]">{roadmap.intro}</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="metric-card">
              <div className="metric-label">Phases</div>
              <div className="metric-value">{roadmap.stats.phaseCount}</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Path Stops</div>
              <div className="metric-value">{roadmap.stats.categoryCount}</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Topics</div>
              <div className="metric-value">{roadmap.stats.topicCount}</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Completed</div>
              <div className="metric-value">{progress?.done ?? 0}</div>
            </div>
          </div>
        </div>

        <div className="journey-board mt-8 p-5 text-white">
          <div className="mb-3 flex items-center justify-between text-sm text-white/72">
            <span>Journey progress</span>
            <span>{progress?.pct ?? 0}%</span>
          </div>
          <div className="progress-track dark">
            <div className="progress-fill" style={{ width: `${progress?.pct ?? 0}%` }} />
          </div>
          <div className="mt-3 text-sm text-white/72">
            {progress?.done ?? 0} of {progress?.total ?? roadmap.stats.topicCount} topics completed so far.
          </div>
        </div>
      </section>

      <section className="card filter-board p-6 md:p-7">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
          <label className="input-shell">
            <Search className="h-4 w-4 text-[color:var(--muted)]" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search topics or path stops"
              className="w-full bg-transparent text-sm outline-none placeholder:text-[color:var(--subtle)]"
            />
          </label>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setPhaseFilter('all')}
              className={clsx('filter-pill', phaseFilter === 'all' && 'active')}
            >
              Full path
            </button>
            {roadmap.phases.map((phase) => (
              <button
                key={phase.id}
                type="button"
                onClick={() => setPhaseFilter(phase.id)}
                className={clsx('filter-pill', phaseFilter === phase.id && 'active')}
              >
                {phase.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-8">
        {visiblePhases.map((phase) => (
          <article key={phase.id} className="phase-path">
            <div className="phase-heading">
              <div>
                <div className="section-kicker">{phase.label}</div>
                <h2 className="font-display text-[1.8rem] font-semibold">{phase.title}</h2>
                <div className="mt-2 text-sm font-semibold" style={{ color: phase.color }}>
                  {phase.meta}
                </div>
              </div>
              <p className="max-w-[68ch] text-sm leading-6 text-[color:var(--muted)]">{phase.summary}</p>
            </div>

            <div className="candy-path">
              <div className="candy-path-line" />
              <div className="grid gap-5">
                {phase.categories.map((category, index) => {
                  const categoryStats = categoryProgress[category.id]
                  const side = index % 2 === 0 ? 'left' : 'right'
                  const previews = previewTopics(category.topics)

                  return (
                    <section key={category.id} className={clsx('candy-stop-row', side)}>
                      <div className="candy-stop-spine">
                        <div className="candy-stop-badge" style={{ background: category.accent }}>
                          {index + 1}
                        </div>
                      </div>

                      <div className="candy-stop-card">
                        <div className="candy-stop-head">
                          <div className="grid gap-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="category-pill" style={{ background: category.accent }}>
                                {category.label}
                              </span>
                              <span className="ghost-chip">{category.topics.length} topics</span>
                              {category.dependency ? (
                                <span className="ghost-chip">
                                  <LockKeyhole className="h-3.5 w-3.5" />
                                  {category.dependency}
                                </span>
                              ) : null}
                            </div>
                            <h3 className="font-display text-[1.35rem] font-semibold">{category.title}</h3>
                            <p className="text-sm leading-6 text-[color:var(--muted)]">
                              {previews.join(' / ')}
                              {category.topics.length > 3 ? ' / more' : ''}
                            </p>
                          </div>

                          <div className="candy-stop-stats">
                            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
                              Progress
                            </div>
                            <div className="mt-2 flex items-center justify-between text-sm font-semibold">
                              <span>{categoryStats?.done ?? 0}/{categoryStats?.total ?? category.topics.length}</span>
                              <span>{categoryStats?.pct ?? 0}%</span>
                            </div>
                            <div className="mt-2 progress-track">
                              <div className="progress-fill" style={{ width: `${categoryStats?.pct ?? 0}%` }} />
                            </div>
                          </div>
                        </div>

                        <div className="mt-5 grid gap-3">
                          {category.topics.map((topic) => (
                            <div key={topic.id} className="path-topic-row">
                              <button
                                type="button"
                                onClick={() => toggleTopic(topic.id)}
                                className={clsx('topic-check', completed[topic.id] && 'checked')}
                                aria-label={`Toggle ${topic.title}`}
                              />

                              <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-center gap-2">
                                  <div className="font-semibold">{topic.title}</div>
                                  <span className={clsx('level-pill', topic.level)}>{topic.level}</span>
                                  {completed[topic.id] ? (
                                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[color:var(--success)]">
                                      <CheckCircle2 className="h-3.5 w-3.5" />
                                      Done
                                    </span>
                                  ) : null}
                                </div>
                                <p className="mt-1 text-sm leading-6 text-[color:var(--muted)]">{topic.summary}</p>
                              </div>

                              <Link to={`/roadmaps/${roadmap.slug}/topics/${topic.id}`} className="btn-secondary shrink-0 text-sm">
                                Open page <ArrowRight className="h-4 w-4" />
                              </Link>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>
                  )
                })}
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}
