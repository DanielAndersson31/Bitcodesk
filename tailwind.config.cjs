/**
 * Make changes to all js, ts ,jsx and tsx files within the index.html folder. (Includes all subfolders available)
 * @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF6363",
        secondary: {
          100: "#E2E2D5",
          200: "#888883",
        },
      },
      fontFamily: {
        jetbrains: ["'JetBrains Mono'"],
      },
    },
  },
  plugins: [],
};
