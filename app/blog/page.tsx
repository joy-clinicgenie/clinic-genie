import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { DEFAULT_KEYWORDS, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Genie Tips",
  description:
    "Practical clinic marketing insights on healthcare SEO, medical SEM, clinic websites, AI search readiness, and compliance-aware growth for specialist clinics in Singapore.",
  path: "/genie-tips",
  keywords: [...DEFAULT_KEYWORDS, "clinic marketing insights"],
});

export default function BlogIndexPage() {
  redirect("/genie-tips");
}
