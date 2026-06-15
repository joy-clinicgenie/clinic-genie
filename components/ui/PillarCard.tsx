"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import { useOrbStore } from "@/components/orb/store";

/* ─── Per-pillar icons ────────────────────────────────────────────────────── */

function IconStrategy() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <circle cx="18" cy="18" r="14" stroke="currentColor" strokeWidth="1.6" opacity="0.35" />
      <circle cx="18" cy="18" r="8" stroke="currentColor" strokeWidth="1.6" opacity="0.55" />
      <circle cx="18" cy="18" r="2.5" fill="currentColor" />
      <line x1="18" y1="4" x2="18" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="18" y1="26" x2="18" y2="32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="4" y1="18" x2="10" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="26" y1="18" x2="32" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M18 14 L20 18 L18 22 L16 18 Z" fill="currentColor" opacity="0.8" />
    </svg>
  );
}

function IconGrowth() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <path d="M4 28 Q10 22 14 16 T22 10 L28 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 4 h6 v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="14" cy="16" r="2.5" fill="currentColor" opacity="0.7" />
      <circle cx="22" cy="10" r="2.5" fill="currentColor" />
      <circle cx="6" cy="27" r="2.5" fill="currentColor" opacity="0.5" />
      <path d="M6 32 h24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
    </svg>
  );
}

function IconBrand() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <path d="M18 4 L22 14 L33 14 L24 20.5 L27 31 L18 25 L9 31 L12 20.5 L3 14 L14 14 Z"
        stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" fill="currentColor" fillOpacity="0.12" />
      <path d="M18 9 L20.5 16 L28 16 L22 20 L24 27 L18 23 L12 27 L14 20 L8 16 L15.5 16 Z"
        fill="currentColor" opacity="0.5" />
      <circle cx="18" cy="18" r="3" fill="currentColor" />
    </svg>
  );
}

const PILLAR_ICONS: Record<string, React.ReactNode> = {
  "01": <IconStrategy />,
  "02": <IconGrowth />,
  "03": <IconBrand />,
};

/* ─── Component ──────────────────────────────────────────────────────────── */

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
  const icon = number ? PILLAR_ICONS[number] : null;

  return (
    <Link
      href={href}
      onPointerEnter={() => pulse()}
      className="glass group relative flex flex-col gap-4 overflow-hidden rounded-2xl p-7 transition-[transform,box-shadow] duration-ui ease-out-soft hover:-translate-y-1.5 hover:shadow-glow-md motion-reduce:hover:translate-y-0 sm:p-8"
      style={{ ["--accent" as string]: accent }}
    >
      {/* hover bloom */}
      <span
        aria-hidden="true"
        className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-60"
        style={{ background: accent }}
      />
      {/* decorative large icon watermark */}
      {icon && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-4 -right-4 opacity-[0.07] transition-opacity duration-500 group-hover:opacity-[0.13]"
          style={{ color: accent }}
        >
          <svg width="120" height="120" viewBox="0 0 36 36" fill="none">
            {number === "01" && <><circle cx="18" cy="18" r="14" stroke="currentColor" strokeWidth="1.6" /><circle cx="18" cy="18" r="8" stroke="currentColor" strokeWidth="1.6" /><circle cx="18" cy="18" r="2.5" fill="currentColor" /><line x1="18" y1="4" x2="18" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><line x1="18" y1="26" x2="18" y2="32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><line x1="4" y1="18" x2="10" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><line x1="26" y1="18" x2="32" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>}
            {number === "02" && <><path d="M4 28 Q10 22 14 16 T22 10 L28 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /><path d="M22 4 h6 v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M6 32 h24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>}
            {number === "03" && <path d="M18 4 L22 14 L33 14 L24 20.5 L27 31 L18 25 L9 31 L12 20.5 L3 14 L14 14 Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" fill="currentColor" fillOpacity="0.4" />}
          </svg>
        </span>
      )}
      {/* header row: icon + number */}
      <div className="flex items-center gap-3">
        {icon && (
          <span
            className="grid h-12 w-12 shrink-0 place-items-center rounded-xl transition-transform duration-300 group-hover:scale-110"
            style={{ background: `${accent}20`, color: accent }}
          >
            {icon}
          </span>
        )}
        {number && (
          <span className="font-mono text-sm" style={{ color: accent }}>
            {number}
          </span>
        )}
      </div>
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
