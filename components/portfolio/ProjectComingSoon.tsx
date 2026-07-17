import { LightHero } from "@/components/ui/LightHero";
import { PRIMARY_CTA } from "@/lib/data/nav";

export function ProjectComingSoon() {
  return (
    <LightHero
      kicker="Our Works"
      title="This project story is still brewing! Coming soon 🪔"
      subtitle="Detailed case studies are on the way. Browse Our Works for the full gallery, or make your first wish to talk through your clinic growth plan."
      showOrb={false}
      showWishForm={false}
      align="center"
      primaryCta={{ href: PRIMARY_CTA.href, label: PRIMARY_CTA.label }}
      secondaryCta={{ href: "/portfolio", label: "Back to Our Works" }}
    />
  );
}
