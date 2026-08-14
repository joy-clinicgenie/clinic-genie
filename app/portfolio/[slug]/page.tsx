import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectCaseStudy } from "@/components/portfolio/ProjectCaseStudy";
import { ProjectComingSoon } from "@/components/portfolio/ProjectComingSoon";
import { SpecialtyHubWorkTemplate } from "@/components/specialty-hub/SpecialtyHubWorkTemplate";
import { CASE_STUDIES, getCaseStudy } from "@/lib/data/portfolio";
import { getPortfolioWorkMeta } from "@/lib/data/specialty-hub-works";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({ slug: study.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const study = getCaseStudy(params.slug);
  if (!study) {
    return pageMetadata({
      title: "Project Coming Soon",
      description:
        "This project story is still brewing. Browse Our Works for specialist clinic projects from Clinic Genie.",
      path: "/portfolio",
      index: false,
      follow: true,
    });
  }

  return pageMetadata({
    title: study.name,
    description: study.line,
    path: `/portfolio/${params.slug}`,
    keywords: [study.name, "specialist clinic marketing Singapore"],
  });
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const study = getCaseStudy(params.slug);
  if (!study) notFound();

  const workMeta = getPortfolioWorkMeta(params.slug);
  if (workMeta) {
    return (
      <SpecialtyHubWorkTemplate
        study={study}
        image={workMeta.image}
        imageAlt={workMeta.imageAlt}
        heroImage={workMeta.heroImage}
        logo={workMeta.logo}
        logoAlt={workMeta.logoAlt}
        backLink={{ href: "/portfolio", label: "Our Works" }}
      />
    );
  }

  if (!study.heroBody && study.workedOn.length === 0) {
    return <ProjectComingSoon />;
  }

  return (
    <ProjectCaseStudy
      study={study}
      backLink={{ href: "/portfolio", label: "Our Works" }}
    />
  );
}
