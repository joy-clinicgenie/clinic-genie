"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

const PREFIX = "I Wish for...";

export const ORB_WISH_SUFFIXES = [
  "Better Visibility",
  "Qualified Leads",
  "More Bookings",
] as const;

function splitSuffix(phrase: string): [string, string] {
  const [first = "", ...rest] = phrase.split(" ");
  return [first, rest.join(" ")];
}

const SUFFIX_LINES = ORB_WISH_SUFFIXES.map(splitSuffix);
const LINE1_LONGEST = SUFFIX_LINES.reduce(
  (longest, [line1]) => (line1.length > longest.length ? line1 : longest),
  SUFFIX_LINES[0][0]
);
const LINE2_LONGEST = SUFFIX_LINES.reduce(
  (longest, [, line2]) => (line2.length > longest.length ? line2 : longest),
  SUFFIX_LINES[0][1]
);

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz.!@#$*()_+";
const DWELL_MS = 2500;
const SCRAMBLE_INTERVAL_MS = 36;
const SETTLE_STAGGER_MS = 42;
const SCRAMBLES_PER_CHAR = 4;

function randomChar(): string {
  return CHARSET[Math.floor(Math.random() * CHARSET.length)] ?? "a";
}

function scrambleText(target: string): string {
  return target
    .split("")
    .map((char) => (char === " " ? " " : randomChar()))
    .join("");
}

function SuffixLines({ text }: { text: string }): ReactNode {
  const [line1, line2] = splitSuffix(text);
  return (
    <>
      <span className="block">{line1 || "\u00A0"}</span>
      <span className="block">{line2 || "\u00A0"}</span>
    </>
  );
}

export interface OrbWishDecryptProps {
  className?: string;
}

/**
 * Static “I wish for” with a looping decrypt animation for wish suffixes.
 */
export function OrbWishDecrypt({ className }: OrbWishDecryptProps) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState<string>(ORB_WISH_SUFFIXES[0]);
  const [decrypting, setDecrypting] = useState(false);
  const [rmOpacity, setRmOpacity] = useState(1);

  const target = ORB_WISH_SUFFIXES[index];
  const fullWish = `${PREFIX} ${target}`;

  useEffect(() => {
    if (reduceMotion) {
      setDecrypting(false);
      setRmOpacity(0);
      const fadeIn = setTimeout(() => {
        setDisplay(target);
        setRmOpacity(1);
      }, 160);
      const advance = setTimeout(() => {
        setIndex((prev) => (prev + 1) % ORB_WISH_SUFFIXES.length);
      }, DWELL_MS + 160);
      return () => {
        clearTimeout(fadeIn);
        clearTimeout(advance);
      };
    }

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const chars = target.split("");

    setDecrypting(true);
    setDisplay(scrambleText(target));

    chars.forEach((finalChar, charIndex) => {
      for (let scramble = 0; scramble < SCRAMBLES_PER_CHAR; scramble++) {
        const isFinal = scramble === SCRAMBLES_PER_CHAR - 1;
        const at =
          charIndex * SETTLE_STAGGER_MS + scramble * SCRAMBLE_INTERVAL_MS;

        timers.push(
          setTimeout(() => {
            if (cancelled) return;
            setDisplay((prev) => {
              const next = prev.padEnd(chars.length, " ").split("");
              next[charIndex] =
                isFinal || finalChar === " " ? finalChar : randomChar();
              return next.slice(0, chars.length).join("");
            });
            if (isFinal && charIndex === chars.length - 1) {
              setDecrypting(false);
            }
          }, at)
        );
      }
    });

    const decryptDuration =
      (chars.length - 1) * SETTLE_STAGGER_MS +
      SCRAMBLES_PER_CHAR * SCRAMBLE_INTERVAL_MS;

    timers.push(
      setTimeout(() => {
        if (cancelled) return;
        setIndex((prev) => (prev + 1) % ORB_WISH_SUFFIXES.length);
      }, decryptDuration + DWELL_MS)
    );

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [index, reduceMotion, target]);

  return (
    <div className={cn("flex flex-col items-center text-center", className)}>
      <p
        className="font-display text-sm font-medium tracking-wide text-ink-500 sm:text-base"
        aria-hidden="true"
      >
        {PREFIX}
      </p>
      <p
        className={cn(
          "relative mt-1 w-max max-w-none font-display text-[calc(0.9375rem+3.1em)] font-black leading-[0.95] sm:text-[calc(1rem+4.5em)] lg:text-[calc(1.045rem+2.8em)]",
          !reduceMotion && "transition-colors duration-200",
          !reduceMotion && (decrypting ? "text-ink-700/50" : "text-ink-700"),
          reduceMotion && "text-ink-700"
        )}
        aria-hidden="true"
      >
        <span className="invisible block" aria-hidden="true">
          <span className="block">{LINE1_LONGEST}</span>
          <span className="block">{LINE2_LONGEST}</span>
        </span>
        {reduceMotion ? (
          <motion.span
            className="absolute inset-0 flex flex-col items-center justify-center"
            animate={{ opacity: rmOpacity }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <SuffixLines text={display} />
          </motion.span>
        ) : (
          <span className="absolute inset-0 flex flex-col items-center justify-center">
            <SuffixLines text={display} />
          </span>
        )}
      </p>
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {fullWish}
      </p>
    </div>
  );
}

export default OrbWishDecrypt;
