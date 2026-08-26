import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLang } from '../context/LanguageContext.jsx'
import { REFERENCE_AUDIO_CATEGORIES } from '../data/referenceAudio.js'
import { useRecorder } from '../hooks/useRecorder.js'
import { adminApi, apiErrorMessage } from '../lib/api.js'
import { uiCopy } from '../lib/uiCopy.js'

function formatDuration(durationMs) {
  return `${(Math.max(0, Number(durationMs) || 0) / 1000).toFixed(1)} s`
}

function audioFilename(prompt, mime) {
  const extension = mime.includes('ogg')
    ? 'ogg'
    : mime.includes('mp4') || mime.includes('m4a')
      ? 'm4a'
      : mime.includes('mpeg')
        ? 'mp3'
        : 'webm'
  return `${prompt.id}.${extension}`
}

export default function ReferenceAudioRecorder({ onDraftStateChange }) {
  const { lang, isDarija } = useLang()
  const c = (key) => uiCopy(lang, key)
  const recorder = useRecorder()
  const draftUrlRef = useRef('')
  const listenedSecondsRef = useRef(0)
  const lastPlaybackPositionRef = useRef(0)
  const [prompts, setPrompts] = useState([])
  const [orphanedAudio, setOrphanedAudio] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [category, setCategory] = useState(REFERENCE_AUDIO_CATEGORIES[0].id)
  const [selectedId, setSelectedId] = useState('')
  const [draft, setDraft] = useState(null)
  const [hasListened, setHasListened] = useState(false)
  const [consentConfirmed, setConsentConfirmed] = useState(false)
  const [uploading, setUploading] = useState(false)

  const clearDraft = useCallback(() => {
    if (draftUrlRef.current) URL.revokeObjectURL(draftUrlRef.current)
    draftUrlRef.current = ''
    listenedSecondsRef.current = 0
    lastPlaybackPositionRef.current = 0
    setDraft(null)
    setHasListened(false)
    setConsentConfirmed(false)
  }, [])

  const load = useCallback(async () => {
    setStatus('loading')
    setError('')
    try {
      const data = await adminApi.referenceAudio()
      const nextPrompts = data.prompts || []
      setPrompts(nextPrompts)
      setOrphanedAudio(data.orphanedAudio || [])
      setSelectedId((current) => current
        || nextPrompts.find((prompt) => prompt.category === REFERENCE_AUDIO_CATEGORIES[0].id && !prompt.recorded)?.id
        || nextPrompts.find((prompt) => prompt.category === REFERENCE_AUDIO_CATEGORIES[0].id)?.id
        || '')
      setStatus('ready')
    } catch (requestError) {
      setError(apiErrorMessage(requestError, lang))
      setStatus('error')
    }
  }, [lang])

  useEffect(() => {
    load()
  }, [load])

  useEffect(() => () => {
    if (draftUrlRef.current) URL.revokeObjectURL(draftUrlRef.current)
  }, [])

  useEffect(() => {
    onDraftStateChange?.(Boolean(draft) || recorder.starting || recorder.recording)
    return () => onDraftStateChange?.(false)
  }, [draft, onDraftStateChange, recorder.recording, recorder.starting])

  useEffect(() => {
    if (!draft && !recorder.starting && !recorder.recording) return undefined
    const warnBeforeUnload = (event) => {
      event.preventDefault()
      event.returnValue = ''
    }
    window.addEventListener('beforeunload', warnBeforeUnload)
    return () => window.removeEventListener('beforeunload', warnBeforeUnload)
  }, [draft, recorder.recording, recorder.starting])

  const categoryPrompts = useMemo(
    () => prompts.filter((prompt) => prompt.category === category).sort((a, b) => a.order - b.order),
    [category, prompts],
  )
  const selected = prompts.find((prompt) => prompt.id === selectedId) || categoryPrompts[0] || null
  const selectedIndex = categoryPrompts.findIndex((prompt) => prompt.id === selected?.id)
  const recordedCount = prompts.filter((prompt) => prompt.recorded).length
  const missingCount = prompts.length - recordedCount
  const percent = prompts.length ? Math.round((recordedCount / prompts.length) * 100) : 0
  const locked = recorder.starting || recorder.recording || uploading
  const navigationLocked = locked || Boolean(draft)

  function chooseCategory(nextCategory) {
    if (navigationLocked) return
    clearDraft()
    setNotice('')
    setError('')
    setCategory(nextCategory)
    const next = prompts.find((prompt) => prompt.category === nextCategory && !prompt.recorded)
      || prompts.find((prompt) => prompt.category === nextCategory)
    setSelectedId(next?.id || '')
  }

  function choosePrompt(promptId) {
    if (navigationLocked || promptId === selectedId) return
    clearDraft()
    setNotice('')
    setError('')
    setSelectedId(promptId)
  }

  async function startRecording() {
    if (!selected) return
    clearDraft()
    setError('')
    setNotice('')
    recorder.reset()
    await recorder.start({
      maxMs: selected.maxDurationMs,
      onComplete: (blob, durationMs) => {
        if (!blob || blob.size < 300 || durationMs < 300) {
          setError(c('audioTooShort'))
          return
        }
        const url = URL.createObjectURL(blob)
        draftUrlRef.current = url
        listenedSecondsRef.current = 0
        lastPlaybackPositionRef.current = 0
        setDraft({ blob, durationMs, url })
        setHasListened(false)
      },
    })
  }

  async function saveRecording() {
    if (!draft || !selected) return
    if (!hasListened) {
      setError(c('audioMustListen'))
      return
    }
    setUploading(true)
    setError('')
    setNotice('')
    const form = new FormData()
    form.append('promptId', selected.id)
    form.append('durationMs', String(draft.durationMs))
    form.append('consentConfirmed', consentConfirmed ? 'yes' : 'no')
    form.append('audio', draft.blob, audioFilename(selected, draft.blob.type || 'audio/webm'))
    try {
      const saved = await adminApi.uploadReferenceAudio(form)
      setPrompts((items) => items.map((prompt) => prompt.id === selected.id
        ? {
            ...prompt,
            ...saved,
            recorded: true,
            hasStoredAudio: true,
            needsRerecording: false,
            durationMs: draft.durationMs,
            sizeBytes: draft.blob.size,
          }
        : prompt))
      clearDraft()
      setNotice(c('savedAndLinked'))
    } catch (requestError) {
      setError(apiErrorMessage(requestError, lang))
    } finally {
      setUploading(false)
    }
  }

  async function removeRecording() {
    if (!selected?.hasStoredAudio || !window.confirm(c('deleteRecordingConfirm'))) return
    setUploading(true)
    setError('')
    setNotice('')
    try {
      await adminApi.deleteReferenceAudio(selected.id)
      setPrompts((items) => items.map((prompt) => prompt.id === selected.id
        ? {
            ...prompt,
            recorded: false,
            hasStoredAudio: false,
            needsRerecording: false,
            audioUrl: null,
            durationMs: null,
            sizeBytes: null,
            version: 0,
          }
        : prompt))
      setNotice(c('recordingDeleted'))
    } catch (requestError) {
      setError(apiErrorMessage(requestError, lang))
    } finally {
      setUploading(false)
    }
  }

  async function removeOrphan(promptId) {
    if (!window.confirm(c('deleteRecordingConfirm'))) return
    setUploading(true)
    setError('')
    try {
      await adminApi.deleteReferenceAudio(promptId)
      setOrphanedAudio((items) => items.filter((item) => item.promptId !== promptId))
      setNotice(c('recordingDeleted'))
    } catch (requestError) {
      setError(apiErrorMessage(requestError, lang))
    } finally {
      setUploading(false)
    }
  }

  function move(offset) {
    const next = categoryPrompts[selectedIndex + offset]
    if (next) choosePrompt(next.id)
  }

  function goToNextMissing() {
    const currentPosition = prompts.findIndex((prompt) => prompt.id === selected?.id)
    const ordered = [...prompts.slice(currentPosition + 1), ...prompts.slice(0, currentPosition + 1)]
    const next = ordered.find((prompt) => !prompt.recorded)
    if (!next) return
    clearDraft()
    setNotice('')
    setCategory(next.category)
    setSelectedId(next.id)
  }

  function trackDraftPlayback(event) {
    const position = Number(event.currentTarget.currentTime || 0)
    const delta = position - lastPlaybackPositionRef.current
    if (delta > 0 && delta < 1.5) listenedSecondsRef.current += delta
    lastPlaybackPositionRef.current = position
  }

  function finishDraftPlayback(event) {
    trackDraftPlayback(event)
    const duration = Number(event.currentTarget.duration || draft?.durationMs / 1000 || 0)
    if (duration > 0 && listenedSecondsRef.current >= Math.max(0.3, duration * 0.85)) {
      setHasListened(true)
      setError('')
    } else {
      setHasListened(false)
      setError(c('audioMustListen'))
    }
  }

  const recorderError = recorder.error ? c(recorder.error) : ''

  if (status === 'loading' && !prompts.length) {
    return <p className="py-12 text-center text-sm font-semibold text-slate-500">{c('loading')}</p>
  }

  if (status === 'error' && !prompts.length) {
    return (
      <div className="card p-6 text-center">
        <p role="alert" className="text-sm text-rose-800">{error}</p>
        <button type="button" onClick={load} className="btn-primary mt-4 min-h-11 w-full">{c('retry')}</button>
      </div>
    )
  }

  return (
    <section className="space-y-4">
      <div className="card overflow-hidden">
        <div className="bg-gradient-to-br from-indigo-700 via-violet-700 to-fuchsia-700 p-5 text-white">
          <p className="text-3xl" aria-hidden="true">🎙️</p>
          <h2 className="mt-2 text-xl font-black">{c('referenceAudioTitle')}</h2>
          <p className="mt-2 text-sm leading-relaxed text-indigo-100">{c('referenceAudioIntro')}</p>
        </div>
        <div className="p-5">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{c('recordingProgress')}</p>
              <p className="mt-1 text-2xl font-black text-slate-900">{recordedCount}/{prompts.length}</p>
            </div>
            <p className="text-right text-sm font-bold text-slate-600">{recordedCount} {c('referenceAudioRecorded')}<br />{missingCount} {c('referenceAudioMissing')}</p>
          </div>
          <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-100" role="progressbar" aria-label={c('recordingProgress')} aria-valuemin="0" aria-valuemax="100" aria-valuenow={percent} aria-valuetext={`${recordedCount} ${c('referenceAudioRecorded')}, ${missingCount} ${c('referenceAudioMissing')}`}>
            <div className="h-full rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 transition-all" style={{ width: `${percent}%` }} />
          </div>
          {missingCount === 0 ? <p className="mt-3 rounded-xl bg-emerald-50 p-3 text-sm font-bold text-emerald-800">✓ {c('allRecorded')}</p> : null}
        </div>
      </div>

      <div className="card p-4">
        <h3 className="font-black text-slate-900">{c('recordingGuideTitle')}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{c('recordingGuide')}</p>
        <p className="mt-2 text-xs font-semibold text-violet-700">{c('preferDarijaSpeaker')}</p>
      </div>

      {orphanedAudio.length ? (
        <div className="card border border-amber-200 p-4">
          <h3 className="font-black text-amber-950">{c('orphanedAudioTitle')}</h3>
          <p className="mt-1 text-sm text-amber-900">{c('orphanedAudioIntro')}</p>
          <div className="mt-3 space-y-2">
            {orphanedAudio.map((item) => (
              <div key={item.promptId} className="flex items-center gap-2 rounded-xl bg-amber-50 p-3">
                <code className="min-w-0 flex-1 truncate text-xs">{item.promptId}</code>
                <button type="button" onClick={() => removeOrphan(item.promptId)} disabled={uploading} className="rounded-lg bg-rose-100 px-3 py-2 text-xs font-bold text-rose-800">{c('deleteRecording')}</button>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div className="card p-4">
        <label className="block text-sm font-bold text-slate-700" htmlFor="reference-audio-category">{c('referenceAudioCategory')}</label>
        <select
          id="reference-audio-category"
          value={category}
          onChange={(event) => chooseCategory(event.target.value)}
          disabled={navigationLocked}
          className="mt-2 min-h-12 w-full rounded-xl border-2 border-slate-200 bg-white px-3 focus:border-violet-500 focus:outline-none"
        >
          {REFERENCE_AUDIO_CATEGORIES.map((item) => {
            const categoryItems = prompts.filter((prompt) => prompt.category === item.id)
            const done = categoryItems.filter((prompt) => prompt.recorded).length
            return <option key={item.id} value={item.id}>{isDarija ? item.titleDarijaLat : item.titleNl} · {done}/{categoryItems.length}</option>
          })}
        </select>

        <div className="mt-3 flex gap-2 overflow-x-auto pb-1" aria-label={c('referenceAudioCategory')}>
          {categoryPrompts.map((prompt, index) => (
            <button
              key={prompt.id}
              type="button"
              onClick={() => choosePrompt(prompt.id)}
              disabled={navigationLocked}
              aria-pressed={prompt.id === selected?.id}
              aria-label={`${index + 1}. ${prompt.label}. ${prompt.recorded ? c('referenceAudioComplete') : c('referenceAudioMissing')}`}
              className={`min-h-11 min-w-11 shrink-0 rounded-xl border-2 px-3 text-sm font-black ${prompt.id === selected?.id ? 'border-violet-600 bg-violet-600 text-white' : prompt.recorded ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-slate-200 bg-white text-slate-600'}`}
            >
              {prompt.recorded ? '✓ ' : ''}{index + 1}
            </button>
          ))}
        </div>
      </div>

      {selected ? (
        <article className="card overflow-hidden">
          <div className="border-b border-slate-100 bg-amber-50 p-5 text-center">
            <p className="text-xs font-black uppercase tracking-wide text-amber-800">{c('promptToRecord')} · {selectedIndex + 1}/{categoryPrompts.length}</p>
            <p className="mt-3 text-3xl font-black text-slate-950" dir="ltr">{selected.text}</p>
            {selected.translationNl ? <p className="mt-2 text-sm text-slate-600" dir="ltr">{selected.translationNl}</p> : null}
            <p className="mt-3 text-sm font-semibold text-violet-800" dir="ltr">{isDarija ? selected.instructionDarijaLat : selected.instructionNl}</p>
          </div>

          <div className="space-y-4 p-5">
            {selected.recorded ? (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                <p className="text-sm font-black text-emerald-900">✓ {c('existingRecording')}</p>
                <audio
                  key={`${selected.id}-${selected.version}`}
                  className="mt-3 w-full"
                  controls
                  preload="none"
                  src={`${selected.audioUrl}?v=${selected.version}`}
                  aria-label={`${c('existingRecording')}: ${selected.text}`}
                  onError={() => setError(c('audioPlaybackError'))}
                />
                <p className="mt-2 text-xs text-emerald-800">{formatDuration(selected.durationMs)} · v{selected.version}</p>
              </div>
            ) : null}
            {selected.needsRerecording ? <p className="rounded-xl bg-amber-50 p-3 text-sm font-semibold text-amber-900">{c('recordingOutdated')}</p> : null}

            {(error || recorderError) ? <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm font-semibold text-rose-800">{recorderError || error}</p> : null}
            {notice ? <p role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm font-semibold text-emerald-800">✓ {notice}</p> : null}
            <p className="sr-only" aria-live="polite">{recorder.recording ? c('recordingStarted') : draft ? c('recordingReady') : ''}</p>

            {!recorder.supported ? (
              <p className="rounded-xl bg-amber-50 p-3 text-sm text-amber-900">{c('micNotSupported')}</p>
            ) : recorder.recording ? (
              <button type="button" onClick={recorder.stop} className="min-h-14 w-full rounded-2xl bg-rose-600 px-4 text-lg font-black text-white">
                ■ {c('stopRecording')} · {formatDuration(recorder.elapsedMs)}
              </button>
            ) : (
              <button type="button" onClick={startRecording} disabled={navigationLocked} className="min-h-14 w-full rounded-2xl bg-violet-700 px-4 text-lg font-black text-white disabled:opacity-60">
                🎙️ {recorder.starting ? c('loading') : selected.recorded ? c('replaceRecording') : c('startRecording')}
              </button>
            )}

            {draft ? (
              <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50 p-4">
                <p className="text-sm font-black text-indigo-950">{c('listenBeforeSave')} · {formatDuration(draft.durationMs)}</p>
                <audio
                  className="mt-3 w-full"
                  controls
                  preload="metadata"
                  src={draft.url}
                  aria-label={`${c('listenBeforeSave')}: ${selected.text}`}
                  onPlay={(event) => {
                    setError('')
                    if (event.currentTarget.currentTime < 0.1) {
                      listenedSecondsRef.current = 0
                      lastPlaybackPositionRef.current = 0
                    }
                  }}
                  onSeeking={(event) => { lastPlaybackPositionRef.current = event.currentTarget.currentTime }}
                  onTimeUpdate={trackDraftPlayback}
                  onEnded={finishDraftPlayback}
                  onError={() => setError(c('audioPlaybackError'))}
                />
                <label className="mt-4 flex items-start gap-3 rounded-xl bg-white p-3 text-sm text-slate-700">
                  <input type="checkbox" checked={consentConfirmed} onChange={(event) => setConsentConfirmed(event.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-violet-700" />
                  <span>{c('recordingConsent')}</span>
                </label>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  <button type="button" onClick={clearDraft} disabled={uploading} className="btn-ghost min-h-12">{c('discardRecording')}</button>
                  <button type="button" onClick={saveRecording} disabled={uploading || !hasListened || !consentConfirmed} className="btn-primary min-h-12">
                    {uploading ? c('uploading') : `✓ ${c('approveAndSave')}`}
                  </button>
                </div>
                {!hasListened ? <p className="mt-2 text-center text-xs font-semibold text-indigo-800">{c('audioMustListen')}</p> : null}
              </div>
            ) : null}

            {selected.hasStoredAudio ? (
              <button type="button" onClick={removeRecording} disabled={navigationLocked} className="min-h-11 w-full rounded-xl border border-rose-200 bg-rose-50 px-4 text-sm font-bold text-rose-800 disabled:opacity-60">
                {c('deleteRecording')}
              </button>
            ) : null}

            <div className="grid grid-cols-2 gap-2">
              <button type="button" onClick={() => move(-1)} disabled={selectedIndex <= 0 || navigationLocked} className="btn-ghost min-h-11">← {c('previousPrompt')}</button>
              <button type="button" onClick={() => move(1)} disabled={selectedIndex >= categoryPrompts.length - 1 || navigationLocked} className="btn-ghost min-h-11">{c('nextPrompt')} →</button>
            </div>
            {missingCount > 0 ? <button type="button" onClick={goToNextMissing} disabled={navigationLocked} className="btn-ghost min-h-11 w-full">{c('nextMissing')} →</button> : null}
          </div>
        </article>
      ) : null}
    </section>
  )
}
