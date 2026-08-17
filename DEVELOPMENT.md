# Ontwikkelgids

## Hoofdregels

1. De browser praat alleen met dezelfde origin via `/api`.
2. Identiteit en `user_id` worden altijd uit de HttpOnly-sessie gehaald.
3. Provider- en databasegeheimen worden uitsluitend als Worker secrets ingesteld.
4. Alle nieuwe zichtbare tekst bestaat in Nederlands én Darija met Latijnse letters.
5. Audio en vrije transcripties worden niet in voortgang, pogingen of logs bewaard.
6. Een providerfout, quotum of onmeetbare opname is nooit een uitspraakfout.
7. Geen enkele onzekere machinescore mag een leerling permanent blokkeren.

## Frontend

- `src/App.jsx`: publieke/auth/status/admin/leerflow en route-gates.
- `src/context/AuthContext.jsx`: sessie en accountstatus.
- `src/context/ProgressContext.jsx`: servervoortgang, offline latest-state queue en
  eenmalige lokale import.
- `src/i18n/translations.js`: bestaande leerinterface NL/Darija-Latijn.
- `src/lib/uiCopy.js`: account- en beheerinterface NL/Darija-Latijn.
- `src/components/AdminDashboard.jsx`: accounts, activiteit, pogingen en opdrachten.
- `src/lib/speechCascade.js`: lokale kwaliteitscontrole, primaire transcriptie en
  risicogestuurde second opinion.

Darija gebruikt `lang="ary-Latn"`, `dir="ltr"`. Lesitems tonen `darijaLat`; oude
Arabische velden blijven alleen als brondata aanwezig en worden niet gerenderd.

## Backend

De Worker staat in `worker/src`. Het D1-schema staat in `migrations`. Zie
[`worker/README.md`](worker/README.md) voor routes en configuratie.

De Worker moet samen met `dist` op dezelfde origin draaien. `wrangler.toml`
laat alle requests eerst door de Worker afhandelen: `/api/*` gaat naar de API en
statische assets krijgen daar de CSP- en andere beveiligingsheaders.

## Voortgang en activiteit

Lesvoortgang wordt optimistisch bijgewerkt en met een unieke `eventId`
idempotent gesynchroniseerd. Review- en spreekstatus sturen compacte state-events
naar dezelfde cloudsnapshot.

De activity hook stuurt elke 30 seconden alleen een puls bij een zichtbare,
recent gebruikte app. De server gebruikt eigen tijd, negeert herhalingen en telt
overlappende 30-secondenbuckets van meerdere tabbladen maar één keer.

## Spraak

1. De browser controleert duur, stilte en clipping.
2. `/api/speech/transcribe` gebruikt Groq met een server-side sleutel.
3. Gewone woorden/zinnen met een duidelijk resultaat kunnen direct doorgaan.
4. Letters, zeer korte woorden en minimale paren vragen een onafhankelijke
   second opinion.
5. Zolang geen gecontroleerd lokaal model is geïnstalleerd, wordt zo'n geval
   `REVIEW_PENDING` in plaats van onterecht goed/fout.

## Controle voor iedere release

```bash
npm test
npm run build
rg --pcre2 '[\p{Arabic}]' src --glob '!src/data/curriculum.js'
rg 'VITE_.*KEY|google_sheet_webhook|#admin' src worker
```

Voer daarna handmatig uit: registratie, pending login, goedkeuring, blokkering,
resetcode, wachtwoordwijziging, twee gelijktijdige tabbladen, offline reconnect,
extra/verplichte opdracht, quota en slechte audio.
