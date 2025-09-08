import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api-laravel-production-d683.up.railway.app',
        changeOrigin: true,
        secure: true,
      }
    }
  }
})