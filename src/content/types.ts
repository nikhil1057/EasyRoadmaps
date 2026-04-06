import type { JSONContent } from '@tiptap/core'

export type TopicPageStatus = 'draft' | 'published'

export type StoredTopicContent = {
  topicId: string
  title: string
  summary: string
  contentHtml: string
  contentJson: JSONContent | null
  status: TopicPageStatus
  updatedAt: string | null
  publishedAt: string | null
  hasContent: boolean
}

export type TopicContentIndexItem = {
  topicId: string
  title: string
  status: TopicPageStatus
  updatedAt: string | null
  publishedAt: string | null
}

export type TopicRevisionItem = {
  id: number
  topicId: string
  status: TopicPageStatus
  note: string | null
  createdAt: string
}
