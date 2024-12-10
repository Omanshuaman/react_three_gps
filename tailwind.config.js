/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        tvOpen: {
          "0%": { transform: "scaleY(0)", opacity: "0" },
          "50%": { transform: "scaleY(0.1)", opacity: "1" },
          "100%": { transform: "scaleY(1)" },
        },
         'fade-in-out': {
          '0%, 100%': { opacity: 0 },
          '50%': { opacity: 1 },
        },
      },
      animation: {
        tvOpen: "tvOpen 1s ease-in-out forwards",
                'fade-in-out': 'fade-in-out 2s ease-in-out infinite',

      },
      backgroundImage: {
        "snowy-gradient": "linear-gradient(to bottom, #f0f8ff, #ffffff)", // Adjust colors for a snowy effect
      },
    },
  },
  plugins: [],
};
