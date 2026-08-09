import { useEffect, useRef, useState } from 'react'
import { isTTSAvailable, speak, stopAll } from '../lib/speech.js'
import { useLang } from '../context/LanguageContext.jsx'
import { scoreTranscript, tipsFor } from '../lib/pronunciation.js'
import SoundText from './SoundText.jsx'

/**
 * Typ-oefening (lestype 'typing'): de leerling typt het Nederlandse woord over.
 * Het OORDEEL is deterministisch (lib/pronunciation.js → goed/bijna/opnieuw),
 * geen misleidende scores. Werkt volledig offline, zonder API-sleutels.
 */
export default function TypingExercise({ lesson, onFinish }) {
  const { t, arrowFwd } = useLang()
  const [i, setI] = useState(0)
  const hasItems = lesson?.items?.length > 0
  const item = hasItems ? lesson.items[i] : null
  const isLast = i === (lesson?.items?.length ?? 0) - 1

  const [value, setValue] = useState('')
  const [result, setResult] = useState(null) // 'good' | 'almost' | 'retry'
  const inputRef = useRef(null)

  useEffect(() => {
    setValue('')
    setResult(null)
  }, [i])

  // Stop het voorlezen als de les gesloten wordt.
  useEffect(() => () => stopAll(), [])

  if (!hasItems) {
    return <p className="p-6 text-center text-slate-500">{t('lessonEmpty')}</p>
  }

  const target = item.answer || item.nl
  const tip = tipsFor(item)
  // Ze typt per ongeluk in het Arabisch → herinner haar aan het toetsenbord.
  const hasArabic = /[؀-ۿ]/.test(value)

  function check() {
    if (!value.trim()) return
    const res = scoreTranscript(item, value)
    setResult(res)
    if (isTTSAvailable()) speak(item.nl)
  }

  function retry() {
    setResult(null)
    setValue('')
    inputRef.current?.focus()
  }

  function next() {
    if (isLast) onFinish()
    else setI((n) => n + 1)
  }

  const resultMeta = {
    good: { title: t('typGoodTitle'), sub: t('typGoodSub'), box: 'bg-emerald-50', head: 'text-emerald-800', icon: '✅' },
    almost: { title: t('typAlmostTitle'), sub: t('typAlmostSub'), box: 'bg-amber-50', head: 'text-amber-900', icon: '✏️' },
    retry: { title: t('typRetryTitle'), sub: t('typRetrySub'), box: 'bg-rose-50', head: 'text-rose-700', icon: '🔁' },
  }

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      {/* Voortgang */}
      <div className="flex items-center justify-center gap-1.5 py-4">
        {lesson.items.map((_, idx) => (
          <span
            key={idx}
            className={`h-1.5 rounded-full transition-all ${
              idx === i ? 'w-5 bg-gent-600' : idx < i ? 'w-1.5 bg-gent-300' : 'w-1.5 bg-slate-200'
            }`}
          />
        ))}
      </div>

      {lesson.darijaNote && (
        <p className="rtl mb-2 text-center text-sm text-slate-500">{lesson.darijaNote}</p>
      )}

      {/* Het over te typen woord */}
      <div className="card p-5 text-center">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          ⌨️ {t('typeThisWord')}
        </p>
        <p className="mt-2 text-3xl font-bold text-slate-900" dir="ltr">
          <SoundText text={item.nl} />
        </p>
        {(item.darija || item.darijaLat) && (
          <p className="mt-1 text-slate-500">
            {item.darija && <span className="rtl">{item.darija}</span>}
            {item.darija && item.darijaLat && ' · '}
            {item.darijaLat && <span className="italic">{item.darijaLat}</span>}
          </p>
        )}
        {isTTSAvailable() && (
          <div className="mt-3 flex justify-center gap-2">
            <button onClick={() => speak(item.nl)} className="btn-ghost">
              🔊 {t('listen')}
            </button>
            <button onClick={() => speak(item.nl, { rate: 0.5 })} className="btn-ghost">
              🐢 {t('listenSlow')}
            </button>
          </div>
        )}
      </div>

      {/* Invoerveld */}
      <div className="mt-4">
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (result ? next() : check())}
          disabled={result === 'good'}
          type="text"
          dir="ltr"
          lang="nl"
          inputMode="text"
          enterKeyHint="done"
          autoCapitalize="none"
          autoCorrect="off"
          autoComplete="off"
          spellCheck={false}
          placeholder={t('typeYourAnswer')}
          className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-center text-2xl font-bold text-slate-900 focus:border-gent-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gent-500 disabled:opacity-60"
        />
        {hasArabic && (
          <p className="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-center text-sm text-amber-900">
            ⌨️ {t('typArabicHint')}
          </p>
        )}
      </div>

      {/* Oordeel */}
      <div className="mt-4 flex-1" aria-live="polite">
        {result && (
          <div className={`rounded-xl p-4 ${resultMeta[result].box}`}>
            <p className={`font-bold ${resultMeta[result].head}`}>
              {resultMeta[result].icon} {resultMeta[result].title}
            </p>
            <p className="mt-1 text-sm text-slate-700">{resultMeta[result].sub}</p>
            {result !== 'good' && (
              <p className="mt-2 text-sm text-slate-800" dir="ltr">
                {t('correctLabel')}: <span className="font-bold"><SoundText text={target} /></span>
              </p>
            )}
            {result !== 'good' && tip.tipNl && (
              <p className="mt-1 text-sm text-emerald-700">💡 {tip.tipNl}</p>
            )}
            {result !== 'good' && tip.tipDarija && (
              <p className="rtl mt-1 text-sm text-emerald-700">{tip.tipDarija}</p>
            )}
          </div>
        )}
      </div>

      {/* Knoppen */}
      <div className="mt-auto flex gap-2 py-4">
        {result && result !== 'good' ? (
          <button onClick={retry} className="btn-ghost flex-1 h-12">
            ↻ {t('tryAgain')}
          </button>
        ) : (
          <button onClick={next} className="btn-ghost flex-1 h-12">
            {t('skip')}
          </button>
        )}
        {result ? (
          <button onClick={next} className="btn-primary flex-1 h-12">
            {isLast ? `${t('finishArrow')} ${arrowFwd}` : `${t('next')} ${arrowFwd}`}
          </button>
        ) : (
          <button onClick={check} disabled={!value.trim()} className="btn-primary flex-1 h-12">
            ✓ {t('check')}
          </button>
        )}
      </div>
    </div>
  )
}
