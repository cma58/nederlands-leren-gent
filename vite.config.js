import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

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
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
}))
