"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

/** Expanding ring at each click point. Capped pool, skipped under reduced-motion. */
export function PointerRipples() {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let id = 0;
    const onDown = (e: PointerEvent) => {
      id += 1;
      const r = { id, x: e.clientX, y: e.clientY };
      setRipples((prev) => [...prev.slice(-6), r]);
    };
    window.addEventListener("pointerdown", onDown);
    return () => window.removeEventListener("pointerdown", onDown);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[90]" aria-hidden="true">
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            className="absolute h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-genie-300/70"
            style={{ left: r.x, top: r.y }}
            initial={{ scale: 0, opacity: 0.9 }}
            animate={{ scale: 3, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onAnimationComplete={() => setRipples((prev) => prev.filter((x) => x.id !== r.id))}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
