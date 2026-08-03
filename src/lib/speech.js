/**
 * Browser-native Text-to-Speech (Web Speech API).
 * Leest Nederlandse tekst voor, bij voorkeur met een Vlaamse (nl-BE) stem.
 * Geen externe kosten of API-sleutels nodig.
 *
 * Robuust gemaakt voor telefoons:
 *  - wacht tot de stemmen geladen zijn voordat er gesproken wordt;
 *  - vermijdt de bekende Chrome-bug waarbij cancel() vlak vóór speak() de
 *    spraak laat wegvallen (we annuleren enkel als er echt iets speelt);
 *  - een resume()-nudge tegen het "hangen" van spraak in Chrome.
 */

let cachedVoice = null

/** Alle beschikbare stemmen (kan leeg zijn tot ze asynchroon geladen zijn). */
function getVoices() {
  return window.speechSynthesis?.getVoices?.() ?? []
}

/** Kies de beste beschikbare Nederlandse stem (Vlaams eerst). */
function pickDutchVoice() {
  const voices = getVoices()
  if (!voices.length) return null
  if (cachedVoice && voices.includes(cachedVoice)) return cachedVoice
  cachedVoice =
    voices.find((v) => v.lang === 'nl-BE') ||
    voices.find((v) => v.lang === 'nl-NL') ||
    voices.find((v) => v.lang?.toLowerCase().startsWith('nl')) ||
    null
  return cachedVoice
}

// Stemmen laden vaak asynchroon in — cache dan opnieuw opbouwen.
if (typeof window !== 'undefined' && window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoice = null
    pickDutchVoice()
  }
  // Trigger het laden.
  getVoices()
}

/** Is voorlezen beschikbaar in deze browser? */
export function isTTSAvailable() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

/** Is er een Nederlandse stem beschikbaar op dit toestel? */
export function hasDutchVoice() {
  return Boolean(pickDutchVoice())
}

/**
 * Lees een tekst voor in het Nederlands.
 * @param {string} text
 * @param {{ rate?: number, lang?: string }} [opts]
 */
export function speak(text, opts = {}) {
  if (!isTTSAvailable() || !text) return
  const synth = window.speechSynthesis

  const utter = () => {
    // Enkel annuleren als er echt iets speelt (blind cancel() breekt spraak
    // op sommige Android-browsers).
    if (synth.speaking || synth.pending) synth.cancel()

    const u = new SpeechSynthesisUtterance(text)
    u.lang = opts.lang || 'nl-BE'
    u.rate = opts.rate ?? 0.9 // iets trager voor beginners
    const voice = pickDutchVoice()
    if (voice) {
      u.voice = voice
      u.lang = voice.lang // laat lang overeenkomen met de stem
    }
    synth.speak(u)
    // Chrome laat spraak soms 'hangen'; een resume() helpt.
    try {
      synth.resume()
    } catch {
      /* negeren */
    }
  }

  // Als de stemmen nog niet geladen zijn: even wachten, dan spreken.
  if (!getVoices().length && typeof synth.addEventListener === 'function') {
    let done = false
    const run = () => {
      if (done) return
      done = true
      cachedVoice = null
      utter()
    }
    synth.addEventListener('voiceschanged', run, { once: true })
    setTimeout(run, 300) // terugval als het event niet vuurt
  } else {
    utter()
  }
}
