import Link from "next/link";
import {
  ArrowUpRight,
  Camera,
  Megaphone,
  Monitor,
  PenLine,
  Search,
  Share2,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { Kicker } from "@/components/ui/Kicker";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { CORE_PILLARS } from "@/lib/data/pillars";

const PILLAR_ICONS: Record<string, LucideIcon> = {
  findclinic: Search,
  "healthcare-seo": TrendingUp,
  "medical-sem": Megaphone,
  "branding-copywriting": PenLine,
  "web-design-development": Monitor,
  "photo-video": Camera,
  "social-media": Share2,
  "geo-ai-search": Sparkles,
};

const SECTION_SUBTITLE =
  "Eight focused pillars, each with its own page — from FindClinic.sg to GEO & AI Search.";

interface CorePillarsSectionProps {
  /** Hide the “See all pillars” link when already on the pillars index. */
  showIndexCta?: boolean;
}

export function CorePillarsSection({ showIndexCta = true }: CorePillarsSectionProps) {
  return (
    <Section tone="light" className="surface-cyan">
      <Container className="flex flex-col gap-12 md:gap-14">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-12">
          <div className="flex flex-col gap-4">
            <Reveal variant="up">
              <Kicker tone="light">Core service pillars</Kicker>
            </Reveal>
            <Reveal variant="up" delay={0.05}>
              <h2 className="font-display text-h2 text-balance text-ink-900">
                Explore each service in <span className="genie-text">depth</span>.
              </h2>
            </Reveal>
          </div>

          <Reveal variant="up" delay={0.1}>
            <div className="flex flex-col items-start gap-5 lg:items-end lg:text-right">
              <p className="max-w-md text-lead text-pretty text-ink-700 lg:ml-auto">
                {SECTION_SUBTITLE}
              </p>
              {showIndexCta ? (
                <MagneticButton
                  href="/services/core-pillars"
                  variant="ghost"
                  className="text-genie-700 hover:text-genie-900"
                >
                  See all pillars →
                </MagneticButton>
              ) : null}
            </div>
          </Reveal>
        </div>

        <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CORE_PILLARS.map((pillar, index) => {
            const Icon = PILLAR_ICONS[pillar.slug] ?? Search;

            return (
              <RevealItem key={pillar.slug} className="h-full">
                <Link
                  href={`/services/core-pillars/${pillar.slug}`}
                  className="group/card block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-genie-500 focus-visible:ring-offset-2 focus-visible:ring-offset-cg-mist"
                  aria-label={`Explore ${pillar.name}`}
                >
                  <GlassCard
                    tone="light"
                    radius="xl"
                    hover
                    className="flex h-full flex-col gap-5 p-7"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="grid h-11 w-11 place-items-center rounded-full bg-genie-10 text-genie-600">
                        <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                      </span>
                      <span
                        aria-hidden="true"
                        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-genie-500/15 font-sans text-sm font-semibold text-genie-700"
                      >
                        {index + 1}
                      </span>
                    </div>

                    <div className="flex flex-col gap-2">
                      <h3 className="font-display text-h5 text-ink-900">{pillar.name}</h3>
                      <p className="text-sm leading-relaxed text-ink-700">{pillar.heroTitle}</p>
                    </div>

                    <span
                      aria-hidden="true"
                      className="card-arrow-btn mt-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cg-soft-grey text-ink-900 transition-[background-color,box-shadow,color] duration-ui group-hover/card:bg-white group-hover/card:ring-4 group-hover/card:ring-genie-100/10 motion-reduce:transition-none"
                    >
                      <ArrowUpRight
                        className="h-5 w-5 transition-transform duration-ui group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 motion-reduce:transition-none"
                        strokeWidth={1.75}
                      />
                    </span>
                  </GlassCard>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </Section>
  );
}
