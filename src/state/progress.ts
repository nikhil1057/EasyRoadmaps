import { useCallback, useEffect, useMemo, useState } from 'react'
import { roadmaps } from '../data/library'

const STORAGE_KEY = 'easyroadmaps_progress_v1'

type ProgressState = Record<string, boolean>

function readInitial(): ProgressState {
  if (typeof window === 'undefined') return {}
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as ProgressState
    return parsed ?? {}
  } catch {
    return {}
  }
}

export function useProgress() {
  const [completed, setCompleted] = useState<ProgressState>(readInitial)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(completed))
  }, [completed])

  const toggleTopic = useCallback((topicId: string) => {
    setCompleted((prev) => ({ ...prev, [topicId]: !prev[topicId] }))
  }, [])

  const completeCount = useMemo(() => Object.values(completed).filter(Boolean).length, [completed])

  const roadmapProgress = useMemo(() => {
    return Object.fromEntries(
      roadmaps.map((roadmap) => {
        const total = roadmap.topics.length
        const done = roadmap.topics.filter((topic) => completed[topic.id]).length
        const pct = total ? Math.round((done / total) * 100) : 0
        return [roadmap.id, { done, total, pct }]
      }),
    ) as Record<string, { done: number; total: number; pct: number }>
  }, [completed])

  const phaseProgress = useMemo(() => {
    const phases = roadmaps.flatMap((roadmap) => roadmap.phases)

    return Object.fromEntries(
      phases.map((phase) => {
        const topics = phase.categories.flatMap((category) => category.topics)
        const total = topics.length
        const done = topics.filter((topic) => completed[topic.id]).length
        const pct = total ? Math.round((done / total) * 100) : 0
        return [phase.id, { done, total, pct }]
      }),
    ) as Record<string, { done: number; total: number; pct: number }>
  }, [completed])

  const categoryProgress = useMemo(() => {
    const categories = roadmaps.flatMap((roadmap) => roadmap.categories)

    return Object.fromEntries(
      categories.map((category) => {
        const total = category.topics.length
        const done = category.topics.filter((topic) => completed[topic.id]).length
        const pct = total ? Math.round((done / total) * 100) : 0
        return [category.id, { done, total, pct }]
      }),
    ) as Record<string, { done: number; total: number; pct: number }>
  }, [completed])

  return { completed, toggleTopic, completeCount, roadmapProgress, phaseProgress, categoryProgress }
}
