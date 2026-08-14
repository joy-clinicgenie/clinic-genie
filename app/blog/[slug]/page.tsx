import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { pageMetadata } from "@/lib/seo";

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  return pageMetadata({
    title: "Genie Tips",
    description:
      "Clinic marketing insight from Clinic Genie for specialist clinics in Singapore.",
    path: `/genie-tips/${params.slug}`,
  });
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  redirect(`/genie-tips/${params.slug}`);
}
