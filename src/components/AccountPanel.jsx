import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useLang } from '../context/LanguageContext.jsx'
import { apiErrorMessage, authApi } from '../lib/api.js'
import { uiCopy } from '../lib/uiCopy.js'
import LangToggle from './LangToggle.jsx'

export default function AccountPanel({ onClose }) {
  const { user, logout } = useAuth()
  const { lang } = useLang()
  const c = (key) => uiCopy(lang, key)
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '', confirm: '' })
  const [busy, setBusy] = useState(false)
  const [notice, setNotice] = useState(null)

  async function changePassword(event) {
    event.preventDefault()
    setNotice(null)
    if (!passwords.currentPassword || !passwords.newPassword || !passwords.confirm) {
      setNotice({ type: 'error', text: c('required') })
      return
    }
    if (passwords.newPassword.length < 10) {
      setNotice({ type: 'error', text: c('passwordRules') })
      return
    }
    if (passwords.newPassword !== passwords.confirm) {
      setNotice({ type: 'error', text: c('passwordMismatch') })
      return
    }
    setBusy(true)
    try {
      await authApi.changePassword({
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      })
      setPasswords({ currentPassword: '', newPassword: '', confirm: '' })
      setNotice({ type: 'success', text: c('passwordChanged') })
    } catch (error) {
      setNotice({ type: 'error', text: apiErrorMessage(error, lang) })
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="account-title" dir="ltr">
      <div className="mx-auto my-4 max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">
        <header className="flex items-center gap-3 border-b border-slate-200 px-4 py-3">
          <button onClick={onClose} className="btn-ghost h-11 w-11 !px-0" aria-label={c('close')}>✕</button>
          <h1 id="account-title" className="min-w-0 flex-1 truncate text-lg font-black text-slate-900">{c('account')}</h1>
          <LangToggle compact />
        </header>

        <div className="p-5">
          <section className="rounded-2xl bg-gradient-to-br from-gent-700 to-gent-500 p-5 text-white">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-white/15 text-lg font-black">{(user?.displayName || user?.username || '?').slice(0, 1).toUpperCase()}</div>
            <p className="mt-3 font-bold">{user?.displayName || user?.username}</p>
            <p className="text-sm text-gent-100">@{user?.username}</p>
          </section>

          <form onSubmit={changePassword} className="mt-6 space-y-4">
            <h2 className="font-black text-slate-900">{c('changePassword')}</h2>
            {notice && (
              <div role="alert" className={`rounded-xl border p-3 text-sm ${notice.type === 'success' ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-rose-200 bg-rose-50 text-rose-800'}`}>
                {notice.text}
              </div>
            )}
            {[
              ['currentPassword', 'currentPassword', 'current-password'],
              ['newPassword', 'newPassword', 'new-password'],
              ['confirm', 'confirmPassword', 'new-password'],
            ].map(([name, label, autoComplete]) => (
              <label key={name} className="block">
                <span className="mb-1.5 block text-sm font-semibold text-slate-700">{c(label)}</span>
                <input type="password" value={passwords[name]} onChange={(event) => setPasswords((value) => ({ ...value, [name]: event.target.value }))} autoComplete={autoComplete} className="h-12 w-full rounded-xl border-2 border-slate-200 px-4 outline-none focus:border-gent-500 focus:ring-2 focus:ring-gent-100" required />
              </label>
            ))}
            <button disabled={busy} className="btn-primary h-12 w-full">{busy ? c('loading') : c('changePassword')}</button>
          </form>

          <button onClick={logout} className="btn-ghost mt-6 h-12 w-full text-rose-700">{c('signOut')}</button>
        </div>
      </div>
    </div>
  )
}
