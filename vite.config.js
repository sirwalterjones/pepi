import path from "path" // Import path module
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: { // Add resolve section
    alias: {
      "@": path.resolve(__dirname, "./src"), // Define the alias
    },
  },
}) 