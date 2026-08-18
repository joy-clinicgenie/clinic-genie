import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Sunrise Heart Specialist Clinic",
  description:
    "How Clinic Genie helped Sunrise Heart Specialist Clinic build brand clarity, search visibility, and AI-ready content for community cardiology in northern Singapore.",
  path: "/portfolio/sunrise-heart",
});

export default function SunriseLegacyPage() {
  redirect("/portfolio/sunrise-heart");
}
