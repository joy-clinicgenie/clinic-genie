import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Cedar Endocrine Clinic",
  description:
    "How Clinic Genie helped Cedar Endocrine Clinic build clearer condition structure, search visibility, and enquiry pathways across two hospital locations.",
  path: "/portfolio/cedar-endocrine-clinic",
});

export default function CedarLegacyPage() {
  redirect("/portfolio/cedar-endocrine-clinic");
}
