import LevelCard from './LevelCard.jsx'
import ProgressBar from './ProgressBar.jsx'
import curriculum, { allLessonIds } from '../data/curriculum.js'
import resources from '../data/resources.js'
import { useProgress } from '../context/ProgressContext.jsx'
import { useLang } from '../context/LanguageContext.jsx'
import { dueCount } from '../lib/review.js'

/**
 * Startscherm: welkomstboodschap, totale voortgang en de niveaukeuze.
 */
export default function Dashboard({ onOpenLevel, onOpenReview, onOpenLesson }) {
  const { ratioFor, isDone, updatedAt } = useProgress()
  const { t } = useLang()
  const chevron = '›'
  const allIds = curriculum.levels.flatMap(allLessonIds)
  const overall = ratioFor(allIds)
  const due = dueCount(curriculum, isDone)

  // Dagelijkse aanmoediging als ze vandaag nog niet geoefend heeft.
  const goalToday = !updatedAt || updatedAt.slice(0, 10) !== new Date().toISOString().slice(0, 10)

  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      {/* Welkom */}
      <section className="card overflow-hidden">
        <div className="relative overflow-hidden bg-gradient-to-br from-gent-800 via-gent-600 to-teal-600 p-6 text-white">
          <span aria-hidden="true" className="absolute -right-8 -top-10 h-28 w-28 rounded-full bg-white/10" />
          <span aria-hidden="true" className="absolute -bottom-12 right-16 h-24 w-24 rounded-full bg-saffraan-300/20" />
          <p className="relative text-sm font-medium text-gent-100">
            {t('welcome')} · <span>Marhba</span>
          </p>
          <h2 className="relative mt-1 text-2xl font-bold leading-tight">{t('dashTitle')}</h2>
          <p className="relative mt-2 max-w-md text-sm text-gent-100">{t('dashSub')}</p>
        </div>
        <div className="p-5">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-700">{t('totalProgress')}</span>
          </div>
          <ProgressBar ratio={overall} />
        </div>
      </section>

      {/* Dagelijkse aanmoediging */}
      {goalToday && (
        <div className="mt-4 flex items-center gap-3 rounded-2xl bg-gradient-to-br from-saffraan-300 to-saffraan-500 p-4 text-saffraan-950 shadow-sm ring-1 ring-saffraan-600/20">
          <span className="text-2xl" aria-hidden="true">
            🌟
          </span>
          <p className="text-sm font-semibold">{t('dailyGoal')}</p>
        </div>
      )}

      {/* Herhaling — alleen tonen als er woorden klaarstaan */}
      {due > 0 && (
        <button
          onClick={onOpenReview}
          className="mt-4 flex w-full items-center gap-3 rounded-2xl bg-gradient-to-br from-saffraan-300 to-saffraan-500 p-4 text-left text-saffraan-950 shadow-sm ring-1 ring-saffraan-600/20 transition hover:from-saffraan-200 hover:to-saffraan-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-saffraan-600"
        >
          <span className="text-3xl" aria-hidden="true">
            🔁
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-bold">{t('review')}</span>
            <span className="block text-sm text-saffraan-900">
              {due} {t('reviewCta')}
            </span>
          </span>
          <span aria-hidden="true" className="text-2xl font-bold">
            {chevron}
          </span>
        </button>
      )}

      {/* Niveaus */}
      <h3 className="mb-3 mt-8 px-1 text-sm font-bold uppercase tracking-wide text-slate-500">
        {t('chooseLevel')}
      </h3>
      <div className="grid gap-4">
        {curriculum.levels
          .slice()
          .sort((a, b) => a.order - b.order)
          .map((level) => (
            <LevelCard key={level.id} level={level} onOpen={onOpenLevel} />
          ))}
      </div>

      {/* Extra oefenen — gratis externe bronnen */}
      <h3 className="mb-3 mt-8 px-1 text-sm font-bold uppercase tracking-wide text-slate-500">
        {t('morePractice')}
      </h3>
      <div className="grid gap-3">
        {resources.map((r) => (
          <a
            key={r.url}
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            className="card flex items-center gap-3 p-4 hover:ring-2 hover:ring-gent-300"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900">{r.name}</span>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-500">
                  {r.tag}
                </span>
              </div>
              <p className="text-sm leading-snug text-slate-500">{r.desc}</p>
            </div>
            <span className="text-slate-300" aria-hidden="true">
              ↗
            </span>
          </a>
        ))}
      </div>

      <p className="mt-8 text-center text-xs text-slate-500">{t('offlineNote')}</p>
    </div>
  )
}
