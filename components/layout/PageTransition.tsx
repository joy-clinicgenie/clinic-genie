"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

/**
 * Subtle per-route content fade/rise. Keyed on pathname so it re-runs on
 * navigation. The orb persists outside this wrapper.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
