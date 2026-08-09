import { useEffect, useRef, useState } from 'react'
import Header from './components/Header.jsx'
import AdminDashboard from './components/AdminDashboard.jsx'
import Dashboard from './components/Dashboard.jsx'
import LevelView from './components/LevelView.jsx'
import LessonPlayer from './components/LessonPlayer.jsx'
import ReviewSession from './components/ReviewSession.jsx'
import Settings from './components/Settings.jsx'
import Welcome from './components/Welcome.jsx'
import Help from './components/Help.jsx'
import { useLang } from './context/LanguageContext.jsx'

/**
 * Wortelcomponent. Eenvoudige navigatie via lokale state (geen router nodig):
 *   welkomstscherm -> dashboard <-> een geopend niveau,
 *   met optioneel de les-speler, instellingen of help erbovenop.
 */
export default function App() {
  const { dir } = useLang()
  const [started, setStarted] = useState(false)
  const [activeLevel, setActiveLevel] = useState(null)
  const [activeLesson, setActiveLesson] = useState(null)
  const [showReview, setShowReview] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showHelp, setShowHelp] = useState(false)

  // Toegankelijkheid: staat er een venster (les/herhaling/instellingen/help)
  // open, dan maken we de achterliggende inhoud `inert`. Zo kan een toetsenbord-
  // of schermlezergebruiker niet per ongeluk "achter" de dialoog navigeren.
  const overlayOpen = Boolean(activeLesson || showReview || showSettings || showHelp)
  const bgRef = useRef(null)
  useEffect(() => {
    const el = bgRef.current
    if (el) el.inert = overlayOpen // oudere browsers negeren dit gewoon
  }, [overlayOpen])

  // Verborgen coach-/adminpagina via #admin in de URL (bookmarkbaar op je eigen
  // toestel; onzichtbaar in de gewone leerflow).
  const [showAdmin, setShowAdmin] = useState(
    typeof window !== 'undefined' && window.location.hash === '#admin',
  )
  useEffect(() => {
    const onHash = () => setShowAdmin(window.location.hash === '#admin')
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  if (showAdmin) {
    return (
      <AdminDashboard
        onClose={() => {
          if (window.location.hash === '#admin') window.location.hash = ''
          setShowAdmin(false)
        }}
      />
    )
  }

  // Eerst het persoonlijke welkomstscherm.
  if (!started) {
    return (
      <>
        <Welcome onBegin={() => setStarted(true)} onHelp={() => setShowHelp(true)} />
        {showHelp && <Help onClose={() => setShowHelp(false)} />}
      </>
    )
  }

  return (
    <div className="min-h-dvh" dir={dir}>
      {/* Achterliggende inhoud: wordt `inert` zodra een venster open staat. */}
      <div ref={bgRef}>
        <Header
          onBack={activeLevel ? () => setActiveLevel(null) : undefined}
          subtitle={activeLevel ? `${activeLevel.title} · ${activeLevel.subtitle}` : undefined}
          onSettings={() => setShowSettings(true)}
          onHelp={() => setShowHelp(true)}
        />

        <main className="pb-16">
          {activeLevel ? (
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
          onClose={() => setActiveLesson(null)}
          onOpenSettings={() => setShowSettings(true)}
        />
      )}

      {showReview && <ReviewSession onClose={() => setShowReview(false)} />}
      {showSettings && <Settings onClose={() => setShowSettings(false)} />}
      {showHelp && <Help onClose={() => setShowHelp(false)} />}
    </div>
  )
}
