# Cloudflare installeren zonder betaalkaart

Deze handleiding hoort bij de cloudversie van **Nederlands leren in Gent**. De
productieconfiguratie gebruikt Cloudflare Workers + D1 en Groq. Er is geen
betaalde fallback in de code. Kies overal de gratis laag en activeer geen
betaald abonnement.

## Wat je veilig met een helper mag delen

| Waarde | Delen via chat? | Waarvoor |
|---|---:|---|
| D1 `database_id` | Ja | Koppeling tussen Worker en database |
| Cloudflare Account ID | Ja | GitHub-deploy naar jouw account |
| publieke `workers.dev`-URL | Ja | App openen en testen |
| Cloudflare API-token | **Nee** | Geeft publicatierechten |
| Groq API-key | **Nee** | Geeft toegang tot spraakquota |
| `ADMIN_BOOTSTRAP_SECRET` | **Nee** | Maakt/herstelt de enige admin |
| adminwachtwoord | **Nee** | Persoonlijke toegang |

## 1. D1-database maken

1. Meld aan op [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Open **Workers & Pages** → **D1 SQL Database** → **Create database**.
3. Vul exact `nederlands-leren-gent` in.
4. Open onder **Data location** de keuze **Specify jurisdiction** en kies
   **European Union (EU)**. Dit moet bij het aanmaken gebeuren en kan later niet
   aan dezelfde database worden toegevoegd.
5. Open de database en kopieer **Database ID**.
6. Vervang in `wrangler.toml` de nulwaarde bij `database_id` door deze ID.

Via een terminal kan dezelfde stap met:

```bash
npx wrangler d1 create nederlands-leren-gent --jurisdiction eu
```

## 2. Twee eigen geheimen klaarmaken

1. Maak in je wachtwoordbeheerder een willekeurig geheim van minstens 48
   tekens. Noem dit `ADMIN_BOOTSTRAP_SECRET` en bewaar het permanent.
2. Open [Groq API Keys](https://console.groq.com/keys), meld aan en maak een
   API-key. Bewaar deze als `GROQ_API_KEY`.

Plak geen van beide waarden in broncode, een issue, chat of e-mail.

## 3. Cloudflare-token voor GitHub maken

1. Open [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens).
2. Kies **Create Token** → **Create Custom Token**.
3. Geef het token bijvoorbeeld de naam `GitHub deploy Nederlands Gent`.
4. Voeg onder **Permissions** exact deze twee accountrechten toe:
   - **Account** → **Workers Scripts** → **Edit**
   - **Account** → **D1** → **Edit**
5. Kies onder **Account Resources** → **Include** → jouw eigen account. Voeg
   geen IP-filter of vervaldatum toe tijdens de eerste installatie.
6. Kies **Continue to summary** → **Create Token**.
7. Kopieer het token meteen naar je wachtwoordbeheerder; Cloudflare toont het
   maar één keer.

`D1:Edit` is nodig omdat dezelfde workflow vóór iedere deploy gecontroleerde
databasemigraties uitvoert. Zonder dat recht kan de frontend wel bouwen, maar
stopt de clouddeploy vóór het databaseschema klaarstaat.

## 4. Drie GitHub Actions-secrets instellen

Open rechtstreeks:
[Repository secrets](https://github.com/cma58/nederlands-leren-gent/settings/secrets/actions)

De Cloudflare Account ID staat al als niet-geheime configuratiewaarde in
`wrangler.toml`. Kies telkens **New repository secret** en voeg exact deze drie
namen toe:

| Naam | Waarde |
|---|---|
| `CLOUDFLARE_API_TOKEN` | het Cloudflare-token uit stap 3 |
| `ADMIN_BOOTSTRAP_SECRET` | het lange eigen geheim uit stap 2 |
| `GROQ_API_KEY` | de Groq-key uit stap 2 |

## 5. Publiceren

1. Controleer eerst dat de echte D1-ID in `wrangler.toml` op GitHub staat.
2. Iedere push naar `main` voert automatisch tests, de productiebuild,
   D1-migraties en de Worker-deploy uit. Je kunt dezelfde workflow zo nodig ook
   handmatig starten via [GitHub Actions](https://github.com/cma58/nederlands-leren-gent/actions)
   → **Controle en Cloudflare-deploy** → **Run workflow**.
3. Open de geslaagde job. Onderaan staat de publieke URL, normaal
   `https://nederlands-leren-gent-api.<jouw-subdomein>.workers.dev`.

## 6. De enige beheerder aanmaken

Open achter de publieke URL:

```text
https://nederlands-leren-gent-api.<jouw-subdomein>.workers.dev/#setup-admin
```

1. Gebruikersnaam `amine` en naam `Amine` zijn al ingevuld en mogen aangepast
   worden.
2. Kies een uniek beheerderswachtwoord van minstens 10 tekens.
3. Plak lokaal het `ADMIN_BOOTSTRAP_SECRET`.
4. Kies **Beheerder veilig aanmaken**.

Het e-mailadres staat server-side vast op `amine.chtaiti@gmail.com`. De server
weigert daarna iedere tweede bootstrap. Het bootstrapgeheim blijft nodig als
noodherstel en hoort daarom in je wachtwoordbeheerder te blijven.

## 7. Eerste volledige controle

1. Meld aan als admin en open **Beheer**.
2. Open de app in een privévenster en vraag een testaccount aan.
3. Controleer in het adminoverzicht dat de aanvraag `PENDING` verschijnt.
4. Keur ze goed en meld met het testaccount aan.
5. Wijs een verplichte oefening toe en rond ze af.
6. Controleer activiteit, voortgang en de opdrachtstatus in het adminoverzicht.
7. Test een korte spreekopname. Bij een ontbrekende key of bereikt gratis quota
   moet de app veilig `niet kunnen meten` tonen en nooit de oefening blokkeren.

## Later, optioneel

- Een eigen domein koppelen in **Workers & Pages** → Worker → **Settings** →
  **Domains & Routes** → **Add Custom Domain**.
- Resend toevoegen voor registratie-e-mails. Het admindashboard blijft altijd
  de bron van waarheid; e-mail is niet nodig voor aanvragen of goedkeuring.
