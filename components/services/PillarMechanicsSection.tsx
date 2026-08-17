import Link from "next/link";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import type { CorePillar } from "@/lib/data/pillars";

function isExternalHref(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}

function ItemLink({ href, label }: { href: string; label: string }) {
  const className =
    "mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-genie-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-genie-400";

  if (isExternalHref(href)) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer">
        {label}
        <span aria-hidden="true">→</span>
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {label}
      <span aria-hidden="true">→</span>
    </Link>
  );
}

export function PillarMechanicsSection({ pillar }: { pillar: CorePillar }) {
  const items = pillar.mechanicsItems;

  return (
    <section
      id={pillar.mechanicsId}
      data-nav-theme="dark"
      className="bg-night-800 py-20 text-onDark md:py-28"
    >
      <div className="relative left-1/2 w-screen -translate-x-1/2 px-[var(--page-pad)]">
        <div className="mx-auto grid w-full max-w-[96rem] gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
          <Reveal className="lg:col-span-4">
            <header className="flex max-w-md flex-col items-start gap-4 text-left">
              <SectionEyebrow tone="dark" align="left">
                {pillar.mechanicsSubtitle}
              </SectionEyebrow>
              <h2 className="font-display text-h2 text-balance text-white">
                {pillar.mechanicsTitle}
              </h2>
              <p className="text-body leading-relaxed text-white">{pillar.mechanicsLead}</p>
              {pillar.mechanicsIntro ? (
                <p className="text-body leading-relaxed text-onDark-muted">
                  {pillar.mechanicsIntro}
                </p>
              ) : null}
            </header>
          </Reveal>

          <RevealGroup className="grid sm:grid-cols-2 lg:col-span-8">
            {items.map((item, index) => {
              const lastRowCount = items.length % 2 === 0 ? 2 : 1;
              const isLastRow = index >= items.length - lastRowCount;
              const isLeftCol = index % 2 === 0;

              return (
                <RevealItem
                  key={item.title}
                  className={cn(
                    "relative py-8 first:pt-0 last:max-sm:pb-0",
                    index < items.length - 1 &&
                      "max-sm:after:pointer-events-none max-sm:after:absolute max-sm:after:inset-x-4 max-sm:after:bottom-0 max-sm:after:h-px max-sm:after:bg-white/10 max-sm:after:content-['']",
                    "sm:py-8",
                    index < 2 && "sm:pt-0",
                    isLastRow && "sm:pb-0",
                    isLeftCol ? "sm:pr-10" : "sm:pl-10",
                    isLeftCol &&
                      "sm:before:pointer-events-none sm:before:absolute sm:before:right-0 sm:before:w-px sm:before:bg-white/10 sm:before:content-['']",
                    isLeftCol && (index < 2 ? "sm:before:top-8" : "sm:before:top-0"),
                    isLeftCol && (isLastRow ? "sm:before:bottom-8" : "sm:before:bottom-0"),
                    !isLastRow &&
                      "sm:after:pointer-events-none sm:after:absolute sm:after:bottom-0 sm:after:h-px sm:after:bg-white/10 sm:after:content-['']",
                    !isLastRow &&
                      (isLeftCol ? "sm:after:left-8 sm:after:right-0" : "sm:after:left-0 sm:after:right-8")
                  )}
                >
                  <article className="flex flex-col items-start">
                    <h3 className="font-display text-[1.125rem] font-semibold leading-snug text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-body leading-relaxed text-onDark-muted">{item.body}</p>
                    {item.link ? (
                      <ItemLink href={item.link.href} label={item.link.label || "Learn more"} />
                    ) : null}
                  </article>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
