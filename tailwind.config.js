import { fontFamily } from "tailwindcss/defaultTheme"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // Scan files in the app directory
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    // Scan files in the src/components directory
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    // Add any other paths that contain Tailwind classes
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans], // Add Inter font
      },
      // Add other theme customizations here if needed
      // e.g., custom colors, spacing, etc.
    },
  },
  plugins: [
    // Add any plugins if needed
    // require("@tailwindcss/forms"),
  ],
} 