# Nederlands leren in Gent

Een mobiele, tweetalige leerapp voor Nederlands in Gent. De volledige interface
is beschikbaar in Nederlands en Darija met Latijnse letters.

## Live app

[Open Nederlands leren in Gent](https://nederlands-leren-gent-api.amine-chtaiti.workers.dev)

De app is gemaakt voor echte beginners die zo snel mogelijk bruikbaar
Nederlands willen leren voor het dagelijkse leven in Gent. De leerroute
combineert korte lessen, luisteren, spreken, typen, herhalen en praktijksituaties.

## Wat deze versie bevat

- zelfregistratie met gebruikersnaam en wachtwoord;
- status `PENDING` totdat een admin de aanvraag goedkeurt;
- veilige HttpOnly-sessies en eenmalige resetcodes;
- cloudvoortgang, herhaling en spreekstatistieken per account;
- geschatte actieve leertijd zonder dubbel tellen van tabbladen;
- adminoverzicht voor gebruikers, activiteit en recente pogingen;
- tweetalige extra en verplichte opdrachten;
- Niveau 0 met praktische eerste woorden en een verweven alfabetroute;
- Niveau 1 en 2 met menselijke Vlaamse lesaudio en computerstem als reserve;
- een beveiligde admin-opnamestudio die audio automatisch aan lessen koppelt;
- uitspraakopnames met automatische herkenning en menselijke controle bij twijfel;
- herhaling volgens het Leitner-principe;
- optionele, begrensde AI-uitleg bij woorden en algemene uitspraaktips;
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

## Ontwikkelroute na kritische beoordeling

Twintig expertrollen uit NT2-didactiek, geheugenonderzoek, uitspraak,
Darija, toegankelijkheid, privacy, AI en mobiele UX hebben de leerroute
kritisch naast elkaar gelegd. Hun gezamenlijke prioriteiten zijn:

1. Een dagelijkse adaptieve sessie van 3, 7 of 12 minuten: eerst herhalen,
   daarna enkele nieuwe taalblokken, spreken en een korte Gentse missie.
2. Praktijkscenario's zoals de bakker, bus, dokter, gemeente, school en werk.
3. `Bekeken` en `beheerst` afzonderlijk meten voor luisteren, spreken, lezen
   en zelf gebruiken.
4. Niveau 1 opdelen in kleinere lessen van maximaal 5–7 nieuwe elementen en
   Niveau 2 uitbreiden met luisteren, spreken en dialogen.
5. Ook luister-, spreek- en typefouten opnemen in de gespreide herhaling.
6. Darija-hulp geleidelijk afbouwen: eerst zichtbaar, daarna op aanvraag en
   uiteindelijk Nederlands met beeld en context.
7. Een knop `Ik zit vast` met tragere audio, eenvoudige uitleg en één concrete
   volgende stap.
8. Een persoonlijk overzicht van de vijf moeilijkste woorden of klanken,
   zonder straffende streaks of een ondoorzichtige AI-route.

De vaste leerlus voor nieuwe onderdelen wordt:

`kort leren → zonder hulp ophalen → fout uitleggen → opnieuw proberen → in een praktijksituatie gebruiken → later herhalen`.

## Lokaal starten

Vereisten: Node.js 22+ en een gratis Cloudflare-account voor D1.

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
secret `CLOUDFLARE_API_TOKEN` publiceert de workflow
`Controle en Cloudflare-deploy` iedere gevalideerde push naar `main`
automatisch naar Cloudflare. De niet-geheime Account ID staat in
`wrangler.toml`; een handmatige workflowstart blijft mogelijk.

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
