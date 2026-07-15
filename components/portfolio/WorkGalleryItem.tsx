"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";
import type { PortfolioWorkSlide } from "@/lib/data/portfolio-works";

const ASPECT_BY_INDEX = [
  "aspect-[4/5]",
  "aspect-[5/4]",
  "aspect-[3/4]",
  "aspect-square",
  "aspect-[4/5]",
  "aspect-[5/4]",
] as const;

type WorkGalleryItemProps = {
  work: PortfolioWorkSlide;
  index: number;
  isFocused: boolean;
  isDimmed: boolean;
  onFocusChange: (id: string | null) => void;
};

function CaptionRow({ title, line }: { title: string; line: string }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <p className="font-sans text-sm font-medium text-onDark">{title}</p>
      <p className="max-w-[55%] text-right font-sans text-sm text-onDark/80">{line}</p>
    </div>
  );
}

export function WorkGalleryItem({
  work,
  index,
  isFocused,
  isDimmed,
  onFocusChange,
}: WorkGalleryItemProps) {
  const reduceMotion = useReducedMotion();
  const duration = reduceMotion ? 0 : 0.45;
  const aspect = ASPECT_BY_INDEX[index % ASPECT_BY_INDEX.length];
  const hasCaseStudy = Boolean(work.href);

  const media = (
    <motion.div
      initial={false}
      animate={{ opacity: isDimmed ? 0.35 : 1 }}
      transition={{ duration, ease: ease.glide }}
      className={cn("relative w-full overflow-hidden rounded-lg bg-night-850", aspect)}
    >
      {work.image ? (
        <Image
          src={work.image}
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, 40vw"
          className="object-cover"
          priority={index < 2}
        />
      ) : (
        <div className="absolute inset-0" style={{ background: work.gradient }} aria-hidden />
      )}

      {/* Captions overlay the tile so stack spacing stays uniform */}
      <motion.div
        initial={false}
        animate={{ opacity: isFocused ? 1 : 0 }}
        transition={{ duration, ease: ease.glide }}
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 hidden bg-gradient-to-t from-night-950/85 via-night-950/40 to-transparent px-3 pb-3 pt-10 lg:block",
          !isFocused && "select-none"
        )}
        aria-hidden={!isFocused}
      >
        <CaptionRow title={work.title} line={work.line} />
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night-950/85 via-night-950/40 to-transparent px-3 pb-3 pt-10 lg:hidden">
        <CaptionRow title={work.title} line={work.line} />
      </div>
    </motion.div>
  );

  const sharedClassName = cn(
    "group block w-full outline-none",
    "focus-visible:ring-2 focus-visible:ring-genie-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-night-950"
  );

  const handlers = {
    onMouseEnter: () => onFocusChange(work.id),
    onFocus: () => onFocusChange(work.id),
    onBlur: () => onFocusChange(null),
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
