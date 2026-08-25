# Cloudbackend – Nederlands Leren Gent

Deze Worker maakt D1 de centrale bron voor accounts, voortgang, actieve leertijd,
opdrachten en pedagogische pogingen. Er zijn geen betaalde diensten nodig. Resend
is uitsluitend een optionele registratie­melding; een aanvraag blijft altijd in
het admindashboard staan wanneer e-mail ontbreekt of faalt.

## Veiligheidsmodel

- Wachtwoorden: PBKDF2-SHA-256 met het workerd-maximum van 100.000 iteraties,
  een unieke salt en `ADMIN_BOOTSTRAP_SECRET` als server-side pepper.
- Sessies: 256-bit willekeurig token; alleen de SHA-256-hash staat in D1.
- Cookie: `HttpOnly`, `SameSite=Strict`, productie `Secure`, pad `/api`.
- Mutaties van een onbekende browser-origin worden geweigerd.
- Rollen en user-scope worden bij elke API-aanroep server-side gecontroleerd.
- Login, registratie en reset zijn per gehashte gebruikersnaam/IP begrensd.
- Adminresets tonen een eenmalige code; het bestaande wachtwoord is nooit leesbaar.
- Meerdere tabbladen tellen dezelfde actieve 30-secondenbucket niet dubbel.
- Pogingsmetadata gebruikt een allowlist en accepteert nooit audiobestanden.
- Vaste lesaudio kan alleen door de admin worden toegevoegd of vervangen;
  alleen aangemelde gebruikers kunnen de bestanden beluisteren.
- Alle beheeracties komen in `audit_log`.

API-fouten zijn altijd:

```json
{
  "ok": false,
  "code": "ACCOUNT_PENDING",
  "message": {
    "nl": "Je account wacht nog op goedkeuring.",
    "darija": "L7sab dyalk mazal kaytsenna lmosada9a."
  }
}
```

De Darija-teksten gebruiken uitsluitend Latijnse letters en cijfers. De frontend
mag primair op de stabiele `code` vertalen en de meegestuurde tekst als fallback
gebruiken.

## Installatie en eerste admin

1. Maak een Cloudflare D1-database en vul de database-ID in `wrangler.toml` in.
2. Kopieer `.dev.vars.example` naar `.dev.vars` voor lokaal gebruik. Commit dit
   bestand nooit.
3. Stel productiegeheimen in:

```bash
npx wrangler secret put ADMIN_BOOTSTRAP_SECRET
npx wrangler secret put GROQ_API_KEY
npx wrangler secret put RESEND_API_KEY       # alleen indien gewenst
npx wrangler secret put RESEND_FROM_EMAIL    # alleen indien gewenst
```

4. Pas `APP_ORIGIN` exact aan. Meerdere toegestane frontends zijn komma-gescheiden.
5. Voer de migratie uit en start/deploy:

```bash
npx wrangler d1 migrations apply nederlands-leren-gent --local
npx wrangler dev
npx wrangler d1 migrations apply nederlands-leren-gent --remote
npx wrangler deploy
```

6. Maak de enige admin eenmalig aan. Open bij voorkeur
   `https://JOUW-WORKER/#setup-admin`. De e-mail wordt server-side vastgezet op
   `amine.chtaiti@gmail.com`. Als alternatief kan dit via de terminal:

```bash
curl -X POST https://JOUW-WORKER/api/admin/bootstrap \
  -H 'content-type: application/json' \
  -H 'x-bootstrap-secret: JOUW-EENMALIGE-GEHEIM' \
  --data '{"username":"amine","displayName":"Amine","password":"EEN-LANG-UNIEK-WACHTWOORD"}'
```

Bewaar `ADMIN_BOOTSTRAP_SECRET` in een wachtwoordkluis als noodherstelgeheim en
laat het uitsluitend als Worker secret staan. Dit geheim beschermt ook de
wachtwoordhashes; roteer het daarom niet zonder een geplande wachtwoordmigratie.
De database weigert technisch een
tweede admin. Als de enige admin zijn wachtwoord vergeet, kan hij zonder D1-edit
een nieuw wachtwoord instellen:

```bash
curl -X POST https://JOUW-WORKER/api/admin/recover \
  -H 'content-type: application/json' \
  -H 'x-bootstrap-secret: JOUW-EENMALIGE-GEHEIM' \
  --data '{"newPassword":"EEN-NIEUW-LANG-UNIEK-WACHTWOORD"}'
```

Dit trekt alle bestaande adminsessies en resetcodes in en schrijft een auditregel.

Voor lokaal testen zet je `COOKIE_SECURE=false`. In productie moet dit `true`
blijven. Zet de frontend-fetches op `credentials: "include"`.

## API-contract

Alle succesvolle antwoorden beginnen met `{ "ok": true }`.

### Account

| Methode | Route | Body / resultaat |
|---|---|---|
| POST | `/api/auth/register` | `{username, displayName?, password}` → PENDING user |
| POST | `/api/auth/login` | `{username,password}` → user + HttpOnly-cookie |
| POST | `/api/auth/logout` | cookie intrekken |
| GET | `/api/auth/session` | `{user}`; `user` is `null` zonder geldige sessie |
| GET | `/api/auth/me` | alias van `/session` |
| POST | `/api/auth/change-password` | `{currentPassword,newPassword}` |
| POST | `/api/auth/reset-password` | `{username,code,newPassword}` |
| POST | `/api/admin/recover` | noodherstel met `x-bootstrap-secret` en `{newPassword}` |

Een user bevat `id`, `username`, `displayName`, `email`, `role`, `status`,
`mustChangePassword`, `createdAt`, `updatedAt`, `lastLoginAt` en `approvedAt`.
De adminlijst voegt `activeSeconds`, `lastActiveAt`, `online` (activiteit in de
laatste 90 seconden) en `openAssignments` toe.

### Admin

| Methode | Route | Resultaat / body |
|---|---|---|
| GET | `/api/admin/users?status=PENDING` | `{users}`; zonder filter maximaal 250 |
| POST | `/api/admin/users/:id/approve` | status ACTIVE |
| POST | `/api/admin/users/:id/reject` | status REJECTED |
| POST | `/api/admin/users/:id/block` | status SUSPENDED en sessies intrekken |
| POST | `/api/admin/users/:id/unblock` | status ACTIVE |
| POST | `/api/admin/users/:id/password-reset` | `{resetCode,expiresAt}`; code eenmalig zichtbaar |
| GET | `/api/admin/users/:id/activity` | actieve seconden + laatste 100 pogingen |
| GET | `/api/admin/audit` | laatste 250 beheer-/veiligheidsacties |
| GET | `/api/admin/reference-audio` | 74 opnameprompts met opname-/voortgangsstatus |
| POST | `/api/admin/reference-audio` | multipart: `promptId`, `durationMs`, `consentConfirmed=yes`, `audio`; maakt of vervangt één vaste lesopname |
| DELETE | `/api/admin/reference-audio/:promptId` | verwijdert één vaste lesopname; de les valt terug op TTS |

`suspend` en `activate` bestaan als expliciete aliassen van `block` en `unblock`.

### Vaste lesaudio opnemen

Open als beheerder **Beheer → Lesaudio**. De studio toont vijf reeksen met in
totaal 74 korte clips: 26 letternamen, 26 letterzinnen, 12 klankwoorden, vijf
eerste woorden en vijf Darija-instructies. Per clip:

1. lees de getoonde tekst exact voor;
2. beluister de volledige nieuwe opname;
3. bevestig dat de stem met toestemming als lesaudio gebruikt mag worden;
4. kies **Goedkeuren en opslaan**;
5. ga naar **Volgende ontbrekende**.

Een opgeslagen clip is direct gekoppeld via zijn vaste `promptId`. Een nieuwe
versie vervangt de oude koppeling; er is geen codewijziging of bestandsnaamwerk
nodig. Ontbreekt een clip, dan valt de les terug op de bestaande toestel-/online
computerstem. De downloadroute is `GET /api/reference-audio/:promptId`.

Per clip geldt maximaal 750 kB en maximaal acht seconden. Zelfs wanneer alle 74
clips de volledige 750 kB gebruiken, is dat ongeveer 56 MB. Dit blijft ruim
onder de D1 Free-limiet van 500 MB per database en iedere rij blijft onder de
D1-limiet van 2 MB. Controleer vóór publieke livegang alle clips op een echte
iPhone en Android-telefoon.

De Worker controleert naast het opgegeven MIME-type ook de echte
WebM/Ogg/WAV/MP4/MP3-container en bewaart een SHA-256-checksum. Een veranderde
prompttekst maakt de bestaande clip automatisch ongeldig totdat ze opnieuw is
opgenomen. De admin kan een clip expliciet verwijderen. Door D1 Time Travel kan
verwijderde of vervangen data op het gratis plan nog maximaal zeven dagen in
een herstelpunt aanwezig zijn; leg dit ook uit aan een eventuele tweede
stemacteur.

### Voortgang

`GET /api/progress` geeft:

```json
{
  "ok": true,
  "completed": {},
  "reviewState": {},
  "speakingState": {},
  "updatedAt": null
}
```

`PUT /api/progress` accepteert een gedeeltelijk document plus een unieke,
client-gegenereerde `eventId`:

```json
{
  "eventId": "sync:550e8400-e29b-41d4-a716-446655440000",
  "completed": {},
  "reviewState": {},
  "speakingState": {},
  "merge": false
}
```

Ontbrekende delen blijven ongewijzigd. Een meegestuurd deel vervangt normaal dat
volledige deel. Met `merge:true` worden de eigen sleutels via een atomaire D1
JSON-merge over de serverdata gelegd; dit is bedoeld voor de eenmalige legacy-import.
De totale body is maximaal 500 kB. Een `eventId` is idempotent en kan niet later
met een andere payload hergebruikt worden.

### Actieve leertijd en pogingen

- `POST /api/activity/heartbeat`
  `{sessionId,sequence,state:"active"|"idle"|"hidden"}` →
  `{serverTime,counted,activeSeconds}`. Alleen `active` kan een serverbucket tellen.
- `POST /api/attempts`
  `{eventId,lessonId,itemKey?,type,result,score?,maxScore?,metadata?}`.
  `eventId` maakt de poging idempotent.

Pogingstype: `QUIZ`, `SPEAKING`, `LISTENING`, `TYPING`, `REVIEW` of `LESSON`.
Resultaat: `COMPLETED`, `CORRECT`, `INCORRECT`, `ALMOST`, `UNCERTAIN`,
`TECHNICAL_ERROR`, `SKIPPED`, `GOOD`, `RETRY`, `UNSCORABLE` of
`REVIEW_PENDING`. Metadata mag alleen kleine pedagogische velden
bevatten (`durationMs`, `confidence`, `exerciseId`,
`attemptNumber`, `reason`, `model`, `quality`, `pronunciationStatus`).

### Spraakproxy

`POST /api/speech/transcribe` is een multipart-aanvraag met `audio` (ondersteund
audio-MIME-type, maximaal 5 MB) en `durationMs` (standaard 250–30.000 ms). Het
antwoord is `{ok:true,text,confidence?,noSpeechProbability?,provider}`. De Worker:

- vereist een ACTIVE sessie;
- stuurt nooit het verwachte antwoord als prompt naar Groq;
- bewaart of logt de opname niet;
- bewaart alleen het aantal aanvragen en gemeten audioseconden per dag;
- begrenst standaard per gebruiker op 100 aanvragen/600 seconden per dag;
- vertaalt eigen of upstreamlimieten naar `QUOTA_REACHED` (HTTP 429).

Stel `GROQ_API_KEY` uitsluitend in met `wrangler secret put GROQ_API_KEY`. Het
gratis Groq-account blijft zelf de laatste harde providergrens; er is geen
betaalde fallback.

### Opdrachten

- `GET /api/assignments` → opdrachten van de aangemelde leerling.
- `POST /api/assignments/:id/complete` → eigen opdracht afronden. Een verplichte
  opdracht vereist eerst een bijpassende poging die het ingestelde doel behaalt.
- `GET /api/admin/assignments?userId=...` → beheerweergave.
- `POST /api/admin/assignments` maakt een opdracht:

```json
{
  "userId": "uuid",
  "kind": "REQUIRED",
  "targetType": "LESSON",
  "targetId": "level-1-lesson-2",
  "title": {"nl":"Herhaal begroetingen","darija":"3awed t7iyyat"},
  "instructions": {"nl":"Behaal 80%.","darija":"Jib 80%."},
  "successCriteria": {"minimumPercent":80},
  "startsAt": null,
  "dueAt": "2026-09-01T18:00:00.000Z"
}
```

- `PATCH /api/admin/assignments/:id` wijzigt tweetalige tekst, data of status
  (`OPEN`, `COMPLETED`, `EXEMPT`, `CANCELLED`).

## Grenzen van deze eerste backendversie

- De Worker levert alleen de primaire Groq-transcriptie. De lokale Vosk-fallback
  en de uiteindelijke uitspraakbeslissing blijven bewust in de client.
- Actieve tijd is bewust een schatting in unieke 30-secondenbuckets, geen bewijs
  dat iemand voortdurend naar het scherm keek.
- Resend vereist een geverifieerde afzender. Zonder configuratie blijft het
  dashboard de betrouwbare bron voor aanvragen.
- D1-back-ups, dataretentie en een privacy-export/verwijderworkflow moeten vóór
  publieke productie als beheerprocedure worden vastgelegd.
