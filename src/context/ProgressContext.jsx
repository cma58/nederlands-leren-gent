import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useAuth } from './AuthContext.jsx'
import { fetchJSON } from '../lib/api.js'
import {
  clearLegacyLearningState,
  hasLegacyLearningState,
  LEGACY_LEARNING_KEYS,
  readLegacyLearningState,
} from '../lib/legacyMigration.js'

const QUEUE_PREFIX = 'nl-gent:sync-queue:v2:'
const MIGRATION_PREFIX = 'nl-gent:migration-dismissed:v2:'
const ProgressContext = createContext(null)

function eventId() {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

function readQueue(userId) {
  try {
    return JSON.parse(localStorage.getItem(`${QUEUE_PREFIX}${userId}`)) || null
  } catch {
    return null
  }
}

function writeQueue(userId, payload) {
  try {
    localStorage.setItem(`${QUEUE_PREFIX}${userId}`, JSON.stringify(payload))
  } catch {
    // De UI blijft bruikbaar; syncstatus toont dat synchroniseren nog nodig is.
  }
}

function clearQueue(userId) {
  try {
    localStorage.removeItem(`${QUEUE_PREFIX}${userId}`)
  } catch {
    // Best-effort.
  }
}

function hydrateLocalPracticeState(reviewState = {}, speakingState = {}) {
  try {
    localStorage.setItem(LEGACY_LEARNING_KEYS.reviewState, JSON.stringify(reviewState))
    localStorage.setItem(LEGACY_LEARNING_KEYS.speakingState, JSON.stringify(speakingState))
  } catch {
    // Herhalingen blijven tijdens deze sessie bruikbaar waar opslag beschikbaar is.
  }
}

export function ProgressProvider({ children }) {
  const { user, isAuthenticated } = useAuth()
  const [completed, setCompleted] = useState({})
  const [syncStatus, setSyncStatus] = useState('idle')
  const [updatedAt, setUpdatedAt] = useState(null)
  const [legacyState, setLegacyState] = useState(null)

  const activeUser = isAuthenticated && user?.status === 'ACTIVE' ? user : null

  const persist = useCallback(
    async (payload) => {
      if (!activeUser?.id) return undefined
      const request = { ...payload, eventId: payload.eventId || eventId() }
      setSyncStatus('pending')
      try {
        const data = await fetchJSON('/api/progress', { method: 'PUT', body: request })
        clearQueue(activeUser.id)
        if (data.completed) setCompleted(data.completed)
        if (data.reviewState || data.speakingState) {
          hydrateLocalPracticeState(data.reviewState || {}, data.speakingState || {})
        }
        setUpdatedAt(data.updatedAt || new Date().toISOString())
        setSyncStatus('synced')
        return data
      } catch (error) {
        const queued = readQueue(activeUser.id) || {}
        writeQueue(activeUser.id, {
          ...queued,
          ...request,
          merge: queued.merge === true || request.merge === true,
          // De samengevoegde payload is nieuw. Zo hergebruiken we nooit een
          // eventId met andere inhoud wanneer een eerdere response verloren ging.
          eventId: eventId(),
        })
        setSyncStatus(navigator.onLine === false ? 'pending' : 'error')
        throw error
      }
    },
    [activeUser?.id],
  )

  useEffect(() => {
    let cancelled = false
    if (!activeUser?.id) {
      setCompleted({})
      setSyncStatus('idle')
      setUpdatedAt(null)
      setLegacyState(null)
      return undefined
    }

    const legacy = readLegacyLearningState()
    let dismissed = false
    try {
      dismissed = localStorage.getItem(`${MIGRATION_PREFIX}${activeUser.id}`) === '1'
    } catch {
      // Geen lokale opslag.
    }
    setLegacyState(!dismissed && hasLegacyLearningState(legacy) ? legacy : null)
    hydrateLocalPracticeState({}, {})

    setSyncStatus('loading')
    fetchJSON('/api/progress')
      .then((data) => {
        if (cancelled) return
        setCompleted(data.completed || {})
        hydrateLocalPracticeState(data.reviewState || {}, data.speakingState || {})
        setUpdatedAt(data.updatedAt || null)
        setSyncStatus('synced')
      })
      .catch(() => {
        if (cancelled) return
        const queued = readQueue(activeUser.id)
        setCompleted(queued?.completed || {})
        setSyncStatus(queued ? 'pending' : 'error')
      })

    return () => {
      cancelled = true
      hydrateLocalPracticeState({}, {})
    }
  }, [activeUser?.id])

  useEffect(() => {
    if (!activeUser?.id) return undefined
    const onLearningState = (event) => {
      const kind = event?.detail?.kind
      const state = event?.detail?.state
      if (!['reviewState', 'speakingState'].includes(kind) || !state) return
      persist({ [kind]: state }).catch(() => {})
    }
    window.addEventListener('nl-gent:learning-state-changed', onLearningState)
    return () => window.removeEventListener('nl-gent:learning-state-changed', onLearningState)
  }, [activeUser?.id, persist])

  useEffect(() => {
    if (!activeUser?.id) return undefined
    const flush = () => {
      const queued = readQueue(activeUser.id)
      if (queued) persist(queued).catch(() => {})
    }
    window.addEventListener('online', flush)
    flush()
    return () => window.removeEventListener('online', flush)
  }, [activeUser?.id, persist])

  const markDone = useCallback(
    (lessonId) => {
      setCompleted((previous) => {
        const next = { ...previous, [lessonId]: true }
        persist({ completed: next }).catch(() => {})
        return next
      })
    },
    [persist],
  )

  const toggle = useCallback(
    (lessonId) => {
      setCompleted((previous) => {
        const next = { ...previous }
        if (next[lessonId]) delete next[lessonId]
        else next[lessonId] = true
        persist({ completed: next }).catch(() => {})
        return next
      })
    },
    [persist],
  )

  const reset = useCallback(() => {
    setCompleted({})
    persist({ completed: {} }).catch(() => {})
  }, [persist])

  const importLegacy = useCallback(async () => {
    if (!legacyState || !activeUser?.id) return undefined
    const data = await persist({
      completed: legacyState.completed,
      reviewState: legacyState.reviewState,
      speakingState: legacyState.speakingState,
      merge: true,
      eventId: `legacy-v1:${activeUser.id}`,
    })
    clearLegacyLearningState()
    hydrateLocalPracticeState(data?.reviewState || legacyState.reviewState, data?.speakingState || legacyState.speakingState)
    try {
      localStorage.setItem(`${MIGRATION_PREFIX}${activeUser.id}`, '1')
    } catch {
      // De serverimport is al geslaagd.
    }
    setLegacyState(null)
    return data
  }, [activeUser?.id, legacyState, persist])

  const dismissLegacy = useCallback(() => {
    try {
      if (activeUser?.id) localStorage.setItem(`${MIGRATION_PREFIX}${activeUser.id}`, '1')
    } catch {
      // Geen lokale opslag.
    }
    setLegacyState(null)
  }, [activeUser?.id])

  const api = useMemo(
    () => ({
      completed,
      syncStatus,
      updatedAt,
      legacyState,
      importLegacy,
      dismissLegacy,
      isDone: (lessonId) => Boolean(completed[lessonId]),
      markDone,
      toggle,
      reset,
      ratioFor: (lessonIds) => {
        if (!lessonIds.length) return 0
        return lessonIds.filter((id) => completed[id]).length / lessonIds.length
      },
      countFor: (lessonIds) => lessonIds.filter((id) => completed[id]).length,
    }),
    [completed, dismissLegacy, importLegacy, legacyState, markDone, reset, syncStatus, toggle, updatedAt],
  )

  return <ProgressContext.Provider value={api}>{children}</ProgressContext.Provider>
}

export function useProgress() {
  const context = useContext(ProgressContext)
  if (!context) throw new Error('useProgress moet binnen <ProgressProvider> gebruikt worden')
  return context
}
