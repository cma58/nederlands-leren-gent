/**
 * Voortgangs-snapshot: bundelt de drie localStorage-potjes van de lerende tot
 * één object, en berekent daaruit samenvattingen voor de admin-/coachpagina.
 *
 * BELANGRIJK: computeSummary werkt op een DOORGEGEVEN snapshot-object, niet op
 * de live localStorage — zo kan de echtgenoot een via de webhook opgehaalde
 * snapshot van zijn vrouw renderen op zijn eigen toestel.
 */
import curriculum from '../data/curriculum.js'
import { reviewableItems } from './review.js'

const KEYS = {
  progress: 'nl-gent:progress:v1',
  speak: 'nl-gent:speak:v1',
  review: 'nl-gent:review:v1',
}
// Losse datum: wanneer er voor het laatst een les afgerond werd (progress zelf
// bewaart geen datums). Gezet in ProgressContext bij markDone.
export const LAST_PRACTICED_KEY = 'nl-gent:lastPracticed:v1'

function readJSON(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || {}
  } catch {
    return {}
  }
}

function readStr(key) {
  try {
    return localStorage.getItem(key) || ''
  } catch {
    return ''
  }
}

/** Leest de lokale voortgang en bouwt een snapshot (een paar KB JSON). */
export function buildSnapshot() {
  return {
    v: 1,
    generatedAt: new Date().toISOString(),
    progress: readJSON(KEYS.progress),
    speak: readJSON(KEYS.speak),
    review: readJSON(KEYS.review),
    lastPracticed: readStr(LAST_PRACTICED_KEY),
  }
}

const todayStr = () => new Date().toISOString().slice(0, 10)

/** Heeft de lerende vandaag geoefend (les afgerond OF een woord geoefend)? */
export function practicedToday() {
  const t = todayStr()
  if (readStr(LAST_PRACTICED_KEY) === t) return true
  const has = (o) => Object.values(o || {}).some((v) => v && v.lastDate === t)
  return has(readJSON(KEYS.speak)) || has(readJSON(KEYS.review))
}
const nlFromKey = (k) => String(k).split('::').slice(1).join('::') || k

/**
 * Pure samenvatting op een snapshot-object.
 * @returns {object} overzichtsgegevens voor de UI (of null als leeg).
 */
export function computeSummary(snap) {
  if (!snap) return null
  const progress = snap.progress || {}
  const speak = snap.speak || {}
  const review = snap.review || {}

  // Per niveau / module afgerond
  const perLevel = curriculum.levels
    .slice()
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((lvl) => {
      const modules = lvl.modules.map((m) => {
        const ids = m.lessons.map((l) => l.id)
        const done = ids.filter((id) => progress[id]).length
        return { id: m.id, title: m.title, titleDarija: m.titleDarija, done, total: ids.length }
      })
      const ids = lvl.modules.flatMap((m) => m.lessons.map((l) => l.id))
      const done = ids.filter((id) => progress[id]).length
      return {
        id: lvl.id,
        title: lvl.title,
        subtitle: lvl.subtitle,
        icon: lvl.icon,
        accent: lvl.accent || 'gent',
        done,
        total: ids.length,
        modules,
      }
    })

  const allIds = curriculum.levels.flatMap((l) => l.modules.flatMap((m) => m.lessons.map((s) => s.id)))
  const doneTotal = allIds.filter((id) => progress[id]).length

  // Volgende aanbevolen les = eerste niet-afgeronde les in volgorde
  let nextLesson = null
  for (const lvl of curriculum.levels)
    for (const m of lvl.modules)
      for (const s of m.lessons)
        if (!progress[s.id] && !nextLesson) nextLesson = { id: s.id, title: s.title, titleDarija: s.titleDarija }

  // Beheerste woorden (spiegel van speakingProgress.isMastered)
  let mastered = 0
  for (const k of Object.keys(speak)) {
    const st = speak[k]
    if (st && st.good >= 2 && (st.goodDays?.length || 0) >= 2) mastered++
  }

  // Zwakke woorden: meer pogingen dan goede, of laatste = 'retry'
  const weak = Object.keys(speak)
    .map((k) => ({ word: nlFromKey(k), ...speak[k] }))
    .filter((s) => (s.attempts || 0) > (s.good || 0) || s.last === 'retry')
    .sort((a, b) => (b.attempts - b.good) - (a.attempts - a.good))
    .slice(0, 10)
    .map((s) => ({ word: s.word, attempts: s.attempts, good: s.good }))

  // Klaar om te herhalen: alle herhaalbare items uit afgeronde lessen die nieuw
  // of vervallen zijn (zelfde logica als het dashboard van de lerende).
  const t = todayStr()
  const reviewable = reviewableItems(curriculum, (id) => Boolean(progress[id]))
  const due = reviewable.filter((r) => {
    const s = review[r.key]
    return !s || (s.due || '') <= t
  }).length

  // Laatste activiteit + actieve dagen (laatste 30)
  const dates = []
  for (const k of Object.keys(speak)) if (speak[k]?.lastDate) dates.push(speak[k].lastDate)
  for (const k of Object.keys(review)) if (review[k]?.lastDate) dates.push(review[k].lastDate)
  if (snap.lastPracticed) dates.push(snap.lastPracticed)
  const lastActivity = dates.length ? dates.slice().sort().at(-1) : null
  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - 30)
  const activeDays = new Set(dates.filter((d) => new Date(d) >= cutoff)).size

  return {
    generatedAt: snap.generatedAt || null,
    overall: { done: doneTotal, total: allIds.length, ratio: allIds.length ? doneTotal / allIds.length : 0 },
    perLevel,
    nextLesson,
    mastered,
    weak,
    due,
    lastActivity,
    activeDays,
  }
}
