# Clinic Genie — Website Redesign 🔮

A magical redesign for **Clinic Genie**, a Singapore creative + marketing agency built only for private and specialist medical clinics. The signature device is a single **interactive blue magic orb** — a glowing crystal the genie conjures — that travels with the visitor across every page as a cursor-reactive scroll companion.

Built with **Next.js 14 (App Router) · TypeScript · Tailwind CSS · react-three-fiber**.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
# or a production build:
npm run build && npm run start
```

## The magic orb

One orb instance for the whole site, mounted once in `app/layout.tsx` as `<OrbCompanion>` inside a fixed, `pointer-events:none` layer. Pages never create their own orb — they **steer** it:

- Drop an `<OrbAnchor id="..." mood="..." variant="..." />` into a section; a single rAF loop damps the orb toward the active anchor's centre through scroll, resize and route changes.
- Renderer is chosen once at runtime (`lib/providers/OrbProvider.tsx`):
  - **WebGL** (`components/orb/OrbCanvas.tsx`) — refractive crystal (`MeshTransmissionMaterial`), breathing plasma core, fresnel rim, orbiting `Sparkles`, selective `Bloom`, cursor-reactive light. Environment is generated locally with `Lightformer`s (no CDN HDR fetch).
  - **Canvas2D** (`OrbCanvas2D.tsx`) — additive plasma for low-power / no-WebGL devices.
  - **CSS** (`OrbFallback.tsx`) — pure-CSS aura; also the static poster under `prefers-reduced-motion`.
- State lives in a Zustand store (`components/orb/store.ts`); moods (`idle · curious · thinking · focus · celebrate`) map to shader uniforms tweened with `MathUtils.damp`.

## Structure

```
app/                 Routes: / about services portfolio[/slug] genie-tips[/slug] meet-us contact + utility
components/orb/       The orb (companion, renderers, store, anchors, variants)
components/ui/        Design-system primitives (SectionHeading, MagneticButton, GlassCard, Reveal, …)
components/layout/    Nav, MobileMenu, Footer, PageTransition
components/{home,portfolio,blog,contact}/  Page-specific pieces
lib/data/            All copy & content as typed data (nav, services, portfolio, posts, partners, faqs, team)
lib/providers/       OrbProvider, LenisProvider (smooth scroll), MotionConfig
lib/hooks/           usePointer (one global pointer), useMagnetic, useBeat, useReducedMotion
docs/BUILD_SPEC.md   The full design + build specification this site was built from
```

## Design system

- **Brand blue** `#6CBAD9` (genie-500). Links/emphasis on white use `genie-700` (AA). Tokens in `tailwind.config.ts` + `app/globals.css`.
- Two registers: **conjuring** (dark, glowing, glassmorphic) and **clarity** (near-white, high-contrast for proof/reading), alternated per section.
- Fonts: **Sora** (display) · **Inter** (body) · **JetBrains Mono** (kickers/metrics) via `next/font`.
- Fully responsive, keyboard-accessible, and `prefers-reduced-motion`-aware.

> Note: `playwright` is included as a devDependency for visual QA screenshots; it is not used at runtime.
