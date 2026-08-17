import { useState } from 'react'
import { useLang } from '../context/LanguageContext.jsx'
import { apiErrorMessage, fetchJSON } from '../lib/api.js'
import LangToggle from './LangToggle.jsx'

const copy = {
  nl: {
    badge: 'Eenmalige installatie',
    title: 'Beheerdersaccount aanmaken',
    intro: 'Gebruik deze pagina alleen na de eerste Cloudflare-deploy. Het installatiegeheim wordt rechtstreeks naar je eigen server gestuurd en wordt niet in de browser bewaard.',
    username: 'Gebruikersnaam',
    displayName: 'Naam',
    password: 'Nieuw beheerderswachtwoord',
    confirm: 'Herhaal het wachtwoord',
    secret: 'ADMIN_BOOTSTRAP_SECRET uit GitHub',
    secretHint: 'Plak hier hetzelfde geheime tekenreeks dat je als GitHub-secret hebt ingesteld. Deel het nooit via chat of e-mail.',
    show: 'Toon wachtwoorden en geheim',
    required: 'Vul alle velden in.',
    mismatch: 'De twee wachtwoorden zijn niet hetzelfde.',
    passwordRule: 'Gebruik minstens 10 tekens voor het wachtwoord.',
    submit: 'Beheerder veilig aanmaken',
    busy: 'Account wordt aangemaakt…',
    success: 'De beheerder is aangemaakt. Je kunt nu normaal aanmelden.',
    login: 'Naar aanmelden',
    unavailable: 'De installatie is geweigerd. Controleer het geheim, of de beheerder bestaat al.',
  },
  dar: {
    badge: 'Installation ghir merra wa7da',
    title: 'Sawb compte dyal l-admin',
    intro: 'St3mel had saf7a ghir mn be3d awwel deploy f Cloudflare. Secret kaymchi direct l-server dyalek w ma kayt7fedch f browser.',
    username: 'Smiyet l-mosta3mil',
    displayName: 'Smiytek',
    password: 'Mot de passe jdid dyal l-admin',
    confirm: '3awed mot de passe',
    secret: 'ADMIN_BOOTSTRAP_SECRET men GitHub',
    secretHint: 'Colle hna nafs secret li 7ettiti f GitHub. Mat3tih l7tta wa7ed f chat wela email.',
    show: 'Werri mots de passe w secret',
    required: '3emmer ga3 l-khanat.',
    mismatch: 'Joj mots de passe machi kif kif.',
    passwordRule: 'St3mel 10 dyal l-7orouf 3la l-aqall.',
    submit: 'Sawb l-admin b aman',
    busy: 'Compte kaytsawb…',
    success: 'Compte dyal l-admin tsawb. Daba tqder tdokhol.',
    login: 'Sir l-dokhol',
    unavailable: 'Installation ma tqblatch. Chouf secret, wela l-admin deja kayn.',
  },
}

function Field({ label, id, ...props }) {
  return (
    <label htmlFor={id} className="block">
      <span className="mb-1.5 block text-sm font-semibold text-slate-700">{label}</span>
      <input
        id={id}
        className="h-12 w-full rounded-xl border-2 border-slate-200 bg-white px-4 text-base outline-none transition focus:border-gent-500 focus:ring-2 focus:ring-gent-100"
        {...props}
      />
    </label>
  )
}

export default function AdminSetup() {
  const { lang } = useLang()
  const t = copy[lang === 'dar' ? 'dar' : 'nl']
  const [form, setForm] = useState({ username: 'amine', displayName: 'Amine', password: '', confirm: '', secret: '' })
  const [visible, setVisible] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  const update = (name) => (event) => setForm((current) => ({ ...current, [name]: event.target.value }))

  async function submit(event) {
    event.preventDefault()
    setError('')
    if (!form.username.trim() || !form.displayName.trim() || !form.password || !form.confirm || !form.secret) {
      setError(t.required)
      return
    }
    if (form.password.length < 10) {
      setError(t.passwordRule)
      return
    }
    if (form.password !== form.confirm) {
      setError(t.mismatch)
      return
    }

    setBusy(true)
    try {
      await fetchJSON('/api/admin/bootstrap', {
        method: 'POST',
        headers: { 'x-bootstrap-secret': form.secret },
        body: {
          username: form.username.trim(),
          displayName: form.displayName.trim(),
          password: form.password,
        },
      })
      setForm((current) => ({ ...current, password: '', confirm: '', secret: '' }))
      setDone(true)
    } catch (requestError) {
      setError(apiErrorMessage(requestError, lang) || t.unavailable)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="min-h-dvh bg-slate-100 px-4 py-6" dir="ltr">
      <div className="mx-auto max-w-md">
        <div className="mb-5 flex justify-end"><LangToggle /></div>
        <section className="card overflow-hidden">
          <div className="bg-gradient-to-br from-slate-900 to-gent-700 p-6 text-white">
            <p className="text-xs font-black uppercase tracking-wider text-gent-100">{t.badge}</p>
            <h1 className="mt-2 text-2xl font-black">{t.title}</h1>
            <p className="mt-3 text-sm leading-relaxed text-slate-100">{t.intro}</p>
          </div>

          {done ? (
            <div className="space-y-4 p-6">
              <div role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">{t.success}</div>
              <button type="button" onClick={() => { window.location.href = '/' }} className="btn-primary h-12 w-full">{t.login}</button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4 p-6" noValidate>
              {error && <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">{error}</div>}
              <Field id="setupUsername" label={t.username} value={form.username} onChange={update('username')} autoComplete="username" maxLength={32} required />
              <Field id="setupDisplayName" label={t.displayName} value={form.displayName} onChange={update('displayName')} autoComplete="name" maxLength={80} required />
              <Field id="setupPassword" label={t.password} value={form.password} onChange={update('password')} type={visible ? 'text' : 'password'} autoComplete="new-password" minLength={10} required />
              <Field id="setupConfirm" label={t.confirm} value={form.confirm} onChange={update('confirm')} type={visible ? 'text' : 'password'} autoComplete="new-password" minLength={10} required />
              <Field id="setupSecret" label={t.secret} value={form.secret} onChange={update('secret')} type={visible ? 'text' : 'password'} autoComplete="off" spellCheck="false" required />
              <p className="text-xs leading-relaxed text-slate-500">{t.secretHint}</p>
              <label className="flex min-h-11 cursor-pointer items-center gap-3 text-sm font-medium text-slate-600">
                <input type="checkbox" checked={visible} onChange={(event) => setVisible(event.target.checked)} className="h-5 w-5 accent-gent-600" />
                {t.show}
              </label>
              <button type="submit" disabled={busy} className="btn-primary h-12 w-full">{busy ? t.busy : t.submit}</button>
            </form>
          )}
        </section>
      </div>
    </div>
  )
}
