import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, LogOut, Search, ShieldCheck } from 'lucide-react'
import { useAuth } from '../auth/AuthContext'
import { fetchAdminTopicContentIndex } from '../content/api'
import type { TopicContentIndexItem } from '../content/types'
import { getPrimaryRoadmap } from '../data/library'

export function StudioPage() {
  const roadmap = getPrimaryRoadmap()
  const { logout, user } = useAuth()
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState<TopicContentIndexItem[]>([])

  useEffect(() => {
    void fetchAdminTopicContentIndex().then(setIndex).catch(() => setIndex([]))
  }, [])

  const statusMap = useMemo(() => new Map(index.map((item) => [item.topicId, item])), [index])
  const normalizedQuery = query.trim().toLowerCase()

  if (!roadmap) return null

  const visibleTopics = roadmap.topics.filter((topic) => {
    if (!normalizedQuery) return true
    return [topic.title, topic.categoryTitle, topic.phaseTitle].join(' ').toLowerCase().includes(normalizedQuery)
  })

  return (
    <div className="page-stack">
      <section className="hero-panel admin-hero">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="grid gap-4">
            <span className="eyebrow subtle">
              <ShieldCheck className="h-4 w-4" />
              Admin workspace
            </span>
            <div className="grid gap-3">
              <h1 className="font-display text-[clamp(2.2rem,4.6vw,4.1rem)] leading-[0.94] tracking-tight">
                Write, save, and publish topic pages.
              </h1>
              <p className="max-w-[70ch] text-sm leading-7 text-[color:var(--muted)]">
                Signed in as {user?.email}. Manage lesson content for every System Design topic from one place.
              </p>
            </div>
          </div>

          <button type="button" onClick={() => void logout()} className="btn-secondary">
            <LogOut className="h-4 w-4" />
            Log out
          </button>
        </div>
      </section>

      <section className="card admin-search-card p-6 md:p-7">
        <label className="input-shell">
          <Search className="h-4 w-4 text-[color:var(--muted)]" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search topics"
            className="w-full bg-transparent text-sm outline-none placeholder:text-[color:var(--subtle)]"
          />
        </label>
      </section>

      <section className="grid gap-4">
        {visibleTopics.map((topic) => {
          const saved = statusMap.get(topic.id)
          const statusLabel = saved?.status === 'published' ? 'Published' : saved?.status === 'draft' ? 'Draft' : 'Unwritten'

          return (
            <article key={topic.id} className="card admin-topic-card p-5 md:p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="grid gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="ghost-chip">{topic.phaseLabel}</span>
                    <span className="ghost-chip">{topic.categoryLabel}</span>
                    <span className="ghost-chip">{topic.level}</span>
                    <span className={`status-pill ${saved?.status === 'published' ? 'status-live' : 'status-planned'}`}>{statusLabel}</span>
                  </div>
                  <h2 className="font-display text-2xl font-semibold">{topic.title}</h2>
                  <p className="text-sm leading-6 text-[color:var(--muted)]">{topic.summary}</p>
                  <div className="text-xs text-[color:var(--muted)]">
                    {saved?.updatedAt ? `Last saved ${new Date(saved.updatedAt).toLocaleString()}` : 'No saved content yet'}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link to={`/roadmaps/${roadmap.slug}/topics/${topic.id}`} className="btn-secondary">
                    View page
                  </Link>
                  <Link to={`/admin/${roadmap.slug}/${topic.id}`} className="btn-primary">
                    Open editor <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </article>
          )
        })}
      </section>
    </div>
  )
}
