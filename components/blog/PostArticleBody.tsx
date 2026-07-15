import type { Post, PostSection } from "@/lib/data/posts";
import { PostBlockquote } from "@/components/blog/PostBlockquote";
import { PostHeroImage } from "@/components/blog/PostHeroImage";

function PostSectionView({
  section,
  category,
  title,
  imageSuffix,
}: {
  section: PostSection;
  category: Post["category"];
  title: string;
  imageSuffix: string;
}) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-display text-h3 text-ink-900">{section.heading}</h2>

      {section.body.map((para) => (
        <p key={para.slice(0, 48)} className="text-body leading-relaxed text-ink-700">
          {para}
        </p>
      ))}

      {section.list && section.list.length > 0 && (
        <div className="flex flex-col gap-3 pt-1">
          {section.listLabel && (
            <p className="font-semibold text-ink-900">{section.listLabel}</p>
          )}
          <ul className="flex list-disc flex-col gap-2.5 pl-5 text-body leading-relaxed text-ink-700 marker:text-ink-500">
            {section.list.map((item) => (
              <li key={item.title}>
                <span className="font-semibold text-ink-900">{item.title}</span>
                {" – "}
                {item.body}
              </li>
            ))}
          </ul>
        </div>
      )}

      {section.showImage && (
        <PostHeroImage
          category={category}
          title={title}
          idSuffix={imageSuffix}
          className="mt-4"
        />
      )}

      {section.quote && <PostBlockquote quote={section.quote} className="mt-4" />}
    </section>
  );
}

/**
 * A short, on-brand editorial note for posts that have a dek but no long-form
 * body yet. Derived only from the dek — no fabricated statistics or fake depth.
 */
function editorialNote(dek: string) {
  const cleaned = dek.replace(/\s+$/, "").replace(/[.!?]$/, "");
  return [
    `We're putting the finishing touches on the full guide: ${cleaned.charAt(0).toLowerCase()}${cleaned.slice(1)}.`,
    "Every Genie Tip is written for clinic owners and specialist doctors: practical, compliance-aware, and grounded in what we see working for clinics across Singapore. No fluff, no jargon, no claims we can't stand behind.",
    "Want the answer for your clinic specifically? That's exactly what a strategy call is for.",
  ];
}

export function PostArticleBody({ post }: { post: Post }) {
  const hasSections = Array.isArray(post.sections) && post.sections.length > 0;

  if (!hasSections) {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-body leading-relaxed text-ink-700">{post.intro ?? post.dek}</p>
        {editorialNote(post.dek).map((para) => (
          <p key={para.slice(0, 48)} className="text-body leading-relaxed text-ink-700">
            {para}
          </p>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-12">
      {post.intro && post.sections![0]?.heading !== "Introduction" && (
        <p className="text-body leading-relaxed text-ink-700">{post.intro}</p>
      )}
      {post.sections!.map((section, index) => (
        <PostSectionView
          key={section.heading}
          section={section}
          category={post.category}
          title={post.title}
          imageSuffix={`-body-${index}`}
        />
      ))}
    </div>
  );
}
