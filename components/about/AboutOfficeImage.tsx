"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";

const OFFICE_WIDTH = 1448;
const OFFICE_HEIGHT = 1086;

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
        "aspect-[4/3] shadow-sm lg:aspect-[5/2] lg:shadow-lg"
      )}
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.55, ease: ease.glide }}
    >
      <motion.div
        className="absolute inset-x-0 -top-[40%] h-[148%] w-full lg:-top-[22%] lg:h-[132%]"
        style={reduceMotion ? undefined : { y: imageY }}
      >
        <Image
          src="/about/office.png"
          alt="Clinic Genie team workspace for specialist clinic marketing"
          width={OFFICE_WIDTH}
          height={OFFICE_HEIGHT}
          priority
          className="h-full w-full object-cover object-[center_68%]"
          sizes="(min-width: 1280px) 82.5rem, 100vw"
        />
      </motion.div>
    </motion.figure>
  );
}
