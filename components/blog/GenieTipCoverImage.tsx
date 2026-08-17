import Image from "next/image";
import { cn } from "@/lib/cn";

export const GENIE_TIP_COVER_SIZES = {
  featured: "(min-width: 1024px) 50vw, 100vw",
  grid: "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  article: "(min-width: 1280px) 56rem, (min-width: 1024px) 66vw, 100vw",
  body: "(min-width: 1024px) 45rem, 100vw",
} as const;

const HOVER_SCALE =
  "transition-transform duration-ui ease-out-soft group-hover:scale-[1.02] group-hover/card:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100 motion-reduce:group-hover/card:scale-100";

type GenieTipCoverImageProps = {
  src: string;
  alt?: string;
  sizes: string;
  priority?: boolean;
  aspectClassName?: string;
  className?: string;
  /** When true, the cover scales slightly on group hover. */
  hoverScale?: boolean;
};

export function GenieTipCoverImage({
  src,
  alt = "",
  sizes,
  priority = false,
  aspectClassName = "aspect-[16/10]",
  className,
  hoverScale = false,
}: GenieTipCoverImageProps) {
  return (
    <div className={cn("relative overflow-hidden", aspectClassName, className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", hoverScale && HOVER_SCALE)}
      />
    </div>
  );
}
