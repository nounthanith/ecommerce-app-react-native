/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#7C3AED',
          dark: '#8B5CF6',
        },
        background: {
          light: '#F9FAFB',
          dark: '#111827',
        },
        text: {
          light: '#6B7280',
          dark: '#9CA3AF',
        },
      },
    },
  },
  plugins: [],
}
