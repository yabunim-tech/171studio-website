import type { CategorySlug } from "@/types/commerce";

/**
 * 상품 이미지 placeholder (v2 — 유니클로 스타일).
 *
 * 실제 상품 사진/일러스트는 아직 준비 전이다(backend 명세 §1: /images/products/*.svg
 * 는 아직 없는 경로). 실제 에셋이 준비되면 public/images/products/ 에 넣고
 * 이 컴포넌트를 next/image 로 교체하면 된다. 지금은 중립 회색(#f5f5f5) 배경 +
 * 저채도 카테고리 아이콘 + 상품명만 렌더한다(장식 최소화).
 */

const CATEGORY_EMOJI: Record<CategorySlug, string> = {
  book: "📖",
  stationery: "✏️",
  goods: "🧶",
  print: "🖼️",
  card: "✉️",
};

export default function ProductImage({
  category,
  name,
  className = "",
  emojiClassName = "text-5xl",
}: {
  category: CategorySlug;
  name: string;
  className?: string;
  emojiClassName?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`${name} 대표 이미지 (준비 중)`}
      className={`flex flex-col items-center justify-center gap-2 bg-surface-muted ${className}`}
    >
      <span className={`${emojiClassName} opacity-40 grayscale`} aria-hidden="true">
        {CATEGORY_EMOJI[category]}
      </span>
      <span className="px-4 text-center text-sm text-muted">{name}</span>
    </div>
  );
}
