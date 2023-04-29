/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  plugins: [],
  theme: {
    colors: {
      'background': '#F5F3EC',
      'light-green': '#B6E3C5'
    }
  }
}
