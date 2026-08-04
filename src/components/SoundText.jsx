/**
 * Toont een Nederlands woord met de klanken die moeilijk zijn voor een
 * Darija/Arabisch-sprekende beginner in een accentkleur.
 *
 * Twee modes:
 *  - `mark` gegeven  → STERKE markering van precies die letter(s) (voor de
 *    klankparen, waar we exact weten welke klank telt).
 *  - geen `mark`     → automatische, SUBTIELE markering van moeilijke klanken.
 *
 * Enkel voor Nederlandse tekst gebruiken (niet voor Darija).
 */

// Moeilijke Nederlandse klanken voor een Darija-spreker. Volgorde = langste
// eerst, zodat 'sch' vóór 'ch' matcht en 'auw' vóór 'au'.
const HARD = [
  'auw', 'ouw', 'sch',
  'ch', 'ij', 'ei', 'ui', 'eu', 'oe', 'ie', 'au', 'ou', 'uu', 'aa', 'ee', 'oo',
  'g', 'v',
]

const STRONG = 'font-black text-saffraan-600 underline decoration-2 underline-offset-4'
const SUBTLE = 'text-saffraan-600'

/** Splits tekst in stukjes {hl, text}, met de moeilijke klanken gemarkeerd. */
function autoSegments(s) {
  const lower = s.toLowerCase()
  const segs = []
  let plain = ''
  let i = 0
  const flush = () => {
    if (plain) {
      segs.push({ hl: false, text: plain })
      plain = ''
    }
  }
  while (i < s.length) {
    const g = HARD.find((h) => lower.startsWith(h, i))
    if (g) {
      flush()
      segs.push({ hl: true, text: s.slice(i, i + g.length) })
      i += g.length
    } else {
      plain += s[i]
      i += 1
    }
  }
  flush()
  return segs
}

/** Alle voorkomens van `mark` sterk markeren. */
function markSegments(s, mark) {
  const lower = s.toLowerCase()
  const ml = mark.toLowerCase()
  const segs = []
  let from = 0
  let idx
  while ((idx = lower.indexOf(ml, from)) !== -1) {
    if (idx > from) segs.push({ hl: false, text: s.slice(from, idx) })
    segs.push({ hl: true, text: s.slice(idx, idx + ml.length) })
    from = idx + ml.length
  }
  if (from < s.length) segs.push({ hl: false, text: s.slice(from) })
  return segs
}

export default function SoundText({ text, mark }) {
  const s = String(text ?? '')
  if (!s) return null
  const strong = Boolean(mark)
  const segs = strong ? markSegments(s, String(mark)) : autoSegments(s)
  const cls = strong ? STRONG : SUBTLE
  return (
    <>
      {segs.map((seg, i) =>
        seg.hl ? (
          <span key={i} className={cls}>
            {seg.text}
          </span>
        ) : (
          <span key={i}>{seg.text}</span>
        ),
      )}
    </>
  )
}
