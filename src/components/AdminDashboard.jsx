import { useEffect, useMemo, useState } from 'react'
import curriculum from '../data/curriculum.js'
import { useAuth } from '../context/AuthContext.jsx'
import { useLang } from '../context/LanguageContext.jsx'
import { adminApi, apiErrorMessage } from '../lib/api.js'
import { uiCopy } from '../lib/uiCopy.js'
import LangToggle from './LangToggle.jsx'

const FILTERS = ['ALL', 'PENDING', 'ACTIVE', 'REJECTED', 'SUSPENDED']

function listFrom(data, key) {
  if (Array.isArray(data)) return data
  return data?.[key] || data?.items || []
}

function fmtDate(value, withTime = false) {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '—'
  return withTime ? date.toLocaleString() : date.toLocaleDateString()
}

function minutes(value) {
  const count = Math.max(0, Math.round(Number(value) || 0))
  if (count < 60) return `${count} min`
  const hours = Math.floor(count / 60)
  const rest = count % 60
  return rest ? `${hours} u ${rest} min` : `${hours} u`
}

function statusOf(user) {
  return String(user.status || 'PENDING').toUpperCase()
}

function StatusPill({ status, c }) {
  const style = {
    PENDING: 'bg-amber-100 text-amber-800',
    ACTIVE: 'bg-emerald-100 text-emerald-800',
    REJECTED: 'bg-slate-200 text-slate-700',
    SUSPENDED: 'bg-rose-100 text-rose-800',
  }[status] || 'bg-slate-100 text-slate-700'
  const key = { PENDING: 'pending', ACTIVE: 'active', REJECTED: 'rejected', SUSPENDED: 'suspended' }[status]
  return <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${style}`}>{c(key || 'all')}</span>
}

function ConfirmDialog({ action, onCancel, onConfirm, busy, c }) {
  if (!action) return null
  return (
    <div className="fixed inset-0 z-[70] grid place-items-center bg-slate-950/60 p-4 backdrop-blur-sm" role="alertdialog" aria-modal="true" dir="ltr">
      <section className="w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-2xl">
        <span className="text-4xl" aria-hidden="true">?</span>
        <h2 className="mt-4 text-xl font-black text-slate-900">{c('confirmAction')}</h2>
        <p className="mt-2 text-sm text-slate-600">{action.label} · @{action.user?.username}</p>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button onClick={onCancel} disabled={busy} className="btn-ghost h-12">{c('cancel')}</button>
          <button onClick={onConfirm} disabled={busy} className="btn-primary h-12">{busy ? c('loading') : action.label}</button>
        </div>
      </section>
    </div>
  )
}

function ResetCodeDialog({ reset, onClose, c }) {
  const [copied, setCopied] = useState(false)
  if (!reset) return null
  async function copy() {
    await navigator.clipboard?.writeText(reset.resetCode || reset.code)
    setCopied(true)
  }
  return (
    <div className="fixed inset-0 z-[70] grid place-items-center bg-slate-950/60 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" dir="ltr">
      <section className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-gent-700">@{reset.username}</p>
            <h2 className="mt-1 text-xl font-black text-slate-900">{c('resetCode')}</h2>
          </div>
          <button onClick={onClose} className="btn-ghost h-11 w-11 !px-0" aria-label={c('close')}>✕</button>
        </div>
        <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm leading-relaxed text-amber-900">{c('resetWarning')}</p>
        <code className="mt-4 block select-all rounded-2xl bg-slate-950 p-5 text-center text-2xl font-black tracking-[0.18em] text-white" dir="ltr">{reset.resetCode || reset.code}</code>
        {reset.expiresAt && <p className="mt-3 text-center text-xs text-slate-500">{c('expires')}: {fmtDate(reset.expiresAt, true)}</p>}
        <button onClick={copy} className="btn-primary mt-5 h-12 w-full">{copied ? `✓ ${c('copied')}` : c('copyCode')}</button>
      </section>
    </div>
  )
}

function UserCard({ user, c, onAction, onReset }) {
  const [expanded, setExpanded] = useState(false)
  const status = statusOf(user)
  const activity = user.activity || user.activitySummary || {}
  const today = (user.activeSecondsToday ?? activity.todaySeconds ?? 0) / 60
  const week = (user.activeSeconds7Days ?? activity.sevenDaySeconds ?? 0) / 60
  const month = (user.activeSeconds30Days ?? activity.thirtyDaySeconds ?? 0) / 60
  const total = (user.activeSeconds ?? activity.totalSeconds ?? 0) / 60
  return (
    <article className="card overflow-hidden">
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gent-100 font-black text-gent-700">{(user.displayName || user.username || '?').slice(0, 1).toUpperCase()}</div>
          <div className="min-w-0 flex-1">
            <h3 className="truncate font-black text-slate-900">{user.displayName || user.username}</h3>
            <p className="truncate text-sm text-slate-500">@{user.username} · <span className={user.online ? 'font-bold text-emerald-600' : ''}>{c(user.online ? 'online' : 'offline')}</span></p>
          </div>
          <StatusPill status={status} c={c} />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 rounded-2xl bg-slate-50 p-3 text-center sm:grid-cols-4">
          <div><p className="text-xs text-slate-500">{c('todayMinutes')}</p><p className="mt-1 text-sm font-black text-slate-800">{minutes(today)}</p></div>
          <div><p className="text-xs text-slate-500">{c('weekMinutes')}</p><p className="mt-1 text-sm font-black text-slate-800">{minutes(week)}</p></div>
          <div><p className="text-xs text-slate-500">{c('monthMinutes')}</p><p className="mt-1 text-sm font-black text-slate-800">{minutes(month)}</p></div>
          <div><p className="text-xs text-slate-500">{c('totalMinutes')}</p><p className="mt-1 text-sm font-black text-slate-800">{minutes(total)}</p></div>
        </div>
        <p className="mt-2 text-center text-[11px] text-slate-400">{c('estimatedTime')}</p>

        <dl className="mt-4 grid grid-cols-2 gap-3 text-xs">
          <div><dt className="text-slate-400">{c('registered')}</dt><dd className="mt-0.5 font-semibold text-slate-700">{fmtDate(user.createdAt || user.registeredAt)}</dd></div>
          <div><dt className="text-slate-400">{c('lastActive')}</dt><dd className="mt-0.5 font-semibold text-slate-700">{fmtDate(user.lastActiveAt, true)}</dd></div>
        </dl>
        <p className="mt-3 text-xs font-semibold text-slate-500">{user.openAssignments || 0} {c('openAssignments')}</p>
        <button onClick={() => setExpanded((value) => !value)} className="mt-3 min-h-11 w-full rounded-xl bg-slate-100 px-3 text-sm font-bold text-slate-700">
          {c(expanded ? 'hideDetails' : 'showDetails')}
        </button>
        {expanded && (
          <section className="mt-3 rounded-2xl border border-slate-200 p-3">
            <h4 className="text-xs font-black uppercase tracking-wide text-slate-500">{c('recentAttempts')}</h4>
            {!user.recentAttempts?.length ? (
              <p className="mt-2 text-xs text-slate-500">{c('noAttempts')}</p>
            ) : (
              <div className="mt-2 divide-y divide-slate-100">
                {user.recentAttempts.slice(0, 8).map((attempt) => (
                  <div key={attempt.eventId || `${attempt.lessonId}-${attempt.createdAt}`} className="flex items-center gap-2 py-2 text-xs">
                    <span className="min-w-0 flex-1 truncate font-semibold text-slate-700">{attempt.lessonId || '—'} · {attempt.type}</span>
                    <span className={['CORRECT', 'COMPLETED'].includes(attempt.result) ? 'font-bold text-emerald-600' : 'font-bold text-slate-500'}>{attempt.result}</span>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </div>

      <div className="flex flex-wrap gap-2 border-t border-slate-100 bg-slate-50/70 p-3">
        {status === 'PENDING' && <><button onClick={() => onAction(user, 'approve', c('approve'))} className="btn-primary min-h-11 flex-1">✓ {c('approve')}</button><button onClick={() => onAction(user, 'reject', c('reject'))} className="btn-ghost min-h-11 flex-1 text-rose-700">{c('reject')}</button></>}
        {status === 'ACTIVE' && <button onClick={() => onAction(user, 'suspend', c('block'))} className="btn-ghost min-h-11 flex-1 text-rose-700">{c('block')}</button>}
        {['SUSPENDED', 'REJECTED'].includes(status) && <button onClick={() => onAction(user, 'activate', c('unblock'))} className="btn-primary min-h-11 flex-1">{c('unblock')}</button>}
        <button onClick={() => onReset(user)} className="btn-ghost min-h-11 flex-1">🔑 {c('resetPassword')}</button>
      </div>
    </article>
  )
}

function AssignmentManager({ users, c, lang }) {
  const [assignments, setAssignments] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [busy, setBusy] = useState(false)
  const [form, setForm] = useState({ userId: '', titleNl: '', titleDarija: '', instructionsNl: '', instructionsDarija: '', lessonId: '', kind: 'EXTRA', dueAt: '' })
  const lessons = useMemo(() => curriculum.levels.flatMap((level) => level.modules.flatMap((module) => module.lessons.map((lesson) => ({ ...lesson, moduleTitle: module.title })))), [])

  async function load() {
    setStatus('loading')
    setError('')
    try {
      setAssignments(listFrom(await adminApi.assignments(), 'assignments'))
      setStatus('ready')
    } catch (requestError) {
      setError(apiErrorMessage(requestError, lang))
      setStatus('error')
    }
  }
  useEffect(() => { load() }, []) // eslint-disable-line react-hooks/exhaustive-deps

  async function submit(event) {
    event.preventDefault()
    setNotice('')
    if (!form.userId || !form.titleNl.trim() || !form.titleDarija.trim() || !form.lessonId) { setError(c('required')); return }
    setBusy(true)
    try {
      await adminApi.createAssignment({
        userId: form.userId,
        kind: form.kind,
        targetType: 'LESSON',
        targetId: form.lessonId,
        title: { nl: form.titleNl.trim(), darija: form.titleDarija.trim() },
        instructions: { nl: form.instructionsNl.trim(), darija: form.instructionsDarija.trim() },
        successCriteria: {},
        dueAt: form.dueAt ? new Date(form.dueAt).toISOString() : undefined,
      })
      setForm({ userId: '', titleNl: '', titleDarija: '', instructionsNl: '', instructionsDarija: '', lessonId: '', kind: 'EXTRA', dueAt: '' })
      setNotice(c('assignmentCreated'))
      await load()
    } catch (requestError) { setError(apiErrorMessage(requestError, lang)) } finally { setBusy(false) }
  }

  async function update(id, nextStatus) {
    setBusy(true)
    try { await adminApi.updateAssignment(id, { status: nextStatus }); await load() }
    catch (requestError) { setError(apiErrorMessage(requestError, lang)) }
    finally { setBusy(false) }
  }

  return (
    <div className="space-y-5">
      <form onSubmit={submit} className="card space-y-4 p-5">
        <h2 className="text-lg font-black text-slate-900">{c('createAssignment')}</h2>
        {error && <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">{error}</div>}
        {notice && <div role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">{notice}</div>}
        <label className="block"><span className="mb-1 block text-sm font-semibold">{c('selectUser')}</span><select value={form.userId} onChange={(e) => setForm((f) => ({ ...f, userId: e.target.value }))} className="h-12 w-full rounded-xl border-2 border-slate-200 bg-white px-3 focus:border-gent-500" required><option value="">—</option>{users.filter((u) => statusOf(u) === 'ACTIVE' && String(u.role || 'LEARNER').toUpperCase() !== 'ADMIN').map((u) => <option key={u.id} value={u.id}>{u.displayName || u.username} (@{u.username})</option>)}</select></label>
        <label className="block"><span className="mb-1 block text-sm font-semibold">{c('assignmentTitleNl')}</span><input value={form.titleNl} onChange={(e) => setForm((f) => ({ ...f, titleNl: e.target.value }))} maxLength={120} className="h-12 w-full rounded-xl border-2 border-slate-200 px-4 focus:border-gent-500" required /></label>
        <label className="block"><span className="mb-1 block text-sm font-semibold">{c('assignmentTitleDar')}</span><input value={form.titleDarija} onChange={(e) => setForm((f) => ({ ...f, titleDarija: e.target.value }))} maxLength={120} className="h-12 w-full rounded-xl border-2 border-slate-200 px-4 focus:border-gent-500" required /></label>
        <label className="block"><span className="mb-1 block text-sm font-semibold">{c('assignmentInstructionsNl')}</span><textarea value={form.instructionsNl} onChange={(e) => setForm((f) => ({ ...f, instructionsNl: e.target.value }))} maxLength={500} rows={2} className="w-full rounded-xl border-2 border-slate-200 p-4 focus:border-gent-500" /></label>
        <label className="block"><span className="mb-1 block text-sm font-semibold">{c('assignmentInstructionsDar')}</span><textarea value={form.instructionsDarija} onChange={(e) => setForm((f) => ({ ...f, instructionsDarija: e.target.value }))} maxLength={500} rows={2} className="w-full rounded-xl border-2 border-slate-200 p-4 focus:border-gent-500" /></label>
        <label className="block"><span className="mb-1 block text-sm font-semibold">{c('lessonId')}</span><select value={form.lessonId} onChange={(e) => setForm((f) => ({ ...f, lessonId: e.target.value }))} className="h-12 w-full rounded-xl border-2 border-slate-200 bg-white px-3 focus:border-gent-500" required><option value="">—</option>{lessons.map((lesson) => <option key={lesson.id} value={lesson.id}>{lesson.id} · {lesson.title}</option>)}</select></label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block"><span className="mb-1 block text-sm font-semibold">{c('assignmentType')}</span><select value={form.kind} onChange={(e) => setForm((f) => ({ ...f, kind: e.target.value }))} className="h-12 w-full rounded-xl border-2 border-slate-200 bg-white px-3"><option value="EXTRA">{c('extra')}</option><option value="REQUIRED">{c('mandatory')}</option></select></label>
          <label className="block"><span className="mb-1 block text-sm font-semibold">{c('dueDate')}</span><input type="datetime-local" value={form.dueAt} onChange={(e) => setForm((f) => ({ ...f, dueAt: e.target.value }))} className="h-12 w-full rounded-xl border-2 border-slate-200 px-3" /></label>
        </div>
        <button disabled={busy} className="btn-primary h-12 w-full">{busy ? c('loading') : c('createAssignment')}</button>
      </form>

      <section>
        <h2 className="mb-3 px-1 text-sm font-black uppercase tracking-wide text-slate-500">{c('assignments')}</h2>
        {status === 'loading' && <p className="text-center text-sm text-slate-500">{c('loading')}</p>}
        {status === 'error' && <button onClick={load} className="btn-ghost mb-3 w-full">{c('retry')}</button>}
        {status === 'ready' && assignments.length === 0 && <div className="card p-5 text-center text-sm text-slate-500">{c('noAssignments')}</div>}
        <div className="grid gap-3">
          {assignments.map((a) => {
            const assignee = a.user || users.find((u) => String(u.id) === String(a.userId))
            const itemStatus = String(a.status || 'OPEN').toUpperCase()
            const required = a.required || String(a.kind).toUpperCase() === 'REQUIRED'
            const title = typeof a.title === 'object' ? (lang === 'dar' ? a.title.darija : a.title.nl) : a.title
            return <article key={a.id} className="card p-4"><div className="flex items-start gap-3"><span className={`rounded-full px-2 py-1 text-xs font-bold ${required ? 'bg-rose-100 text-rose-700' : 'bg-violet-100 text-violet-700'}`}>{c(required ? 'mandatory' : 'extra')}</span><div className="min-w-0 flex-1"><h3 className="font-black text-slate-900">{title}</h3><p className="text-sm text-slate-500">@{assignee?.username || '—'} · {c(itemStatus === 'COMPLETED' ? 'completed' : itemStatus === 'CANCELLED' ? 'cancelled' : 'open')}</p>{a.dueAt && <p className="mt-1 text-xs text-slate-400">{fmtDate(a.dueAt, true)}</p>}</div></div>{itemStatus === 'OPEN' && <div className="mt-4 flex gap-2"><button onClick={() => update(a.id, 'COMPLETED')} disabled={busy} className="btn-primary min-h-11 flex-1">{c('markCompleted')}</button><button onClick={() => update(a.id, 'CANCELLED')} disabled={busy} className="btn-ghost min-h-11 flex-1">{c('cancel')}</button></div>}</article>
          })}
        </div>
      </section>
    </div>
  )
}

function SpeakingReviewManager({ c, lang }) {
  const [reviews, setReviews] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')
  const [busyId, setBusyId] = useState('')

  async function load() {
    setStatus('loading')
    setError('')
    try {
      setReviews(listFrom(await adminApi.speakingReviews(), 'reviews'))
      setStatus('ready')
    } catch (requestError) {
      setError(apiErrorMessage(requestError, lang))
      setStatus('error')
    }
  }

  useEffect(() => { load() }, []) // eslint-disable-line react-hooks/exhaustive-deps

  async function decide(review, decision) {
    setBusyId(review.eventId)
    setError('')
    try {
      await adminApi.decideSpeakingReview(review.eventId, decision)
      // De audio is server-side al gewist; verwijder de kaart meteen zodat een
      // oude afspeelknop niet lijkt te blijven werken.
      setReviews((items) => items.filter((item) => item.eventId !== review.eventId))
    } catch (requestError) {
      setError(apiErrorMessage(requestError, lang))
    } finally {
      setBusyId('')
    }
  }

  return (
    <section className="space-y-4">
      <div className="card p-4">
        <h2 className="font-black text-slate-900">{c('pronunciationReviews')}</h2>
        <p className="mt-1 text-xs text-slate-500">🔒 {c('reviewPrivacyAdmin')}</p>
      </div>
      {error && <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">{error}<button onClick={load} className="ms-2 underline">{c('retry')}</button></div>}
      {status === 'loading' && <p className="py-10 text-center text-sm font-semibold text-slate-500">{c('loading')}</p>}
      {status === 'ready' && reviews.length === 0 && <div className="card p-8 text-center text-sm text-slate-500">{c('noPronunciationReviews')}</div>}
      <div className="grid gap-4 sm:grid-cols-2">
        {reviews.map((review) => (
          <article key={review.eventId} className="card p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-black text-slate-900">{review.displayName || review.username}</h3>
                <p className="text-xs text-slate-500">@{review.username} · {fmtDate(review.createdAt, true)}</p>
              </div>
              <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-bold text-blue-800">{c('pending')}</span>
            </div>
            <dl className="mt-4 space-y-2 rounded-xl bg-slate-50 p-3 text-sm">
              <div><dt className="text-xs text-slate-400">{c('expectedSpeech')}</dt><dd className="font-bold text-slate-800" dir="ltr">{review.expectedText}</dd></div>
              <div><dt className="text-xs text-slate-400">{c('recognizedSpeech')}</dt><dd className="font-semibold text-slate-700" dir="ltr">{review.transcript || '—'}</dd></div>
            </dl>
            <label className="mt-4 block text-xs font-bold text-slate-600">
              {c('listenRecording')}
              <audio className="mt-2 w-full" controls preload="none" src={review.audioUrl}>
                {c('listenRecording')}
              </audio>
            </label>
            <div className="mt-4 grid gap-2">
              <button onClick={() => decide(review, 'APPROVED')} disabled={busyId === review.eventId} className="btn-primary min-h-11">✓ {c('approvePronunciation')}</button>
              <button onClick={() => decide(review, 'RETRY')} disabled={busyId === review.eventId} className="btn-ghost min-h-11 text-amber-800">↻ {c('requestRetry')}</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function CoachFeedbackManager({ c, lang }) {
  const [items, setItems] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')
  const [busyId, setBusyId] = useState('')

  async function load() {
    setStatus('loading')
    setError('')
    try {
      setItems(listFrom(await adminApi.coachFeedback(), 'feedback'))
      setStatus('ready')
    } catch (requestError) {
      setError(apiErrorMessage(requestError, lang))
      setStatus('error')
    }
  }

  useEffect(() => { load() }, []) // eslint-disable-line react-hooks/exhaustive-deps

  async function decide(item, decision) {
    setBusyId(item.responseId)
    setError('')
    try {
      await adminApi.resolveCoachFeedback(item.responseId, decision)
      setItems((current) => current.filter((entry) => entry.responseId !== item.responseId))
    } catch (requestError) {
      setError(apiErrorMessage(requestError, lang))
    } finally {
      setBusyId('')
    }
  }

  return (
    <section className="space-y-4">
      <div className="card p-4">
        <h2 className="font-black text-slate-900">{c('aiFeedbackTitle')}</h2>
        <p className="mt-1 text-xs text-slate-500">🔒 {c('aiFeedbackPrivacy')}</p>
      </div>
      {error && <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">{error}<button onClick={load} className="ms-2 underline">{c('retry')}</button></div>}
      {status === 'loading' && <p className="py-10 text-center text-sm font-semibold text-slate-500">{c('loading')}</p>}
      {status === 'ready' && items.length === 0 && <div className="card p-8 text-center text-sm text-slate-500">{c('noAiFeedback')}</div>}
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((item) => {
          const coach = item.coach || {}
          return (
            <article key={item.responseId} className="card p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-black text-slate-900">{c('aiLessonItem')}</h3>
                  <p className="text-xs text-slate-500">{item.lessonId} · #{Number(item.itemIndex) + 1} · {item.mode}</p>
                </div>
                <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-bold text-amber-800">{item.reports} {c('aiReports')}</span>
              </div>
              <div className="mt-4 space-y-3 rounded-xl bg-slate-50 p-3 text-sm">
                <div><p className="font-bold text-slate-800" dir="ltr">{coach.meaning?.nl || '—'}</p><p className="mt-1 text-slate-600" dir="ltr">{coach.meaning?.darijaLat || '—'}</p></div>
                <div className="border-t border-slate-200 pt-3"><p className="font-semibold text-slate-700" dir="ltr">{coach.usage?.nl || '—'}</p><p className="mt-1 text-slate-600" dir="ltr">{coach.usage?.darijaLat || '—'}</p></div>
                <div className="border-t border-slate-200 pt-3"><p className="font-semibold text-violet-800" dir="ltr">{coach.pronunciationTip?.nl || '—'}</p><p className="mt-1 text-violet-700" dir="ltr">{coach.pronunciationTip?.darijaLat || '—'}</p></div>
              </div>
              <p className="mt-3 text-xs text-slate-400">{fmtDate(item.firstReportedAt, true)}</p>
              <div className="mt-4 grid gap-2">
                <button onClick={() => decide(item, 'RESOLVED')} disabled={busyId === item.responseId} className="btn-primary min-h-11">✓ {c('aiMarkChecked')}</button>
                <button onClick={() => decide(item, 'REGENERATE')} disabled={busyId === item.responseId} className="btn-ghost min-h-11 text-amber-800">↻ {c('aiRegenerate')}</button>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default function AdminDashboard({ onClose }) {
  const { isAdmin, logout } = useAuth()
  const { lang } = useLang()
  const c = (key) => uiCopy(lang, key)
  const [tab, setTab] = useState('users')
  const [filter, setFilter] = useState('ALL')
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')
  const [action, setAction] = useState(null)
  const [busy, setBusy] = useState(false)
  const [reset, setReset] = useState(null)

  async function loadUsers() {
    setStatus('loading'); setError('')
    try {
      const baseUsers = listFrom(await adminApi.users(), 'users')
      // Bij ongeveer tien accounts is één compacte detailcall per leerling
      // verantwoord en krijgen we vandaag/7 dagen naast het totaal. Als één
      // detailcall faalt, blijft de rest van het dashboard gewoon bruikbaar.
      const enriched = await Promise.all(baseUsers.map(async (item) => {
        if (String(item.role || '').toUpperCase() === 'ADMIN') return item
        try {
          const detail = await adminApi.userActivity(item.id)
          return { ...item, activity: detail.activity, recentAttempts: detail.attempts || [], progress: detail.progress, assignments: detail.assignments || [] }
        } catch {
          return item
        }
      }))
      setUsers(enriched)
      setStatus('ready')
    }
    catch (requestError) { setError(apiErrorMessage(requestError, lang)); setStatus('error') }
  }
  useEffect(() => { if (isAdmin) loadUsers() }, [isAdmin]) // eslint-disable-line react-hooks/exhaustive-deps

  const shownUsers = useMemo(() => users.filter((item) => String(item.role || 'LEARNER').toUpperCase() !== 'ADMIN' && (filter === 'ALL' || statusOf(item) === filter)), [users, filter])

  async function confirmAction() {
    if (!action) return
    setBusy(true)
    try { await adminApi.updateUserStatus(action.user.id, action.type); setAction(null); await loadUsers() }
    catch (requestError) { setError(apiErrorMessage(requestError, lang)); setAction(null) }
    finally { setBusy(false) }
  }
  async function createReset(target) {
    setBusy(true); setError('')
    try { const data = await adminApi.createPasswordReset(target.id); setReset({ ...data, username: target.username }) }
    catch (requestError) { setError(apiErrorMessage(requestError, lang)) }
    finally { setBusy(false) }
  }

  if (!isAdmin) return null

  return (
    <div className="min-h-dvh bg-canvas" dir="ltr">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center gap-2 px-3 py-2">
          <button onClick={onClose} className="btn-ghost h-11 w-11 !px-0" aria-label={c('close')}>←</button>
          <div className="min-w-0 flex-1"><h1 className="truncate font-black text-slate-900">{c('adminTitle')}</h1><p className="truncate text-xs text-slate-500">{c('adminSubtitle')}</p></div>
          <LangToggle compact />
          <button onClick={logout} className="btn-ghost h-11 px-3 text-xs">{c('signOut')}</button>
        </div>
        <nav className="mx-auto grid max-w-3xl grid-cols-2 gap-2 px-3 pb-2 sm:grid-cols-4" aria-label={c('adminTitle')}>
          <button onClick={() => setTab('users')} className={`min-h-11 rounded-xl text-sm font-bold ${tab === 'users' ? 'bg-gent-600 text-white' : 'bg-slate-100 text-slate-600'}`}>{c('users')}</button>
          <button onClick={() => setTab('assignments')} className={`min-h-11 rounded-xl text-sm font-bold ${tab === 'assignments' ? 'bg-teal-700 text-white' : 'bg-slate-100 text-slate-600'}`}>{c('assignments')}</button>
          <button onClick={() => setTab('speech')} className={`min-h-11 rounded-xl text-sm font-bold ${tab === 'speech' ? 'bg-violet-600 text-white' : 'bg-slate-100 text-slate-600'}`}>{c('pronunciationReviews')}</button>
          <button onClick={() => setTab('coach')} className={`min-h-11 rounded-xl text-sm font-bold ${tab === 'coach' ? 'bg-amber-500 text-slate-950' : 'bg-slate-100 text-slate-600'}`}>{c('aiFeedbackTab')}</button>
        </nav>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-5">
        {tab === 'users' ? (
          <>
            <div className="mb-4 flex gap-2 overflow-x-auto pb-1" role="group">
              {FILTERS.map((item) => <button key={item} onClick={() => setFilter(item)} className={`min-h-11 shrink-0 rounded-full px-4 text-sm font-bold ${filter === item ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 ring-1 ring-slate-200'}`}>{c({ ALL: 'all', PENDING: 'pending', ACTIVE: 'active', REJECTED: 'rejected', SUSPENDED: 'suspended' }[item])}{item !== 'ALL' && ` (${users.filter((u) => statusOf(u) === item).length})`}</button>)}
            </div>
            {error && <div role="alert" className="mb-4 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">{error}<button onClick={loadUsers} className="ms-2 underline">{c('retry')}</button></div>}
            {status === 'loading' && users.length === 0 && <p className="py-12 text-center text-sm font-semibold text-slate-500">{c('loading')}</p>}
            {status === 'ready' && shownUsers.length === 0 && <div className="card p-8 text-center text-sm text-slate-500">{c('noUsers')}</div>}
            <div className="grid gap-4 sm:grid-cols-2">{shownUsers.map((item) => <UserCard key={item.id} user={item} c={c} onAction={(target, type, label) => setAction({ user: target, type, label })} onReset={createReset} />)}</div>
          </>
        ) : tab === 'assignments'
          ? <AssignmentManager users={users} c={c} lang={lang} />
          : tab === 'speech'
            ? <SpeakingReviewManager c={c} lang={lang} />
            : <CoachFeedbackManager c={c} lang={lang} />}
      </main>

      <ConfirmDialog action={action} onCancel={() => setAction(null)} onConfirm={confirmAction} busy={busy} c={c} />
      <ResetCodeDialog reset={reset} onClose={() => setReset(null)} c={c} />
    </div>
  )
}
