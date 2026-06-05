import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx,mdx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // === OFFICIAL CLINIC GENIE COLOUR BRAND GUIDE ===
        // Genie Cyan (primary accent #18C4D9) — tints
        genie: {
          10:  "#E6FAFB",
          20:  "#CCF4F6",
          40:  "#99E9ED",
          60:  "#66DDE6",
          80:  "#33D0DD",
          100: "#18C4D9",
          DEFAULT: "#18C4D9",
          // Kept for backwards compat with existing class names in pages
          200: "#CCF4F6",
          300: "#78E2DD",
          400: "#33D0DD",
          500: "#18C4D9",
          600: "#13A8BA",
          700: "#0E8FA0",
          800: "#0E5F6B",
          900: "#062D36",
        },
        // Strategic Teal (primary dark #062D36) — shades
        // Prefixed "cg-teal" to avoid conflict with Tailwind's built-in "teal" scale
        "cg-teal": {
          5:   "#F0F7F8",
          10:  "#E0F2F4",
          20:  "#1A8C99",
          40:  "#13737F",
          60:  "#0E5F6B",
          80:  "#0B4652",
          100: "#062D36",
          DEFAULT: "#062D36",
        },
        // night aliases kept so existing pages don't break
        night: {
          700:     "#0E5F6B",
          800:     "#0B4652",
          850:     "#083C47",
          900:     "#062D36",
          950:     "#041F27",
          DEFAULT: "#062D36",
        },
        // Soft Aqua (secondary accent #78E2DD)
        "cg-aqua": {
          DEFAULT: "#78E2DD",
          light:   "#CCF4F6",
          dark:    "#4DCFC9",
        },
        // Clinical Sky / Trust Blue
        "cg-sky": {
          DEFAULT: "#7DAFE3",
          light:   "#B0CFF0",
        },
        "cg-mist":       "#EAFBFB",  // Background Tint (Mist Aqua)
        "cg-soft-grey":  "#E6EEF1",  // Divider / Border
        "cg-slate":      "#395D66",  // Body Text (Slate Teal)

        // Ink tokens (mapped to official colours)
        ink: {
          900: "#062D36",
          700: "#395D66",
          500: "#13737F",
        },
        onDark: {
          DEFAULT: "#FFFFFF",
          muted:   "#CCF4F6",
          faint:   "#78E2DD",
        },
        hairline: {
          light: "#E6EEF1",
          dark:  "#0B4652",
        },
        // Spark kept for backwards-compat — remapped to official palette
        spark: {
          cyan:   "#78E2DD",
          violet: "#7DAFE3",
          gold:   "#DDF7F8",
        },
        feedback: {
          success: "#3FB984",
          warning: "#E2A53A",
          error:   "#E5614B",
          info:    "#18C4D9",
        },
      },
      fontFamily: {
        display: ["var(--font-sora)", "Sora", "ui-sans-serif", "system-ui", "sans-serif"],
        sans:    ["var(--font-inter)", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono:    ["var(--font-jetbrains)", "JetBrains Mono", "ui-monospace", "monospace"],
      },
      fontSize: {
        kicker: ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.18em", fontWeight: "600" }],
        lead:   ["1.25rem", { lineHeight: "1.6" }],
        body:   ["1.0625rem", { lineHeight: "1.7" }],
        h4: ["1.25rem", { lineHeight: "1.3", letterSpacing: "-0.005em", fontWeight: "600" }],
        h3: ["clamp(1.375rem,1.1rem + 1.1vw,1.75rem)", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "600" }],
        h2: ["clamp(2rem,1.4rem + 2.6vw,3rem)", { lineHeight: "1.12", letterSpacing: "-0.015em", fontWeight: "700" }],
        h1: ["clamp(2.5rem,1.6rem + 4.2vw,4.5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "700" }],
      },
      spacing: {
        section:    "6rem",
        "section-lg": "10rem",
        gutter:     "1.5rem",
        "gutter-lg": "2.5rem",
      },
      maxWidth: {
        content: "75rem",
        wide:    "82.5rem",
        prose:   "45rem",
      },
      borderRadius: {
        xs: "6px", sm: "10px", md: "14px", lg: "20px",
        xl: "28px", "2xl": "36px", pill: "999px", orb: "50%",
      },
      boxShadow: {
        xs:   "0 1px 2px rgba(6,45,54,0.06)",
        sm:   "0 2px 8px rgba(6,45,54,0.06), 0 1px 2px rgba(6,45,54,0.04)",
        md:   "0 8px 24px rgba(6,45,54,0.10), 0 2px 6px rgba(6,45,54,0.06)",
        lg:   "0 20px 50px rgba(6,45,54,0.14), 0 6px 14px rgba(6,45,54,0.08)",
        card: "0 12px 32px rgba(6,45,54,0.10)",
        "glow-orb":       "0 0 80px 12px rgba(24,196,217,0.55), 0 0 160px 40px rgba(24,196,217,0.30), 0 0 240px 80px rgba(120,226,221,0.18)",
        "glow-sm":        "0 0 16px rgba(24,196,217,0.5)",
        "glow-md":        "0 0 28px rgba(24,196,217,0.55), 0 0 56px rgba(24,196,217,0.28)",
        "glow-cta":       "0 8px 24px rgba(11,70,82,0.35), inset 0 0 0 1px rgba(24,196,217,0.4)",
        "glow-cta-hover": "0 10px 30px rgba(11,70,82,0.45), 0 0 36px rgba(24,196,217,0.6)",
        "glow-cyan":      "0 0 24px rgba(120,226,221,0.6)",
        "glow-sky":       "0 0 40px rgba(125,175,227,0.4)",
        "glass-dark":     "inset 0 1px 0 rgba(255,255,255,0.18), 0 16px 40px rgba(4,31,39,0.5)",
        "glass-light":    "0 8px 24px rgba(6,45,54,0.08), inset 0 1px 0 rgba(255,255,255,0.8)",
        focus:            "0 0 0 3px rgba(24,196,217,0.55), 0 0 0 5px rgba(6,45,54,0.9)",
      },
      backgroundImage: {
        // === Official Clinic Genie gradients ===
        "aurora-hero":   "linear-gradient(160deg, #062D36 0%, #0B4652 55%, #083C47 100%)",
        "primary-grad":  "linear-gradient(135deg, #EAFBFB 0%, #FFFFFF 50%, #DDF7F8 100%)",
        "accent-glow":   "linear-gradient(135deg, #18C4D9 0%, #78E2DD 100%)",
        "premium-dark":  "linear-gradient(160deg, #062D36 0%, #0B4652 100%)",
        // Legacy names kept so existing pages don't break
        "conjure-sweep": "linear-gradient(135deg, #18C4D9 0%, #78E2DD 50%, #7DAFE3 100%)",
        "plasma-orb":    "radial-gradient(circle at 35% 30%, #EAFBFB 0%, #78E2DD 20%, #18C4D9 48%, #0E5F6B 78%, #062D36 100%)",
        "genie-text":    "linear-gradient(92deg, #18C4D9, #78E2DD 60%, #7DAFE3)",
        "orb-bloom":     "radial-gradient(closest-side, rgba(24,196,217,.55), rgba(24,196,217,0) 70%)",
        "clarity-fade":  "linear-gradient(180deg, #062D36 0%, #0B4652 40%, #EAFBFB 100%)",
        "stardust":      "radial-gradient(2px 2px at 20% 30%, rgba(120,226,221,0.8), transparent), radial-gradient(1px 1px at 60% 70%, rgba(125,175,227,0.7), transparent), radial-gradient(1.5px 1.5px at 80% 20%, rgba(221,247,248,0.5), transparent)",
      },
      backdropBlur: {
        glass:        "20px",
        "glass-light": "16px",
      },
      transitionTimingFunction: {
        genie:     "cubic-bezier(0.22, 1, 0.36, 1)",
        "out-soft": "cubic-bezier(0.16, 1, 0.3, 1)",
        float:     "cubic-bezier(0.45, 0, 0.55, 1)",
      },
      transitionDuration: {
        micro: "180ms", ui: "300ms", reveal: "700ms",
      },
      keyframes: {
        "orb-bob":      { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } },
        "plasma-swirl": { to: { transform: "rotate(360deg)" } },
        twinkle:        { "0%,100%": { opacity: "0.2", transform: "scale(0.85)" }, "50%": { opacity: "1", transform: "scale(1.1)" } },
        "glow-breathe": { "0%,100%": { opacity: "0.85" }, "50%": { opacity: "1" } },
        "rise-in":      { from: { opacity: "0", transform: "translateY(20px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        "shimmer-sweep":{ "0%": { backgroundPosition: "-150% 0" }, "100%": { backgroundPosition: "250% 0" } },
        "spin-slow":    { to: { transform: "rotate(360deg)" } },
      },
      animation: {
        "orb-bob":       "orb-bob 7s cubic-bezier(0.45,0,0.55,1) infinite",
        "plasma-swirl":  "plasma-swirl 24s linear infinite",
        twinkle:         "twinkle 3s ease-in-out infinite",
        "glow-breathe":  "glow-breathe 6s ease-in-out infinite",
        "rise-in":       "rise-in 700ms cubic-bezier(0.22,1,0.36,1) both",
        "shimmer-sweep": "shimmer-sweep 1.2s cubic-bezier(0.22,1,0.36,1) 1",
        "spin-slow":     "spin-slow 40s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
