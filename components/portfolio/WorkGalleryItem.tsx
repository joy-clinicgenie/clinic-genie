"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import type { PortfolioWorkSlide } from "@/lib/data/portfolio-works";

const HOVER_CYCLE_MS = 1800;

type WorkGalleryItemProps = {
  work: PortfolioWorkSlide;
  index: number;
};

export function WorkGalleryItem({ work, index }: WorkGalleryItemProps) {
  const reduceMotion = useReducedMotion();
  const hasCaseStudy = Boolean(work.href);
  const galleryImages = [
    ...(work.image ? [work.image] : []),
    ...(work.hoverImages ?? []),
  ];
  const [isActive, setIsActive] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const showWorkMedia = isActive && galleryImages.length > 0;

  useEffect(() => {
    if (!isActive || galleryImages.length <= 1 || reduceMotion) {
      setActiveImageIndex(0);
      return;
    }

    setActiveImageIndex(0);
    const timer = window.setInterval(() => {
      setActiveImageIndex((current) => (current + 1) % galleryImages.length);
    }, HOVER_CYCLE_MS);

    return () => window.clearInterval(timer);
  }, [galleryImages.length, isActive, reduceMotion]);

  const media = (
    <div
      className={cn(
        "relative aspect-square w-full overflow-hidden rounded-2xl shadow-xs",
        "transition-[transform,box-shadow] duration-ui ease-out-soft",
        "group-hover:-translate-y-1 group-hover:shadow-lg",
        "group-focus-visible:-translate-y-1 group-focus-visible:shadow-lg",
        "motion-reduce:group-hover:translate-y-0 motion-reduce:group-focus-visible:translate-y-0"
      )}
    >
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center px-10 transition-opacity duration-ui ease-out-soft",
          showWorkMedia ? "pointer-events-none opacity-0" : "opacity-100"
        )}
        style={{ backgroundColor: work.cardColor }}
        aria-hidden={showWorkMedia}
      >
        <Image
          src={work.logo}
          alt=""
          width={320}
          height={110}
          className={cn(
            "h-auto w-auto object-contain",
            work.id === "tac"
              ? "max-h-16 max-w-[52%] sm:max-h-20 lg:max-h-24"
              : "max-h-24 max-w-[72%] sm:max-h-28 lg:max-h-32",
            work.invertLogo !== false && "brightness-0 invert",
            "transition-transform duration-ui ease-out-soft",
            "group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
          )}
          priority={index < 4}
        />
      </div>

      {galleryImages.length > 0 ? (
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-ui ease-out-soft",
            showWorkMedia ? "opacity-100" : "pointer-events-none opacity-0"
          )}
          aria-hidden={!showWorkMedia}
        >
          {galleryImages.map((src, imageIndex) => (
            <Image
              key={src}
              src={src}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className={cn(
                "object-cover transition-opacity duration-ui ease-out-soft",
                showWorkMedia && imageIndex === activeImageIndex
                  ? "opacity-100"
                  : "opacity-0"
              )}
            />
          ))}

          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-night-950/90 via-night-950/40 to-transparent px-5 pb-5 pt-20">
            <p className="font-display text-base font-semibold tracking-tight text-onDark">
              {work.title}
            </p>
            <p className="mt-1 text-sm leading-snug text-onDark/80">{work.line}</p>
          </div>
        </div>
      ) : null}
    </div>
  );

  const sharedClassName = cn(
    "group block w-full outline-none",
    "focus-visible:ring-2 focus-visible:ring-genie-500/45 focus-visible:ring-offset-4 focus-visible:ring-offset-cg-teal-5"
  );

  const handlers = {
    onMouseEnter: () => setIsActive(true),
    onMouseLeave: () => setIsActive(false),
    onFocus: () => setIsActive(true),
    onBlur: () => setIsActive(false),
  };

  if (hasCaseStudy && work.href) {
    return (
      <article className="min-w-0">
        <Link
          href={work.href}
          className={sharedClassName}
          aria-label={`${work.title}. ${work.line}. Read the case study.`}
          {...handlers}
        >
          {media}
        </Link>
      </article>
    );
  }

  return (
    <article className="min-w-0">
      <div
        tabIndex={0}
        role="group"
        className={sharedClassName}
        aria-label={`${work.title}. ${work.line}`}
        {...handlers}
      >
        {media}
      </div>
    </article>
  );
}
