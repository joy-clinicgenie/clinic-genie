"use client";

import { useMemo } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import styles from "./OrbVisual.module.css";

export type OrbVisualState = "misty" | "forming" | "full" | "lens";

export interface OrbVisualProps {
  state?: OrbVisualState;
  /** Gentle vertical float — hero default */
  float?: boolean;
  className?: string;
  size?: "hero" | "default" | "compact";
}

const STATE_CLASS: Record<OrbVisualState, string> = {
  misty: styles.misty,
  forming: styles.forming,
  full: styles.full,
  lens: styles.lens,
};

/** Deterministic particle positions (SSR-safe). */
function particleStyle(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  const r = x - Math.floor(x);
  return {
    top: `${20 + r * 60}%`,
    left: `${20 + (1 - r) * 60}%`,
    ["--dx" as string]: `${Math.round(r * 24 - 12)}px`,
    ["--dy" as string]: `${Math.round((1 - r) * 24 - 12)}px`,
    animationDelay: `${(r * 6).toFixed(1)}s`,
  };
}

/**
 * CSS/SVG strategy-lens orb. Decorative — marked aria-hidden.
 * Hero uses `misty`: soft, barely formed, full of potential.
 */
export function OrbVisual({ state = "full", float = false, className, size = "default" }: OrbVisualProps) {
  const reduceMotion = useReducedMotion();

  const particles = useMemo(() => {
    if (reduceMotion || (state !== "misty" && state !== "forming")) return null;
    return Array.from({ length: 3 }, (_, i) => (
      <i key={i} className={styles.particle} style={particleStyle(i + 1)} />
    ));
  }, [reduceMotion, state]);

  return (
    <div
      aria-hidden="true"
      className={cn(
        styles.orb,
        STATE_CLASS[state],
        float && styles.float,
        size === "hero" && "max-w-none",
        className
      )}
    >
      <span className={styles.shadow} />
      <span className={styles.halo} />
      <span className={styles.sphere} />
      <span className={styles.rim} />
      <span className={styles.glass} />
      <span className={styles.highlight} />
      <span className={styles.highlight2} />
      {particles && <span className={styles.particles}>{particles}</span>}
      <span className={styles.reticle} />
    </div>
  );
}
