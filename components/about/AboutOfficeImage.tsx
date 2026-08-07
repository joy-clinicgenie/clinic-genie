"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export function AboutOfficeImage() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageOpacity = useTransform(scrollYProgress, [0, 0.45, 1], [0.88, 0.72, 0.55]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  const washOpacity = useTransform(scrollYProgress, [0, 0.45, 1], [0.55, 0.85, 1]);

  return (
    <figure
      ref={ref}
      className="relative z-20 aspect-[15/8] w-full overflow-hidden rounded-xl shadow-lg"
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-cg-sky via-cg-teal-60 to-cg-teal-100"
        style={reduceMotion ? undefined : { opacity: washOpacity }}
      />
      <motion.div
        className="absolute inset-[-8%] will-change-transform"
        style={reduceMotion ? undefined : { y: imageY, opacity: imageOpacity }}
      >
        <Image
          src="/about/office.png"
          alt="Clinic Genie team workspace for specialist clinic marketing"
          fill
          priority
          className={reduceMotion ? "object-cover object-center opacity-75" : "object-cover object-center"}
          sizes="(min-width: 1280px) 82.5rem, 100vw"
        />
      </motion.div>
    </figure>
  );
}
