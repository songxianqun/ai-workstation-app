import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FBF6EE',
          100: '#F5EAD3',
          200: '#E8D4A8',
          300: '#D4B483',
          400: '#C19A6B',
          500: '#A87B4F',
          600: '#8B6540',
        },
      },
    },
  },
  plugins: [],
} satisfies Config
