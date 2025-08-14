/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        textPrimary: "#0486b9",
        hoverTextPrimary: "#3e7266",
        borderColor: "#1f4e43",
        accent: "#1c6e77",
        softGreen: "#3ab480",
        mutedPurple: "#a33a94",
        lightGray: "#fdf0f1",
      },
    },
  },
  plugins: [daisyui, require("@tailwindcss/typography")],
};
