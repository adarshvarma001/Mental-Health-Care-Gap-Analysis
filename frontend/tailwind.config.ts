import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Playfair Display", "serif"],
      },

      /* ✅ ALL KEYFRAMES TOGETHER */
      keyframes: {
        auroraSlow: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(80px, -60px)" },
        },
        auroraMedium: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(-100px, 80px)" },
        },
        auroraFast: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(60px, 100px)" },
        },

        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },

      /* ✅ ALL ANIMATIONS HERE */
      animation: {
        "aurora-slow": "auroraSlow 22s ease-in-out infinite",
        "aurora-medium": "auroraMedium 18s ease-in-out infinite",
        "aurora-fast": "auroraFast 14s ease-in-out infinite",

        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shimmer: "shimmer 2s linear infinite",
      },

      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        purple: {
          DEFAULT: "hsl(var(--purple))",
        },
        violet: {
          DEFAULT: "hsl(var(--violet))",
        },
        pink: {
          DEFAULT: "hsl(var(--pink))",
        },
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
