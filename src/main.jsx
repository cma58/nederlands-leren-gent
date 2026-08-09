import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ProgressProvider } from './context/ProgressContext.jsx'
import { LanguageProvider } from './context/LanguageContext.jsx'
import './index.css'

// Zorg dat een nieuwe versie na een update automatisch geladen wordt. Zonder
// dit blijft de service worker (offline-cache) de vorige versie tonen tot álle
// tabbladen gesloten zijn — verwarrend bij het testen van een net-gedeployde fix.
if ('serviceWorker' in navigator) {
  const hadController = Boolean(navigator.serviceWorker.controller)
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    // Niet herladen bij de allereerste installatie (geen oude versie actief),
    // en maar één keer, om een herlaad-lus te voorkomen.
    if (!hadController || window.__swReloaded) return
    window.__swReloaded = true
    window.location.reload()
  })
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <ProgressProvider>
        <App />
      </ProgressProvider>
    </LanguageProvider>
  </React.StrictMode>,
)
