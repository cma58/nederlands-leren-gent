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

/**
 * Kan er waarschijnlijk voorgelezen worden? Native stem = altijd; anders is
 * internet nodig voor de online stem. Zonder beide hoort de leerling niets —
 * dan toont de UI een waarschuwing i.p.v. stilte.
 */
export function canProbablySpeak() {
  if (hasDutchVoice()) return true
  return typeof navigator === 'undefined' || navigator.onLine !== false
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

/** Roep opts.onEnd één keer aan (voorkomt dubbel bij fout + einde). */
function once(fn) {
  let done = false
  return () => {
    if (done) return
    done = true
    fn?.()
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
  const finish = once(opts.onEnd)
  u.onend = finish
  u.onerror = finish
  synth.speak(u)
  try {
    synth.resume() // Chrome-nudge tegen 'hangende' spraak
  } catch {
    /* negeren */
  }
}

/** Spreek via een online Nederlandse stem (Google Translate TTS). */
function speakOnline(text, opts = {}) {
  const clipped = text.slice(0, 200)
  const q = encodeURIComponent(clipped)
  const url =
    'https://translate.googleapis.com/translate_tts?ie=UTF-8&client=gtx&tl=nl' +
    `&total=1&idx=0&textlen=${clipped.length}&q=${q}`
  const audio = new Audio()
  // Geen Referer meesturen (Google TTS weigert verzoeken mét Referer met 404).
  try {
    audio.referrerPolicy = 'no-referrer'
  } catch {
    /* niet ondersteund — de meta-tag in index.html vangt dit ook op */
  }
  // Langzaam afspelen (opts.rate < 1) verlaagt ook de toonhoogte, maar is
  // goed genoeg om een klank duidelijker te horen.
  if (opts.rate) audio.playbackRate = opts.rate
  audio.src = url
  currentAudio = audio
  audio.onended = once(opts.onEnd)
  // Als de online stem niet lukt (bv. geblokkeerd), val terug op native.
  audio.onerror = () => {
    if (currentAudio === audio) currentAudio = null
    try {
      if (window.speechSynthesis) speakNative(text, opts)
      else once(opts.onEnd)()
    } catch {
      once(opts.onEnd)()
    }
  }
  const p = audio.play()
  if (p && typeof p.catch === 'function') {
    p.catch(() => {
      // play() geweigerd (bv. geen gebruikersinteractie) — probeer native.
      try {
        if (window.speechSynthesis) speakNative(text, opts)
        else once(opts.onEnd)()
      } catch {
        once(opts.onEnd)()
      }
    })
  }
}

/**
 * Lees een tekst voor in het Nederlands.
 * @param {string} text
 * @param {{ rate?: number, lang?: string, onEnd?: () => void }} [opts]
 *   rate < 1 = langzamer. onEnd wordt aangeroepen als het voorlezen klaar is
 *   (handig om daarna de eigen opname af te spelen).
 */
export function speak(text, opts = {}) {
  if (!text) {
    opts.onEnd?.()
    return
  }
  stopAll()
  // BELANGRIJK: synchroon beslissen. audio.play() moet binnen dezelfde
  // tik-gebeurtenis vallen, anders blokkeren telefoons het afspelen.
  // Native stem als er een Nederlandse op het toestel staat, anders online.
  if (pickDutchVoice()) speakNative(text, opts)
  else speakOnline(text, opts)
}
