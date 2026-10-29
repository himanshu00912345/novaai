/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      colors: {
        nova: {
          dark: "#030712",
          navy: "#070b19",
          slate: "#0f172a",
          card: "rgba(13, 20, 38, 0.7)",
          cardHover: "rgba(19, 30, 58, 0.85)",
          border: "rgba(255, 255, 255, 0.08)",
          borderBright: "rgba(255, 255, 255, 0.18)",
          cyan: "#00f0ff",
          blue: "#38bdf8",
          indigo: "#6366f1",
          violet: "#a855f7",
          purple: "#c084fc",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "cyber-grid": "linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)",
        "hero-glow": "radial-gradient(circle at 50% 30%, rgba(99, 102, 241, 0.15), rgba(0, 240, 255, 0.05) 45%, transparent 70%)",
        "card-glass": "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)",
      },
      boxShadow: {
        "glow-cyan": "0 0 30px -5px rgba(0, 240, 255, 0.3)",
        "glow-cyan-lg": "0 0 50px -10px rgba(0, 240, 255, 0.4)",
        "glow-violet": "0 0 30px -5px rgba(168, 85, 247, 0.3)",
        "glow-violet-lg": "0 0 50px -10px rgba(168, 85, 247, 0.4)",
        "glow-indigo": "0 0 35px -5px rgba(99, 102, 241, 0.3)",
        "inner-glow": "inset 0 1px 1px 0 rgba(255, 255, 255, 0.12)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float-slow": "float 6s ease-in-out infinite",
        "float-delayed": "float 7s ease-in-out 2s infinite",
        "shimmer": "shimmer 2.5s infinite linear",
        "glow-pulse": "glowPulse 3s ease-in-out infinite alternate",
        "radar-spin": "spin 12s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        glowPulse: {
          "0%": { opacity: "0.4", filter: "blur(20px)" },
          "100%": { opacity: "0.8", filter: "blur(30px)" },
        },
      },
    },
  },
  plugins: [],
};
