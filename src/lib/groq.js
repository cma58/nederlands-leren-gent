/**
 * Server-side Groq/Whisper adapter.
 *
 * De browser krijgt nooit een provider-sleutel. Hij stuurt uitsluitend de
 * opname naar onze eigen beveiligde route. De server kiest model, taal,
 * quotum en bewaartermijn. Het verwachte antwoord wordt bewust niet meegestuurd:
 * anders kan Whisper naar het antwoord toe worden gestuurd.
 */

const TRANSCRIBE_ENDPOINT = '/api/speech/transcribe'

/**
 * @param {Blob} audioBlob   De opgenomen audio (bv. audio/webm).
 * @param {number} durationMs Gemeten opnameduur; server gebruikt dit voor quota.
 * @param {string} [filename]
 * @returns {Promise<{text:string, confidence:number|null, noSpeechProbability:number|null, provider:string}>}
 */
export async function transcribeAudio(audioBlob, durationMs, filename = '') {
  if (!audioBlob?.size) {
    const error = new Error('GEEN_SPRAAK')
    error.status = 'nospeech'
    throw error
  }

  const type = audioBlob?.type || ''
  const ext = type.includes('mp4') || type.includes('m4a')
    ? 'm4a'
    : type.includes('ogg')
      ? 'ogg'
      : 'webm'
  const name = filename || `opname.${ext}`

  const form = new FormData()
  form.append('audio', audioBlob, name)
  form.append('durationMs', String(Math.max(250, Math.round(Number(durationMs) || 0))))

  let response
  try {
    response = await fetch(TRANSCRIBE_ENDPOINT, {
      method: 'POST',
      body: form,
      credentials: 'include',
      headers: { Accept: 'application/json' },
    })
  } catch (cause) {
    const error = new Error('NETWERK_FOUT')
    error.status = typeof navigator !== 'undefined' && navigator.onLine === false ? 'offline' : 'network'
    error.cause = cause
    throw error
  }

  const payload = await response.json().catch(() => ({}))
  if (!response.ok) {
    const error = new Error(payload?.code || payload?.error || `SPRAAK_API_${response.status}`)
    error.status = response.status
    throw error
  }

  const text = String(payload?.text || '').trim()
  if (!text) {
    const error = new Error('GEEN_SPRAAK')
    error.status = 'nospeech'
    throw error
  }
  return {
    text,
    confidence: numberOrNull(payload?.confidence),
    noSpeechProbability: numberOrNull(payload?.noSpeechProbability),
    provider: payload?.provider || 'groq-whisper',
  }
}

function numberOrNull(value) {
  if (value === null || value === undefined || value === '') return null
  const number = Number(value)
  return Number.isFinite(number) ? number : null
}
