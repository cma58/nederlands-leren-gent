/**
 * Herhaling (spaced repetition) — Leitner-systeem.
 *
 * Elk geleerd woord zit in een "box". Goed → hogere box en pas later terug;
 * fout → terug naar box 1 (morgen weer). Zo herhaalt de leerling vooral wat ze
 * bijna vergeet. Volledig lokaal (localStorage), geen API of internet nodig.
 *
 * Aparte opslag — raakt de lesvoortgang of het spreekonderdeel niet.
 */
import { shuffle } from './quiz.js'
import { lessonAudioId } from '../data/audioIds.js'

const KEY = 'nl-gent:review:v1'
// Dagen tot de volgende herhaling per box (box 1..6).
const INTERVALS = [1, 3, 7, 16, 30, 60]
// Lestypes die we NIET in de herhaling stoppen (uitspraak, geen meerkeuze).
// 'typing' overslaan: die woorden zitten al als vocab in de herhaling —
// niet dubbel opnemen.
const SKIP_TYPES = new Set(['speaking', 'listen', 'phonetics', 'typing'])

function ymd(d) {
  return d.toISOString().slice(0, 10)
}
function todayStr() {
  return ymd(new Date())
}
function inDays(days) {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return ymd(d)
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
        detail: { kind: 'reviewState', state: map },
      }),
    )
  } catch {
    /* opslag geweigerd — negeren */
  }
}

export function itemKey(lessonId, item, idx) {
  return `${lessonId}::${item?.nl ?? idx}`
}

/** Herhaalbare items uit AFGERONDE lessen: die met een Darija-vertaling of getal. */
export function reviewableItems(curriculum, isDone) {
  const out = []
  for (const lvl of curriculum.levels)
    for (const mod of lvl.modules)
      for (const les of mod.lessons) {
        if (!isDone(les.id) || SKIP_TYPES.has(les.type)) continue
        const seen = new Set()
        les.items.forEach((it, idx) => {
          if (!it.nl || seen.has(it.nl)) return
          const usable = Boolean(it.darijaLat) || (les.type === 'numbers' && typeof it.value === 'number')
          if (!usable) return
          seen.add(it.nl)
          out.push({ key: itemKey(les.id, it, idx), item: it, lessonType: les.type })
        })
      }
  return out
}

/** Items die vandaag klaarstaan om te herhalen (nieuw of vervallen). */
export function dueList(curriculum, isDone) {
  const state = loadAll()
  const t = todayStr()
  return reviewableItems(curriculum, isDone).filter((r) => {
    const s = state[r.key]
    return !s || (s.due || '') <= t
  })
}

export function dueCount(curriculum, isDone) {
  return dueList(curriculum, isDone).length
}

/**
 * Bouw een herhaalsessie (max N meerkeuzevragen) uit de klaarstaande items.
 * Richting wisselt: soms Darija → Nederlands, soms Nederlands → Darija.
 */
export function buildReviewSession(curriculum, isDone, max = 15) {
  const pool = reviewableItems(curriculum, isDone)
  const allNl = [...new Set(pool.map((r) => r.item.nl))]
  const allDar = [...new Set(pool.map((r) => r.item.darijaLat).filter(Boolean))]
  const due = shuffle(dueList(curriculum, isDone)).slice(0, max)

  const questions = []
  for (const r of due) {
    const it = r.item
    const toDarija = Boolean(it.darijaLat) && Math.random() < 0.5
    if (toDarija) {
      // Nederlands tonen → kies de Darija-vertaling.
      const distract = shuffle(allDar.filter((a) => a !== it.darijaLat)).slice(0, 3)
      questions.push({
        key: r.key,
        prompt: it.nl,
        promptRtl: false,
        answer: it.darijaLat,
        say: it.nl,
        audioId: it.audioId || lessonAudioId(it.nl),
        optionsRtl: false,
        options: shuffle([it.darijaLat, ...distract]),
      })
    } else {
      // Darija of getal tonen → kies het Nederlandse woord.
      const prompt = it.darijaLat || String(it.value)
      const distract = shuffle(allNl.filter((a) => a !== it.nl)).slice(0, 3)
      questions.push({
        key: r.key,
        prompt,
        promptRtl: false,
        answer: it.nl,
        say: it.nl,
        audioId: it.audioId || lessonAudioId(it.nl),
        optionsRtl: false,
        options: shuffle([it.nl, ...distract]),
      })
    }
  }
  return questions
}

/** Registreer een antwoord en plan de volgende herhaling. */
export function grade(key, correct) {
  const map = loadAll()
  const s = map[key] || { box: 0, due: null, last: null, lastDate: null }
  s.box = correct ? Math.min(s.box + 1, INTERVALS.length) : 1
  const interval = INTERVALS[s.box - 1] || 1
  s.due = inDays(interval)
  s.last = correct ? 'good' : 'again'
  s.lastDate = todayStr()
  map[key] = s
  saveAll(map)
  return s
}
