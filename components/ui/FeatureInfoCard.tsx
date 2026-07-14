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
  badge?: string;
  titleAs?: "h3" | "h6";
  compact?: boolean;
  showSparkles?: boolean;
  sparkleIndex?: number;
  className?: string;
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
  badge,
  titleAs = "h3",
  compact = false,
  showSparkles = false,
  sparkleIndex = 0,
  className,
}: FeatureInfoCardProps) {
  const TitleTag = titleAs;
  const sparkles = showSparkles ? buildCardSparkles(sparkleIndex) : [];

  const article = (
    <article
      className={cn(
        styles.card,
        "group/card relative flex h-full min-h-[17.5rem] w-full flex-col items-start gap-5 rounded-xl bg-white p-6 text-left shadow-card transition-shadow duration-ui hover:shadow-lg motion-reduce:transition-none",
        className
      )}
    >
      <div className="flex w-full items-start justify-between gap-3">
        <div className={styles.cardGraphic}>
          {icon ? (
            <span
              aria-hidden="true"
              className={cn(
                "flex h-12 w-12 shrink-0 items-center justify-center",
                compact && "h-10 w-10 sm:h-12 sm:w-12"
              )}
            >
              {icon}
            </span>
          ) : image ? (
            <Image
              src={image}
              alt={alt}
              width={48}
              height={48}
              className={cn(
                "h-12 w-12 shrink-0 object-contain",
                compact && "h-10 w-10 sm:h-12 sm:w-12"
              )}
            />
          ) : null}
          {showSparkles ? (
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
        {badge ? (
          <span className="rounded-pill bg-ink-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ink-600">
            {badge}
          </span>
        ) : null}
      </div>

      <div className="flex w-full flex-col gap-2">
        <TitleTag
          className={cn(
            styles.cardTitle,
            compact
              ? "text-sm font-semibold sm:text-xs"
              : titleAs === "h6"
                ? "text-h6"
                : "text-h4"
          )}
        >
          <CardTitle title={title} highlight={highlight} />
        </TitleTag>
        <p className={styles.cardBody}>{body}</p>
      </div>

      {href ? (
        <span
          aria-hidden="true"
          className="mt-auto flex h-10 w-10 items-center justify-center rounded-full bg-cg-soft-grey text-ink-900 transition-[box-shadow] duration-ui group-hover/card:ring-4 group-hover/card:ring-cg-soft-grey motion-reduce:transition-none"
        >
          <CardArrowIcon />
        </span>
      ) : null}
    </article>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={cn(
          styles.cardInteractive,
          "group/card block h-full rounded-xl text-inherit no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-genie-100 focus-visible:ring-offset-2"
        )}
        aria-label={`${title}: ${body}`}
      >
        {article}
      </Link>
    );
  }

  return article;
}
