import type { Metadata } from "next";
import { GenieTipsComingSoon } from "@/components/blog/GenieTipsComingSoon";

export const metadata: Metadata = {
  title: "Genie Tips Coming Soon | Clinic Genie",
  description:
    "Genie Tips are still brewing. Practical, compliance-aware clinic growth advice for specialist clinics in Singapore is coming soon.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function GenieTipsPage() {
  return <GenieTipsComingSoon />;
}
