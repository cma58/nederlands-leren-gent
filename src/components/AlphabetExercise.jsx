import { useEffect, useMemo, useRef, useState } from 'react'
import { canProbablySpeak, speak } from '../lib/speech.js'
import { useLang } from '../context/LanguageContext.jsx'

function choicesFor(items, index) {
  const current = items[index]
  const choices = [current]
  for (let offset = 1; choices.length < Math.min(3, items.length); offset += 1) {
    const candidate = items[(index + offset) % items.length]
    if (!choices.some((item) => item.letter === candidate.letter)) choices.push(candidate)
  }
  const shift = index % choices.length
  return [...choices.slice(shift), ...choices.slice(0, shift)]
}

export default function AlphabetExercise({ lesson, onFinish }) {
  const { t, isDarija, arrowFwd } = useLang()
  const [index, setIndex] = useState(0)
  const [mode, setMode] = useState('learn')
  const [picked, setPicked] = useState(null)
  const [audioError, setAudioError] = useState(false)
  const chooseHeadingRef = useRef(null)
  const item = lesson.items[index]
  const choices = useMemo(() => choicesFor(lesson.items, index), [lesson.items, index])
  const answered = picked !== null
  const correct = picked === item.letter
  const isLast = index === lesson.items.length - 1

  useEffect(() => {
    if (mode === 'choose') chooseHeadingRef.current?.focus()
  }, [mode])

  function play(text) {
    if (!canProbablySpeak()) {
      setAudioError(true)
      return
    }
    setAudioError(false)
    speak(text)
  }

  function next() {
    if (mode === 'learn') {
      setMode('choose')
      play(item.letterName.split(' / ')[0])
      return
    }
    if (isLast) {
      onFinish()
      return
    }
    setIndex((value) => value + 1)
    setMode('learn')
    setPicked(null)
  }

  return (
    <div className="flex flex-1 flex-col overflow-y-auto py-4">
      <div className="mb-3">
        <div className="flex items-center justify-between text-sm font-semibold text-slate-600">
          <span>{index + 1} {t('of')} {lesson.items.length}</span>
          <span>{mode === 'learn' ? `${item.letter} · ${item.letterName}` : t('alphabetListenChoose')}</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-indigo-100">
          <div className="h-full rounded-full bg-indigo-600 transition-all" style={{ width: `${((index + 1) / lesson.items.length) * 100}%` }} />
        </div>
      </div>

      {mode === 'learn' ? (
        <section className="flex flex-1 flex-col items-center justify-center rounded-3xl border-2 border-indigo-100 bg-white p-5 text-center shadow-sm">
          <div className="flex items-center gap-5">
            <span className="text-7xl font-black text-indigo-700">{item.letter}{item.lowercase}</span>
            <span className="text-6xl" aria-hidden="true">{item.icon}</span>
          </div>
          <p className="mt-4 text-xl font-bold text-slate-900">
            {t('alphabetLetter')} {item.letter} · {t('alphabetLetterName')} <span className="text-indigo-700">{item.letterName}</span>
          </p>
          <p className="mt-2 text-lg font-semibold text-slate-700">{item.letter} {t('alphabetOf')} {item.exampleWord}</p>
          {item.letterNameHint ? (
            <p className="mt-1 text-sm font-semibold text-indigo-700">
              {isDarija ? item.letterNameHintDarijaLat : item.letterNameHint}
            </p>
          ) : null}
          <p className="mt-3 max-w-sm text-sm text-emerald-800">
            {isDarija ? item.exampleSoundDarijaLat : item.exampleSound}
          </p>
          <div className="mt-5 grid w-full gap-2 sm:grid-cols-2">
            <button type="button" onClick={() => play(item.letterName.split(' / ')[0])} className="btn-ghost min-h-12">
              🔊 {t('alphabetListenLetter')}
            </button>
            <button type="button" onClick={() => play(item.speakPrompt)} className="btn-ghost min-h-12">
              🔊 {t('alphabetListenWord')}
            </button>
          </div>
          <p className="mt-4 text-sm font-semibold text-indigo-800">{t('alphabetSayPrompt')}</p>
        </section>
      ) : (
        <section className="flex flex-1 flex-col items-center justify-center rounded-3xl border-2 border-teal-100 bg-white p-5 text-center shadow-sm">
          <span className="text-5xl" aria-hidden="true">👂</span>
          <h3 ref={chooseHeadingRef} tabIndex={-1} className="mt-3 text-xl font-bold text-slate-900 outline-none">{t('alphabetListenChoose')}</h3>
          {audioError ? <p className="mt-2 text-4xl font-black text-teal-800">{item.lowercase}</p> : null}
          {audioError ? <p className="mt-1 text-sm text-slate-600">{t('alphabetVisualChoose')}</p> : null}
          <button type="button" onClick={() => play(item.letterName.split(' / ')[0])} className="btn-ghost mt-4 min-h-12 w-full">
            🔊 {t('listenAgain')}
          </button>
          <div className="mt-4 grid w-full grid-cols-3 gap-3">
            {choices.map((choice) => {
              const isPicked = choice.letter === picked
              const showCorrect = answered && choice.letter === item.letter
              return (
                <button
                  key={choice.letter}
                  type="button"
                  disabled={answered}
                  onClick={() => setPicked(choice.letter)}
                  className={`min-h-16 rounded-2xl border-2 text-2xl font-black focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                    showCorrect ? 'border-emerald-500 bg-emerald-50 text-emerald-800' : isPicked ? 'border-amber-400 bg-amber-50 text-amber-900' : 'border-slate-200 bg-white text-slate-800'
                  }`}
                >
                  {choice.letter}{choice.lowercase}
                </button>
              )
            })}
          </div>
          <div aria-live="polite" aria-atomic="true" className="w-full">
            {answered ? (
              <p className={`mt-4 rounded-xl px-4 py-3 text-sm font-semibold ${correct ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-900'}`}>
                {correct ? t('alphabetCorrect') : `${t('alphabetNotWrong')} ${t('correctLabel')}: ${item.letter}.`}
              </p>
            ) : <span className="sr-only">{t('alphabetListenChoose')}</span>}
          </div>
        </section>
      )}

      {audioError ? <p role="status" className="mt-3 text-center text-sm text-amber-800">{t('alphabetAudioUnavailable')}</p> : null}
      <p className="mt-3 text-center text-xs text-slate-500">{t('alphabetNoTest')}</p>
      <button type="button" onClick={next} disabled={mode === 'choose' && !answered} className="btn-primary mt-4 min-h-12 w-full">
        {mode === 'learn' ? t('alphabetPractice') : isLast ? t('finishArrow') : t('next')} {arrowFwd}
      </button>
    </div>
  )
}
