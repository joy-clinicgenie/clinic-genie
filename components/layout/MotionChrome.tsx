"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { LenisProvider } from "@/lib/providers/LenisProvider";

const PointerRipples = dynamic(
  () => import("@/components/ui/PointerRipples").then((module) => module.PointerRipples),
  { ssr: false }
);

function canUseMotionChrome(): boolean {
  return (
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Desktop-only motion extras (smooth scroll, click ripples). Skipped on
 * touch devices and when the user prefers reduced motion, so those pages
 * never download or run Lenis.
 */
export function MotionChrome() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const enable = () => setEnabled(canUseMotionChrome());
    enable();

    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerMq = window.matchMedia("(pointer: fine)");
    motionMq.addEventListener("change", enable);
    pointerMq.addEventListener("change", enable);
    return () => {
      motionMq.removeEventListener("change", enable);
      pointerMq.removeEventListener("change", enable);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <LenisProvider />
      <PointerRipples />
    </>
  );
}
