import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),],
  server: {
    allowedHosts: [
      'https://b4e8-181-237-203-105.ngrok-free.app',
      'b4e8-181-237-203-105.ngrok-free.app'
    ]
  }
})
