import { useEffect, useState } from 'react'
import { buildSnapshot, computeSummary } from '../lib/snapshot.js'
import { fetchSnapshot } from '../lib/tracker.js'
import { getWebhookUrl, setWebhookUrl, getCoachMode, setCoachMode, isCoachModeSet } from '../lib/config.js'
import { useLang } from '../context/LanguageContext.jsx'
import ProgressBar from './ProgressBar.jsx'
import LangToggle from './LangToggle.jsx'

/**
 * Verborgen coach-/adminpagina (via #admin). Toont de voortgang van de lerende,
 * opgehaald via de webhook (op afstand) of uit de lokale opslag (op haar toestel).
 * Puur lezen — verandert niets aan de leer-app.
 */
export default function AdminDashboard({ onClose }) {
  const { t, isDarija } = useLang()
  const [summary, setSummary] = useState(null)
  const [status, setStatus] = useState('idle') // idle | loading | error | ok
  const [url, setUrl] = useState(getWebhookUrl())
  // Wie de admin-pagina opent, is de coach: dit toestel stuurt voortaan geen
  // eigen voortgang meer (anders overschrijf je dat van de lerende).
  const [coach, setCoach] = useState(() => {
    if (!isCoachModeSet()) setCoachMode(true)
    return getCoachMode()
  })

  async function loadRemote() {
    if (!getWebhookUrl()) {
      setStatus('idle')
      return
    }
    setStatus('loading')
    const snap = await fetchSnapshot()
    if (snap) {
      setSummary(computeSummary(snap))
      setStatus('ok')
    } else {
      setStatus('error')
    }
  }

  function loadLocal() {
    setSummary(computeSummary(buildSnapshot()))
    setStatus('ok')
  }

  useEffect(() => {
    loadRemote()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function saveUrl() {
    setWebhookUrl(url)
    loadRemote()
  }

  const daysAgo = (dateStr) => {
    if (!dateStr) return null
    const d = Math.round((Date.now() - new Date(dateStr).getTime()) / 86400000)
    if (d <= 0) return t('adminToday')
    if (d === 1) return t('adminYesterday')
    return `${d} ${t('adminDaysAgo')}`
  }

  return (
    <div className="min-h-dvh bg-slate-50" dir={isDarija ? 'rtl' : 'ltr'}>
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center gap-2">
          <button onClick={onClose} className="btn-ghost h-11 w-11 !px-0" aria-label={t('close')}>
            ✕
          </button>
          <h1 className="flex-1 truncate text-base font-bold text-slate-900">👤 {t('adminTitle')}</h1>
          <LangToggle compact />
          <button onClick={loadRemote} className="btn-ghost h-11 w-11 !px-0" aria-label={t('adminRefresh')}>
            🔄
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-6">
        {/* Coach-modus: dit toestel stuurt geen eigen voortgang */}
        <label className="card mb-4 flex items-center gap-3 p-4">
          <input
            type="checkbox"
            checked={coach}
            onChange={(e) => {
              setCoachMode(e.target.checked)
              setCoach(e.target.checked)
            }}
            className="h-5 w-5 shrink-0 accent-gent-600"
          />
          <span className="min-w-0 flex-1 text-sm text-slate-600">{t('adminCoachMode')}</span>
        </label>

        {/* Bron / webhook instellen */}
        {!getWebhookUrl() && (
          <section className="card mb-4 p-5">
            <p className="text-sm text-slate-600">{t('adminNoWebhook')}</p>
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              type="url"
              dir="ltr"
              placeholder="https://script.google.com/…/exec"
              className="mt-2 w-full rounded-xl border-2 border-slate-200 px-4 py-3 font-mono text-sm focus:border-gent-400 focus:outline-none"
            />
            <div className="mt-2 flex gap-2">
              <button onClick={saveUrl} className="btn-primary h-11 flex-1">
                {t('save')}
              </button>
              <button onClick={loadLocal} className="btn-ghost h-11 flex-1">
                {t('adminShowLocal')}
              </button>
            </div>
          </section>
        )}

        {status === 'loading' && <p className="text-center text-slate-500">⏳ …</p>}
        {status === 'error' && (
          <div className="card p-5 text-center">
            <p className="text-sm text-rose-700">{t('adminNoData')}</p>
            <button onClick={loadLocal} className="btn-ghost mt-3 h-11 px-4">
              {t('adminShowLocal')}
            </button>
          </div>
        )}

        {summary && (
          <>
            {/* Hero */}
            <section className="card overflow-hidden">
              <div className="bg-gradient-to-br from-gent-700 to-gent-500 p-6 text-white">
                <p className="text-sm font-medium text-gent-100">{t('adminSubtitle')}</p>
                <h2 className="mt-1 text-3xl font-black">
                  {summary.overall.done} / {summary.overall.total}
                </h2>
                <p className="text-sm text-gent-100">{t('adminLessonsDone')}</p>
              </div>
              <div className="grid grid-cols-3 divide-x divide-slate-100 text-center">
                <Stat label={t('adminMastered')} value={summary.mastered} />
                <Stat label={t('adminDue')} value={summary.due} />
                <Stat label={t('adminActiveDays')} value={summary.activeDays} />
              </div>
              <p className="border-t border-slate-100 p-3 text-center text-xs text-slate-500">
                {t('adminLastActivity')}: {summary.lastActivity ? daysAgo(summary.lastActivity) : t('adminNever')}
              </p>
            </section>

            {/* Waar ze nu zit / volgende les */}
            {summary.nextLesson && (
              <section className="card mt-4 flex items-center gap-3 p-4">
                <span className="text-2xl" aria-hidden="true">
                  🎯
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {t('adminNextLesson')}
                  </p>
                  <p className="truncate font-bold text-slate-900">
                    {summary.nextLesson.id} —{' '}
                    {isDarija && summary.nextLesson.titleDarija
                      ? summary.nextLesson.titleDarija
                      : summary.nextLesson.title}
                  </p>
                </div>
              </section>
            )}

            {/* Per niveau */}
            <h3 className="mb-2 mt-6 px-1 text-sm font-bold uppercase tracking-wide text-slate-500">
              {t('adminPerLevel')}
            </h3>
            <div className="grid gap-3">
              {summary.perLevel.map((lvl) => (
                <div key={lvl.id} className="card p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-bold text-slate-900">
                      {lvl.icon} {lvl.title}
                    </span>
                    <span className="text-sm font-semibold text-slate-500">
                      {lvl.done}/{lvl.total}
                    </span>
                  </div>
                  <ProgressBar ratio={lvl.total ? lvl.done / lvl.total : 0} accent={lvl.accent} />
                  <div className="mt-3 space-y-1.5">
                    {lvl.modules.map((m) => (
                      <div key={m.id} className="flex items-center gap-2 text-xs">
                        <span className="w-10 shrink-0 text-slate-400">{m.id}</span>
                        <span className="min-w-0 flex-1 truncate text-slate-600">{m.title}</span>
                        <span className={`shrink-0 font-semibold ${m.done === m.total ? 'text-emerald-600' : 'text-slate-400'}`}>
                          {m.done}/{m.total}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Woorden die vaak fout gaan */}
            {summary.weak.length > 0 && (
              <>
                <h3 className="mb-2 mt-6 px-1 text-sm font-bold uppercase tracking-wide text-slate-500">
                  {t('adminWeak')}
                </h3>
                <div className="card divide-y divide-slate-100">
                  {summary.weak.map((w, idx) => (
                    <div key={idx} className="flex items-center justify-between px-4 py-2.5 text-sm">
                      <span className="font-semibold text-slate-800" dir="ltr">
                        {w.word}
                      </span>
                      <span className="text-xs text-rose-600">
                        {w.good}/{w.attempts} {t('adminGood')}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {summary.generatedAt && (
              <p className="mt-6 text-center text-xs text-slate-400">
                {t('adminGeneratedAt')}: {new Date(summary.generatedAt).toLocaleString()}
              </p>
            )}
          </>
        )}
      </main>
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div className="p-3">
      <p className="text-2xl font-black text-slate-900">{value}</p>
      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">{label}</p>
    </div>
  )
}
