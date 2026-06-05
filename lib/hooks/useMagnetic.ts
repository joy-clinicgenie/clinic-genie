"use client";

import { useRef } from "react";
import { useMotionValue, useSpring, type MotionValue } from "framer-motion";

interface MagneticReturn {
  ref: React.RefObject<HTMLElement>;
  x: MotionValue<number>;
  y: MotionValue<number>;
  onMove: (e: React.PointerEvent) => void;
  onLeave: () => void;
}

/**
 * Magnetic pull toward the cursor within `radius`px. The element translates by
 * `strength` of the offset; pass a larger strength to inner labels for parallax.
 */
export function useMagnetic(strength = 0.25, radius = 90): MagneticReturn {
  const ref = useRef<HTMLElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 260, damping: 18, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 260, damping: 18, mass: 0.4 });

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    if (dist < radius + Math.max(rect.width, rect.height) / 2) {
      rawX.set(dx * strength);
      rawY.set(dy * strength);
    }
  };

  const onLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return { ref, x, y, onMove, onLeave };
}
