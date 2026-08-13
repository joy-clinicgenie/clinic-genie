import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Kicker } from "./Kicker";
import { Reveal } from "./Reveal";

function renderHighlight(
  title: string,
  highlight?: string,
  highlightClassName = "genie-text"
) {
  if (!highlight || !title.includes(highlight)) return title;
  const [before, ...rest] = title.split(highlight);
  const after = rest.join(highlight);
  return (
    <>
      {before}
      <span className={highlightClassName}>{highlight}</span>
      {after}
    </>
  );
}

const SIZE: Record<string, string> = {
  h1: "text-h1 font-display",
  h2: "text-h2 font-display",
  h3: "text-h3 font-display",
};

export function SectionHeading({
  kicker,
  title,
  highlight,
  highlightClassName,
  subtitle,
  description,
  align = "left",
  mobileAlign,
  tone = "dark",
  as = "h2",
  className,
  titleClassName,
  subtitleClassName,
  kickerClassName,
}: {
  kicker?: string;
  title: ReactNode;
  highlight?: string;
  highlightClassName?: string;
  subtitle?: string;
  description?: string;
  align?: "left" | "center";
  mobileAlign?: "left" | "center";
  tone?: "dark" | "light";
  as?: "h1" | "h2" | "h3";
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  kickerClassName?: string;
}) {
  const Tag = as;
  const titleContent =
    typeof title === "string"
      ? renderHighlight(title, highlight, highlightClassName)
      : title;
  const hasSubheading = Boolean(subtitle && description);
  const bodyText = description ?? subtitle;
  const resolvedMobileAlign = mobileAlign ?? align;

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        resolvedMobileAlign === "center" &&
          align !== "center" &&
          "max-lg:items-center max-lg:text-center lg:items-start lg:text-left",
        className
      )}
    >
      {kicker && (
        <Reveal variant="up">
          <Kicker tone={tone} className={kickerClassName}>
            {kicker}
          </Kicker>
        </Reveal>
      )}
      <Reveal variant="up" delay={0.05}>
        <Tag
          className={cn(
            SIZE[as],
            "whitespace-pre-line text-balance",
            tone === "dark" ? "text-onDark" : "text-ink-900",
            align === "center" && "mx-auto max-w-5xl",
            resolvedMobileAlign === "center" &&
              align !== "center" &&
              "max-lg:mx-auto lg:mx-0",
            titleClassName
          )}
        >
          {titleContent}
        </Tag>
      </Reveal>
      {hasSubheading && (
        <Reveal variant="up" delay={0.1}>
          <p
            className={cn(
              "font-display text-subtitle font-normal text-pretty max-w-sm sm:max-w-[75%] sm:text-h5",
              tone === "dark" ? "text-onDark-muted" : "text-ink-700",
              align === "center" && "mx-auto"
            )}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
      {bodyText && (
        <Reveal variant="up" delay={hasSubheading ? 0.14 : 0.12}>
          <p
            className={cn(
              as === "h1" ? "text-body" : "text-lead",
              tone === "dark" ? "text-onDark-muted" : "text-ink-700",
              align === "center" && "mx-auto",
              resolvedMobileAlign === "center" &&
                align !== "center" &&
                "max-lg:mx-auto lg:mx-0",
              subtitleClassName ??
                "max-w-full sm:max-w-[75%] whitespace-pre-line text-pretty"
            )}
          >
            {bodyText}
          </p>
        </Reveal>
      )}
    </div>
  );
}
