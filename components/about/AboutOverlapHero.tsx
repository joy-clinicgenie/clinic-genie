import { LightHero } from "@/components/ui/LightHero";
import { Container } from "@/components/ui/Container";
import { AboutOfficeImage } from "@/components/about/AboutOfficeImage";
import { AboutExpertsIntro } from "@/components/about/AboutExpertsIntro";
import { ExpertsCards, ExpertsTagline } from "@/components/about/ExpertsCards";
import styles from "./AboutOverlapHero.module.css";

export function AboutOverlapHero() {
  return (
    <div className={styles.shell}>
      <LightHero
        title="The genie behind better clinic growth"
        highlight="genie"
        subtitle="Every clinic has a wish: to be found by the patients who need it. Clinic Genie helps grant it"
        description="A medical marketing agency for specialist clinics in Singapore, helping good doctors get found, trusted and chosen."
        showOrb={false}
        showWishForm={false}
        showSparkles={false}
        surface="white"
        align="center"
        mobileAlign="left"
        minHeight="min-h-0"
        copyClassName="max-w-5xl"
        titleClassName="max-w-none md:whitespace-nowrap"
        subtitleClassName="max-w-xs sm:max-w-[75%] whitespace-pre-line text-pretty"
        className="max-lg:items-start max-lg:pb-[calc((100vw-2*var(--page-pad))*3/4)] lg:pb-56"
      />

      <section
        aria-label="About Clinic Genie"
        data-nav-theme="dark"
        className={`${styles.darkSection} bg-night-900 pb-20 pt-0 sm:pb-24 lg:pb-28`}
      >
        <div className={styles.darkGlow} aria-hidden="true" />

        <Container size="wide" className="relative z-10 lg:-mt-44">
          <div className={styles.imageWrap}>
            <AboutOfficeImage />
          </div>

          <div className={styles.intro}>
            <AboutExpertsIntro />
          </div>
        </Container>

        <div className="relative left-1/2 mt-12 w-screen -translate-x-1/2 px-[var(--page-pad)] lg:mt-16">
          <div className="relative mx-auto w-full max-w-[96rem]">
            <div className="relative z-10">
              <ExpertsCards />
            </div>
            <ExpertsTagline />
          </div>
        </div>
      </section>
    </div>
  );
}
