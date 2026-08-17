import LangToggle from './LangToggle.jsx'
import { useLang } from '../context/LanguageContext.jsx'
import { uiCopy } from '../lib/uiCopy.js'

export default function PublicHome({ onLogin, onRegister, onHelp }) {
  const { lang } = useLang()
  const c = (key) => uiCopy(lang, key)

  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden bg-slate-950 text-white" dir="ltr">
      <div aria-hidden="true" className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-gent-500/25 blur-3xl" />
      <div aria-hidden="true" className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-saffraan-500/15 blur-3xl" />

      <header className="relative z-10 mx-auto flex w-full max-w-2xl items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gent-500 font-black text-saffraan-300 shadow-lg shadow-gent-950/40">
            NL
          </span>
          <span className="text-sm font-bold leading-tight">
            {c('brandName')}
            <span className="block font-medium text-slate-400">{c('brandPlace')}</span>
          </span>
        </div>
        <LangToggle className="!border-white/20 !bg-white/10 !text-white hover:!bg-white/15" />
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-5 py-10">
        <div className="mb-7 inline-flex w-fit items-center gap-2 rounded-full border border-gent-300/20 bg-gent-400/10 px-3 py-1.5 text-xs font-semibold text-gent-100">
          <span aria-hidden="true">●</span> {c('publicBadge')}
        </div>
        <h1 className="max-w-xl text-4xl font-black leading-[1.08] tracking-tight sm:text-6xl">
          {c('publicTitle')}
        </h1>
        <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-300 sm:text-lg">{c('publicSubtitle')}</p>

        <div className="mt-9 grid gap-3 sm:grid-cols-2">
          <button onClick={onLogin} className="h-14 rounded-2xl bg-gent-500 px-5 text-base font-bold shadow-lg shadow-gent-950/30 transition hover:bg-gent-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
            {c('signIn')} →
          </button>
          <button onClick={onRegister} className="h-14 rounded-2xl border border-white/20 bg-white/10 px-5 text-base font-bold transition hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
            {c('register')}
          </button>
        </div>

        <div className="mt-8 flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-relaxed text-slate-300">
          <span aria-hidden="true" className="mt-0.5">🔒</span>
          <p>{c('publicPrivacy')}</p>
        </div>
      </main>

      <footer className="relative z-10 mx-auto flex w-full max-w-2xl items-center justify-between px-5 py-5 text-xs text-slate-500">
        <span>{c('location')}</span>
        <button onClick={onHelp} className="min-h-11 rounded-xl px-3 font-semibold text-slate-300 hover:bg-white/10">
          {c('helpBoth')}
        </button>
      </footer>
    </div>
  )
}
