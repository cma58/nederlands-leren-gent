import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig(() => ({
  // Frontend en beveiligde API draaien samen op de root van de Worker-origin.
  base: '/',
  plugins: [
    react(),
    // Service worker + manifest: maakt de app-schil (HTML/JS/CSS) offline
    // beschikbaar en installeerbaar op het beginscherm. De service worker
    // API-antwoorden vallen niet onder de statische precache.
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
          'Leer Nederlands voor het dagelijkse leven in Gent, met hulp in Darija in Latijnse letters.',
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
    // Tijdens ontwikkeling draait `wrangler dev` op 8787. Productie serveert
    // frontend en /api vanaf dezelfde origin, zodat de HttpOnly-cookie first-party is.
    proxy: {
      '/api': 'http://127.0.0.1:8787',
    },
  },
}))
