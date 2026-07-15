export interface ComplianceCard {
  title: string;
  body: string;
  image: string;
  alt: string;
}

export const COMPLIANCE_CARDS: ComplianceCard[] = [
  {
    title: "Built Within the Rules",
    body: "Compliant with Singapore's healthcare advertising guidelines.",
    image: "/compliance/rules.png",
    alt: "Built within the rules icon",
  },
  {
    title: "Evidence-Based Claims",
    body: "Every claim is grounded in fact, not hype.",
    image: "/compliance/based-claims.png",
    alt: "Evidence-based claims icon",
  },
  {
    title: "No False Promises",
    body: "No guarantees, exaggerations, or unfair comparisons.",
    image: "/compliance/no-false-promises.png",
    alt: "No false promises icon",
  },
  {
    title: "Ethical Patient Communication",
    body: "Patients feel informed, never pressured or pushed.",
    image: "/compliance/patient-comm.png",
    alt: "Ethical patient communication icon",
  },
  {
    title: "Reputation First",
    body: "Precise, credible content that protects your name.",
    image: "/compliance/reputation-first.png",
    alt: "Reputation first icon",
  },
];
