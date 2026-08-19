import LessonRow from './LessonRow.jsx'
import ProgressBar from './ProgressBar.jsx'
import { allLessonIds } from '../data/curriculum.js'
import { useProgress } from '../context/ProgressContext.jsx'
import { useLang } from '../context/LanguageContext.jsx'

/**
 * Detailweergave van één niveau: alle modules met hun lessen.
 * Elke module toont zijn eigen mini-voortgang.
 */
export default function LevelView({ level, onOpenLesson }) {
  const { ratioFor } = useProgress()
  const { t, isDarija } = useLang()
  const levelRatio = ratioFor(allLessonIds(level))
  const levelTone = level.accent === 'saffraan'
    ? 'bg-saffraan-100 text-saffraan-900'
    : 'bg-gent-100 text-gent-800'

  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      {/* Kop van het niveau */}
      <div className="mb-6 flex items-center gap-4">
        <div className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-3xl ${levelTone}`}>
          {level.icon}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900">{isDarija ? level.titleDarijaLat || level.title : level.title}</h2>
            {level.cefr && (
              <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs font-semibold text-slate-700">
                {level.cefr}
              </span>
            )}
          </div>
          <p className="text-sm text-slate-500">{isDarija ? level.subtitleDarijaLat || level.subtitle : level.subtitle}</p>
        </div>
      </div>

      <div className="mb-8">
        <ProgressBar ratio={levelRatio} accent={level.accent} />
      </div>

      {/* Modules */}
      <div className="space-y-4">
        {level.modules.map((module) => {
          const moduleRatio = ratioFor(module.lessons.map((l) => l.id))
          return (
            <section key={module.id} className="card p-5">
              <div className="mb-1 flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">
                  {module.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs font-bold text-slate-400">{t('module')} {module.id}</span>
                    {module.optional ? <span className="rounded-full bg-violet-100 px-2 py-0.5 text-xs font-bold text-violet-800">{t('optional')}</span> : null}
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    {isDarija && module.titleDarijaLat ? module.titleDarijaLat : module.title}
                  </h3>
                  <p className="text-sm text-slate-500">{isDarija ? module.goalDarijaLat || module.goal : module.goal}</p>
                </div>
              </div>

              <div className="my-3">
                <ProgressBar ratio={moduleRatio} accent={level.accent} showLabel={false} />
              </div>

              <ul className="divide-y divide-slate-100">
                {module.lessons.map((lesson, i) => (
                  <LessonRow
                    key={lesson.id}
                    lesson={lesson}
                    index={i + 1}
                    onOpen={onOpenLesson}
                  />
                ))}
              </ul>
            </section>
          )
        })}
      </div>
    </div>
  )
}
