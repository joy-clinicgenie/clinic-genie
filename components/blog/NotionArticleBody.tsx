import Image from "next/image";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { GENIE_TIP_COVER_SIZES } from "@/components/blog/GenieTipCoverImage";

function isLocalImageSrc(src: string): boolean {
  return src.startsWith("/") && !src.startsWith("//");
}

const markdownComponents: Components = {
  img: ({ src, alt }) => {
    if (!src || typeof src !== "string") return null;
    const label = alt?.trim() || "Article image";

    if (!isLocalImageSrc(src)) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={label}
          loading="lazy"
          decoding="async"
          className="my-8 h-auto w-full rounded-xl object-cover shadow-card"
        />
      );
    }

    return (
      <Image
        src={src}
        alt={label}
        width={1600}
        height={1000}
        sizes={GENIE_TIP_COVER_SIZES.body}
        className="my-8 h-auto w-full rounded-xl object-cover shadow-card"
      />
    );
  },
};

export function NotionArticleBody({ markdown }: { markdown: string }) {
  return (
    <div className="notion-article prose prose-lg max-w-none prose-headings:font-display prose-headings:text-ink-900 prose-p:text-ink-700 prose-a:text-genie-700 prose-a:no-underline hover:prose-a:underline prose-strong:text-ink-900 prose-li:text-ink-700 prose-blockquote:border-genie-100 prose-blockquote:text-ink-700 prose-hr:border-hairline-light prose-img:my-8 prose-img:rounded-xl prose-code:rounded prose-code:bg-cg-mist prose-code:px-1 prose-code:py-0.5 prose-code:text-ink-900 prose-code:before:content-none prose-code:after:content-none prose-pre:bg-cg-mist prose-pre:text-ink-900">
      <ReactMarkdown rehypePlugins={[rehypeRaw]} components={markdownComponents}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
