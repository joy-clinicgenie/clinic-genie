export interface ComplianceCard {
  title: string;
  body: string;
  image: string;
  alt: string;
}

export const COMPLIANCE_CARDS: ComplianceCard[] = [
  {
    title: "Compliance-aware",
    body: "Aligned with HCSA, PHMC, SMC, and PDPA.",
    image: "/compliance/compliance-aware.svg",
    alt: "Compliance-aware marketing icon",
  },
  {
    title: "No false promises",
    body: "No exaggerated claims, no misleading content.",
    image: "/compliance/no-false-promises.svg",
    alt: "No false promises icon",
  },
  {
    title: "Reputation first",
    body: "Clear, credible content that protects your clinic.",
    image: "/compliance/reputation-first.svg",
    alt: "Reputation first icon",
  },
];
