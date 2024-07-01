/** @type {import('tailwindcss').Config} */
import Typography from "@tailwindcss/typography";
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [Typography],
};
