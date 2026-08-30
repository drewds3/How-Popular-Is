import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Base
        cream: "#FBF7F1",
        surface: "#FFFFFF",
        "surface-hover": "#F5ECE0",
        ink: "#2E1B12",
        "ink-soft": "#6B4A3A",
        "ink-muted": "#A0876F",
        line: "#E4D5C6",
        "line-strong": "#D8C3AE",

        // Acento (rojo ladrillo) — DEFAULT + variantes tipo "trend"
        accent: {
          DEFAULT: "#A6321E",
          hover: "#8A2A18",
          soft: "#C96A4A",
          bg: "rgba(166,50,30,0.08)",
          border: "rgba(166,50,30,0.25)",
        },

        // Tendencia (se mantiene, funciona bien sobre fondo claro)
        trend: {
          DEFAULT: "#2F8F5B",
          bg: "rgba(47,143,91,0.10)",
          border: "rgba(47,143,91,0.25)",
        },

        // Acción destructiva (cerrar sesión, eliminar, etc.)
        danger: {
          DEFAULT: "#B3261E",
          hover: "#8F1E17",
        },

        // Plataformas (colores de marca, sin cambios)
        twitter: "#1da1f2",
        youtube: "#ff4444",
        facebook: "#4267b2",
        news: "#f59e0b",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderWidth: {
        px: "0.5px",
        "1px": "1px",
      },
      keyframes: {
        scanPulse: {
          "0%, 100%": { height: "8px", opacity: "0.3" },
          "50%": { height: "36px", opacity: "1" },
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