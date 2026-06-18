"use client";

import { motion, useTransform } from "framer-motion";
import { useMemo, type CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { usePointer } from "@/lib/hooks/usePointer";
import { SparkleCluster } from "@/components/ui/SparkleCluster";
import styles from "./SparkleField.module.css";

const COLORS = {
  genie: ["#CCF4F6", "#78E2DD", "#18C4D9"],
  gold: ["#DDF7F8", "#78E2DD", "#EAFBFB"],
};

const CLUSTER_COLORS = ["#18c4d9", "#54b9ce", "#78e2dd"] as const;

/** Deterministic pseudo-random so SSR and client agree. */
function rng(seed: number) {
  const x = Math.sin(seed * 99.13) * 43758.5453;
  return x - Math.floor(x);
}

export function SparkleField({
  density = 36,
  color = "genie",
  variant = "dot",
  parallax = true,
  className,
}: {
  density?: number;
  color?: "gold" | "genie";
  variant?: "dot" | "cluster";
  parallax?: boolean;
  className?: string;
}) {
  const { mx, my } = usePointer();
  const tx = useTransform(mx, (v) => v * -8);
  const ty = useTransform(my, (v) => v * -8);

  const stars = useMemo(
    () =>
      Array.from({ length: density }, (_, i) => ({
        top: `${rng(i + 1) * 100}%`,
        left: `${rng(i + 7.3) * 100}%`,
        size:
          variant === "cluster"
            ? 9 + Math.floor(rng(i + 3.1) * 5)
            : 1 + rng(i + 3.1) * 2.2,
        delay: `${rng(i + 5.7) * 4}s`,
        dur: `${2.4 + rng(i + 2.2) * 3}s`,
        hue:
          variant === "cluster"
            ? CLUSTER_COLORS[i % CLUSTER_COLORS.length]
            : COLORS[color][i % COLORS[color].length],
        op: variant === "cluster" ? undefined : 0.3 + rng(i + 9.4) * 0.6,
      })),
    [color, density, variant]
  );

  return (
    <motion.div
      aria-hidden="true"
      style={parallax ? { x: tx, y: ty } : undefined}
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {stars.map((s, i) =>
        variant === "cluster" ? (
          <span
            key={i}
            className={styles.sparkCluster}
            style={{
              top: s.top,
              left: s.left,
              width: s.size,
              height: s.size,
              color: s.hue,
            }}
          >
            <SparkleCluster
              glow
              className={cn("h-full w-full motion-safe:animate-twinkle")}
              style={
                {
                  animationDelay: s.delay,
                  animationDuration: s.dur,
                } as CSSProperties
              }
            />
          </span>
        ) : (
          <span
            key={i}
            className="absolute rounded-full motion-safe:animate-twinkle"
            style={{
              top: s.top,
              left: s.left,
              width: s.size,
              height: s.size,
              background: s.hue,
              opacity: s.op,
              boxShadow: `0 0 ${s.size * 3}px ${s.size}px ${s.hue}`,
              animationDelay: s.delay,
              animationDuration: s.dur,
            }}
          />
        )
      )}
    </motion.div>
  );
}
