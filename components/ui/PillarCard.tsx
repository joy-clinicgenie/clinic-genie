"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import { useOrbStore } from "@/components/orb/store";

export function PillarCard({
  number,
  title,
  blurb,
  href,
  accent = "#6CBAD9",
}: {
  number?: string;
  title: string;
  blurb: string;
  href: string;
  accent?: string;
}) {
  const pulse = useOrbStore((s) => s.pulse);
  return (
    <Link
      href={href}
      onPointerEnter={() => pulse()}
      className="glass group relative flex flex-col gap-4 overflow-hidden rounded-2xl p-7 transition-[transform,box-shadow] duration-ui ease-out-soft hover:-translate-y-1.5 hover:shadow-glow-md motion-reduce:hover:translate-y-0 sm:p-8"
      style={{ ["--accent" as string]: accent }}
    >
      <span
        aria-hidden="true"
        className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-60"
        style={{ background: accent }}
      />
      {number && (
        <span className="font-mono text-sm text-genie-400" style={{ color: accent }}>
          {number}
        </span>
      )}
      <h3 className="font-display text-h4 text-onDark">{title}</h3>
      <p className="text-sm leading-relaxed text-onDark-muted">{blurb}</p>
      <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-medium text-genie-300 transition-transform duration-ui group-hover:gap-2.5">
        Explore
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  );
}
