import { SITE } from "@/lib/data/nav";

/** Absolute site URL with no trailing slash. */
export function siteUrl(path = ""): string {
  const base = SITE.url.replace(/\/$/, "");
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": `${siteUrl()}/#organization`,
    name: SITE.name,
    url: siteUrl(),
    logo: {
      "@type": "ImageObject",
      url: siteUrl("/brand/brandmark.png"),
      width: 512,
      height: 512,
    },
    description: SITE.description,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "164 Bukit Merah Central, #03-3625",
      addressLocality: "Singapore",
      postalCode: "150164",
      addressCountry: "SG",
    },
    sameAs: Object.values(SITE.socials),
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${siteUrl()}/#website`,
    url: siteUrl(),
    name: SITE.name,
    description: SITE.description,
    inLanguage: "en-GB",
    publisher: { "@id": `${siteUrl()}/#organization` },
  };
}

export function professionalServiceSchema() {
  return {
    "@type": "ProfessionalService",
    "@id": `${siteUrl()}/#professional-service`,
    name: "Specialist clinic marketing",
    url: siteUrl("/services"),
    provider: { "@id": `${siteUrl()}/#organization` },
    areaServed: {
      "@type": "Country",
      name: "Singapore",
    },
    serviceType: [
      "Healthcare SEO",
      "Medical SEM",
      "Clinic website design and development",
      "Healthcare content strategy",
      "AI search readiness",
    ],
  };
}

/** Site-wide JSON-LD graph for the root layout. */
export function rootSchemaGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [organizationSchema(), websiteSchema(), professionalServiceSchema()],
  };
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: siteUrl(item.path),
    })),
  };
}
