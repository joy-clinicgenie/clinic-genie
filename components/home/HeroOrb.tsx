"use client";

import Orb from "@/components/Orb";
import { MakeAWish } from "@/components/home/MakeAWish";
import { cn } from "@/lib/cn";
import styles from "./HeroOrb.module.css";

export function HeroOrb({ className }: { className?: string }) {
  return (
    <div className={cn(styles.stack, className)}>
      <div className={cn(styles.wrap, "motion-safe:animate-orb-bob")}>
        <div className={styles.orbFrame} aria-hidden="true">
          <Orb hue={0} hoverIntensity={0.12} rotateOnHover={false} forceHoverState={false} />
        </div>

        <div className={styles.wishPanel}>
          <MakeAWish
            tone="light"
            submitLabel="Make a wish"
            showChips={false}
            className={styles.wishForm}
          />
        </div>
      </div>
    </div>
  );
}
