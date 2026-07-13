import Link from "next/link";
import type { Product } from "@/types/commerce";
import ProductImage from "./ProductImage";
import Badge from "./Badge";
import Price from "./Price";
import { SOLD_OUT_BADGE } from "@/lib/badges";

/**
 * 제품 카드 (목록/메인 공용) — v2 유니클로 스타일.
 * 구조(디자인 §5.2): 이미지(3:4) → 배지(좌상단) → 제목 → 저자/요약 → 가격.
 * bg 흰색, border/그림자 없음(그리드 gutter로만 구분), radius 0, hover 시 "뜨는" 연출 금지.
 */
export default function ProductCard({ product }: { product: Product }) {
  const author = product.bookMeta?.author;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block focus:outline-none"
    >
      <article
        className={`flex h-full flex-col bg-canvas ${
          !product.inStock ? "opacity-90" : ""
        }`}
      >
        {/* 이미지 + 배지 오버레이 (radius 0) */}
        <div className="relative aspect-[3/4] w-full overflow-hidden">
          <ProductImage
            category={product.category}
            name={product.name}
            className="h-full w-full"
          />

          {product.badges.length > 0 && (
            <div className="absolute left-0 top-0 flex flex-col items-start gap-1">
              {product.badges.map((b) => (
                <Badge key={b} badge={b} />
              ))}
            </div>
          )}

          {!product.inStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/60">
              <span className={`badge ${SOLD_OUT_BADGE.className}`}>
                {SOLD_OUT_BADGE.label}
              </span>
            </div>
          )}
        </div>

        {/* 본문 */}
        <div className="flex flex-1 flex-col gap-1 pt-3">
          <h3 className="text-subtitle text-ink group-hover:text-primary">
            {product.name}
          </h3>
          {author && <p className="text-sm text-secondary">{author}</p>}
          <p className="line-clamp-2 text-sm text-secondary">
            {product.summary}
          </p>
          <div className="mt-auto pt-2">
            <Price
              price={product.price}
              compareAtPrice={product.compareAtPrice}
            />
          </div>
        </div>
      </article>
    </Link>
  );
}
