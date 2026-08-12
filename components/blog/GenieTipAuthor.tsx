import { POST_AUTHOR } from "@/lib/data/posts";
import { cn } from "@/lib/cn";

type GenieTipAuthorProps = {
  className?: string;
  size?: "sm" | "md";
};

export function GenieTipAuthor({
  className,
  size = "sm",
}: GenieTipAuthorProps) {
  const avatarClass = size === "md" ? "size-11 p-1.5" : "size-9 p-1";

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/brandmark.svg"
        alt=""
        width={size === "md" ? 44 : 36}
        height={size === "md" ? 44 : 36}
        className={cn(
          "shrink-0 rounded-full bg-cg-mist object-contain",
          avatarClass
        )}
      />
      <div className="min-w-0">
        <p className="text-sm font-medium text-ink-900">{POST_AUTHOR.name}</p>
        <p className="text-xs text-ink-500">{POST_AUTHOR.role}</p>
      </div>
    </div>
  );
}
