/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gem: {
          dark: '#0B192C',
          navy: '#1E3E62',
          orange: '#FF6500',
          light: '#F5F7FA',
          accent: '#000000',
        },
        gov: {
          blue: '#1E3A8A',
          emerald: '#059669',
          amber: '#D97706',
          red: '#DC2626',
          slate: '#0F172A',
          card: '#FFFFFF',
          border: '#E2E8F0'
        }
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'Segoe UI', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
