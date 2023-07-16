import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/pages/**/*.{js,ts,jsx,tsx}",
  "./src/components/**/*.{js,ts,jsx,tsx}",
  "./src/app/**/*.{js,ts,jsx,tsx}",
];
export const plugins = [];
export const theme = {
  fontFamily: {
    mono: ["var(--font-ibm-mono)", ...fontFamily.mono],
    sans: ["var(--font-ibm-sans)", ...fontFamily.sans],
  },
  colors: {
    background: "#F5F3EC",
    "light-purple": "#C4B6E3",
    "dark-purple": "#56407B",
    white: "#FFFFFF",
    black: "#000000",
  },
};
