import type { ProductBadge } from "@/types/commerce";
import { BADGE_META } from "@/lib/badges";

export default function Badge({ badge }: { badge: ProductBadge }) {
  const meta = BADGE_META[badge];
  return <span className={`badge ${meta.className}`}>{meta.label}</span>;
}
