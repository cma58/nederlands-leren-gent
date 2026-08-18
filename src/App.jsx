import { useEffect, useRef, useState } from 'react'
import Header from './components/Header.jsx'
import AdminDashboard from './components/AdminDashboard.jsx'
import Dashboard from './components/Dashboard.jsx'
import LevelView from './components/LevelView.jsx'
import LessonPlayer from './components/LessonPlayer.jsx'
import ReviewSession from './components/ReviewSession.jsx'
import PublicHome from './components/PublicHome.jsx'
import AuthForm from './components/AuthForm.jsx'
import AccountStatus, { AppLoading, ServerError } from './components/AccountStatus.jsx'
import AccountPanel from './components/AccountPanel.jsx'
import LearnerAssignments from './components/LearnerAssignments.jsx'
import LegacyMigrationPrompt from './components/LegacyMigrationPrompt.jsx'
import AdminSetup from './components/AdminSetup.jsx'
import Help from './components/Help.jsx'
import curriculum from './data/curriculum.js'
import { useAuth } from './context/AuthContext.jsx'
import { useLang } from './context/LanguageContext.jsx'
import useActivityTracker from './hooks/useActivityTracker.js'
import { learnerApi } from './lib/api.js'
import { recordLearningAttempt } from './lib/attempts.js'
import { uiCopy } from './lib/uiCopy.js'

function findLesson(lessonId) {
  for (const level of curriculum.levels) {
    for (const module of level.modules) {
      const lesson = module.lessons.find(
        (item) => String(item.id) === String(lessonId)
          || item.legacyLessonIds?.some((legacyId) => String(legacyId) === String(lessonId)),
      )
      if (lesson) return lesson
    }
  }
  return null
}

function RegistrationSent({ onLogin, onHome }) {
  const { lang } = useLang()
  const c = (key) => uiCopy(lang, key)
  return (
    <div className="grid min-h-dvh place-items-center bg-slate-100 p-5" dir="ltr">
      <section className="card max-w-md overflow-hidden text-center">
        <div className="bg-gradient-to-br from-emerald-700 to-emerald-500 p-8 text-white">
          <span className="text-5xl" aria-hidden="true">✓</span>
          <h1 className="mt-5 text-2xl font-black">{c('accountRequested')}</h1>
          <p className="mt-3 text-sm leading-relaxed text-emerald-50">{c('accountRequestedHint')}</p>
        </div>
        <div className="grid gap-3 p-6">
          <button onClick={onLogin} className="btn-primary h-12">{c('signIn')}</button>
          <button onClick={onHome} className="btn-ghost h-12">{c('backHome')}</button>
        </div>
      </section>
    </div>
  )
}

export default function App() {
  const { user, status, isAdmin, refreshSession } = useAuth()
  const { dir, lang, isDarija } = useLang()
  const c = (key) => uiCopy(lang, key)
  useActivityTracker()

  // Alleen bedoeld voor de eerste productie-installatie. De server accepteert
  // dit verzoek exact één keer en vereist daarnaast het bootstrapgeheim.
  const isAdminSetup = window.location.hash === '#setup-admin'

  const [publicView, setPublicView] = useState('home') // home | login | register | registered
  const [activeLevel, setActiveLevel] = useState(null)
  const [activeLesson, setActiveLesson] = useState(null)
  const [activeAssignmentId, setActiveAssignmentId] = useState(null)
  const [showReview, setShowReview] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const [showAccount, setShowAccount] = useState(false)
  const [showAdmin, setShowAdmin] = useState(false)
  // Sluit gewone lessen totdat de server bevestigd heeft dat er geen
  // verplichte opdracht openstaat.
  const [mandatoryBlocking, setMandatoryBlocking] = useState(true)

  const overlayOpen = Boolean(activeLesson || showReview || showHelp || showAccount)
  const bgRef = useRef(null)
  useEffect(() => {
    if (bgRef.current) bgRef.current.inert = overlayOpen
  }, [overlayOpen])

  // Een admin komt na aanmelden rechtstreeks in het echte, server-beveiligde
  // dashboard. Geen geheime URL of #admin-truc meer.
  useEffect(() => {
    if (isAdmin) setShowAdmin(true)
  }, [isAdmin])

  if (isAdminSetup) return <AdminSetup />
  if (status === 'loading') return <AppLoading />
  if (status === 'error') return <ServerError onRetry={() => refreshSession().catch(() => {})} />

  if (!user) {
    if (publicView === 'login') return <AuthForm mode="login" onBack={() => setPublicView('home')} />
    if (publicView === 'register') {
      return <AuthForm mode="register" onBack={() => setPublicView('home')} onRegistered={() => setPublicView('registered')} />
    }
    if (publicView === 'registered') {
      return <RegistrationSent onLogin={() => setPublicView('login')} onHome={() => setPublicView('home')} />
    }
    return (
      <>
        <PublicHome onLogin={() => setPublicView('login')} onRegister={() => setPublicView('register')} onHelp={() => setShowHelp(true)} />
        {showHelp && <Help onClose={() => setShowHelp(false)} />}
      </>
    )
  }

  if (user.status !== 'ACTIVE') return <AccountStatus />

  if (showAdmin && isAdmin) return <AdminDashboard onClose={() => setShowAdmin(false)} />

  function openAssignedLesson(lessonId, assignmentId) {
    const lesson = findLesson(lessonId)
    if (!lesson) return
    setActiveAssignmentId(assignmentId || null)
    setActiveLesson(lesson)
  }

  async function finishAssignedLesson(lesson) {
    if (activeAssignmentId) {
      try {
        // Ook lessen zonder quiz krijgen een expliciete, pedagogische
        // voltooiingspoging voordat de server de opdracht afsluit.
        await recordLearningAttempt({
          lessonId: lesson.id,
          type: 'lesson',
          result: 'completed',
        })
        await learnerApi.completeAssignment(activeAssignmentId)
        window.dispatchEvent(new Event('nl-gent:assignments-changed'))
      } catch {
        // De cloudvoortgang is al opgeslagen. De opdracht blijft bij een
        // tijdelijke netwerkfout OPEN en kan veilig opnieuw worden afgerond.
      }
    }
    setActiveAssignmentId(null)
    setActiveLesson(null)
  }

  return (
    <div className="min-h-dvh" dir={dir}>
      <div ref={bgRef}>
        <Header
          onBack={activeLevel ? () => setActiveLevel(null) : undefined}
          subtitle={activeLevel
            ? `${isDarija ? activeLevel.titleDarijaLat || activeLevel.title : activeLevel.title} · ${isDarija ? activeLevel.subtitleDarijaLat || activeLevel.subtitle : activeLevel.subtitle}`
            : undefined}
          onSettings={() => setShowAccount(true)}
          onHelp={() => setShowHelp(true)}
        />

        <div className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-2xl items-center gap-2 px-4 py-2" dir="ltr">
            <button onClick={() => setShowAccount(true)} className="min-h-11 min-w-0 flex-1 truncate rounded-xl bg-slate-100 px-3 text-left text-sm font-bold text-slate-700">
              <span className="me-2 inline-grid h-7 w-7 place-items-center rounded-full bg-gent-100 text-xs text-gent-700">{(user.displayName || user.username).slice(0, 1).toUpperCase()}</span>
              {user.displayName || `@${user.username}`}
            </button>
            {isAdmin && <button onClick={() => setShowAdmin(true)} className="btn-primary min-h-11">{c('admin')}</button>}
          </div>
        </div>

        <main className="pb-16">
          {!activeLevel && <div className="mx-auto max-w-2xl px-4"><LegacyMigrationPrompt /></div>}
          <LearnerAssignments onOpenLesson={openAssignedLesson} onBlockingChange={setMandatoryBlocking} />
          {mandatoryBlocking ? (
            <section className="mx-auto max-w-2xl px-4 py-8 text-center" dir="ltr">
              <div className="card p-6">
                <span className="text-4xl" aria-hidden="true">🎯</span>
                <h2 className="mt-4 text-xl font-black text-slate-900">{c('mandatory')}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{c('mandatoryFirst')}</p>
              </div>
            </section>
          ) : activeLevel ? (
            <LevelView level={activeLevel} onOpenLesson={setActiveLesson} />
          ) : (
            <Dashboard
              onOpenLevel={setActiveLevel}
              onOpenReview={() => setShowReview(true)}
              onOpenLesson={setActiveLesson}
            />
          )}
        </main>
      </div>

      {activeLesson && (
        <LessonPlayer
          lesson={activeLesson}
          onClose={() => {
            setActiveAssignmentId(null)
            setActiveLesson(null)
          }}
          onCompleted={finishAssignedLesson}
        />
      )}
      {showReview && <ReviewSession onClose={() => setShowReview(false)} />}
      {showHelp && <Help onClose={() => setShowHelp(false)} />}
      {showAccount && <AccountPanel onClose={() => setShowAccount(false)} />}
    </div>
  )
}
