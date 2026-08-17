import { fetchJSON } from './api.js'

function eventId() {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

/**
 * Registreert een pedagogisch relevante poging. Invoer, audio en vrije tekst
 * worden bewust niet meegestuurd; alleen compacte resultaten voor begeleiding.
 */
export async function recordLearningAttempt(attempt) {
  return fetchJSON('/api/attempts', {
    method: 'POST',
    body: { eventId: eventId(), ...attempt },
  })
}
