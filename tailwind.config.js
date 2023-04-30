import { fontFamily } from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export const content = [
  './src/pages/**/*.{js,ts,jsx,tsx}',
  './src/components/**/*.{js,ts,jsx,tsx}',
  './src/app/**/*.{js,ts,jsx,tsx}',
]
export const plugins = []
export const theme = {
  extend: {
    fontFamily: {
      mono: ['var(--font-ibm-mono)', ...fontFamily.mono],
      sans: ['var(--font-ibm-sans)', ...fontFamily.sans]
    },
  },
  colors: {
    'background': '#F5F3EC',
    'light-green': '#B6E3C5',
    'white': '#FFFFFF',
    'black': '#000000'
  }
}
