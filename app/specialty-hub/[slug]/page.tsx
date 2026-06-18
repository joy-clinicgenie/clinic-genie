import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SpecialtyHubTemplate } from "@/components/specialty-hub/SpecialtyHubTemplate";
import {
  getPublishedSpecialtyHubs,
  getSpecialtyHub,
  isSpecialtyHubDetail,
} from "@/lib/data/specialty-hubs";

export function generateStaticParams() {
  return getPublishedSpecialtyHubs().map((hub) => ({ slug: hub.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
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
  const hub = getSpecialtyHub(params.slug);
  if (!hub?.published || !isSpecialtyHubDetail(hub)) notFound();

  return <SpecialtyHubTemplate hub={hub} />;
}
