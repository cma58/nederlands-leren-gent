/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Toegankelijk leerpalet: rustig canvas, diep blauw voor structuur en
        // saffraan als warme aandachtstint. De 600-kleur is de primaire knop.
        gent: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#2563eb',
          600: '#1d4ed8',
          700: '#1e40af',
          800: '#1e3a8a',
          900: '#172554',
        },
        saffraan: {
          50: '#fff8eb',
          100: '#feefc7',
          200: '#fddc8a',
          300: '#fcc44d',
          400: '#fbae24',
          500: '#f58e0b',
          600: '#d96c06',
          700: '#b44d09',
          800: '#923c0e',
          900: '#78320f',
          950: '#422006',
        },
        canvas: '#fffdf7',
        ink: '#172033',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
        arabic: ['"Noto Naskh Arabic"', '"Segoe UI"', 'serif'],
      },
    },
  },
  plugins: [],
}
