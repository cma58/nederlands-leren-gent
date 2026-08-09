import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
// `base` bepaalt onder welk pad de app geserveerd wordt en verschilt per host:
//   - Vercel (en de dev-server): op de root  -> '/'
//   - GitHub Pages (project-site): onder een submap
//     -> https://<gebruiker>.github.io/nederlands-leren-gent/
// Daarom sturen we het via de omgevingsvariabele VITE_BASE. Vercel zet die niet,
// dus daar blijft het '/'. Alleen de GitHub Pages-workflow zet
// VITE_BASE=/nederlands-leren-gent/ tijdens de build.
export default defineConfig(() => ({
  base: process.env.VITE_BASE || '/',
  plugins: [
    react(),
    // Service worker + manifest: maakt de app-schil (HTML/JS/CSS) offline
    // beschikbaar en installeerbaar op het beginscherm. De service worker
    // respecteert automatisch `base`, dus werkt op zowel Vercel als GitHub Pages.
    // Externe AI-/voorlees-verzoeken (Groq/Gemini/Google TTS) worden NIET
    // gecachet en gaan gewoon naar het netwerk als er verbinding is.
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,woff2,woff,ttf}'],
        cleanupOutdatedCaches: true,
      },
      manifest: {
        name: 'Nederlands leren in Gent',
        short_name: 'NL leren',
        description:
          'Leer Nederlands (Vlaams) voor Gent — een cursus op maat van Marokkaans-Darija sprekers.',
        lang: 'nl-BE',
        dir: 'ltr',
        theme_color: '#154ce1',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          // SVG-icoon (schaalt naar elke grootte). Voor een nóg betrouwbaardere
          // "toevoegen aan beginscherm" op oudere Android kunnen later PNG's
          // van 192x192 en 512x512 toegevoegd worden.
          { src: 'favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' },
        ],
      },
    }),
  ],
  server: {
    host: true,
    port: 5173,
  },
}))
