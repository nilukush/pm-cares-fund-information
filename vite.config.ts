import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Non-standard ports per project constraint: dev 5199, preview 4199.
// GitHub Pages mirror serves under /pm-cares-fund-information/ (set via GITHUB_ACTIONS,
// not CI, because Vercel also sets CI=true but serves at the domain root).
export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/pm-cares-fund-information/' : '/',
  plugins: [react(), tailwindcss()],
  server: {
    port: 5199,
    strictPort: true,
    host: true,
  },
  preview: {
    port: 4199,
    strictPort: true,
    host: true,
  },
  test: {
    environment: 'jsdom',
    globals: false,
    setupFiles: './src/test/setup.ts',
    css: false,
  },
})
