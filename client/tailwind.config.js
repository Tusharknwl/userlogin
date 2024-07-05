/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "md-dark":
          "0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -2px rgba(0, 0, 0, 0.5)",
      },
      dropShadow: {
        "md-dark": "2px 2px 2px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};
