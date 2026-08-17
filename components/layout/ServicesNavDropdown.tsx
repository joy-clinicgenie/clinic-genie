"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";
import {
  SERVICES_GROUPS,
  SERVICES_PILLARS_INDEX,
  type NavDropdownItem,
} from "@/lib/data/nav";
import styles from "./ServicesNavDropdown.module.css";

interface ServicesNavDropdownProps {
  label: string;
  href: string;
  items: NavDropdownItem[];
  active: boolean;
  light: boolean;
}

function ServiceRow({
  item,
  index,
  reduceMotion,
  current,
}: {
  item: NavDropdownItem;
  index: number;
  reduceMotion: boolean | null;
  current: boolean;
}) {
  return (
    <motion.li
      initial={reduceMotion ? false : { opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.22,
        ease: ease.outSoft,
        delay: 0.08 + index * 0.025,
      }}
    >
      <Link
        href={item.href}
        aria-current={current ? "page" : undefined}
        className={cn(
          styles.row,
          "group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-genie-400 focus-visible:ring-offset-2 focus-visible:ring-offset-night-950"
        )}
      >
        <span aria-hidden="true" className={styles.rowGlow} />
        <span className={cn(styles.rowContent, "relative")}>
          <span className="font-display text-h6 font-semibold text-onDark transition-colors duration-micro group-hover:text-white group-focus-visible:text-white">
            {item.title}
          </span>
          <span className="max-w-sm text-sm leading-snug text-onDark-muted/80">
            {item.description}
          </span>
        </span>
        <ArrowUpRight
          aria-hidden="true"
          strokeWidth={1.75}
          className={cn(styles.rowArrow, "relative h-4 w-4 shrink-0 text-genie-300/70")}
        />
      </Link>
    </motion.li>
  );
}

export function ServicesNavDropdown({
  label,
  href,
  items: _items,
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

  const closeMenu = () => {
    clearCloseTimer();
    setOpen(false);
  };

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenu();
        const trigger = rootRef.current?.querySelector<HTMLElement>("[data-nav-trigger]");
        trigger?.focus();
      }
    };

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node | null;
      if (target && !rootRef.current?.contains(target)) {
        closeMenu();
      }
    };

    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
    };
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
        aria-current={active ? "page" : undefined}
        className={cn(
          "relative inline-flex items-center gap-1 rounded-pill px-4 py-2 text-[0.9375rem] font-semibold tracking-[0.01em] transition-colors duration-ui",
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
        <ChevronDown
          aria-hidden="true"
          className={cn(
            "h-3.5 w-3.5 shrink-0 transition-transform duration-ui motion-reduce:transition-none",
            open && "rotate-180"
          )}
          strokeWidth={2}
        />
      </Link>

      <AnimatePresence>
        {open ? (
          <motion.div
            id={panelId}
            role="region"
            aria-label="Services"
            initial={
              reduceMotion
                ? false
                : { opacity: 0, y: -8, x: "-50%", filter: "blur(4px)" }
            }
            animate={{ opacity: 1, y: 0, x: "-50%", filter: "blur(0px)" }}
            exit={
              reduceMotion
                ? undefined
                : { opacity: 0, y: -6, x: "-50%", filter: "blur(3px)" }
            }
            transition={{ duration: 0.3, ease: ease.outSoft }}
            className="absolute left-1/2 top-full z-50 mt-4 w-[min(75rem,calc(100vw-2rem))]"
            onMouseEnter={openMenu}
            onMouseLeave={scheduleClose}
          >
            <div className={styles.shell}>
              <div className={styles.panel}>
                <header className="relative z-10 flex flex-col gap-4 px-6 pb-2 pt-7 sm:flex-row sm:items-end sm:justify-between sm:gap-8 sm:px-8 sm:pb-3 sm:pt-8">
                  <div className="max-w-md">
                    <p className="text-kicker uppercase text-genie-300">Services</p>
                    <p className="mt-2 font-display text-h5 font-semibold tracking-tight text-onDark text-balance">
                      A connected growth system
                      <br className="hidden sm:block" /> for specialist clinics.
                    </p>
                  </div>
                  <Link
                    href={SERVICES_PILLARS_INDEX.href}
                    aria-current={pathname === SERVICES_PILLARS_INDEX.href ? "page" : undefined}
                    className="inline-flex shrink-0 items-center gap-1.5 self-start text-sm font-medium text-genie-300 transition-colors duration-micro hover:text-genie-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-genie-400 sm:self-auto"
                  >
                    {SERVICES_PILLARS_INDEX.label}
                    <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.75} />
                  </Link>
                </header>

                <div className="relative z-10 grid grid-cols-1 gap-6 px-4 py-4 sm:gap-8 sm:px-6 sm:py-5 lg:grid-cols-2 lg:gap-10 lg:px-8 lg:pb-6 lg:pt-5">
                  {SERVICES_GROUPS.map((group, groupIndex) => {
                    const groupOffset = SERVICES_GROUPS.slice(0, groupIndex).reduce(
                      (total, current) => total + current.items.length,
                      0
                    );

                    return (
                      <section key={group.id} aria-labelledby={`${panelId}-${group.id}`}>
                        <h3
                          id={`${panelId}-${group.id}`}
                          className="mb-1 px-2 text-xs font-semibold uppercase tracking-[0.14em] text-onDark-muted/70"
                        >
                          {group.label}
                        </h3>
                        <ul>
                          {group.items.map((item, itemIndex) => (
                            <ServiceRow
                              key={item.href}
                              item={item}
                              index={groupOffset + itemIndex}
                              reduceMotion={reduceMotion}
                              current={
                                pathname === item.href || pathname.startsWith(`${item.href}/`)
                              }
                            />
                          ))}
                        </ul>
                      </section>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </li>
  );
}
