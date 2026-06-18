"use client";

import { useState } from "react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";
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
  cta: "Make Your First Wish",
  match: [],
};

const CHIPS = ["More patients", "Rank #1 on Google", "A new website", "Trust & compliance"];
const PLACEHOLDER = "What's your clinic's wish?";

function resolveWish(input: string): Wish {
  const q = input.toLowerCase();
  return WISHES.find((w) => w.match.some((m) => q.includes(m))) ?? FALLBACK;
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className={className}>
      <path d="M9 1.5l1.6 4.9 4.9 1.6-4.9 1.6L9 14.5l-1.6-4.9L2.5 8l4.9-1.6L9 1.5z" fill="currentColor" />
    </svg>
  );
}

export function MakeAWish({
  tone = "dark",
  submitLabel = "Ask",
  className,
  chipLayout = "wrap",
  showChips = true,
}: {
  tone?: "dark" | "light";
  submitLabel?: string;
  className?: string;
  chipLayout?: "wrap" | "grid";
  showChips?: boolean;
}) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [answer, setAnswer] = useState<Wish | null>(null);
  const [thinking, setThinking] = useState(false);
  const reduceMotion = useReducedMotion();
  const setScene = useOrbStore((s) => s.setScene);
  const burst = useOrbStore((s) => s.burst);
  const isLight = tone === "light";
  const showSparkle = hovered || focused;

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
    <div className={cn("flex w-full flex-col gap-3", className)}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          ask(value);
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={cn(
          "group flex items-center gap-0 overflow-hidden rounded-pill p-2 pl-5 transition-[gap,box-shadow,border-color] duration-200 hover:gap-2 focus-within:gap-2",
          isLight
            ? "glass-light shadow-glass-light focus-within:border-[#54B9CE]/45"
            : "glass pl-5"
        )}
      >
        <div className="shrink-0 overflow-hidden">
          <AnimatePresence initial={false}>
            {showSparkle && (
              <motion.span
                key="sparkle"
                aria-hidden="true"
                className="block"
                initial={
                  reduceMotion
                    ? false
                    : { opacity: 0, x: -18, clipPath: "inset(0 100% 0 0)", filter: "blur(6px)" }
                }
                animate={{ opacity: 1, x: 0, clipPath: "inset(0 0% 0 0)", filter: "blur(0px)" }}
                exit={{
                  opacity: 0,
                  x: -12,
                  clipPath: "inset(0 100% 0 0)",
                  filter: "blur(4px)",
                  transition: { duration: 0.28, ease: ease.outSoft },
                }}
                transition={{ duration: 0.45, ease: ease.glide }}
              >
                <StarIcon className={cn(isLight ? "text-[#54B9CE]" : "text-genie-300")} />
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <div className="relative min-w-0 flex-1">
          <AnimatePresence>
            {!value && !focused && (
              <motion.span
                key="placeholder"
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute inset-y-0 left-0 flex items-center truncate py-2.5 text-[0.9375rem]",
                  isLight ? "text-[#A8B4B8]" : "text-onDark-faint"
                )}
                initial={
                  reduceMotion
                    ? false
                    : { opacity: 0, x: -22, clipPath: "inset(0 100% 0 0)", filter: "blur(4px)" }
                }
                animate={{ opacity: 1, x: 0, clipPath: "inset(0 0% 0 0)", filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -10, transition: { duration: 0.2, ease: ease.outSoft } }}
                transition={{ duration: 0.7, ease: ease.glide, delay: 0.28 }}
              >
                {PLACEHOLDER}
              </motion.span>
            )}
          </AnimatePresence>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            aria-label={PLACEHOLDER}
            className={cn(
              "w-full min-w-0 bg-transparent py-2.5 text-[0.9375rem] focus:outline-none",
              isLight ? "text-ink-900" : "text-onDark"
            )}
          />
        </div>
        <MagneticButton type="submit" size="md" withMiniOrb className="shrink-0">
          {submitLabel}
        </MagneticButton>
      </form>

      {showChips && (
        <div className={cn(chipLayout === "grid" ? "grid grid-cols-2 gap-2" : "flex flex-wrap gap-2")}>
          {CHIPS.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => {
                setValue(chip);
                ask(chip);
              }}
              className={cn(
                "rounded-pill px-3.5 py-2 text-xs transition-colors",
                isLight
                  ? "border border-[#E6EEF1] bg-white text-[#395D66] hover:border-[#54B9CE]/50 hover:text-[#217B8E]"
                  : "border border-white/15 bg-white/5 text-onDark-muted hover:border-genie-400/50 hover:text-onDark"
              )}
            >
              {chip}
            </button>
          ))}
        </div>
      )}

      <div role="status" aria-live="polite">
        <AnimatePresence mode="wait">
          {thinking && (
            <motion.p
              key="thinking"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={cn("px-1 text-sm", isLight ? "text-[#54B9CE]" : "text-genie-300")}
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
              className={cn(
                "flex flex-col gap-2 rounded-xl p-5 text-left",
                isLight ? "glass-light" : "glass-tint"
              )}
            >
              <h3 className={cn("font-display text-base font-semibold", isLight ? "text-ink-900" : "text-onDark")}>
                {answer.title}
              </h3>
              <p className={cn("text-sm leading-relaxed", isLight ? "text-[#7E8C92]" : "text-onDark-muted")}>
                {answer.body}
              </p>
              <MagneticButton
                href={answer.href}
                size="sm"
                variant="ghost"
                tone={isLight ? "light" : "dark"}
                magnetic={false}
                className={cn(
                  "mt-1 w-fit border-0 bg-transparent px-0 py-0 text-sm font-medium shadow-none hover:-translate-y-0",
                  isLight ? "text-[#217B8E]" : "text-genie-300"
                )}
              >
                {answer.cta}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </MagneticButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
