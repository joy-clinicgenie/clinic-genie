import Link from "next/link";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { hairlineGridItemClass } from "@/lib/hairline-grid";
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
            {items.map((item, index) => (
              <RevealItem
                key={item.title}
                className={hairlineGridItemClass(index, items.length)}
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
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
