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
          // Nested structure (new)
          pink: {
            100: "var(--brand-pink-100)",
            300: "var(--brand-pink-300)",
            500: "var(--brand-pink-500)",
          },
          purple: {
            600: "var(--brand-purple-600)",
            800: "var(--brand-purple-800)",
          },
          // Convenience aliases
          pink: "var(--brand-pink)",
          purple: "var(--brand-purple)",
          "dark-pink": "var(--brand-dark-pink)",
          // Backwards compatibility (keep existing flat keys)
          pink100: "var(--brand-pink-100)",
          pink300: "var(--brand-pink-300)",
          pink500: "var(--brand-pink-500)",
          purple600: "var(--brand-purple-600)",
          purple800: "var(--brand-purple-800)",
        },
        surface: {
          DEFAULT: "var(--surface)",
          elevated: "var(--bg-elevated)",
          offwhite: "var(--offwhite)",
          // Frosted surfaces - keep as CSS vars (complex color-mix)
          "frost-pink-70": "var(--surface-frost-pink-70)",
          "frost-pink-85": "var(--surface-frost-pink-85)",
          "frost-purple-30": "var(--surface-frost-purple-30)",
          "frost-white-90": "var(--surface-frost-white-90)",
        },
        text: {
          DEFAULT: "var(--text)",
          strong: "var(--text-strong)",
          muted: "var(--text-muted)",
          "deep-purple": "var(--text-deep-purple)",
        },
        border: {
          DEFAULT: "var(--border)",
          accent: "var(--border-accent)",
          "accent-strong": "var(--border-accent-strong)",
          // Card borders
          "card-review": "var(--card-border-review)",
          "card-podcast": "var(--card-border-podcast)",
          // Outlines
          "pink-outline": "var(--pink-outline)",
          "purple-outline": "var(--purple-outline)",
        },
        newsletter: {
          surface: "var(--newsletter-surface)",
          border: "var(--newsletter-border)",
        },
        // Keep existing neutral.ui for backwards compatibility
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
      spacing: {
        // Map our custom spacing scale to CSS variables
        1: "var(--space-1)",
        2: "var(--space-2)",
        3: "var(--space-3)",
        4: "var(--space-4)",
        6: "var(--space-6)",
        8: "var(--space-8)",
        10: "var(--space-10)",
        12: "var(--space-12)",
        16: "var(--space-16)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      fontSize: {
        // Headings with clamp() - reference CSS vars
        h1: ["var(--text-h1)", { lineHeight: "var(--lh-tight)" }],
        h2: ["var(--text-h2)", { lineHeight: "var(--lh-tight)" }],
        h3: ["var(--text-h3)", { lineHeight: "var(--lh-snug)" }],
        // Body text - reference CSS vars
        "body-lg": ["var(--text-body-lg)", { lineHeight: "var(--lh-normal)" }],
        body: ["var(--text-body)", { lineHeight: "var(--lh-normal)" }],
        caption: ["var(--text-caption)", { lineHeight: "var(--lh-normal)" }],
      },
      lineHeight: {
        tight: "var(--lh-tight)",
        snug: "var(--lh-snug)",
        normal: "var(--lh-normal)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        card: "var(--shadow-card)",
        "card-rest": "var(--card-shadow-rest)",
        "card-hover": "var(--card-shadow-hover)",
        "card-focus": "var(--card-shadow-focus)",
      },
    },
  },
  plugins: [],
};

export default config;

