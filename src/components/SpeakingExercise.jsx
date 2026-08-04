import { useEffect, useRef, useState } from 'react'
import { isTTSAvailable, speak, canProbablySpeak } from '../lib/speech.js'
import { transcribeAudio } from '../lib/groq.js'
import { evaluateAnswer } from '../lib/gemini.js'
import { hasGemini, hasGroq } from '../lib/config.js'
import { useRecorder } from '../hooks/useRecorder.js'
import { useLang } from '../context/LanguageContext.jsx'

/**
 * Spreekoefening voor lessen van het type 'speaking'.
 *
 * Flow per opdracht:
 *   1) de leerling hoort/leest de doelzin;
 *   2) ze spreekt in (microfoon) → Groq Whisper zet het om naar tekst,
 *      of ze typt het antwoord (terugval zonder microfoonsleutel);
 *   3) Gemini beoordeelt het antwoord als een geduldige NT2-docent.
 */
export default function SpeakingExercise({ lesson, onFinish, onOpenSettings }) {
  const { t, arrowFwd } = useLang()
  const [i, setI] = useState(0)
  const hasItems = lesson?.items?.length > 0
  const item = hasItems ? lesson.items[i] : null
  const isLast = i === (lesson?.items?.length ?? 0) - 1

  const target = item?.answer || item?.nl || ''
  const speakable = item?.answer && item.answer.includes('...') ? item.nl : target
  // Alfabet-item = een letter met voorbeeldwoord/icoon (Module 0.0).
  const isLetter = Boolean(item?.word)
  // Klank-/woorditem = een los woord met minimaal paar of IPA (Module 0.1).
  const isWord = !isLetter && Boolean(item?.pair || item?.ipa)
  // Label: één of twee woorden -> "Spreek dit woord uit", anders "Spreek deze zin".
  const wordCount = String(target).trim().split(/\s+/).filter(Boolean).length
  const labelKey = isWord || wordCount <= 2 ? 'speakThisWord' : 'speakThisSentence'
  // Bij een minimaal paar (rok ↔ rook) beide woorden voorlezen voor het contrast.
  const listenText = item?.pair ? `${speakable}, ${item.pair}` : speakable

  const recorder = useRecorder()
  const [status, setStatus] = useState('idle') // idle | busy | result | error
  const [transcript, setTranscript] = useState('')
  const [typed, setTyped] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [recUrl, setRecUrl] = useState(null) // eigen opname om terug te beluisteren

  useEffect(() => {
    setStatus('idle')
    setTranscript('')
    setTyped('')
    setFeedback(null)
    setErrorMsg('')
    setRecUrl(null)
  }, [i])

  // Ruim de blob-URL van de vorige opname op (voorkomt geheugenlek per opname).
  useEffect(() => {
    return () => {
      if (recUrl) URL.revokeObjectURL(recUrl)
    }
  }, [recUrl])

  const playbackRef = useRef(null)
  const canRecord = hasGroq() && recorder.supported
  const canEvaluate = hasGemini()

  async function check(answerText) {
    if (!answerText?.trim()) return
    if (!canEvaluate) {
      setErrorMsg(t('errNoGemini'))
      setStatus('error')
      return
    }
    setStatus('busy')
    setErrorMsg('')
    try {
      const context = isLetter
        ? `De leerling oefent de uitspraak van de letter "${item.nl}" met het voorbeeldwoord "${item.word}". Geef korte, bemoedigende uitspraakfeedback in het Nederlands en in het Darija.`
        : isWord
          ? `De leerling oefent de uitspraak van het Nederlandse woord "${item.nl}"${
              item.pair ? ` (te onderscheiden van "${item.pair}")` : ''
            }. Geef korte, bemoedigende uitspraakfeedback in het Nederlands en in het Darija.`
          : lesson.intro || item.nl
      const result = await evaluateAnswer(answerText, target, context)
      setFeedback(result)
      setStatus('result')
      if (isTTSAvailable() && result.correction) speak(result.correction)
    } catch (e) {
      setErrorMsg(errorKeyToText(e, t))
      setStatus('error')
    }
  }

  async function handleRecordToggle() {
    if (recorder.recording) {
      setStatus('busy')
      const blob = await recorder.stop()
      if (!blob) {
        setStatus('idle')
        return
      }
      setRecUrl(URL.createObjectURL(blob))
      try {
        // Context-hint: verwacht woord (+ contrastwoord) zodat Whisper korte
        // woorden betrouwbaarder herkent en man/maan kan onderscheiden.
        const words = [target, item.pair, item.word].filter(Boolean)
        const hint = `Nederlandse uitspraakoefening. Mogelijke woorden: ${words.join(', ')}.`
        const text = await transcribeAudio(blob, '', hint)
        setTranscript(text)
        if (text) await check(text)
        else {
          setErrorMsg(t('errNoAudio'))
          setStatus('error')
        }
      } catch (e) {
        setErrorMsg(errorKeyToText(e, t))
        setStatus('error')
      }
    } else {
      setFeedback(null)
      setTranscript('')
      recorder.start()
    }
  }

  function next() {
    if (isLast) onFinish()
    else setI((n) => n + 1)
  }

  const noKeys = !canEvaluate && !canRecord
  const ttsSilent = !canProbablySpeak()

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
              idx === i ? 'w-5 bg-saffraan-500' : idx < i ? 'w-1.5 bg-saffraan-300' : 'w-1.5 bg-slate-200'
            }`}
          />
        ))}
      </div>

      {/* Opdracht */}
      <div className="card p-5 text-center">
        {isLetter ? (
          <>
            {/* Stap 1 — Visueel: grote letter, icoon, woord, Darija */}
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              🎙️ {t('sayLetterWord')}
            </p>
            <div className="mt-2 flex items-center justify-center gap-4" dir="ltr">
              <span className="text-6xl font-black text-gent-600">{item.nl}</span>
              {item.icon && <span className="text-6xl" aria-hidden="true">{item.icon}</span>}
            </div>
            <p className="mt-2 text-xl font-bold text-slate-900" dir="ltr">
              {item.nl} — {item.word}
            </p>
            {(item.darija || item.darijaLat) && (
              <p className="mt-1 text-slate-500">
                {item.darija && <span className="rtl">{item.darija}</span>}
                {item.darija && item.darijaLat && ' · '}
                {item.darijaLat && <span className="italic">{item.darijaLat}</span>}
              </p>
            )}
            {item.tip && <p className="mt-2 text-sm text-emerald-700">💡 {item.tip}</p>}
          </>
        ) : (
          <>
            {/* Klank/woord/getal of zin — NL blijft links-naar-rechts */}
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              🎙️ {t(labelKey)}
            </p>
            {typeof item.value === 'number' && (
              <span className="mt-1 block text-6xl font-black text-gent-600" dir="ltr">
                {item.value}
              </span>
            )}
            <p className="mt-2 text-3xl font-bold text-slate-900" dir="ltr">
              {speakable}
              {item.pair && <span className="text-xl font-normal text-slate-500"> ↔ {item.pair}</span>}
            </p>
            {item.ipa && <p className="text-sm text-slate-500" dir="ltr">{item.ipa}</p>}
            {(item.darija || item.darijaLat) && (
              <p className="mt-1 text-slate-500">
                {item.darija && <span className="rtl">{item.darija}</span>}
                {item.darija && item.darijaLat && ' · '}
                {item.darijaLat && <span className="italic">{item.darijaLat}</span>}
              </p>
            )}
            {item.tip && <p className="mt-2 text-sm text-emerald-700">💡 {item.tip}</p>}
          </>
        )}

        {/* Stap 2 — Luisteren (bij een paar: beide woorden) */}
        {isTTSAvailable() && (
          <button onClick={() => speak(listenText)} className="btn-ghost mt-3">
            🔊 {t('listenExample')}
          </button>
        )}
        {ttsSilent && (
          <p className="mt-2 text-xs text-amber-700">⚠️ {t('ttsOffline')}</p>
        )}
      </div>

      {noKeys && (
        <div className="mt-4 rounded-xl bg-amber-50 p-4 text-sm text-amber-800">
          {t('keysNeeded')}{' '}
          <button onClick={onOpenSettings} className="font-semibold underline">
            {t('openSettingsLink')} (⚙️)
          </button>{' '}
          {t('keysNeededPost')}
        </div>
      )}

      <div className="mt-4">
        {canRecord ? (
          <button
            onClick={handleRecordToggle}
            disabled={status === 'busy' && !recorder.recording}
            className={`flex h-16 w-full items-center justify-center gap-3 rounded-2xl text-lg font-bold text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-saffraan-600 ${
              recorder.recording ? 'animate-pulse bg-rose-600' : 'bg-saffraan-600 hover:bg-saffraan-700'
            } disabled:opacity-50`}
          >
            {recorder.recording ? `⏹️ ${t('stopAndCheck')}` : `🎙️ ${t('record')}`}
          </button>
        ) : (
          <div className="flex gap-2">
            <input
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && check(typed)}
              placeholder={t('typeYourAnswer')}
              dir="ltr"
              className="flex-1 rounded-xl border-2 border-slate-200 px-4 py-3 focus:border-saffraan-400 focus:outline-none"
            />
            <button onClick={() => check(typed)} className="btn-primary px-5">
              {t('check')}
            </button>
          </div>
        )}
        {recorder.error && <p className="mt-2 text-sm text-rose-600">{t(recorder.error)}</p>}
      </div>

      <div className="mt-4 flex-1">
        {status === 'busy' && (
          <p className="text-center text-sm text-slate-500">⏳ {t('pleaseWait')}</p>
        )}

        {recUrl && (
          <button
            onClick={() => {
              if (!playbackRef.current) playbackRef.current = new Audio()
              playbackRef.current.src = recUrl
              playbackRef.current.play().catch(() => {})
            }}
            className="btn-ghost mb-3"
          >
            ▶️ {t('myRecording')}
          </button>
        )}

        {transcript && (
          <p className="mb-3 rounded-lg bg-slate-100 p-3 text-sm text-slate-600">
            {t('iHeard')}: <span className="font-semibold" dir="ltr">“{transcript}”</span>
          </p>
        )}

        {status === 'error' && errorMsg && (
          <div className="rounded-lg bg-rose-50 p-3 text-sm text-rose-700">
            <p>{errorMsg}</p>
            <button
              onClick={() => {
                setErrorMsg('')
                setStatus('idle')
              }}
              className="mt-2 font-semibold text-rose-800 underline"
            >
              ↻ {t('tryAgain')}
            </button>
          </div>
        )}

        {status === 'result' && feedback && (
          <div className={`rounded-xl p-4 ${feedback.correct ? 'bg-emerald-50' : 'bg-amber-50'}`}>
            <p className={`font-bold ${feedback.correct ? 'text-emerald-800' : 'text-amber-900'}`}>
              {feedback.correct ? `✅ ${t('speakingCorrect')}` : `✍️ ${t('speakingAlmost')}`}
            </p>
            {feedback.feedback_nl && (
              <p className="mt-1 text-sm text-slate-700">{feedback.feedback_nl}</p>
            )}
            {feedback.correction && (
              <p className="mt-1 text-sm text-slate-800">
                {t('correctLabel')}: <span className="font-semibold" dir="ltr">{feedback.correction}</span>
              </p>
            )}
            {feedback.feedback_darija && (
              <p className="rtl mt-2 text-sm text-slate-600">{feedback.feedback_darija}</p>
            )}
          </div>
        )}
      </div>

      <div className="flex gap-2 py-4">
        <button onClick={next} className="btn-ghost flex-1 h-12">
          {t('skip')}
        </button>
        <button onClick={next} disabled={status !== 'result'} className="btn-primary flex-1 h-12">
          {isLast ? `${t('finishArrow')} ${arrowFwd}` : `${t('next')} ${arrowFwd}`}
        </button>
      </div>
    </div>
  )
}

function errorKeyToText(e, t) {
  const msg = String(e?.message || e)
  const status = e?.status
  if (msg.includes('GEEN_GROQ_SLEUTEL')) return t('errNoGroq')
  if (msg.includes('GEEN_GEMINI_SLEUTEL')) return t('errNoGemini')
  // Time-out of geen netwerk.
  if (status === 'timeout') return t('errTimeout')
  if (status === 'network') return t('errGeneric')
  // Model bestaat niet (meer) — dé melding bij een afgeschafte/gewijzigde model-id.
  if (status === 404 || /not found|is not supported|not supported for/i.test(msg))
    return t('errModelUnavailable')
  // 400/401/403 = ongeldige/geweigerde sleutel.
  if (
    status === 400 ||
    status === 401 ||
    status === 403 ||
    msg.includes('401') ||
    msg.includes('403') ||
    msg.includes('400') ||
    /api[_ ]?key/i.test(msg) ||
    /invalid/i.test(msg)
  )
    return t('errKeyRejected')
  if (status === 429 || msg.includes('429')) return t('errTooMany')
  return t('errGeneric')
}
