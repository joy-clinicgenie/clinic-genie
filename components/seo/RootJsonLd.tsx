import { rootSchemaGraph } from "@/lib/schema";

export function RootJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(rootSchemaGraph()) }}
    />
  );
}
