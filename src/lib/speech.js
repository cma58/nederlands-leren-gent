/**
 * Text-to-Speech (voorlezen).
 *
 * Twee bronnen, automatisch gekozen:
 *  1) De NATIVE stem van het toestel (Web Speech API) als er een Nederlandse
 *     stem geïnstalleerd is — beste kwaliteit, werkt offline, gratis.
 *  2) Een ONLINE Nederlandse stem als het toestel géén Nederlandse stem heeft
 *     (bv. een telefoon met enkel Franse/Arabische stemmen). Zo werkt het
 *     voorlezen op élk toestel, zonder iets te moeten installeren.
 *     (De online stem heeft wel internet nodig; de lessen zelf blijven offline.)
 */

let cachedVoice = null
let currentAudio = null // lopende online-audio, zodat we kunnen stoppen

function getVoices() {
  return window.speechSynthesis?.getVoices?.() ?? []
}

/** Kies de beste beschikbare Nederlandse telefoonstem (Vlaams eerst). */
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

if (typeof window !== 'undefined' && window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoice = null
    pickDutchVoice()
  }
  getVoices()
}

/** Voorlezen is altijd mogelijk: native óf online. */
export function isTTSAvailable() {
  return typeof window !== 'undefined'
}

/** Heeft dit toestel een Nederlandse telefoonstem? */
export function hasDutchVoice() {
  return Boolean(pickDutchVoice())
}

/** Stop alle lopende spraak (native + online). */
function stopAll() {
  try {
    if (window.speechSynthesis && (window.speechSynthesis.speaking || window.speechSynthesis.pending)) {
      window.speechSynthesis.cancel()
    }
  } catch {
    /* negeren */
  }
  if (currentAudio) {
    try {
      currentAudio.pause()
    } catch {
      /* negeren */
    }
    currentAudio = null
  }
}

/** Spreek via de native stem van het toestel. */
function speakNative(text, opts) {
  const synth = window.speechSynthesis
  const u = new SpeechSynthesisUtterance(text)
  const voice = pickDutchVoice()
  if (voice) {
    u.voice = voice
    u.lang = voice.lang
  } else {
    u.lang = opts.lang || 'nl-BE'
  }
  u.rate = opts.rate ?? 0.9
  synth.speak(u)
  try {
    synth.resume() // Chrome-nudge tegen 'hangende' spraak
  } catch {
    /* negeren */
  }
}

/** Spreek via een online Nederlandse stem (Google Translate TTS). */
function speakOnline(text) {
  const clipped = text.slice(0, 200)
  const q = encodeURIComponent(clipped)
  const url =
    'https://translate.googleapis.com/translate_tts?ie=UTF-8&client=gtx&tl=nl' +
    `&total=1&idx=0&textlen=${clipped.length}&q=${q}`
  const audio = new Audio(url)
  currentAudio = audio
  // Als de online stem niet lukt (bv. geblokkeerd), val terug op native.
  audio.onerror = () => {
    if (currentAudio === audio) currentAudio = null
    try {
      if (window.speechSynthesis) speakNative(text, {})
    } catch {
      /* negeren */
    }
  }
  const p = audio.play()
  if (p && typeof p.catch === 'function') {
    p.catch(() => {
      // play() geweigerd (bv. geen gebruikersinteractie) — probeer native.
      try {
        if (window.speechSynthesis) speakNative(text, {})
      } catch {
        /* negeren */
      }
    })
  }
}

/**
 * Lees een tekst voor in het Nederlands.
 * @param {string} text
 * @param {{ rate?: number, lang?: string }} [opts]
 */
export function speak(text, opts = {}) {
  if (!text) return
  stopAll()

  const decide = () => {
    if (pickDutchVoice()) speakNative(text, opts)
    else speakOnline(text)
  }

  const synth = window.speechSynthesis
  // Stemmen nog niet geladen? Even wachten, dan pas beslissen.
  if (synth && !getVoices().length && typeof synth.addEventListener === 'function') {
    let done = false
    const run = () => {
      if (done) return
      done = true
      cachedVoice = null
      decide()
    }
    synth.addEventListener('voiceschanged', run, { once: true })
    setTimeout(run, 300)
  } else if (!synth) {
    // Geen Web Speech API → meteen online.
    speakOnline(text)
  } else {
    decide()
  }
}
