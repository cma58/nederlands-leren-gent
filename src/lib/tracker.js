/**
 * Achtergrond-tracker naar een (optionele) Google Sheet Webhook.
 *
 * - `logMistake` stuurt een fout fire-and-forget door (POST, mode:'no-cors').
 *   De UI mag hier NOOIT op wachten of door blokkeren.
 * - `fetchCustomLesson` haalt een eventueel automatisch gegenereerde herhaalles
 *   op (GET) voor het dashboard.
 *
 * Alles is no-op als er geen webhook-URL is ingesteld (zie Settings). Fouten
 * worden stil ingeslikt zodat de app altijd blijft werken.
 */
import { getWebhookUrl } from './config.js'

/** Log één fout (verwacht woord, transcriptie, les-ID, resultaat, datum). */
export function logMistake({ expected, heard, lessonId, result }) {
  const url = getWebhookUrl()
  if (!url) return
  const payload = {
    type: 'mistake',
    expected: expected || '',
    heard: heard || '',
    lessonId: lessonId || '',
    result: result || 'retry',
    date: new Date().toISOString(),
  }
  try {
    // no-cors: we kunnen het antwoord niet lezen, maar dat hoeft niet — het is
    // pure logging. Fire-and-forget; nooit awaiten.
    fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
    }).catch(() => {})
  } catch {
    /* negeren — logging mag de oefening nooit hinderen */
  }
}

/** Stuur een voortgangs-snapshot naar de webhook (fire-and-forget). */
export function postSnapshot(snapshot) {
  const url = getWebhookUrl()
  if (!url || !snapshot) return
  try {
    fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ type: 'snapshot', data: snapshot, date: new Date().toISOString() }),
    }).catch(() => {})
  } catch {
    /* negeren — mag de app nooit hinderen */
  }
}

/** Stuur een persoonlijk berichtje naar de lerende (fire-and-forget). */
export function postMessage(text) {
  const url = getWebhookUrl()
  if (!url || !text?.trim()) return
  try {
    fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ type: 'message', text: text.trim(), date: new Date().toISOString() }),
    }).catch(() => {})
  } catch {
    /* negeren */
  }
}

/** Haal het laatste berichtje op (voor haar startscherm), of null. */
export async function fetchMessage() {
  const url = getWebhookUrl()
  if (!url) return null
  try {
    const sep = url.includes('?') ? '&' : '?'
    const res = await fetch(`${url}${sep}type=message`, { method: 'GET', signal: AbortSignal.timeout(8000) })
    if (!res.ok) return null
    const data = await res.json().catch(() => null)
    if (!data || !data.text) return null
    return data
  } catch {
    return null
  }
}

/** Haal de laatst opgeslagen snapshot op (voor de admin-pagina), of null. */
export async function fetchSnapshot(urlOverride) {
  const url = urlOverride || getWebhookUrl()
  if (!url) return null
  try {
    const sep = url.includes('?') ? '&' : '?'
    const res = await fetch(`${url}${sep}type=snapshot`, {
      method: 'GET',
      signal: AbortSignal.timeout(10000),
    })
    if (!res.ok) return null
    const data = await res.json().catch(() => null)
    if (!data || !data.progress) return null
    return data
  } catch {
    return null
  }
}

/**
 * Haalt een automatisch gegenereerde herhaalles op, of null.
 * Verwacht van de webhook een JSON-les met minstens { title, items:[...] }.
 */
export async function fetchCustomLesson() {
  const url = getWebhookUrl()
  if (!url) return null
  try {
    const res = await fetch(url, { method: 'GET', signal: AbortSignal.timeout(8000) })
    if (!res.ok) return null
    const data = await res.json().catch(() => null)
    if (!data || !Array.isArray(data.items) || data.items.length === 0) return null
    return {
      id: data.id || 'custom-oefeningen',
      title: data.title || 'Jouw oefeningen op maat',
      titleDarija: data.titleDarija || '',
      type: data.type || 'speaking',
      intro: data.intro || '',
      items: data.items,
    }
  } catch {
    return null // geen internet / CORS / geen les — gewoon niets tonen
  }
}
