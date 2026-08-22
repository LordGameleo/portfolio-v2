/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        agustina:  ['var(--font-agustina)', 'cursive'],
        montserrat:['var(--font-montserrat)', 'sans-serif'],
        space:     ['var(--font-space)', 'sans-serif'],
        orbitron:  ['var(--font-orbitron)', 'sans-serif'],
      },
      colors: {
        background: '#080808',
        'violet-950': '#2e1065',
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
      },
    },
  },
  plugins: [],
}
