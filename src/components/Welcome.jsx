import { useLang } from '../context/LanguageContext.jsx'
import LangToggle from './LangToggle.jsx'

/**
 * Persoonlijk welkomstscherm — het eerste dat Oumayma ziet.
 * Toont de begroeting in het Nederlands én in het Darija, met knoppen
 * om te beginnen, de taal te kiezen en de help te openen.
 */
export default function Welcome({ onBegin, onHelp }) {
  const { t } = useLang()

  return (
    <div className="flex min-h-dvh flex-col bg-gradient-to-br from-gent-700 via-gent-600 to-gent-500 text-white">
      {/* Taalkeuze bovenaan */}
      <div className="flex justify-end p-4">
        <LangToggle className="!border-white/30 !bg-white/10 !text-white hover:!bg-white/20" />
      </div>

      {/* Begroeting */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <div className="mb-6 grid h-20 w-20 place-items-center rounded-3xl bg-white/15 text-4xl shadow-lg">
          🌷
        </div>

        {/* Nederlands */}
        <p className="text-lg font-medium text-gent-100">Welkom</p>
        <h1 className="text-4xl font-black leading-tight">Oumayma</h1>

        {/* Darija */}
        <div className="rtl mt-4 border-t border-white/20 pt-4">
          <p className="text-lg font-medium text-gent-100">مرحبا</p>
          <h2 className="font-arabic text-4xl font-black leading-tight">أوميمة</h2>
        </div>

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
          {t('begin')} →
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
