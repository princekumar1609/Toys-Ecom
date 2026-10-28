/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#FAF8F3',
          light: '#FFFFFF',
          subtle: '#F1EEE7',
          surface: '#F5F2EA',
          border: '#E8E4DC',
        },
        charcoal: {
          DEFAULT: '#292A26',
          hover: '#45463F',
          light: '#77766F',
        },
        sage: {
          DEFAULT: '#A8B5A0',
          light: '#D2DBD0',
          dark: '#7E8F75',
          surface: '#F3F6F2',
        },
        terracotta: {
          DEFAULT: '#C98268',
          light: '#E4AEA0',
          dark: '#A35D43',
          surface: '#FCF5F2',
        },
        border: {
          DEFAULT: '#E8E4DC',
          subtle: '#E8E4DC',
          dark: '#292A26',
        },
        brand: {
          primary: '#292A26',
          hover: '#45463F',
          secondary: '#77766F',
          accent: '#A8B5A0',
          terracotta: '#C98268',
          bg: '#FAF8F3',
          surface: '#F1EEE7',
          border: '#E8E4DC',
        }
      },
      fontFamily: {
        sans: ['"DM Sans"', 'Inter', 'sans-serif'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        heading: ['"DM Sans"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
