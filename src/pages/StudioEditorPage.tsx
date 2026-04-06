import { useEffect, useMemo, useState } from 'react'
import type { JSONContent } from '@tiptap/core'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, CheckCircle2, RotateCcw, Save } from 'lucide-react'
import {
  fetchAdminTopicContent,
  fetchTopicPageRevisions,
  publishAdminTopicContent,
  restoreTopicPageRevision,
  saveAdminTopicContent,
  uploadAdminImage,
} from '../content/api'
import type { StoredTopicContent, TopicRevisionItem } from '../content/types'
import { RichTopicEditor } from '../components/RichTopicEditor'
import { getRoadmapTopic } from '../data/library'

export function StudioEditorPage() {
  const { roadmapSlug = '', topicId = '' } = useParams()
  const found = getRoadmapTopic(roadmapSlug, topicId)
  const [page, setPage] = useState<StoredTopicContent | null>(null)
  const [draftHtml, setDraftHtml] = useState('<p></p>')
  const [draftJson, setDraftJson] = useState<JSONContent | null>(null)
  const [editorKey, setEditorKey] = useState(`editor-${topicId}`)
  const [revisions, setRevisions] = useState<TopicRevisionItem[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const [status, setStatus] = useState('')

  useEffect(() => {
    let active = true

    async function load() {
      const [nextPage, nextRevisions] = await Promise.all([
        fetchAdminTopicContent(topicId).catch(() => null),
        fetchTopicPageRevisions(topicId).catch(() => []),
      ])

      if (!active) return

      setPage(nextPage)
      setDraftHtml(nextPage?.contentHtml || '<p></p>')
      setDraftJson(nextPage?.contentJson || null)
      setRevisions(nextRevisions)
      setEditorKey(`editor-${topicId}-${nextPage?.updatedAt || 'new'}`)
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
        <Link to="/admin" className="btn-secondary mt-6">
          Back to admin
        </Link>
      </div>
    )
  }

  const { roadmap, topic, category, phase } = found
  const statusPillClass = page?.status === 'published' ? 'status-live' : 'status-planned'
  const statusLabel = page?.status === 'published' ? 'Published' : page?.hasContent ? 'Draft' : 'Unwritten'

  async function reloadMeta() {
    const [nextPage, nextRevisions] = await Promise.all([
      fetchAdminTopicContent(topicId).catch(() => null),
      fetchTopicPageRevisions(topicId).catch(() => []),
    ])

    setPage(nextPage)
    setRevisions(nextRevisions)
    if (nextPage) {
      setDraftHtml(nextPage.contentHtml || '<p></p>')
      setDraftJson(nextPage.contentJson || null)
      setEditorKey(`editor-${topicId}-${nextPage.updatedAt || 'saved'}`)
    }
  }

  async function handleSave() {
    setIsSaving(true)
    setStatus('')

    try {
      const saved = await saveAdminTopicContent(topic.id, {
        title: topic.title,
        summary: topic.summary,
        contentHtml: draftHtml,
        contentJson: draftJson,
      })
      setPage(saved)
      setStatus('Draft saved.')
      await reloadMeta()
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Save failed.')
    } finally {
      setIsSaving(false)
    }
  }

  async function handlePublish() {
    setIsPublishing(true)
    setStatus('')

    try {
      await saveAdminTopicContent(topic.id, {
        title: topic.title,
        summary: topic.summary,
        contentHtml: draftHtml,
        contentJson: draftJson,
      })
      const published = await publishAdminTopicContent(topic.id)
      setPage(published)
      setStatus('Published successfully.')
      await reloadMeta()
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Publish failed.')
    } finally {
      setIsPublishing(false)
    }
  }

  async function handleRestoreRevision(revisionId: number) {
    setStatus('')

    try {
      const restored = await restoreTopicPageRevision(topic.id, revisionId)
      setPage(restored)
      setDraftHtml(restored.contentHtml || '<p></p>')
      setDraftJson(restored.contentJson || null)
      setStatus('Revision restored as draft.')
      await reloadMeta()
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Restore failed.')
    }
  }

  const revisionSummary = useMemo(() => revisions.slice(0, 5), [revisions])

  return (
    <div className="page-stack">
      <section className="hero-panel admin-editor-hero">
        <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="grid gap-4">
            <div className="flex flex-wrap items-center gap-2 text-sm text-[color:var(--muted)]">
              <Link to="/admin" className="crumb-link">
                <ArrowLeft className="h-3.5 w-3.5" />
                Admin
              </Link>
              <span className="ghost-chip">{phase.label}</span>
              <span className="ghost-chip">{category.label}</span>
              <span className={`status-pill ${statusPillClass}`}>{statusLabel}</span>
            </div>

            <div className="grid gap-3">
              <h1 className="font-display text-[clamp(2.2rem,4.2vw,3.6rem)] leading-[0.96] tracking-tight">{topic.title}</h1>
              <p className="max-w-[76ch] text-sm leading-7 text-[color:var(--muted)]">{topic.summary}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={handleSave} className="btn-secondary" disabled={isSaving || isPublishing}>
              <Save className="h-4 w-4" />
              {isSaving ? 'Saving...' : 'Save draft'}
            </button>
            <button type="button" onClick={handlePublish} className="btn-primary" disabled={isSaving || isPublishing}>
              <CheckCircle2 className="h-4 w-4" />
              {isPublishing ? 'Publishing...' : 'Publish'}
            </button>
            <Link to={`/roadmaps/${roadmap.slug}/topics/${topic.id}`} className="btn-secondary">
              <ArrowUpRight className="h-4 w-4" />
              View live page
            </Link>
          </div>
        </div>

        {status ? <div className="admin-status-note mt-5 inline-flex px-4 py-2 text-sm">{status}</div> : null}
      </section>

      <div className="topic-layout topic-layout-editing">
        <article className="article-sheet topic-editor-sheet admin-editor-sheet">
          <div className="grid gap-5">
            <div className="grid gap-2">
              <div className="section-kicker">Lesson editor</div>
              <h2 className="font-display text-2xl font-semibold">Write the topic as one continuous page.</h2>
              <p className="text-sm leading-7 text-[color:var(--muted)]">
                Paste text directly into the editor, drag or upload images, and save the full page as a draft before publishing.
              </p>
            </div>

            <RichTopicEditor
              key={editorKey}
              initialContentHtml={page?.contentHtml || '<p></p>'}
              initialContentJson={page?.contentJson || null}
              placeholder="Start writing this lesson. Paste content directly, add headings naturally, and drag images into the page."
              onChange={({ contentHtml, contentJson }) => {
                setDraftHtml(contentHtml)
                setDraftJson(contentJson)
              }}
              onUploadImage={(file) => uploadAdminImage(file, topic.id)}
            />
          </div>
        </article>

        <aside className="topic-sidebar">
          <section className="topic-sideblock">
            <div className="section-kicker">Status</div>
            <div className="topic-editor-stats">
              <span>{statusLabel}</span>
              <span>{page?.updatedAt ? `Last saved ${new Date(page.updatedAt).toLocaleString()}` : 'No saved draft yet'}</span>
              <span>{page?.publishedAt ? `Published ${new Date(page.publishedAt).toLocaleString()}` : 'Not published yet'}</span>
            </div>
          </section>

          <section className="topic-sideblock">
            <div className="section-kicker">Recent revisions</div>
            <div className="mt-4 grid gap-3">
              {revisionSummary.length ? (
                revisionSummary.map((revision) => (
                  <div key={revision.id} className="revision-card">
                    <div className="text-sm font-semibold">{revision.note || revision.status}</div>
                    <div className="mt-1 text-xs text-[color:var(--muted)]">{new Date(revision.createdAt).toLocaleString()}</div>
                    <button type="button" onClick={() => void handleRestoreRevision(revision.id)} className="btn-secondary mt-3 text-sm">
                      <RotateCcw className="h-4 w-4" />
                      Restore as draft
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-sm leading-6 text-[color:var(--muted)]">Revisions will appear here after the first save.</div>
              )}
            </div>
          </section>
        </aside>
      </div>
    </div>
  )
}




