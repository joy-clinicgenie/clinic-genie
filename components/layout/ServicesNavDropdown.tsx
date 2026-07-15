"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import {
  SERVICES_PILLARS_INDEX,
  type NavDropdownItem,
} from "@/lib/data/nav";

interface ServicesNavDropdownProps {
  label: string;
  href: string;
  items: NavDropdownItem[];
  active: boolean;
  light: boolean;
}

export function ServicesNavDropdown({
  label,
  href,
  items,
  active,
  light,
}: ServicesNavDropdownProps) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const panelId = useId();
  const rootRef = useRef<HTMLLIElement>(null);
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);

  const clearCloseTimer = () => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer.current = window.setTimeout(() => setOpen(false), 120);
  };

  const openMenu = () => {
    clearCloseTimer();
    setOpen(true);
  };

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        const trigger = rootRef.current?.querySelector<HTMLElement>("[data-nav-trigger]");
        trigger?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => () => clearCloseTimer(), []);

  return (
    <li
      ref={rootRef}
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
      onFocusCapture={openMenu}
      onBlurCapture={(e) => {
        const next = e.relatedTarget as Node | null;
        if (!rootRef.current?.contains(next)) {
          scheduleClose();
        }
      }}
    >
      <Link
        href={href}
        data-nav-trigger
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={panelId}
        className={cn(
          "relative inline-flex items-center rounded-pill px-4 py-2 text-[0.9375rem] font-medium transition-colors duration-ui",
          light
            ? active || open
              ? "bg-ink-900 text-white"
              : "text-ink-700 hover:bg-ink-900/8 hover:text-ink-900"
            : active || open
              ? "bg-white/15 text-onDark"
              : "text-onDark-muted hover:bg-white/10 hover:text-onDark"
        )}
      >
        {label}
      </Link>

      <AnimatePresence>
        {open ? (
          <motion.div
            id={panelId}
            role="region"
            aria-label="Core service pillars"
            initial={reduceMotion ? false : { opacity: 0, y: 8, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 6, x: "-50%" }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="absolute left-1/2 top-full z-50 mt-3 w-[min(40rem,calc(100vw-2rem))]"
            onMouseEnter={openMenu}
            onMouseLeave={scheduleClose}
          >
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-night-900/95 shadow-glass-dark backdrop-blur-xl">
              <div className="border-b border-white/10 px-6 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-onDark-muted">
                  Core service pillars
                </p>
              </div>

              <ul className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-2 sm:gap-x-0 sm:p-2">
                {items.map((item, index) => {
                  const leftCol = index % 2 === 0;
                  return (
                    <li
                      key={item.href}
                      className={cn(
                        leftCol ? "sm:border-r sm:border-white/10 sm:pr-2" : "sm:pl-2"
                      )}
                    >
                      <Link
                        href={item.href}
                        className="group flex flex-col gap-0.5 rounded-2xl px-3 py-3 transition-colors duration-ui hover:bg-white/10 focus-visible:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-genie-400"
                      >
                        <span className="font-display text-sm font-semibold text-onDark transition-colors group-hover:text-white">
                          {item.title}
                        </span>
                        <span className="text-xs leading-relaxed text-onDark-muted">
                          {item.description}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div className="border-t border-white/10 px-6 py-3">
                <Link
                  href={SERVICES_PILLARS_INDEX.href}
                  className="text-sm font-medium text-genie-300 transition-colors hover:text-genie-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-genie-400"
                >
                  {SERVICES_PILLARS_INDEX.label} →
                </Link>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </li>
  );
}
