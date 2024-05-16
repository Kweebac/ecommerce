/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        fraunces: ["Fraunces", "sans-serif"],
      },
      colors: {
        green: {
          1: "#f5f0e8",
          2: "#f5f0e6",
          3: "#4b654b",
        },
        white: {
          1: "#ffffff",
          2: "#edf0ed",
          3: "#90a195",
        },
      },
    },
  },
  plugins: [],
};
