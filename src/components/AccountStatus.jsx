import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useLang } from '../context/LanguageContext.jsx'
import { uiCopy } from '../lib/uiCopy.js'
import LangToggle from './LangToggle.jsx'

const STATUS_COPY = {
  PENDING: { icon: '⏳', title: 'pendingTitle', body: 'pendingBody', tone: 'from-saffraan-600 to-amber-500' },
  REJECTED: { icon: '○', title: 'rejectedTitle', body: 'rejectedBody', tone: 'from-slate-700 to-slate-600' },
  SUSPENDED: { icon: '🔒', title: 'suspendedTitle', body: 'suspendedBody', tone: 'from-rose-700 to-rose-500' },
}

export function AppLoading() {
  const { lang } = useLang()
  return (
    <div className="grid min-h-dvh place-items-center bg-slate-950 px-6 text-white" dir="ltr">
      <div className="text-center">
        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-gent-400" />
        <p className="text-sm font-semibold text-slate-300">{uiCopy(lang, 'loading')}</p>
      </div>
    </div>
  )
}

export function ServerError({ onRetry }) {
  const { lang } = useLang()
  const c = (key) => uiCopy(lang, key)
  return (
    <div className="grid min-h-dvh place-items-center bg-slate-100 p-5" dir="ltr">
      <section className="card max-w-md p-6 text-center">
        <span className="text-4xl" aria-hidden="true">⚠️</span>
        <h1 className="mt-4 text-xl font-black text-slate-900">{c('serverUnavailable')}</h1>
        <button onClick={onRetry} className="btn-primary mt-6 h-12 w-full">{c('retry')}</button>
      </section>
    </div>
  )
}

export default function AccountStatus() {
  const { user, logout, refreshSession } = useAuth()
  const { lang } = useLang()
  const c = (key) => uiCopy(lang, key)
  const [busy, setBusy] = useState(false)
  const config = STATUS_COPY[user?.status] || STATUS_COPY.PENDING

  async function refresh() {
    setBusy(true)
    await refreshSession().catch(() => {})
    setBusy(false)
  }

  return (
    <div className="min-h-dvh bg-slate-100 p-4" dir="ltr">
      <div className="mx-auto flex max-w-md justify-end"><LangToggle /></div>
      <section className="card mx-auto mt-10 max-w-md overflow-hidden text-center">
        <div className={`bg-gradient-to-br ${config.tone} p-8 text-white`}>
          <span className="text-5xl" aria-hidden="true">{config.icon}</span>
          <h1 className="mt-5 text-2xl font-black">{c(config.title)}</h1>
          <p className="mt-3 text-sm leading-relaxed text-white/85">{c(config.body)}</p>
        </div>
        <div className="space-y-3 p-6">
          <p className="text-sm text-slate-500">@{user?.username}</p>
          {user?.status === 'PENDING' && (
            <button onClick={refresh} disabled={busy} className="btn-primary h-12 w-full">
              {busy ? c('loading') : c('refresh')}
            </button>
          )}
          <button onClick={logout} className="btn-ghost h-12 w-full">{c('signOut')}</button>
        </div>
      </section>
    </div>
  )
}
