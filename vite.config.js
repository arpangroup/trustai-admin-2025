import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/', // 👈 Important!
  plugins: [react()],
  server: {
    proxy: {
      // This proxies any request starting with /api to your backend server
      '/api': {
        target: 'http://localhost:8080', // Replace with your backend URL
        changeOrigin: true,
        secure: false,
        // Optionally rewrite the path
        // rewrite: (path) => path.replace(/^\/api/, ''),  // remove /api prefix when proxying
      },
    },
    historyApiFallback: true,
  },
})

