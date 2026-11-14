import { SERVICES_GROUPS, SITE } from "@/lib/data/nav";
import { getPublishedSpecialtyHubs, isSpecialtyHubDetail } from "@/lib/data/specialty-hubs";
import { getPublishedPosts } from "@/lib/notion";
import { siteUrl } from "@/lib/schema";

// Plain-text site guide for AI assistants and answer engines (https://llmstxt.org).
export const revalidate = 3600;

function link(title: string, path: string, description?: string): string {
  return `- [${title}](${siteUrl(path)})${description ? `: ${description}` : ""}`;
}

export async function GET() {
  const services = SERVICES_GROUPS.flatMap((group) => group.items).map((item) =>
    link(item.title, item.href, item.description)
  );

  const specialties = getPublishedSpecialtyHubs()
    .filter(isSpecialtyHubDetail)
    .map((hub) => link(hub.name, `/clinic-specialties/${hub.slug}`, hub.summary));

  let tips: string[] = [];
  try {
    const posts = await getPublishedPosts();
    tips = posts
      .filter((post) => !post.noIndex)
      .map((post) => link(post.title, `/genie-tips/${post.slug}`, post.description));
  } catch {
    // Notion may be unavailable without credentials; omit the section.
  }

  const sections = [
    `# ${SITE.name}`,
    `> ${SITE.description}`,
    [
      `${SITE.name} works only with private and specialist medical clinics in Singapore.`,
      "Strategy and copy are written with Singapore healthcare advertising rules in mind.",
      `Contact: ${SITE.email} · ${SITE.address}`,
    ].join("\n"),
    ["## Key pages", link("About", "/about"), link("Services", "/services"), link("Portfolio", "/portfolio"), link("Contact", "/contact")].join("\n"),
    ["## Services", ...services].join("\n"),
    specialties.length ? ["## Clinic specialties", ...specialties].join("\n") : null,
    tips.length ? ["## Genie Tips (articles)", ...tips].join("\n") : null,
    ["## Optional", link("Terms and privacy", "/terms-privacy"), link("Sitemap", "/sitemap.xml")].join("\n"),
  ];

  return new Response(sections.filter(Boolean).join("\n\n") + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
