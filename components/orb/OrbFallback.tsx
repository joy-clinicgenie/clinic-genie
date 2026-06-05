"use client";

import { cn } from "@/lib/cn";
import type { OrbVariant } from "./store";
import styles from "./OrbFallback.module.css";

const SPARKS = [
  { top: "12%", left: "30%", delay: "0s", size: 4 },
  { top: "22%", left: "72%", delay: "0.8s", size: 3 },
  { top: "68%", left: "20%", delay: "1.4s", size: 3 },
  { top: "78%", left: "64%", delay: "0.4s", size: 4 },
  { top: "44%", left: "86%", delay: "1.9s", size: 2 },
  { top: "50%", left: "8%", delay: "1.1s", size: 2 },
];

/**
 * Pure-CSS plasma-aura orb. Used when WebGL is unavailable or as the SSR/loading
 * poster. `static` disables all animation (reduced-motion / first paint).
 */
export function OrbFallback({
  variant = "home",
  static: isStatic = false,
  className,
}: {
  variant?: OrbVariant;
  static?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("relative h-full w-full", className)} aria-hidden="true" data-orb-variant={variant}>
      <div className={cn(styles.orb, isStatic && styles.static)}>
        {!isStatic &&
          SPARKS.map((s, i) => (
            <span
              key={i}
              className={styles.spark}
              style={{
                top: s.top,
                left: s.left,
                width: s.size,
                height: s.size,
                animationDelay: s.delay,
              }}
            />
          ))}
      </div>
    </div>
  );
}
