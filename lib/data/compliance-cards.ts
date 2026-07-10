export interface ComplianceCard {
  title: string;
  body: string;
  image: string;
  alt: string;
}

export const COMPLIANCE_CARDS: ComplianceCard[] = [
  {
    title: "Built Within the Rules",
    body: "Every wish is shaped around Singapore's healthcare advertising guidelines, so your content stays clear, careful, and responsible.",
    image: "/compliance/based-claims.png",
    alt: "Built within the rules icon",
  },
  {
    title: "Evidence-Based Claims",
    body: "We ground every claim in fact, not hype. What we cannot support, we do not say.",
    image: "/compliance/no-false-promises.png",
    alt: "Evidence-based claims icon",
  },
  {
    title: "No False Promises",
    body: "No guaranteed outcomes. No exaggerated claims. No misleading comparisons. Just content your clinic can stand behind.",
    image: "/compliance/no-false-promises.png",
    alt: "No false promises icon",
  },
  {
    title: "Ethical Patient Communication",
    body: "We avoid pressure, fear, and overpersuasion. Patients should feel informed, not pushed.",
    image: "/compliance/patient-comm.png",
    alt: "Ethical patient communication icon",
  },
  {
    title: "Reputation First",
    body: "Your name is the lamp. We protect it with content that is precise, credible, and built for trust.",
    image: "/compliance/reputation-first.png",
    alt: "Reputation first icon",
  },
];
