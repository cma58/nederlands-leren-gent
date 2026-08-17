/**
 * Voortgang van het spreekonderdeel — apart van de gewone lesvoortgang.
 *
 * Per woord/zin bewaren we alleen:
 *   attempts   – aantal pogingen
 *   good       – aantal goede pogingen
 *   last       – laatste resultaat ('good'|'almost'|'retry')
 *   lastDate   – datum laatste poging (YYYY-MM-DD)
 *   goodDays   – dagen met een goede poging (max 3 bewaard)
 *
 * Een woord is pas "beheerst" na ≥2 goede pogingen waarvan er minstens één op
 * een ándere dag was (dus goede pogingen op ≥2 verschillende dagen).
 */

const KEY = 'nl-gent:speak:v1'

function today() {
  return new Date().toISOString().slice(0, 10)
}

function loadAll() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {}
  } catch {
    return {}
  }
}

function saveAll(map) {
  try {
    localStorage.setItem(KEY, JSON.stringify(map))
    window.dispatchEvent(
      new CustomEvent('nl-gent:learning-state-changed', {
        detail: { kind: 'speakingState', state: map },
      }),
    )
  } catch {
    /* opslag geweigerd — negeren */
  }
}

/** Sleutel per lesitem. */
export function itemKey(lessonId, item, index) {
  return `${lessonId}::${item?.nl ?? index}`
}

function blank() {
  return { attempts: 0, good: 0, last: null, lastDate: null, goodDays: [] }
}

export function getStats(id) {
  return loadAll()[id] || blank()
}

export function isMastered(id) {
  const s = loadAll()[id]
  return Boolean(s) && s.good >= 2 && (s.goodDays?.length || 0) >= 2
}

/** Registreer één poging en geef de bijgewerkte statistiek terug. */
export function recordAttempt(id, result) {
  const map = loadAll()
  const s = map[id] || blank()
  const day = today()
  s.attempts += 1
  s.last = result
  s.lastDate = day
  if (result === 'good') {
    s.good += 1
    if (!s.goodDays.includes(day)) {
      s.goodDays.push(day)
      if (s.goodDays.length > 3) s.goodDays = s.goodDays.slice(-3)
    }
  }
  map[id] = s
  saveAll(map)
  return s
}
