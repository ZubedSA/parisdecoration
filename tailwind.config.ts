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
        background: "var(--background)",
        foreground: "var(--foreground)",
        paris: {
          gold: {
            50: "#FAF6EB",
            100: "#F4ECCE",
            200: "#E9D89E",
            300: "#DFC56F",
            400: "#D4B24B",
            500: "#C5A059", // primary champagne gold
            600: "#B08A3E",
            700: "#8C6A29",
            800: "#6B4E1B",
            900: "#4D3610",
          },
          warm: {
            50: "#FAF8F5",
            100: "#F5F0E8",
            200: "#EAE1D5",
            300: "#DDD0BF",
            400: "#C7B49F",
            500: "#A8937D",
            600: "#87735E",
            700: "#695745",
            800: "#4A3C2F",
            900: "#2B221A",
          },
          dark: {
            900: "#141413",
            800: "#1E1E1C",
            700: "#2B2B28",
            600: "#3D3D39",
          }
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-plus-jakarta)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(26, 26, 26, 0.05)",
        card: "0 10px 30px -4px rgba(26, 26, 26, 0.08)",
        gold: "0 8px 25px -4px rgba(197, 160, 89, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
