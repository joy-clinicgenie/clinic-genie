"use client";

import Image from "next/image";
import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";

type ParallaxSrc = string | { mobile: string; desktop: string };

type ParallaxBackgroundProps = {
  src: ParallaxSrc;
  alt?: string;
  priority?: boolean;
  sizes?: string;
  /** Applied to the Image element(s). */
  imageClassName?: string;
  /** Outer absolute layer. */
  className?: string;
  /** Overall image opacity (e.g. journey-map wash). */
  opacity?: number;
  unoptimized?: boolean;
  /** Subtle entrance scale from 1.02 → 1 on load. */
  entranceScale?: boolean;
  /** `subtle` keeps crop stable; default is a larger scroll shift. */
  strength?: "default" | "subtle";
  /** Gradient / wash layers rendered above the image. */
  children?: ReactNode;
};

/**
 * Full-bleed photographic background with a calm scroll parallax.
 * Parent should be `relative overflow-hidden`.
 */
export function ParallaxBackground({
  src,
  alt = "",
  priority = false,
  sizes = "100vw",
  imageClassName = "object-cover object-center",
  className,
  opacity = 1,
  unoptimized,
  entranceScale = false,
  strength = "default",
  children,
}: ParallaxBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    strength === "subtle" ? ["-3%", "3%"] : ["-30%", "30%"]
  );
  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    strength === "subtle" ? [1, 1.03] : [1, 1]
  );
  const decorative = !alt;
  const playEntrance = entranceScale && !reduceMotion;

  return (
    <div
      ref={ref}
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden={decorative ? true : undefined}
    >
      <motion.div
        className={cn(
          "will-change-transform",
          strength === "subtle" ? "absolute inset-[-4%]" : "absolute inset-[-12%]"
        )}
        style={
          reduceMotion
            ? { opacity }
            : strength === "subtle"
              ? { y: imageY, scale: imageScale, opacity }
              : { y: imageY, opacity }
        }
        initial={playEntrance ? { scale: 1.02 } : false}
        animate={playEntrance ? { scale: 1 } : undefined}
        transition={{ duration: 0.9, ease: ease.glide }}
      >
        {typeof src === "string" ? (
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            unoptimized={unoptimized ?? src.endsWith(".svg")}
            className={imageClassName}
            sizes={sizes}
          />
        ) : (
          <>
            <Image
              src={src.mobile}
              alt={alt}
              fill
              priority={priority}
              unoptimized={unoptimized ?? src.mobile.endsWith(".svg")}
              className={cn(imageClassName, "md:hidden")}
              sizes={sizes}
            />
            <Image
              src={src.desktop}
              alt={alt}
              fill
              priority={priority}
              unoptimized={unoptimized ?? src.desktop.endsWith(".svg")}
              className={cn(imageClassName, "hidden md:block")}
              sizes={sizes}
            />
          </>
        )}
      </motion.div>
      {children}
    </div>
  );
}
