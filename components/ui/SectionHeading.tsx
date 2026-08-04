import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Kicker } from "./Kicker";
import { Reveal } from "./Reveal";

function renderHighlight(title: string, highlight?: string, tone: "dark" | "light" = "dark") {
  if (!highlight || !title.includes(highlight)) return title;
  const [before, ...rest] = title.split(highlight);
  const after = rest.join(highlight);
  const cls = "genie-text";
  return (
    <>
      {before}
      <span className={cls}>{highlight}</span>
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
  subtitle,
  description,
  align = "left",
  tone = "dark",
  as = "h2",
  className,
  titleClassName,
}: {
  kicker?: string;
  title: ReactNode;
  highlight?: string;
  subtitle?: string;
  description?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  as?: "h1" | "h2" | "h3";
  className?: string;
  titleClassName?: string;
}) {
  const Tag = as;
  const titleContent =
    typeof title === "string" ? renderHighlight(title, highlight, tone) : title;
  const hasSubheading = Boolean(subtitle && description);
  const bodyText = description ?? subtitle;

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {kicker && (
        <Reveal variant="up">
          <Kicker tone={tone}>{kicker}</Kicker>
        </Reveal>
      )}
      <Reveal variant="up" delay={0.05} className="overflow-hidden">
        <Tag
          className={cn(
            SIZE[as],
            "whitespace-pre-line text-balance",
            tone === "dark" ? "text-onDark" : "text-ink-900",
            align === "center" && "mx-auto max-w-3xl",
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
              "font-display text-h5 font-normal text-pretty max-w-full sm:max-w-[75%]",
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
              "max-w-full sm:max-w-[75%] text-pretty",
              tone === "dark" ? "text-onDark-muted" : "text-ink-700",
              align === "center" && "mx-auto"
            )}
          >
            {bodyText}
          </p>
        </Reveal>
      )}
    </div>
  );
}
