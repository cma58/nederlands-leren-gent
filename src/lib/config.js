/**
 * Beheer van de API-sleutels en modelnamen.
 *
 * De sleutels kunnen op twee manieren geleverd worden:
 *   1) via de app-instellingen (worden in de browser opgeslagen, localStorage) —
 *      handig op de telefoon, geen bestanden bewerken;
 *   2) via een .env-bestand (VITE_GEMINI_API_KEY / VITE_GROQ_API_KEY) —
 *      handig voor ontwikkeling.
 *
 * De app-instelling heeft voorrang op .env.
 *
 * LET OP: in een pure frontend-app zijn sleutels zichtbaar voor wie de app
 * gebruikt. Dat is prima voor privégebruik op je eigen toestel, maar zet de
 * app hiermee niet openbaar online.
 */

const KEYS = {
  gemini: 'nl-gent:key:gemini',
  groq: 'nl-gent:key:groq',
}

function read(name, envValue) {
  try {
    return localStorage.getItem(name) || envValue || ''
  } catch {
    return envValue || ''
  }
}

export function getGeminiKey() {
  return read(KEYS.gemini, import.meta.env.VITE_GEMINI_API_KEY)
}

export function getGroqKey() {
  return read(KEYS.groq, import.meta.env.VITE_GROQ_API_KEY)
}

export function setGeminiKey(value) {
  try {
    if (value) localStorage.setItem(KEYS.gemini, value.trim())
    else localStorage.removeItem(KEYS.gemini)
  } catch {
    /* opslag geweigerd — negeren */
  }
}

export function setGroqKey(value) {
  try {
    if (value) localStorage.setItem(KEYS.groq, value.trim())
    else localStorage.removeItem(KEYS.groq)
  } catch {
    /* opslag geweigerd — negeren */
  }
}

export const hasGemini = () => Boolean(getGeminiKey())
export const hasGroq = () => Boolean(getGroqKey())

// Optionele Google Sheet Webhook-URL (fouten loggen + herhaallessen ophalen).
// Sleutelnaam bewust zonder prefix, zoals afgesproken in het plan.
const WEBHOOK_KEY = 'google_sheet_webhook_url'

export function getWebhookUrl() {
  try {
    return localStorage.getItem(WEBHOOK_KEY) || ''
  } catch {
    return ''
  }
}

export function setWebhookUrl(value) {
  try {
    if (value) localStorage.setItem(WEBHOOK_KEY, value.trim())
    else localStorage.removeItem(WEBHOOK_KEY)
  } catch {
    /* opslag geweigerd — negeren */
  }
}

// Modelnamen — kunnen via .env aangepast worden zonder de code te wijzigen.
// Gebruik een STABIELE model-id, niet een '-latest'-alias: die aliassen wijzen
// altijd naar het nieuwste *preview*-model en worden door Google zonder
// waarschuwing omgezet/afgeschaft (→ plots een 404 en de AI-feedback stopt).
// 'gemini-2.5-flash' is stabiel en ondersteunt gestructureerde JSON-uitvoer.
export const GEMINI_MODEL = import.meta.env.VITE_GEMINI_MODEL || 'gemini-2.5-flash'
export const GROQ_WHISPER_MODEL = import.meta.env.VITE_GROQ_MODEL || 'whisper-large-v3'
