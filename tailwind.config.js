import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        text: "#040903",
        background: "#f3faf0",
        primary: "#76c550",
        secondary: "#90dbaf",
        accent: "#67cda3",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#76c550",
          secondary: "#90dbaf",
          accent: "#67cda3",
          neutral: "#040903",
          "base-100": "#f3faf0",
        },
      },
    ],
  },
};
