import { formatKRW } from "@/lib/format";

/**
 * 가격 표기 (spec §5.4).
 * 가격은 타이포그래피다 — 항상 700굵기, 헤드라인급.
 * compareAtPrice 가 있고 price 보다 크면 세일 UI(세일가 레드 강조 + 정가 취소선).
 */
export default function Price({
  price,
  compareAtPrice,
  size = "base",
}: {
  price: number;
  compareAtPrice?: number | null;
  size?: "base" | "lg";
}) {
  const onSale = compareAtPrice != null && compareAtPrice > price;
  const priceClass = size === "lg" ? "text-price-lg" : "text-price";

  return (
    <span className="flex flex-wrap items-baseline gap-2 tabular-nums">
      <span className={`${priceClass} ${onSale ? "text-primary" : "text-ink"}`}>
        {formatKRW(price)}
      </span>
      {onSale && (
        <span className="text-sm text-muted line-through">
          {formatKRW(compareAtPrice!)}
        </span>
      )}
    </span>
  );
}
