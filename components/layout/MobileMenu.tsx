"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_ITEMS, PRIMARY_CTA } from "@/lib/data/nav";
import { MagicOrb } from "@/components/orb/MagicOrb";
import { MagneticButton } from "@/components/ui/MagneticButton";

const allLinks = [...NAV_ITEMS, { label: "Contact", href: "/contact" }];

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open) {
      restoreFocusRef.current = document.activeElement as HTMLElement | null;
      document.body.style.overflow = "hidden";
      // move focus into the dialog
      const t = window.setTimeout(() => closeBtnRef.current?.focus(), 60);
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", onKey);
      return () => {
        window.clearTimeout(t);
        window.removeEventListener("keydown", onKey);
        document.body.style.overflow = "";
        restoreFocusRef.current?.focus?.();
      };
    }
    document.body.style.overflow = "";
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-[60] flex flex-col bg-aurora-hero lg:hidden"
          initial={{ clipPath: "circle(0% at 90% 5%)" }}
          animate={{ clipPath: "circle(150% at 90% 5%)" }}
          exit={{ clipPath: "circle(0% at 90% 5%)" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-50">
            <MagicOrb variant="home" className="w-72" />
          </div>

          <div className="relative flex items-center justify-between px-[var(--page-pad)] pt-5">
            <span className="font-display text-lg font-bold text-onDark">
              Clinic <span className="genie-text">Genie</span>
            </span>
            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="grid h-11 w-11 place-items-center rounded-full text-onDark transition-colors hover:bg-white/10"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <nav className="relative flex flex-1 flex-col justify-center gap-2 px-[var(--page-pad)]">
            {allLinks.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="font-display text-4xl font-bold text-onDark transition-colors hover:text-genie-300"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <motion.div
            className="relative px-[var(--page-pad)] pb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <MagneticButton href={PRIMARY_CTA.href} size="lg" withMiniOrb className="w-full">
              {PRIMARY_CTA.label}
            </MagneticButton>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
