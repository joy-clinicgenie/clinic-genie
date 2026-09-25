import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProjectCaseStudy } from "@/components/portfolio/ProjectCaseStudy";
import { ProjectComingSoon } from "@/components/portfolio/ProjectComingSoon";
import { SpecialtyHubWorkTemplate } from "@/components/specialty-hub/SpecialtyHubWorkTemplate";
import { CASE_STUDIES, getCaseStudy, isIndexableCaseStudy } from "@/lib/data/portfolio";
import { getPortfolioWorkMeta } from "@/lib/data/specialty-hub-works";
import { pageMetadata } from "@/lib/seo";
import {
  breadcrumbList,
  creativeWorkSchema,
  nestedBreadcrumbs,
  schemaGraph,
  webPageSchema,
} from "@/lib/schema";

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
    description: study.metaDescription ?? study.line,
    path: `/portfolio/${params.slug}`,
    keywords: [study.name, "specialist clinic marketing Singapore"],
    index: isIndexableCaseStudy(study),
    follow: isIndexableCaseStudy(study),
  });
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const study = getCaseStudy(params.slug);
  if (!study) notFound();

  const workMeta = getPortfolioWorkMeta(params.slug);
  const workPath = `/portfolio/${study.slug}`;
  const workDescription = study.metaDescription ?? study.line;
  const breadcrumbs = (
    <JsonLd
      data={schemaGraph([
        webPageSchema({
          path: workPath,
          name: study.name,
          description: workDescription,
        }),
        isIndexableCaseStudy(study)
          ? creativeWorkSchema({
              name: study.name,
              description: workDescription,
              path: workPath,
            })
          : null,
        breadcrumbList(
          nestedBreadcrumbs([
            { name: "Our Works", path: "/portfolio" },
            { name: study.name, path: workPath },
          ])
        ),
      ])}
    />
  );

  if (workMeta) {
    return (
      <>
        {breadcrumbs}
        <SpecialtyHubWorkTemplate
          study={study}
          image={workMeta.image}
          imageAlt={workMeta.imageAlt}
          heroImage={workMeta.heroImage}
          logo={workMeta.logo}
          logoAlt={workMeta.logoAlt}
          backLink={{ href: "/portfolio", label: "Our Works" }}
        />
      </>
    );
  }

  if (!study.heroBody && study.workedOn.length === 0) {
    return (
      <>
        {breadcrumbs}
        <ProjectComingSoon />
      </>
    );
  }

  return (
    <>
      {breadcrumbs}
      <ProjectCaseStudy
        study={study}
        backLink={{ href: "/portfolio", label: "Our Works" }}
      />
    </>
  );
}
