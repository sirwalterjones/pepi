import { fontFamily } from "tailwindcss/defaultTheme"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // Include the root index.html
    "./src/**/*.{js,ts,jsx,tsx}", // Include all relevant files in src
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
    // Add Tailwind plugins here if needed
    // require("@tailwindcss/forms"),
  ],
} 