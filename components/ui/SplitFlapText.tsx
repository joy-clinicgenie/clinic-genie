"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";

const CHARSET = "0123456789+-$K. ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function randomChar(final: string) {
  let c = final;
  let attempts = 0;
  while (c === final && attempts < 5) {
    c = CHARSET[Math.floor(Math.random() * CHARSET.length)] ?? "0";
    attempts++;
  }
  return c;
}

type Slot = { char: string; tick: number };

function SplitFlapChar({ char, tick }: { char: string; tick: number }) {
  const display = char === " " ? "\u00A0" : char;

  return (
    <span
      className={cn(
        "relative inline-block overflow-hidden align-bottom",
        char === " " ? "w-[0.28em]" : "min-w-[0.52em] text-center"
      )}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={tick}
          initial={{ rotateX: -88, opacity: 0.25 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: 88, opacity: 0.25 }}
          transition={{ duration: 0.14, ease: ease.glide }}
          className="inline-block origin-[50%_100%]"
          style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
        >
          {display}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function SplitFlapText({
  text,
  startDelay = 0,
  charStagger = 90,
  flipsPerChar = 7,
  flipInterval = 52,
  className,
}: {
  text: string;
  startDelay?: number;
  charStagger?: number;
  flipsPerChar?: number;
  flipInterval?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const [slots, setSlots] = useState<Slot[]>(() =>
    text.split("").map(() => ({ char: " ", tick: 0 }))
  );

  useEffect(() => {
    if (!inView) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setSlots(text.split("").map((char, i) => ({ char, tick: i + 1 })));
      return;
    }

    const targets = text.split("");
    const timers: ReturnType<typeof setTimeout>[] = [];

    targets.forEach((target, index) => {
      for (let flip = 0; flip < flipsPerChar; flip++) {
        const isFinal = flip === flipsPerChar - 1;
        const nextChar = isFinal ? target : randomChar(target);
        const at = startDelay + index * charStagger + flip * flipInterval;

        timers.push(
          setTimeout(() => {
            setSlots((prev) => {
              const next =
                prev.length === targets.length
                  ? [...prev]
                  : targets.map(() => ({ char: " ", tick: 0 }));
              next[index] = {
                char: nextChar,
                tick: (next[index]?.tick ?? 0) + 1,
              };
              return next;
            });
          }, at)
        );
      }
    });

    return () => timers.forEach(clearTimeout);
  }, [inView, text, startDelay, charStagger, flipsPerChar, flipInterval]);

  return (
    <span
      ref={ref}
      className={cn("inline-flex [perspective:900px]", className)}
      aria-label={text}
    >
      {slots.map((slot, i) => (
        <SplitFlapChar key={i} char={slot.char} tick={slot.tick} />
      ))}
    </span>
  );
}
