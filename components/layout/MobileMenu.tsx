"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  NAV_ITEMS,
  PRIMARY_CTA,
  SERVICES_GROUPS,
  SERVICES_PILLARS_INDEX,
  type NavItem,
} from "@/lib/data/nav";
import { ArrowUpRight } from "lucide-react";
import { MagicOrb } from "@/components/orb/MagicOrb";
import { Logo } from "@/components/ui/Logo";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { cn } from "@/lib/cn";

const MENU_ITEMS: NavItem[] = [...NAV_ITEMS, { label: "Contact", href: "/contact" }];

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    if (open) {
      restoreFocusRef.current = document.activeElement as HTMLElement | null;
      document.body.style.overflow = "hidden";
      setServicesOpen(false);
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

          <div className="relative flex items-center justify-between px-[var(--page-pad)] pb-2.5 pt-[calc(0.625rem+env(safe-area-inset-top,0px))]">
            <Logo tone="dark" onClick={onClose} />
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

          <nav className="relative flex flex-1 flex-col justify-center gap-2 overflow-y-auto px-[var(--page-pad)] py-6">
            {MENU_ITEMS.map((item, i) => {
              const children = item.children;

              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col gap-2"
                >
                  {children && children.length > 0 ? (
                    <>
                      <div className="flex items-center justify-between gap-3">
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className="font-display text-4xl font-bold text-onDark transition-colors hover:text-genie-300"
                        >
                          {item.label}
                        </Link>
                        <button
                          type="button"
                          onClick={() => setServicesOpen((v) => !v)}
                          aria-expanded={servicesOpen}
                          aria-controls="mobile-services-pillars"
                          className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-onDark transition-colors hover:bg-white/10"
                          aria-label={servicesOpen ? "Hide services" : "Show services"}
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            aria-hidden="true"
                            className={cn("transition-transform duration-ui", servicesOpen && "rotate-180")}
                          >
                            <path
                              d="M5 7.5L10 12.5L15 7.5"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                      <AnimatePresence initial={false}>
                        {servicesOpen ? (
                          <motion.div
                            id="mobile-services-pillars"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                            className="overflow-hidden pl-1"
                          >
                            <p className="pb-3 pt-1 text-xs font-semibold uppercase tracking-[0.14em] text-genie-300">
                              Services
                            </p>
                            <div className="flex flex-col gap-5">
                              {SERVICES_GROUPS.map((group) => (
                                <div key={group.id}>
                                  <p className="pb-1 text-xs font-semibold uppercase tracking-[0.14em] text-onDark-muted/70">
                                    {group.label}
                                  </p>
                                  <ul>
                                    {group.items.map((child) => (
                                      <li key={child.href}>
                                        <Link
                                          href={child.href}
                                          onClick={onClose}
                                          className="flex min-h-11 items-center py-2.5 text-lg font-medium text-onDark-muted transition-colors hover:text-genie-300"
                                        >
                                          {child.title}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                            <Link
                              href={SERVICES_PILLARS_INDEX.href}
                              onClick={onClose}
                              className="mt-4 inline-flex min-h-11 items-center gap-1.5 py-2 text-base font-medium text-genie-300 transition-colors hover:text-genie-200"
                            >
                              {SERVICES_PILLARS_INDEX.label}
                              <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.75} />
                            </Link>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </>
                  ) : item.disabled ? (
                    <span
                      aria-disabled="true"
                      title="Coming soon"
                      className="cursor-default font-display text-4xl font-bold text-onDark/40"
                    >
                      {item.label}
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="font-display text-4xl font-bold text-onDark transition-colors hover:text-genie-300"
                    >
                      {item.label}
                    </Link>
                  )}
                </motion.div>
              );
            })}
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
