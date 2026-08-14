import { PageFinale } from "@/components/ui/PageFinale";
import { PageFinaleCTA } from "@/components/ui/PageFinaleCTA";
import { CaseStudyChallenge } from "@/components/portfolio/case-study/CaseStudyChallenge";
import { CaseStudyHero } from "@/components/portfolio/case-study/CaseStudyHero";
import { CaseStudyMetrics } from "@/components/portfolio/case-study/CaseStudyMetrics";
import { CaseStudySnapshot } from "@/components/portfolio/case-study/CaseStudySnapshot";
import { CompliancePrinciples } from "@/components/portfolio/case-study/CompliancePrinciples";
import { DiagnosisFramework } from "@/components/portfolio/case-study/DiagnosisFramework";
import { PatientJourney } from "@/components/portfolio/case-study/PatientJourney";
import { WorkstreamList } from "@/components/portfolio/case-study/WorkstreamList";
import type { CaseStudy } from "@/lib/data/portfolio";

export function SpecialtyHubWorkTemplate({
  study,
  image = "/works/joyfulseeds/joyfulseeds-mockup.png",
  imageAlt,
  logo,
  logoAlt,
  backLink = { href: "/portfolio", label: "Our Works" },
}: {
  study: CaseStudy;
  image?: string;
  imageAlt?: string;
  heroImage?: string;
  logo?: string;
  logoAlt?: string;
  backLink?: { href: string; label: string };
}) {
  return (
    <>
      <CaseStudyHero
        study={study}
        image={image}
        imageAlt={imageAlt}
        logo={logo}
        logoAlt={logoAlt}
        backLink={backLink}
      />
      <CaseStudySnapshot study={study} />
      <CaseStudyChallenge study={study} />
      <DiagnosisFramework
        intro={study.diagnosisIntro}
        body={study.diagnosisBody}
        lenses={study.diagnosisLenses}
      />
      <WorkstreamList study={study} />
      <PatientJourney study={study} />
      <CaseStudyMetrics study={study} />
      <CompliancePrinciples study={study} />
      <PageFinale backdropClassName="bg-genie-10">
        <PageFinaleCTA
          kicker="Make your first wish"
          title="Want a clearer patient journey for your clinic?"
          highlight="clearer patient journey"
          body="Book a strategy call. We will map how patients find, understand, and enquire with your clinic, then show you where Clinic Genie can help."
          primaryCta={{ href: "/contact", label: "Make Your First Wish" }}
          secondaryCta={{ href: "/portfolio", label: "See Our Work" }}
          footnote="No obligation. No jargon. Just a clear next step."
        />
      </PageFinale>
    </>
  );
}
