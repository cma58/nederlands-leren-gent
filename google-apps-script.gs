/**
 * Nederlands leren in Gent — Google Apps Script webhook
 * =====================================================
 *
 * Dit script draait in een Google Spreadsheet en doet drie dingen:
 *   1) doPost(e)  — slaat binnenkomende fouten op in het tabblad "FoutenLog".
 *   2) doGet(e)   — serveert de laatst gegenereerde herhaalles als JSON.
 *   3) generateWeeklyCustomLesson() — maakt wekelijks automatisch een nieuwe
 *      herhaalles op basis van de fouten van de afgelopen 7 dagen (via Gemini).
 *
 * ─────────────────────────────────────────────────────────────────────────
 * INSTALLATIE (eenmalig, ~5 minuten)
 * ─────────────────────────────────────────────────────────────────────────
 * 1. Maak een nieuwe Google Spreadsheet.
 * 2. Extensies ▸ Apps Script. Plak dit hele bestand en sla op.
 * 3. Projectinstellingen (tandwiel) ▸ Scripteigenschappen ▸ voeg toe:
 *       GEMINI_KEY = <jouw Gemini-sleutel>   (dezelfde soort als in de app)
 * 4. Implementeren ▸ Nieuwe implementatie ▸ type "Web-app":
 *       - Uitvoeren als: Ikzelf
 *       - Wie heeft toegang: Iedereen
 *    Kopieer de web-app-URL (eindigt op /exec).
 * 5. Plak die URL in de app onder Instellingen ▸ "Google Sheet Webhook-URL".
 * 6. (Optioneel, voor de wekelijkse les) Triggers (klok-icoon) ▸ Trigger
 *    toevoegen ▸ functie "generateWeeklyCustomLesson", tijdgestuurd, wekelijks.
 *    Of draai de functie één keer handmatig om te testen.
 *
 * Let op: bij een codewijziging moet je een NIEUWE implementatie maken (of de
 * bestaande "beheren ▸ bewerken ▸ versie: nieuw"), anders blijft de oude URL
 * de oude code draaien.
 */

var LOG_SHEET = 'FoutenLog'
var PROP_LESSON = 'customLesson'
var PROP_SNAPSHOT = 'latestSnapshot'
var GEMINI_MODEL = 'gemini-2.5-flash'

/* ──────────── 1) Binnenkomend: fout loggen OF snapshot opslaan ──────────── */
function doPost(e) {
  try {
    var payload = JSON.parse(e.postData.contents)
    // Voortgangs-snapshot (voor de admin-/coachpagina) → overschrijf de laatste.
    if (payload.type === 'snapshot') {
      PropertiesService.getScriptProperties().setProperty(
        PROP_SNAPSHOT,
        JSON.stringify(payload.data || {}),
      )
      return json_({ ok: true })
    }
    // Anders: een uitspraakfout loggen.
    var sheet = getLogSheet_()
    sheet.appendRow([
      payload.date || new Date().toISOString(),
      payload.lessonId || '',
      payload.expected || '',
      payload.heard || '',
      payload.result || '',
    ])
    return json_({ ok: true })
  } catch (err) {
    return json_({ ok: false, error: String(err) })
  }
}

/* ──────── 2) Uitgaand: herhaalles OF voortgangs-snapshot serveren ──────── */
function doGet(e) {
  // ?type=snapshot → de laatst ontvangen voortgang (voor de admin-pagina).
  if (e && e.parameter && e.parameter.type === 'snapshot') {
    var snap = PropertiesService.getScriptProperties().getProperty(PROP_SNAPSHOT)
    if (!snap) return json_({})
    return ContentService.createTextOutput(snap).setMimeType(ContentService.MimeType.JSON)
  }
  // Standaard: de automatisch gegenereerde herhaalles.
  var stored = PropertiesService.getScriptProperties().getProperty(PROP_LESSON)
  if (!stored) return json_({})
  return ContentService.createTextOutput(stored).setMimeType(ContentService.MimeType.JSON)
}

/* ──────────── 3) Wekelijkse les genereren op basis van fouten ──────────── */
function generateWeeklyCustomLesson() {
  var sheet = getLogSheet_()
  var rows = sheet.getDataRange().getValues() // [date, lessonId, expected, heard, result]
  var since = new Date()
  since.setDate(since.getDate() - 7)

  // Tel de meest gemaakte fouten van de afgelopen week.
  var counts = {}
  for (var i = 1; i < rows.length; i++) {
    var d = new Date(rows[i][0])
    var expected = String(rows[i][2] || '').trim()
    if (!expected || isNaN(d.getTime()) || d < since) continue
    counts[expected] = (counts[expected] || 0) + 1
  }
  var words = Object.keys(counts)
    .sort(function (a, b) {
      return counts[b] - counts[a]
    })
    .slice(0, 8)

  if (words.length === 0) {
    // Niets fout deze week → geen les.
    PropertiesService.getScriptProperties().deleteProperty(PROP_LESSON)
    return
  }

  var lesson = askGeminiForLesson_(words)
  if (lesson) {
    PropertiesService.getScriptProperties().setProperty(PROP_LESSON, JSON.stringify(lesson))
  }
}

/* ───────────────────────────── helpers ───────────────────────────── */
function getLogSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet()
  var sheet = ss.getSheetByName(LOG_SHEET)
  if (!sheet) {
    sheet = ss.insertSheet(LOG_SHEET)
    sheet.appendRow(['datum', 'lesId', 'verwacht', 'gehoord', 'resultaat'])
  }
  return sheet
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  )
}

function askGeminiForLesson_(words) {
  var key = PropertiesService.getScriptProperties().getProperty('GEMINI_KEY')
  if (!key) throw new Error('GEMINI_KEY ontbreekt in Scripteigenschappen.')

  var prompt =
    'Je bent een NT2-docent in Gent. Een absolute beginner (moedertaal Marokkaans-Darija uit Oujda) had deze week moeite met de uitspraak van deze Nederlandse woorden: ' +
    words.join(', ') +
    '. Maak een korte oefenles van precies deze woorden. Geef ALLEEN geldige JSON terug in dit formaat: ' +
    '{"title":"Jouw oefeningen op maat","titleDarija":"التمارين ديالك على المقاس","type":"speaking",' +
    '"items":[{"nl":"<woord>","answer":"<woord>","darija":"<vertaling in Arabisch schrift>",' +
    '"darijaLat":"<transliteratie>","tip":"<korte Nederlandse uitspraaktip>"}]}. ' +
    'Gebruik natuurlijk Marokkaans-Darija (geen Fusha). Geen extra tekst buiten de JSON.'

  var url =
    'https://generativelanguage.googleapis.com/v1beta/models/' +
    GEMINI_MODEL +
    ':generateContent?key=' +
    encodeURIComponent(key)

  var res = UrlFetchApp.fetch(url, {
    method: 'post',
    contentType: 'application/json',
    muteHttpExceptions: true,
    payload: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.4,
        responseMimeType: 'application/json',
        thinkingConfig: { thinkingBudget: 0 },
      },
    }),
  })

  if (res.getResponseCode() !== 200) return null
  var data = JSON.parse(res.getContentText())
  var parts = data && data.candidates && data.candidates[0] && data.candidates[0].content.parts
  var text = parts && parts.length ? parts[0].text : ''
  if (!text) return null
  try {
    var lesson = JSON.parse(text)
    lesson.id = 'custom-' + new Date().toISOString().slice(0, 10)
    if (!lesson.type) lesson.type = 'speaking'
    return lesson && lesson.items && lesson.items.length ? lesson : null
  } catch (err) {
    return null
  }
}
