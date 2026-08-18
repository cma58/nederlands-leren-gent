import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useLang } from '../context/LanguageContext.jsx'
import { apiErrorMessage, authApi } from '../lib/api.js'
import { uiCopy } from '../lib/uiCopy.js'
import LangToggle from './LangToggle.jsx'

const USERNAME_RE = /^[\p{L}\p{N}_-]{3,32}$/u

function Field({ label, id, ...props }) {
  return (
    <label htmlFor={id} className="block">
      <span className="mb-1.5 block text-sm font-semibold text-slate-700">{label}</span>
      <input
        id={id}
        className="h-12 w-full rounded-xl border-2 border-slate-200 bg-white px-4 text-base outline-none transition placeholder:text-slate-400 focus:border-gent-500 focus:ring-2 focus:ring-gent-100"
        {...props}
      />
    </label>
  )
}

export default function AuthForm({ mode = 'login', onBack, onRegistered }) {
  const { login, register } = useAuth()
  const { lang } = useLang()
  const c = (key) => uiCopy(lang, key)
  const isRegister = mode === 'register'
  const [form, setForm] = useState({ username: '', displayName: '', password: '', confirm: '' })
  const [visible, setVisible] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [resetMode, setResetMode] = useState(false)
  const [resetCode, setResetCode] = useState('')

  const update = (name) => (event) => setForm((current) => ({ ...current, [name]: event.target.value }))

  async function submit(event) {
    event.preventDefault()
    setError('')
    setNotice('')
    const username = form.username.trim()
    if (!username || !form.password || ((isRegister || resetMode) && !form.confirm) || (resetMode && !resetCode.trim())) {
      setError(c('required'))
      return
    }
    if (!USERNAME_RE.test(username)) {
      setError(c('usernameRules'))
      return
    }
    if ((isRegister || resetMode) && form.password.length < 10) {
      setError(c('passwordRules'))
      return
    }
    if ((isRegister || resetMode) && form.password !== form.confirm) {
      setError(c('passwordMismatch'))
      return
    }

    setBusy(true)
    try {
      if (resetMode) {
        await authApi.resetPassword({ username, code: resetCode.trim(), newPassword: form.password })
        setResetMode(false)
        setResetCode('')
        setForm({ username, displayName: '', password: '', confirm: '' })
        setNotice(c('resetDone'))
      } else if (isRegister) {
        const result = await register(form)
        onRegistered?.(result)
      } else {
        await login(form)
      }
    } catch (requestError) {
      setError(apiErrorMessage(requestError, lang) || c('serverUnavailable'))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="min-h-dvh bg-canvas px-4 py-6" dir="ltr">
      <div className="mx-auto max-w-md">
        <div className="mb-5 flex items-center justify-between">
          <button onClick={onBack} className="btn-ghost min-h-11">← {c('backHome')}</button>
          <LangToggle />
        </div>

        <section className="card overflow-hidden">
          <div className="bg-gradient-to-br from-gent-800 via-gent-600 to-teal-600 p-6 text-white">
            <span className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-white/15 text-xl" aria-hidden="true">
              {isRegister ? '✦' : '↗'}
            </span>
            <h1 className="text-2xl font-black">{c(resetMode ? 'setNewPassword' : isRegister ? 'register' : 'signIn')}</h1>
            <p className="mt-2 text-sm leading-relaxed text-gent-50">
              {c(resetMode ? 'resetIntro' : isRegister ? 'registerIntro' : 'loginIntro')}
            </p>
          </div>

          <form onSubmit={submit} className="space-y-4 p-6" noValidate>
            {error && (
              <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">
                {error}
              </div>
            )}
            {notice && <div role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">{notice}</div>}

            <Field
              id="username"
              label={c('username')}
              value={form.username}
              onChange={update('username')}
              autoComplete="username"
              autoCapitalize="none"
              spellCheck="false"
              maxLength={32}
              required
            />
            {isRegister && !resetMode && (
              <Field
                id="displayName"
                label={c('displayName')}
                value={form.displayName}
                onChange={update('displayName')}
                autoComplete="name"
                maxLength={80}
              />
            )}
            {resetMode && (
              <Field
                id="resetCode"
                label={c('temporaryCode')}
                value={resetCode}
                onChange={(event) => setResetCode(event.target.value)}
                autoComplete="one-time-code"
                autoCapitalize="characters"
                spellCheck="false"
                required
              />
            )}
            <Field
              id="password"
              label={c('password')}
              value={form.password}
              onChange={update('password')}
              type={visible ? 'text' : 'password'}
              autoComplete={isRegister || resetMode ? 'new-password' : 'current-password'}
              minLength={isRegister || resetMode ? 10 : undefined}
              required
            />
            {(isRegister || resetMode) && (
              <Field
                id="confirmPassword"
                label={c('confirmPassword')}
                value={form.confirm}
                onChange={update('confirm')}
                type={visible ? 'text' : 'password'}
                autoComplete="new-password"
                minLength={10}
                required
              />
            )}
            <label className="flex min-h-11 cursor-pointer items-center gap-3 text-sm font-medium text-slate-600">
              <input type="checkbox" checked={visible} onChange={(event) => setVisible(event.target.checked)} className="h-5 w-5 accent-gent-600" />
              {c(visible ? 'hidePassword' : 'showPassword')}
            </label>

            <button type="submit" disabled={busy} className="btn-primary h-12 w-full text-base">
              {busy ? c('loading') : c(resetMode ? 'setNewPassword' : isRegister ? 'register' : 'signIn')}
            </button>
            {(isRegister || resetMode) && <p className="text-xs leading-relaxed text-slate-500">{c('passwordRules')}</p>}
            {!isRegister && (
              <button
                type="button"
                onClick={() => {
                  setResetMode((value) => !value)
                  setError('')
                  setNotice('')
                }}
                className="min-h-11 w-full rounded-xl text-sm font-bold text-gent-700 hover:bg-gent-50"
              >
                {resetMode ? c('signIn') : c('forgotPassword')}
              </button>
            )}
          </form>
        </section>
      </div>
    </div>
  )
}
