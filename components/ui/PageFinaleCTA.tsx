import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import {
  LandingKicker,
  LandingHeading,
  LandingBody,
} from "@/components/home/landing/LandingLayout";

type CtaLink = {
  href: string;
  label: string;
};

export function PageFinaleCTA({
  kicker,
  title,
  highlight,
  body,
  primaryCta,
  secondaryCta,
  footnote,
}: {
  kicker: string;
  title: string;
  highlight?: string;
  body: string;
  primaryCta: CtaLink;
  secondaryCta?: CtaLink;
  footnote?: string;
}) {
  return (
    <section className="pb-32 pt-16">
      <div className="mx-auto flex max-w-wide flex-col items-center gap-7 px-[var(--page-pad)] text-center">
        <Reveal>
          <LandingKicker light>{kicker}</LandingKicker>
        </Reveal>
        <Reveal delay={0.05}>
          <LandingHeading highlight={highlight} light>
            {title}
          </LandingHeading>
        </Reveal>
        <Reveal delay={0.1}>
          <LandingBody light>{body}</LandingBody>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <MagneticButton href={primaryCta.href} size="lg" withMiniOrb>
              {primaryCta.label}
            </MagneticButton>
            {secondaryCta && (
              <MagneticButton href={secondaryCta.href} size="lg" variant="ghost" tone="light">
                {secondaryCta.label}
              </MagneticButton>
            )}
          </div>
        </Reveal>
        {footnote && (
          <Reveal delay={0.3}>
            <p className="mx-auto max-w-full text-sm text-[#8FB7C2] sm:max-w-[75%]">{footnote}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
