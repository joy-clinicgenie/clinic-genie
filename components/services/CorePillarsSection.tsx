import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/cn";
import { getPillarHeroImage } from "@/lib/data/pillar-hero-images";
import { CORE_PILLARS } from "@/lib/data/pillars";

const SECTION_SUBTITLE =
  "Eight medical marketing services. One connected growth engine.";

export function CorePillarsSection() {
  return (
    <Section
      id="core-pillars"
      tone="light"
      className="bg-gradient-to-b from-[#e3f6fa] to-white"
    >
      <Container className="flex flex-col gap-12 md:gap-14">
        <div className="flex flex-col gap-4">
          <Reveal variant="up">
            <Kicker tone="light">Core service pillars</Kicker>
          </Reveal>
          <Reveal variant="up" delay={0.05}>
            <h2 className="font-display text-h2 text-balance text-ink-900">
              Explore each service in <span className="genie-text">depth</span>
            </h2>
          </Reveal>
          <Reveal variant="up" delay={0.1}>
            <p className="max-w-xl text-lead text-pretty text-ink-700">
              {SECTION_SUBTITLE}
            </p>
          </Reveal>
        </div>

        <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CORE_PILLARS.map((pillar, index) => {
            const imageSrc = getPillarHeroImage(pillar.slug);

            return (
              <RevealItem key={pillar.slug} className="min-w-0">
                <Link
                  href={`/services/core-pillars/${pillar.slug}`}
                  className={cn(
                    "group/card block w-full outline-none",
                    "focus-visible:ring-2 focus-visible:ring-genie-500/45 focus-visible:ring-offset-4 focus-visible:ring-offset-cg-mist"
                  )}
                  aria-label={`Explore ${pillar.name}. ${pillar.heroTitle}`}
                >
                  <div
                    className={cn(
                      "relative aspect-square w-full overflow-hidden rounded-2xl shadow-xs",
                      "transition-[transform,box-shadow] duration-ui ease-out-soft",
                      "group-hover/card:-translate-y-1 group-hover/card:shadow-lg",
                      "group-focus-visible/card:-translate-y-1 group-focus-visible/card:shadow-lg",
                      "motion-reduce:group-hover/card:translate-y-0 motion-reduce:group-focus-visible/card:translate-y-0"
                    )}
                  >
                    {imageSrc ? (
                      <Image
                        src={imageSrc}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-ui ease-out-soft group-hover/card:scale-[1.03] motion-reduce:group-hover/card:scale-100"
                        priority={index < 4}
                      />
                    ) : (
                      <div
                        aria-hidden="true"
                        className="absolute inset-0"
                        style={{
                          background: `linear-gradient(135deg, color-mix(in srgb, ${pillar.accent} 72%, #0b1f2a), color-mix(in srgb, ${pillar.accent} 38%, #163447))`,
                        }}
                      />
                    )}

                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-b from-night-950/55 via-transparent to-night-950/35"
                    />

                    <div className="pointer-events-none absolute inset-x-0 top-0 px-6 pt-6">
                      <h3 className="font-display text-lg font-semibold tracking-tight text-onDark drop-shadow-sm sm:text-xl">
                        {pillar.name}
                      </h3>
                      <p
                        className={cn(
                          "mt-2 max-w-[90%] text-base leading-snug text-onDark/85",
                          "transition-opacity duration-ui ease-out-soft",
                          "opacity-0 group-hover/card:opacity-100 group-focus-visible/card:opacity-100",
                          "motion-reduce:opacity-100"
                        )}
                      >
                        {pillar.heroTitle}
                      </p>
                    </div>

                    <span
                      aria-hidden="true"
                      className={cn(
                        "card-arrow-btn absolute bottom-5 left-5 z-10 flex h-10 w-10 items-center justify-center rounded-full",
                        "bg-white/90 text-ink-900 shadow-xs backdrop-blur-sm",
                        "transition-[background-color,box-shadow,color] duration-ui",
                        "group-hover/card:bg-white group-hover/card:ring-4 group-hover/card:ring-genie-100/10",
                        "motion-reduce:transition-none"
                      )}
                    >
                      <ArrowUpRight
                        className="h-5 w-5 transition-transform duration-ui group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 motion-reduce:transition-none"
                        strokeWidth={1.75}
                      />
                    </span>
                  </div>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </Section>
  );
}
