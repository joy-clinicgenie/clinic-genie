"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/Kicker";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";
import styles from "./GenieTipsHero.module.css";

export function GenieTipsHero({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const veilOpacity = useTransform(scrollYProgress, [0, 0.85], [0, reduceMotion ? 0 : 0.16]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 10]);

  const titleParts = title.split(" ");

  const enter = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.45, ease: ease.glide, delay },
  });

  return (
    <section
      ref={sectionRef}
      data-nav-theme="dark"
      className={styles.hero}
    >
      <motion.div
        className={styles.imageLayer}
        style={{ y: imageY }}
        initial={reduceMotion ? false : { scale: 1.02 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.9, ease: ease.glide }}
      >
        <Image
          src="/about/office.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className={cn(styles.image, "object-cover")}
        />
      </motion.div>

      <div className={styles.overlayNav} aria-hidden="true" />
      <div className={styles.overlayCopy} aria-hidden="true" />
      <motion.div className={styles.veil} style={{ opacity: veilOpacity }} aria-hidden="true" />

      <Container className="relative z-10 w-full">
        <div className={styles.content}>
          <motion.div className={styles.kicker} {...enter(0.06)}>
            <Kicker tone="dark">Genie Tips</Kicker>
          </motion.div>

          <motion.h1 className={styles.title} {...enter(0.14)}>
            {titleParts.map((part) => (
              <span key={part} className={styles.line}>
                {part}
              </span>
            ))}
          </motion.h1>

          <motion.p className={cn(styles.body, "text-lead text-pretty")} {...enter(0.26)}>
            {subtitle}
          </motion.p>
        </div>
      </Container>
    </section>
  );
}
