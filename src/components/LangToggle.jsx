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
      className={`inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 ${className}`}
      aria-label={isDarija ? 'Overschakelen naar Nederlands' : 'بدّل للدارجة'}
    >
      <span aria-hidden="true">🌐</span>
      <span>{label}</span>
    </button>
  )
}
