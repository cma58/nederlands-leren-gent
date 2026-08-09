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
  const fallback = item.answer || item.nl || item.value
  const list = p?.acceptedTranscripts?.length ? p.acceptedTranscripts : [fallback]
  return list.map(normalize).filter(Boolean)
}

/** Bekende verwarringen (bv. het minimale paar) — leiden tot 'bijna goed'. */
export function confusionsFor(item) {
  const p = item.pronunciation
  const list = p?.commonConfusions?.length ? p.commonConfusions : item.pair ? [item.pair] : []
  return list.map(normalize).filter(Boolean)
}

function isSentence(target) {
  // Vanaf 2 woorden gebruiken we de vergevingsgezinde zin-vergelijking. Whisper
  // voegt bij korte uitdrukkingen ("Tot ziens") vaak een woordje/leesteken toe;
  // de strenge woord-tak zou dat onterecht als fout rekenen.
  return normalize(target).split(' ').filter(Boolean).length >= 2
}

/**
 * Varianten van wat gehoord werd, om veelvoorkomende Whisper-ruis bij LOSSE
 * woorden weg te denken vóór de vergelijking: een lidwoord ervoor ("de man")
 * of een meervouds-'s' erachter. Zo wordt een correct uitgesproken woord niet
 * afgekeurd omdat Whisper er een lidwoord bij verzon.
 */
function wordVariants(heard) {
  const set = new Set([heard])
  const noArticle = heard.replace(/^(de|het|een)\s+/, '')
  set.add(noArticle)
  for (const v of [heard, noArticle]) {
    if (v.length > 3 && v.endsWith('s')) set.add(v.slice(0, -1))
  }
  return [...set].filter(Boolean)
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

  const target = item.answer || item.nl || item.value || ''
  const accepted = acceptedFor(item)
  const confusions = confusionsFor(item)

  if (accepted.includes(heard)) return 'good'
  // Een bekende verwarring (bv. het minimale paar) is het leerdoel: blijf streng.
  if (confusions.includes(heard)) return 'almost'

  if (isSentence(target)) {
    // Korte zin: dicht genoeg telt als goed/bijna, anders opnieuw.
    const sim = Math.max(...accepted.map((a) => similarity(heard, a)))
    if (sim >= 0.85) return 'good'
    if (sim >= 0.55) return 'almost'
    return 'retry'
  }

  // Los woord. We denken eerst een toegevoegd lidwoord/meervouds-'s' weg (dat is
  // Whisper-ruis, geen uitspraakfout). Klopt het dan exact → goed.
  const variants = wordVariants(heard)
  if (variants.some((v) => accepted.includes(v))) return 'good'

  // Anders: hoe ver zit de beste variant van een geaccepteerd woord af?
  const best = Math.min(...accepted.flatMap((a) => variants.map((v) => levenshtein(v, a))))
  if (best === 0) return 'good'
  const maxLen = Math.max(...accepted.map((a) => a.length))
  // 1 teken verschil = 'bijna' (ook bij korte woorden — dit is meestal gewoon
  // transcriptieruis bij een correct uitgesproken kort woord, geen echte fout;
  // de échte leerdoel-fouten zitten al in de commonConfusions-lijst hierboven).
  if (best === 1) return 'almost'
  // Iets meer marge voor langere woorden.
  if (best === 2 && maxLen >= 6) return 'almost'
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
