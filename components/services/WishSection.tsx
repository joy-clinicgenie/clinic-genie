import {
  Camera,
  ClipboardList,
  Filter,
  Handshake,
  Megaphone,
  Monitor,
  Palette,
  PenLine,
  Search,
  Sparkles,
  Target,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/cn";
import type { Pillar, SubServiceIcon } from "@/lib/data/services";

const SERVICE_ICONS: Record<SubServiceIcon, LucideIcon> = {
  Search,
  ClipboardList,
  Handshake,
  TrendingUp,
  Megaphone,
  PenLine,
  Filter,
  Palette,
  Monitor,
  Camera,
};

function WishCurveDecoration() {
  return (
    <div
      className="pointer-events-none absolute -right-2 top-0 hidden h-28 w-44 text-genie-300 lg:block lg:right-4 lg:h-36 lg:w-56"
      aria-hidden="true"
    >
      <svg viewBox="0 0 280 180" fill="none" className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M20 150 C 80 140, 120 100, 160 70 C 200 40, 230 28, 255 18"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="2 10"
          strokeLinecap="round"
          opacity="0.55"
        />
        <circle cx="80" cy="138" r="3.5" fill="currentColor" opacity="0.45" />
        <circle cx="130" cy="95" r="3.5" fill="currentColor" opacity="0.5" />
        <circle cx="185" cy="52" r="3.5" fill="currentColor" opacity="0.55" />
        <circle cx="230" cy="30" r="3.5" fill="currentColor" opacity="0.6" />
      </svg>
      <Sparkles className="absolute right-0 top-0 h-4 w-4 text-genie-500" strokeWidth={1.75} />
    </div>
  );
}

function OutcomeDotGrid() {
  return (
    <div className="hidden shrink-0 grid-cols-8 gap-1.5 sm:grid" aria-hidden="true">
      {Array.from({ length: 32 }).map((_, i) => (
        <span key={i} className="h-1 w-1 rounded-full bg-cg-soft-grey" />
      ))}
    </div>
  );
}

export function WishSection({
  pillar,
  label,
  forwardLine,
}: {
  pillar: Pillar;
  label: string;
  forwardLine?: string | null;
}) {
  const fourUp = pillar.services.length > 3;

  return (
    <Section
      id={pillar.id}
      tone="light"
      className="flex min-h-svh flex-col justify-center surface-cyan py-12 md:py-14 lg:py-16"
    >
      <Container className="relative flex w-full flex-col gap-6 md:gap-7 lg:gap-8">
        <div className="relative">
          <WishCurveDecoration />

          <div className="relative z-10 flex max-w-3xl flex-col gap-2.5 md:gap-3">
            <Reveal variant="up">
              <div className="flex items-center gap-3">
                <span
                  className="inline-grid h-7 w-7 shrink-0 place-items-center rounded-full bg-genie-100 text-xs font-bold text-ink-900"
                  aria-hidden="true"
                >
                  {pillar.number}
                </span>
                <Kicker>{label}</Kicker>
              </div>
            </Reveal>

            <Reveal variant="up" delay={0.05}>
              <p className="max-w-2xl font-display text-h5 italic text-pretty text-genie-600 md:text-h4">
                &ldquo;{pillar.wish}&rdquo;
              </p>
            </Reveal>

            <Reveal variant="up" delay={0.1}>
              <div className="flex flex-col gap-2">
                <h2 className="font-display text-h3 text-ink-900 text-balance md:text-h2">{pillar.title}</h2>
                <p className="max-w-prose text-base text-ink-700 text-pretty md:text-lead">{pillar.intro}</p>
              </div>
            </Reveal>
          </div>
        </div>

        <RevealGroup
          className={cn(
            "grid gap-4 md:grid-cols-2 lg:gap-5",
            fourUp ? "lg:grid-cols-4" : "lg:grid-cols-3"
          )}
        >
          {pillar.services.map((service) => {
            const Icon = SERVICE_ICONS[service.icon];
            return (
              <RevealItem key={service.name} className="h-full">
                <article className="flex h-full flex-col gap-3 overflow-hidden rounded-2xl border border-[#E6EEF1] bg-white p-5 shadow-card md:p-6">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-genie-10 text-genie-600">
                    <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <span className="h-0.5 w-7 rounded-full bg-genie-400" aria-hidden="true" />
                  <h3 className="font-display text-base font-semibold text-ink-900 md:text-h5">
                    {service.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-ink-700">{service.body}</p>
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>

        {forwardLine ? (
          <Reveal variant="up">
            <p className="max-w-2xl text-sm text-ink-700 md:text-base">{forwardLine}</p>
          </Reveal>
        ) : null}

        <Reveal variant="up">
          <aside className="flex flex-col gap-3 rounded-2xl border border-[#E6EEF1] bg-white px-4 py-4 shadow-card sm:flex-row sm:items-center sm:gap-4 sm:px-5 sm:py-4">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-genie-100 text-genie-600">
              <Target className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <Kicker>The outcome</Kicker>
              <p className="mt-0.5 font-display text-base font-semibold text-ink-900 text-pretty md:text-h5">
                {pillar.outcome}
              </p>
            </div>
            <OutcomeDotGrid />
          </aside>
        </Reveal>
      </Container>
    </Section>
  );
}
