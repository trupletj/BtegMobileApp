/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./<custom directory>/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "#7367f0",
      },
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /(bg|text|border)-main/,
    },
  ],
};
