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
        background: "var(--background)",
        foreground: "var(--foreground)",
        gospel: {
          dark: "#0B1120",
          card: "#0F172A",
          gold: "#F59E0B",
          goldLight: "#FBBF24",
          goldDark: "#D97706",
          accent: "#38BDF8",
        },
      },
    },
  },
  plugins: [],
};
export default config;
