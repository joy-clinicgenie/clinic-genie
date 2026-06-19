"use client";

import { useSyncExternalStore } from "react";
import Orb from "@/components/Orb";
import { MakeAWish } from "@/components/home/MakeAWish";
import { cn } from "@/lib/cn";
import styles from "./HeroOrb.module.css";

function useMobileOrbWishLayout() {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia("(max-width: 1023px)");
      mq.addEventListener("change", onStoreChange);
      return () => mq.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia("(max-width: 1023px)").matches,
    () => true
  );
}

export function HeroOrb({
  className,
  showWishForm = true,
  orbWishLayout = false,
}: {
  className?: string;
  showWishForm?: boolean;
  orbWishLayout?: boolean;
}) {
  const mobileOrbWish = useMobileOrbWishLayout();

  return (
    <div className={cn(styles.stack, orbWishLayout && styles.orbWishLayout, className)}>
      <div className={cn(styles.wrap, "motion-safe:animate-orb-bob")}>
        <div className={styles.orbFrame} aria-hidden="true">
          <Orb hue={0} hoverIntensity={0.12} rotateOnHover={false} forceHoverState={false} />
        </div>

        {showWishForm && (
          <div className={styles.wishPanel}>
            <MakeAWish
              tone="light"
              submitLabel="Make a wish"
              showChips={false}
              layout={orbWishLayout && mobileOrbWish ? "stacked" : "inline"}
              className={styles.wishForm}
            />
          </div>
        )}
      </div>
    </div>
  );
}
