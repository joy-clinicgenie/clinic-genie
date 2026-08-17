"use client";

import { useEffect } from "react";

/**
 * Smooth wheel scrolling. Only mounted by MotionChrome on fine pointers
 * without reduced motion. Native scroll remains the default everywhere else.
 */
export function LenisProvider() {
  useEffect(() => {
    let cancelled = false;
    let raf = 0;
    let lenis: { raf: (time: number) => void; destroy: () => void } | null = null;

    void import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;

      lenis = new Lenis({
        lerp: 0.1,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1,
        prevent: (node) =>
          node instanceof Element && node.closest("[data-lenis-prevent-wheel]") !== null,
      });

      const loop = (time: number) => {
        lenis?.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  return null;
}
