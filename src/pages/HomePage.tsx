import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, CheckCircle2, Layers, Map, Sparkles, Target } from 'lucide-react'
import { getPrimaryRoadmap, plannedRoadmaps } from '../data/library'
import { useProgress } from '../state/progress'

export function HomePage() {
  const roadmap = getPrimaryRoadmap()
  const { completeCount, roadmapProgress } = useProgress()

  if (!roadmap) return null

  const progress = roadmapProgress[roadmap.id]

  return (
    <div className="page-stack">
      <section className="hero-panel hero-home">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <div className="grid gap-5">
            <span className="eyebrow">
              <Sparkles className="h-4 w-4" />
              EasyRoadmaps
            </span>
            <div className="grid gap-4">
              <h1 className="font-display text-[clamp(2.2rem,5vw,4.4rem)] leading-[0.94] tracking-tight">
                Learn by levels, not lists.
              </h1>
              <p className="max-w-[68ch] text-base leading-7 text-[color:var(--muted)]">
                EasyRoadmaps turns hard subjects into guided learning paths. Start with System Design and move through focused lessons at your own pace.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to={`/roadmaps/${roadmap.slug}`} className="btn-primary">
                Explore System Design <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/roadmaps" className="btn-secondary">
                Browse roadmap library <Map className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            <article className="feature-panel feature-spotlight">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--muted)]">
                    Featured roadmap
                  </div>
                  <h2 className="mt-3 font-display text-3xl font-semibold">{roadmap.title}</h2>
                </div>
                <span className="brand-stamp">{roadmap.icon}</span>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="metric-card">
                  <div className="metric-label">Phases</div>
                  <div className="metric-value">{roadmap.stats.phaseCount}</div>
                </div>
                <div className="metric-card">
                  <div className="metric-label">Categories</div>
                  <div className="metric-value">{roadmap.stats.categoryCount}</div>
                </div>
                <div className="metric-card">
                  <div className="metric-label">Topics</div>
                  <div className="metric-value">{roadmap.stats.topicCount}</div>
                </div>
              </div>

              <div className="journey-board mt-6 p-5 text-white">
                <div className="mb-3 flex items-center justify-between text-sm text-white/72">
                  <span>Your progress</span>
                  <span>{progress?.pct ?? 0}%</span>
                </div>
                <div className="progress-track dark">
                  <div className="progress-fill" style={{ width: `${progress?.pct ?? 0}%` }} />
                </div>
                <div className="mt-3 text-sm text-white/72">
                  {progress?.done ?? 0} of {progress?.total ?? roadmap.stats.topicCount} topics complete.
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <article className="card feature-card p-6">
          <BookOpen className="h-5 w-5 text-[color:var(--accent)]" />
          <h3 className="mt-4 font-display text-2xl font-semibold">Focused lesson pages</h3>
          <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
            Every topic opens into a calm reading page built for learning, revision, and steady progress.
          </p>
        </article>

        <article className="card feature-card p-6">
          <Layers className="h-5 w-5 text-[color:var(--accent)]" />
          <h3 className="mt-4 font-display text-2xl font-semibold">Clear learning paths</h3>
          <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
            System Design is organized into clear phases and path stops so learners can see exactly where they are and what comes next.
          </p>
        </article>

        <article className="card feature-card p-6">
          <CheckCircle2 className="h-5 w-5 text-[color:var(--accent)]" />
          <h3 className="mt-4 font-display text-2xl font-semibold">Progress you can feel</h3>
          <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
            Keep moving through the roadmap with visible progress across lessons, categories, and the full journey.
          </p>
        </article>
      </section>

      <section className="card launch-panel p-7 md:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="grid gap-3">
            <span className="eyebrow subtle">
              <Target className="h-4 w-4" />
              Next on the platform
            </span>
            <h2 className="font-display text-3xl font-semibold">
              System Design is live. DSA is next.
            </h2>
            <p className="max-w-[64ch] text-sm leading-6 text-[color:var(--muted)]">
              More guided learning tracks will be added over time, starting with data structures and algorithms.
            </p>
          </div>
          <Link to="/roadmaps" className="btn-secondary">
            View all roadmaps <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {plannedRoadmaps.map((item) => (
            <div key={item.id} className="planned-card">
              <div className="status-pill status-planned">Planned</div>
              <h3 className="mt-4 font-display text-xl font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">{item.summary}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 text-sm text-[color:var(--muted)]">
          {completeCount} topics completed so far.
        </div>
      </section>
    </div>
  )
}
