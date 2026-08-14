import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PageFinale } from "@/components/ui/PageFinale";
import { PageFinaleCTA } from "@/components/ui/PageFinaleCTA";
import { WorksGalleryLayout } from "@/components/portfolio/WorksGalleryLayout";

export const metadata: Metadata = pageMetadata({
  title: "Our Works",
  description:
    "Selected brands, websites, and campaigns Clinic Genie has built for specialist clinics in Singapore. Strategy, design, and search brought into one clear growth system.",
  path: "/portfolio",
  keywords: [
    "clinic website case studies",
    "healthcare branding Singapore",
    "specialist clinic marketing work",
  ],
});

export default function PortfolioPage() {
  return (
    <>
      <WorksGalleryLayout />

      <PageFinale backdropClassName="bg-cg-teal-5">
        <PageFinaleCTA
          kicker="Make your first wish"
          title="Your clinic could be next."
          highlight="next"
          body="Book a free 30-minute strategy call. We'll map where the right patients are searching, and how to make your clinic clearer to find, understand and consider."
          primaryCta={{ href: "/contact", label: "Make Your First Wish" }}
          footnote="No obligation. No jargon. Just a clear next step."
        />
      </PageFinale>
    </>
  );
}
