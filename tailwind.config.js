/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation :{
        'ping-once': 'ping 1s linear 1',
      },
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        pacifico: ['Pacifico', 'cursive']
      },
      colors: {
        'primary-orange': '#FF5722',
      }
    },
  },
  plugins: [],
}