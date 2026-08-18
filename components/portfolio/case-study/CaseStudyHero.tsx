import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { BackLink } from "@/components/ui/BackLink";
import { ParallaxBackground } from "@/components/ui/ParallaxBackground";
import { formatPortfolioCaseLabel } from "@/lib/data/portfolio-works";
import type { CaseStudy } from "@/lib/data/portfolio";
import { cn } from "@/lib/cn";

function splitSpecialtyLines(specialty: string): string[] {
  const parts = specialty.split(/\s*\+\s*/).map((part) => part.trim()).filter(Boolean);
  if (parts.length <= 1) return parts;
  return [parts[0]!, ...parts.slice(1).map((part) => `+ ${part}`)];
}

function renderHeroLine(line: string, highlight?: string) {
  if (!highlight || !line.includes(highlight)) {
    return line;
  }

  const [before, ...rest] = line.split(highlight);
  const after = rest.join(highlight);

  return (
    <>
      {before}
      <span className="genie-text">{highlight}</span>
      {after}
    </>
  );
}

export function CaseStudyHero({
  study,
  image,
  logo,
  logoAlt,
  backLink,
}: {
  study: CaseStudy;
  image?: string;
  imageAlt?: string;
  logo?: string;
  logoAlt?: string;
  backLink: { href: string; label: string };
}) {
  const caseLabel = formatPortfolioCaseLabel(study.slug, study.name);
  const specialtyLines = splitSpecialtyLines(study.specialty);
  const projectScope = study.projectScope ?? [];
  const projectArchitecture = study.projectArchitecture ?? [];

  return (
    <section
      data-nav-theme="light"
      className="relative z-10 flex min-h-[70svh] items-start overflow-hidden rounded-b-2xl bg-white pb-16 pt-[calc(6.5rem+env(safe-area-inset-top,0px))] text-ink-900 lg:items-center lg:rounded-b-[44px] lg:pb-24 lg:pt-36"
    >
      {image ? (
        <ParallaxBackground
          src={image}
          alt=""
          priority
          className="z-0"
          imageClassName="object-contain object-right"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white from-10% via-white/85 via-45% to-transparent to-80%"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white from-20% via-white/80 via-60% to-transparent to-88%"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white via-white/90 to-transparent"
          />
        </ParallaxBackground>
      ) : null}

      <Container className="relative z-20 w-full">
        <div className="flex w-full max-w-content flex-col items-stretch text-left">
          <div className="relative z-20 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
            <BackLink href={backLink.href} label={backLink.label} />
            {caseLabel ? (
              <p className="font-sans text-kicker uppercase text-genie-700">{caseLabel}</p>
            ) : null}
          </div>

          <div className="mt-12 flex flex-col gap-0.5 sm:mt-14">
            {specialtyLines.map((line) => (
              <p key={line} className="font-sans text-kicker uppercase text-genie-700">
                {line}
              </p>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-6 sm:mt-10 lg:flex-row lg:items-start lg:gap-12">
            <div className="flex shrink-0 flex-col gap-3">
              {logo ? (
                <div className="relative h-12 w-48 sm:h-14 lg:w-56">
                  <Image
                    src={logo}
                    alt={logoAlt ?? study.name}
                    fill
                    className="object-contain object-left"
                    sizes="14rem"
                    priority
                  />
                </div>
              ) : null}
              <p className="whitespace-nowrap font-display text-xs font-semibold uppercase leading-snug tracking-wide text-ink-700 sm:text-sm">
                {study.name}
              </p>
            </div>
            <h1 className="max-w-prose font-display text-h1 font-semibold leading-[1.15] tracking-tight text-ink-900 lg:text-display lg:leading-[1.12]">
              {renderHeroLine(study.line, study.heroHighlight)}
            </h1>
          </div>

          {projectScope.length > 0 || projectArchitecture.length > 0 ? (
            <div className="mt-12 grid gap-10 border-t border-hairline-light pt-8 sm:mt-14 lg:grid-cols-2 lg:gap-16">
              {projectScope.length > 0 ? (
                <div className="flex flex-col gap-3">
                  <p className="font-sans text-kicker uppercase text-genie-700">Project Scope</p>
                  <div className="flex flex-col gap-1">
                    {projectScope.map((line) => (
                      <p key={line} className="font-display text-h6 font-semibold text-ink-900">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ) : null}

              {projectArchitecture.length > 0 ? (
                <div className="flex flex-col gap-3">
                  <p className="font-sans text-kicker uppercase text-genie-700">Project Architecture</p>
                  <dl
                    className={cn(
                      "grid gap-6 sm:gap-8",
                      projectArchitecture.length === 2
                        ? "grid-cols-2"
                        : "grid-cols-2 sm:grid-cols-3"
                    )}
                  >
                    {projectArchitecture.map((metric) => (
                      <div key={`${metric.value}-${metric.label}`} className="flex flex-col gap-1">
                        <dt className="sr-only">{metric.label}</dt>
                        <dd className="flex flex-col gap-1">
                          <span className="font-display text-h2 font-semibold tabular-nums leading-none text-ink-900">
                            {metric.value}
                          </span>
                          <span className="font-sans text-xs leading-snug text-ink-700">
                            {metric.label}
                          </span>
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
