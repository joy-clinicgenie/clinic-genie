export interface Ally {
  name: string;
  body: string;
  image: string;
  imageWidth?: number;
  imageHeight?: number;
  /** When false, logo keeps its original colours (default: white on dark cards). */
  logoWhite?: boolean;
}

export const ALLIES: Ally[] = [
  {
    name: "Casa Oasis Innovations",
    body: "Interior design and build support for professional clinic and commercial spaces.",
    image: "/partners/casa-oasis-innovations.png",
    imageWidth: 663,
    imageHeight: 180,
  },
  {
    name: "Inteq Communications",
    body: "Technology and communications support for smoother business operations.",
    image: "/partners/inteq-communications.png",
    imageWidth: 663,
    imageHeight: 180,
    logoWhite: false,
  },
  {
    name: "PilotPulse",
    body: "AI automation solutions that support smarter workflows and backend efficiency.",
    image: "/partners/pilot-pulse.png",
    imageWidth: 663,
    imageHeight: 180,
  },
  {
    name: "Real Inbound Consulting",
    body: "Business growth, funding, innovation, and expansion advisory support.",
    image: "/partners/real-inbound-consulting.png",
    imageWidth: 663,
    imageHeight: 180,
  },
];
