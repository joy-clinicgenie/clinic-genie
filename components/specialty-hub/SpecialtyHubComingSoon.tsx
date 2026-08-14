import { LightHero } from "@/components/ui/LightHero";
import { DefaultPageFinale } from "@/components/ui/DefaultPageFinale";
import { PRIMARY_CTA } from "@/lib/data/nav";

export function SpecialtyHubComingSoon({ specialtyName }: { specialtyName: string }) {
  return (
    <>
      <LightHero
        kicker="Clinic Specialties"
        title={`${specialtyName} insights are still brewing! Coming soon 🪔`}
        subtitle="We are reshaping specialty pages for clearer patient search guidance. Browse Our Works for live case studies, or make your first wish to talk through your clinic growth plan."
        showOrb={false}
        showWishForm={false}
        align="center"
        primaryCta={{ href: PRIMARY_CTA.href, label: PRIMARY_CTA.label }}
        secondaryCta={{ href: "/portfolio", label: "See Our Work" }}
      />
      <DefaultPageFinale backdropClassName="surface-light" />
    </>
  );
}
