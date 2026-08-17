import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { ProgressProvider } from './context/ProgressContext.jsx'
import { LanguageProvider } from './context/LanguageContext.jsx'
import { purgeLegacySecrets } from './lib/legacyMigration.js'
import './index.css'

// Sleutels en het gedeelde webhookgeheim uit de vroegere privéversie mogen
// nooit aan een publiek account gekoppeld of naar de server gestuurd worden.
purgeLegacySecrets()

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
      <AuthProvider>
        <ProgressProvider>
          <App />
        </ProgressProvider>
      </AuthProvider>
    </LanguageProvider>
  </React.StrictMode>,
)
