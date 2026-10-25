import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#FAF7F2",
          dark: "#F0EBE3",
        },
        stone: {
          DEFAULT: "#8B7D6B",
          light: "#A89B8C",
          dark: "#6B5E4F",
        },
        terracotta: {
          DEFAULT: "#C4816B",
          light: "#D4A08E",
          dark: "#A86A55",
        },
        sage: {
          DEFAULT: "#5E7A6B",
          light: "#7A9A88",
          dark: "#4A6356",
        },
        charcoal: {
          DEFAULT: "#2C2C2C",
          light: "#4A4A4A",
        },
        "warm-white": "#FFFDF9",
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "Times New Roman", "serif"],
        sans: ["DM Sans", "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
