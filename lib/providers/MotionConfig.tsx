"use client";

import { MotionConfig as FramerMotionConfig } from "framer-motion";

/** Global framer-motion config — honors reduced-motion and sets default easing. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <FramerMotionConfig reducedMotion="user" transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </FramerMotionConfig>
  );
}
