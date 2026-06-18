"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Smooth scroll (Lenis) as the scroll source of truth. Disabled under
 * reduced-motion (native scroll). Lenis only smooths wheel/touch — it never
 * intercepts the orb's pointer handling.
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      prevent: (node) => node instanceof Element && node.closest("[data-lenis-prevent-wheel]") !== null,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
