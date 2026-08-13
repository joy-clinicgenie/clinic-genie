import Link from "next/link";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { cn } from "@/lib/cn";
import type { CtaLink } from "@/lib/data/pillars";

function isExternalHref(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}

function SecondaryAction({
  href,
  label,
  className,
}: {
  href: string;
  label: string;
  className?: string;
}) {
  const classes = cn(
    "inline-flex w-fit items-center gap-2 font-sans text-sm font-semibold text-genie-700",
    "transition-colors hover:text-genie-900",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-genie-500/40",
    className
  );

  if (isExternalHref(href)) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {label}
        <span aria-hidden="true">→</span>
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {label}
      <span aria-hidden="true">→</span>
    </Link>
  );
}

export function ServiceHeroActions({
  primaryCta,
  secondaryCta,
  layout = "mobile",
}: {
  primaryCta: CtaLink;
  secondaryCta?: CtaLink;
  layout?: "mobile" | "desktop";
}) {
  if (layout === "desktop") {
    return (
      <div className="flex w-full flex-col flex-wrap items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
        <MagneticButton href={primaryCta.href} size="md" withMiniOrb>
          {primaryCta.label}
        </MagneticButton>
        {secondaryCta ? (
          <MagneticButton href={secondaryCta.href} size="md" variant="ghost" tone="light">
            {secondaryCta.label}
          </MagneticButton>
        ) : null}
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-start gap-4">
      <div className="w-full max-w-[15rem] [&>span]:block [&>span]:w-full">
        <MagneticButton href={primaryCta.href} size="md" withMiniOrb className="w-full">
          {primaryCta.label}
        </MagneticButton>
      </div>
      {secondaryCta ? (
        <SecondaryAction href={secondaryCta.href} label={secondaryCta.label} />
      ) : null}
    </div>
  );
}
