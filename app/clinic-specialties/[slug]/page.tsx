import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { SpecialtyHubComingSoon } from "@/components/specialty-hub/SpecialtyHubComingSoon";
import { SpecialtyHubTemplate } from "@/components/specialty-hub/SpecialtyHubTemplate";
import {
  getPublishedSpecialtyHubs,
  getSpecialtyHub,
  isSpecialtyHubDetail,
} from "@/lib/data/specialty-hubs";
import { pageMetadata } from "@/lib/seo";
import {
  breadcrumbList,
  faqPageSchema,
  nestedBreadcrumbs,
  schemaGraph,
} from "@/lib/schema";

export function generateStaticParams() {
  return getPublishedSpecialtyHubs().map((hub) => ({ slug: hub.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const path = `/clinic-specialties/${params.slug}`;
  const hub = getSpecialtyHub(params.slug);

  if (!hub?.published) {
    return pageMetadata({
      title: "Clinic specialty not found",
      description:
        "This clinic specialty page could not be found. Explore Clinic Genie specialties for specialist clinic marketing in Singapore.",
      path: "/clinic-specialties",
      index: false,
      follow: true,
    });
  }

  if (isSpecialtyHubDetail(hub) && hub.metaTitle && hub.metaDescription) {
    return pageMetadata({
      title: hub.metaTitle,
      description: hub.metaDescription,
      path,
      keywords: [hub.name, "specialist clinic marketing Singapore"],
    });
  }

  return pageMetadata({
    title: `${hub.name} specialty insights`,
    description: `${hub.name} specialty marketing insights from Clinic Genie are coming soon. Browse Our Works for live specialist clinic case studies.`,
    path,
    index: false,
    follow: true,
  });
}

export default function ClinicSpecialtyDetailPage({ params }: { params: { slug: string } }) {
  const hub = getSpecialtyHub(params.slug);
  if (!hub?.published) notFound();

  const path = `/clinic-specialties/${hub.slug}`;
  const breadcrumbs = breadcrumbList(
    nestedBreadcrumbs([
      { name: "Clinic Specialties", path: "/clinic-specialties" },
      { name: hub.name, path },
    ])
  );

  if (isSpecialtyHubDetail(hub)) {
    return (
      <>
        <JsonLd data={schemaGraph([breadcrumbs, faqPageSchema(hub.faqs, path)])} />
        <SpecialtyHubTemplate hub={hub} />
      </>
    );
  }

  return (
    <>
      <JsonLd data={schemaGraph([breadcrumbs])} />
      <SpecialtyHubComingSoon specialtyName={hub.name} />
    </>
  );
}
