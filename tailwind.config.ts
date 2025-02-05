/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      'md': '984px',
    },
    extend: {
      colors: {
        'primary': '#1E1E1E',
        'secondary': '#4F1294',
        'third': '#A78FFF'
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans'],
        'pacifico': ['Pacifico', 'sans']
      },
      backgroundImage: {
        'custom-radial': `
        radial-gradient(
          -57deg,
          #7B07FF 0%, #35036F 56%, #000000 100%
        ),
        radial-gradient(
          177deg,
          #7B07FF 0%, #3F1E64 50%, #1E1E1E 100%
        )
        `,
      },
    },
  },
  plugins: [],
  }
