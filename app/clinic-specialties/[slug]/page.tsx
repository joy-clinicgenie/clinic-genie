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
        title: `${study.name} | Clinic Specialties | Clinic Genie`,
        description: study.line,
      };
    }
  }

  const hub = getSpecialtyHub(params.slug);
  if (!hub?.published || !hub.metaTitle) {
    return {
      title: "Clinic specialty not found | Clinic Genie",
      description: "The clinic specialty you're looking for couldn't be conjured.",
    };
  }
  return {
    title: hub.metaTitle,
    description: hub.metaDescription,
  };
}

export default function ClinicSpecialtyDetailPage({ params }: { params: { slug: string } }) {
  const work = getSpecialtyHubWorkMeta(params.slug);
  if (work) {
    const study = getCaseStudy(work.studySlug);
    if (!study) notFound();

    return (
      <SpecialtyHubWorkTemplate
        study={study}
        image={work.image}
        imageAlt={work.imageAlt}
        heroImage={work.heroImage}
        logo={work.logo}
        logoAlt={work.logoAlt}
        backLink={{ href: "/clinic-specialties", label: "Clinic Specialties" }}
      />
    );
  }

  const hub = getSpecialtyHub(params.slug);
  if (!hub?.published || !isSpecialtyHubDetail(hub)) notFound();

  return <SpecialtyHubTemplate hub={hub} />;
}
