import type { SchemaDocument } from "@/lib/schema";

function serialiseJsonLd(data: SchemaDocument): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function JsonLd({ data }: { data: SchemaDocument }) {
  if (data["@graph"].length === 0) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serialiseJsonLd(data) }}
    />
  );
}
