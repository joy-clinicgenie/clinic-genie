"use client";

import { usePathname } from "next/navigation";
import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Subtle per-route content fade/rise after the first paint.
 * First load stays unanimated so LCP is not delayed. Reduced-motion users
 * get an instant swap on every navigation.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const previousPathname = useRef(pathname);
  const isClientNavigation = previousPathname.current !== pathname;
  previousPathname.current = pathname;

  const skipMotion = Boolean(reduceMotion) || !isClientNavigation;

  return (
    <motion.div
      key={pathname}
      initial={skipMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
