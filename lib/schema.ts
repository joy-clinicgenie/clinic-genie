import type { Faq } from "@/lib/data/faqs";
import { SITE } from "@/lib/data/nav";
import { DEFAULT_OG_IMAGE_PATH } from "@/lib/seo";

export type SchemaNode = {
  "@type": string;
  [key: string]: unknown;
};

export type SchemaDocument = {
  "@context": "https://schema.org";
  "@graph": SchemaNode[];
};

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
export function rootSchemaGraph(): SchemaDocument {
  return schemaGraph([organizationSchema(), websiteSchema(), professionalServiceSchema()]);
}

export function schemaGraph(nodes: Array<SchemaNode | null | undefined>): SchemaDocument {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.filter((node): node is SchemaNode => Boolean(node)),
  };
}

function absoluteUrl(pathOrUrl: string): string {
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    return pathOrUrl;
  }
  return siteUrl(pathOrUrl);
}

function plainText(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function nestedBreadcrumbs(trail: BreadcrumbItem[]): BreadcrumbItem[] {
  return [{ name: SITE.name, path: "/" }, ...trail];
}

export function breadcrumbList(items: BreadcrumbItem[]): SchemaNode | null {
  if (items.length === 0) return null;

  const leafPath = items[items.length - 1]?.path ?? "/";

  return {
    "@type": "BreadcrumbList",
    "@id": `${siteUrl(leafPath)}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: plainText(item.name),
      item: siteUrl(item.path),
    })),
  };
}

/** Standalone BreadcrumbList document. Prefer schemaGraph on pages. */
export function breadcrumbSchema(items: BreadcrumbItem[]): SchemaDocument {
  return schemaGraph([breadcrumbList(items)]);
}

export function faqPageSchema(faqs: Faq[], pagePath: string): SchemaNode | null {
  if (faqs.length === 0) return null;

  return {
    "@type": "FAQPage",
    "@id": `${siteUrl(pagePath)}#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: plainText(faq.q),
      acceptedAnswer: {
        "@type": "Answer",
        text: plainText(faq.a),
      },
    })),
  };
}

export interface ArticleSchemaInput {
  title: string;
  description: string;
  path: string;
  datePublished?: string | null;
  image?: string | null;
  keywords?: string[];
}

export function articleSchema({
  title,
  description,
  path,
  datePublished,
  image,
  keywords,
}: ArticleSchemaInput): SchemaNode {
  const url = siteUrl(path);
  const imageUrl = image ? absoluteUrl(image) : siteUrl(DEFAULT_OG_IMAGE_PATH);

  return {
    "@type": "Article",
    "@id": `${url}#article`,
    headline: plainText(title),
    description: plainText(description),
    url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    image: {
      "@type": "ImageObject",
      url: imageUrl,
    },
    inLanguage: "en-GB",
    ...(datePublished ? { datePublished } : {}),
    ...(keywords && keywords.length > 0 ? { keywords: keywords.join(", ") } : {}),
    author: {
      "@type": "Organization",
      name: SITE.name,
      url: siteUrl(),
    },
    publisher: { "@id": `${siteUrl()}/#organization` },
  };
}
