import { useProgress } from '../context/ProgressContext.jsx'
import { useLang } from '../context/LanguageContext.jsx'

const TYPE_META = {
  phonetics: { key: 'type_phonetics', icon: '🔉' },
  vocab: { key: 'type_vocab', icon: '📇' },
  phrases: { key: 'type_phrases', icon: '💬' },
  numbers: { key: 'type_numbers', icon: '🔢' },
  grammar: { key: 'type_grammar', icon: '📐' },
  speaking: { key: 'type_speaking', icon: '🎙️' },
  listen: { key: 'type_listen', icon: '👂' },
  typing: { key: 'type_typing', icon: '⌨️' },
  quiz: { key: 'type_quiz', icon: '✅' },
}

/**
 * Eén les in de lijst. De hele rij opent de les. Het bolletje is enkel een
 * status-indicator (✓ = afgerond); afronden gebeurt door de les uit te spelen,
 * niet door hier te tikken — zo vink je niets meer per ongeluk af.
 */
export default function LessonRow({ lesson, index, onOpen }) {
  const { isDone } = useProgress()
  const { t, isDarija } = useLang()
  const done = isDone(lesson.id)
  const title = isDarija && lesson.titleDarija ? lesson.titleDarija : lesson.title
  const meta = TYPE_META[lesson.type]
  const label = meta ? t(meta.key) : lesson.type
  const icon = meta?.icon ?? '•'

  return (
    <li>
      <button
        onClick={() => onOpen?.(lesson)}
        className="flex w-full min-w-0 items-center gap-3 rounded-lg px-1 py-3 text-left hover:bg-slate-50"
      >
        <span
          aria-hidden="true"
          className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 text-xs font-bold ${
            done ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-slate-400 bg-white text-slate-600'
          }`}
        >
          {done ? '✓' : index}
        </span>
        <span className="min-w-0 flex-1">
          <span
            className={`block truncate text-sm font-semibold ${
              done ? 'text-slate-500' : 'text-slate-800'
            }`}
          >
            {title}
            {done && <span className="sr-only"> ({t('completed')})</span>}
          </span>
          <span className="block truncate text-sm text-slate-500">
            {icon} {label} · {lesson.items.length} {t('items')}
          </span>
        </span>
      </button>
    </li>
  )
}
