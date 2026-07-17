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
import { ServicesNavDropdown } from "./ServicesNavDropdown";

export function Nav() {
  const pathname = usePathname();
  const [light, setLight] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const NAV_Y = 48; // vertical midpoint of the nav bar
    const onScroll = () => {
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
            "grid w-full grid-cols-[1fr_auto] items-center gap-3 bg-transparent transition-colors duration-ui",
            "px-[var(--page-pad)] py-2.5 pt-[calc(0.625rem+env(safe-area-inset-top,0px))]",
            /* Desktop — transparent three-zone bar, no glass */
            "lg:grid-cols-[1fr_auto_1fr] lg:max-w-wide lg:gap-4 lg:px-6 lg:py-3 lg:pt-3"
          )}
        >
          <div className="justify-self-start">
            <Logo tone={light ? "light" : "dark"} />
          </div>

          <ul className="relative hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => {
              const active = !item.disabled && isActive(item.href);

              if (item.children?.length) {
                return (
                  <ServicesNavDropdown
                    key={item.href}
                    label={item.label}
                    href={item.href}
                    items={item.children}
                    active={active}
                    light={light}
                  />
                );
              }

              if (item.disabled) {
                return (
                  <li key={item.href}>
                    <span
                      aria-disabled="true"
                      title="Coming soon"
                      className={cn(
                        "relative inline-flex cursor-default items-center rounded-pill px-4 py-2 text-[0.9375rem] font-medium",
                        light ? "text-ink-400" : "text-onDark-muted/60"
                      )}
                    >
                      {item.label}
                    </span>
                  </li>
                );
              }

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "relative inline-flex items-center rounded-pill px-4 py-2 text-[0.9375rem] font-medium transition-colors duration-ui",
                      light
                        ? active
                          ? "bg-ink-900 text-white"
                          : "text-ink-700 hover:bg-ink-900/8 hover:text-ink-900"
                        : active
                          ? "bg-white/15 text-onDark"
                          : "text-onDark-muted hover:bg-white/10 hover:text-onDark"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center justify-self-end gap-2">
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
