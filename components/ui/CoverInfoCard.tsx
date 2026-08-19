"use client";

import { useRef, type RefObject } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/lib/hooks/useReducedMotion";

export interface CoverInfoCardProps {
  title: string;
  body: string;
  image: string;
  alt: string;
  href: string;
  /** Optional cover video. Paused by default; plays on hover and focus. */
  video?: string;
  /** Extra classes for the image, typically object-position. */
  imageClassName?: string;
  className?: string;
}

function isExternalHref(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}

function isSameOriginMediaSrc(src: string): boolean {
  return src.startsWith("/") && !src.startsWith("//") && !src.includes("\\");
}

function CardArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 18.256 18.256"
      aria-hidden="true"
      className="transition-transform duration-ui group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 motion-reduce:transition-none"
    >
      <g transform="translate(5.363 5.325)">
        <path
          d="M14.581,7.05,7.05,14.581"
          transform="translate(-7.05 -7.012)"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <path
          d="M10,7l5.287.037.038,5.287"
          transform="translate(-7.756 -7)"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </g>
    </svg>
  );
}

function showFirstFrame(node: HTMLVideoElement) {
  if (node.readyState < 1) return;
  try {
    node.currentTime = 0.001;
  } catch {
    node.currentTime = 0;
  }
}

function CoverCardMedia({
  image,
  alt,
  video,
  imageClassName,
  videoRef,
  reduceMotion,
}: {
  image: string;
  alt: string;
  video?: string;
  imageClassName?: string;
  videoRef: RefObject<HTMLVideoElement | null>;
  reduceMotion: boolean;
}) {
  const mediaClassName = cn("absolute inset-0 h-full w-full object-cover", imageClassName);
  const showVideo = Boolean(video) && !reduceMotion && isSameOriginMediaSrc(video ?? "");

  if (showVideo && video) {
    return (
      <video
        ref={videoRef}
        className={mediaClassName}
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        onLoadedData={(event) => showFirstFrame(event.currentTarget)}
      >
        <source src={video} type="video/mp4" />
      </video>
    );
  }

  return (
    <Image
      key={image}
      src={image}
      alt={alt}
      fill
      className={cn("object-cover", imageClassName)}
      sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
    />
  );
}

export function CoverInfoCard({
  title,
  body,
  image,
  alt,
  href,
  video,
  imageClassName,
  className,
}: CoverInfoCardProps) {
  const reduceMotion = usePrefersReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  const playVideo = () => {
    const node = videoRef.current;
    if (!node) return;
    node.muted = true;
    void node.play().catch(() => undefined);
  };

  const pauseVideo = () => {
    const node = videoRef.current;
    if (!node) return;
    node.pause();
    showFirstFrame(node);
  };

  const hoverPlay = Boolean(video) && !reduceMotion;
  const hoverProps = hoverPlay
    ? {
        onMouseEnter: playVideo,
        onMouseLeave: pauseVideo,
        onFocus: playVideo,
        onBlur: pauseVideo,
      }
    : undefined;

  const article = (
    <article
      className={cn(
        "group/card relative flex h-full min-h-80 w-full flex-col overflow-hidden rounded-2xl shadow-card transition-shadow duration-ui hover:shadow-lg motion-reduce:transition-none md:min-h-96",
        className
      )}
    >
      <CoverCardMedia
        image={image}
        alt={alt}
        video={video}
        imageClassName={imageClassName}
        videoRef={videoRef}
        reduceMotion={reduceMotion}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] bg-gradient-to-t from-night-900 via-night-900/50 to-transparent"
      />
      <div className="relative z-[1] mt-auto flex flex-col items-start gap-3 p-7 md:p-8">
        <div className="flex w-full flex-col gap-2">
          <h3 className="font-display text-h4 font-semibold leading-snug text-white">{title}</h3>
          <p className="text-body leading-relaxed text-onDark-muted">{body}</p>
        </div>
        <span
          aria-hidden="true"
          className="card-arrow-btn mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white transition-[background-color,box-shadow,color] duration-ui group-hover/card:bg-white group-hover/card:text-ink-900 group-hover/card:ring-4 group-hover/card:ring-white/20 motion-reduce:transition-none"
        >
          <CardArrowIcon />
        </span>
      </div>
    </article>
  );

  const linkClassName =
    "block h-full rounded-2xl text-inherit no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-genie-100 focus-visible:ring-offset-2";

  if (isExternalHref(href)) {
    return (
      <a
        href={href}
        className={linkClassName}
        aria-label={`${title}: ${body}`}
        target="_blank"
        rel="noopener noreferrer"
        {...hoverProps}
      >
        {article}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={linkClassName}
      aria-label={`${title}: ${body}`}
      {...hoverProps}
    >
      {article}
    </Link>
  );
}
