import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Fondos
        app:          "#0f1117",
        card:         "#1a1d27",
        "card-hover": "#1e2235",

        // Acento
        accent: {
          DEFAULT: "#4F7FFF",
          hover:   "#3d6ee0",
          bg:      "rgba(79,127,255,0.12)",
          border:  "rgba(79,127,255,0.30)",
        },

        // Bordes
        line:         "#2d3148",
        "line-strong":"#3d4268",

        // Texto
        "txt-primary":     "#f0f2f8",
        "txt-body":        "#e8eaf0",
        "txt-secondary":   "#9ca3af",
        "txt-muted":       "#6b7280",
        "txt-placeholder": "#4b5268",

        // Tendencia
        trend: {
          DEFAULT: "#34d399",
          bg:      "rgba(52,211,153,0.10)",
          border:  "rgba(52,211,153,0.25)",
        },

        // Plataformas
        twitter:  "#1da1f2",
        youtube:  "#ff4444",
        facebook: "#4267b2",
        news:     "#f59e0b",
      },

      borderWidth: {
        px: "0.5px",
        "1px": "1px",
      },

      keyframes: {
        scanPulse: {
          "0%, 100%": { height: "8px",  opacity: "0.3" },
          "50%":      { height: "36px", opacity: "1"   },
        },
      },
      animation: {
        "scan-pulse": "scanPulse 1.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;