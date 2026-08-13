import { GenieFeatureCards } from "@/components/ui/GenieFeatureCards";

const ROWS = [
  {
    title: "Built for specialists",
    highlight: "specialists",
    body: "Marketing shaped around your specialty, never generic.",
    image: "/about/specialist.svg",
    href: "/clinic-specialties",
  },
  {
    title: "Found by patients",
    highlight: "patients",
    body: "Clear visibility across Google, AI search, and reviews.",
    image: "/about/found-everywhere.svg",
    href: "/services",
  },
  {
    title: "Magic with mechanics",
    highlight: "mechanics",
    body: "Creative spark, backed by real search data.",
    image: "/about/statistic.svg",
    href: "/portfolio",
  },
] as const;

export function ClinicGenieGap() {
  return (
    <GenieFeatureCards
      id="gap"
      className="surface-cyan"
      kicker="Meet your Clinic Genie"
      title="A Singapore clinic marketing agency built for specialists"
      highlight="specialists"
      cards={[...ROWS]}
      cta={{ href: "/about", label: "Meet the Genies Behind the Magic" }}
    />
  );
}
