import { GenieFeatureCards } from "@/components/ui/GenieFeatureCards";

const ROWS = [
  {
    title: "Built for specialists",
    highlight: "specialists",
    body: "Marketing shaped around your specialty, never generic.",
    image: "/about/specialist.svg",
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
      className="relative z-10 -mt-8 overflow-hidden rounded-t-2xl surface-cyan lg:-mt-11 lg:rounded-t-[44px]"
      kicker="Meet your Clinic Genie"
      title="A Singapore clinic marketing agency built for specialists"
      highlight="specialists"
      cards={[...ROWS]}
      cta={{ href: "/about", label: "Meet the Genies Behind the Magic" }}
    />
  );
}
