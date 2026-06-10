"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { OrbVisual } from "@/components/home/OrbVisual";
import { CTAButton } from "@/components/home/CTAButton";
import { useOrbStore } from "@/components/orb/store";
import { ease } from "@/lib/motion";

const CHIPS = ["More patients", "Rank #1 on Google", "A new website", "Trust & compliance"];

interface GenieAnswer {
  keywords: string[];
  title: string;
  body: string;
  cta: string;
  href: string;
}

const GENIE_ANSWERS: GenieAnswer[] = [
  {
    keywords: ["more patients", "patients", "enquiries", "bookings", "appointments", "patient"],
    title: "More patients, granted.",
    body: "You need qualified enquiries, not vanity clicks. Healthcare SEO + medical SEM, tuned to a cost-per-enquiry you can live with.",
    cta: "See Digital Growth",
    href: "/services#growth",
  },
  {
    keywords: ["rank", "google", "seo", "search", "ranking", "page 1", "#1", "number 1", "top"],
    title: "Page 1 is closer than you think.",
    body: "Treatment pages built around what patients actually search — not what textbooks call it. That's how specialist clinics rank in Singapore.",
    cta: "Read the SEO playbook",
    href: "/genie-tips/healthcare-seo-singapore-2026",
  },
  {
    keywords: ["website", "web", "site", "new website", "redesign", "build", "design"],
    title: "A clinic website that converts.",
    body: "Fast, accessible, beautifully designed clinic websites that earn trust in seconds and turn visitors into booked consultations.",
    cta: "See Brand & Experience Design",
    href: "/services#brand",
  },
  {
    keywords: ["trust", "compliance", "hcsa", "phmc", "advertising", "rules", "compliant"],
    title: "Growth without the risk.",
    body: "Singapore's healthcare advertising rules are real. Compliance-awareness is built into everything we write and ship — ambitious growth, responsibly delivered.",
    cta: "Read the compliance guide",
    href: "/genie-tips/healthcare-advertising-rules-singapore",
  },
  {
    keywords: ["ai", "ai search", "chatgpt", "gemini", "perplexity", "llm"],
    title: "Be the clinic AI recommends.",
    body: "More patients ask AI assistants before they Google. We structure your content to get cited in AI overviews — the new front page.",
    cta: "Read: AI Search for Clinics",
    href: "/genie-tips/will-ai-search-kill-clinic-google-traffic",
  },
  {
    keywords: ["brand", "logo", "identity", "name", "rebrand", "branding"],
    title: "Look as good as your care.",
    body: "A distinctive clinic identity that signals premium quality before a word is read — built to earn trust at first glance.",
    cta: "See Brand & Experience Design",
    href: "/services#brand",
  },
  {
    keywords: ["sem", "ads", "google ads", "paid", "ppc", "adwords", "budget"],
    title: "Spend that pays for itself.",
    body: "Medical SEM campaigns managed to a cost-per-enquiry you can track. No vanity metrics — just booked consultations.",
    cta: "See Digital Growth",
    href: "/services#growth",
  },
  {
    keywords: ["strategy", "plan", "roadmap", "grow", "growth", "start", "90 days"],
    title: "A clear path forward.",
    body: "Market research, strategic planning, and a 90-day roadmap tailored to your specialty. Know exactly where your next patients will come from.",
    cta: "See the Clinic Genie method",
    href: "/genie-tips/first-90-days-of-clinic-growth",
  },
];

function findMatch(query: string): GenieAnswer | null {
  const q = query.toLowerCase().trim();
  if (q.length < 2) return null;
  let best: { answer: GenieAnswer; score: number } | null = null;
  for (const answer of GENIE_ANSWERS) {
    const score = answer.keywords.reduce(
      (acc, kw) => (q.includes(kw.toLowerCase()) ? acc + kw.split(" ").length : acc),
      0
    );
    if (score > 0 && (!best || score > best.score)) best = { answer, score };
  }
  return best?.answer ?? null;
}

export function Hero() {
  const reduceMotion = useReducedMotion();
  const setScene = useOrbStore((s) => s.setScene);
  const [orbOpen, setOrbOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState<GenieAnswer | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Debounce typed queries; chip clicks resolve immediately via pickChip()
  useEffect(() => {
    if (!query.trim()) { setAnswer(null); return; }
    const t = setTimeout(() => setAnswer(findMatch(query)), 320);
    return () => clearTimeout(t);
  }, [query]);

  const pickChip = (chip: string) => {
    setQuery(chip);
    setAnswer(findMatch(chip));
  };

  // Keep panel open while input / chips are focused
  const handleSearchBlur = (e: React.FocusEvent) => {
    if (!searchRef.current?.contains(e.relatedTarget as Node)) {
      setOrbOpen(false);
    }
  };

  // Inline misty orb is the hero focal point — hide the global companion until scroll.
  useEffect(() => {
    setScene({ anchorId: null, intensity: 0.25, mood: "idle" });
    return () => setScene({ anchorId: "orb-anchor-hero", intensity: 0.7 });
  }, [setScene]);

  return (
    <section
      id="hero"
      data-nav-theme="light"
      aria-labelledby="hero-title"
      className="relative flex min-h-[88vh] items-center overflow-hidden bg-white pb-20 pt-28 lg:pt-32"
    >
      {/* Soft ambient teal/cyan tints on white */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(65%_50%_at_75%_8%,rgba(24,196,217,0.08),transparent_65%),radial-gradient(55%_45%_at_8%_78%,rgba(120,226,221,0.06),transparent_65%),linear-gradient(180deg,#F0F7F8_0%,#FFFFFF_40%,#F0F7F8_100%)]"
      />

      <Container size="wide" className="relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          {/* Copy */}
          <div className="flex flex-col gap-7 text-center lg:text-left">
            <motion.h1
              id="hero-title"
              className="font-display text-h1 text-balance text-ink-900"
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: ease.glide }}
            >
              The right patients are searching.
              <span className="mt-2 block bg-gradient-to-r from-genie-700 to-genie-500 bg-clip-text text-transparent">
                Clinic Genie helps them find you.
              </span>
            </motion.h1>

            <motion.p
              className="mx-auto max-w-[38ch] text-lead text-ink-700 lg:mx-0"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: ease.glide, delay: 0.12 }}
            >
              Clinic Genie helps specialist clinics grow through healthcare SEO, medical SEM, clinic websites,
              content, AI search, and compliance-aware digital strategy.
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center justify-center gap-4 lg:justify-start"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: ease.glide, delay: 0.24 }}
            >
              <CTAButton href="/contact">Book a Strategy Call</CTAButton>
              <CTAButton href="/portfolio" variant="ghost" tone="light">
                See Our Works
              </CTAButton>
            </motion.div>
          </div>

          {/* Orb + Ask Genie search */}
          <motion.div
            className="relative flex flex-col items-center gap-5 lg:items-end"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: ease.glide, delay: 0.15 }}
            onHoverStart={() => setOrbOpen(true)}
            onHoverEnd={() => setOrbOpen(false)}
          >
            {/* Orb subtly scales up when search is open */}
            <motion.div
              animate={orbOpen ? { scale: 1.04 } : { scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="cursor-pointer"
              onClick={() => setOrbOpen((v) => !v)}
              aria-label="Ask Genie"
            >
              <OrbVisual
                state={orbOpen ? "forming" : "misty"}
                float={!reduceMotion}
                size="hero"
              />
            </motion.div>

            {/* Search panel — hover/tap reveal */}
            <AnimatePresence>
              {orbOpen && (
                <motion.div
                  key="genie-search"
                  ref={searchRef}
                  role="search"
                  aria-label="Ask Genie"
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  onBlur={handleSearchBlur}
                  className="w-full max-w-sm"
                >
                  <div className="glass-light rounded-2xl p-3 shadow-md">
                    {/* Input row */}
                    <div className="flex items-center gap-2 rounded-xl px-3 py-2">
                      <svg
                        aria-hidden="true"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        className="shrink-0 text-genie-500"
                      >
                        <path
                          d="M7 0l1.4 4.3H13l-3.7 2.7 1.4 4.3L7 8.6l-3.7 2.7 1.4-4.3L1 4.3h4.6L7 0z"
                          fill="currentColor"
                        />
                      </svg>
                      <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Tell the orb what your clinic needs…"
                        className="flex-1 bg-transparent text-sm text-ink-900 placeholder:text-ink-700/50 outline-none"
                        autoFocus={false}
                      />
                      <Link
                        href={`/contact${query ? `?q=${encodeURIComponent(query)}` : ""}`}
                        className="rounded-pill bg-gradient-to-br from-genie-500 to-genie-700 px-4 py-1.5 text-sm font-semibold text-white shadow-glow-sm transition-shadow hover:shadow-glow-md"
                      >
                        Make a wish
                      </Link>
                    </div>

                    {/* Quick-pick chips */}
                    <div className="mt-2 flex flex-wrap gap-1.5 px-2 pb-1">
                      {CHIPS.map((chip) => (
                        <button
                          key={chip}
                          type="button"
                          onClick={() => pickChip(chip)}
                          className="rounded-pill border border-ink-900/12 px-3 py-1 text-xs font-medium text-ink-700 transition-colors hover:border-genie-500/60 hover:text-genie-700"
                        >
                          {chip}
                        </button>
                      ))}
                    </div>

                    {/* Answer card */}
                    <AnimatePresence>
                      {answer && (
                        <motion.div
                          key={answer.href}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 4 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="mx-1 mb-1 mt-2 rounded-xl bg-cg-teal-5 px-4 py-3"
                        >
                          <p className="text-sm font-semibold text-ink-900">{answer.title}</p>
                          <p className="mt-1 text-xs leading-relaxed text-ink-700">{answer.body}</p>
                          <Link
                            href={answer.href}
                            className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-genie-700 transition-colors hover:text-genie-500"
                          >
                            {answer.cta}
                            <span aria-hidden="true">→</span>
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Mobile nudge — visible on touch, hidden once search is open */}
            {!orbOpen && (
              <p className="text-xs text-ink-700/50 lg:hidden">
                Tap the orb to ask Genie
              </p>
            )}
          </motion.div>
        </div>
      </Container>

      <Link
        href="#why"
        aria-label="Scroll to Why Clinic Genie"
        className="absolute bottom-8 left-1/2 z-10 grid h-[42px] w-[26px] -translate-x-1/2 place-items-start rounded-[14px] border border-ink-900/15 pt-2 transition-colors hover:border-genie-500/50 focus-visible:shadow-focus"
      >
        <span
          aria-hidden="true"
          className="h-2 w-1 rounded-sm bg-genie-600 motion-safe:animate-cue"
        />
      </Link>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#EAFBFB]"
      />
    </section>
  );
}
