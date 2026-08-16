import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Non-standard ports per project constraint: dev 5199, preview 4199.
// On GitHub Actions (CI=true) assets are served from /pm-cares-fund-information/.
export default defineConfig({
  base: process.env.CI ? '/pm-cares-fund-information/' : '/',
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
