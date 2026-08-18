import { useState } from 'react'
import { coachApi, apiErrorMessage } from '../lib/api.js'
import { useLang } from '../context/LanguageContext.jsx'

function BilingualBlock({ title, value, isDarija }) {
  if (!value?.nl && !value?.darijaLat) return null
  const first = isDarija ? value.darijaLat : value.nl
  const second = isDarija ? value.nl : value.darijaLat
  return (
    <div>
      <h4 className="text-xs font-black uppercase tracking-wide text-slate-500">{title}</h4>
      <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-800" dir="ltr">{first}</p>
      <p className="mt-1 text-sm leading-relaxed text-slate-600" dir="ltr">{second}</p>
    </div>
  )
}

export default function AiCoach({ lesson, itemIndex, mode = 'WORD', transcript = '' }) {
  const { t, isDarija, lang } = useLang()
  const [status, setStatus] = useState('idle')
  const [payload, setPayload] = useState(null)
  const [error, setError] = useState('')
  const [reported, setReported] = useState(false)
  const pronunciation = mode === 'PRONUNCIATION'

  async function load() {
    if (payload) {
      setStatus((value) => value === 'open' ? 'ready' : 'open')
      return
    }
    setStatus('loading')
    setError('')
    try {
      const response = await coachApi.explain({
        lessonId: lesson.id,
        itemIndex,
        mode,
        ...(pronunciation ? { transcript } : {}),
      })
      setPayload(response)
      setStatus('open')
    } catch (requestError) {
      setError(apiErrorMessage(requestError, lang))
      setStatus('error')
    }
  }

  async function report() {
    if (!payload?.responseId || reported) return
    try {
      await coachApi.report(payload.responseId)
      setReported(true)
    } catch (requestError) {
      setError(apiErrorMessage(requestError, lang))
    }
  }

  const coach = payload?.coach
  const buttonTone = pronunciation ? 'btn-speak' : 'btn-primary'

  return (
    <section className="mt-4">
      <button onClick={load} disabled={status === 'loading'} className={`${buttonTone} min-h-11 w-full`}>
        {status === 'loading' ? `⏳ ${t('aiLoading')}` : pronunciation ? `✨ ${t('aiPronunciationHelp')}` : `✨ ${t('aiMoreExplain')}`}
      </button>
      {error && <p role="alert" className="mt-2 rounded-xl bg-rose-50 p-3 text-sm text-rose-800">{error}</p>}
      {status === 'open' && coach && (
        <div className={`mt-3 space-y-4 rounded-2xl border p-4 shadow-sm ${pronunciation ? 'border-violet-200 bg-violet-50/70' : 'border-gent-200 bg-gent-50/70'}`}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-black text-slate-900">✨ {t('aiCoachTitle')}</h3>
              <p className="mt-0.5 text-xs text-slate-500">{payload.source === 'ai' ? t('aiGenerated') : t('aiFallback')}</p>
            </div>
            <button onClick={() => setStatus('ready')} className="min-h-11 min-w-11 rounded-xl text-slate-500 hover:bg-white" aria-label={t('close')}>✕</button>
          </div>
          <BilingualBlock title={t('aiMeaning')} value={coach.meaning} isDarija={isDarija} />
          <BilingualBlock title={t('aiWhenUsed')} value={coach.usage} isDarija={isDarija} />
          <div>
            <h4 className="text-xs font-black uppercase tracking-wide text-slate-500">{t('aiExamples')}</h4>
            <ol className="mt-1 space-y-2">
              {coach.examples?.map((example, index) => (
                <li key={`${example.nl}-${index}`} className="rounded-xl bg-white/80 p-3 text-sm ring-1 ring-slate-200/70">
                  <p className="font-semibold text-slate-800" dir="ltr">{isDarija ? example.darijaLat : example.nl}</p>
                  <p className="mt-1 text-slate-600" dir="ltr">{isDarija ? example.nl : example.darijaLat}</p>
                </li>
              ))}
            </ol>
          </div>
          <BilingualBlock title={t('aiCommonMistake')} value={coach.commonMistake} isDarija={isDarija} />
          <BilingualBlock title={t('aiMemoryTip')} value={coach.memoryTip} isDarija={isDarija} />
          <BilingualBlock title={t('aiPronunciationTip')} value={coach.pronunciationTip} isDarija={isDarija} />
          {pronunciation && <p className="rounded-xl bg-white/80 p-3 text-xs leading-relaxed text-slate-600">ℹ️ {t('aiGeneralTip')}</p>}
          {payload.responseId && (
            <button onClick={report} disabled={reported} className="min-h-11 w-full rounded-xl text-xs font-bold text-slate-600 hover:bg-white disabled:text-emerald-700">
              {reported ? `✓ ${t('aiReported')}` : `⚑ ${t('aiReport')}`}
            </button>
          )}
        </div>
      )}
    </section>
  )
}
