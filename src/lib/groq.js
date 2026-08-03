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
export async function transcribeAudio(audioBlob, filename = 'opname.webm', prompt = '') {
  const key = getGroqKey()
  if (!key) throw new Error('GEEN_GROQ_SLEUTEL')

  const form = new FormData()
  form.append('file', audioBlob, filename)
  form.append('model', GROQ_WHISPER_MODEL)
  form.append('language', 'nl') // Nederlands
  form.append('response_format', 'json')
  form.append('temperature', '0')
  if (prompt) form.append('prompt', prompt)

  const res = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}` },
    body: form,
  })

  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    throw new Error(`Groq-fout (${res.status}): ${detail.slice(0, 200)}`)
  }

  const data = await res.json()
  return (data?.text || '').trim()
}
