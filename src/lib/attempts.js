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

/**
 * Bewaart uitsluitend een onzekere spreekpoging tijdelijk voor menselijke
 * controle. De server verwijdert de audio na beoordeling of na zeven dagen.
 */
export async function recordSpeakingReview({ audioBlob, durationMs, lessonId, itemKey, expectedText, transcript, reason }) {
  const id = eventId()
  const type = audioBlob?.type || 'audio/webm'
  const extension = type.includes('mp4') || type.includes('m4a') ? 'm4a' : type.includes('ogg') ? 'ogg' : 'webm'
  const form = new FormData()
  form.append('eventId', id)
  form.append('lessonId', lessonId)
  form.append('itemKey', itemKey || '')
  form.append('expectedText', expectedText)
  form.append('transcript', transcript || '')
  form.append('reason', reason || 'SECOND_OPINION_UNAVAILABLE')
  form.append('durationMs', String(Math.max(250, Math.round(Number(durationMs) || 0))))
  form.append('audio', audioBlob, `controle.${extension}`)
  return fetchJSON('/api/speaking-reviews', { method: 'POST', body: form })
}
