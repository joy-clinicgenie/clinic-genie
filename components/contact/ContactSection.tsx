import { Container } from "@/components/ui/Container";
import { ContactIntro } from "@/components/contact/ContactIntro";
import { ContactForm } from "@/components/contact/ContactForm";
import styles from "./ContactSection.module.css";

export function ContactSection() {
  return (
    <div className={styles.section}>
      <section data-nav-theme="dark" className={styles.banner} aria-labelledby="contact-heading">
        <span className={styles.bannerGrid} aria-hidden="true" />
        <Container size="wide" className="relative z-10">
          <ContactIntro />
        </Container>
      </section>

      <section data-nav-theme="light" className={styles.formWrap} aria-label="Contact form">
        <Container size="wide">
          <ContactForm />
        </Container>
      </section>
    </div>
  );
}
