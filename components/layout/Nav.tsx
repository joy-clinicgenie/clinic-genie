"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/ui/Logo";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { NAV_ITEMS, PRIMARY_CTA } from "@/lib/data/nav";
import { MobileMenu } from "./MobileMenu";

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [light, setLight] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const NAV_Y = 48; // vertical midpoint of the nav pill
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
      // Find which section is behind the nav and read its theme
      const sections = document.querySelectorAll<HTMLElement>("[data-nav-theme]");
      for (const el of sections) {
        const r = el.getBoundingClientRect();
        if (r.top <= NAV_Y && r.bottom > NAV_Y) {
          setLight(el.dataset.navTheme === "light");
          return;
        }
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 lg:flex lg:justify-center lg:px-[var(--page-pad)] lg:pt-4">
        <motion.nav
          className={cn(
            "flex w-full items-center justify-between gap-3 transition-all duration-ui",
            "px-[var(--page-pad)] py-2.5 pt-[calc(0.625rem+env(safe-area-inset-top,0px))]",
            /* Mobile — no background or border */
            "max-lg:border-transparent max-lg:bg-transparent max-lg:shadow-none",
            /* Desktop — floating glass pill */
            "lg:max-w-wide lg:gap-4 lg:rounded-pill lg:border lg:px-6 lg:py-3 lg:pt-3",
            scrolled
              ? light
                ? "lg:glass-light lg:border-ink-900/10 lg:shadow-glass-light"
                : "lg:glass lg:border-white/10 lg:shadow-glass-dark"
              : light
                ? "lg:border lg:border-ink-900/8 lg:bg-white/55 lg:shadow-glass-light lg:backdrop-blur-glass-light"
                : "lg:border lg:border-white/10 lg:bg-white/5 lg:backdrop-blur-glass"
          )}
        >
          <Logo tone={light ? "light" : "dark"} />

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href} className="relative">
                  <Link
                    href={item.href}
                    className={cn(
                      "relative inline-block rounded-md px-4 py-2.5 text-[0.9375rem] font-medium transition-colors duration-ui",
                      light
                        ? active ? "text-ink-900" : "text-ink-700 hover:text-ink-900"
                        : active ? "text-onDark" : "text-onDark-muted hover:text-onDark"
                    )}
                  >
                    {item.label}
                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-genie-500 to-spark-cyan"
                        style={{ boxShadow: "0 0 8px rgba(108,186,217,0.8)" }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <MagneticButton href={PRIMARY_CTA.href} size="sm" withMiniOrb>
                {PRIMARY_CTA.label}
              </MagneticButton>
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className={cn(
                "grid h-10 w-10 place-items-center rounded-full transition-colors lg:hidden",
                light ? "text-ink-900 hover:bg-ink-900/8" : "text-onDark hover:bg-white/10"
              )}
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </motion.nav>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
