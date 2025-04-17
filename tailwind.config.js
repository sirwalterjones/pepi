import { fontFamily } from "tailwindcss/defaultTheme"

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"], // Recommended for shadcn dark mode
  content: [
    // Scan files in the app directory
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    // Scan files in the src/components directory
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    // Add any other paths that contain Tailwind classes
  ],
  prefix: "", // Recommended for shadcn
  theme: {
    container: { // Recommended for shadcn
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans], // Add Inter font
      },
      // Add shadcn colors/variables if not using CSS variables in index.css
      // (We are using CSS variables, so this section remains minimal)
      keyframes: { // Required by tailwindcss-animate
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: { // Required by tailwindcss-animate
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    // Add any plugins if needed
    // require("@tailwindcss/forms"),
    require("tailwindcss-animate") // Add the plugin
  ],
} 