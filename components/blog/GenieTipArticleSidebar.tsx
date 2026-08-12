import { Badge } from "@/components/ui/badge";
import { POST_AUTHOR } from "@/lib/data/posts";

type GenieTipArticleSidebarProps = {
  tags: string[];
  category: string | null;
};

export function GenieTipArticleSidebar({
  tags,
  category,
}: GenieTipArticleSidebarProps) {
  const labels =
    tags.length > 0 ? tags : category ? [category] : (["Genie Tips"] as const);

  return (
    <aside className="flex flex-col gap-8 lg:sticky lg:top-28">
      <div>
        <p className="text-sm text-ink-500">Category</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {labels.map((label) => (
            <li key={label}>
              <Badge
                variant="secondary"
                className="h-8 rounded-pill bg-cg-soft-grey px-3.5 text-sm font-medium text-ink-900"
              >
                {label}
              </Badge>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="text-sm text-ink-500">Written by</p>
        <div className="mt-3 flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/brandmark.svg"
            alt=""
            width={44}
            height={44}
            className="size-11 shrink-0 rounded-full bg-cg-mist object-contain p-1.5"
          />
          <div className="min-w-0">
            <p className="font-display text-sm font-semibold text-ink-900">
              {POST_AUTHOR.name}
            </p>
            <p className="text-sm text-ink-500">{POST_AUTHOR.role}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
