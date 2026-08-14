"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import styles from "./LogoMarquee.module.css";

export interface MarqueeLogo {
  src: string;
  alt: string;
  href: string;
  width: number;
  height: number;
  size?: "sm" | "default" | "lg" | "xl";
}

function isExternalHref(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}

function logoHeightClass(size: MarqueeLogo["size"], subtle: boolean) {
  if (subtle) {
    if (size === "xl") return "h-11 sm:h-12 lg:h-14";
    if (size === "lg") return "h-9 sm:h-10 lg:h-11";
    if (size === "sm") return "h-6 sm:h-7 lg:h-8";
    return "h-7 sm:h-8 lg:h-9";
  }

  if (size === "xl") return "h-14 sm:h-16 lg:h-20";
  if (size === "lg") return "h-11 sm:h-12 lg:h-14";
  if (size === "sm") return "h-7 sm:h-8 lg:h-9";
  return "h-9 sm:h-10 lg:h-11";
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
  durationSec,
  variant = "default",
  className,
}: {
  logos: MarqueeLogo[];
  durationSec?: number;
  variant?: "default" | "subtle";
  className?: string;
}) {
  const subtle = variant === "subtle";
  const resolvedDuration = durationSec ?? (subtle ? 52 : 38);
  const loop = [...logos, ...logos];

  return (
    <div
      className={cn(styles.viewport, subtle && styles.viewportSubtle, className)}
      role="group"
      aria-label="Clinics we've helped grow"
    >
      <ul
        className={styles.track}
        style={{ ["--marquee-duration" as string]: `${resolvedDuration}s` }}
      >
        {loop.map((logo, i) => {
          const isClone = i >= logos.length;
          const external = isExternalHref(logo.href);
          const linkClassName =
            "group block rounded-md outline-none focus-visible:ring-2 focus-visible:ring-[#217B8E]/40 focus-visible:ring-offset-2";
          const image = (
            <Image
              src={logo.src}
              alt={isClone ? "" : logo.alt}
              width={logo.width}
              height={logo.height}
              className={cn(
                "w-auto object-contain grayscale transition duration-300",
                subtle
                  ? "opacity-40 group-hover:opacity-70 group-hover:grayscale-[0.35]"
                  : "opacity-55 group-hover:opacity-100 group-hover:grayscale-0",
                logoHeightClass(logo.size, subtle)
              )}
              sizes="(max-width: 640px) 160px, 240px"
            />
          );

          return (
            <li
              key={i}
              className={styles.item}
              data-clone={isClone ? "true" : undefined}
              aria-hidden={isClone ? true : undefined}
            >
              {external ? (
                <a
                  href={logo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={isClone ? -1 : undefined}
                  className={linkClassName}
                  aria-label={isClone ? undefined : `Visit ${logo.alt} website`}
                >
                  {image}
                </a>
              ) : (
                <Link
                  href={logo.href}
                  tabIndex={isClone ? -1 : undefined}
                  className={linkClassName}
                  aria-label={isClone ? undefined : `View ${logo.alt}`}
                >
                  {image}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
