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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
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
            "flex w-full max-w-wide items-center justify-between gap-4 rounded-pill border border-white/10 px-4 py-2.5 transition-all duration-ui sm:px-5",
            scrolled ? "glass shadow-glass-dark" : "bg-transparent"
          )}
        >
          <Logo />

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href} className="relative">
                  <Link
                    href={item.href}
                    className={cn(
                      "relative inline-block rounded-md px-3.5 py-2 text-sm font-medium transition-colors duration-ui",
                      active ? "text-onDark" : "text-onDark-muted hover:text-onDark"
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
              className="grid h-10 w-10 place-items-center rounded-full text-onDark transition-colors hover:bg-white/10 lg:hidden"
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
