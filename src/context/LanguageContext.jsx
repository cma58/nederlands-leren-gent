import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { LANGS, translations } from '../i18n/translations.js'

/**
 * Beheert de interface-taal (Nederlands of Darija).
 *
 * Gebruik in componenten:
 *   const { t, lang, setLang, toggle, dir } = useLang()
 *   <h1>{t('welcome')}</h1>
 *
 * De keuze wordt bewaard in de browser (localStorage).
 */

const STORAGE_KEY = 'nl-gent:lang:v1'
const LanguageContext = createContext(null)

function loadInitial() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'nl' || saved === 'dar') return saved
  } catch {
    /* negeren */
  }
  // Standaard Darija in Latijnse letters, zodat een nieuwe gebruiker de eerste
  // handeling meteen begrijpt. Zowel Nederlands als Darija blijven LTR.
  return 'dar'
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(loadInitial)

  const dir = LANGS[lang]?.dir || 'ltr'

  // Bewaar de keuze en zet de tekstrichting op het document.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* negeren */
    }
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('lang', lang === 'dar' ? 'ary-Latn' : 'nl-BE')
      document.documentElement.setAttribute('dir', dir)
    }
  }, [lang, dir])

  const api = useMemo(() => {
    const dict = translations[lang] || translations.nl
    const t = (key) => dict[key] ?? translations.nl[key] ?? key
    const rtl = dir === 'rtl'
    return {
      lang,
      dir,
      isDarija: lang === 'dar',
      // Richtings-pijlen die meedraaien met de leesrichting: "verder" wijst in
      // het Darija naar links, "terug" naar rechts.
      arrowFwd: rtl ? '←' : '→',
      arrowBack: rtl ? '→' : '←',
      setLang: setLangState,
      toggle: () => setLangState((l) => (l === 'nl' ? 'dar' : 'nl')),
      t,
    }
  }, [lang, dir])

  return <LanguageContext.Provider value={api}>{children}</LanguageContext.Provider>
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang moet binnen <LanguageProvider> gebruikt worden')
  return ctx
}
