# Ontwikkelaarsgids & projectoverdracht

> Lees dit bestand als je nieuw bent op het project. Na het lezen weet je wat de
> app is, hoe ze in elkaar zit, waar we nu staan, hoe je veilig uitbreidt en
> welke valkuilen er zijn — genoeg om meteen verder te bouwen.

---

## 1. Wat is dit?

Een interactieve webapp waarmee een **Marokkaans-Darija sprekende gebruiker** (uit
Oujda) stap voor stap **Vlaams-Nederlands** leert om in **Gent** te integreren. De
cursus houdt bewust rekening met de klank- en taalverschillen tussen het Darija en
het Nederlands.

**Doelgroep (belangrijk voor ontwerpkeuzes):** één specifieke lerende, mogelijk
een **senior** met beperkte digitale/schrijfervaring, die Arabisch schrift soms
beter leest dan Latijns schrift. De hele UI is daarom tweetalig (NL + Darija),
mobiel-eerst, met grote knoppen en een "coach/partner" die op afstand kan meekijken.

De app is **volledig client-side** (geen eigen backend); externe diensten worden
rechtstreeks vanuit de browser aangesproken.

---

## 2. Tech stack

| Onderdeel | Keuze | Nota |
|---|---|---|
| Framework | **React 18** | functionele componenten + hooks |
| Build/dev | **Vite 6** | `npm run dev` / `build` / `preview` |
| Styling | **Tailwind CSS 3** | zie `tailwind.config.js`, `src/index.css` |
| Voorlezen (TTS) | **Web Speech API** + Google Translate-TTS fallback | `src/lib/speech.js` |
| Spraak → tekst | **Groq Whisper** (`whisper-large-v3`) | `src/lib/groq.js` |
| AI-uitleg (optioneel) | **Google Gemini** (`gemini-2.5-flash`) | `src/lib/gemini.js` |
| Voortgang op afstand | **Google Apps Script** + Google Sheet | `google-apps-script.gs` |
| Offline/installeerbaar | **vite-plugin-pwa** (service worker + manifest) | `vite.config.js` |
| Navigatie | **geen router** — lokale React-state | `src/App.jsx` |

Er is **geen** state-managementbibliotheek en **geen** TypeScript; state zit in twee
React-contexts en in `localStorage`.

---

## 3. Snel starten

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # productie-build in dist/
npm run preview    # bekijk de build lokaal
```

Alle lessen, quizzen, luister- en typoefeningen werken **zonder sleutels**. Alleen
de **spreekoefening** (opnemen + AI-uitleg) heeft twee gratis sleutels nodig — zie
§10.

---

## 4. Architectuuroverzicht

- **Data-gedreven.** De hele leerlijn zit in één object (`src/data/curriculum.js`).
  De UI en de voortgangsberekening leiden zich hieruit af — een nieuwe les toevoegen
  is puur data toevoegen, geen UI schrijven.
- **Geen router.** `App.jsx` schakelt met lokale state tussen
  welkomstscherm → dashboard ⇄ niveau, met de les-speler / instellingen / help /
  herhaalsessie als overlay erbovenop. Een verborgen coach-pagina zit achter
  `#admin` in de URL.
- **Twee contexts:**
  - `LanguageContext` — huidige taal (NL/Darija), `dir` (ltr/rtl) en `t(key)`.
  - `ProgressContext` — welke lessen zijn afgerond (`localStorage`), en het
    automatisch versturen van een voortgangs-snapshot naar de webhook.
- **Oordeel is lokaal, niet AI.** Het "goed/bijna/opnieuw"-oordeel bij spreken en
  typen komt uit deterministische code (`src/lib/pronunciation.js`), niet uit een
  taalmodel. Gemini geeft hooguit optionele, bemoedigende **uitleg** — nooit het
  oordeel. Dit is een bewuste ontwerpkeuze; behoud ze.

---

## 5. Bestandsstructuur

```
├── index.html                     # app-shell, no-referrer meta (voor TTS)
├── vite.config.js                 # base-pad per host + PWA-config
├── tailwind.config.js / postcss.config.js
├── google-apps-script.gs          # de webhook-backend (draait in Google Sheets)
├── .github/workflows/deploy.yml   # GitHub Pages-deploy
├── DEVELOPMENT.md                 # dit bestand
├── README.md                      # korte intro
├── darija-*.md                    # nakijk-werkbladen voor de Darija-vertalingen
└── src/
    ├── main.jsx                   # entry; registreert service-worker auto-reload
    ├── App.jsx                    # navigatie + `inert`-achtergrond bij overlays
    ├── index.css                  # Tailwind + .btn/.card basisklassen
    ├── i18n/translations.js       # NL + Darija UI-teksten (t-sleutels)
    ├── data/
    │   ├── curriculum.js          # ⭐ de volledige leerlijn (629 items)
    │   └── resources.js           # externe oefenbronnen (links)
    ├── context/
    │   ├── LanguageContext.jsx    # taal, dir, t()
    │   └── ProgressContext.jsx    # afgeronde lessen + snapshot-push
    ├── hooks/
    │   └── useRecorder.js         # microfoon-opname (MediaRecorder)
    ├── lib/
    │   ├── config.js              # sleutels/tokens/modelnamen + fetchWithRetry
    │   ├── speech.js              # TTS (Web Speech + Google-fallback)
    │   ├── groq.js                # transcribeAudio() — Whisper
    │   ├── gemini.js              # evaluateAnswer() — optionele AI-uitleg
    │   ├── pronunciation.js       # ⭐ scoreTranscript() — het lokale oordeel
    │   ├── quiz.js                # bouwt meerkeuzevragen uit een les
    │   ├── review.js              # Leitner-herhaalsysteem
    │   ├── speakingProgress.js    # "beheerst"-status per spreek-item
    │   ├── snapshot.js            # voortgangs-snapshot + samenvatting
    │   └── tracker.js             # POSTs naar de webhook (fout/snapshot/bericht)
    └── components/
        ├── Header.jsx  LangToggle.jsx  ProgressBar.jsx  SoundText.jsx
        ├── Welcome.jsx  Dashboard.jsx  LevelCard.jsx  LevelView.jsx  LessonRow.jsx
        ├── LessonPlayer.jsx        # leren → quiz → klaar, of een oefening-type
        ├── SpeakingExercise.jsx    # opnemen → Whisper → lokaal oordeel → uitleg
        ├── ListenExercise.jsx      # "welk woord hoor je?" (minimale paren)
        ├── TypingExercise.jsx      # woord overtypen
        ├── ReviewSession.jsx       # dagelijkse herhaling (Leitner)
        ├── Settings.jsx            # sleutels/webhook/coach-modus
        ├── AdminDashboard.jsx      # verborgen coach-pagina (#admin)
        └── Help.jsx
```

---

## 6. Datamodel — `src/data/curriculum.js`

Schema: **`Level → Module → Lesson → Item`**. Nu: **3 niveaus, 25 modules, 76
lessen, 629 items.**

```js
{
  id: "niveau-0", order: 0, title: "Niveau 0", titleDarija: "المستوى 0",
  subtitle: "...", icon: "🔤", accent: "gent",
  modules: [{
    id: "0.1", title: "Klankleer & uitspraak", titleDarija: "الأصوات والنطق",
    lessons: [{
      id: "0.1.1", title: "Korte vs. lange klinkers", titleDarija: "...",
      type: "speaking",                 // bepaalt welk component de les speelt
      intro: "...", darijaNote: "...",
      items: [ /* zie hieronder */ ]
    }]
  }]
}
```

**Belangrijke `Item`-velden** (allemaal optioneel, afhankelijk van lestype):

| Veld | Betekenis |
|---|---|
| `nl` | het Nederlandse woord/de zin (wordt getoond, links-naar-rechts) |
| `answer` | verwacht antwoord; kan `"..."` bevatten voor open opdrachten |
| `pair` | het minimale-paar-woord (bv. `man` ↔ `maan`) |
| `darija` / `darijaLat` | vertaling in Arabisch schrift / transliteratie |
| `ipa` | IPA-uitspraak |
| `tip` / `tipDarija` | uitspraaktip (NL / Darija) |
| `word` | aanwezig ⇒ dit is een **losse letter** (alfabet); krijgt géén streng oordeel |
| `value` | getal (bij getallenlessen) |
| `article` / `icon` / `example` | lidwoord / emoji / voorbeeldzin |
| `pronunciation` | fijn-afstelling van het oordeel: `{ acceptedTranscripts[], commonConfusions[], highlight, tipNl, tipDarija, focus }` |

**Lestypes en welk component ze speelt** (zie `LessonPlayer.jsx`):

| `type` | Component | Aantal lessen |
|---|---|---|
| `speaking` | `SpeakingExercise` | 22 |
| `listen` | `ListenExercise` | 2 |
| `typing` | `TypingExercise` | 4 |
| `vocab`, `phrases`, `numbers`, `grammar` | `LessonPlayer` (kaartjes → auto-quiz) | 21 / 18 / 2 / 7 |

Helpers onderaan het bestand: `countLessons(level)`, `allLessonIds(level)`,
`getLevel(id)`.

---

## 7. Kernfuncties in detail

### 7.1 Voorlezen — `src/lib/speech.js`
`speak(text, { rate, onEnd })` gebruikt eerst de **Web Speech API** (`nl-BE`-stem) en
valt terug op **Google Translate-TTS** als er geen lokale stem is. Daarom staat in
`index.html` een `<meta name="referrer" content="no-referrer">` — Google TTS weigert
verzoeken mét een Referer. `canProbablySpeak()` / `isTTSAvailable()` gebruiken de UI
om te tonen wanneer voorlezen (offline) niet kan.

### 7.2 Spreekoefening (de pijplijn) — `SpeakingExercise.jsx`
1. `useRecorder` neemt op met `MediaRecorder` (auto-stop na 10–15 s).
2. De opname gaat naar **Groq Whisper** (`transcribeAudio`) met een **neutrale
   prompt** — bewust zónder het verwachte woord, anders stuur je de herkenning en
   is de controle waardeloos.
3. Het **oordeel** komt van `scoreTranscript` (lokaal, zie 7.3) — niet van AI.
4. Optioneel toont **Gemini** (`evaluateAnswer`) een korte bemoedigende uitleg
   (NL + Darija). Werkt volledig zonder Gemini.

### 7.3 Uitspraakbeoordeling — `src/lib/pronunciation.js` ⭐
Dit is het meest subtiele bestand. `scoreTranscript(item, transcript)` → `'good' | 'almost' | 'retry'`.

- `normalize()` haalt hoofdletters, accenten en leestekens weg.
- `acceptedFor(item)` = `pronunciation.acceptedTranscripts` of `[answer||nl||value]`.
- `confusionsFor(item)` = de minimale paren (`commonConfusions` of `pair`) → altijd
  hoogstens `'almost'`, want dát verschil is juist het leerdoel.
- **Zin** (≥ 2 woorden): vergevingsgezinde similarity-drempels (0.85 = goed, 0.55 = bijna).
- **Los woord**: `wordVariants()` denkt een toegevoegd lidwoord ("de man") of
  meervouds-'s' weg; exacte match = goed, 1 teken ruis = bijna, 2 tekens bij lange
  woorden = bijna, anders opnieuw.

> **Waarom dit belangrijk is:** Whisper is bij losse, korte woorden onbetrouwbaar
> (voegt lidwoorden toe, hoort net iets anders). Vroeger kregen woorden < 4 letters
> nul foutmarge → correcte uitspraak werd altijd "opnieuw". De huidige logica is
> bewust vergevingsgezind, terwijl de expliciete `commonConfusions` de didactische
> strengheid dragen.

### 7.4 Herhaalsysteem (Leitner) — `src/lib/review.js`
Elk beantwoord item krijgt een "box" (1–5). Goed → hoger, fout → terug naar 1. Items
"vervallen" (`dueList`/`dueCount`) op basis van hun box en laatste datum. `ReviewSession`
bouwt een dagelijkse meerkeuzeronde uit wat vandaag klaarstaat. Volledig lokaal.
Opslag: `nl-gent:review:v1`.

### 7.5 Voortgang, coach & webhook
- `ProgressContext` bewaart afgeronde lessen (`nl-gent:progress:v1`) en stuurt bij
  elke wijziging een **snapshot** (`buildSnapshot`) naar de webhook — **behalve** in
  coach-modus (`getCoachMode`), zodat het toestel van de partner de voortgang van de
  lerende niet overschrijft.
- `tracker.js` POST't drie soorten berichten naar de webhook (fire-and-forget,
  `mode:'no-cors'`): een **fout** (voor de wekelijkse herhaalles), een **snapshot**
  (voor de coach-pagina) en een **berichtje** van de partner.
- `google-apps-script.gs` is de backend: slaat fouten/snapshot/bericht op in een
  Google Sheet en genereert wekelijks (via Gemini) een herhaalles uit de meest
  gemaakte fouten. **Zie §9 — het `SECRET`-token is verplicht.**
- `AdminDashboard.jsx` (verborgen op `#admin`) leest de snapshot terug en toont de
  voortgang op afstand. Zet dit toestel in **coach-modus** via Instellingen.

### 7.6 Meertaligheid / RTL — `LanguageContext` + `translations.js`
`t('sleutel')` zoekt de tekst op in de actieve taal. `dir` = `rtl` in Darija; de app
draait dan om en pijlen keren mee. Content-items hebben eigen Darija-velden
(`darija`, `titleDarija`, `tipDarija`). **Regel:** voeg voor elke nieuwe UI-tekst
zowel een NL- als een Darija-vertaling toe.

---

## 8. Opslag (localStorage)

Alles is client-side; niets verlaat het toestel behalve de (optionele) webhook-snapshot.

| Sleutel | Inhoud |
|---|---|
| `nl-gent:progress:v1` | afgeronde lessen |
| `nl-gent:review:v1` | Leitner-boxen voor herhaling |
| `nl-gent:speak:v1` | "beheerst"-status per spreek-item |
| `nl-gent:lastPracticed:v1` | datum laatste oefening (dagelijkse nudge) |
| `nl-gent:lang:v1` | gekozen taal |
| `nl-gent:coach:v1` | staat dit toestel in coach/kijk-modus |
| `nl-gent:key:gemini` / `nl-gent:key:groq` | API-sleutels (per toestel) |
| `google_sheet_webhook_url` | webhook-URL |
| `nl-gent:webhook:token` | gedeeld webhook-geheim |

---

## 9. Configuratie & sleutels — `src/lib/config.js`

Sleutels komen uit **`localStorage`** (via Instellingen) óf uit een **`.env`**
(`VITE_GEMINI_API_KEY`, `VITE_GROQ_API_KEY`); de app-instelling heeft voorrang.
Modelnamen zijn overschrijfbaar via `VITE_GEMINI_MODEL` / `VITE_GROQ_MODEL`.

- Gebruik een **stabiele** model-id (bv. `gemini-2.5-flash`), geen `-latest`-alias:
  die wijzen naar preview-modellen en worden zonder waarschuwing afgeschaft (→ 404).
- `fetchWithRetry(url, opts, { timeoutMs })` doet een offline-check vooraf en één
  automatische herpoging bij een netwerk-hikje/5xx (nooit bij 4xx). Gebruik deze
  voor elke externe call.

> ⚠️ **Zet API-sleutels NOOIT als omgevingsvariabele in Vercel** voor een publieke
> deployment: Vite bakt `VITE_*` in de JS-bundel, dus de sleutel wordt dan voor
> elke bezoeker leesbaar. Laat gebruikers hun eigen sleutel via Instellingen invullen.

---

## 10. Deploy

De app draait **tegelijk** op twee hosts. Elke merge naar `main` bouwt beide opnieuw.

- **Vercel** — serveert op de root. `base` = `/`.
- **GitHub Pages** — serveert onder een submap. De workflow
  (`.github/workflows/deploy.yml`) zet `VITE_BASE=/nederlands-leren-gent/` bij de
  build; `vite.config.js` leest die var (`base: process.env.VITE_BASE || '/'`).
  Live: **https://cma58.github.io/nederlands-leren-gent/**

**PWA / service worker** (`vite-plugin-pwa`, `registerType: 'autoUpdate'`): de
app-schil is offline beschikbaar en installeerbaar. Externe AI-/TTS-calls worden
**niet** gecachet. `src/main.jsx` herlaadt de pagina één keer automatisch zodra een
nieuwe versie actief wordt — anders blijft de cache een oude versie tonen na een deploy.

**Werkwijze:** ontwikkel op branch `claude/dutch-learning-app-gent-2bwha4`, open een
PR naar `main`, merge → automatische deploy.

---

## 11. Veiligheid

- **Geen secrets in de repo** (geverifieerd); `.env` staat in `.gitignore`. De repo
  is **openbaar** — commit dus nooit een echte sleutel.
- **Frontend-sleutelmodel:** sleutels in de browser zijn zichtbaar voor de gebruiker
  zelf. Prima voor privégebruik; voor een gedeelde/publieke sleutel hoort een
  serverside proxy (nog niet gebouwd — zie §12).
- **Webhook (`google-apps-script.gs`):** het `SECRET`-token is **verplicht**
  (fail-closed): zonder token weigert het endpoint alles. Vergelijking gebeurt in
  constante tijd; invoer wordt begrensd en tegen CSV/formule-injectie beschermd.
  Stel `SECRET` in bij de Scripteigenschappen én in de app (Instellingen ▸
  webhook-token) en maak een nieuwe implementatie.
- **Nog te doen:** een Content-Security-Policy en beveiligingsheaders (zie §12).

---

## 12. Huidige status & wat er is gedaan

**Chronologie (kort):**
1. De taal-app is uit de oorspronkelijke repo (`senioren-launcher`) gehaald en naar
   een **eigen repo** verhuisd: `cma58/nederlands-leren-gent`.
2. **Deploy ingericht:** Vercel (root) + GitHub Pages (submap via `VITE_BASE`) +
   automatische Pages-workflow. Repo is openbaar gemaakt zodat Pages gratis werkt.
3. **Expertreview** (React/code, veiligheid, senior-UX, performance) → **Tier 1 & 2
   uitgevoerd:**
   - *Tier 1:* webhook-token verplicht + hardening; `fetchWithRetry` (offline-check +
     retry); opname-geheugenlek gefixt; **PWA/offline** toegevoegd.
   - *Tier 2:* live-aankondigingen (aria-live), `inert`-achtergrond bij overlays,
     grotere teksten, grotere taalknop, beter contrast, minder jargon voor de
     lerende, microfoon-uitleg vooraf, en **32 ontbrekende `titleDarija`** aangevuld.
4. **Spraakoefening gefixt** (klacht: correcte uitspraak werd niet begrepen):
   eerlijkere `scoreTranscript` voor korte woorden, lidwoord/meervoud wegdenken,
   zin-drempel vanaf 2 woorden, dubbele-opname-race gesloten, duidelijke melding bij
   mislukte opname, service-worker **auto-update** zodat een fix ook echt geladen wordt.

**Openstaand (nog niet gedaan) — Tier 3 & 4 uit de review:**
- *Tier 3 (code/performance):* gedeelde componenten extraheren (meerkeuzevraag,
  voortgangsstippen, modal-hook), code-splitting met `React.lazy`, `curriculum.js`
  per niveau splitsen, **CSP/beveiligingsheaders**, Vitest + ESLint opzetten,
  `Dashboard`-berekeningen memoïseren.
- *Tier 4 (puntjes):* ontbrekende Darija-tips/woorden, `prefers-reduced-motion`, een
  "grote tekst"-instelling, waarschuwing bij vol `localStorage`, dode code opruimen
  (`LESSON_TYPES`, `getLevel`).

De losse **`darija-*.md`**-bestanden zijn **nakijk-werkbladen**: voorstellen voor
Darija-vertalingen die een moedertaalspreker nog mag corrigeren en die daarna in
`curriculum.js` verwerkt worden. Het zijn geen code.

---

## 13. Zo breid je uit

- **Nieuwe les/module/niveau:** voeg een object toe aan `curriculum.js`. Dashboard,
  voortgang en herhaling passen zich automatisch aan. Geef elke les een `type`,
  elke les/module/niveau een `title` **én** `titleDarija`, en elk item minstens
  `nl` (+ `darija`/`darijaLat` waar mogelijk).
- **Nieuw lestype:** kies een `type`-naam, schrijf een component en plug het in op
  basis van `lesson.type` in `LessonPlayer.jsx`. Hergebruik `SoundText`, de
  voortgangsstippen en het oordeel uit `pronunciation.js`.
- **Uitspraak fijner afstellen:** gebruik `item.pronunciation.acceptedTranscripts`
  (extra geldige antwoorden) en `commonConfusions` (streng te houden verwarringen).
- **Nieuwe UI-tekst:** voeg een sleutel toe in `translations.js` in **beide** talen
  en gebruik `t('sleutel')`. Nooit tekst hardcoden.
- **Nieuwe externe call:** ga via `fetchWithRetry` en geef fouten een `.status`-code
  die `errorKeyToText` (in `SpeakingExercise.jsx`) naar een vriendelijke melding vertaalt.

---

## 14. Bekende valkuilen

- **Whisper + korte woorden:** onbetrouwbaar; houd `scoreTranscript` vergevingsgezind
  en leun op `commonConfusions` voor de echte leerdoelen.
- **Minimale paren zijn expres streng:** een correct woord dat als het paar-woord
  wordt gehoord toont "bijna goed" — dat is bedoeld, geen bug.
- **Service-worker-cache:** na een deploy ziet een gebruiker soms nog de oude versie
  tot de auto-reload (of een harde refresh) de nieuwe laadt. Bij het testen: ververs.
- **iOS/Safari-opname** is `audio/mp4` (fragmented) — kan Whisper minder goed liggen
  dan `audio/webm` op Android. Test op het echte toestel.
- **`base`-pad:** verander de `VITE_BASE`-logica niet zonder beide hosts te testen;
  een fout `base` breekt alle asset-paden (Vercel = `/`, Pages = submap).
- **Deze omgeving** kan `*.github.io`/`*.vercel.app` niet bereiken (netwerkbeleid),
  dus de live-app is niet vanuit de agent te testen — verifieer in de browser.
