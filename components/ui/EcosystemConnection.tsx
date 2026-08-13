"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SparkleIcon } from "@/components/ui/SparkleIcon";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";
import styles from "./EcosystemConnection.module.css";

/**
 * Minimal vertical brand-connection device.
 * Clinic Genie at the top, a related ecosystem element below.
 */
export function EcosystemConnection({
  from,
  to,
  className,
}: {
  from: string;
  to: string;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  const fade = (delay: number, y = 0) =>
    reduceMotion
      ? { initial: false as const, animate: { opacity: 1, y: 0, scale: 1 } }
      : {
          initial: { opacity: 0, y, scale: 1 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.55 },
          transition: { duration: 0.35, ease: ease.glide, delay },
        };

  return (
    <div className={cn(styles.root, className)} aria-hidden="true">
      <div className={styles.glow} />

      <motion.p
        className={cn(
          styles.label,
          "mb-1.5 font-sans text-kicker font-semibold uppercase tracking-widest text-genie-700"
        )}
        {...fade(0.16)}
      >
        {from}
      </motion.p>

      <motion.span className={styles.node} {...fade(0.2)} />

      <div className={styles.stem}>
        <motion.span
          className={styles.line}
          initial={reduceMotion ? false : { scaleY: 0 }}
          whileInView={reduceMotion ? undefined : { scaleY: 1 }}
          viewport={{ once: true, amount: 0.55 }}
          transition={{ duration: 0.28, ease: ease.glide, delay: 0.26 }}
        />
        <span className={styles.sparkle}>
          <motion.span
            className="block"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.88 }}
            whileInView={
              reduceMotion ? undefined : { opacity: [0, 1, 0.72, 1], scale: 1 }
            }
            viewport={{ once: true, amount: 0.55 }}
            transition={{ duration: 0.3, ease: ease.glide, delay: 0.48 }}
          >
            <SparkleIcon />
          </motion.span>
        </span>
      </div>

      <motion.span className={styles.node} {...fade(0.58)} />

      <motion.p
        className={cn(
          styles.label,
          "mt-1.5 font-sans text-kicker font-semibold uppercase tracking-widest text-genie-700"
        )}
        {...fade(0.58)}
      >
        {to}
      </motion.p>
    </div>
  );
}
