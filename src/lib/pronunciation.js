/**
 * Eerlijk, in-app oordeel over de uitspraak.
 *
 * BELANGRIJK: dit oordeel komt NIET van een AI. We vergelijken hier zelf wat
 * Groq Whisper verstaan heeft met het verwachte woord/zin. Zo doen we geen
 * valse belofte dat een model elke klank perfect kan beoordelen — we meten
 * enkel of de leerling verstaanbaar was.
 *
 * Resultaat: 'good' | 'almost' | 'retry'
 */

/** Kleine letters, accenten en leestekens weg, spaties samengevoegd. */
export function normalize(s) {
  return (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^\p{L}\p{N}\s]/gu, '')
    .replace(/\s+/g, ' ')
    .trim()
}

/** Levenshtein-afstand (aantal bewerkingen tussen twee strings). */
function levenshtein(a, b) {
  const m = a.length
  const n = b.length
  if (!m) return n
  if (!n) return m
  const row = Array.from({ length: n + 1 }, (_, i) => i)
  for (let i = 1; i <= m; i++) {
    let prev = row[0]
    row[0] = i
    for (let j = 1; j <= n; j++) {
      const tmp = row[j]
      row[j] = Math.min(
        row[j] + 1, // verwijderen
        row[j - 1] + 1, // invoegen
        prev + (a[i - 1] === b[j - 1] ? 0 : 1), // vervangen
      )
      prev = tmp
    }
  }
  return row[n]
}

function similarity(a, b) {
  const d = levenshtein(a, b)
  return 1 - d / Math.max(a.length, b.length, 1)
}

/** Geaccepteerde transcripten voor dit item (uit de data of een terugval). */
export function acceptedFor(item) {
  const p = item.pronunciation
  const list = p?.acceptedTranscripts?.length ? p.acceptedTranscripts : [item.answer || item.nl]
  return list.map(normalize).filter(Boolean)
}

/** Bekende verwarringen (bv. het minimale paar) — leiden tot 'bijna goed'. */
export function confusionsFor(item) {
  const p = item.pronunciation
  const list = p?.commonConfusions?.length ? p.commonConfusions : item.pair ? [item.pair] : []
  return list.map(normalize).filter(Boolean)
}

function isSentence(target) {
  return normalize(target).split(' ').filter(Boolean).length >= 3
}

/**
 * Vergelijk wat Whisper verstond met het verwachte antwoord.
 * @param {object} item        Het lesitem (nl/answer/pair/pronunciation).
 * @param {string} transcript  Wat Groq Whisper verstond.
 * @returns {'good'|'almost'|'retry'}
 */
export function scoreTranscript(item, transcript) {
  const heard = normalize(transcript)
  if (!heard) return 'retry'

  const target = item.answer || item.nl || ''
  const accepted = acceptedFor(item)
  const confusions = confusionsFor(item)

  if (accepted.includes(heard)) return 'good'
  if (confusions.includes(heard)) return 'almost'

  if (isSentence(target)) {
    // Korte zin: dicht genoeg telt als goed/bijna, anders opnieuw.
    const sim = Math.max(...accepted.map((a) => similarity(heard, a)))
    if (sim >= 0.85) return 'good'
    if (sim >= 0.55) return 'almost'
    return 'retry'
  }

  // Los woord: streng, want vaak is juist de klinker het leerdoel.
  // Alleen een héél kleine afwijking (1 teken) geldt als 'bijna'.
  const best = Math.min(...accepted.map((a) => levenshtein(heard, a)))
  const targetLen = normalize(target).length
  if (best <= 1 && targetLen >= 4) return 'almost'
  return 'retry'
}

/** Tip uit de data (indien aanwezig), voor 'bijna'/'opnieuw'. */
export function tipsFor(item) {
  const p = item.pronunciation || {}
  return {
    tipNl: p.tipNl || item.tip || '',
    tipDarija: item.tipDarija || p.tipDarija || '',
    focus: p.focus || '',
  }
}
