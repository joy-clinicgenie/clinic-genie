"use client";

import { motion, useReducedMotion } from "framer-motion";
import { OrbVisual } from "@/components/home/OrbVisual";
import { MagneticButton } from "@/components/ui/MagneticButton";

/**
 * Large orb-centred call-to-action. The orb scales up on hover, concentric
 * rings pulse outward, and the text arc sits just below it.
 */
export function OrbCTA({ href = "/contact" }: { href?: string }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center gap-6"
    >
      <div className="group relative flex flex-col items-center">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[240px] w-[240px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-genie-400/20 transition-all duration-700 group-hover:h-[280px] group-hover:w-[280px] group-hover:border-genie-400/35 motion-safe:animate-[ping_3s_ease-in-out_infinite]"
          style={{ animationDelay: "0s" }}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[190px] w-[190px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-genie-500/25 transition-all duration-500 group-hover:h-[220px] group-hover:w-[220px] group-hover:border-genie-500/45 motion-safe:animate-[ping_3s_ease-in-out_1s_infinite]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[148px] w-[148px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-genie-400/30 transition-all duration-500 group-hover:border-genie-400/60"
        />

        <motion.div
          whileHover={reduce ? {} : { scale: 1.08 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className="relative z-10"
        >
          <OrbVisual state="full" float={!reduce} size="default" className="h-[120px] w-[120px]" />
        </motion.div>
      </div>

      <div className="flex flex-col items-center gap-1">
        <MagneticButton href={href} size="lg" withMiniOrb ariaLabel="Book a strategy call">
          Make Your First Wish
        </MagneticButton>
        <span className="text-xs text-onDark-faint">30 minutes · no obligation</span>
      </div>
    </motion.div>
  );
}
