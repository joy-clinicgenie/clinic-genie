import type { Metadata } from "next";
import { GenieTipsComingSoon } from "@/components/blog/GenieTipsComingSoon";
import { POSTS } from "@/lib/data/posts";

export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

export const metadata: Metadata = {
  title: "Genie Tips Coming Soon | Clinic Genie",
  description:
    "Genie Tips are still brewing. Practical, compliance-aware clinic growth advice for specialist clinics in Singapore is coming soon.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function GenieTipPage() {
  return <GenieTipsComingSoon />;
}
