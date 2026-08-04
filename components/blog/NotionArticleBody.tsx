import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export function NotionArticleBody({ markdown }: { markdown: string }) {
  return (
    <div className="notion-article prose prose-lg max-w-none prose-headings:font-display prose-headings:text-ink-900 prose-p:text-ink-700 prose-a:text-genie-700 prose-a:no-underline hover:prose-a:underline prose-strong:text-ink-900 prose-li:text-ink-700 prose-blockquote:border-genie-100 prose-blockquote:text-ink-700 prose-hr:border-hairline-light prose-code:rounded prose-code:bg-cg-mist prose-code:px-1 prose-code:py-0.5 prose-code:text-ink-900 prose-code:before:content-none prose-code:after:content-none prose-pre:bg-cg-mist prose-pre:text-ink-900">
      <ReactMarkdown rehypePlugins={[rehypeRaw]}>{markdown}</ReactMarkdown>
    </div>
  );
}
