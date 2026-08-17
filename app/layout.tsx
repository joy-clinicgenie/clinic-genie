import type { Metadata } from "next";
import { Outfit, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { OrbProvider } from "@/lib/providers/OrbProvider";
import { MotionProvider } from "@/lib/providers/MotionConfig";
import { MotionChrome } from "@/components/layout/MotionChrome";
import { Nav } from "@/components/layout/Nav";
import { PageTransition } from "@/components/layout/PageTransition";
import { RootJsonLd } from "@/components/seo/RootJsonLd";
import { DEFAULT_OG_IMAGE } from "@/lib/seo";
import { SITE } from "@/lib/data/nav";

const outfit = Outfit({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-outfit", display: "swap" });
const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-instrument-sans",
  display: "swap",
});
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: ["500"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Clinic Genie | Strategies for Specialist Growth",
    template: "%s | Clinic Genie",
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "healthcare SEO",
    "medical SEM",
    "clinic websites",
    "specialist clinic marketing",
    "AI search readiness",
    "clinic marketing Singapore",
  ],
  openGraph: {
    title: "Clinic Genie | Strategies for Specialist Growth",
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    locale: "en_SG",
    type: "website",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clinic Genie | Strategies for Specialist Growth",
    description: SITE.description,
    images: [DEFAULT_OG_IMAGE.url],
  },
  icons: { icon: "/brand/brandmark.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${outfit.variable} ${instrumentSans.variable} ${jetbrains.variable}`}>
      <body>
        <RootJsonLd />
        <MotionProvider>
          <OrbProvider>
            <a
              id="skip-to-content"
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-md focus:bg-genie-600 focus:px-4 focus:py-2 focus:text-white"
            >
              Skip to content
            </a>
            <MotionChrome />
            <Nav />
            <main id="main">
              <PageTransition>{children}</PageTransition>
            </main>
          </OrbProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
