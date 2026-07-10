import { FileText, Monitor, Search, Sparkles } from "lucide-react";
import type { CONTACT_BUILT_FOR } from "@/lib/data/contact";

type BuiltForIconName = (typeof CONTACT_BUILT_FOR)[number]["icon"];

const ICONS: Record<BuiltForIconName, typeof Search> = {
  search: Search,
  monitor: Monitor,
  document: FileText,
  sparkles: Sparkles,
};

export function BuiltForIcon({ name }: { name: BuiltForIconName }) {
  const Icon = ICONS[name];
  return <Icon aria-hidden="true" className="h-4 w-4 shrink-0 text-genie-500" strokeWidth={1.75} />;
}
