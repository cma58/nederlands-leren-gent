import { useLang } from '../context/LanguageContext.jsx'

/**
 * Knop om tussen Nederlands en Darija te wisselen.
 * Toont de taal waar je NAARTOE schakelt.
 */
export default function LangToggle({ className = '' }) {
  const { isDarija, toggle } = useLang()
  return (
    <button
      onClick={toggle}
      className={`inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 ${className}`}
      aria-label={isDarija ? 'Overschakelen naar Nederlands' : 'بدّل للدارجة'}
    >
      <span aria-hidden="true">🌐</span>
      {/* Toon de taal waarnaar je overschakelt */}
      <span>{isDarija ? 'Nederlands' : 'الدارجة'}</span>
    </button>
  )
}
