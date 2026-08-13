"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";

const OFFICE_WIDTH = 1981;
const OFFICE_HEIGHT = 793;

export function AboutOfficeImage() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-2%", "2%"]);

  return (
    <motion.figure
      ref={ref}
      className={cn(
        "relative z-20 w-full overflow-hidden rounded-xl",
        "max-lg:aspect-[4/3] max-lg:shadow-sm lg:shadow-lg"
      )}
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.55, ease: ease.glide }}
    >
      <motion.div
        className="max-lg:absolute max-lg:-top-[4%] max-lg:left-0 max-lg:h-[108%] max-lg:w-full lg:relative"
        style={reduceMotion ? undefined : { y: imageY }}
      >
        <Image
          src="/about/office.png"
          alt="Clinic Genie team workspace for specialist clinic marketing"
          width={OFFICE_WIDTH}
          height={OFFICE_HEIGHT}
          priority
          className="h-auto w-full max-lg:h-full max-lg:object-cover max-lg:object-center"
          sizes="(min-width: 1280px) 82.5rem, 100vw"
        />
      </motion.div>
    </motion.figure>
  );
}
