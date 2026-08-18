import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Tell Clinic Genie where your clinic wants to grow. Book a strategy conversation about healthcare SEO, clinic websites, medical SEM, and compliance-aware marketing in Singapore.",
  path: "/contact",
});

export default function ContactsPage() {
  redirect("/contact");
}
