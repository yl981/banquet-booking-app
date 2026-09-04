/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#a07127', // Gold/bronze accent from uploaded reference image
          hover: '#8a5e1d',
          light: '#f7f1e5',
          dark: '#5c3f11',
        },
        gold: {
          50: '#faf6ee',
          100: '#f3e8d2',
          200: '#e7d2a8',
          300: '#d8b678',
          400: '#ca974d',
          500: '#a07127',
          600: '#8c5d1e',
          700: '#70461b',
          800: '#5c381c',
          900: '#4c2e1b',
        },
        charcoal: {
          DEFAULT: '#1c1b18',
          light: '#2d2b26',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        script: ['Caveat', 'Dancing Script', 'cursive'],
      },
    },
  },
  plugins: [],
}
