import { useLang } from '../context/LanguageContext.jsx'

/**
 * Knop om tussen Nederlands en Darija te wisselen.
 * Toont de taal waar je NAARTOE schakelt.
 */
export default function LangToggle({ className = '', compact = false }) {
  const { isDarija, toggle } = useLang()
  // Toon de taal waar je NAARTOE schakelt (compact op de smalle header).
  const label = compact ? (isDarija ? 'NL' : 'ع') : isDarija ? 'Nederlands' : 'الدارجة'
  return (
    <button
      onClick={toggle}
      className={`inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-base font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-saffraan-600 ${className}`}
      aria-label={isDarija ? 'Overschakelen naar Nederlands' : 'بدّل للدارجة'}
    >
      <span aria-hidden="true">🌐</span>
      <span>{label}</span>
    </button>
  )
}
