module.exports = {
  content: [
    "./index.html",
    "./examples/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        darkBg: "#0b0b0f",
        cardBg: "rgba(255, 255, 255, 0.03)",
        borderColor: "rgba(255, 255, 255, 0.08)",
        brand: "#6366f1",
        brandGlow: "rgba(99, 102, 241, 0.15)",
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "sans-serif"],
        display: ["'Outfit'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      }
    },
  },
  plugins: [],
}
