import { redirect } from "next/navigation";

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

export default function BlogPostPage({ params }: BlogPostPageProps) {
  redirect(`/genie-tips/${params.slug}`);
}
