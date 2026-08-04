import { useEffect, useRef } from 'react'
import { useLang } from '../context/LanguageContext.jsx'

/**
 * Help-scherm: uitleg over hoe de app werkt en wat je kan verwachten.
 * Elke sectie staat in het Nederlands én in het Darija, zodat Oumayma
 * het altijd in beide talen kan lezen.
 */

// Inhoud staat bewust hier (tweetalig per sectie) i.p.v. in translations.js,
// omdat we beide talen tegelijk tonen.
const SECTIONS = [
  {
    icon: '🎯',
    nl: {
      title: 'Wat is deze app?',
      body: 'Een app om stap voor stap Nederlands te leren voor het leven in Gent. Ze is gemaakt voor jou, met vertalingen en tips in het Darija.',
    },
    dar: {
      title: 'شنو هو هاد التطبيق؟',
      body: 'تطبيق باش تعلمي الهولندية شوية بشوية للحياة فگاند. مصايب ليك نتِ، بالترجمة والنصائح بالدارجة.',
    },
  },
  {
    icon: '📚',
    nl: {
      title: 'De lessen',
      body: 'Kies een niveau en een les. Eerst zie je kaartjes met een woord of zin (leren), daarna een kleine quiz om te oefenen. Alles werkt zonder internet.',
    },
    dar: {
      title: 'الدروس',
      body: 'ختاري مستوى ودرس. الأول كتشوفي كارطات فيهم كلمة ولا جملة (التعلم)، من بعد تمرين صغير. كلشي كيخدم بلا أنترنت.',
    },
  },
  {
    icon: '🔊',
    nl: {
      title: 'Luisteren',
      body: 'Tik op de knop met het luidsprekertje om te horen hoe een woord in het Vlaams wordt uitgesproken. Je kan zo vaak luisteren als je wil.',
    },
    dar: {
      title: 'الاستماع',
      body: 'كليكي على زر السمّاعة باش تسمعي كيفاش كتنطق الكلمة بالفلامنكية. تقدري تسمعي قد ما بغيتي.',
    },
  },
  {
    icon: '🎙️',
    nl: {
      title: 'De spreekoefening',
      body: 'Bij de spreeklessen kan je een zin inspreken. De app luistert en een AI-lerares verbetert je, met uitleg in het Darija. Hiervoor zijn twee gratis sleutels nodig (via de instellingen ⚙️).',
    },
    dar: {
      title: 'تمرين الكلام',
      body: 'فدروس الكلام تقدري تسجلي جملة. التطبيق كيسمع وأستاذة ذكية كتصححلك، بشرح بالدارجة. لهاد الشي خاصك جوج مفاتيح فابور (من الإعدادات ⚙️).',
    },
  },
  {
    icon: '💾',
    nl: {
      title: 'Je voortgang',
      body: 'De app onthoudt welke lessen je afgerond hebt, op dit toestel. Je kan dus altijd verdergaan waar je gestopt was.',
    },
    dar: {
      title: 'التقدم ديالك',
      body: 'التطبيق كيتفكر الدروس اللي كمّلتي، فهاد الجهاز. تقدري ديما تكملي من فين وقفتي.',
    },
  },
  {
    icon: '🌐',
    nl: {
      title: 'Taal wisselen',
      body: 'Met de knop 🌐 kan je de hele app tussen het Nederlands en het Darija wisselen. De Nederlandse woorden die je leert, blijven natuurlijk Nederlands.',
    },
    dar: {
      title: 'تبديل اللغة',
      body: 'بزر 🌐 تقدري تبدلي التطبيق كامل بين الهولندية والدارجة. الكلمات الهولندية اللي كتعلمي كيبقاو بالهولندية طبعا.',
    },
  },
]

export default function Help({ onClose }) {
  const { t } = useLang()
  const closeRef = useRef(null)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-white shadow-xl sm:rounded-3xl"
        role="dialog"
        aria-modal="true"
        aria-label={t('helpTitle')}
      >
        <div className="flex items-center justify-between border-b border-slate-100 p-5">
          <div>
            <h3 className="text-lg font-bold text-slate-900">{t('helpTitle')}</h3>
            <p className="rtl text-sm text-slate-500">كيفاش كيخدم التطبيق؟</p>
          </div>
          <button ref={closeRef} onClick={onClose} className="btn-ghost h-11 w-11 !px-0" aria-label={t('close')}>
            ✕
          </button>
        </div>

        <div className="space-y-5 overflow-y-auto p-5">
          {SECTIONS.map((s, i) => (
            <div key={i} className="flex gap-3">
              <span className="text-2xl" aria-hidden="true">
                {s.icon}
              </span>
              <div className="min-w-0 flex-1">
                {/* Nederlands */}
                <h4 className="font-bold text-slate-900">{s.nl.title}</h4>
                <p className="text-sm leading-snug text-slate-600">{s.nl.body}</p>
                {/* Darija */}
                <div className="rtl mt-2 rounded-lg bg-saffraan-50 p-2.5">
                  <h4 className="font-bold text-saffraan-900">{s.dar.title}</h4>
                  <p className="text-sm leading-snug text-saffraan-800">{s.dar.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-100 p-4">
          <button onClick={onClose} className="btn-primary h-12 w-full">
            {t('helpClose')}
          </button>
        </div>
      </div>
    </div>
  )
}
