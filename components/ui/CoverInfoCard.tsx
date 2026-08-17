import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

export interface CoverInfoCardProps {
  title: string;
  body: string;
  image: string;
  alt: string;
  href: string;
  /** Extra classes for the image, typically object-position. */
  imageClassName?: string;
  className?: string;
}

function isExternalHref(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
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

export function CoverInfoCard({
  title,
  body,
  image,
  alt,
  href,
  imageClassName,
  className,
}: CoverInfoCardProps) {
  const article = (
    <article
      className={cn(
        "group/card relative flex h-full min-h-80 w-full flex-col overflow-hidden rounded-2xl shadow-card transition-shadow duration-ui hover:shadow-lg motion-reduce:transition-none md:min-h-96",
        className
      )}
    >
      <Image
        key={image}
        src={image}
        alt={alt}
        fill
        className={cn("object-cover", imageClassName)}
        sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-night-900 via-night-900/50 to-transparent"
      />
      <div className="relative mt-auto flex flex-col items-start gap-3 p-7 md:p-8">
        <div className="flex w-full flex-col gap-2">
          <h3 className="font-display text-h4 font-semibold leading-snug text-white">{title}</h3>
          <p className="text-body leading-relaxed text-onDark-muted">{body}</p>
        </div>
        <span
          aria-hidden="true"
          className="card-arrow-btn mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white transition-[background-color,box-shadow,color] duration-ui group-hover/card:bg-white group-hover/card:text-ink-900 group-hover/card:ring-4 group-hover/card:ring-white/20 motion-reduce:transition-none"
        >
          <CardArrowIcon />
        </span>
      </div>
    </article>
  );

  const linkClassName =
    "block h-full rounded-2xl text-inherit no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-genie-100 focus-visible:ring-offset-2";

  if (isExternalHref(href)) {
    return (
      <a
        href={href}
        className={linkClassName}
        aria-label={`${title}: ${body}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {article}
      </a>
    );
  }

  return (
    <Link href={href} className={linkClassName} aria-label={`${title}: ${body}`}>
      {article}
    </Link>
  );
}
