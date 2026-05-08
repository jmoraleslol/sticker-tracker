/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        panini: {
          red: '#E63946',
          blue: '#1D3557',
          gold: '#F4A261',
        },
      },
    },
  },
  plugins: [],
}
