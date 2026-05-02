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
          50: "#F2F5FA",
          100: "#E1E8F3",
          200: "#C3D0E6",
          300: "#A5B9D9",
          400: "#879FCC",
          500: "#6E88B0",
          600: "#5E769E",
          700: "#4D6388",
          800: "#3D5070",
          900: "#2B3A52",
        },
        navy: {
          DEFAULT: "#2B3A52",
          light: "#3D5070",
          dark: "#1B2433",
        },
        sand: {
          50: "#FCF8F4",
          100: "#F8EFE7",
          200: "#F2E0D0",
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
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
