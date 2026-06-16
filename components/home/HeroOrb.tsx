"use client";

import { useEffect, useState } from "react";
import Orb from "@/components/Orb";
import { MakeAWish } from "@/components/home/MakeAWish";
import { cn } from "@/lib/cn";
import styles from "./HeroOrb.module.css";

export function HeroOrb({ className }: { className?: string }) {
  const [active, setActive] = useState(false);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setCanHover(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <div className={cn(styles.stack, className)}>
      <div
        className={cn(styles.wrap, active && styles.active, "motion-safe:animate-orb-bob")}
        tabIndex={-1}
        onMouseEnter={() => {
          if (canHover) setActive(true);
        }}
        onMouseLeave={() => {
          if (canHover) setActive(false);
        }}
        onFocusCapture={() => setActive(true)}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setActive(false);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape") setActive(false);
        }}
      >
        <button
          type="button"
          className={styles.orbHit}
          aria-label="Ask the orb a question"
          aria-expanded={active}
          tabIndex={active ? -1 : 0}
          onClick={() => {
            if (!canHover) setActive((open) => !open);
          }}
        >
          {!active && <Orb hue={0} hoverIntensity={0} rotateOnHover={false} forceHoverState={false} />}
        </button>

        <div className={styles.wishPanel} aria-hidden={!active}>
          <MakeAWish tone="light" submitLabel="Make a wish" chipLayout="grid" className={styles.wishForm} />
        </div>
      </div>

      {!active && (
        <p className={styles.nudge} aria-hidden="true">
          {canHover ? "Hover the orb to make a wish" : "Tap the orb to make a wish"}
        </p>
      )}
    </div>
  );
}
