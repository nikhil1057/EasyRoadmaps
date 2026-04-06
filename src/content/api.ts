import type { JSONContent } from '@tiptap/core'
import type { StoredTopicContent, TopicContentIndexItem, TopicRevisionItem } from './types'

function endpoint(path: string) {
  return path
}

async function readJson<T>(response: Response) {
  if (!response.ok) {
    const data = (await response.json().catch(() => null)) as { error?: string } | null
    throw new Error(data?.error || 'Request failed.')
  }

  return (await response.json()) as T
}

export async function fetchPublishedTopicContent(topicId: string) {
  const response = await fetch(endpoint(`/api/topic-page/${encodeURIComponent(topicId)}`))
  const data = await readJson<{ item: StoredTopicContent | null }>(response)
  return data.item
}

export async function fetchAdminTopicContentIndex() {
  const response = await fetch(endpoint('/api/admin/topic-page-index'))
  const data = await readJson<{ items: TopicContentIndexItem[] }>(response)
  return data.items
}

export async function fetchAdminTopicContent(topicId: string) {
  const response = await fetch(endpoint(`/api/admin/topic-page/${encodeURIComponent(topicId)}`))
  const data = await readJson<{ item: StoredTopicContent | null }>(response)
  return data.item
}

export async function fetchTopicPageRevisions(topicId: string) {
  const response = await fetch(endpoint(`/api/admin/topic-page/${encodeURIComponent(topicId)}/revisions`))
  const data = await readJson<{ items: TopicRevisionItem[] }>(response)
  return data.items
}

export async function saveAdminTopicContent(
  topicId: string,
  payload: {
    title: string
    summary: string
    contentHtml: string
    contentJson: JSONContent | null
  },
) {
  const response = await fetch(endpoint(`/api/admin/topic-page/${encodeURIComponent(topicId)}`), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  const data = await readJson<{ item: StoredTopicContent }>(response)
  return data.item
}

export async function publishAdminTopicContent(topicId: string) {
  const response = await fetch(endpoint(`/api/admin/topic-page/${encodeURIComponent(topicId)}/publish`), {
    method: 'POST',
  })

  const data = await readJson<{ item: StoredTopicContent }>(response)
  return data.item
}

export async function restoreTopicPageRevision(topicId: string, revisionId: number) {
  const response = await fetch(endpoint(`/api/admin/topic-page/${encodeURIComponent(topicId)}/revisions/${revisionId}/restore`), {
    method: 'POST',
  })

  const data = await readJson<{ item: StoredTopicContent }>(response)
  return data.item
}

export async function uploadAdminImage(file: File, topicId?: string) {
  const formData = new FormData()
  formData.append('file', file)
  if (topicId) formData.append('topicId', topicId)

  const response = await fetch(endpoint('/api/admin/uploads/image'), {
    method: 'POST',
    body: formData,
  })

  const data = await readJson<{ url: string }>(response)
  return data.url
}

