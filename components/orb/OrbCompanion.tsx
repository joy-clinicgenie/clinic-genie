"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { useOrbStore } from "./store";
import { ORB_VARIANTS } from "./variants";
import { OrbFallback } from "./OrbFallback";
import { OrbCanvas2D } from "./OrbCanvas2D";

const OrbCanvas = dynamic(() => import("./OrbCanvas").then((m) => m.OrbCanvas), {
  ssr: false,
  loading: () => <OrbFallback variant="home" static />,
});

function dampTo(current: number, target: number, lambda: number, dt: number) {
  return current + (target - current) * (1 - Math.exp(-lambda * dt));
}

/**
 * The one and only orb for the whole site. Mounted once in the root layout,
 * inside a fixed, pointer-events:none layer. A single rAF loop glues it to the
 * active page anchor (data-orb-anchor / id="orb-anchor-*") through scroll,
 * resize and route changes. Pages talk to it only through the store.
 */
export function OrbCompanion() {
  const renderer = useOrbStore((s) => s.renderer);
  const variant = useOrbStore((s) => s.variant);
  const boxRef = useRef<HTMLDivElement>(null);
  const transit = useRef(0);

  // transit pop on variant (route) change + set the variant's default scale
  useEffect(() => {
    transit.current = 1;
    const cfg = ORB_VARIANTS[variant];
    useOrbStore.getState().setScene({ scale: cfg.scale });
  }, [variant]);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    let curX = 0;
    let curY = 0;
    let curOpacity = 0;
    let curScaleMul = 1;
    let initialized = false;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const box = boxRef.current;
      if (box) {
        const s = useOrbStore.getState();
        const w = box.offsetWidth || 1;
        const h = box.offsetHeight || 1;
        const el = s.anchorId ? document.getElementById(s.anchorId) : null;

        let targetOpacity = curOpacity;
        if (el) {
          const r = el.getBoundingClientRect();
          const tx = r.left + r.width / 2 - w / 2;
          const ty = r.top + r.height / 2 - h / 2;
          targetOpacity = 1;
          if (!initialized) {
            curX = tx;
            curY = ty;
            initialized = true;
          }
          const lambda = reduce ? 60 : 9;
          curX = dampTo(curX, tx, lambda, dt);
          curY = dampTo(curY, ty, lambda, dt);
        } else if (s.anchorId === null) {
          targetOpacity = 0;
        }

        // transit grow-in
        transit.current = Math.max(0, transit.current - dt * (reduce ? 10 : 1.6));
        const growIn = 1 - transit.current * 0.4;

        // fallback renderers scale via the box; webgl scales the 3D group itself
        const wantScaleMul = renderer === "webgl" ? growIn : s.scale * growIn;
        curScaleMul = reduce ? wantScaleMul : dampTo(curScaleMul, wantScaleMul, 8, dt);
        curOpacity = reduce ? targetOpacity : dampTo(curOpacity, targetOpacity, 6, dt);

        box.style.transform = `translate3d(${curX}px, ${curY}px, 0) scale(${curScaleMul})`;
        box.style.opacity = String(curOpacity);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [renderer]);

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-visible" aria-hidden="true">
      <div
        ref={boxRef}
        className="absolute left-0 top-0 will-change-transform"
        style={{ width: "var(--orb-size)", height: "var(--orb-size)", opacity: 0 }}
      >
        {renderer === "webgl" && <OrbCanvas variant={variant} />}
        {renderer === "canvas2d" && <OrbCanvas2D variant={variant} />}
        {renderer === "css" && <OrbFallback variant={variant} />}
        {(renderer === "static" || renderer === "pending") && <OrbFallback variant={variant} static />}
      </div>
    </div>
  );
}
