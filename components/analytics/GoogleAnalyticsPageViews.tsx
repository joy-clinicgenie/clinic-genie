"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

interface GoogleAnalyticsPageViewsProps {
  gaId: string;
}

type Gtag = (...args: unknown[]) => void;

let lastTrackedPath: string | null = null;

function readGtag(target: Window): Gtag | undefined {
  const candidate = (target as Window & { gtag?: Gtag }).gtag;
  return typeof candidate === "function" ? candidate : undefined;
}

export function GoogleAnalyticsPageViews({ gaId }: GoogleAnalyticsPageViewsProps): null {
  const pathname = usePathname();

  useEffect(() => {
    const pagePath = `${pathname}${window.location.search}`;
    if (lastTrackedPath === null || lastTrackedPath === pagePath) {
      lastTrackedPath = pagePath;
      return;
    }

    lastTrackedPath = pagePath;

    const gtag = readGtag(window);
    if (!gtag) return;

    gtag("event", "page_view", {
      page_path: pagePath,
      page_location: window.location.href,
      page_title: document.title,
      send_to: gaId,
    });
  }, [gaId, pathname]);

  return null;
}
