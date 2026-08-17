import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useLang } from '../context/LanguageContext.jsx'
import { useProgress } from '../context/ProgressContext.jsx'

const copy = {
  nl: {
    title: 'Lokale voortgang gevonden',
    body: (name) =>
      `Op dit toestel staat voortgang uit de vroegere versie. Importeer die alleen als ze bij account “${name}” hoort.`,
    lessons: 'afgeronde lessen',
    practice: 'herhaal- en spreekitems',
    import: 'Importeren in mijn account',
    skip: 'Niet importeren',
    error: 'Importeren is niet gelukt. De lokale voortgang is niet verwijderd; probeer later opnieuw.',
  },
  dar: {
    title: 'Lqina taqaddom qdim f had téléphone',
    body: (name) =>
      `F had téléphone kayn taqaddom mn n-noskha l-qdima. Dkhlo ghir ila kaykhos compte “${name}”.`,
    lessons: 'dorous mkmmlin',
    practice: 'tamarin dyal l-moraja3a w n-notq',
    import: 'Dkhel taqaddom l-compte dyali',
    skip: 'Ma ndkhlouch',
    error: 'Ma qdernach ndkhlo taqaddom. Ma mse7na walo; 3awed jereb mn be3d.',
  },
}

export default function LegacyMigrationPrompt() {
  const { lang } = useLang()
  const { user } = useAuth()
  const { legacyState, importLegacy, dismissLegacy } = useProgress()
  const [status, setStatus] = useState('idle')
  const c = copy[lang] || copy.nl

  if (!legacyState) return null

  const lessons = Object.keys(legacyState.completed || {}).length
  const practice =
    Object.keys(legacyState.reviewState || {}).length +
    Object.keys(legacyState.speakingState || {}).length

  async function runImport() {
    setStatus('loading')
    try {
      await importLegacy()
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="mt-4 rounded-2xl border-2 border-saffraan-400 bg-saffraan-50 p-4" role="status">
      <div className="flex items-start gap-3">
        <span className="text-2xl" aria-hidden="true">☁️</span>
        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-slate-900">{c.title}</h3>
          <p className="mt-1 text-sm text-slate-700">{c.body(user?.username || '')}</p>
          <p className="mt-2 text-xs font-semibold text-slate-600">
            {lessons} {c.lessons} · {practice} {c.practice}
          </p>
          {status === 'error' && <p className="mt-2 text-sm text-rose-700">{c.error}</p>}
          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            <button onClick={runImport} disabled={status === 'loading'} className="btn-primary min-h-11 flex-1">
              {status === 'loading' ? '…' : c.import}
            </button>
            <button onClick={dismissLegacy} disabled={status === 'loading'} className="btn-ghost min-h-11 flex-1">
              {c.skip}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
