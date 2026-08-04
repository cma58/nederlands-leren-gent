import { useEffect, useRef, useState } from 'react'
import { isTTSAvailable, speak, canProbablySpeak } from '../lib/speech.js'
import { transcribeAudio } from '../lib/groq.js'
import { evaluateAnswer } from '../lib/gemini.js'
import { hasGemini, hasGroq } from '../lib/config.js'
import { useRecorder } from '../hooks/useRecorder.js'
import { useLang } from '../context/LanguageContext.jsx'
import { scoreTranscript, tipsFor } from '../lib/pronunciation.js'
import { itemKey, recordAttempt, isMastered } from '../lib/speakingProgress.js'

/**
 * Spreek- & uitspraakoefening.
 *
 * Volgorde per item:
 *   1) NL-woord/zin tonen  2) Darija tonen  3) voorbeeld beluisteren
 *   4) langzaam beluisteren 5) opnemen (met timer) 6) eigen opname terug
 *   7) voorbeeld + eigen opname na elkaar  8) Groq schrijft uit (neutraal)
 *   9) app vergelijkt zelf → goed / bijna goed / probeer opnieuw (+ vaste tip)
 *  10) opnieuw luisteren/opnemen.
 *
 * Het OORDEEL komt van de app (lib/pronunciation.js), niet van een AI. Gemini
 * is optioneel en geeft enkel extra uitleg. Losse letters krijgen geen streng
 * oordeel (Whisper is daar te onbetrouwbaar voor).
 */
export default function SpeakingExercise({ lesson, onFinish, onOpenSettings }) {
  const { t, arrowFwd } = useLang()
  const [i, setI] = useState(0)
  const hasItems = lesson?.items?.length > 0
  const item = hasItems ? lesson.items[i] : null
  const isLast = i === (lesson?.items?.length ?? 0) - 1

  const target = item?.answer || item?.nl || ''
  const speakable = item?.answer && item.answer.includes('...') ? item.nl : target
  const isLetter = Boolean(item?.word)
  const isWord = !isLetter && Boolean(item?.pair || item?.ipa)
  const wordCount = String(target).trim().split(/\s+/).filter(Boolean).length
  const isSentence = !isWord && wordCount > 2
  const labelKey = isWord || wordCount <= 2 ? 'speakThisWord' : 'speakThisSentence'
  const maxMs = isSentence ? 15000 : 10000

  const recorder = useRecorder()
  const [status, setStatus] = useState('idle') // idle | recording | busy | recorded | result | error
  const [transcript, setTranscript] = useState('')
  const [result, setResult] = useState(null) // 'good' | 'almost' | 'retry'
  const [errorMsg, setErrorMsg] = useState('')
  const [recUrl, setRecUrl] = useState(null)
  const [extra, setExtra] = useState(null) // optionele Gemini-uitleg
  const [extraBusy, setExtraBusy] = useState(false)
  const playbackRef = useRef(null)

  const key = item ? itemKey(lesson.id, item, i) : ''
  const mastered = key ? isMastered(key) : false

  useEffect(() => {
    setStatus('idle')
    setTranscript('')
    setResult(null)
    setErrorMsg('')
    setRecUrl(null)
    setExtra(null)
    setExtraBusy(false)
  }, [i])

  // Blob-URL van de vorige opname opruimen (geen geheugenlek per opname).
  useEffect(() => {
    return () => {
      if (recUrl) URL.revokeObjectURL(recUrl)
    }
  }, [recUrl])

  const canCheck = hasGroq() && recorder.supported // transcript-controle mogelijk
  const usesVerdict = !isLetter // letters krijgen geen streng oordeel
  const hasRecording = Boolean(recUrl)

  /* -------- audio -------- */
  const listen = (rate) => speak(speakable, rate ? { rate } : {})
  const playMine = () => {
    if (!recUrl) return
    if (!playbackRef.current) playbackRef.current = new Audio()
    playbackRef.current.src = recUrl
    playbackRef.current.play().catch(() => {})
  }
  const playBoth = () => {
    // Eerst het voorbeeld, daarna automatisch de eigen opname.
    speak(speakable, { onEnd: () => setTimeout(playMine, 250) })
  }

  /* -------- opnemen -------- */
  function onRecordingDone(blob) {
    if (!blob) {
      setStatus('idle')
      return
    }
    setRecUrl(URL.createObjectURL(blob))
    // Losse letter of geen Groq-sleutel: geen oordeel, wel terugluisteren.
    if (!usesVerdict || !canCheck) {
      setStatus('recorded')
      return
    }
    setStatus('busy')
    transcribeAudio(blob) // neutrale context — géén verwacht antwoord meegeven
      .then((text) => {
        setTranscript(text)
        const res = scoreTranscript(item, text)
        setResult(res)
        recordAttempt(key, res)
        setStatus('result')
      })
      .catch((e) => {
        setErrorMsg(errorKeyToText(e, t))
        setStatus('error')
      })
  }

  function toggleRecord() {
    if (recorder.recording) {
      recorder.stop()
      return
    }
    setTranscript('')
    setResult(null)
    setErrorMsg('')
    setExtra(null)
    setStatus('recording')
    recorder.start({ maxMs, onComplete: onRecordingDone })
  }

  /* -------- optionele Gemini-uitleg -------- */
  async function askExtra() {
    if (!hasGemini() || extraBusy) return
    setExtraBusy(true)
    try {
      const context = `Uitspraakoefening. De leerling oefende het Nederlandse "${speakable}". Geef in maximaal twee korte zinnen één extra uitspraaktip in eenvoudig Nederlands en daarna in Darija (Arabisch schrift). Geen cijfers, geen scores.`
      const r = await evaluateAnswer(transcript || speakable, target, context)
      setExtra({ nl: r.feedback_nl || '', dar: r.feedback_darija || '' })
    } catch {
      setExtra({ nl: t('errGeneric'), dar: '' })
    }
    setExtraBusy(false)
  }

  function next() {
    if (isLast) onFinish()
    else setI((n) => n + 1)
  }

  const ttsSilent = !canProbablySpeak()
  const remainingS = Math.max(0, Math.ceil((maxMs - recorder.elapsedMs) / 1000))
  const tip = item ? tipsFor(item) : {}

  if (!hasItems) {
    return <p className="p-6 text-center text-slate-500">{t('lessonEmpty')}</p>
  }

  const resultMeta = {
    good: { title: t('spkGoodTitle'), sub: t('spkGoodSub'), box: 'bg-emerald-50', head: 'text-emerald-800', icon: '✅' },
    almost: { title: t('spkAlmostTitle'), sub: t('spkAlmostSub'), box: 'bg-amber-50', head: 'text-amber-900', icon: '👂' },
    retry: { title: t('spkRetryTitle'), sub: t('spkRetrySub'), box: 'bg-rose-50', head: 'text-rose-700', icon: '🔁' },
  }

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      {/* Voortgang */}
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

      {/* 1+2 — Opdracht: NL + Darija */}
      <div className="card p-5 text-center">
        {mastered && (
          <p className="mb-1 text-xs font-bold text-emerald-600">{t('masteredBadge')}</p>
        )}
        {isLetter ? (
          <>
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
          </>
        ) : (
          <>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              🎙️ {t(labelKey)}
            </p>
            {typeof item.value === 'number' && (
              <span className="mt-1 block text-6xl font-black text-gent-600" dir="ltr">
                {item.value}
              </span>
            )}
            <p className="mt-2 text-3xl font-bold text-slate-900" dir="ltr">
              <Highlight text={speakable} mark={item.pronunciation?.highlight} />
              {item.pair && (
                <span className="text-xl font-normal text-slate-500">
                  {' ↔ '}
                  <Highlight text={item.pair} mark={item.pronunciation?.pairHighlight} />
                </span>
              )}
            </p>
            {tip.focus && (
              <p className="mt-1 text-xs font-semibold text-saffraan-700">
                👂 {t('watchThis')}: {tip.focus}
              </p>
            )}
            {item.ipa && <p className="text-sm text-slate-500" dir="ltr">{item.ipa}</p>}
          </>
        )}
        {(item.darija || item.darijaLat) && (
          <p className="mt-1 text-slate-500">
            {item.darija && <span className="rtl">{item.darija}</span>}
            {item.darija && item.darijaLat && ' · '}
            {item.darijaLat && <span className="italic">{item.darijaLat}</span>}
          </p>
        )}
        {(tip.tipNl || item.tip) && (
          <p className="mt-2 text-sm text-emerald-700">💡 {tip.tipNl || item.tip}</p>
        )}

        {/* 3+4 — Luisteren: normaal + langzaam */}
        {isTTSAvailable() && (
          <div className="mt-3 flex justify-center gap-2">
            <button onClick={() => listen()} className="btn-ghost">
              🔊 {t('listenExample')}
            </button>
            <button onClick={() => listen(0.5)} className="btn-ghost">
              🐢 {t('listenSlow')}
            </button>
          </div>
        )}
        {ttsSilent && <p className="mt-2 text-xs text-amber-700">⚠️ {t('ttsOffline')}</p>}
      </div>

      {/* Geen Groq-sleutel (en geen letter): luisteren/opnemen werkt, controle niet */}
      {usesVerdict && !canCheck && recorder.supported && (
        <div className="mt-4 rounded-xl bg-amber-50 p-4 text-sm text-amber-800">
          {t('spkCheckNeedsGroq')}{' '}
          <button onClick={onOpenSettings} className="font-semibold underline">
            {t('openSettingsLink')} (⚙️)
          </button>
        </div>
      )}
      {isLetter && (
        <p className="mt-4 text-center text-xs text-slate-500">{t('spkLetterHint')}</p>
      )}

      {/* 5 — Opnemen (met timer + auto-stop) */}
      <div className="mt-4">
        {recorder.supported ? (
          <button
            onClick={toggleRecord}
            disabled={status === 'busy'}
            className={`flex h-16 w-full items-center justify-center gap-3 rounded-2xl text-lg font-bold text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-saffraan-600 ${
              recorder.recording ? 'animate-pulse bg-rose-600' : 'bg-saffraan-600 hover:bg-saffraan-700'
            } disabled:opacity-50`}
          >
            {recorder.recording
              ? `⏹️ ${t('stopRecording')} · ${remainingS}s`
              : hasRecording
                ? `🎙️ ${t('recordAgain')}`
                : `🎙️ ${t('record')}`}
          </button>
        ) : (
          <p className="rounded-lg bg-slate-100 p-3 text-center text-sm text-slate-600">
            {t('micNotSupported')}
          </p>
        )}
        {recorder.error && <p className="mt-2 text-sm text-rose-600">{t(recorder.error)}</p>}
      </div>

      {/* 6+7 — Eigen opname terug + voorbeeld & opname na elkaar */}
      {hasRecording && (
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          <button onClick={playMine} className="btn-ghost">
            ▶️ {t('myRecording')}
          </button>
          {isTTSAvailable() && (
            <button onClick={playBoth} className="btn-ghost">
              🔁 {t('playExampleThenMe')}
            </button>
          )}
        </div>
      )}

      {/* 8 — wat Groq verstond, 9 — het oordeel van de app */}
      <div className="mt-4">
        {status === 'busy' && (
          <p className="text-center text-sm text-slate-500">⏳ {t('pleaseWait')}</p>
        )}

        {status === 'error' && errorMsg && (
          <div className="rounded-lg bg-rose-50 p-3 text-sm text-rose-700">
            <p>{errorMsg}</p>
            <button
              onClick={() => {
                setErrorMsg('')
                setStatus(hasRecording ? 'recorded' : 'idle')
              }}
              className="mt-2 font-semibold text-rose-800 underline"
            >
              ↻ {t('tryAgain')}
            </button>
          </div>
        )}

        {status === 'result' && result && (
          <>
            {/* 8 — transparant: gewenst vs. gehoord */}
            <div className="mb-3 grid gap-1.5 rounded-lg bg-slate-100 p-3 text-sm" dir="ltr">
              <p className="text-slate-600">
                {t('youWantedToSay')}: <span className="font-semibold">{speakable}</span>
              </p>
              <p className="text-slate-600">
                {t('appHeard')}:{' '}
                <span className="font-semibold">{transcript ? `“${transcript}”` : '—'}</span>
              </p>
            </div>

            {/* 9 — het oordeel van de app + vaste tip (NL + Darija) */}
            <div className={`rounded-xl p-4 ${resultMeta[result].box}`}>
              <p className={`font-bold ${resultMeta[result].head}`}>
                {resultMeta[result].icon} {resultMeta[result].title}
              </p>
              <p className="mt-1 text-sm text-slate-700">{resultMeta[result].sub}</p>
              {result !== 'good' && tip.tipNl && (
                <p className="mt-2 text-sm text-slate-700">💡 {tip.tipNl}</p>
              )}
              {result !== 'good' && tip.tipDarija && (
                <p className="rtl mt-1 text-sm text-slate-600">{tip.tipDarija}</p>
              )}

              {/* Optionele extra uitleg via Gemini */}
              {hasGemini() && (
                <div className="mt-3 border-t border-black/5 pt-2">
                  {!extra && (
                    <button
                      onClick={askExtra}
                      disabled={extraBusy}
                      className="text-sm font-semibold text-gent-700 underline disabled:opacity-50"
                    >
                      {extraBusy ? `⏳ ${t('pleaseWait')}` : `💬 ${t('extraExplain')}`}
                    </button>
                  )}
                  {extra && (
                    <div className="text-sm">
                      {extra.nl && <p className="text-slate-700">{extra.nl}</p>}
                      {extra.dar && <p className="rtl mt-1 text-slate-600">{extra.dar}</p>}
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* 10 — verder (opnieuw = de opnameknop hierboven) */}
      <div className="mt-auto flex gap-2 py-4">
        <button onClick={next} className="btn-ghost flex-1 h-12">
          {t('skip')}
        </button>
        <button onClick={next} className="btn-primary flex-1 h-12">
          {isLast ? `${t('finishArrow')} ${arrowFwd}` : `${t('next')} ${arrowFwd}`}
        </button>
      </div>
    </div>
  )
}

/**
 * Toont een woord met de doelklank(en) in een accentkleur, zodat de leerling
 * ziet waar ze op moet letten (bv. de korte «a» in m[a]n).
 */
function Highlight({ text, mark }) {
  const s = String(text ?? '')
  const m = String(mark ?? '')
  if (!m) return s
  const lower = s.toLowerCase()
  const ml = m.toLowerCase()
  const parts = []
  let from = 0
  let idx
  while ((idx = lower.indexOf(ml, from)) !== -1) {
    if (idx > from) parts.push(s.slice(from, idx))
    parts.push(
      <span key={idx} className="font-black text-saffraan-600 underline decoration-2 underline-offset-4">
        {s.slice(idx, idx + ml.length)}
      </span>,
    )
    from = idx + ml.length
  }
  if (from < s.length) parts.push(s.slice(from))
  return <>{parts}</>
}

function errorKeyToText(e, t) {
  const msg = String(e?.message || e)
  const status = e?.status
  if (msg.includes('GEEN_GROQ_SLEUTEL')) return t('errNoGroq')
  if (msg.includes('GEEN_GEMINI_SLEUTEL')) return t('errNoGemini')
  if (status === 'timeout') return t('errTimeout')
  if (status === 'network') return t('errGeneric')
  if (status === 404 || /not found|is not supported|not supported for/i.test(msg))
    return t('errModelUnavailable')
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
