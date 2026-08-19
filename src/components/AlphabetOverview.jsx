import { useState } from 'react'
import { canProbablySpeak, speak } from '../lib/speech.js'
import { useLang } from '../context/LanguageContext.jsx'

export default function AlphabetOverview({ lesson, onFinish }) {
  const { t, isDarija, arrowFwd } = useLang()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [audioError, setAudioError] = useState(false)
  const item = lesson.items[selectedIndex]

  function play(text) {
    if (!canProbablySpeak()) {
      setAudioError(true)
      return
    }
    setAudioError(false)
    speak(text)
  }

  return (
    <div className="flex flex-1 flex-col overflow-y-auto py-4">
      <div className="mb-3 rounded-2xl bg-indigo-50 p-4 text-center text-sm text-indigo-900">
        <p className="font-bold">{t('alphabetNoTest')}</p>
        <p className="mt-1">{isDarija ? lesson.introDarijaLat : lesson.intro}</p>
      </div>

      <div className="grid grid-cols-6 gap-2 sm:grid-cols-7" aria-label={t('alphabetOverviewTitle')}>
        {lesson.items.map((letter, index) => (
          <button
            key={letter.letter}
            type="button"
            onClick={() => {
              setSelectedIndex(index)
              play(letter.letterName.split(' / ')[0])
            }}
            className={`min-h-12 rounded-xl border-2 text-lg font-black focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
              index === selectedIndex
                ? 'border-indigo-500 bg-indigo-600 text-white'
                : 'border-indigo-100 bg-white text-indigo-900 hover:border-indigo-300'
            }`}
            aria-pressed={index === selectedIndex}
            aria-label={`${t('alphabetLetter')} ${letter.letter}, ${t('alphabetLetterName')} ${letter.letterName}`}
          >
            {letter.letter}
            <span className="ml-0.5 text-xs font-semibold opacity-75">{letter.lowercase}</span>
          </button>
        ))}
      </div>

      <section className="mt-4 rounded-3xl border-2 border-indigo-100 bg-white p-5 text-center shadow-sm">
        <div className="flex items-center justify-center gap-4">
          <span className="text-6xl font-black text-indigo-700">{item.letter}{item.lowercase}</span>
          <span className="text-5xl" aria-hidden="true">{item.icon}</span>
        </div>
        <p className="mt-2 text-lg font-bold text-slate-900">
          {t('alphabetLetterName')}: <span className="text-indigo-700">{item.letterName}</span>
        </p>
        <p className="mt-1 text-slate-600">{item.exampleWord}</p>
        {item.letterNameHint ? (
          <p className="mt-1 text-sm font-semibold text-indigo-700">
            {isDarija ? item.letterNameHintDarijaLat : item.letterNameHint}
          </p>
        ) : null}
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <button type="button" onClick={() => play(item.letterName.split(' / ')[0])} className="btn-ghost min-h-12">
            🔊 {t('alphabetListenLetter')}
          </button>
          <button type="button" onClick={() => play(item.speakPrompt)} className="btn-ghost min-h-12">
            🔊 {t('alphabetListenWord')}
          </button>
        </div>
      </section>

      {audioError ? <p role="status" className="mt-3 text-center text-sm text-amber-800">{t('alphabetAudioUnavailable')}</p> : null}
      <p className="mt-3 text-center text-xs text-slate-500">{t('alphabetAudioDraft')}</p>
      <p className="mt-2 rounded-xl bg-slate-100 p-3 text-center text-xs text-slate-700">{t('alphabetIjNote')}</p>

      <button type="button" onClick={onFinish} className="btn-primary mt-4 min-h-12 w-full">
        {t('finishArrow')} {arrowFwd}
      </button>
    </div>
  )
}
