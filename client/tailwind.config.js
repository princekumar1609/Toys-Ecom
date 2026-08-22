/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#F59E0B',    // Amber-500
          hover: '#D97706',      // Amber-600
          secondary: '#6366F1',  // Indigo-600
          accent: '#F43F5E',     // Rose-500
          bg: '#F9FAFB',         // Gray-50
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
