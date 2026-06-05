"use client";

import { useCallback, useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/cn";
import { useOrbStore, type OrbMood, type OrbVariant } from "./store";

/**
 * Drop into a section to (1) mark where the companion orb should sit and
 * (2) push a scene (mood/variant/scale/intensity) when the section is centered
 * in the viewport. The orb damps toward this element's center.
 *
 * On mount it also claims the orb if it is already within the viewport, so the
 * hero orb appears immediately on first load (the center-only active band would
 * otherwise miss a top-of-page anchor until the user scrolls).
 *
 * Position it with `className` (e.g. absolute placement). Zero-size is fine —
 * the orb centers on the point.
 */
export function OrbAnchor({
  id,
  mood,
  variant,
  scale,
  intensity,
  className,
  activeBand = "-42% 0px -42% 0px",
}: {
  id: string;
  mood?: OrbMood;
  variant?: OrbVariant;
  scale?: number;
  intensity?: number;
  className?: string;
  activeBand?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: activeBand as never });
  const setScene = useOrbStore((s) => s.setScene);
  const anchorId = `orb-anchor-${id}`;

  const pushScene = useCallback(() => {
    const scene: Partial<ReturnType<typeof useOrbStore.getState>> = { anchorId };
    if (mood) scene.mood = mood;
    if (variant) scene.variant = variant;
    if (scale != null) scene.scale = scale;
    if (intensity != null) scene.intensity = intensity;
    setScene(scene);
  }, [anchorId, mood, variant, scale, intensity, setScene]);

  // Claim on mount if already visible (hero orb appears immediately on load).
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) pushScene();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Claim on scroll when centered in the viewport.
  useEffect(() => {
    if (inView) pushScene();
  }, [inView, pushScene]);

  return <div id={anchorId} ref={ref} aria-hidden="true" className={cn("pointer-events-none", className)} />;
}

/** Sets the page-level orb variant on mount (call once near the top of a page). */
export function usePageOrb(variant: OrbVariant) {
  const setScene = useOrbStore((s) => s.setScene);
  useEffect(() => {
    setScene({ variant });
  }, [variant, setScene]);
}
