import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { SplitFlapText } from "@/components/ui/SplitFlapText";
import { landing } from "./tokens";

/* ─── Section shells (PDF page rhythm) ─────────────────────────────────────── */

type SectionTone = "white" | "cyan" | "finale";

const SECTION_BG: Record<SectionTone, string> = {
  white: "",
  cyan: "surface-cyan",
  finale: "",
};

export function LandingSection({
  id,
  tone = "white",
  navTheme = "light",
  className,
  containerClassName,
  size = "wide",
  children,
}: {
  id?: string;
  tone?: SectionTone;
  navTheme?: "light" | "dark";
  className?: string;
  containerClassName?: string;
  size?: "content" | "wide" | "prose";
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      data-nav-theme={navTheme}
      className={cn("text-ink-900", SECTION_BG[tone], className)}
    >
      <Container size={size} className={containerClassName}>
        {children}
      </Container>
    </section>
  );
}

/** @deprecated Use PageFinale from @/components/ui/PageFinale */
export { PageFinale as LandingFinale } from "@/components/ui/PageFinale";

/* ─── Typography (PDF hierarchy) ───────────────────────────────────────────── */

export function LandingKicker({
  children,
  light = false,
  align = "center",
}: {
  children: ReactNode;
  light?: boolean;
  align?: "left" | "center";
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-2 font-display text-kicker uppercase tracking-[0.22em]",
        align === "center" ? "justify-center" : "justify-start",
        light ? "text-[#9FDCE8]" : "text-[#217B8E]"
      )}
    >
      <span
        aria-hidden="true"
        className={cn("h-1.5 w-1.5 rounded-full", light ? "bg-[#9FDCE8]" : "bg-[#217B8E]")}
      />
      {children}
    </p>
  );
}

export function LandingHeading({
  children,
  highlight,
  light = false,
  as = "h2",
  className,
}: {
  children: ReactNode;
  highlight?: string;
  light?: boolean;
  as?: "h2" | "h3";
  className?: string;
}) {
  const Tag = as;
  const base = cn(
    "font-display text-balance",
    as === "h2" ? "text-h2" : "text-h3",
    light ? "text-white" : "text-[#217B8E]",
    className
  );

  if (typeof children === "string" && highlight && children.includes(highlight)) {
    const [before, ...rest] = children.split(highlight);
    const after = rest.join(highlight);
    return (
      <Tag className={base}>
        {before}
        <span className="genie-text">{highlight}</span>
        {after}
      </Tag>
    );
  }

  return <Tag className={base}>{children}</Tag>;
}

/** Shared max width for section body paragraphs */
export const landingParagraphWidth = "max-w-full sm:max-w-[75%]";

export function LandingBody({
  children,
  light = false,
  center = true,
  className,
}: {
  children: ReactNode;
  light?: boolean;
  center?: boolean;
  className?: string;
}) {
  return (
    <p
      className={cn(
        landingParagraphWidth,
        "text-body leading-relaxed text-pretty",
        light ? "text-[#C9E4EA]" : "text-[#7E8C92]",
        center && "mx-auto text-center",
        className
      )}
    >
      {children}
    </p>
  );
}

/** Centred section intro block — kicker + heading + optional subtitle */
export function LandingIntro({
  kicker,
  title,
  highlight,
  subtitle,
  light = false,
}: {
  kicker: string;
  title: string;
  highlight?: string;
  subtitle?: ReactNode;
  light?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <LandingKicker light={light}>{kicker}</LandingKicker>
      <LandingHeading highlight={highlight} light={light}>
        {title}
      </LandingHeading>
      {subtitle && <LandingBody light={light}>{subtitle}</LandingBody>}
    </div>
  );
}

/* ─── Layout motifs from the PDF ───────────────────────────────────────────── */

/** Giant grey circle — floating orb echo behind “The Gap” copy */
export function OrbEcho({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute left-1/2 top-1/2 h-[min(760px,92vw)] w-[min(760px,92vw)] -translate-x-1/2 -translate-y-1/2 rounded-full",
        "bg-[radial-gradient(circle_at_42%_38%,#F7FAFB_0%,#EAFBFB_42%,#F0F2F3_72%,transparent_100%)]",
        className
      )}
    />
  );
}

/** Grey stats band under client logos */
export function StatsPanel({ children }: { children: ReactNode }) {
  return (
    <div className="surface-panel grid gap-8 px-8 py-12 sm:grid-cols-3 sm:gap-4">
      {children}
    </div>
  );
}

export function StatCell({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <span className="font-display text-h4 font-semibold text-[#217B8E]">{value}</span>
      <p className="text-sm leading-relaxed text-[#7E8C92]">{label}</p>
    </div>
  );
}

/** Inset dark-teal case-study card (white page margin) */
export function InsetTealCard({ children }: { children: ReactNode }) {
  return (
    <div className="glass mx-auto max-w-wide overflow-hidden rounded-[40px] border border-white/12 bg-gradient-to-br from-[#2A6B77]/95 via-[#26626F]/92 to-[#1A4F5D]/95 px-8 py-16 shadow-glass-dark backdrop-blur-glass sm:px-14 sm:py-20">
      {children}
    </div>
  );
}

/** Grey container for 2×2 compliance cards */
export function CardGridShell({ children }: { children: ReactNode }) {
  return <div className="surface-panel p-4 sm:p-6">{children}</div>;
}

/** Marketing metrics — four stats in one row */
export function MetricsRowStats({ children }: { children: ReactNode }) {
  return (
    <div className="grid w-full grid-cols-2 divide-[#E5EAEC] max-lg:gap-x-4 max-lg:gap-y-8 lg:grid-cols-4 lg:divide-x">
      {children}
    </div>
  );
}

export function MetricCell({
  value,
  label,
  index,
}: {
  value: string;
  label: string;
  index: number;
}) {
  return (
    <div className="flex flex-col items-center gap-2 px-2 py-2 text-center sm:px-4 lg:px-8 lg:py-4">
      <SplitFlapText
        text={value}
        startDelay={index * 180}
        className="font-display text-h3 font-semibold leading-none text-[#3A8093]"
      />
      <p className="text-sm leading-relaxed text-[#7E8C92]">{label}</p>
    </div>
  );
}
