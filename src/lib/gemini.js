/**
 * Google Gemini API — antwoord- en grammaticacheck.
 *
 * `evaluateAnswer` stuurt het antwoord van de leerling naar Gemini met een
 * systeemprompt in de rol van een geduldige NT2-docent in Gent. Het resultaat
 * komt terug als gestructureerde JSON, zodat de UI het netjes kan tonen.
 */

import { getGeminiKey, GEMINI_MODEL, fetchWithRetry } from './config.js'

const SYSTEM_PROMPT = `Je bent een geduldige NT2-docent in Gent (Vlaanderen). De leerling heeft als moedertaal Marokkaans-Arabisch (Darija) en komt uit Oujda.
BELANGRIJK: gebruik NIET het formele Standaardarabisch (Fusha). Gebruik vlot, natuurlijk en alledaags Marokkaans-Darija zoals het in Oujda gesproken wordt (Arabisch schrift).
Geef korte, duidelijke en bemoedigende feedback in eenvoudig Nederlands, aangevuld met een korte, natuurlijke toelichting in Darija waar dat nuttig is. Gebruik geen cijfers of percentages. De leerling is een absolute beginner, dus wees vriendelijk en simpel.`

// Gestructureerd antwoord zodat de app het betrouwbaar kan weergeven.
const RESPONSE_SCHEMA = {
  type: 'object',
  properties: {
    correct: { type: 'boolean' },
    feedback_nl: { type: 'string' },
    feedback_darija: { type: 'string' },
    correction: { type: 'string' },
  },
  required: ['correct', 'feedback_nl'],
}

/**
 * @param {string} userAnswer      Wat de leerling zei/typte.
 * @param {string} expectedAnswer  De verwachte zin/opdracht.
 * @param {string} [contextPrompt] Extra context (bv. de instructie van de les).
 * @returns {Promise<{correct:boolean, feedback_nl:string, feedback_darija?:string, correction?:string}>}
 */
export async function evaluateAnswer(userAnswer, expectedAnswer, contextPrompt = '') {
  const key = getGeminiKey()
  if (!key) throw new Error('GEEN_GEMINI_SLEUTEL')

  const userText = [
    contextPrompt && `Opdracht/context: ${contextPrompt}`,
    `Verwacht antwoord: "${expectedAnswer}"`,
    `Antwoord van de gebruiker: "${userAnswer}"`,
  ]
    .filter(Boolean)
    .join('\n')

  // De sleutel via header (x-goog-api-key) i.p.v. in de URL: zo lekt hij niet
  // in server-/proxylogs of de browsergeschiedenis.
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`

  // fetchWithRetry: 20s time-out, offline-check vooraf en één automatische
  // herpoging bij een netwerk-hikje/5xx (voor wisselvallige mobiele netwerken).
  const res = await fetchWithRetry(
    url,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: [{ role: 'user', parts: [{ text: userText }] }],
        generationConfig: {
          temperature: 0.3,
          responseMimeType: 'application/json',
          responseSchema: RESPONSE_SCHEMA,
          // Deze eenvoudige nakijk-taak heeft geen 'denk'-fase nodig: scheelt
          // tijd/kosten en voorkomt afgekapte JSON bij 2.5-modellen.
          thinkingConfig: { thinkingBudget: 0 },
        },
      }),
    },
    { timeoutMs: 20000 },
  )

  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    const err = new Error(`Gemini-fout (${res.status}): ${detail.slice(0, 200)}`)
    err.status = res.status
    throw err
  }

  const data = await res.json()
  if (data?.promptFeedback?.blockReason) {
    const err = new Error(`Geblokkeerd: ${data.promptFeedback.blockReason}`)
    err.status = 'blocked'
    throw err
  }
  // Zoek het eerste tekst-deel (een model kan ook niet-tekst delen teruggeven).
  const parts = data?.candidates?.[0]?.content?.parts
  const text = Array.isArray(parts) ? parts.find((p) => typeof p?.text === 'string')?.text : undefined
  if (!text) throw new Error('Leeg antwoord van Gemini.')

  try {
    return JSON.parse(text)
  } catch {
    // Terugval: toon de ruwe tekst als feedback.
    return { correct: false, feedback_nl: text }
  }
}
