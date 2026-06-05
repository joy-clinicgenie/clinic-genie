"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useOrbStore } from "@/components/orb/store";

interface Wish {
  match: string[];
  title: string;
  body: string;
  href: string;
  cta: string;
}

const WISHES: Wish[] = [
  {
    match: ["patient", "enquir", "booking", "leads", "more"],
    title: "More patients, granted.",
    body: "You need qualified enquiries, not vanity clicks. Healthcare SEO + medical SEM, tuned to a cost-per-enquiry you can live with.",
    href: "/services#growth",
    cta: "See Digital Growth",
  },
  {
    match: ["rank", "google", "seo", "#1", "first", "found", "search"],
    title: "Rank where patients look.",
    body: "We build compliance-aware, doctor-reviewed pages that win the high-intent treatment searches your future patients actually type.",
    href: "/services#growth",
    cta: "See Healthcare SEO",
  },
  {
    match: ["website", "site", "web", "slow", "fast"],
    title: "A clinic site that converts.",
    body: "Fast, accessible, conversion-focused websites built on a modern stack — so patients trust you in the first three seconds.",
    href: "/services#brand",
    cta: "See Web & Brand",
  },
  {
    match: ["brand", "logo", "design", "identity"],
    title: "Look as good as your care.",
    body: "A distinctive, premium clinic identity that signals quality before a single word is read.",
    href: "/services#brand",
    cta: "See Brand & Design",
  },
  {
    match: ["ad", "sem", "paid", "ppc"],
    title: "Paid search that books.",
    body: "Targeted Google campaigns managed to bookings, not clicks — with full conversion tracking.",
    href: "/services#growth",
    cta: "See Medical SEM",
  },
  {
    match: ["trust", "complian", "rules", "moh", "licen"],
    title: "Growth, responsibly delivered.",
    body: "Compliance-awareness is built into everything we ship, aligned to Singapore's PHMC/HCSA advertising guidelines.",
    href: "/services#process",
    cta: "How we work",
  },
];

const FALLBACK: Wish = {
  title: "Let's map your wish.",
  body: "Tell us where you want to grow and we'll recommend the right mix — strategy, growth and brand, woven into one engine.",
  href: "/contact",
  cta: "Book a strategy call",
  match: [],
};

const CHIPS = ["More patients", "Rank #1 on Google", "A new website", "Trust & compliance"];

function resolveWish(input: string): Wish {
  const q = input.toLowerCase();
  return WISHES.find((w) => w.match.some((m) => q.includes(m))) ?? FALLBACK;
}

export function MakeAWish() {
  const [value, setValue] = useState("");
  const [answer, setAnswer] = useState<Wish | null>(null);
  const [thinking, setThinking] = useState(false);
  const setScene = useOrbStore((s) => s.setScene);
  const burst = useOrbStore((s) => s.burst);

  const ask = (text: string) => {
    if (!text.trim()) return;
    const wish = resolveWish(text);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setAnswer(wish);
      return;
    }
    setThinking(true);
    setAnswer(null);
    setScene({ mood: "thinking", intensity: 0.5 });
    window.setTimeout(() => {
      setThinking(false);
      setAnswer(wish);
      setScene({ mood: "celebrate", intensity: 1 });
      burst();
    }, 750);
  };

  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          ask(value);
        }}
        className="glass flex items-center gap-2 rounded-pill p-1.5 pl-5"
      >
        <span aria-hidden="true" className="text-genie-300">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 1.5l1.6 4.9 4.9 1.6-4.9 1.6L9 14.5l-1.6-4.9L2.5 8l4.9-1.6L9 1.5z" fill="currentColor" />
          </svg>
        </span>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Tell the orb what your clinic needs…"
          aria-label="Tell the orb what your clinic needs"
          className="flex-1 bg-transparent py-2 text-sm text-onDark placeholder:text-onDark-faint focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-pill bg-gradient-to-br from-genie-500 to-genie-700 px-5 py-2.5 text-sm font-semibold text-white shadow-glow-cta transition-shadow hover:shadow-glow-cta-hover"
        >
          Ask
        </button>
      </form>

      <div className="flex flex-wrap gap-2">
        {CHIPS.map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => {
              setValue(chip);
              ask(chip);
            }}
            className="rounded-pill border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs text-onDark-muted transition-colors hover:border-genie-400/50 hover:text-onDark"
          >
            {chip}
          </button>
        ))}
      </div>

      <div role="status" aria-live="polite">
      <AnimatePresence mode="wait">
        {thinking && (
          <motion.p
            key="thinking"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-1 text-sm text-genie-300"
          >
            The orb is reading the signs…
          </motion.p>
        )}
        {answer && (
          <motion.div
            key="answer"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="glass-tint flex flex-col gap-2 rounded-xl p-5 text-left"
          >
            <h3 className="font-display text-base font-semibold text-onDark">{answer.title}</h3>
            <p className="text-sm leading-relaxed text-onDark-muted">{answer.body}</p>
            <Link
              href={answer.href}
              className="mt-1 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-genie-300 hover:gap-2.5"
            >
              {answer.cta}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
}
