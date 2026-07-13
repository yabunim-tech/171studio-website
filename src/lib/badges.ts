import type { ProductBadge } from "@/types/commerce";

/**
 * 배지 라벨/색 매핑.
 * 라벨 매핑은 backend-developer 명세(02_..._data-model.md §2)를 그대로 따른다.
 * 색은 ui-designer v2 가이드(01_..._design-system.md §5.3)를 따른다:
 *  - 세일/한정/긴급(품절임박·한정판) → 레드 배급색(primary)
 *  - 그 외 중립(신상품·베스트·사인본) → 근흑(ink)
 * `className` 은 .badge 위에 얹는 색상 유틸(토큰 기반)만 담는다.
 */
export const BADGE_META: Record<
  ProductBadge,
  { label: string; className: string }
> = {
  new: { label: "신상품", className: "bg-ink text-white" },
  best: { label: "베스트", className: "bg-ink text-white" },
  low_stock: { label: "품절임박", className: "bg-primary text-white" },
  limited: { label: "한정판", className: "bg-primary text-white" },
  signed: { label: "사인본", className: "bg-ink text-white" },
};

/** 품절 배지(재고 없음 오버레이용) */
export const SOLD_OUT_BADGE = {
  label: "품절",
  className: "bg-gray-100 text-muted line-through",
};
