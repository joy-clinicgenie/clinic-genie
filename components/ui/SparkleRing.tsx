"use client";

import type { ReactNode, Ref } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import styles from "./SparkleRing.module.css";

const GRAIN_DOTS = [
  { radius: 36, size: 3, kind: "dot" as const, angle: 0 },
  { radius: 36, size: 2, kind: "speck" as const, angle: 36 },
  { radius: 36, size: 2.5, kind: "dot" as const, angle: 72 },
  { radius: 36, size: 2, kind: "speck" as const, angle: 108 },
  { radius: 36, size: 3, kind: "dot" as const, angle: 144 },
  { radius: 36, size: 2, kind: "speck" as const, angle: 180 },
  { radius: 36, size: 2.5, kind: "dot" as const, angle: 216 },
  { radius: 36, size: 2, kind: "speck" as const, angle: 252 },
  { radius: 36, size: 3, kind: "dot" as const, angle: 288 },
  { radius: 36, size: 2, kind: "speck" as const, angle: 324 },
  { radius: 42, size: 2, kind: "speck" as const, angle: 18 },
  { radius: 42, size: 2.5, kind: "dot" as const, angle: 90 },
  { radius: 42, size: 2, kind: "speck" as const, angle: 162 },
  { radius: 42, size: 2.5, kind: "dot" as const, angle: 234 },
  { radius: 42, size: 2, kind: "speck" as const, angle: 306 },
];

const SIZE_CLASS: Record<"sm" | "lg", string> = {
  sm: styles.sizeSm,
  lg: styles.sizeLg,
};

export function SparkleRing({
  size = "md",
  active = false,
  ambient = true,
  intensifyOnHover = true,
  groupIntensify = false,
  glow = false,
  className,
  coreClassName,
  coreRef,
  children,
}: {
  size?: "sm" | "md" | "lg";
  /** External active state (e.g. scroll-revealed step) */
  active?: boolean;
  /** Slow orbit always visible when true */
  ambient?: boolean;
  intensifyOnHover?: boolean;
  /** Intensify when a parent `.group` is hovered */
  groupIntensify?: boolean;
  /** Apply Magic Process–style glow on hover */
  glow?: boolean;
  className?: string;
  coreClassName?: string;
  coreRef?: Ref<HTMLSpanElement>;
  children: ReactNode;
}) {
  const reduced = useReducedMotion();
  const showParticles = !reduced && (ambient || active);
  const grainScale = size === "sm" ? 0.72 : size === "lg" ? 0.68 : 1;

  return (
    <div
      className={cn(
        styles.ring,
        size !== "md" && SIZE_CLASS[size],
        ambient && styles.ambient,
        active && styles.active,
        intensifyOnHover && styles.intensify,
        groupIntensify && styles.ringIntensify,
        glow && styles.ringGlow,
        className,
      )}
    >
      {showParticles && (
        <>
          <div className={cn(styles.orbit, styles.orbitSlow)}>
            {GRAIN_DOTS.slice(0, 10).map((grain) => (
              <span
                key={`a-${grain.angle}`}
                className={cn(styles.grain, grain.kind === "dot" ? styles.grainDot : styles.grainSpeck)}
                style={{
                  width: grain.size * grainScale,
                  height: grain.size * grainScale,
                  transform: `rotate(${grain.angle}deg) translate(${grain.radius * grainScale}px, -50%)`,
                }}
              />
            ))}
          </div>
          <div className={cn(styles.orbit, styles.orbitFast)}>
            {GRAIN_DOTS.slice(10).map((grain) => (
              <span
                key={`b-${grain.angle}`}
                className={cn(styles.grain, grain.kind === "dot" ? styles.grainDot : styles.grainSpeck)}
                style={{
                  width: grain.size * grainScale,
                  height: grain.size * grainScale,
                  transform: `rotate(${grain.angle}deg) translate(${grain.radius * grainScale}px, -50%)`,
                }}
              />
            ))}
          </div>
        </>
      )}
      <span ref={coreRef} className={cn(styles.core, coreClassName)}>
        {children}
      </span>
    </div>
  );
}
