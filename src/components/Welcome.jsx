import { useLang } from '../context/LanguageContext.jsx'
import LangToggle from './LangToggle.jsx'

/** Algemene startpagina voor alle cursisten. */
export default function Welcome({ onBegin, onHelp }) {
  const { t, arrowFwd } = useLang()

  return (
    <div className="flex min-h-dvh flex-col bg-gradient-to-br from-gent-800 via-gent-600 to-teal-600 text-white">
      {/* Taalkeuze bovenaan */}
      <div className="flex justify-end p-4">
        <LangToggle className="!border-white/30 !bg-white/10 !text-white hover:!bg-white/20" />
      </div>

      {/* Begroeting */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <div className="mb-6 grid h-20 w-20 place-items-center rounded-3xl bg-white/15 text-4xl shadow-lg">
          🌷
        </div>

        <p className="text-lg font-medium text-gent-100">{t('welcome')}</p>
        <h1 className="max-w-md text-4xl font-black leading-tight">{t('appTitle')}</h1>

        <p className="mt-6 max-w-sm text-sm leading-relaxed text-gent-50">
          {t('welcomeTagline')}
        </p>
      </div>

      {/* Knoppen */}
      <div className="space-y-3 p-6">
        <button
          onClick={onBegin}
          className="h-14 w-full rounded-2xl bg-white text-lg font-bold text-gent-700 shadow-lg transition hover:bg-gent-50"
        >
          {t('begin')} {arrowFwd}
        </button>
        <button
          onClick={onHelp}
          className="h-12 w-full rounded-2xl bg-white/10 font-semibold text-white transition hover:bg-white/20"
        >
          ❓ {t('help')}
        </button>
      </div>
    </div>
  )
}
