import type { Metadata } from "next";
import { ProjectComingSoon } from "@/components/portfolio/ProjectComingSoon";
import { CASE_STUDIES } from "@/lib/data/portfolio";

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export const metadata: Metadata = {
  title: "Project Coming Soon | Clinic Genie",
  description:
    "This project story is still brewing. Browse Our Works for specialist clinic projects from Clinic Genie.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CaseStudyPage() {
  return <ProjectComingSoon />;
}
