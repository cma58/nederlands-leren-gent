import { useEffect, useState } from 'react'
import { getGeminiKey, getGroqKey, setGeminiKey, setGroqKey } from '../lib/config.js'
import { useLang } from '../context/LanguageContext.jsx'

/**
 * Instellingenpaneel om de (gratis) API-sleutels in te vullen.
 * De sleutels worden lokaal in de browser bewaard — niet verstuurd naar ons.
 */
export default function Settings({ onClose }) {
  const { t } = useLang()
  const [gemini, setGemini] = useState('')
  const [groq, setGroq] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setGemini(getGeminiKey())
    setGroq(getGroqKey())
  }, [])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  function save() {
    setGeminiKey(gemini)
    setGroqKey(groq)
    setSaved(true)
    setTimeout(() => setSaved(false), 1500)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-white shadow-xl sm:rounded-3xl">
        <div className="flex items-center justify-between border-b border-slate-100 p-5">
          <h3 className="text-lg font-bold text-slate-900">{t('settingsTitle')}</h3>
          <button onClick={onClose} className="btn-ghost h-9 w-9 !px-0" aria-label={t('close')}>
            ✕
          </button>
        </div>

        <div className="space-y-5 overflow-y-auto p-5">
          <p className="text-sm text-slate-500">{t('settingsDesc')}</p>

          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">
              {t('geminiLabel')} <span className="text-slate-400">{t('geminiHint')}</span>
            </label>
            <input
              value={gemini}
              onChange={(e) => setGemini(e.target.value)}
              type="password"
              autoComplete="off"
              spellCheck={false}
              placeholder="AIza…"
              dir="ltr"
              className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 font-mono text-sm focus:border-gent-400 focus:outline-none"
            />
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block text-xs font-semibold text-gent-600 underline"
            >
              → {t('makeGeminiKey')}
            </a>
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">
              {t('groqLabel')} <span className="text-slate-400">{t('groqHint')}</span>
            </label>
            <input
              value={groq}
              onChange={(e) => setGroq(e.target.value)}
              type="password"
              autoComplete="off"
              spellCheck={false}
              placeholder="gsk_…"
              dir="ltr"
              className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 font-mono text-sm focus:border-gent-400 focus:outline-none"
            />
            <a
              href="https://console.groq.com/keys"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block text-xs font-semibold text-gent-600 underline"
            >
              → {t('makeGroqKey')}
            </a>
          </div>

          <p className="rounded-lg bg-slate-50 p-3 text-xs text-slate-500">{t('settingsTip')}</p>
        </div>

        <div className="border-t border-slate-100 p-4">
          <button onClick={save} className="btn-primary h-12 w-full">
            {saved ? `✓ ${t('saved')}` : t('save')}
          </button>
        </div>
      </div>
    </div>
  )
}
