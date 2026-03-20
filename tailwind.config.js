/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      letterSpacing: {
        calm: '0.02em',
      },
    },
  },
  plugins: [],
}
