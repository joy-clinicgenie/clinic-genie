import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { NotionPost } from "@/lib/notion";

export function NotionPostCard({ post }: { post: NotionPost }) {
  return (
    <Link
      href={`/genie-tips/${post.slug}`}
      aria-label={`Read: ${post.title}`}
      className="group block h-full rounded-xl focus-visible:outline-none"
    >
      <Card className="h-full overflow-hidden transition-[transform,box-shadow] duration-ui ease-out-soft group-hover:-translate-y-1 group-hover:shadow-md motion-reduce:group-hover:translate-y-0 group-focus-visible:ring-2 group-focus-visible:ring-genie-500/50">
        {post.coverImage ? (
          <div className="relative aspect-[16/10] overflow-hidden bg-cg-mist">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.coverImage}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-ui group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
          </div>
        ) : null}

        <CardHeader>
          {post.dateLabel ? (
            <time
              dateTime={post.date ?? undefined}
              className="text-xs text-ink-500"
            >
              {post.dateLabel}
            </time>
          ) : null}
          <CardTitle className="transition-colors group-hover:text-genie-700">
            {post.title}
          </CardTitle>
          {post.description ? (
            <CardDescription className="line-clamp-3">
              {post.description}
            </CardDescription>
          ) : null}
        </CardHeader>

        {post.tags.length > 0 ? (
          <CardContent>
            <ul className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <li key={tag}>
                  <Badge variant="secondary">{tag}</Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        ) : null}

        <CardFooter>
          <span className="text-sm font-medium text-genie-700 transition-colors group-hover:text-genie-800">
            Read article
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
