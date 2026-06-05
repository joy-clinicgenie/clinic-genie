# Clinic Genie — Build Spec

> **Project:** Clinic Genie website redesign · Next.js (App Router, TypeScript) + Tailwind CSS + react-three-fiber
> **Centerpiece:** A single persistent, interactive blue magic orb that travels with the visitor across every page.
> **Status:** Buildable v1.0 — implement top to bottom without guessing.

---

## 1. Vision & Theme

Clinic Genie is a Singapore creative-and-marketing agency built only for private and specialist medical clinics, and its site should feel like **"Conjured Clarity"** — a deep midnight-indigo world where one brand-blue genie orb is the sole source of magic, alternating with airy, near-white "clinical light" sections that carry the proof. Every page breathes between two registers: a **conjuring** register (dark, glowing, glassmorphic, orb-led) for emotion and brand, and a **clarity** register (light, spacious, high-contrast) for evidence and reading. Wonder comes from the imagery and the always-alive orb; credibility comes from specifics, restraint, and respect for the doctor's intelligence — magic is the frame, measurable results are the substance.

---

## 2. Tech Stack, Dependencies & Project Structure

### 2.1 Runtime constraint (non-negotiable)
The project runs **React 18.3** with **@react-three/fiber v8**. Do **NOT** upgrade r3f to v9 or React to 19 — v9 requires React 19. Pin `@react-three/postprocessing` to the 2.16.x line for r3f-v8 / React-18 compatibility.

### 2.2 Exact dependency list

```jsonc
// dependencies
{
  "next": "^14.2.15",
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "three": "^0.169.0",
  "@react-three/fiber": "^8.17.10",
  "@react-three/drei": "^9.114.3",
  "@react-three/postprocessing": "^2.16.3",
  "postprocessing": "^6.36.4",
  "framer-motion": "^11.11.17",
  "zustand": "^4.5.5",
  "lenis": "^1.1.13",
  "clsx": "^2.1.1",
  "tailwind-merge": "^2.5.4"
}
// devDependencies
{
  "typescript": "^5.6.3",
  "@types/react": "^18.3.11",
  "@types/react-dom": "^18.3.1",
  "@types/three": "^0.169.0",
  "tailwindcss": "^3.4.14",
  "postcss": "^8.4.47",
  "autoprefixer": "^10.4.20",
  "eslint": "^8.57.1",
  "eslint-config-next": "^14.2.15",
  "prettier": "^3.3.3",
  "prettier-plugin-tailwindcss": "^0.6.8"
}
```

Notes:
- `zustand` is the single shared orb store (chosen over plain Context for cheap subscriptions and to avoid re-render storms from the rAF loop). The interaction research's `OrbProvider`/`useOrbScene` API names are preserved as wrappers around the Zustand store.
- `lenis` (the standalone package, not `@studio-freight/lenis`) is the scroll source of truth.
- Fonts are loaded with `next/font/google` (Sora, Inter, JetBrains Mono) — no extra dependency.

### 2.3 Project structure

```
clinic-genie/
├── app/
│   ├── layout.tsx                 # Root layout: fonts, providers, persistent OrbCompanion, Nav, Footer
│   ├── globals.css                # Tailwind layers + :root vars + .glass + reduced-motion
│   ├── page.tsx                   # / (Home)
│   ├── about/page.tsx
│   ├── services/page.tsx
│   ├── portfolio/
│   │   ├── page.tsx               # /portfolio (index, filter + grid)
│   │   └── [slug]/page.tsx        # case-study detail
│   ├── genie-tips/
│   │   ├── page.tsx               # blog index
│   │   └── [slug]/page.tsx        # blog post
│   ├── meet-us/page.tsx
│   ├── contact/page.tsx
│   ├── thank-you/page.tsx
│   ├── privacy/page.tsx
│   ├── terms/page.tsx
│   ├── not-found.tsx              # "the genie can't find that page"
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── orb/
│   │   ├── OrbCompanion.tsx       # singleton mount (fixed layer) – chooses renderer
│   │   ├── MagicOrb.tsx           # capability gate / smart loader (per-page inline use)
│   │   ├── OrbCanvas.tsx          # the WebGL orb (dynamic, ssr:false)
│   │   ├── OrbBody.tsx            # shell + core + sparkles + light (inside Canvas)
│   │   ├── OrbCanvas2D.tsx        # Canvas2D plasma fallback
│   │   ├── OrbFallback.tsx        # pure-CSS aura fallback (+ static prop)
│   │   ├── variants.ts           # ORB_VARIANTS per-page tuning table
│   │   └── store.ts              # Zustand orb store + useOrbScene hook
│   ├── layout/
│   │   ├── Nav.tsx
│   │   ├── MobileMenu.tsx
│   │   ├── Footer.tsx
│   │   └── PageTransition.tsx     # AnimatePresence wrapper for route content
│   ├── ui/
│   │   ├── MagneticButton.tsx
│   │   ├── GlassCard.tsx
│   │   ├── SectionHeading.tsx
│   │   ├── Kicker.tsx
│   │   ├── SparkleField.tsx
│   │   ├── Reveal.tsx
│   │   ├── CountUp.tsx
│   │   ├── CustomCursor.tsx
│   │   ├── PointerRipples.tsx
│   │   ├── StatTrio.tsx
│   │   ├── PillarCard.tsx
│   │   ├── ProcessSteps.tsx
│   │   ├── PartnerStrip.tsx
│   │   ├── FaqAccordion.tsx
│   │   └── Container.tsx
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── MakeAWish.tsx          # "Ask the orb" router
│   │   └── BeatStage.tsx          # scrollytelling pin stage
│   ├── portfolio/
│   │   ├── FilterGrid.tsx
│   │   └── CaseCard.tsx
│   ├── blog/
│   │   ├── PostGrid.tsx
│   │   ├── PostCard.tsx
│   │   └── NewsletterCapture.tsx
│   └── contact/
│       └── ContactForm.tsx
├── lib/
│   ├── providers/
│   │   ├── LenisProvider.tsx
│   │   ├── OrbProvider.tsx        # wraps store init + WebGL probe + pointer listener
│   │   └── MotionConfig.tsx       # framer-motion reduced-motion + transition tokens
│   ├── hooks/
│   │   ├── usePointer.ts          # one global pointer MotionValue {mx,my}
│   │   ├── useReducedMotion.ts
│   │   ├── useBeat.ts             # section progress -> orb uniforms
│   │   └── useMagnetic.ts
│   ├── data/
│   │   ├── nav.ts
│   │   ├── services.ts
│   │   ├── portfolio.ts
│   │   ├── posts.ts
│   │   ├── partners.ts
│   │   └── faqs.ts
│   ├── content/                   # page copy as typed objects (single source of truth)
│   │   ├── home.ts
│   │   ├── about.ts
│   │   └── ...
│   ├── motion.ts                  # ease/dur/spring tokens
│   └── cn.ts                      # clsx + tailwind-merge helper
├── public/
│   ├── logo/                      # genie-lamp "G" + cross orb-core SVGs
│   └── images/
├── tailwind.config.ts
├── postcss.config.js
├── next.config.mjs
└── tsconfig.json
```

---

## 3. Design Tokens

### 3.1 Color palette (final)

**Anchor (brand, non-negotiable):** `genie-500 #6CBAD9` (orb core, links, glow) · `genie-200 #BFE0EE` (light tint, sparkle haze).

| Group | Token | Hex |
|---|---|---|
| Brand ramp | genie-50 / 100 / 200 / 300 / 400 | `#F0F8FC` / `#DCEFF7` / `#BFE0EE` / `#9BD0E6` / `#82C5DF` |
| | genie-500 / 600 / 700 / 800 / 900 | `#6CBAD9` / `#4A9FC4` / `#2E7FA3` / `#1E5C78` / `#143F54` |
| Night (dark bg) | night-700 / 800 / 850 / 900 / 950 | `#1E2B52` / `#16203F` / `#0F1730` / `#0B1226` / `#070B1A` |
| Sparkle | spark-cyan / violet / gold | `#7FE9F0` / `#8E7BE8` / `#FFD79A` |
| Ink (text on light) | ink-900 / 700 / 500 | `#0C1B2A` / `#2A3A4C` / `#5A6B7D` |
| On dark | onDark / muted / faint | `#EAF2F8` / `#A9BBD0` / `#6E80A0` |
| Surfaces (light) | canvas / surface-tint / hairline-light | `#FFFFFF` / `#F0F8FC` / `#E2EDF3` |
| Feedback | success / warning / error / info | `#3FB984` / `#E2A53A` / `#E5614B` / `#4A9FC4` |

**Contrast rules:** Never set `genie-500` as body text on white (fails AA). Use `genie-700 #2E7FA3` for links/text on white; reserve `genie-500` for ≥24px display or on-dark. Body on white = `ink-700`; muted = `ink-500`. Gold is the single warm accent — 1–3 per view, never UI structure.

**Gradient recipes** (mapped to Tailwind `backgroundImage` keys in §3.7):
1. **Aurora Hero** (`aurora-hero`): `radial-gradient(120% 120% at 50% 0%, #16203F 0%, #0B1226 55%, #070B1A 100%)`
2. **Conjure Sweep** (`conjure-sweep`): `linear-gradient(135deg, #6CBAD9 0%, #82C5DF 28%, #8E7BE8 72%, #7FE9F0 100%)`
3. **Plasma Orb** (`plasma-orb`): `radial-gradient(circle at 35% 30%, #EAF8FE 0%, #7FE9F0 18%, #6CBAD9 45%, #2E7FA3 78%, #143F54 100%)`
4. **Genie Text** (`genie-text`): `linear-gradient(92deg, #6CBAD9, #8E7BE8 60%, #7FE9F0)`
5. **Orb Bloom** (`orb-bloom`): `radial-gradient(closest-side, rgba(108,186,217,.55), rgba(108,186,217,0) 70%)`
6. **Clarity Fade** (`clarity-fade`): `linear-gradient(180deg, #0B1226 0%, #0F1730 40%, #F0F8FC 100%)`

### 3.2 Typography (Google Fonts)
- **Display/Headings — Sora** (600/700). H1–H2 700, H3 600.
- **Body/UI — Inter** (400 body, 500 nav/labels, 600 emphasis).
- **Mono accent — JetBrains Mono** (500) for metrics, kickers ("RESEARCH. DATA. RESULTS."), keyword chips.

Type scale (fluid `clamp`, 1.250 major-third): H1 `clamp(2.5rem,1.6rem+4.2vw,4.5rem)`/1.05/700/-0.02em · H2 `clamp(2rem,1.4rem+2.6vw,3rem)`/1.12/700/-0.015em · H3 `clamp(1.375rem,1.1rem+1.1vw,1.75rem)`/1.2/600 · H4 1.25rem/1.3/600 · Lead 1.25rem/1.6 · Body 1.0625rem(17px)/1.7 · Small 0.875rem/1.5 · Kicker 0.75rem/1.4/600/uppercase/0.18em · Button 0.9375rem/1/600/0.02em.

**Usage:** "Genie Text" gradient on **one keyword per headline max**. Headlines on dark `#EAF2F8`, on light `#0C1B2A`. Body line length ≤68ch on reading pages. Never body <16px; never Sora below H4.

### 3.3 Spacing & radii
Scale (4px base): 1=4 … 6=24, 8=32, 10=40, 12=48, 16=64, 20=80, 24=96, 32=128, 40=160. Custom: `section`=6rem (mobile) / `section-lg`=10rem (desktop) → default section padding `py-24 md:py-40`; `gutter`=1.5rem / `gutter-lg`=2.5rem; page side padding `clamp(1.25rem,5vw,2.5rem)`.

Radii: xs 6 · sm 10 · md 14 (buttons/nav pills) · lg 20 (default card) · xl 28 (feature cards) · 2xl 36 (hero glass panels) · pill 999 (CTAs/badges) · orb 50%.

Containers: `content` 1200px (75rem) · `prose` 720px (45rem) · `wide` 1320px (82.5rem). Grid 12-col, gap 24 → 40px. Orb/sparkle elements may `overflow-visible`.

### 3.4 Glows & shadows
Two families. **LIFT** (elevation, light register, faint indigo tint): `xs / sm / md / lg / card` per §3.7. **GLOW** (magical aura, dark register + interactive): `glow-orb`, `glow-sm`, `glow-md`, `glow-cta`, `glow-cta-hover`, `glow-cyan`, `glow-violet`, plus inner highlights `inner-top` / `inner-orb`. **Focus ring** always visible (`focus` shadow on dark, `0 0 0 3px rgba(46,127,163,0.5)` on light). Glow is reserved for orb, primary CTAs, focus, and ≤1 accent per section; light/clarity sections use Lift only. Glows are **static** under reduced-motion (no pulsing).

### 3.5 Glassmorphism
Two register-specific tiers, each pairing `backdrop-blur` with a semi-opaque fallback + 1px hairline + top inner highlight ("rim of light").
- **Glass on dark** (hero panels, floating nav, CTA pills): `bg rgba(255,255,255,0.06)` over fallback `rgba(22,32,63,0.6)`; `backdrop-filter: blur(20px) saturate(140%)`; border `rgba(255,255,255,0.14)`; shadow `inset 0 1px 0 rgba(255,255,255,0.22), 0 16px 40px rgba(7,11,26,0.5)`. Brand-tint variant: base `rgba(108,186,217,0.10)`.
- **Glass on light** (proof cards, sticky CTA bar): `bg rgba(255,255,255,0.7)`; `blur(16px) saturate(120%)`; border `rgba(226,237,243,0.9)`; shadow `glass-light`.
- **Rules:** max blur 20px; never long body copy on glass; on-dark glass text stays `#EAF2F8`. Provide a no-`backdrop-filter` fallback class (`@supports not`) bumping fill opacity to ~0.85.

### 3.6 Motion
Language: *"The genie conjures, then settles."* Easing: `genie cubic-bezier(0.22,1,0.36,1)` (entrances), `out-soft cubic-bezier(0.16,1,0.3,1)` (hover/micro), `float cubic-bezier(0.45,0,0.55,1)` (orb idle), `standard cubic-bezier(0.4,0,0.2,1)` (color/opacity). Durations: micro 150–200ms · ui 250–350ms · reveal 600–800ms · orb idle 6–10s · page transition 400ms. Reveals: `translateY(16–24px)` + opacity 0→1 (+ optional `blur(6px)→0`), stagger 60–90ms, trigger once at ~15% in-view. Keyword gradient does a 700ms shimmer once on first view. Parallax on orb/stardust only (≤20–40px), never on text. Sticky nav condenses after 80px. No scroll-jacking.

**Animate:** orb, sparkles, section entrances, CTA hover/glow, nav condense, keyword shimmer, stat count-ups.
**Never animate:** body paragraphs, form fields while typing, layout-reflowing surfaces, infinite text/large-surface pulses.

### 3.7 Tailwind `theme.extend` (paste-ready)

```ts
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx,mdx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        genie: {
          50: "#F0F8FC", 100: "#DCEFF7", 200: "#BFE0EE", 300: "#9BD0E6",
          400: "#82C5DF", 500: "#6CBAD9", 600: "#4A9FC4", 700: "#2E7FA3",
          800: "#1E5C78", 900: "#143F54", DEFAULT: "#6CBAD9",
        },
        night: { 700: "#1E2B52", 800: "#16203F", 850: "#0F1730", 900: "#0B1226", 950: "#070B1A", DEFAULT: "#0B1226" },
        spark: { cyan: "#7FE9F0", violet: "#8E7BE8", gold: "#FFD79A" },
        ink: { 900: "#0C1B2A", 700: "#2A3A4C", 500: "#5A6B7D" },
        onDark: { DEFAULT: "#EAF2F8", muted: "#A9BBD0", faint: "#6E80A0" },
        hairline: { light: "#E2EDF3", dark: "#1E2B52" },
        feedback: { success: "#3FB984", warning: "#E2A53A", error: "#E5614B", info: "#4A9FC4" },
      },
      fontFamily: {
        display: ["var(--font-sora)", "Sora", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "JetBrains Mono", "ui-monospace", "monospace"],
      },
      fontSize: {
        kicker: ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.18em", fontWeight: "600" }],
        lead: ["1.25rem", { lineHeight: "1.6" }],
        body: ["1.0625rem", { lineHeight: "1.7" }],
        h4: ["1.25rem", { lineHeight: "1.3", letterSpacing: "-0.005em", fontWeight: "600" }],
        h3: ["clamp(1.375rem,1.1rem + 1.1vw,1.75rem)", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "600" }],
        h2: ["clamp(2rem,1.4rem + 2.6vw,3rem)", { lineHeight: "1.12", letterSpacing: "-0.015em", fontWeight: "700" }],
        h1: ["clamp(2.5rem,1.6rem + 4.2vw,4.5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "700" }],
      },
      spacing: { section: "6rem", "section-lg": "10rem", gutter: "1.5rem", "gutter-lg": "2.5rem" },
      maxWidth: { content: "75rem", wide: "82.5rem", prose: "45rem" },
      borderRadius: { xs: "6px", sm: "10px", md: "14px", lg: "20px", xl: "28px", "2xl": "36px", pill: "999px", orb: "50%" },
      boxShadow: {
        xs: "0 1px 2px rgba(12,27,42,0.06)",
        sm: "0 2px 8px rgba(12,27,42,0.06), 0 1px 2px rgba(12,27,42,0.04)",
        md: "0 8px 24px rgba(20,32,64,0.10), 0 2px 6px rgba(20,32,64,0.06)",
        lg: "0 20px 50px rgba(20,32,64,0.14), 0 6px 14px rgba(20,32,64,0.08)",
        card: "0 12px 32px rgba(30,92,120,0.12)",
        "glow-orb": "0 0 80px 12px rgba(108,186,217,0.55), 0 0 160px 40px rgba(108,186,217,0.30), 0 0 240px 80px rgba(142,123,232,0.18)",
        "glow-sm": "0 0 16px rgba(108,186,217,0.45)",
        "glow-md": "0 0 28px rgba(108,186,217,0.5), 0 0 56px rgba(108,186,217,0.25)",
        "glow-cta": "0 8px 24px rgba(46,127,163,0.35), inset 0 0 0 1px rgba(108,186,217,0.4)",
        "glow-cta-hover": "0 10px 30px rgba(46,127,163,0.45), 0 0 36px rgba(108,186,217,0.55)",
        "glow-cyan": "0 0 24px rgba(127,233,240,0.5)",
        "glow-violet": "0 0 40px rgba(142,123,232,0.4)",
        "glass-dark": "inset 0 1px 0 rgba(255,255,255,0.22), 0 16px 40px rgba(7,11,26,0.5)",
        "glass-light": "0 8px 24px rgba(20,32,64,0.08), inset 0 1px 0 rgba(255,255,255,0.8)",
        focus: "0 0 0 3px rgba(108,186,217,0.55), 0 0 0 5px rgba(11,18,38,0.9)",
      },
      backgroundImage: {
        "aurora-hero": "radial-gradient(120% 120% at 50% 0%, #16203F 0%, #0B1226 55%, #070B1A 100%)",
        "conjure-sweep": "linear-gradient(135deg, #6CBAD9 0%, #82C5DF 28%, #8E7BE8 72%, #7FE9F0 100%)",
        "plasma-orb": "radial-gradient(circle at 35% 30%, #EAF8FE 0%, #7FE9F0 18%, #6CBAD9 45%, #2E7FA3 78%, #143F54 100%)",
        "genie-text": "linear-gradient(92deg, #6CBAD9, #8E7BE8 60%, #7FE9F0)",
        "orb-bloom": "radial-gradient(closest-side, rgba(108,186,217,0.55), rgba(108,186,217,0) 70%)",
        "clarity-fade": "linear-gradient(180deg, #0B1226 0%, #0F1730 40%, #F0F8FC 100%)",
      },
      backdropBlur: { glass: "20px", "glass-light": "16px" },
      transitionTimingFunction: {
        genie: "cubic-bezier(0.22, 1, 0.36, 1)",
        "out-soft": "cubic-bezier(0.16, 1, 0.3, 1)",
        float: "cubic-bezier(0.45, 0, 0.55, 1)",
      },
      transitionDuration: { micro: "180ms", ui: "300ms", reveal: "700ms" },
      keyframes: {
        "orb-bob": { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } },
        "plasma-swirl": { to: { transform: "rotate(360deg)" } },
        twinkle: { "0%,100%": { opacity: "0.2", transform: "scale(0.85)" }, "50%": { opacity: "1", transform: "scale(1.1)" } },
        "glow-breathe": { "0%,100%": { opacity: "0.85" }, "50%": { opacity: "1" } },
        "rise-in": { from: { opacity: "0", transform: "translateY(20px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        "shimmer-sweep": { "0%": { backgroundPosition: "-150% 0" }, "100%": { backgroundPosition: "250% 0" } },
      },
      animation: {
        "orb-bob": "orb-bob 7s cubic-bezier(0.45,0,0.55,1) infinite",
        "plasma-swirl": "plasma-swirl 24s linear infinite",
        twinkle: "twinkle 3s ease-in-out infinite",
        "glow-breathe": "glow-breathe 6s ease-in-out infinite",
        "rise-in": "rise-in 700ms cubic-bezier(0.22,1,0.36,1) both",
        "shimmer-sweep": "shimmer-sweep 1.2s cubic-bezier(0.22,1,0.36,1) 1",
      },
    },
  },
  plugins: [],
};
export default config;
```

### 3.8 `globals.css` `:root` + helpers (paste-ready)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* brand */
  --genie-200: #BFE0EE; --genie-500: #6CBAD9; --genie-700: #2E7FA3;
  /* night */
  --night-900: #0B1226; --night-950: #070B1A;
  /* text */
  --ink-900: #0C1B2A; --ink-700: #2A3A4C; --ink-500: #5A6B7D;
  --on-dark: #EAF2F8; --on-dark-muted: #A9BBD0;
  /* layout */
  --container: 75rem; --prose: 45rem;
  --page-pad: clamp(1.25rem, 5vw, 2.5rem);
  /* motion */
  --ease-genie: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-out-soft: cubic-bezier(0.16, 1, 0.3, 1);
  --dur-micro: 180ms; --dur-ui: 300ms; --dur-reveal: 700ms;
  /* orb companion sizing default */
  --orb-size: clamp(220px, 38vw, 520px);
}

@layer base {
  html { scroll-behavior: smooth; }
  body { @apply bg-night-900 text-onDark font-sans antialiased; }
  ::selection { background: rgba(108,186,217,.35); color: #fff; }
  :focus-visible { outline: none; box-shadow: var(--tw-shadow, theme(boxShadow.focus)); border-radius: 6px; }
}

@layer components {
  .glass {
    background: rgba(255,255,255,0.06);
    backdrop-filter: blur(20px) saturate(140%);
    border: 1px solid rgba(255,255,255,0.14);
    box-shadow: theme(boxShadow.glass-dark);
  }
  .glass-light {
    background: rgba(255,255,255,0.7);
    backdrop-filter: blur(16px) saturate(120%);
    border: 1px solid rgba(226,237,243,0.9);
    box-shadow: theme(boxShadow.glass-light);
  }
  .genie-text {
    background: theme(backgroundImage.genie-text);
    -webkit-background-clip: text; background-clip: text; color: transparent;
  }
  .prose-reading { max-width: var(--prose); }
}

@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .glass { background: rgba(22,32,63,0.85); }
  .glass-light { background: rgba(255,255,255,0.92); }
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: .001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .001ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 4. The Orb

### 4.1 Architecture (resolved)
**There is exactly one orb instance for the whole site.** It is mounted once in `app/layout.tsx` as `<OrbCompanion>` **outside the route slot**, inside a fixed full-viewport layer: `<div className="pointer-events-none fixed inset-0 z-30">`. The WebGL context survives App Router navigation, so the orb literally carries the visitor between rooms. Pages never instantiate their own orb; they **talk to it** through the store.

`<MagicOrb>` (the inline, per-section variant from the Orb-Tech research) is retained only for isolated decorative placements (e.g. footer mini-orb, 404) where a tiny non-companion orb is acceptable; it shares `OrbFallback`, `variants.ts`, and the same color anchors. The hero/companion is always the singleton.

Positioning is driven by **Framer Motion transform** (not layout). Each page section that wants the orb places an invisible `<div data-orb-anchor="hero" id="orb-anchor-hero" />`; a single shared `requestAnimationFrame` loop reads the active anchor's `getBoundingClientRect()` and damps the orb's spring target toward its center, so scroll/resize/layout-shift all keep it glued without jank.

### 4.2 State & API (Zustand store + hook)

```ts
// components/orb/store.ts
export type OrbMood = 'idle' | 'curious' | 'thinking' | 'focus' | 'celebrate';
export type OrbVariant = 'home'|'about'|'services'|'portfolio'|'blog'|'contact';

interface OrbState {
  mood: OrbMood;
  variant: OrbVariant;
  anchorId: string | null;     // current data-orb-anchor target
  scale: number;               // 0..1.2 target
  intensity: number;           // 0..1 glow/bloom energy target
  renderer: 'pending'|'webgl'|'canvas2d'|'css'|'static';
  isThinking: boolean;
  setScene: (p: Partial<OrbState>) => void;
  pulse: () => void;           // one-shot CTA pulse
  burst: () => void;           // celebratory sparkle burst
}
```

`useOrbScene({ mood, anchor, variant, scale?, intensity? })` is a hook called in a page/section `useEffect` (on mount and on scroll milestones) that pushes the scene into the store. The renderer maps mood → shader/material uniforms (`uTurbulence`, `uColorMix` between `#6CBAD9` core and `#BFE0EE` rim, `uPulseSpeed`, `uClickRipple`, `uMaterialize`) tweened with `THREE.MathUtils.damp` — **never hard cuts**. The pointer `{mx,my}` MotionValue (one global listener, §6.3) feeds the PointLight position.

### 4.3 `<MagicOrb>` props (inline/decorative use)

| Prop | Type | Default | Notes |
|---|---|---|---|
| `variant` | `OrbVariant` | `'home'` | Selects `ORB_VARIANTS` tuning |
| `className` | `string` | — | Sizing box; orb fills it |
| `static` | `boolean` | `false` | Force static fallback |
| `interactive` | `boolean` | `true` | Enable pointer lean |

The companion exposes no props — it is configured entirely through the store.

### 4.4 Rendering technique (WebGL path)
`<Canvas frameloop="demand" dpr={[1,1.75]} camera={{position:[0,0,5], fov:35}} gl={{powerPreference:'high-performance', antialias:false, alpha:true, stencil:false}} performance={{min:0.5}} style={{pointerEvents:'none', touchAction:'none'}}>`

Inside (`OrbBody`):
- **Refractive crystal shell:** `icosahedronGeometry(1, 12)` + drei `<MeshTransmissionMaterial transmission={1} thickness={1.2} roughness={0.08} ior={1.45} chromaticAberration={0.06} anisotropicBlur={0.4} distortion samples resolution color="#BFE0EE" attenuationColor="#6CBAD9" attenuationDistance={1.4} backside={false}/>`. `resolution` (transmission buffer) and `samples` are the dominant costs — capped per variant.
- **Inner plasma core:** `icosahedronGeometry(1,6)` scaled 0.55, `meshBasicMaterial color="#6CBAD9" toneMapped={false}`; `emissiveIntensity` (here color multiply) pulses with a slow `sin()` so it breathes and bleeds through the glass.
- **Fresnel rim:** thin shader shell mixing toward `#BFE0EE` via `pow(1 - dot(viewDir, normal), power)` — the magic-energy halo.
- **Sparkles:** drei `<Sparkles count={cfg.sparkles} scale={2.4} size={3} speed={0.4} noise={1.5} color="#BFE0EE"/>`, toneMapped path so Bloom catches them.
- **Idle motion:** drei `<Float speed={cfg.floatSpeed} rotationIntensity={0.35} floatIntensity={0.6}>` — disabled under reduced-motion.
- **Environment:** drei `<Environment preset="city" background={false}/>` (or Lightformer rig) for refraction reflections.
- **Bloom:** `<EffectComposer enableNormalPass={false}><Bloom mipmapBlur intensity={0.9} luminanceThreshold={0.6} luminanceSmoothing={0.3} kernelSize={KernelSize.LARGE}/></EffectComposer>` — mounted only when `cfg.bloom`. Selective by HDR (only emissive core + sparkles bloom).
- **Pointer lean + light follow:** in `useFrame`, lerp group rotation toward `pointer.x/y` and lerp PointLight position toward `(px*3, py*3, 3)`, then `invalidate()` so demand-mode keeps animating while visible/interacting.

### 4.5 Fallback + reduced-motion strategy
`<OrbProvider>` runs detection **once** on the client:
1. `prefers-reduced-motion` (matchMedia + framer `useReducedMotion`) → `renderer='static'`.
2. WebGL probe: try `canvas.getContext('webgl2')||'webgl'` in try/catch → if missing, `renderer='canvas2d'` (or `'css'`).
3. Low-power: `navigator.connection?.saveData`, `deviceMemory < 4`, `hardwareConcurrency <= 4`, or coarse-pointer + small viewport → `renderer='canvas2d'`/`'css'`.

- **`OrbCanvas2D`** — Canvas2D additive radial-gradient blobs swirling via rAF, paused offscreen (IntersectionObserver) and under reduced-motion.
- **`OrbFallback`** (pure CSS) — radial-gradient sphere (`#BFE0EE → #6CBAD9 → #1b3a4b`), conic `::before` plasma swirl (blurred, `animation: plasma-swirl`), radial `::after` breathing core, blurred halo via `box-shadow: glow-orb`, drifting blurred dots as sparkles. `static` prop sets `animation:none` on all layers.

All paths occupy the identical box and are `aria-hidden="true"` (decorative). All WebGL is loaded via `next/dynamic({ ssr:false })` so three.js never runs on the server; a CSS gradient placeholder paints during import. The companion API (`mood`/`anchor`/`burst`) is identical across renderers, so pages never know which is active. Under reduced-motion the orb still moves to anchors but via **instant layout jumps with crossfade**, no arcs, no bursts, no count-ups, no parallax — only a gentle 4s opacity breathe.

### 4.6 Per-page variations (one orb, mood shifts — not six orbs)
On route change the orb runs a **transit tween**: shrink to ~0.6 scale, drift to the new page's primary anchor on a slight parabolic arc (keyframed x/y with a midpoint), trailing a particle wake, then settle and bloom to full scale as content reveals. Color stays anchored to `#6CBAD9`/`#BFE0EE` on every page; variations are parameter changes only.

```ts
// components/orb/variants.ts
export const ORB_VARIANTS = {
  home:      { scale: 1.0,  floatSpeed: 1.2, distortion: 0.4,  samples: 6, resolution: 256, sparkles: 40, bloom: true },
  about:     { scale: 0.85, floatSpeed: 0.9, distortion: 0.25, samples: 6, resolution: 256, sparkles: 30, bloom: true },
  services:  { scale: 0.9,  floatSpeed: 1.4, distortion: 0.6,  samples: 5, resolution: 256, sparkles: 36, bloom: true },
  portfolio: { scale: 0.7,  floatSpeed: 1.0, distortion: 0.3,  samples: 4, resolution: 192, sparkles: 24, bloom: true },
  blog:      { scale: 0.6,  floatSpeed: 0.7, distortion: 0.2,  samples: 4, resolution: 192, sparkles: 18, bloom: false },
  contact:   { scale: 0.95, floatSpeed: 1.6, distortion: 0.7,  samples: 5, resolution: 256, sparkles: 44, bloom: true },
} as const;
```

- **Home** — largest, max energy, mouse parallax, the conjured genie core.
- **About** — calmer, smaller, slower float; reflective/trustworthy, sits beside narrative.
- **Services** — splits inner energy into 3 plasma wisps echoing the 3 pillars; more active distortion as it "works."
- **Portfolio** — compact corner companion; case visuals lead; low sparkle, keeps bloom for glints.
- **Blog** — smallest, quietest, bloom OFF, low samples; can act as scroll-progress glow.
- **Contact** — most playful: fastest float, highest sparkle/distortion, light leans hardest toward the cursor.

Mobile drops particle count and distortion ~60%, `samples` to 3–4, and disables EffectComposer/Environment on tier-0 GPUs.

### 4.7 Code sketch (canonical)

```tsx
// components/orb/MagicOrb.tsx — smart loader + capability gate
'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { OrbFallback } from './OrbFallback';
import type { OrbVariant } from './store';

const OrbCanvas = dynamic(() => import('./OrbCanvas').then(m => m.OrbCanvas), {
  ssr: false,
  loading: () => <OrbFallback variant="home" static />,
});

function canUseWebGL() {
  try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); }
  catch { return false; }
}
function isLowPower() {
  const n = navigator as any;
  return n.connection?.saveData || (n.deviceMemory && n.deviceMemory < 4)
    || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
}

export function MagicOrb({ variant = 'home', className }: { variant?: OrbVariant; className?: string }) {
  const [mode, setMode] = useState<'pending'|'webgl'|'fallback'|'static'>('pending');
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return setMode('static');
    if (!canUseWebGL() || isLowPower()) return setMode('fallback');
    setMode('webgl');
  }, []);
  return (
    <div className={className} aria-hidden="true">
      {mode === 'webgl'    && <OrbCanvas variant={variant} />}
      {mode === 'fallback' && <OrbFallback variant={variant} />}
      {(mode === 'static' || mode === 'pending') && <OrbFallback variant={variant} static />}
    </div>
  );
}
```

```tsx
// components/orb/OrbCanvas.tsx — the WebGL orb
'use client';
import { Canvas, useFrame, invalidate } from '@react-three/fiber';
import { MeshTransmissionMaterial, Sparkles, Float, Environment } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { KernelSize } from 'postprocessing';
import { useRef } from 'react';
import * as THREE from 'three';
import { ORB_VARIANTS } from './variants';

const BLUE = '#6CBAD9'; const TINT = '#BFE0EE';

function OrbBody({ variant }: { variant: keyof typeof ORB_VARIANTS }) {
  const cfg = ORB_VARIANTS[variant];
  const group = useRef<THREE.Group>(null!);
  const core  = useRef<THREE.Mesh>(null!);
  const light = useRef<THREE.PointLight>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    (core.current.material as THREE.MeshBasicMaterial).color
      .setStyle(BLUE).multiplyScalar(1.4 + Math.sin(t * 1.5) * 0.4); // breathing plasma
    const px = state.pointer.x, py = state.pointer.y;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, px * 0.4, 0.05);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -py * 0.3, 0.05);
    light.current.position.lerp(new THREE.Vector3(px * 3, py * 3, 3), 0.08);
    invalidate();
  });

  return (
    <Float speed={cfg.floatSpeed} rotationIntensity={0.35} floatIntensity={0.6}>
      <group ref={group} scale={cfg.scale}>
        <pointLight ref={light} color={BLUE} intensity={6} distance={8} />
        <mesh>
          <icosahedronGeometry args={[1, 12]} />
          <MeshTransmissionMaterial
            transmission={1} thickness={1.2} roughness={0.08} ior={1.45}
            chromaticAberration={0.06} anisotropicBlur={0.4}
            distortion={cfg.distortion} distortionScale={0.4} temporalDistortion={0.15}
            samples={cfg.samples} resolution={cfg.resolution}
            color={TINT} attenuationColor={BLUE} attenuationDistance={1.4} backside={false}
          />
        </mesh>
        <mesh ref={core} scale={0.55}>
          <icosahedronGeometry args={[1, 6]} />
          <meshBasicMaterial color={BLUE} toneMapped={false} />
        </mesh>
        <Sparkles count={cfg.sparkles} scale={2.4} size={3} speed={0.4} noise={1.5} color={TINT} />
      </group>
    </Float>
  );
}

export function OrbCanvas({ variant }: { variant: keyof typeof ORB_VARIANTS }) {
  const cfg = ORB_VARIANTS[variant];
  return (
    <Canvas frameloop="demand" dpr={[1, 1.75]} camera={{ position: [0, 0, 5], fov: 35 }}
      gl={{ powerPreference: 'high-performance', antialias: false, alpha: true, stencil: false }}
      performance={{ min: 0.5 }} style={{ pointerEvents: 'none', touchAction: 'none' }}>
      <ambientLight intensity={0.6} />
      <OrbBody variant={variant} />
      <Environment preset="city" background={false} />
      {cfg.bloom && (
        <EffectComposer enableNormalPass={false}>
          <Bloom mipmapBlur intensity={0.9} luminanceThreshold={0.6} luminanceSmoothing={0.3} kernelSize={KernelSize.LARGE} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
```

```css
/* components/orb/OrbFallback CSS layers */
.orb { border-radius:50%;
  background: radial-gradient(circle at 35% 30%, #BFE0EE 0%, #6CBAD9 45%, #1b3a4b 100%);
  box-shadow: 0 0 60px 10px rgba(108,186,217,.6); position:relative; }
.orb::before { content:''; position:absolute; inset:-25%; border-radius:50%;
  background: conic-gradient(from 0deg,#6CBAD9,#BFE0EE,#6CBAD9); filter:blur(28px);
  opacity:.55; animation: plasma-swirl 9s linear infinite; }
.orb::after  { content:''; position:absolute; inset:0; border-radius:50%;
  background: radial-gradient(circle at 60% 70%, rgba(191,224,238,.7), transparent 55%);
  animation: glow-breathe 4s ease-in-out infinite; }
.orb[data-static] , .orb[data-static]::before, .orb[data-static]::after { animation: none; }
```

### 4.8 Performance & a11y guardrails
DPR ≤1.75 · `frameloop="demand"` + `invalidate()` only while visible/animating · IntersectionObserver freezes the orb offscreen · pause on `visibilitychange` (tab hidden) · transmission `resolution` ≤256 / `samples` ≤6 desktop, 3–4 mobile · Bloom + Environment only on capable tiers · pointermove listener is **passive + ref-only** (no React re-render) · Canvas layer is `pointer-events:none` / `touch-action:none` so it never steals scroll/taps · orb is `aria-hidden`, conveys no information not in text · reduced-motion fully honored · Lenis smooth-scroll respected (pointer handling on `window`, never intercepts wheel) · static gradient poster on first paint.

---

## 5. Shared Components (prop signatures)

```ts
// Navigation
Nav: () => JSX                       // sticky glass; condenses after 80px; layoutId="nav-underline"
MobileMenu: { open: boolean; onClose: () => void }  // full-screen clip-path "lamp smoke" reveal
Footer: () => JSX                    // 4 columns + partner strip + legal + top glow hairline

// Orb (see §4)
OrbCompanion: () => JSX              // singleton, fixed layer, store-driven
MagicOrb: { variant?: OrbVariant; className?: string; static?: boolean; interactive?: boolean }
OrbCanvas: { variant: OrbVariant }
OrbFallback: { variant: OrbVariant; static?: boolean }

// Layout primitives
Container: { size?: 'content'|'wide'|'prose'; as?: ElementType; className?; children }
SectionHeading: {
  kicker?: string; title: string; highlight?: string;   // highlight = the one genie-text keyword
  subtitle?: string; align?: 'left'|'center'; tone?: 'dark'|'light'; as?: 'h1'|'h2'|'h3'
}
Kicker: { children: ReactNode; as?: 'span'|'p'; tone?: 'dark'|'light' }   // mono, uppercase, 0.18em

// Buttons & cards
MagneticButton: {
  href?: string; onClick?: () => void; variant?: 'primary'|'secondary'|'ghost';
  size?: 'sm'|'md'|'lg'; withMiniOrb?: boolean;       // 24px pulsing orb-in-button
  magnetic?: boolean; children: ReactNode; ariaLabel?: string
}
GlassCard: { tone?: 'dark'|'light'|'tint'; radius?: 'lg'|'xl'|'2xl'; hover?: boolean;
  glow?: boolean; className?; children }
PillarCard: { id: 'strategy'|'growth'|'brand'; title: string; blurb: string;
  href: string; accent?: string }                       // tints orb on hover
ProcessSteps: { steps: { n: number; title: string; body: string; deliverable?: string }[];
  orbGuide?: boolean }                                   // orb travels the steps
StatTrio: { stats: { value: string; label: string; countTo?: number; suffix?: string }[];
  tone?: 'dark'|'light' }
PartnerStrip: { intro?: string; partners: Partner[]; layout?: 'grid'|'satellite' }
FaqAccordion: { items: { q: string; a: string }[] }

// Motion / fx
Reveal: { variant?: 'up'|'scale'|'mask'; delay?: number; once?: boolean;
  as?: ElementType; children }                           // useInView once:true, margin '-10% 0px'
CountUp: { to: number; suffix?: string; prefix?: string; decimals?: number; duration?: number }
SparkleField: { density?: number; color?: 'gold'|'genie'; parallax?: boolean }  // stardust veil
CustomCursor: () => JSX                                  // dot + trailing ring; hidden on coarse pointer
PointerRipples: () => JSX                                // click ripple pool
```

Helper: `cn(...inputs)` = `twMerge(clsx(inputs))` in `lib/cn.ts`.
Motion tokens (`lib/motion.ts`): `ease.glide=[0.22,1,0.36,1]`, `ease.spring={type:'spring',stiffness:260,damping:24}`, `dur.fast=0.18`, `dur.base=0.4`, `dur.slow=0.8`. Color pulses always travel `#6CBAD9 → #BFE0EE`.

---

## 6. Interaction & Motion System

### 6.1 Orb as companion (the spine)
One `<OrbCompanion>` in the root layout, never re-mounted; pages register an anchor sequence via `useOrbScene`. A single app-wide rAF loop damps the orb toward the active anchor's rect center (rAF + spring keeps it glued through scroll/resize). Mood maps to uniforms tweened with `MathUtils.damp`. Cross-page transit = shrink → arc → settle → bloom with a particle wake.

### 6.2 Scrollytelling (Lenis = source of truth)
Wrap the app in a Lenis provider (`lerp ~0.1`). On Lenis `scroll`, set a Motion `scrollY`; derive per-section progress with `useScroll({ target, offset:['start end','end start'] })`; drive the orb's `uScroll` uniform from the same value so 3D and DOM are frame-locked. Reduced-motion disables Lenis (native scroll) and collapses scroll-tied transforms to opacity fades.

**Homepage beat map** (orb is protagonist; each beat morphs it):
- **Beat 0 Hero / Conjuring (0–100vh):** orb materializes from a spark to full plasma (600ms), sits center-right, slow breathe, `mood='idle'`; copy reveals word-by-word; on first scroll the orb shrinks slightly and the medical cross glints once.
- **Beat 1 The search (100–200vh):** `mood='curious'`; faint search phrases drift into the orb as particles and are absorbed; rim pushes toward `#BFE0EE`.
- **Beat 2 Three wishes (200–340vh, pinned):** `mood='focus'`; orb moves left and contracts; three service cards exhale out, each connected by an animated SVG light-thread.
- **Beat 3 The process (340–460vh):** orb morphs into a 3-node path; glowing line draws on scroll `pathLength`; orb parks and pulses at each node as its text reveals.
- **Beat 4 Results (460–560vh):** `mood='celebrate'`; stat counters count up `whileInView`; orb bloom + brief burst when the headline stat crosses target.
- **Beat 5 Trust/compliance (560–640vh):** `mood='focus'`, orb cools to a calmer steady glow; partner logos fade up.
- **Beat 6 CTA / make your wish (640–700vh):** orb returns to center, enlarges, leans toward cursor; primary CTA gains magnetic pull — the conversion crescendo.

Mechanics: each beat is one `<Section ref>`; `useBeat(progress)` maps 0..1 → orb uniforms + DOM transforms. Pinning via CSS `position:sticky` + tall spacer sections (no scroll-jacking lib beyond Lenis). Transform-only animations (translate/scale/opacity) for 60fps.

### 6.3 Cursor & pointer
All pointer math runs through **one** shared listener writing to global MotionValues `{mx,my}` (normalized −1..1); components subscribe (no per-component window listeners).
1. **Orb follows light, not cursor:** `{mx,my}` feed the PointLight position (clamped, parallaxed), damped (`damp` factor ~4); on idle >3s the highlight drifts in a slow Lissajous.
2. **Custom cursor (genie wisp):** 8px solid dot tracking 1:1 + 28px `#BFE0EE` 40%-opacity ring lagging via spring (stiffness 150, damping 20). Ring scales to 1.6 over links/buttons; becomes a sparkle cluster over the orb. Hidden on `pointer: coarse` and under reduced-motion (native cursor restored).
3. **Click ripples:** expanding ring at click point (scale 0→3, opacity 1→0 over 500ms); on the orb a `uClickRipple` 0→1 decay reacts through the shader. Capped pool.
4. **Parallax dust:** faint star field shifts opposite cursor (`mx*8px, my*8px`); off under reduced-motion.
5. **Device tilt (mobile):** `deviceorientation` (with iOS permission gate) drives the same `{mx,my}`; graceful no-op if denied.

### 6.4 Micro-interactions (one grammar)
- **Buttons (magnetic + conjure):** primary CTAs translate toward the cursor within ~80px (`dist*0.25`, label `dist*0.4`), spring back on leave; hover blooms a `#BFE0EE` glow + 1px sheen sweep + nudges orb mood toward `celebrate`; click = 0.96 scale dip + ripple. Secondary/ghost = sheen + border-glow only (hierarchy).
- **Cards:** hover lift `translateY(-6px)` + scale 1.02 + brand-blue shadow bloom; inner icon tilts ≤8° toward cursor (`perspective:800px`); orb-thread brightens from companion to card. Reveal with `staggerChildren:0.08`, child `y:24→0`.
- **Nav:** `layoutId="nav-underline"` slides between active links; hover char-stagger lift; mobile menu = clip-path circle expand ("lamp smoke") with staggered fade-up, orb enlarged behind at `mood='curious'`.
- **Links/text:** inline links get gradient underline (`background-size 0%→100%`); headings reveal with mask-up (overflow-hidden + y translate), `once:true`.
- **Forms:** focused field border glows `#6CBAD9`, label floats up, orb `mood='thinking'` while typing, `celebrate` + particle burst + SVG checkmark draw on success; validation error = 2px horizontal shake (`x:[-4,4,-4,0]`, 0.25s).
- **Reveals (global):** single `<Reveal>` (variants up/scale/mask) everywhere; `<CountUp>` for stats. Reduced-motion collapses all reveals to 200ms opacity fade, disables magnetic/tilt/parallax.

### 6.5 Signature "wow" moments
- **WOW #1 — The Conjuring (one-time/session):** near-black screen, single spark; the genie-lamp "G" swirl (SVG path) draws via `stroke-dashoffset` (~1.1s) and spirals inward; on completion it ignites the orb (`uMaterialize` 0→1 over 600ms), the medical cross glints once, hero copy staggers in. `sessionStorage` flag → returning users get a 400ms quick-bloom. Reduced-motion: static lit orb + simple copy fade.
- **WOW #2 — Ask the Orb / "Make a wish":** typed intent turns into particles spiraling into the orb (`mood='thinking'`, faster turbulent pulse, dim), a held ~700ms beat, then an exhale bloom pushing out an answer card (`mood='celebrate'`). State machine `idle→inhaling→thinking→answering` drives DOM + shader; deterministic client-side keyword→response map. Reduced-motion: instant text swap.
- **WOW #3 — Three Wishes orbit → process morph:** the three orbiting service-orbs converge and merge back into the central orb, which stretches into the 3-node process path with the connecting line drawing on scroll — one continuous orb group whose children + parent shape are scroll-progress driven (no unmount). Reduced-motion / no-WebGL: skip convergence, reveal a clean stepped diagram with line drawing `whileInView`.

---

## 7. Per-Page Build Plan

> Routing note: nav label for `/portfolio` is **"Our Works."** `/meet-us` is retained as a distinct route; its content is the team page. Copy below is final, ready to paste into `lib/content/*`.

### Global — Nav
Logo (genie-lamp "G" + medical-cross orb core) → `/`. Links: **About Us** → `/about` · **Services** → `/services` · **Our Works** → `/portfolio` · **Genie Tips** → `/genie-tips` · **Meet Us** → `/meet-us`. Persistent right-aligned primary CTA **"Book a strategy call"** → `/contact` (with 24px pulsing mini-orb; static glow under reduced-motion). Sticky translucent glass; logo orb-core glows on hover. Mobile: hamburger → full-screen blue-gradient overlay, larger orb floating behind links. Components: `Nav`, `MobileMenu`, `MagneticButton(withMiniOrb)`.

### Global — Footer
Components: `Footer`, `PartnerStrip`, `MagneticButton`, decorative `MagicOrb(variant="home", className 30%-intensity)`. Top edge = thin glowing `#6CBAD9 → #BFE0EE` gradient hairline.
- **Col 1 Brand:** logo · "Strategies for specialist growth. Research. Data. Results." · micro-tagline "A Singapore creative + marketing agency built only for private and specialist medical clinics." · small ambient orb beside logo (drifts slowly; click scrolls to top with sparkle trail).
- **Col 2 Explore:** Home · About Us · Services · Our Works · Genie Tips · Meet Us · Contact.
- **Col 3 What we do** (→ relevant `/services` anchors): Healthcare SEO · Medical SEM & Paid Ads · Clinic Websites & Web Dev · Content & Copywriting · AI Search Optimisation · Branding & Logo Design · Photography & Video.
- **Col 4 Get in touch:** 164 Bukit Merah Central, #03-3625, Singapore 150164 · hello@clinic-genie.com · Facebook · Instagram · LinkedIn · mini-button "Book a strategy call" → `/contact`.
- **Partner strip:** "In good company. We work alongside trusted specialists:" — Real Inbound (government grants) · Qianyi (TikTok & live) · Inteq (clinical equipment, IT & cybersecurity) · Pilot Pulse (AI patient comms).
- **Legal:** "© 2026 Clinic Genie. All rights reserved.  ·  Privacy Policy  ·  Terms of Use" + "We build healthcare marketing with advertising-compliance in mind, aligned to Singapore's PHMC/HCSA advertising guidelines."

---

### PAGE 1 — Home (`/`)
Signature interaction: **"Make a wish"** orb prompt (WOW #2). Orb variant `home`. Background alternates conjuring/clarity registers per section.

**1. Hero** — `Hero`, `SectionHeading(as=h1)`, `MagneticButton`, `Kicker`, `OrbCompanion` (anchor `hero`).
- Eyebrow: **SINGAPORE'S CLINIC MARKETING GENIE**
- H1 (highlight "trust"): **The right patients are searching. Make sure your clinic is the one they trust.**
- Subhead: *We help specialist clinics grow through healthcare SEO, medical SEM, clinic websites, content, AI search, and compliance-aware digital strategy.*
- CTAs: **Book a strategy call** → `/contact` · **See our works** → `/portfolio`
- Trust micro-line: *Trusted by aesthetic, dermatology, dental, fertility and orthopaedic clinics across Singapore.*
- Orb: hero, center-right, breathing glow + orbiting "G" ring + sparkle; cursor lean; click = sparkle burst.
- **Make-a-wish input** beneath CTAs: placeholder *"Tell the orb what your clinic needs…"* with chips: **More patients · Rank #1 on Google · A new website · Trust & compliance** → deterministic answer card + deep link to matching service.

**2. Trust bar / social proof** — `Container`, `StatTrio`, `Reveal`, orb docks top-right (`mood='celebrate'`, twinkle per count-up).
- Small heading: **Clinics we've helped grow**
- Logo row: The Acne Clinic · The Aesthetics Clinic · Stellaris Fertility · Lumière Dental · Orchard Orthopaedics
- Stats: **3.4×** average increase in qualified clinic enquiries · **Page-1 Google rankings** for high-intent treatment searches · **100%** healthcare-only — we market clinics, nothing else

**3. The problem (empathy)** — `SectionHeading`, `Reveal`; orb drifts left + dims ("before"), brightens toward next section.
- H2: **Great medicine deserves to be found.**
- Body: *You trained for years to treat patients well. But online, the clinic that ranks first, loads fast, and reads as trustworthy often wins the booking — not always the best doctor. We close that gap. Clinic Genie turns your expertise into a digital presence patients can find, believe, and book — without crossing a single advertising-compliance line.*

**4. Three service pillars (preview)** — `SectionHeading`, three `PillarCard`, `MagneticButton`; orb hovers between cards, tints toward hovered pillar's accent.
- H2 (highlight "magic"): **Three kinds of magic, one growth engine.**
- Intro: *Strategy, growth and brand — woven together, never sold in isolation.*
- Card 1 **Business Strategy & Development:** *Know exactly where to grow. Market research, strategic planning, and partnership & grant consultancy that point your clinic at the right opportunity.* → `/services#strategy`
- Card 2 **Digital Growth Solutions:** *Be the clinic patients find first. Healthcare SEO, medical SEM, conversion copywriting and lead generation that fill your appointment book.* → `/services#growth`
- Card 3 **Brand & Experience Design:** *Look as good as your outcomes. Branding & logo design, clinic websites, and photography & video that make patients trust you on sight.* → `/services#brand`
- CTA: **Explore all services** → `/services`

**5. The 3-step process** — `ProcessSteps(orbGuide)`; orb travels left→right forming each step number.
- H2: **How we conjure growth — in three moves.**
- Step 1 **Strategy & Research:** *We study your specialty, your market, your competitors and what your patients actually search for. No guesswork — just data.*
- Step 2 **Implementation & Design:** *We build the assets that win: fast clinic websites, ranking content, compliant campaigns and a brand that earns trust.*
- Step 3 **Results & Optimisation:** *We measure, report transparently, and refine every month. Rankings rise, enquiries climb, and you see exactly why.*
- Mini-tagline: **Research. Data. Results.**

**6. Featured case study** — `GlassCard`, result chips, `MagneticButton`, `Kicker`; orb powers chips in sequence.
- Eyebrow: **PROOF, NOT PROMISES**
- H2: **How The Acne Clinic doubled its qualified enquiries in 6 months.**
- Body: *A new aesthetics brand ("Face it. Fix it.") needed to own competitive acne and scarring searches in Singapore. We rebuilt the site, published compliance-aware treatment content, and ran tightly targeted medical SEM.*
- Chips: **+118% organic traffic** · **Page 1 for "acne scar treatment Singapore"** · **2.1× consult bookings**
- CTAs: **Read the case study** → `/portfolio/the-acne-clinic` · **See all works** → `/portfolio`

**7. Compliance / why healthcare-only** — `SectionHeading`, reassurance row; orb = calm steady non-flickering glow.
- H2: **Marketing that respects the rules medicine runs on.**
- Body: *Healthcare advertising in Singapore has real limits — and a generalist agency can put your licence at risk. Because we work only with clinics, compliance-awareness is built into everything we write and ship, aligned with PHMC/HCSA advertising guidelines. Ambitious growth, responsibly delivered.*
- Row: **Specialty-specific · Compliance-aware copy · Transparent reporting · Singapore-based team**

**8. Partners / ecosystem** — `PartnerStrip(layout="satellite")`; orb emits 4 satellite orblets, hover brightens the matching one.
- H2: **A genie with the right friends.**
- Intro: *When your wish needs a specialist, we bring the best in the room.*
- **Real Inbound** — *Government grant strategy, so you grow with support.*
- **Qianyi** — *TikTok and live-commerce reach for clinics ready to go social.*
- **Inteq** — *Clinical equipment, IT and cybersecurity, properly handled.*
- **Pilot Pulse** — *AI patient communications that never sleep.*

**9. Genie Tips preview** — `PostCard ×3`, `MagneticButton`; orb rests in corner, idea-sparkle floats up.
- H2: **Genie Tips — clinic growth, demystified.**
- Intro: *Practical, no-fluff advice for clinic owners. Free wishes, basically.*
- 3 latest posts (see §7 blog list) · CTA **Read Genie Tips** → `/genie-tips`

**10. Final CTA** — `SectionHeading`, `MagneticButton`; orb returns to full hero scale, brightest moment; click = celebratory burst.
- H2: **Ready to grant your clinic some growth?**
- Body: *Book a free 30-minute strategy call. We'll map where the right patients are searching — and exactly how to make your clinic the one they trust.*
- CTA: **Book a strategy call** → `/contact` · Reassurance: *No obligation. No jargon. Just a clear next step.*

---

### PAGE 2 — About Us (`/about`)
Orb variant `about` (calmer). Signature: orb as narrator/scroll-spy with a vertical light-thread timeline.

**1. Hero** — `SectionHeading(as=h1)`, `Kicker`; orb medium, gently rotating with G-ring.
- Eyebrow: **ABOUT CLINIC GENIE** · H1: **We're the genie behind Singapore's growing clinics.**
- Subhead: *A creative and marketing agency built for one thing only — helping private and specialist medical clinics grow with strategy, data and a little magic.*

**2. Origin story** — `Reveal`, pull-quote; orb "forms" from scattered sparkles as story scrolls.
- H2: **Why a clinic-only agency?**
- Body: *We kept meeting brilliant doctors with quiet websites. Clinics doing world-class work that patients simply couldn't find — or worse, marketing that risked their licence. So we made a choice most agencies won't: we'd serve clinics, and only clinics. That focus means we understand your patients, your specialty, and the advertising rules you live by. Clinic Genie was born to be the partner that turns specialist expertise into specialist growth.*
- Pull-quote: *"The right patients are searching. Our job is to make sure your clinic is the one they trust."*

**3. What we stand for (values)** — 4 `GlassCard`; hover draws a light-thread to orb.
- H2: **Research. Data. Results.**
- **Evidence over ego:** *We don't guess what works. We research your market and let the data lead — just like good medicine.*
- **Compliance as craft:** *Bold growth and clean advertising aren't a trade-off. We design for both, aligned to Singapore's healthcare advertising guidelines.*
- **Specialist focus:** *We speak clinic. Aesthetics, dermatology, dental, fertility, orthopaedics — we know the patient journey behind each.*
- **Transparent partnership:** *Clear reporting, plain language, no vanity metrics. You always know what's working and why.*

**4. Our approach (mini process)** — `ProcessSteps`, `MagneticButton`; orb pulses three times.
- H2: **Strategy first, magic second.**
- Body: *Every engagement starts the same way: we listen, then we research. Strategy & Research → Implementation & Design → Results & Optimisation. The flourish patients see is built on a foundation they don't.*
- CTA: **See how we work** → `/services#process`

**5. By the numbers** — `StatTrio` (4 stats); orb docks, count-up + twinkle per stat.
- **Healthcare-only since day one** · **5 specialties served and counting** · **3.4× average lift in qualified enquiries** · **Singapore-based, Bukit Merah HQ**

**6. Partner ecosystem** — `PartnerStrip(layout="satellite")`, same 4 partners + one-liners as Home §8.
- H2: **Specialists, supported by specialists.**

**7. Meet the team teaser** — `MagneticButton`; orb small, "waving" shimmer.
- H2: **There are real people behind the lamp.**
- Body: *Strategists, writers, designers and developers who only do clinics.* · CTA **Meet us** → `/meet-us`

**8. CTA** — orb full-glow wish-granting flare.
- H2: **Let's make your clinic the one patients trust.** · CTA **Book a strategy call** → `/contact`

---

### PAGE 3 — Services (`/services`)
Orb variant `services` (3 inner wisps). Signature: three wishes orbiting; hover breaks orbit, sub-services fan out; arrow keys cycle (aria-live). Anchors `#strategy`, `#growth`, `#brand`, `#process`.

**1. Hero** — `SectionHeading(as=h1)`, `MagneticButton`; orb hero with three faint cores.
- Eyebrow: **WHAT WE DO** · H1 (highlight "grow"): **Everything your clinic needs to grow — under one lamp.**
- Subhead: *Strategy, digital growth and brand design, woven into one engine. Healthcare SEO, medical SEM, clinic websites, content, AI search and compliance-aware strategy — delivered by a team that only works with clinics.*
- CTA: **Book a strategy call** → `/contact`

**2. Pillar 1 — Business Strategy & Development** (`#strategy`) — orb forms a compass/needle.
- H2: **Business Strategy & Development**
- Intro: *Grow on purpose, not by accident. We find the opportunity before we spend a dollar chasing it.*
- **Market Research** — *Understand your patients, competitors and the searches that signal real demand in your specialty.*
- **Strategic Planning** — *A clear, prioritised roadmap for the next 6–12 months, tied to revenue, not vanity metrics.*
- **Partnership & Grant Consultancy** — *Tap government grants and the right partners (with Real Inbound) to fund and accelerate your growth.*
- Outcome: *You'll know exactly where your next patients will come from.*

**3. Pillar 2 — Digital Growth Solutions** (`#growth`) — orb most active here.
- H2: **Digital Growth Solutions** · Intro: *Be the clinic patients find first — and the one they choose.*
- **Healthcare SEO** — *Rank for the high-intent treatment searches patients actually type, with compliance-aware, doctor-reviewed content.*
- **Medical SEM (Paid Search)** — *Targeted Google campaigns that bring in bookings, not just clicks — managed to a cost-per-enquiry you can live with.*
- **Copywriting** — *Patient-first, compliant copy that explains, reassures and converts.*
- **Lead Generation** — *Landing pages, funnels and tracking that turn interest into booked consultations.*
- Forward line: *And we optimise for AI search too — so your clinic shows up when patients ask an AI, not just a search bar.*
- Outcome: *More qualified enquiries, every month, measured transparently.*

**4. Pillar 3 — Brand & Experience Design** (`#brand`) — orb settles into polished slow rotation.
- H2: **Brand & Experience Design** · Intro: *Trust is decided in seconds. We make those seconds count.*
- **Branding & Logo Design** — *A distinctive, premium clinic identity that signals quality before a word is read.*
- **Web Design & Development** — *Fast, accessible, conversion-focused clinic websites built on a modern stack (Next.js).*
- **Photography & Video** — *Real clinic visuals — your space, your team, your work — that build instant credibility.*
- Outcome: *Patients trust you on sight, and the booking feels inevitable.*

**5. The 3-step process (expanded)** (`#process`) — `ProcessSteps(orbGuide)`, deliverable lights up per step.
- H2: **How an engagement works.**
- Step 1 **Strategy & Research** — *Discovery call, market and competitor research, keyword and patient-intent mapping, and a prioritised plan. Deliverable: your growth roadmap.*
- Step 2 **Implementation & Design** — *We build and launch: website, content, campaigns, brand assets. Compliance reviewed at every step. Deliverable: live, working growth assets.*
- Step 3 **Results & Optimisation** — *Monthly reporting, A/B testing, and continuous refinement. Deliverable: rising rankings, more enquiries, and a report you can actually read.*

**6. Who we work with** — `SectionHeading`; orb small ambient companion.
- H2: **Built for specialist clinics.**
- Body: *Aesthetics & dermatology, dental, fertility & women's health, orthopaedics & sports medicine, ENT, and other private specialist practices across Singapore. If your patients search before they book, we can help.*

**7. Compliance strip** — orb calm steady glow.
- H2: **Ambitious growth, responsibly delivered.**
- Body: *Every word we publish is written with Singapore's healthcare advertising guidelines (PHMC/HCSA) in mind, and reviewed with your team. Growth should never put your licence at risk.*

**8. CTA** — orb full flare.
- H2: **Tell us your wish.** · Body: *Book a free strategy call and we'll recommend the right mix for your clinic — no hard sell.* · CTA **Book a strategy call** → `/contact`

---

### PAGE 4 — Portfolio / Our Works (`/portfolio`)
Orb variant `portfolio`. Signature: **constellation gallery** on WebGL tier (orb is north star, hover draws related-project lines, click zooms into case study); reduced-motion / no-WebGL = clean responsive grid with hover-lift + springy filter re-layout (FLIP via Framer `layout`). Components: `FilterGrid`, `CaseCard`, `StatTrio`, `MagneticButton`.

**1. Hero**
- Eyebrow: **OUR WORKS** · H1 (highlight "Real bookings"): **Real clinics. Real rankings. Real bookings.**
- Subhead: *A look at the brands, websites and campaigns we've conjured for specialist clinics across Singapore — and the results that followed.*

**2. Filter + grid** — filter chips: **All · Branding · Web Design · SEO · SEM · Content · Video**; selecting flicks orb colour + sparkle-wipe re-sort. Cards (→ `/portfolio/[slug]`):
1. **THE ACNE CLINIC — "Face it. Fix it."** (`/portfolio/the-acne-clinic`) · Tags: Branding · Web · SEO · SEM · Line: *A bold new aesthetics brand that owns acne search in Singapore.* · Result: **+118% organic traffic · 2.1× consult bookings**
2. **THE AESTHETICS CLINIC** (`/portfolio/the-aesthetics-clinic`) · Tags: Web · SEO · Content · Line: *Premium rebrand + content engine for chemical peels, fractional laser and skin boosters.* · Result: **Page 1 for 6 priority treatment keywords**
3. **STELLARIS FERTILITY** (`/portfolio/stellaris-fertility`) · Tags: Branding · Web · Strategy · Line: *A reassuring, compliant brand for a sensitive specialty.* · Result: **+64% qualified enquiries in 5 months**
4. **LUMIÈRE DENTAL** (`/portfolio/lumiere-dental`) · Tags: Web · SEM · Lead Gen · Line: *Implant and Invisalign demand, captured with tightly targeted SEM.* · Result: **38% lower cost-per-enquiry**
5. **ORCHARD ORTHOPAEDICS** (`/portfolio/orchard-orthopaedics`) · Tags: SEO · Content · AI Search · Line: *Owning "knee replacement Singapore" through doctor-reviewed content.* · Result: **Featured snippet + 3× organic leads**

**3. Results band** — `StatTrio`; orb charges stats.
- H2: **Outcomes we're proud of.** · Stats: **3.4× average enquiry lift** · **40+ page-1 treatment keywords across clients** · **100% healthcare-only**

**4. CTA** — orb flare.
- H2: **Your clinic could be next.** · CTA **Book a strategy call** → `/contact`

#### Case study detail template (`/portfolio/[slug]`) — fully written example: THE ACNE CLINIC
Components: case hero, `GlassCard`, big stat tiles, pull-quote, `MagneticButton`. Orb: small beside client logo, charges each result tile in sequence, flares at CTA.
- **Hero:** The Acne Clinic — tagline *"Face it. Fix it."* · Specialty: Aesthetics / Acne & Scarring · Services: Branding, Web Design & Dev, Healthcare SEO, Medical SEM.
- **The Challenge:** *A new aesthetics clinic entered one of Singapore's most competitive niches — acne and acne-scar treatment — with no brand recognition and no search visibility. They needed to look established and rank fast, without overstepping advertising rules.*
- **What we did:**
  - **Brand:** *Created the bold green-and-pink "The Acne Clinic — Face it. Fix it." identity, namecards, packaging and clinic collateral.*
  - **Web:** *Built a fast Next.js site structured around treatment intent (acne, acne scars, chemical peels, fractional laser, skin boosters).*
  - **SEO:** *Published compliance-aware, doctor-reviewed treatment pages and supporting Genie Tips content.*
  - **SEM:** *Ran tightly geo-targeted Google campaigns on high-intent terms with conversion tracking.*
- **The Results (big tiles):** **+118% organic traffic in 6 months** · **Page 1 for "acne scar treatment Singapore"** · **2.1× increase in consult bookings** · **38% lower cost-per-enquiry vs. launch month**
- **Pull-quote:** *"Clinic Genie made us look like we'd been around for years — in months. The bookings speak for themselves."* — Founder, The Acne Clinic
- **What's next:** *Now expanding into TikTok and live content with partner Qianyi.*
- **CTA:** **Want results like these? Book a strategy call** → `/contact`
- Other case studies use the same template with their own challenge/approach/results from the card data.

---

### PAGE 5 — Genie Tips (blog index, `/genie-tips`)
Orb variant `blog` (smallest, bloom off). Signature: orb librarian — hovers near search/filter and "sorts" with FLIP re-flow; tints to selected tag's accent; featured post gets the orb parked beside it. Components: `PostGrid`, `PostCard`, `NewsletterCapture`, filter chips, `MagneticButton`.

**1. Hero**
- Eyebrow: **GENIE TIPS** · H1 (highlight "demystified"): **Clinic growth, demystified.**
- Subhead: *Practical, compliance-aware advice on SEO, ads, websites and brand — written for clinic owners and specialist doctors in Singapore. Free wishes, basically.*

**2. Featured post** — orb spotlights the card.
- Featured: **Healthcare SEO in Singapore: How Specialist Clinics Actually Rank in 2026**
- Dek: *The honest playbook — what moves the needle, what wastes budget, and how to stay on the right side of advertising rules.*

**3. Category filter + post grid** — Categories: **SEO · SEM & Ads · AI Search · Compliance · Web & Brand · Growth Strategy**; sparkle-wipe re-sort on change. Posts (title — category · dek):
1. **Healthcare SEO in Singapore: How Specialist Clinics Actually Rank in 2026** — SEO · *The honest playbook for getting found by high-intent patients.*
2. **Will AI Search Kill Your Clinic's Google Traffic? What to Do Now** — AI Search · *How patients are searching with AI — and how to make sure your clinic still shows up.*
3. **The 7 Things Slowing Down Your Clinic Website (and Costing You Bookings)** — Web & Brand · *Speed is trust. Here's what to fix first.*
4. **Medical SEM Without Wasting Budget: A Specialist's Guide to Google Ads** — SEM & Ads · *Stop paying for clicks that never book.*
5. **Healthcare Advertising Rules in Singapore: A Plain-English Guide for Clinics** — Compliance · *What you can and can't say in your marketing, without the legalese.*
6. **How to Choose a Clinic Name and Logo That Patients Actually Trust** — Web & Brand · *Lessons from rebranding real specialist clinics.*
7. **5 Treatment Pages Every Aesthetic Clinic Should Have (and How to Write Them)** — SEO · *Turn your services into pages that rank and convert.*
8. **Google Business Profile for Clinics: The 20-Minute Setup That Wins Local Patients** — SEO · *The fastest free win in clinic marketing.*
9. **From Research to Results: How We Plan a Clinic's First 90 Days of Growth** — Growth Strategy · *A look inside the Clinic Genie method.*

**4. Newsletter capture** — `NewsletterCapture`; orb "delivers" signup with sparkle.
- H2: **Get one good wish a month.** · Body: *Join clinic owners getting practical growth and compliance tips, no spam. Unsubscribe anytime.* · Field: email + button **Send me Genie Tips**

**5. CTA** — orb flare.
- H2: **Prefer we just handle it?** · CTA **Book a strategy call** → `/contact`

#### Sample blog post (`/genie-tips/[slug]`) — "Healthcare SEO in Singapore: How Specialist Clinics Actually Rank in 2026"
Reading layout: `prose` (≤68ch); small companion orb in margin acts as reading-progress glow (brightens at section anchors, dims while reading); a thin top progress bar is a stretched sliver of the orb's glow.
- **Meta title:** *Healthcare SEO Singapore: How Specialist Clinics Rank in 2026 | Clinic Genie*
- **Meta description:** *A practical, compliance-aware guide to healthcare SEO for Singapore specialist clinics — what actually moves rankings and bookings in 2026.*
- **Byline:** *By the Clinic Genie team · 8 min read · Updated June 2026*
- **Intro:** *If you run a specialist clinic in Singapore, you already know the hardest part isn't the medicine — it's being found by the patients who need you. This is the no-fluff version of how healthcare SEO actually works in 2026, what's changed, and where to spend your effort first.*
- **H2 1. Patients search by problem, not by specialty** — intent-led keywords (e.g. "acne scar treatment" over "dermatologist").
- **H2 2. Treatment pages are your highest-leverage asset** — one strong, doctor-reviewed page per treatment.
- **H2 3. E-E-A-T matters more in healthcare than anywhere else** — real doctors, credentials, reviews.
- **H2 4. AI search is the new front page** — optimise for AI overviews and assistants, not just blue links.
- **H2 5. Speed and mobile are ranking factors AND trust factors** — fast clinic sites win.
- **H2 6. Stay compliant while you grow** — align to PHMC/HCSA guidance; what to avoid.
- **H2 Where to start this week** — 3-item action checklist.
- **Conclusion + CTA box:** **Want this done for you? Book a free strategy call.** → `/contact`
- Related posts strip (3) · author/agency bio block · social share row.

---

### PAGE 6 — Contact (`/contact`)
Orb variant `contact` (most playful/interactive). Signature: **grant a wish / send to the genie** — on submit, orb gathers field contents as particles, compresses to a bright point, and "sends" them upward before resolving to success; mood `thinking → celebrate`. Reduced-motion: calm success fade. Components: `ContactForm`, `FaqAccordion`, map embed, `MagneticButton`.

**1. Hero** — orb most interactive; follows cursor, reacts to form focus.
- Eyebrow: **LET'S TALK** · H1 (highlight "grow"): **Rub the lamp. Let's grow your clinic.**
- Subhead: *Book a free 30-minute strategy call, or send us a note. We'll map where the right patients are searching — and how to make your clinic the one they trust.*

**2. Contact form (primary)** — focused field makes orb lean + brighten; submit flares + scatters sparkles.
- Heading: **Book a strategy call**
- Fields: Name · Clinic name · Email · Phone (optional) · Specialty (dropdown: Aesthetics/Dermatology, Dental, Fertility, Orthopaedics, ENT, Other) · "What would you like to grow?" (message)
- Consent line: *I'd like Clinic Genie to contact me about my enquiry.*
- Submit: **Send my wish** (mini-orb in button)
- Success (→ `/thank-you`): *Wish received. We'll be in touch within one business day.*

**3. Contact details** — small ambient orb glows over the map pin.
- **Visit us:** *164 Bukit Merah Central, #03-3625, Singapore 150164*
- **Email us:** *hello@clinic-genie.com*
- **Follow us:** *Facebook · Instagram · LinkedIn*
- **Response time:** *We reply within one business day.*

**4. Map** — embedded map of Bukit Merah Central HQ; the marker is a glowing orb pin.

**5. Mini FAQ** — `FaqAccordion`; expanding an answer makes the orb twinkle once.
- **Do you only work with clinics?** — *Yes — exclusively private and specialist medical clinics in Singapore. That focus is our advantage.*
- **Is the strategy call really free?** — *Completely. 30 minutes, no obligation, no hard sell.*
- **Will my marketing stay compliant?** — *Compliance-awareness is built into everything we do, aligned to PHMC/HCSA advertising guidelines.*
- **How soon can we start?** — *Most engagements kick off within two weeks of the strategy call.*

**6. Closing line** — orb final calm full glow.
- *Great medicine deserves to be found. Let's make sure yours is.*

---

### Meet Us (`/meet-us`)
Team + culture page (retained route). Signature: orb introductions — hovering a person drifts the orb to them and reveals name/role beside it; portraits do duotone→colour transition in brand blue on hover. Header: **The minds behind the magic.** Body: *Strategists, writers, designers and developers who only do clinics.* Closing CTA **Book a strategy call** → `/contact`. (Team member data lives in `lib/data/`.)

### Utility routes
- **404 (`not-found.tsx`):** "the genie can't find that page" with the orb · link Home.
- **`/thank-you`:** post-form confirmation — *Wish received. We'll be in touch within one business day.*
- **`/privacy`, `/terms`:** plain clarity register, no magic copy. · **`sitemap.ts`, `robots.ts`** standard.

---

## 8. Brand Voice Quick-Reference

**Persona:** a calm, well-read advisor who happens to wield a little magic. Wonder from imagery + orb; credibility from specifics + restraint. Addresses specialist doctors and clinic owners as peers, never as patients. Singapore-fluent (PHMC/HCSA, Google SG, "near me", British/SG spelling: optimisation, specialise, colour, enquiry, centre).

**Micro-rule:** if a sentence would work for a generic agency, add the magic; if it's all magic and no proof, add the number. Every line passes both tests.

**Magic lexicon (max one per block):** conjure · grant · reveal · summon · illuminate · the orb · the wish · foresight · the genie's lens. **Avoid:** "your wish is my command," abracadabra, poof, lamp-rubbing puns, literal three-wishes limit, stacked hype adjectives, emoji in body copy, fear/scarcity, patient-outcome/cure claims.

**Primary tagline (site-wide):** *Wishes, granted with data.*
**Tagline bank:** Strategy that feels like magic. Results that aren't. · The genie for clinics that mean to grow. · Make your clinic the one they trust. · Real magic is measurable. · Specialist growth, summoned. · Foresight for the modern specialist clinic.

**Hero headline bank (alternates):** "Your next patients are already looking. The genie makes sure they find you first." · "Every search is a patient deciding. Be the clinic they choose." · "From invisible to in-demand — the wish every specialist clinic should make." · "Healthcare SEO, medical SEM, and compliance-aware strategy — all in one wish."

**CTA labels:** Primary site-wide **"Book a strategy call."** Bank: See our works · Make your wish · Conjure my growth plan · Reveal my opportunities · Get a free clinic audit · Talk to the genie · Claim your strategy session · Explore the three wishes. Contact submit: **"Send my wish."** Newsletter: **"Send me Genie Tips."**

**Reusable section headers:** "Meet the genie behind the growth" (About) · "The three wishes we grant" (Services) · "How the magic works" (Process) · "Look into the orb" (Portfolio) · "Proof, not promises" (Results) · "Wishes already granted" (Case studies) · "Allies in the lamp" (Partners) · "The minds behind the magic" (Meet Us) · "Trusted by Singapore's specialist clinics" (logo band — no magic) · "Compliance, handled" (compliance band — no magic) · "Make your first wish" (final CTA).

**Three Wishes framing (Services):** Wish One — *"I wish my clinic had a clear path to grow."* (Business Strategy & Development) · Wish Two — *"I wish the right patients could find me online."* (Digital Growth Solutions) · Wish Three — *"I wish my brand looked as good as my care."* (Brand & Experience Design).

**Blog title bank (for future posts):** "MOH Advertising Guidelines: What Your Clinic Can (and Can't) Say Online" · "Why 'Near Me' Searches Are the Most Valuable Patients Your Clinic Isn't Capturing" · "Government Grants for Clinic Growth: EDG, PSG and What You're Entitled To" · "Your Clinic Website Is Losing Patients in 3 Seconds — Here's Why" · "Reviews, Reputation and Trust: The Quiet Ranking Factor SG Clinics Overlook" · "Page One in 90 Days? Setting Honest SEO Timelines for New Clinic Websites" · "How to Brief a Marketing Agency When You're a Doctor With No Time."