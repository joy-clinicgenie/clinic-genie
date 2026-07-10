import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectCaseStudy } from "@/components/portfolio/ProjectCaseStudy";
import { CASE_STUDIES, getCaseStudy } from "@/lib/data/portfolio";

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const cs = getCaseStudy(params.slug);
  if (!cs) {
    return {
      title: "Project not found | Clinic Genie",
      description: "The project page you are looking for could not be found.",
    };
  }
  return {
    title: `${cs.name} — Project | Clinic Genie`,
    description: cs.heroBody,
  };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const cs = getCaseStudy(params.slug);
  if (!cs) notFound();

  return <ProjectCaseStudy study={cs} />;
}
