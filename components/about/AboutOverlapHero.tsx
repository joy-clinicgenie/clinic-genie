import Image from "next/image";
import { LightHero } from "@/components/ui/LightHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { LandingIntro } from "@/components/home/landing/LandingLayout";
import { ExpertsCards, ExpertsTagline } from "@/components/about/ExpertsCards";

export function AboutOverlapHero() {
  return (
    <div>
      <LightHero
        title="The genie behind better clinic growth"
        highlight="genie"
        subtitle="Every clinic has a wish: to be found by the patients who need it Clinic Genie helps grant it"
        description="A medical marketing agency for specialist clinics in Singapore, helping good doctors get found, trusted and chosen."
        showOrb={false}
        showWishForm={false}
        showSparkles={false}
        surface="white"
        align="center"
        minHeight="min-h-0"
        copyClassName="max-w-5xl"
        titleClassName="max-w-none md:whitespace-nowrap"
        className="pb-40 sm:pb-48 lg:pb-56"
      />

      <section
        aria-label="About Clinic Genie"
        data-nav-theme="dark"
        className="bg-night-900 pb-20 pt-0 sm:pb-24 lg:pb-28"
      >
        <Container size="wide" className="relative z-10 -mt-28 flex flex-col gap-16 sm:-mt-36 lg:-mt-44 lg:gap-20">
          <figure className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-cg-teal-60 shadow-lg">
            <Image
              src="/about/intro-image.svg"
              alt=""
              fill
              priority
              unoptimized
              className="object-cover object-center"
              sizes="(min-width: 1280px) 82.5rem, 100vw"
            />
          </figure>

          <div className="flex flex-col gap-12">
            <Reveal>
              <LandingIntro
                light
                kicker="The experts behind the work"
                title="The specialists behind every clinic wish."
                highlight="specialists"
                subtitle="Each focused on one part of responsible clinic marketing, working as one growth engine."
              />
            </Reveal>
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
