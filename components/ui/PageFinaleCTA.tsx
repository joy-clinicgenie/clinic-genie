import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import {
  LandingKicker,
  LandingHeading,
  LandingBody,
} from "@/components/home/landing/LandingLayout";
import { cn } from "@/lib/cn";

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
  bodyClassName,
}: {
  kicker: string;
  title: string;
  highlight?: string;
  body: string;
  primaryCta: CtaLink;
  secondaryCta?: CtaLink;
  footnote?: string;
  bodyClassName?: string;
}) {
  return (
    <section className="pb-32 pt-16">
      <div className="mx-auto flex w-full max-w-wide flex-col items-center gap-7 px-[var(--page-pad)] text-center">
        <Reveal className="flex w-full flex-col items-center">
          <LandingKicker light>{kicker}</LandingKicker>
        </Reveal>
        <Reveal delay={0.05} className="flex w-full flex-col items-center">
          <LandingHeading highlight={highlight} light className="text-center">
            {title}
          </LandingHeading>
        </Reveal>
        <Reveal delay={0.1} className="flex w-full flex-col items-center">
          <LandingBody light className={cn("w-full max-w-none text-center", bodyClassName)}>
            {body}
          </LandingBody>
        </Reveal>
        <Reveal delay={0.2} className="flex w-full justify-center">
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
          <Reveal delay={0.3} className="flex w-full justify-center">
            <p className="mx-auto max-w-full text-center text-sm text-[#8FB7C2] sm:max-w-[75%]">
              {footnote}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
