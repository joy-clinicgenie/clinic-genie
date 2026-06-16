import { cn } from "@/lib/cn";
import { Kicker } from "./Kicker";
import { Reveal } from "./Reveal";

function renderHighlight(title: string, highlight?: string, tone: "dark" | "light" = "dark") {
  if (!highlight || !title.includes(highlight)) return title;
  const [before, ...rest] = title.split(highlight);
  const after = rest.join(highlight);
  // genie-text gradient fails AA on white; use a solid, AA-safe accent on light.
  const cls = tone === "dark" ? "genie-text" : "text-genie-700";
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
  align = "left",
  tone = "dark",
  as = "h2",
  className,
}: {
  kicker?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  const Tag = as;
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
            "text-balance",
            tone === "dark" ? "text-onDark" : "text-ink-900",
            align === "center" && "mx-auto max-w-3xl"
          )}
        >
          {renderHighlight(title, highlight, tone)}
        </Tag>
      </Reveal>
      {subtitle && (
        <Reveal variant="up" delay={0.12}>
          <p
            className={cn(
              "text-lead max-w-[75%] text-pretty",
              tone === "dark" ? "text-onDark-muted" : "text-ink-700",
              align === "center" && "mx-auto"
            )}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
