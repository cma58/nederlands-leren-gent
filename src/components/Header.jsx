import { useLang } from '../context/LanguageContext.jsx'
import LangToggle from './LangToggle.jsx'

/**
 * Bovenbalk van de app. Toont de titel, een taalknop, een help-knop en
 * (optioneel) een terugknop wanneer je in een level/module zit.
 */
export default function Header({ onBack, subtitle, onSettings, onHelp }) {
  const { t } = useLang()
  return (
    <header className="sticky top-0 z-20 border-b border-gent-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-2xl items-center gap-1.5 px-3 py-2">
        {onBack ? (
          <button onClick={onBack} className="btn-ghost -ml-1 h-11 w-11 !px-0" aria-label={t('back')}>
            <span aria-hidden="true" className="inline-block text-lg">
              ←
            </span>
          </button>
        ) : (
          <span
            className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-gent-600 to-teal-700 text-sm font-black text-saffraan-300 shadow-sm"
            aria-hidden="true"
          >
            NL
          </span>
        )}
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-base font-bold leading-tight text-slate-900">
            {t('appTitle')}
          </h1>
          {subtitle && <p className="truncate text-xs text-slate-500">{subtitle}</p>}
        </div>

        <LangToggle compact />

        {onHelp && (
          <button onClick={onHelp} className="btn-ghost h-11 w-11 !px-0" aria-label={t('help')} title={t('help')}>
            <span aria-hidden="true">❓</span>
          </button>
        )}
        {onSettings && (
          <button
            onClick={onSettings}
            className="btn-ghost h-11 w-11 !px-0"
            aria-label={t('settings')}
            title={t('settings')}
          >
            <span aria-hidden="true">⚙️</span>
          </button>
        )}
      </div>
    </header>
  )
}
