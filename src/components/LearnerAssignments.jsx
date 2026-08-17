import { useEffect, useMemo, useState } from 'react'
import { useLang } from '../context/LanguageContext.jsx'
import { apiErrorMessage, learnerApi } from '../lib/api.js'
import { uiCopy } from '../lib/uiCopy.js'

function unwrapList(data) {
  if (Array.isArray(data)) return data
  return data?.assignments || data?.items || []
}

export default function LearnerAssignments({ onOpenLesson, onBlockingChange }) {
  const { lang } = useLang()
  const c = (key) => uiCopy(lang, key)
  const [assignments, setAssignments] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')
  const [open, setOpen] = useState(false)

  async function load() {
    setStatus('loading')
    setError('')
    try {
      const data = await learnerApi.assignments()
      setAssignments(unwrapList(data))
      setStatus('ready')
    } catch (requestError) {
      setError(apiErrorMessage(requestError, lang))
      setStatus('error')
    }
  }

  useEffect(() => {
    load()
    // Opdrachten worden ook na focus opnieuw opgehaald, zodat een adminwijziging
    // zichtbaar wordt zonder de hele app te herladen.
    const onFocus = () => load()
    const onChanged = () => load()
    window.addEventListener('focus', onFocus)
    window.addEventListener('nl-gent:assignments-changed', onChanged)
    return () => {
      window.removeEventListener('focus', onFocus)
      window.removeEventListener('nl-gent:assignments-changed', onChanged)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const current = useMemo(
    () => assignments.filter((item) => {
      const state = String(item.status || 'OPEN').toUpperCase()
      const startsAt = item.startsAt ? new Date(item.startsAt).getTime() : 0
      return !['COMPLETED', 'CANCELLED', 'EXEMPT'].includes(state) && (!startsAt || startsAt <= Date.now())
    }),
    [assignments],
  )
  const mandatory = current.filter(
    (item) => item.required || String(item.kind || item.type).toUpperCase() === 'REQUIRED',
  )

  useEffect(() => {
    // Bij een serverfout weten we niet veilig of er een verplichte opdracht
    // klaarstaat. Dan sluiten we de gewone leerroute tijdelijk en tonen retry.
    onBlockingChange?.(status !== 'ready' || mandatory.length > 0)
  }, [status, mandatory.length, onBlockingChange])

  if (status === 'loading' && assignments.length === 0) return null
  if (status === 'error' && assignments.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 pt-4">
        <button onClick={load} className="w-full rounded-xl border border-saffraan-200 bg-saffraan-50 p-3 text-sm font-semibold text-saffraan-800">
          {error || c('serverUnavailable')} · {c('retry')}
        </button>
      </div>
    )
  }
  if (current.length === 0) return null

  return (
    <>
      <div className="mx-auto max-w-2xl px-4 pt-4" dir="ltr">
        <button onClick={() => setOpen(true)} className={`flex w-full items-center gap-3 rounded-2xl p-4 text-left text-white shadow-sm ${mandatory.length ? 'bg-gradient-to-br from-rose-700 to-rose-500' : 'bg-gradient-to-br from-violet-700 to-violet-500'}`}>
          <span className="text-2xl" aria-hidden="true">{mandatory.length ? '!' : '✦'}</span>
          <span className="min-w-0 flex-1">
            <span className="block font-black">{c('studentAssignments')}</span>
            <span className="block text-sm text-white/85">
              {mandatory.length ? c('mandatoryFirst') : `${current.length} ${c('assignments').toLowerCase()}`}
            </span>
          </span>
          <span aria-hidden="true">→</span>
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" dir="ltr">
          <section className="mx-auto my-5 max-w-lg overflow-hidden rounded-3xl bg-slate-50 shadow-2xl">
            <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-3">
              <button onClick={() => setOpen(false)} className="btn-ghost h-11 w-11 !px-0" aria-label={c('close')}>✕</button>
              <h2 className="flex-1 text-lg font-black text-slate-900">{c('studentAssignments')}</h2>
            </header>
            <div className="grid gap-3 p-4">
              {current.map((assignment) => {
                const isMandatory = assignment.required || String(assignment.kind || assignment.type).toUpperCase() === 'REQUIRED'
                const title = typeof assignment.title === 'object'
                  ? (lang === 'dar' ? assignment.title.darija : assignment.title.nl)
                  : assignment.title
                const instructions = typeof assignment.instructions === 'object'
                  ? (lang === 'dar' ? assignment.instructions.darija : assignment.instructions.nl)
                  : assignment.instructions
                const lessonId = assignment.targetType === 'LESSON'
                  ? assignment.targetId
                  : assignment.lessonId
                return (
                  <article key={assignment.id} className="card p-4">
                    <div className="flex items-start gap-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${isMandatory ? 'bg-rose-100 text-rose-700' : 'bg-violet-100 text-violet-700'}`}>
                        {c(isMandatory ? 'mandatory' : 'extra')}
                      </span>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-black text-slate-900">{title}</h3>
                        {instructions && <p className="mt-1 text-sm leading-relaxed text-slate-600">{instructions}</p>}
                        {assignment.dueAt && <p className="mt-2 text-xs font-semibold text-slate-500">{c('dueDate')}: {new Date(assignment.dueAt).toLocaleDateString()}</p>}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        if (!lessonId) return
                        setOpen(false)
                        onOpenLesson?.(lessonId, assignment.id)
                      }}
                      disabled={!lessonId}
                      className="btn-primary mt-4 h-11 w-full"
                    >
                      {lessonId ? c('goToAssignment') : c('noLessonLink')}
                    </button>
                  </article>
                )
              })}
            </div>
          </section>
        </div>
      )}
    </>
  )
}
