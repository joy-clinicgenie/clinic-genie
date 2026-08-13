"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  LandingBody,
  LandingHeading,
  LandingKicker,
} from "@/components/home/landing/LandingLayout";
import { ease } from "@/lib/motion";

const item = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: ease.glide },
  },
};

const itemReduced = {
  hidden: { opacity: 0, y: 0 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

export function AboutExpertsIntro() {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className="flex max-w-sm flex-col items-start gap-4 text-left lg:mx-auto lg:max-w-none lg:items-center lg:text-center"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: reduced ? 0 : 0.06 },
        },
      }}
    >
      <motion.div variants={reduced ? itemReduced : item}>
        <LandingKicker
          light
          variant="editorial"
          align="left"
          className="lg:mx-auto"
        >
          The experts behind the work
        </LandingKicker>
      </motion.div>
      <motion.div variants={reduced ? itemReduced : item}>
        <LandingHeading highlight="specialists" light>
          The specialists behind every clinic wish.
        </LandingHeading>
      </motion.div>
      <motion.div variants={reduced ? itemReduced : item}>
        <LandingBody
          light
          center={false}
          className="max-lg:max-w-xs lg:mx-auto lg:text-center"
        >
          Each focused on one part of responsible clinic marketing, working as one
          growth engine.
        </LandingBody>
      </motion.div>
    </motion.div>
  );
}
