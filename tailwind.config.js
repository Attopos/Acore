/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#0c1015',
        panel: '#121821',
        panelSoft: '#171f2b',
        line: 'rgba(161, 178, 199, 0.14)',
        mist: '#9aa6b2',
        ink: '#edf2f7',
        cool: '#7fb4d6',
        warm: '#d8a873',
      },
      boxShadow: {
        card: '0 18px 40px rgba(0, 0, 0, 0.24)',
        modal: '0 24px 80px rgba(0, 0, 0, 0.42)',
      },
      fontFamily: {
        sans: [
          'Sohne',
          'Neue Haas Grotesk Display Pro',
          'SF Pro Display',
          'Segoe UI',
          'system-ui',
          'sans-serif',
        ],
      },
      letterSpacing: {
        calm: '0.02em',
      },
    },
  },
  plugins: [],
}
