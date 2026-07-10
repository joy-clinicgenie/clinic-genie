import { Container } from "@/components/ui/Container";
import { SparkleField } from "@/components/ui/SparkleField";
import { ContactIntro } from "@/components/contact/ContactIntro";
import { ContactForm } from "@/components/contact/ContactForm";
import styles from "./ContactSection.module.css";

export function ContactSection() {
  return (
    <section data-nav-theme="light" className={`surface-light relative py-20 text-ink-900 md:py-28 ${styles.section}`}>
      <span className={styles.blobTopLeft} aria-hidden="true" />
      <span className={styles.blobBottomRight} aria-hidden="true" />

      <svg
        aria-hidden="true"
        className={`${styles.ringPattern} ${styles.ringPatternTop} motion-reduce:hidden`}
        viewBox="0 0 200 200"
        fill="none"
      >
        <circle cx="100" cy="100" r="88" stroke="#9CC8D2" strokeWidth="1" strokeDasharray="6 10" />
        <circle cx="100" cy="100" r="62" stroke="#B8D9E0" strokeWidth="0.8" strokeDasharray="4 8" />
      </svg>

      <svg
        aria-hidden="true"
        className={`${styles.ringPattern} ${styles.ringPatternBottom} motion-reduce:hidden`}
        viewBox="0 0 160 160"
        fill="none"
      >
        <circle cx="80" cy="80" r="70" stroke="#9CC8D2" strokeWidth="1" strokeDasharray="5 9" />
      </svg>

      <SparkleField density={18} parallax variant="cluster" className="opacity-40" />

      <Container size="wide" className="relative z-10">
        <div className={styles.grid}>
          <ContactIntro />
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
