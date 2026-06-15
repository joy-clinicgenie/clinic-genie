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
    const NAV_Y = 44; // vertical midpoint of the nav pill
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
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-[var(--page-pad)] pt-3 sm:pt-4">
        <motion.nav
          className={cn(
            "flex w-full max-w-wide items-center justify-between gap-4 rounded-pill border px-4 py-2.5 transition-all duration-ui sm:px-5",
            light ? "border-ink-900/10" : "border-white/10",
            scrolled
              ? light ? "glass-light shadow-glass-light" : "glass shadow-glass-dark"
              : light ? "border border-ink-900/8 bg-white/55 shadow-glass-light backdrop-blur-glass-light" : "border border-white/10 bg-white/5 backdrop-blur-glass"
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
                      "relative inline-block rounded-md px-3.5 py-2 text-sm font-medium transition-colors duration-ui",
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
