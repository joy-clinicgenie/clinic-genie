import { LandingKicker } from "@/components/home/landing/LandingLayout";
import styles from "./ContactSection.module.css";

export function ContactIntro() {
  return (
    <div className={styles.intro}>
      <LandingKicker light>Reach out anytime</LandingKicker>
      <h1
        id="contact-heading"
        className="font-display text-balance text-h2 text-white sm:text-h1"
      >
        Tell us your clinic&apos;s <span className="genie-text">wish</span>.
      </h1>
      <p className="max-w-xl text-pretty text-body leading-relaxed text-[#C9E4EA]">
        Whatever you are dreaming up, launching, redesigning, or growing, it starts with one
        conversation. Tell us where your clinic wants to grow.
      </p>
    </div>
  );
}
