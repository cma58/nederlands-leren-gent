import { useEffect, useState } from 'react'
import { canProbablySpeak } from '../lib/speech.js'
import { useLang } from '../context/LanguageContext.jsx'
import SoundText from './SoundText.jsx'
import { recordLearningAttempt } from '../lib/attempts.js'
import { playReferenceAudio, stopReferenceAudio } from '../lib/referenceAudio.js'

/**
 * Luister-discriminatie ("Welk woord hoor je?").
 *
 * Didactisch: eerst léren onderscheiden (perceptie), dan pas produceren.
 * De app speelt willekeurig één van twee gelijkende woorden (een minimaal
 * paar) en de leerling kiest welk woord ze hoorde. Werkt met TTS — geen
 * API-sleutels nodig.
 */
export default function ListenExercise({ lesson, onFinish }) {
  const { t, arrowFwd } = useLang()
  const [i, setI] = useState(0)
  const hasItems = lesson?.items?.length > 0
  const item = hasItems ? lesson.items[i] : null
  const isLast = i === (lesson?.items?.length ?? 0) - 1

  const options = [item?.nl, item?.pair].filter(Boolean)
  const [target, setTarget] = useState(item?.nl ?? '')
  const [played, setPlayed] = useState(false)
  const [audioBusy, setAudioBusy] = useState(false)
  const [audioError, setAudioError] = useState(false)
  const [picked, setPicked] = useState(null)
  const answered = picked !== null

  // Bij een nieuw item: willekeurig doelwoord kiezen en resetten.
  useEffect(() => {
    const opts = [item?.nl, item?.pair].filter(Boolean)
    if (opts.length) setTarget(opts[Math.floor(Math.random() * opts.length)])
    setPlayed(false)
    setAudioError(false)
    setPicked(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i])

  async function play() {
    setAudioBusy(true)
    setAudioError(false)
    try {
      const result = await playReferenceAudio(target === item.nl ? item.audioId : item.pairAudioId, target)
      setPlayed(result.played)
      setAudioError(!result.played)
    } catch {
      setPlayed(false)
      setAudioError(true)
    } finally {
      setAudioBusy(false)
    }
  }

  function choose(opt) {
    if (answered) return
    setPicked(opt)
    const correct = opt === target
    recordLearningAttempt({
      lessonId: lesson.id,
      itemKey: `listening:${lesson.id}:${i}`,
      type: 'listening',
      result: correct ? 'correct' : 'incorrect',
      score: correct ? 1 : 0,
      maxScore: 1,
    }).catch(() => {})
    playReferenceAudio(target === item.nl ? item.audioId : item.pairAudioId, target)
  }

  function next() {
    stopReferenceAudio()
    if (isLast) onFinish()
    else setI((n) => n + 1)
  }

  if (!hasItems) {
    return <p className="p-6 text-center text-slate-500">{t('lessonEmpty')}</p>
  }

  return (
    <div className="flex flex-1 flex-col">
      {/* Voortgang */}
      <div className="flex items-center justify-center gap-1.5 py-4">
        {lesson.items.map((_, idx) => (
          <span
            key={idx}
            className={`h-1.5 rounded-full transition-all ${
              idx === i ? 'w-5 bg-teal-700' : idx < i ? 'w-1.5 bg-teal-300' : 'w-1.5 bg-slate-200'
            }`}
          />
        ))}
      </div>

      <p className="mb-3 text-center text-base font-semibold text-slate-700">{t('listenWhichWord')}</p>

      {!canProbablySpeak() && (
        <p className="mb-3 rounded-lg bg-amber-50 p-3 text-center text-sm text-amber-800">
          ⚠️ {t('ttsOffline')}
        </p>
      )}
      {audioError && canProbablySpeak() ? (
        <p role="alert" className="mb-3 rounded-lg bg-amber-50 p-3 text-center text-sm text-amber-800">
          ⚠️ {t('ttsOffline')}
        </p>
      ) : null}

      {/* Luisterknop */}
      <button
        onClick={play}
        disabled={audioBusy}
        className="flex h-24 w-full items-center justify-center gap-3 rounded-2xl bg-teal-700 text-2xl font-bold text-white shadow-sm transition hover:bg-teal-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-600"
      >
        🔊 {audioBusy ? t('loading') : played ? t('listenAgain') : t('listenTapPlay')}
      </button>

      {/* Keuzes */}
      <div className="mt-4 grid gap-2.5">
        {options.map((opt) => {
          let style = 'border-slate-200 bg-white hover:border-teal-400'
          if (answered) {
            if (opt === target) style = 'border-emerald-500 bg-emerald-50 text-emerald-800'
            else if (opt === picked) style = 'border-rose-400 bg-rose-50 text-rose-700'
            else style = 'border-slate-200 bg-white opacity-60'
          }
          return (
            <button
              key={opt}
              onClick={() => choose(opt)}
              disabled={answered || !played}
              dir="ltr"
              className={`flex items-center justify-between rounded-xl border-2 px-4 py-4 text-left text-lg font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 disabled:opacity-60 ${style}`}
            >
              <span><SoundText text={opt} /></span>
              {answered && opt === target && <span>✓</span>}
              {answered && opt === picked && opt !== target && <span>✕</span>}
            </button>
          )
        })}
      </div>

      {!played && (
        <p className="mt-3 text-center text-sm text-slate-500">{t('listenTapPlay')} 👆</p>
      )}

      {/* Feedback + uitleg na het antwoord */}
      {answered && (
        <div className="mt-4 rounded-xl bg-slate-50 p-4 text-center" role="status" aria-live="polite">
          <p className={`font-bold ${picked === target ? 'text-emerald-700' : 'text-amber-800'}`}>
            {picked === target ? `✅ ${t('speakingCorrect')}` : `👂 ${t('listenItWas')} “${target}”`}
          </p>
          {item.tip && <p className="mt-1 text-sm text-emerald-700">💡 {item.tip}</p>}
        </div>
      )}

      <div className="mt-auto py-4">
        <button onClick={next} disabled={!answered} className="btn-listen h-12 w-full">
          {isLast ? `${t('finishArrow')} ${arrowFwd}` : `${t('next')} ${arrowFwd}`}
        </button>
      </div>
    </div>
  )
}
