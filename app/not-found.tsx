import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SparkleField } from "@/components/ui/SparkleField";
import { MagicOrb } from "@/components/orb/MagicOrb";

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-aurora-hero pt-32 pb-20 text-onDark">
      <SparkleField density={36} parallax />

      <Container size="content" className="relative z-10 flex flex-col items-center gap-8 text-center">
        <Reveal variant="scale">
          <MagicOrb variant="home" className="w-48 mx-auto" />
        </Reveal>

        <Reveal variant="up" delay={0.05}>
          <Kicker>Error 404</Kicker>
        </Reveal>

        <Reveal variant="up" delay={0.1}>
          <p className="font-display text-[clamp(4rem,16vw,9rem)] font-bold leading-none text-balance">
            <span className="genie-text">404</span>
          </p>
        </Reveal>

        <Reveal variant="up" delay={0.15}>
          <h1 className="text-h2 font-display text-balance text-onDark">
            This wish slipped through the lamp.
          </h1>
        </Reveal>

        <Reveal variant="up" delay={0.2}>
          <p className="mx-auto max-w-xl text-lead text-onDark-muted">
            The page you were looking for has vanished, moved, or never quite existed. Even a genie
            can&apos;t conjure a page from thin air — but we can point you back to firmer ground.
          </p>
        </Reveal>

        <Reveal variant="up" delay={0.3}>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <MagneticButton href="/" size="lg" withMiniOrb>
              Back to home
            </MagneticButton>
            <MagneticButton href="/contact" size="lg" variant="secondary">
              Book a strategy call
            </MagneticButton>
          </div>
        </Reveal>

        <Reveal variant="up" delay={0.4}>
          <p className="text-sm text-onDark-faint">
            Lost something specific?{" "}
            <Link href="/genie-tips" className="text-genie-200 underline-offset-4 hover:text-white hover:underline">
              Browse Genie Tips
            </Link>{" "}
            or{" "}
            <Link href="/portfolio" className="text-genie-200 underline-offset-4 hover:text-white hover:underline">
              see our works
            </Link>
            .
          </p>
        </Reveal>
      </Container>

      {/* fade into footer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-night-900"
      />
    </section>
  );
}
