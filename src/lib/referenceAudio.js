import { canProbablySpeak, speak, stopAll } from './speech.js'

let currentAudio = null
let currentFinish = null
let playGeneration = 0

export function referenceAudioUrl(promptId) {
  return `/api/reference-audio/${encodeURIComponent(promptId)}`
}

export function stopReferenceAudio() {
  playGeneration += 1
  if (currentAudio) {
    try { currentAudio.pause() } catch { /* best effort */ }
    currentAudio = null
  }
  currentFinish?.({ played: false, source: 'stopped' })
  currentFinish = null
  stopAll()
}

function playOne(promptId, fallbackText, options, generation) {
  return new Promise((resolve) => {
    let audio = null
    let settled = false
    let fallbackStarted = false
    let timeout = null
    const finish = (result) => {
      if (settled) return
      settled = true
      if (timeout) clearTimeout(timeout)
      if (currentAudio === audio) currentAudio = null
      if (currentFinish === finish) currentFinish = null
      resolve(result)
    }
    const fallback = () => {
      if (fallbackStarted || settled) return
      fallbackStarted = true
      if (generation !== playGeneration) return finish({ played: false, source: 'stopped' })
      if (options.fallbackToTts === false || !fallbackText || !canProbablySpeak()) {
        finish({ played: false, source: 'unavailable' })
        return
      }
      const { fallbackToTts: _fallbackToTts, ...speechOptions } = options
      speak(fallbackText, {
        ...speechOptions,
        onEnd: () => finish({ played: true, source: 'tts' }),
        onError: () => finish({ played: false, source: 'unavailable' }),
      })
    }
    currentFinish = finish
    if (!promptId || typeof Audio === 'undefined') {
      fallback()
      return
    }
    audio = new Audio(referenceAudioUrl(promptId))
    currentAudio = audio
    audio.preload = 'auto'
    audio.onended = () => finish({ played: true, source: 'reference' })
    audio.onerror = fallback
    timeout = setTimeout(() => {
      try { audio.pause() } catch { /* best effort */ }
      stopAll()
      finish({ played: false, source: 'timeout' })
    }, 15000)
    try {
      const request = audio.play()
      if (request?.catch) request.catch(fallback)
    } catch {
      fallback()
    }
  })
}

export function playReferenceAudio(promptId, fallbackText, options = {}) {
  stopReferenceAudio()
  return playOne(promptId, fallbackText, options, playGeneration)
}

export async function playReferenceSequence(items, options = {}) {
  stopReferenceAudio()
  const sequenceGeneration = playGeneration
  for (const item of items) {
    if (playGeneration !== sequenceGeneration) return false
    // eslint-disable-next-line no-await-in-loop
    const result = await playOne(item.promptId, item.fallbackText, options, sequenceGeneration)
    if (!result.played) return false
  }
  return true
}
