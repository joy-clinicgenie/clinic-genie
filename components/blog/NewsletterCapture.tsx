"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { OrbAnchor } from "@/components/orb/OrbAnchor";
import { useOrbStore } from "@/components/orb/store";
import { ease } from "@/lib/motion";

/**
 * Email capture for Genie Tips. No real network call — on submit it shows a
 * friendly success state and fires the orb's one-shot burst (the orb "delivers"
 * the signup with a sparkle flare).
 */
export function NewsletterCapture() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const burst = useOrbStore((s) => s.burst);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) return;
    burst();
    setSent(true);
  }

  return (
    <Container size="content">
      <div className="relative">
        <OrbAnchor
          id="newsletter"
          mood="focus"
          scale={0.75}
          intensity={0.85}
          className="absolute left-1/2 top-2 hidden h-px w-px -translate-x-1/2 lg:block"
        />
        <GlassCard tone="dark" radius="2xl" glow className="overflow-hidden p-8 sm:p-12">
          <div className="mx-auto flex max-w-xl flex-col items-center text-center">
            <SectionHeading
              kicker="One good wish a month"
              title="Get one good wish a month."
              highlight="wish"
              align="center"
              as="h2"
            />
            <p className="mt-5 text-lead text-onDark-muted">
              Join clinic owners getting practical growth and compliance tips, no spam. Unsubscribe anytime.
            </p>

            <div className="mt-8 w-full">
              <AnimatePresence mode="wait" initial={false}>
                {sent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 12, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.5, ease: ease.glide }}
                    className="flex flex-col items-center gap-3"
                    role="status"
                    aria-live="polite"
                  >
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-genie-500/20 text-genie-200 shadow-glow-sm">
                      <svg width="22" height="22" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path
                          d="M3 8.5l3 3 7-7.5"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <p className="font-display text-h4 text-onDark">Wish granted.</p>
                    <p className="max-w-sm text-sm text-onDark-muted">
                      Your first Genie Tip is on its way. Watch your inbox once a month — no more, no spam.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: ease.glide }}
                    onSubmit={handleSubmit}
                    className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center"
                  >
                    <label htmlFor="newsletter-email" className="sr-only">
                      Your email address
                    </label>
                    <input
                      id="newsletter-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@yourclinic.com"
                      autoComplete="email"
                      className="w-full flex-1 rounded-pill border border-white/15 bg-white/[0.06] px-5 py-3.5 text-onDark placeholder:text-onDark-faint transition-[border-color,box-shadow] duration-ui ease-out-soft focus:border-genie-400/60 focus:outline-none focus:ring-2 focus:ring-genie-400/30"
                    />
                    <MagneticButton type="submit" size="md" withMiniOrb className="shrink-0">
                      Send me Genie Tips
                    </MagneticButton>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {!sent && (
              <p className="mt-4 text-xs text-onDark-faint">No spam. Unsubscribe in one click.</p>
            )}
          </div>
        </GlassCard>
      </div>
    </Container>
  );
}
