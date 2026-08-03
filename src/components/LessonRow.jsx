import { useProgress } from '../context/ProgressContext.jsx'
import { useLang } from '../context/LanguageContext.jsx'

const TYPE_META = {
  phonetics: { key: 'type_phonetics', icon: '🔉' },
  vocab: { key: 'type_vocab', icon: '📇' },
  phrases: { key: 'type_phrases', icon: '💬' },
  numbers: { key: 'type_numbers', icon: '🔢' },
  grammar: { key: 'type_grammar', icon: '📐' },
  speaking: { key: 'type_speaking', icon: '🎙️' },
  quiz: { key: 'type_quiz', icon: '✅' },
}

/**
 * Eén les in de lijst: afvinkknop + titel + lestype-label.
 */
export default function LessonRow({ lesson, index, onOpen }) {
  const { isDone, toggle } = useProgress()
  const { t } = useLang()
  const done = isDone(lesson.id)
  const meta = TYPE_META[lesson.type]
  const label = meta ? t(meta.key) : lesson.type
  const icon = meta?.icon ?? '•'

  return (
    <li className="flex items-center gap-3 py-2.5">
      <button
        onClick={() => toggle(lesson.id)}
        aria-pressed={done}
        aria-label={done ? t('completed') : t('completed')}
        className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 text-xs font-bold transition ${
          done
            ? 'border-emerald-500 bg-emerald-500 text-white'
            : 'border-slate-300 bg-white text-slate-400 hover:border-slate-400'
        }`}
      >
        {done ? '✓' : index}
      </button>

      <button
        onClick={() => onOpen?.(lesson)}
        className="flex min-w-0 flex-1 items-center gap-3 rounded-lg px-1 py-1 text-left hover:bg-slate-50"
      >
        <div className="min-w-0 flex-1">
          <p
            className={`truncate text-sm font-semibold ${
              done ? 'text-slate-400 line-through' : 'text-slate-800'
            }`}
          >
            {lesson.title}
          </p>
          <p className="truncate text-xs text-slate-400">
            {icon} {label} · {lesson.items.length} {t('items')}
          </p>
        </div>
      </button>
    </li>
  )
}
