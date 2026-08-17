const MAX_STATE_BYTES = 500_000

export const LEGACY_LEARNING_KEYS = {
  completed: 'nl-gent:progress:v1',
  reviewState: 'nl-gent:review:v1',
  speakingState: 'nl-gent:speak:v1',
  lastPracticed: 'nl-gent:lastPracticed:v1',
}

const LEGACY_SECRET_KEYS = [
  'nl-gent:key:gemini',
  'nl-gent:key:groq',
  'google_sheet_webhook_url',
  'nl-gent:webhook:token',
  'nl-gent:coach:v1',
]

function safeObject(key) {
  try {
    const raw = localStorage.getItem(key)
    if (!raw || raw.length > MAX_STATE_BYTES) return {}
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {}
  } catch {
    return {}
  }
}

/** Lees uitsluitend de vier gekende leersleutels; nooit configuratie/secrets. */
export function readLegacyLearningState() {
  const completed = safeObject(LEGACY_LEARNING_KEYS.completed)
  const reviewState = safeObject(LEGACY_LEARNING_KEYS.reviewState)
  const speakingState = safeObject(LEGACY_LEARNING_KEYS.speakingState)
  let lastPracticed = null
  try {
    const value = localStorage.getItem(LEGACY_LEARNING_KEYS.lastPracticed)
    if (/^\d{4}-\d{2}-\d{2}$/.test(value || '')) lastPracticed = value
  } catch {
    // Geen lokale opslag beschikbaar.
  }
  return { completed, reviewState, speakingState, lastPracticed }
}

export function hasLegacyLearningState(state = readLegacyLearningState()) {
  return Boolean(
    Object.keys(state.completed).length ||
      Object.keys(state.reviewState).length ||
      Object.keys(state.speakingState).length ||
      state.lastPracticed,
  )
}

/** Alleen uitvoeren nadat de server de import bevestigd heeft. */
export function clearLegacyLearningState() {
  try {
    Object.values(LEGACY_LEARNING_KEYS).forEach((key) => localStorage.removeItem(key))
  } catch {
    // De geslaagde serverimport blijft geldig; lokale cleanup is best-effort.
  }
}

/** Browsergeheimen uit de privéversie mogen nooit naar een account migreren. */
export function purgeLegacySecrets() {
  try {
    LEGACY_SECRET_KEYS.forEach((key) => localStorage.removeItem(key))
  } catch {
    // Best-effort op browsers die opslag blokkeren.
  }
}
