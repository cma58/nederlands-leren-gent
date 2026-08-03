import { useState } from 'react'
import Header from './components/Header.jsx'
import Dashboard from './components/Dashboard.jsx'
import LevelView from './components/LevelView.jsx'
import LessonPlayer from './components/LessonPlayer.jsx'
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
  const [showSettings, setShowSettings] = useState(false)
  const [showHelp, setShowHelp] = useState(false)

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
          <Dashboard onOpenLevel={setActiveLevel} />
        )}
      </main>

      {activeLesson && (
        <LessonPlayer
          lesson={activeLesson}
          onClose={() => setActiveLesson(null)}
          onOpenSettings={() => setShowSettings(true)}
        />
      )}

      {showSettings && <Settings onClose={() => setShowSettings(false)} />}
      {showHelp && <Help onClose={() => setShowHelp(false)} />}
    </div>
  )
}
