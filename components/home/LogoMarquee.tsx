"use client";

import Image from "next/image";
import { cn } from "@/lib/cn";
import styles from "./LogoMarquee.module.css";

export interface MarqueeLogo {
  src: string;
  alt: string;
  href: string;
  width: number;
  height: number;
}

/**
 * Infinite, left-scrolling marquee of client logos. The list is rendered twice
 * and the track is shifted by exactly -50%, so the loop is seamless. Logos are
 * height-normalised, sit in muted grayscale, and brighten to full colour on
 * hover. Pauses on hover, fades at both edges, and falls back to a static
 * wrapped row under reduced-motion.
 */
export function LogoMarquee({
  logos,
  durationSec = 38,
  className,
}: {
  logos: MarqueeLogo[];
  durationSec?: number;
  className?: string;
}) {
  const loop = [...logos, ...logos];

  return (
    <div
      className={cn(styles.viewport, className)}
      role="group"
      aria-label="Clinics we've helped grow"
    >
      <ul className={styles.track} style={{ ["--marquee-duration" as string]: `${durationSec}s` }}>
        {loop.map((logo, i) => {
          const isClone = i >= logos.length;
          return (
            <li
              key={i}
              className={styles.item}
              data-clone={isClone ? "true" : undefined}
              aria-hidden={isClone ? true : undefined}
            >
              <a
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={isClone ? -1 : undefined}
                className="group block rounded-md outline-none focus-visible:ring-2 focus-visible:ring-[#217B8E]/40 focus-visible:ring-offset-2"
                aria-label={isClone ? undefined : `Visit ${logo.alt} website`}
              >
                <Image
                  src={logo.src}
                  alt={isClone ? "" : logo.alt}
                  width={logo.width}
                  height={logo.height}
                  className="h-9 w-auto object-contain opacity-55 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0 sm:h-10 lg:h-11"
                  sizes="(max-width: 640px) 140px, 200px"
                />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
