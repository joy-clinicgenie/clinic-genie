import type { Metadata } from "next";
import Link from "next/link";
import { LightHero } from "@/components/ui/LightHero";
import { Kicker } from "@/components/ui/Kicker";
import { PageFinale } from "@/components/ui/PageFinale";
import { PageFinaleCTA } from "@/components/ui/PageFinaleCTA";
import { CorePillarsSection } from "@/components/services/CorePillarsSection";

export const metadata: Metadata = {
  title: "Core Service Pillars — The Full Clinic Genie Toolkit | Clinic Genie",
  description:
    "Eight core service pillars that grow specialist clinics: FindClinic.sg, Healthcare SEO, Medical SEM, Branding & Copywriting, Web Design & Development, Photo & Video, Social Media, and GEO & AI Search.",
};

export default function CorePillarsPage() {
  return (
    <>
      <LightHero
        leading={
          <div className="flex flex-col items-center gap-4">
            <Link
              href="/services"
              className="inline-flex w-fit items-center gap-2 font-display text-kicker uppercase text-genie-700 transition-colors hover:text-genie-900"
            >
              <span aria-hidden="true">←</span> Services
            </Link>
            <Kicker>Core service pillars</Kicker>
          </div>
        }
        title={"Eight pillars.\nOne growth engine."}
        highlight="growth engine"
        subtitle="Every core service we offer, built to work together. Explore each pillar to see exactly how it helps your clinic get discovered, understood, and trusted by the right patients."
        primaryCta={{ href: "/contact", label: "Make Your First Wish" }}
        showOrb={false}
        showWishForm={false}
        align="center"
        minHeight="min-h-[60vh]"
      />

      <CorePillarsSection showIndexCta={false} />

      <PageFinale>
        <PageFinaleCTA
          kicker="Not sure where to start?"
          title="Tell us your wish."
          highlight="wish"
          body="Book a free strategy call and we'll recommend the right mix of pillars for your clinic — no hard sell."
          primaryCta={{ href: "/contact", label: "Make Your First Wish" }}
        />
      </PageFinale>
    </>
  );
}
