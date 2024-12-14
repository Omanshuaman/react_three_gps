/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "snowy-gradient": "linear-gradient(to bottom, #f0f8ff, #ffffff)", // Adjust colors for a snowy effect
      },
      keyframes: {
        tvOpen: {
          "0%": { transform: "scaleY(0)", opacity: "0" },
          "50%": { transform: "scaleY(0.1)", opacity: "1" },
          "100%": { transform: "scaleY(1)" },
        },
        tvClose: {
          "0%": { transform: "scaleY(0.7) scale(0.7)", opacity: "0.85" },
          "50%": { transform: "scaleY(0.1) scale(0.7)", opacity: "1" },
          "100%": { transform: "scaleY(0) scale(0.7)", opacity: "0" },
        },
        "fade-in-out": {
          "0%, 100%": { opacity: 0 },
          "50%": { opacity: 1 },
        },
      },
      animation: {
        tvOpen: "tvOpen 1s ease-in-out forwards",
        tvClose: "tvClose 1s ease-in-out forwards",
        "fade-in-out": "fade-in-out 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
