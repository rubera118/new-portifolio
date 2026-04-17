/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        body:    ['"DM Sans"', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        primary:   { DEFAULT: '#7C6FFF' },
        secondary: { DEFAULT: '#00D4AA' },
        accent:    { DEFAULT: '#FF6B9D' },
      },
    },
  },
  plugins: [],
}
