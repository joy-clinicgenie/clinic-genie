import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { SparkleCluster } from "@/components/ui/SparkleCluster";
import { cn } from "@/lib/cn";
import { buildCardSparkles } from "@/lib/card-sparkles";
import styles from "./FeatureInfoCard.module.css";

export interface FeatureInfoCardProps {
  title: string;
  body: string;
  image?: string;
  icon?: ReactNode;
  alt?: string;
  highlight?: string;
  href?: string;
  /** Overrides the default `${title}: ${body}` accessible name when the card is a link. */
  ariaLabel?: string;
  badge?: string;
  titleAs?: "h3" | "h6";
  compact?: boolean;
  /** Default 3.5rem. `lg` is 20% larger (4.2rem). */
  graphicSize?: "default" | "lg";
  showSparkles?: boolean;
  sparkleIndex?: number;
  className?: string;
}

function isExternalHref(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}

function CardTitle({ title, highlight }: { title: string; highlight?: string }) {
  if (!highlight || !title.includes(highlight)) {
    return title;
  }

  const [before, ...rest] = title.split(highlight);
  const after = rest.join(highlight);

  return (
    <>
      {before}
      <span className="genie-text">{highlight}</span>
      {after}
    </>
  );
}

function CardArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 18.256 18.256"
      aria-hidden="true"
      className="transition-transform duration-ui group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 motion-reduce:transition-none"
    >
      <g transform="translate(5.363 5.325)">
        <path
          d="M14.581,7.05,7.05,14.581"
          transform="translate(-7.05 -7.012)"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <path
          d="M10,7l5.287.037.038,5.287"
          transform="translate(-7.756 -7)"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </g>
    </svg>
  );
}

export function FeatureInfoCard({
  title,
  body,
  image,
  icon,
  alt = "",
  highlight,
  href,
  ariaLabel,
  badge,
  titleAs = "h3",
  compact = false,
  graphicSize = "default",
  showSparkles = false,
  sparkleIndex = 0,
  className,
}: FeatureInfoCardProps) {
  const TitleTag = titleAs;
  const hasGraphic = Boolean(icon || image);
  const isLargeGraphic = !compact && graphicSize === "lg";
  const graphicPx = compact ? 81 : isLargeGraphic ? 67 : 56;
  const sparkles = showSparkles && hasGraphic ? buildCardSparkles(sparkleIndex) : [];
  const linkClassName = cn(
    styles.cardInteractive,
    "group/card block h-full rounded-2xl text-inherit no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-genie-100 focus-visible:ring-offset-2"
  );
  const linkAriaLabel = ariaLabel ?? `${title}: ${body}`;

  const article = (
    <article
      className={cn(
        styles.card,
        "group/card relative flex h-full w-full min-w-0 flex-col items-start rounded-2xl bg-white p-7 text-left shadow-card transition-shadow duration-ui hover:shadow-lg motion-reduce:transition-none md:p-8",
        hasGraphic ? "min-h-[17.5rem] gap-5" : "gap-3",
        compact && styles.cardCompact,
        className
      )}
    >
      {hasGraphic || badge ? (
        <div className="flex w-full min-w-0 items-start justify-between gap-3">
          {hasGraphic ? (
            <div
              className={cn(
                styles.cardGraphic,
                compact && styles.cardGraphicCompact,
                isLargeGraphic && styles.cardGraphicLg
              )}
            >
              {icon ? (
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex shrink-0 items-center justify-center",
                    compact ? styles.cardIconCompact : isLargeGraphic ? styles.cardIconLg : "h-14 w-14"
                  )}
                >
                  {icon}
                </span>
              ) : image ? (
                <Image
                  src={image}
                  alt={alt}
                  width={graphicPx}
                  height={graphicPx}
                  className={cn(
                    "shrink-0 object-contain",
                    compact ? styles.cardIconCompact : isLargeGraphic ? styles.cardIconLg : "h-14 w-14"
                  )}
                />
              ) : null}
              {sparkles.length > 0 ? (
                <div className={styles.cardSparkles} aria-hidden="true">
                  {sparkles.map((spark) => (
                    <span
                      key={spark.id}
                      className={styles.cardSparkle}
                      style={{
                        left: spark.x,
                        top: spark.y,
                        width: spark.size,
                        height: spark.size,
                        animationDelay: spark.delay,
                        animationDuration: spark.duration,
                      }}
                    >
                      <SparkleCluster glow className="h-full w-full" />
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          ) : (
            <span />
          )}
          {badge ? (
            <span className="rounded-pill bg-ink-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ink-600">
              {badge}
            </span>
          ) : null}
        </div>
      ) : null}

      <div className={cn("flex w-full min-w-0 flex-col gap-2", compact && styles.cardCopy)}>
        <TitleTag
          className={cn(
            styles.cardTitle,
            compact
              ? styles.cardTitleCompact
              : titleAs === "h6" && "text-h6"
          )}
        >
          <CardTitle title={title} highlight={highlight} />
        </TitleTag>
        <p className={cn(styles.cardBody, compact && styles.cardBodyCompact)}>{body}</p>
      </div>

      {href ? (
        <span
          aria-hidden="true"
          className={cn(
            "card-arrow-btn flex h-10 w-10 items-center justify-center rounded-full bg-cg-soft-grey text-ink-900 transition-[background-color,box-shadow,color] duration-ui group-hover/card:bg-white group-hover/card:ring-4 group-hover/card:ring-genie-100/10 motion-reduce:transition-none",
            hasGraphic ? "mt-auto" : "mt-1"
          )}
        >
          <CardArrowIcon />
        </span>
      ) : null}
    </article>
  );

  if (href) {
    if (isExternalHref(href)) {
      return (
        <a
          href={href}
          className={linkClassName}
          aria-label={linkAriaLabel}
          target="_blank"
          rel="noopener noreferrer"
        >
          {article}
        </a>
      );
    }

    return (
      <Link href={href} className={linkClassName} aria-label={linkAriaLabel}>
        {article}
      </Link>
    );
  }

  return article;
}
