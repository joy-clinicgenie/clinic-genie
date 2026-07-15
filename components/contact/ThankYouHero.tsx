import { Container } from "@/components/ui/Container";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { LandingKicker } from "@/components/home/landing/LandingLayout";
import styles from "./ContactSection.module.css";

export function ThankYouHero() {
  return (
    <div className={styles.section}>
      <section
        data-nav-theme="dark"
        className={`${styles.banner} ${styles.thankYouBanner}`}
        aria-labelledby="thank-you-heading"
      >
        <span className={styles.bannerGrid} aria-hidden="true" />
        <Container size="wide" className="relative z-10">
          <div className={styles.intro}>
            <LandingKicker light>Wish received</LandingKicker>
            <h1
              id="thank-you-heading"
              className="font-display text-balance text-h2 text-white sm:text-h1"
            >
              Your wish is on its way to the <span className="genie-text">genie</span>.
            </h1>
            <p className="max-w-xl text-pretty text-body leading-relaxed text-[#C9E4EA]">
              Thank you for reaching out. We have your enquiry, and we will look at it with your
              clinic, your goals, and your growth in mind.
            </p>
            <div className="mt-2 flex flex-col flex-wrap items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <MagneticButton href="/" size="md">
                Return to Homepage
              </MagneticButton>
              <MagneticButton href="/portfolio" size="md" variant="ghost" tone="light">
                See the Magic We&apos;ve Made
              </MagneticButton>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
