/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: "#1A1A1A",
          light: "#FFFFFF",
        },
      },
    },
  },
  plugins: [],
};
