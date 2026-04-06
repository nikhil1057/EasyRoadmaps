import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Clock3, Layers, Sparkles } from 'lucide-react'
import { plannedRoadmaps, roadmaps } from '../data/library'
import { useProgress } from '../state/progress'

export function RoadmapsPage() {
  const { roadmapProgress } = useProgress()

  return (
    <div className="page-stack">
      <section className="hero-panel hero-library">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <div className="grid gap-4">
            <span className="eyebrow">
              <Sparkles className="h-4 w-4" />
              Roadmap library
            </span>
            <div className="grid gap-3">
              <h1 className="font-display text-[clamp(2rem,4.4vw,3.9rem)] leading-[0.98] tracking-tight">
                One site for many roadmaps.
              </h1>
              <p className="max-w-[64ch] text-base leading-7 text-[color:var(--muted)]">
                EasyRoadmaps is designed as a clean learning product: visual roadmap journeys, topic reading pages, and room to expand into more tracks over time.
              </p>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-1">
            <div className="metric-card">
              <div className="metric-label">Live roadmaps</div>
              <div className="metric-value">{roadmaps.length}</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Planned next</div>
              <div className="metric-value">{plannedRoadmaps.length}</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Reading pages</div>
              <div className="metric-value">{roadmaps.reduce((sum, roadmap) => sum + roadmap.topics.length, 0)}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_320px]">
        {roadmaps.map((roadmap) => {
          const progress = roadmapProgress[roadmap.id]

          return (
            <article key={roadmap.id} className="roadmap-card">
              <div className="grid gap-4 lg:grid-cols-[minmax(0,1.35fr)_300px] lg:items-start">
                <div className="grid gap-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="brand-stamp">{roadmap.icon}</span>
                    <span className="status-pill status-live">Live roadmap</span>
                  </div>
                  <div className="grid gap-2">
                    <h2 className="font-display text-2xl font-semibold">{roadmap.title}</h2>
                    <p className="text-sm leading-6 text-[color:var(--muted)]">{roadmap.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Link to={`/roadmaps/${roadmap.slug}`} className="btn-primary">
                      Open roadmap <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>

                <div className="journey-board grid gap-3 p-4 text-white">
                  <div className="flex items-center justify-between text-sm text-white/72">
                    <span>Progress</span>
                    <span>{progress?.pct ?? 0}%</span>
                  </div>
                  <div className="progress-track dark">
                    <div className="progress-fill" style={{ width: `${progress?.pct ?? 0}%` }} />
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    <div className="mini-stat">
                      <BookOpen className="h-4 w-4" />
                      <div>
                        <div className="mini-stat-value">{roadmap.stats.topicCount}</div>
                        <div className="mini-stat-label">Topics</div>
                      </div>
                    </div>
                    <div className="mini-stat">
                      <Layers className="h-4 w-4" />
                      <div>
                        <div className="mini-stat-value">{roadmap.stats.categoryCount}</div>
                        <div className="mini-stat-label">Categories</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-white/60">
                    {progress?.done ?? 0} of {progress?.total ?? roadmap.stats.topicCount} topics completed so far.
                  </div>
                </div>
              </div>
            </article>
          )
        })}

        <aside className="card roadmap-aside p-6">
          <div className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--muted)]">
            <Clock3 className="h-4 w-4" />
            Planned roadmaps
          </div>
          <div className="grid gap-3">
            {plannedRoadmaps.map((roadmap) => (
              <div key={roadmap.id} className="planned-card">
                <div className="mb-2 status-pill status-planned">Planned</div>
                <h3 className="font-display text-lg font-semibold">{roadmap.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">{roadmap.summary}</p>
              </div>
            ))}
          </div>
        </aside>
      </section>
    </div>
  )
}
