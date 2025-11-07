import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          pink100: "var(--brand-pink-100)",
          pink300: "var(--brand-pink-300)",
          pink500: "var(--brand-pink-500)",
          purple600: "var(--brand-purple-600)",
          purple800: "var(--brand-purple-800)",
        },
        neutral: {
          ui: {
            bg: "var(--bg)",
            bgElevated: "var(--bg-elevated)",
            surface: "var(--surface)",
            offwhite: "var(--offwhite)",
            text: "var(--text)",
            textMuted: "var(--text-muted)",
            border: "var(--border)",
          },
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        card: "var(--shadow-card)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
      },
    },
  },
  plugins: [],
};

export default config;

