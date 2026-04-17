/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#E6F0FF',
          100: '#BFCCF5',
          200: '#8FAAED',
          500: '#1A65D6',
          600: '#004AAD',
          700: '#003A8C',
          800: '#002B6B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
