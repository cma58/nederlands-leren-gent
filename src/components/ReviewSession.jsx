import { useEffect, useMemo, useRef, useState } from 'react'
import curriculum from '../data/curriculum.js'
import { buildReviewSession, grade } from '../lib/review.js'
import { useProgress } from '../context/ProgressContext.jsx'
import { useLang } from '../context/LanguageContext.jsx'
import { speak } from '../lib/speech.js'
import SoundText from './SoundText.jsx'
import { recordLearningAttempt } from '../lib/attempts.js'

/**
 * Herhaalsessie: meerkeuze uit de woorden die vandaag klaarstaan. Elk antwoord
 * plant de volgende herhaling (Leitner). Werkt offline, zonder API-sleutels.
 */
export default function ReviewSession({ onClose }) {
  const { isDone } = useProgress()
  const { t } = useLang()
  const questions = useMemo(() => buildReviewSession(curriculum, isDone), [isDone])
  const closeRef = useRef(null)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-40 flex flex-col bg-canvas"
      role="dialog"
      aria-modal="true"
      aria-label={t('review')}
    >
      <div className="flex items-center gap-3 border-b border-saffraan-200 bg-saffraan-50 px-4 py-3">
        <button ref={closeRef} onClick={onClose} className="btn-ghost h-11 w-11 !px-0" aria-label={t('close')}>
          ✕
        </button>
        <h2 className="text-base font-bold text-slate-900">🔁 {t('review')}</h2>
      </div>

      <div className="mx-auto flex w-full max-w-lg flex-1 flex-col overflow-hidden px-4">
        {questions.length ? (
          <ReviewQuiz questions={questions} onClose={onClose} />
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <div className="grid h-20 w-20 place-items-center rounded-full bg-slate-100 text-4xl">🌙</div>
            <p className="max-w-xs text-slate-500">{t('reviewEmpty')}</p>
            <button onClick={onClose} className="btn-write h-12 px-6">
              ✓ {t('finishAndBack')}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function ReviewQuiz({ questions, onClose }) {
  const { t, arrowFwd } = useLang()
  const [i, setI] = useState(0)
  const [picked, setPicked] = useState(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)
  const q = questions[i]
  const isLast = i === questions.length - 1
  const answered = picked !== null

  function choose(option) {
    if (answered) return
    setPicked(option)
    const correct = option === q.answer
    if (correct) setScore((s) => s + 1)
    grade(q.key, correct)
    recordLearningAttempt({
      lessonId: String(q.key).split('::')[0] || 'review',
      itemKey: q.key,
      type: 'review',
      result: correct ? 'correct' : 'incorrect',
      score: correct ? 1 : 0,
      maxScore: 1,
    }).catch(() => {})
    speak(q.say)
  }

  function next() {
    if (isLast) {
      setDone(true)
      return
    }
    setI((n) => n + 1)
    setPicked(null)
  }

  if (done) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
        <div className="grid h-20 w-20 place-items-center rounded-full bg-emerald-100 text-4xl">🎉</div>
        <h3 className="text-2xl font-bold text-slate-900">{t('wellDone')}</h3>
        <p className="max-w-xs text-slate-500">{t('reviewDoneSub')}</p>
        <p className="text-sm font-semibold text-slate-500">
          {t('score')}: {score}/{questions.length}
        </p>
        <button onClick={onClose} className="btn-write mt-2 h-12 px-6">
          ✓ {t('finishAndBack')}
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center justify-end py-4">
        <span className="text-sm font-semibold text-slate-500">
          {t('question')} {i + 1}/{questions.length}
        </span>
      </div>

      <div className="card flex flex-col items-center gap-2 p-6 text-center ring-saffraan-200/80">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">{t('reviewPrompt')}</p>
        <p
          className={`text-3xl font-bold text-slate-900 ${q.promptRtl ? 'rtl' : ''}`}
          dir={q.promptRtl ? 'rtl' : 'ltr'}
        >
          {q.promptRtl ? q.prompt : <SoundText text={q.prompt} />}
        </p>
      </div>

      <div className="mt-4 grid gap-2.5">
        {q.options.map((option) => {
          let style = 'border-slate-200 bg-white hover:border-saffraan-500'
          if (answered) {
            if (option === q.answer) style = 'border-emerald-500 bg-emerald-50 text-emerald-800'
            else if (option === picked) style = 'border-rose-400 bg-rose-50 text-rose-700'
            else style = 'border-slate-200 bg-white opacity-60'
          }
          return (
            <button
              key={option}
              onClick={() => choose(option)}
              disabled={answered}
              dir={q.optionsRtl ? 'rtl' : 'ltr'}
              className={`flex items-center justify-between rounded-xl border-2 px-4 py-3.5 text-left font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-saffraan-600 ${
                q.optionsRtl ? 'rtl' : ''
              } ${style}`}
            >
              <span>{q.optionsRtl ? option : <SoundText text={option} />}</span>
              {answered && option === q.answer && <span>✓</span>}
              {answered && option === picked && option !== q.answer && <span>✕</span>}
            </button>
          )
        })}
      </div>

      {/* Schermlezer-aankondiging van het resultaat (visueel al zichtbaar). */}
      {answered && (
        <p className="sr-only" role="status" aria-live="polite">
          {picked === q.answer ? t('speakingCorrect') : `${t('correctLabel')}: ${q.answer}`}
        </p>
      )}

      <div className="mt-auto py-4">
        <button onClick={next} disabled={!answered} className="btn-write h-12 w-full">
          {isLast ? `${t('seeResult')} ${arrowFwd}` : `${t('nextQuestion')} ${arrowFwd}`}
        </button>
      </div>
    </div>
  )
}
