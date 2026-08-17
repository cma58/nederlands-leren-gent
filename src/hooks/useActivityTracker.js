import { useEffect, useRef } from 'react'
import { useAuth } from '../context/AuthContext.jsx'

const HEARTBEAT_MS = 30_000
const IDLE_AFTER_MS = 90_000
const INTERACTION_EVENTS = ['pointerdown', 'keydown', 'touchstart', 'scroll']

function newSessionId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

/**
 * Meet alleen geschatte actieve leertijd. De server bepaalt hoeveel tijd wordt
 * toegekend; de browser meldt uitsluitend zichtbaarheid, recente interactie en
 * een oplopend volgnummer. Daardoor kan een open vergeten tab niet doortellen.
 */
export default function useActivityTracker() {
  const { isAuthenticated, user } = useAuth()
  const sessionIdRef = useRef(newSessionId())
  const sequenceRef = useRef(0)
  const lastInteractionRef = useRef(Date.now())
  const lastStateRef = useRef('hidden')

  useEffect(() => {
    if (!isAuthenticated || user?.status !== 'ACTIVE') return undefined

    const markInteraction = () => {
      lastInteractionRef.current = Date.now()
    }

    const currentState = () => {
      if (document.visibilityState !== 'visible' || !document.hasFocus()) return 'hidden'
      return Date.now() - lastInteractionRef.current <= IDLE_AFTER_MS ? 'active' : 'idle'
    }

    const send = (force = false, stateOverride = null) => {
      const state = stateOverride || currentState()
      if (!force && state !== 'active' && state === lastStateRef.current) return
      lastStateRef.current = state
      sequenceRef.current += 1

      const body = JSON.stringify({
        sessionId: sessionIdRef.current,
        sequence: sequenceRef.current,
        state,
      })

      fetch('/api/activity/heartbeat', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body,
        keepalive: state !== 'active',
      }).catch(() => {
        // Heartbeats zijn best-effort. We vullen gemiste tijd nooit offline aan.
      })
    }

    const onVisibility = () => send(true)
    const onPageHide = () => send(true, 'hidden')

    INTERACTION_EVENTS.forEach((eventName) =>
      window.addEventListener(eventName, markInteraction, { passive: true }),
    )
    window.addEventListener('focus', onVisibility)
    window.addEventListener('blur', onVisibility)
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('pagehide', onPageHide)

    markInteraction()
    send(true)
    const timer = window.setInterval(() => send(false), HEARTBEAT_MS)

    return () => {
      send(true, 'hidden')
      window.clearInterval(timer)
      INTERACTION_EVENTS.forEach((eventName) =>
        window.removeEventListener(eventName, markInteraction),
      )
      window.removeEventListener('focus', onVisibility)
      window.removeEventListener('blur', onVisibility)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pagehide', onPageHide)
    }
  }, [isAuthenticated, user?.status])
}
