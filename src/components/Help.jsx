import { useEffect, useRef } from 'react'
import { useLang } from '../context/LanguageContext.jsx'

/**
 * Help-scherm: uitleg over hoe de app werkt en wat je kan verwachten.
 * Elke sectie staat in het Nederlands én in Darija met Latijnse letters.
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
      title: 'Chno howa had l-app?',
      body: 'App bach t3ellem Nederlands chwya b chwya l-7ayat f Gent, m3a tarjama w nsa2e7 b Darija.',
    },
  },
  {
    icon: '📚',
    nl: {
      title: 'De lessen',
      body: 'Kies een niveau en een les. Eerst zie je woorden of zinnen, daarna een korte oefening. Zonder internet kan je verder oefenen; synchronisatie gebeurt zodra je weer online bent.',
    },
    dar: {
      title: 'Dorous',
      body: 'Khtar niveau w dars. Luwel katqra kalimat w jomal, mn be3d katdir tamrin sghir. Ila ma kaynch internet, sync kaytder mlli trje3 online.',
    },
  },
  {
    icon: '🔊',
    nl: {
      title: 'Luisteren',
      body: 'Tik op de knop met het luidsprekertje om te horen hoe een woord in het Vlaams wordt uitgesproken. Je kan zo vaak luisteren als je wil.',
    },
    dar: {
      title: 'Sma3',
      body: 'Klik 3la zerr dyal ssot bach tsme3 kifach katntaq l-kelma b Nederlands. Tqder t3awed qedd ma bghiti.',
    },
  },
  {
    icon: '🎙️',
    nl: {
      title: 'De spreekoefening',
      body: 'Bij spreeklessen kan je een woord of zin opnemen. De app controleert eerst de audiokwaliteit en geeft alleen een oordeel wanneer dat betrouwbaar kan.',
    },
    dar: {
      title: 'Tamrin dyal l-hdra',
      body: 'F drous dyal l-hdra tqder tsjjel kelma wela jomla. L-app kaychouf luwel wach ssot wad7, w kay3ti natija ghir ila kan met2ekked.',
    },
  },
  {
    icon: '💾',
    nl: {
      title: 'Je voortgang',
      body: 'Je voortgang wordt veilig aan je account gekoppeld. Je kan op een ander toestel verdergaan waar je gestopt was.',
    },
    dar: {
      title: 'Taqaddom dyalek',
      body: 'Taqaddom kaytbqa merbout b compte dyalek. Tqder tkmel mn téléphone akhor mn fin wqefti.',
    },
  },
  {
    icon: '🔐',
    nl: {
      title: 'Privacy en actieve tijd',
      body: 'De admin ziet je voortgang, opdrachten, leerpogingen en een schatting van je actieve leertijd. Bij een spreekcontrole gaat je opname beveiligd naar Groq voor transcriptie; de app bewaart de ruwe audio en het vrije transcript niet.',
    },
    dar: {
      title: 'Privacy w lwaqt actif',
      body: 'L-admin kaychouf taqaddom, devoirat, mo7awalat w taqdir dyal lwaqt li kenti actif. F ta7qiq dyal l-hdra, tsjil kaymchi b aman l Groq bach ytektb; l-app ma katkhzzench ssot l-asli wla transcript kamel.',
    },
  },
  {
    icon: '🌐',
    nl: {
      title: 'Taal wisselen',
      body: 'Met de knop 🌐 kan je de hele app tussen het Nederlands en het Darija wisselen. De Nederlandse woorden die je leert, blijven natuurlijk Nederlands.',
    },
    dar: {
      title: 'Beddel l-logha',
      body: 'B zerr 🌐 tqder tbeddel l-app bin Nederlands w Darija b 7orouf Latin. Kalimat li katqra kaybqaw b Nederlands.',
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
            <p className="text-sm text-slate-500" dir="ltr">Kifach katkhdem l-app?</p>
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
                <div className="mt-2 rounded-lg bg-saffraan-50 p-2.5" dir="ltr">
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
