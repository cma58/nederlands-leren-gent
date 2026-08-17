# Nederlands leren in Gent

Een mobiele, tweetalige leerapp voor Nederlands in Gent. De volledige interface
is beschikbaar in Nederlands en Darija met Latijnse letters.

## Wat deze versie bevat

- zelfregistratie met gebruikersnaam en wachtwoord;
- status `PENDING` totdat een admin de aanvraag goedkeurt;
- veilige HttpOnly-sessies en eenmalige resetcodes;
- cloudvoortgang, herhaling en spreekstatistieken per account;
- geschatte actieve leertijd zonder dubbel tellen van tabbladen;
- adminoverzicht voor gebruikers, activiteit en recente pogingen;
- tweetalige extra en verplichte opdrachten;
- Groq Whisper via een beveiligde serverroute, nooit met een sleutel in de browser;
- lokale audiokwaliteitscontrole en expliciete onzekere/technische uitkomsten;
- een veilige eenmalige import van voortgang uit de vroegere lokale versie.

De oude verborgen `#admin`, Google Sheet-webhook, coachmodus en lokale
providerkeys zijn verwijderd.

## Architectuur

- React 18, Vite en Tailwind voor de PWA-interface;
- Cloudflare Worker als same-origin `/api`;
- Cloudflare D1 voor accounts, sessies, voortgang, activiteit en opdrachten;
- optioneel Resend voor een registratiebericht aan `amine.chtaiti@gmail.com`;
- Groq Free als primaire spraakherkenner, met harde quota in de Worker;
- een voorbereide lokale second-opinion-adapter die eerlijk `niet beschikbaar`
  meldt totdat een gecontroleerd Nederlands Vosk-model wordt meegeleverd.

Er is geen betaalde fallback en de app bevat geen betaalkaart- of
facturatie-integratie.

## Lokaal starten

Vereisten: Node.js 20+ en een gratis Cloudflare-account voor D1.

```bash
npm install
cp .dev.vars.example .dev.vars
npm run db:migrate:local
npm run dev:api
```

Start in een tweede terminal:

```bash
npm run dev
```

De Vite-server draait op `http://localhost:5173` en stuurt `/api` door naar de
lokale Worker op poort 8787. Zet lokaal `COOKIE_SECURE=false` in `.dev.vars`.

## Eerste admin

De enige admin wordt eenmalig aangemaakt met het servergeheim
`ADMIN_BOOTSTRAP_SECRET`. Het e-mailadres wordt server-side vastgezet op
`amine.chtaiti@gmail.com`. Na de eerste deploy open je `#setup-admin`; het
geheim wordt niet in de browser bewaard en de server weigert daarna een tweede
bootstrap. Zie [CLOUDFLARE_SETUP.md](CLOUDFLARE_SETUP.md) voor de volledige
klikhandleiding en [worker/README.md](worker/README.md) voor het API-contract.

## GitHub en deployment

Een push of pull request voert automatisch tests en de productiebuild uit. De
oude GitHub Pages-deploy is verwijderd, omdat een statische host geen veilige
accounts of `/api` kan leveren. Na het invullen van de echte D1-ID en de GitHub
secrets `CLOUDFLARE_API_TOKEN` en `CLOUDFLARE_ACCOUNT_ID` kan de workflow
`Controle en Cloudflare-deploy` handmatig naar Cloudflare publiceren.

De workflow voert de D1-migraties uit en zet de twee verplichte Worker-secrets
`ADMIN_BOOTSTRAP_SECRET` en `GROQ_API_KEY` tijdens de deploy veilig door.

## Testen

```bash
npm test
npm run build
```

Voor productie moeten ook de registratie-, goedkeurings-, reset-, opdracht-,
multi-tab- en spraakflows met echte testaccounts worden doorlopen. Ruwe audio
wordt niet opgeslagen.
