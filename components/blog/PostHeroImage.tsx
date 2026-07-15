import { cn } from "@/lib/cn";
import type { PostCategory } from "@/lib/data/posts";
import { getCategoryIllustration } from "@/components/blog/category-illustrations";

export function PostHeroImage({
  category,
  title,
  idSuffix = "",
  className,
}: {
  category: PostCategory;
  title: string;
  /** Unique suffix so multiple illustrations on one page do not clash SVG gradient ids */
  idSuffix?: string;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "aspect-[16/9] overflow-hidden rounded-lg bg-night-900 sm:rounded-xl",
        className
      )}
    >
      <div
        className="h-full w-full [&>svg]:h-full [&>svg]:w-full [&>svg]:object-cover"
        role="img"
        aria-label={`Illustration for ${title}`}
      >
        {getCategoryIllustration(category, idSuffix)}
      </div>
    </figure>
  );
}
