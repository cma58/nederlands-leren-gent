import { useEffect, useMemo, useRef, useState } from 'react'
import { isTTSAvailable, speak } from '../lib/speech.js'
import { buildQuiz } from '../lib/quiz.js'
import { useProgress } from '../context/ProgressContext.jsx'
import { useLang } from '../context/LanguageContext.jsx'
import { recordLearningAttempt } from '../lib/attempts.js'
import SpeakingExercise from './SpeakingExercise.jsx'
import ListenExercise from './ListenExercise.jsx'
import TypingExercise from './TypingExercise.jsx'
import SoundText from './SoundText.jsx'
import AiCoach from './AiCoach.jsx'
import AlphabetExercise from './AlphabetExercise.jsx'
import AlphabetOverview from './AlphabetOverview.jsx'
import NameSpellingExercise from './NameSpellingExercise.jsx'
import { playReferenceAudio, stopReferenceAudio } from '../lib/referenceAudio.js'

/**
 * Volledige, interactieve lesspeler — werkt zonder API's of internet.
 *
 * Fasen:
 *   1) 'learn' — kaartjes: NL-woord + audio, tik om vertaling/tip te tonen.
 *   2) 'quiz'  — meerkeuzevragen (indien mogelijk voor deze les).
 *   3) 'done'  — samenvatting + de les wordt afgevinkt.
 */
export default function LessonPlayer({ lesson, onClose, onOpenSettings, onCompleted }) {
  const { markDone } = useProgress()
  const { t, isDarija } = useLang()
  const isSpeaking = lesson?.type === 'speaking'
  const isListen = lesson?.type === 'listen'
  const isTyping = lesson?.type === 'typing'
  const isAlphabet = lesson?.type === 'alphabet'
  const isAlphabetOverview = lesson?.type === 'alphabet-overview'
  const isNameSpelling = lesson?.type === 'name-spelling'
  const lessonTone = isSpeaking
    ? 'border-violet-200 bg-violet-50'
    : isListen
      ? 'border-teal-200 bg-teal-50'
      : isTyping
        ? 'border-saffraan-200 bg-saffraan-50'
        : isAlphabet || isAlphabetOverview
          ? 'border-indigo-200 bg-indigo-50'
          : 'border-gent-200 bg-gent-50'
  const quiz = useMemo(
    () => (isSpeaking || isListen || isTyping || isAlphabet || isAlphabetOverview || isNameSpelling ? [] : buildQuiz(lesson)),
    [lesson, isSpeaking, isListen, isTyping, isAlphabet, isAlphabetOverview, isNameSpelling],
  )

  const [phase, setPhase] = useState(
    isSpeaking
      ? 'speaking'
      : isListen
        ? 'listen'
        : isTyping
          ? 'typing'
          : isAlphabet
            ? 'alphabet'
            : isAlphabetOverview
              ? 'alphabet-overview'
              : isNameSpelling
                ? 'name-spelling'
                : 'learn',
  )
  const closeRef = useRef(null)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    // Zet de focus in het venster zodat toetsenbord/schermlezer erin belandt.
    closeRef.current?.focus()
    return () => {
      window.removeEventListener('keydown', onKey)
      stopReferenceAudio()
    }
  }, [onClose])

  useEffect(() => {
    stopReferenceAudio()
  }, [lesson?.id, phase])

  if (!lesson) return null

  return (
    <div
      className="fixed inset-0 z-40 flex flex-col bg-canvas"
      role="dialog"
      aria-modal="true"
      aria-label={isDarija && lesson.titleDarijaLat ? lesson.titleDarijaLat : lesson.title}
    >
      <div className={`flex items-center gap-3 border-b px-4 py-3 ${lessonTone}`}>
        <button ref={closeRef} onClick={onClose} className="btn-ghost h-11 w-11 !px-0" aria-label={t('close')}>
          ✕
        </button>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
            {t('lesson')} {lesson.displayId || lesson.id}
          </p>
          <h2 className="truncate text-base font-bold text-slate-900">
            {isDarija && lesson.titleDarijaLat ? lesson.titleDarijaLat : lesson.title}
          </h2>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-lg flex-1 flex-col overflow-hidden px-4">
        {phase === 'speaking' && (
          <SpeakingExercise
            lesson={lesson}
            onFinish={() => setPhase('done')}
            onOpenSettings={onOpenSettings}
          />
        )}
        {phase === 'listen' && (
          <ListenExercise lesson={lesson} onFinish={() => setPhase('done')} />
        )}
        {phase === 'typing' && (
          <TypingExercise lesson={lesson} onFinish={() => setPhase('done')} />
        )}
        {phase === 'alphabet' && (
          <AlphabetExercise lesson={lesson} onFinish={() => setPhase('done')} />
        )}
        {phase === 'alphabet-overview' && (
          <AlphabetOverview lesson={lesson} onFinish={() => setPhase('done')} />
        )}
        {phase === 'name-spelling' && (
          <NameSpellingExercise lesson={lesson} onFinish={() => setPhase('done')} onSkip={onClose} />
        )}
        {phase === 'learn' && (
          <LearnPhase
            lesson={lesson}
            onFinish={() => setPhase(quiz.length ? 'quiz' : 'done')}
            hasQuiz={quiz.length > 0}
          />
        )}
        {phase === 'quiz' && (
          <QuizPhase
            lesson={lesson}
            quiz={quiz}
            onFinish={() => setPhase('done')}
            onBack={() => setPhase('learn')}
          />
        )}
        {phase === 'done' && (
          <DonePhase
            lesson={lesson}
            onClose={() => {
              markDone(lesson.id)
              if (onCompleted) onCompleted(lesson)
              else onClose()
            }}
            onRestart={() =>
              setPhase(
                isSpeaking
                  ? 'speaking'
                  : isListen
                    ? 'listen'
                    : isTyping
                      ? 'typing'
                      : isAlphabet
                        ? 'alphabet'
                        : isAlphabetOverview
                          ? 'alphabet-overview'
                          : isNameSpelling
                            ? 'name-spelling'
                            : 'learn',
              )
            }
          />
        )}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Fase 1 — Leren (kaartjes)                                          */
/* ------------------------------------------------------------------ */
function LearnPhase({ lesson, onFinish, hasQuiz }) {
  const { t, arrowFwd, arrowBack, isDarija } = useLang()
  const [i, setI] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const hasItems = lesson?.items?.length > 0
  const item = hasItems ? lesson.items[i] : null
  const isLast = i === (lesson?.items?.length ?? 0) - 1

  // Alleen de kaart resetten. NIET automatisch voorlezen: telefoons blokkeren
  // geluid dat niet door een tik gestart wordt (dan hoor je niets).
  useEffect(() => {
    setRevealed(false)
  }, [i])

  const next = () => {
    stopReferenceAudio()
    if (isLast) onFinish()
    else setI((n) => n + 1)
  }
  const prev = () => {
    stopReferenceAudio()
    setI((n) => Math.max(0, n - 1))
  }

  if (!hasItems) {
    return <p className="p-6 text-center text-slate-500">{t('lessonEmpty')}</p>
  }

  return (
    <div className="flex flex-1 flex-col">
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

      {lesson.intro && i === 0 && (
        <p className="mb-2 text-center text-sm text-slate-500">{isDarija ? lesson.introDarijaLat || lesson.intro : lesson.intro}</p>
      )}

      {/* Het NL-woord blijft altijd links-naar-rechts (het is wat je leert) */}
      <button
        onClick={() => setRevealed((r) => !r)}
        className="card flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center ring-gent-200/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-gent-500"
        dir="ltr"
      >
        <div className="flex items-center gap-2">
          {item.article && (
            <span className="text-lg font-semibold text-gent-500">{item.article}</span>
          )}
          {item.icon ? <span className="text-6xl" aria-hidden="true">{item.icon}</span> : null}
          <span className="text-3xl font-bold text-slate-900">
            <SoundText text={item.nl} />
          </span>
        </div>
        {typeof item.value === 'number' && (
          <span className="text-6xl font-black text-gent-500">{item.value}</span>
        )}
        {item.pair && (
          <span className="text-lg text-slate-500">
            ↔ <SoundText text={item.pair} />
          </span>
        )}
        {item.ipa && <span className="text-sm text-slate-500">{item.ipa}</span>}

        {revealed ? (
          <div className="mt-1 space-y-1">
            {item.darijaLat && (
              <p className="text-lg text-slate-700" dir="ltr">
                <span className="italic">{item.darijaLat}</span>
              </p>
            )}
            {item.tip && <p className="text-sm text-emerald-700">💡 {item.tip}</p>}
            {(item.tipDarijaLat || item.pronunciation?.tipDarijaLat) && (
              <p className="text-sm text-emerald-700" dir="ltr">
                {item.tipDarijaLat || item.pronunciation?.tipDarijaLat}
              </p>
            )}
            {item.example && <p className="text-sm text-slate-500">bv. {item.example}</p>}
          </div>
        ) : (
          <span className="mt-1 text-sm text-slate-500">{t('tapToReveal')}</span>
        )}
      </button>

      <AiCoach lesson={lesson} itemIndex={i} />

      <div className="flex items-center gap-2 py-4">
        <button onClick={prev} disabled={i === 0} className="btn-ghost h-12 w-12 !px-0" aria-label={t('back')}>
          {arrowBack}
        </button>
        {isTTSAvailable() && (
          <button onClick={() => playReferenceAudio(item.audioId, item.nl)} className={`${lesson.listenFirst ? 'btn-primary' : 'btn-ghost'} flex-1 h-12`} aria-label={t('listen')}>
            🔊 {t('listen')}
          </button>
        )}
        <button onClick={next} className={`${lesson.listenFirst ? 'btn-ghost' : 'btn-primary'} flex-1 h-12`}>
          {isLast
            ? hasQuiz
              ? `${t('toExercise')} ${arrowFwd}`
              : `${t('finishArrow')} ${arrowFwd}`
            : `${t('next')} ${arrowFwd}`}
        </button>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Fase 2 — Quiz (meerkeuze)                                          */
/* ------------------------------------------------------------------ */
function QuizPhase({ lesson, quiz, onFinish, onBack }) {
  const { t, arrowFwd, arrowBack } = useLang()
  const [i, setI] = useState(0)
  const [picked, setPicked] = useState(null)
  const [score, setScore] = useState(0)
  const q = quiz[i]
  const isLast = i === quiz.length - 1
  const answered = picked !== null

  function choose(option) {
    if (answered) return
    setPicked(option)
    if (option === q.answer) setScore((s) => s + 1)
    speak(q.say || q.answer)
  }

  function next() {
    if (isLast) {
      recordLearningAttempt({
        lessonId: lesson.id,
        type: 'quiz',
        result: score === quiz.length ? 'good' : 'completed',
        score,
        maxScore: quiz.length,
      }).catch(() => {})
      onFinish()
      return
    }
    setI((n) => n + 1)
    setPicked(null)
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center justify-between py-4">
        <button onClick={onBack} className="text-sm font-semibold text-slate-500 hover:text-slate-700">
          {arrowBack} {t('backToLearn')}
        </button>
        <span className="text-sm font-semibold text-slate-500">
          {t('question')} {i + 1}/{quiz.length}
        </span>
      </div>

      <div className="card flex flex-col items-center gap-2 p-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          {t(q.labelKey || 'quizPrompt')}
        </p>
        <p className={`text-3xl font-bold text-slate-900 ${q.rtl ? 'rtl' : ''}`} dir={q.rtl ? 'rtl' : 'ltr'}>
          {q.prompt}
        </p>
      </div>

      <div className="mt-4 grid gap-2.5">
        {q.options.map((option) => {
          let style = 'border-slate-200 bg-white hover:border-gent-300'
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
              className={`flex items-center justify-between rounded-xl border-2 px-4 py-3.5 text-left font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gent-500 ${style}`}
              dir="ltr"
            >
              <span>{option}</span>
              {answered && option === q.answer && <span>✓</span>}
              {answered && option === picked && option !== q.answer && <span>✕</span>}
            </button>
          )
        })}
      </div>

      {/* Onhoorbaar voor het oog, wél voor een schermlezer: het resultaat. */}
      {answered && (
        <p className="sr-only" role="status" aria-live="polite">
          {picked === q.answer ? t('speakingCorrect') : `${t('correctLabel')}: ${q.answer}`}
        </p>
      )}

      <div className="mt-auto py-4">
        <button onClick={next} disabled={!answered} className="btn-primary h-12 w-full">
          {isLast ? `${t('seeResult')} ${arrowFwd}` : `${t('nextQuestion')} ${arrowFwd}`}
        </button>
      </div>

      <p className="pb-4 text-center text-xs text-slate-500">
        {t('score')}: {score}/{quiz.length}
      </p>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Fase 3 — Klaar                                                     */
/* ------------------------------------------------------------------ */
function DonePhase({ lesson, onClose, onRestart }) {
  const { t, isDarija } = useLang()
  const title = isDarija && lesson.titleDarijaLat ? lesson.titleDarijaLat : lesson.title
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
      <div className="grid h-20 w-20 place-items-center rounded-full bg-emerald-100 text-4xl">🎉</div>
      <h3 className="text-2xl font-bold text-slate-900">{t('wellDone')}</h3>
      <p className="max-w-xs text-slate-500">
        {t('lessonCompletePre')} <span className="font-semibold">{title}</span>{' '}
        {t('lessonCompletePost')}
      </p>
      <div className="mt-2 flex w-full max-w-xs flex-col gap-2">
        <button onClick={onClose} className="btn-primary h-12">
          ✓ {t('finishAndBack')}
        </button>
        <button onClick={onRestart} className="btn-ghost h-12">
          {t('practiceAgain')}
        </button>
      </div>
    </div>
  )
}
