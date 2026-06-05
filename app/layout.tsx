import type { Metadata } from "next";
import { Sora, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { OrbProvider } from "@/lib/providers/OrbProvider";
import { LenisProvider } from "@/lib/providers/LenisProvider";
import { MotionProvider } from "@/lib/providers/MotionConfig";
import { OrbCompanion } from "@/components/orb/OrbCompanion";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { PointerRipples } from "@/components/ui/PointerRipples";
import { SITE } from "@/lib/data/nav";

const sora = Sora({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-sora", display: "swap" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-inter", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: ["500"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Clinic Genie — Strategies for Specialist Growth",
    template: "%s | Clinic Genie",
  },
  description: SITE.description,
  keywords: [
    "healthcare marketing Singapore",
    "medical SEO",
    "clinic marketing agency",
    "medical SEM",
    "clinic websites",
    "specialist clinic growth",
  ],
  openGraph: {
    title: "Clinic Genie — Strategies for Specialist Growth",
    description: SITE.description,
    url: SITE.url,
    siteName: "Clinic Genie",
    locale: "en_SG",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Clinic Genie", description: SITE.description },
  icons: { icon: "/brand/brandmark.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable} ${jetbrains.variable}`}>
      <body>
        <MotionProvider>
          <OrbProvider>
            <LenisProvider>
              <a
                href="#main"
                className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-md focus:bg-genie-600 focus:px-4 focus:py-2 focus:text-white"
              >
                Skip to content
              </a>
              <CustomCursor />
              <PointerRipples />
              <OrbCompanion />
              <Nav />
              <main id="main">
                <PageTransition>{children}</PageTransition>
              </main>
              <Footer />
            </LenisProvider>
          </OrbProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
