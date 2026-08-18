import { useEffect, useRef } from 'react'
import { useLang } from '../context/LanguageContext.jsx'
import LangToggle from './LangToggle.jsx'

/** Instellingen zonder client-side providergeheimen. */
export default function Settings({ onClose }) {
  const { t } = useLang()
  const closeRef = useRef(null)

  useEffect(() => {
    const onKey = (event) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-white shadow-xl sm:rounded-3xl"
        role="dialog"
        aria-modal="true"
        aria-label={t('settingsTitle')}
      >
        <div className="flex items-center justify-between border-b border-slate-100 p-5">
          <h3 className="text-lg font-bold text-slate-900">{t('settingsTitle')}</h3>
          <button ref={closeRef} onClick={onClose} className="btn-ghost h-11 w-11 !px-0" aria-label={t('close')}>
            ✕
          </button>
        </div>

        <div className="space-y-5 overflow-y-auto p-5">
          <section>
            <h4 className="font-bold text-slate-800">{t('language')}</h4>
            <p className="mt-1 text-sm text-slate-500">{t('settingsLanguageDesc')}</p>
            <LangToggle className="mt-3" />
          </section>

          <section className="rounded-xl bg-emerald-50 p-4">
            <h4 className="font-bold text-emerald-900">🔐 {t('settingsSecureTitle')}</h4>
            <p className="mt-1 text-sm leading-relaxed text-emerald-800">{t('settingsSecureDesc')}</p>
          </section>

          <section className="rounded-xl bg-slate-50 p-4">
            <h4 className="font-bold text-slate-800">🎙️ {t('settingsAudioTitle')}</h4>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">{t('settingsAudioDesc')}</p>
          </section>

          <section className="rounded-xl bg-violet-50 p-4">
            <h4 className="font-bold text-violet-900">✨ {t('settingsCoachTitle')}</h4>
            <p className="mt-1 text-sm leading-relaxed text-violet-800">{t('settingsCoachDesc')}</p>
          </section>
        </div>

        <div className="border-t border-slate-100 p-4">
          <button onClick={onClose} className="btn-primary h-12 w-full">{t('close')}</button>
        </div>
      </div>
    </div>
  )
}
