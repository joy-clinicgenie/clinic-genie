import { LightHero } from "@/components/ui/LightHero";
import { PRIMARY_CTA } from "@/lib/data/nav";

export function GenieTipsComingSoon() {
  return (
    <LightHero
      kicker="Genie Tips"
      title="Genie Tips are still brewing! Coming soon 🪔"
      subtitle="Practical clinic growth advice is on the way. In the meantime, make your first wish and we can talk through your search, website, and patient discovery plan."
      showOrb={false}
      showWishForm={false}
      align="center"
      primaryCta={{ href: PRIMARY_CTA.href, label: PRIMARY_CTA.label }}
      secondaryCta={{ href: "/", label: "Back to home" }}
    />
  );
}
