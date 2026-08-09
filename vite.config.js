import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// Bij een build voor GitHub Pages worden de bestanden geserveerd onder
// https://<gebruiker>.github.io/nederlands-leren-gent/, dus moet `base` naar
// de repo-naam wijzen. In dev (vite dev-server) blijft alles gewoon op '/'.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/nederlands-leren-gent/' : '/',
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
}))
