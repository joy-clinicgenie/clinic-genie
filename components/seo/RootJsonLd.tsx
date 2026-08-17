import { JsonLd } from "@/components/seo/JsonLd";
import { rootSchemaGraph } from "@/lib/schema";

export function RootJsonLd() {
  return <JsonLd data={rootSchemaGraph()} />;
}
