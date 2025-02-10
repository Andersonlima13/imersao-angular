/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        customHsl:{
          warning: 'hsl(4 66% 63%)',
        }
      }
    },
  },
  plugins: [],
}

