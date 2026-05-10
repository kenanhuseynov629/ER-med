import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#E8F2FF",
          100: "#D4E5FD",
          200: "#A8CAFB",
          300: "#7DAFF9",
          400: "#5194F7",
          500: "#1A73E8",
          600: "#1557B0",
          700: "#104288",
          800: "#0B2D60",
          900: "#061838",
        },
        navy: {
          DEFAULT: "#1A3A5C",
          light: "#2A5A8C",
          dark: "#0F2238",
        },
        sand: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
        },
      },
      fontFamily: {
        sans: ["Manrope", "Inter", "sans-serif"],
        display: ["Plus Jakarta Sans", "Manrope", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(15, 23, 42, 0.15)",
        premium: "0 24px 60px -24px rgba(15, 23, 42, 0.28)",
      },
      animation: {
        "float-slow": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse-slow 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.02)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
