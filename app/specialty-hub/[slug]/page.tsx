import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SpecialtyHubTemplate } from "@/components/specialty-hub/SpecialtyHubTemplate";
import { SpecialtyHubWorkTemplate } from "@/components/specialty-hub/SpecialtyHubWorkTemplate";
import { getCaseStudy } from "@/lib/data/portfolio";
import { getSpecialtyHubWorkMeta } from "@/lib/data/specialty-hub-works";
import {
  getPublishedSpecialtyHubs,
  getSpecialtyHub,
  isSpecialtyHubDetail,
} from "@/lib/data/specialty-hubs";

export function generateStaticParams() {
  return getPublishedSpecialtyHubs().map((hub) => ({ slug: hub.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const work = getSpecialtyHubWorkMeta(params.slug);
  if (work) {
    const study = getCaseStudy(work.studySlug);
    if (study) {
      return {
        title: `${study.name} | Specialty Hub | Clinic Genie`,
        description: study.line,
      };
    }
  }

  const hub = getSpecialtyHub(params.slug);
  if (!hub?.published || !hub.metaTitle) {
    return {
      title: "Specialty hub not found | Clinic Genie",
      description: "The specialty hub you're looking for couldn't be conjured.",
    };
  }
  return {
    title: hub.metaTitle,
    description: hub.metaDescription,
  };
}

export default function SpecialtyHubDetailPage({ params }: { params: { slug: string } }) {
  const work = getSpecialtyHubWorkMeta(params.slug);
  if (work) {
    const study = getCaseStudy(work.studySlug);
    if (!study) notFound();

    return (
      <SpecialtyHubWorkTemplate
        study={study}
        image={work.image}
        imageAlt={work.imageAlt}
        logo={work.logo}
        logoAlt={work.logoAlt}
        backLink={{ href: "/specialty-hub", label: "Clinic Specialties" }}
      />
    );
  }

  const hub = getSpecialtyHub(params.slug);
  if (!hub?.published || !isSpecialtyHubDetail(hub)) notFound();

  return <SpecialtyHubTemplate hub={hub} />;
}
