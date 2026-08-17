# Nederlands leren in Gent 🇧🇪 — voor Darija-sprekers

Een interactieve webapp waarmee een Marokkaans-Darija sprekende gebruiker (uit
Oujda) stap voor stap **Vlaams-Nederlands** leert om vlot in **Gent** te
integreren. De cursus houdt rekening met de klank- en taalverschillen tussen het
Darija en het Nederlands, is volledig **tweetalig (NL + Darija, met RTL)** en
**mobiel-eerst** ontworpen.

> 📖 **Nieuwe ontwikkelaar?** Lees **[`DEVELOPMENT.md`](./DEVELOPMENT.md)** — dat
> beschrijft de volledige architectuur, hoe elke functie werkt, de deploy, de
> veiligheid, de huidige status en hoe je uitbreidt.

## Wat kan de app?

- **Volledige leerlijn:** 3 niveaus, 25 modules, 76 lessen, ~629 items.
- **Lestypes:** kaartjes + auto-quiz (woordenschat/zinnen/getallen/grammatica),
  **spreekoefening** (opnemen + herkenning + oordeel), **luisteroefening**
  (minimale paren) en **typoefening**.
- **Voorlezen** in het Vlaams (Web Speech API, met online fallback).
- **Dagelijkse herhaling** met een Leitner-systeem (volledig offline).
- **Coach-modus:** een partner kan de voortgang op afstand volgen en een berichtje
  sturen (via een Google Sheet-webhook).
- **Offline & installeerbaar** (PWA): de app-schil werkt zonder internet.

## Tech stack

**React 18 + Vite 6** · **Tailwind CSS** · **Web Speech API** (voorlezen) ·
**Groq Whisper** (spraak → tekst) · **Google Gemini** (optionele AI-uitleg) ·
**Google Apps Script** (voortgang op afstand) · **vite-plugin-pwa** (offline).

De app is volledig client-side; er is geen eigen backend.

## Snel starten

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # productie-build in dist/
```

Alle lessen, quizzen, luister- en typoefeningen werken **zonder sleutels**. Alleen
de **spreekoefening** heeft twee gratis sleutels nodig:

1. **In de app (makkelijkst):** tandwiel (⚙️) rechtsboven → sleutels plakken
   (worden lokaal op het toestel bewaard).
2. **Via `.env`:** `VITE_GEMINI_API_KEY` en `VITE_GROQ_API_KEY`.

- Gemini-sleutel: https://aistudio.google.com/app/apikey
- Groq-sleutel: https://console.groq.com/keys

> ⚠️ Zet deze sleutels **nooit** als omgevingsvariabele in een publieke Vercel-/
> hostingdeployment — ze belanden dan leesbaar in de JS-bundel. Zie `DEVELOPMENT.md` §9/§11.

## Deploy

Elke merge naar `main` deployt automatisch naar **GitHub Pages**
(https://cma58.github.io/nederlands-leren-gent/) en **Vercel**. Details, inclusief
het `VITE_BASE`-pad per host, staan in [`DEVELOPMENT.md`](./DEVELOPMENT.md) §10.

## Structuur (kort)

```
src/
├── data/curriculum.js     # ⭐ de volledige leerlijn (data-gedreven)
├── context/               # taal (i18n/RTL) + voortgang
├── lib/                   # speech, groq, gemini, pronunciation (oordeel), review, …
└── components/            # Dashboard, LessonPlayer, SpeakingExercise, …
```

Uitgebreide toelichting per bestand: zie [`DEVELOPMENT.md`](./DEVELOPMENT.md).
</content>
