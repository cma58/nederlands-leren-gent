import { useMemo, useState } from 'react'
import { useLang } from '../context/LanguageContext.jsx'
import { playReferenceAudio, playReferenceSequence } from '../lib/referenceAudio.js'

export default function NameSpellingExercise({ lesson, onFinish, onSkip }) {
  const { t, arrowFwd, isDarija } = useLang()
  const [name, setName] = useState('')
  const [audioError, setAudioError] = useState(false)
  const letterItems = useMemo(() => new Map(lesson.items.map((item) => [item.letter, item])), [lesson.items])
  const letterNames = useMemo(() => new Map(lesson.items.map((item) => [item.letter, item.letterName.split(' / ')[0]])), [lesson.items])
  const letters = useMemo(
    () => name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase().split('').filter((letter) => letterNames.has(letter)),
    [letterNames, name],
  )
  const unsupportedCharacters = useMemo(() => {
    const normalized = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase()
    return normalized.split('').filter((character) => character !== ' ' && character !== '-' && !letterNames.has(character))
  }, [letterNames, name])

  function playName() {
    setAudioError(false)
    const sequence = name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toUpperCase()
      .split('')
      .map((character) => letterItems.get(character))
      .filter(Boolean)
      .map((item) => ({ promptId: item.letterNameAudioId, fallbackText: item.letterName.split(' / ')[0] }))
    playReferenceSequence(sequence, { rate: 0.85 })
      .then((played) => setAudioError(!played))
      .catch(() => setAudioError(true))
  }

  return (
    <div className="flex flex-1 flex-col overflow-y-auto py-4">
      <section className="flex flex-1 flex-col items-center justify-center rounded-3xl border-2 border-fuchsia-100 bg-white p-5 text-center shadow-sm">
        <span className="text-5xl" aria-hidden="true">✍️</span>
        <h3 className="mt-3 text-xl font-bold text-slate-900">{t('spellYourName')}</h3>
        <p className="mt-2 max-w-sm text-sm text-slate-600">{t('spellYourNameHelp')}</p>
        <label htmlFor="learner-name" className="mt-5 w-full text-left text-sm font-bold text-slate-700">{t('yourName')}</label>
        <input
          id="learner-name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="mt-2 min-h-12 w-full rounded-xl border-2 border-slate-200 px-4 text-lg focus:border-fuchsia-500 focus:outline-none"
          placeholder={t('nameExample')}
        />
        {letters.length ? (
          <div className="mt-5 flex flex-wrap justify-center gap-2" aria-live="polite">
            {letters.map((letter, index) => (
              <span key={`${letter}-${index}`} className="rounded-xl bg-fuchsia-50 px-3 py-2 text-center">
                <span className="block text-xl font-black text-fuchsia-800">{letter}</span>
                <span className="block text-xs font-semibold text-slate-600">{letterNames.get(letter)}</span>
              </span>
            ))}
          </div>
        ) : null}
        {unsupportedCharacters.length ? (
          <p role="status" className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900">
            {t('nameUnsupported')}
          </p>
        ) : null}
        <button type="button" onClick={playName} disabled={!letters.length} className="btn-ghost mt-5 min-h-12 w-full">
          🔊 {t('listenToSpelling')}
        </button>
        {audioError ? <p role="status" className="mt-3 text-sm text-amber-800">{t('alphabetAudioUnavailable')}</p> : null}
      </section>
      {letters.length ? (
        <button type="button" onClick={onFinish} className="btn-primary mt-4 min-h-12 w-full">
          {t('finishArrow')} {arrowFwd}
        </button>
      ) : (
        <button type="button" onClick={onSkip} className="btn-ghost mt-4 min-h-12 w-full">
          {t('practiceLater')} {arrowFwd}
        </button>
      )}
      {isDarija && !letters.length ? (
        <button type="button" onClick={() => playReferenceAudio('darija-instruction-later', '', { fallbackToTts: false })} className="btn-ghost mt-3 min-h-11 w-full" dir="ltr">
          🔊 Ila mazal s3ib, khlliwh l morra jaya.
        </button>
      ) : null}
    </div>
  )
}
