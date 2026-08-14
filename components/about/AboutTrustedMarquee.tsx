import { LogoMarquee } from "@/components/home/LogoMarquee";
import { LandingIntro, LandingSection } from "@/components/home/landing/LandingLayout";
import { Reveal } from "@/components/ui/Reveal";
import { CLIENT_LOGOS } from "@/lib/data/client-logos";

export function AboutTrustedMarquee() {
  return (
    <LandingSection
      tone="white"
      className="border-t border-[#E6EEF1] bg-white py-16"
      containerClassName="flex flex-col gap-8"
    >
      <Reveal>
        <LandingIntro
          kicker="Trusted by specialist clinics"
          title="Clinics we have helped grow responsibly"
          highlight="responsibly"
          subtitle="Granted, not promised. Specialist clinics across Singapore trust Clinic Genie for search, websites, content, and compliance-aware marketing."
        />
      </Reveal>

      <Reveal delay={0.06} className="-mx-[var(--page-pad)] w-[calc(100%+2*var(--page-pad))]">
        <LogoMarquee logos={CLIENT_LOGOS} variant="subtle" />
      </Reveal>
    </LandingSection>
  );
}
