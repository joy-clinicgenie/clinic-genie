import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms and Privacy",
  description:
    "The terms and privacy provisions that apply when you use the Clinic Genie website, including how we collect, use, protect, and manage information shared with us.",
  path: "/terms-privacy",
});

export default function PrivacyPage() {
  redirect("/terms-privacy");
}
