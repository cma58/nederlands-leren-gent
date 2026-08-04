/**
 * Groq API — spraak-naar-tekst met Whisper (whisper-large-v3).
 * Zet een opgenomen audiofragment om naar Nederlandse tekst.
 */

import { getGroqKey, GROQ_WHISPER_MODEL } from './config.js'

/**
 * @param {Blob} audioBlob   De opgenomen audio (bv. audio/webm).
 * @param {string} [filename]
 * @param {string} [prompt]   Context-hint met de verwachte woorden. Whisper
 *   herkent losse/korte woorden veel betrouwbaarder als het weet welke woorden
 *   te verwachten zijn (en kan zo bv. "man" vs "maan" onderscheiden).
 * @returns {Promise<string>} De herkende tekst.
 */
export async function transcribeAudio(audioBlob, filename = '', prompt = '') {
  const key = getGroqKey()
  if (!key) throw new Error('GEEN_GROQ_SLEUTEL')

  // Bestandsnaam-extensie moet bij het echte formaat passen: Whisper kijkt deels
  // naar de extensie. iOS levert audio/mp4, Android meestal audio/webm.
  const type = audioBlob?.type || ''
  const ext = type.includes('mp4') || type.includes('m4a')
    ? 'm4a'
    : type.includes('ogg')
      ? 'ogg'
      : 'webm'
  const name = filename || `opname.${ext}`

  const form = new FormData()
  form.append('file', audioBlob, name)
  form.append('model', GROQ_WHISPER_MODEL)
  form.append('language', 'nl') // Nederlands
  form.append('response_format', 'json')
  form.append('temperature', '0')
  if (prompt) form.append('prompt', prompt)

  let res
  try {
    res = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}` },
      // Stopt een vastgelopen upload na 25s (audio kan groter zijn dan tekst).
      signal: AbortSignal.timeout(25000),
      body: form,
    })
  } catch (e) {
    const err = new Error(e?.name === 'TimeoutError' ? 'TIME_OUT' : 'NETWERK_FOUT')
    err.status = e?.name === 'TimeoutError' ? 'timeout' : 'network'
    throw err
  }

  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    const err = new Error(`Groq-fout (${res.status}): ${detail.slice(0, 200)}`)
    err.status = res.status
    throw err
  }

  const data = await res.json()
  return (data?.text || '').trim()
}
