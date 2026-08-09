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

// Gedeeld geheim token voor de webhook. Optioneel: als de Google Apps Script
// een SECRET ingesteld heeft, moet elk verzoek dit token meesturen. Zo kan niet
// zomaar iemand met de URL de voortgang lezen of een bericht injecteren.
const WEBHOOK_TOKEN_KEY = 'nl-gent:webhook:token'

export function getWebhookToken() {
  try {
    return localStorage.getItem(WEBHOOK_TOKEN_KEY) || ''
  } catch {
    return ''
  }
}

export function setWebhookToken(value) {
  try {
    if (value) localStorage.setItem(WEBHOOK_TOKEN_KEY, value.trim())
    else localStorage.removeItem(WEBHOOK_TOKEN_KEY)
  } catch {
    /* opslag geweigerd — negeren */
  }
}

/**
 * AbortSignal met time-out, veilig voor oudere toestellen. AbortSignal.timeout
 * bestaat niet in oudere Safari/WebView — dan vallen we terug op een handmatige
 * AbortController (of undefined als ook dat ontbreekt).
 */
export function timeoutSignal(ms) {
  try {
    if (typeof AbortSignal !== 'undefined' && typeof AbortSignal.timeout === 'function') {
      return AbortSignal.timeout(ms)
    }
    if (typeof AbortController === 'function') {
      const c = new AbortController()
      setTimeout(() => c.abort(), ms)
      return c.signal
    }
  } catch {
    /* negeren */
  }
  return undefined
}

/**
 * fetch() met (1) directe offline-detectie, (2) een time-out per poging en
 * (3) één automatische herpoging bij een netwerk-hikje of tijdelijke serverfout.
 *
 * Bedoeld voor de wisselvallige mobiele netwerken van de doelgroep: één korte
 * dip zorgt anders meteen voor een foutmelding, terwijl één retry het meestal
 * oplost. We herproberen ALLEEN bij netwerk/time-out en 5xx — nooit bij 4xx
 * (bv. een ongeldige sleutel), want dan is herproberen zinloos.
 *
 * Gooit bij mislukking een Error met `.status`:
 *   'offline'  – er is helemaal geen internetverbinding
 *   'timeout'  – het verzoek duurde te lang
 *   'network'  – een andere netwerkfout
 *
 * @param {string} url
 * @param {RequestInit} options   fetch-opties (zonder signal; die zetten wij).
 * @param {{timeoutMs?:number, retries?:number, backoffMs?:number}} [cfg]
 * @returns {Promise<Response>}
 */
export async function fetchWithRetry(url, options = {}, cfg = {}) {
  const { timeoutMs = 20000, retries = 1, backoffMs = 800 } = cfg

  // Meteen stoppen als de telefoon offline is: geen 20s wachten op een time-out.
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    const err = new Error('OFFLINE')
    err.status = 'offline'
    throw err
  }

  let lastErr
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, { ...options, signal: timeoutSignal(timeoutMs) })
      // Tijdelijke serverfout (5xx): nog één keer proberen, daarna teruggeven.
      if (res.status >= 500 && res.status < 600 && attempt < retries) {
        await sleep_(backoffMs)
        continue
      }
      return res
    } catch (e) {
      lastErr = e
      const isTimeout = e?.name === 'TimeoutError' || e?.name === 'AbortError'
      // Nog een poging over? Even wachten en opnieuw.
      if (attempt < retries) {
        await sleep_(backoffMs)
        continue
      }
      const err = new Error(isTimeout ? 'TIME_OUT' : 'NETWERK_FOUT')
      err.status = isTimeout ? 'timeout' : 'network'
      err.cause = lastErr
      throw err
    }
  }
  // Onbereikbaar, maar voor de volledigheid:
  const err = new Error('NETWERK_FOUT')
  err.status = 'network'
  throw err
}

function sleep_(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

// Coach-modus: dit toestel KIJKT enkel (admin-pagina) en stuurt zélf geen
// voortgang. Zo overschrijft het toestel van de partner niet dat van de lerende.
const COACH_KEY = 'nl-gent:coach:v1'

export function getCoachMode() {
  try {
    return localStorage.getItem(COACH_KEY) === '1'
  } catch {
    return false
  }
}

export function isCoachModeSet() {
  try {
    return localStorage.getItem(COACH_KEY) !== null
  } catch {
    return false
  }
}

export function setCoachMode(on) {
  try {
    if (on) localStorage.setItem(COACH_KEY, '1')
    else localStorage.setItem(COACH_KEY, '0')
  } catch {
    /* negeren */
  }
}

// Modelnamen — kunnen via .env aangepast worden zonder de code te wijzigen.
// Gebruik een STABIELE model-id, niet een '-latest'-alias: die aliassen wijzen
// altijd naar het nieuwste *preview*-model en worden door Google zonder
// waarschuwing omgezet/afgeschaft (→ plots een 404 en de AI-feedback stopt).
// 'gemini-2.5-flash' is stabiel en ondersteunt gestructureerde JSON-uitvoer.
export const GEMINI_MODEL = import.meta.env.VITE_GEMINI_MODEL || 'gemini-2.5-flash'
export const GROQ_WHISPER_MODEL = import.meta.env.VITE_GROQ_MODEL || 'whisper-large-v3'
