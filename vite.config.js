import path from "path" // Import path module
import { URL, fileURLToPath } from 'url'; // Import URL helpers
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: { // Add resolve section
    alias: {
      "@": fileURLToPath(new URL('./src', import.meta.url))
    },
  },
}) 