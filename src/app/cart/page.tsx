"use client";

import Link from "next/link";
import ProductImage from "@/components/ProductImage";
import { useCart } from "@/hooks/useCart";
import { formatKRW } from "@/lib/format";
import { getProductBySlug } from "@/lib/data/products";
import type { CategorySlug } from "@/types/commerce";

export default function CartPage() {
  const { cart, updateQuantity, removeItem, clear } = useCart();

  if (cart.items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-24 text-center sm:px-8">
        <h1 className="text-h1 text-ink">장바구니가 비어 있어요</h1>
        <p className="mt-3 text-secondary">
          마음에 드는 책과 물건을 담아보세요.
        </p>
        <Link href="/products" className="btn-primary mt-8">
          제품 구경하러 가기
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8">
      <div className="mb-8 flex items-end justify-between gap-4 border-b border-line pb-4">
        <h1 className="text-h1 text-ink">장바구니</h1>
        <button
          type="button"
          onClick={clear}
          className="text-sm text-muted underline-offset-4 hover:text-primary hover:underline"
        >
          전체 비우기
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
        {/* 목록 */}
        <ul className="divide-y divide-line border-y border-line">
          {cart.items.map((item) => {
            // 카테고리는 스냅샷에 없으므로 최신 상품에서 조회(placeholder 이미지용).
            const category: CategorySlug =
              getProductBySlug(item.slug)?.category ?? "goods";
            return (
              <li key={item.productId} className="flex gap-4 py-5">
                <Link
                  href={`/products/${item.slug}`}
                  className="shrink-0 overflow-hidden border border-line"
                >
                  <ProductImage
                    category={category}
                    name={item.name}
                    className="h-24 w-24"
                    emojiClassName="text-2xl"
                  />
                </Link>

                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <Link
                      href={`/products/${item.slug}`}
                      className="text-subtitle text-ink hover:text-primary"
                    >
                      {item.name}
                    </Link>
                    <button
                      type="button"
                      onClick={() => removeItem(item.productId)}
                      aria-label={`${item.name} 삭제`}
                      className="text-sm text-muted hover:text-primary"
                    >
                      삭제
                    </button>
                  </div>

                  <p className="mt-1 text-sm text-secondary tabular-nums">
                    {formatKRW(item.price)}
                  </p>

                  <div className="mt-auto flex items-center justify-between pt-3">
                    {/* 수량 스텝퍼 */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="stepper-btn"
                        aria-label="수량 줄이기"
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity - 1)
                        }
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-lg font-semibold tabular-nums text-ink">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        className="stepper-btn"
                        aria-label="수량 늘리기"
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>

                    <span className="text-price tabular-nums text-ink">
                      {formatKRW(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {/* 주문 요약 */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="border border-line p-6">
            <h2 className="text-h3 text-ink">주문 요약</h2>
            <dl className="mt-4 space-y-2 text-body">
              <div className="flex justify-between">
                <dt>총 수량</dt>
                <dd className="tabular-nums">{cart.totalQuantity}개</dd>
              </div>
              <div className="flex justify-between">
                <dt>상품 금액</dt>
                <dd className="tabular-nums">{formatKRW(cart.totalPrice)}</dd>
              </div>
            </dl>
            <div className="mt-4 flex items-baseline justify-between border-t border-line pt-4">
              <span className="text-base font-semibold text-ink">합계</span>
              <span className="text-price-lg tabular-nums text-ink">
                {formatKRW(cart.totalPrice)}
              </span>
            </div>

            {/* 결제하기 — 범위 밖(placeholder), 비활성 + 안내 */}
            <button
              type="button"
              className="btn-disabled mt-6 w-full"
              disabled
              title="결제 연동 준비 중입니다"
              aria-disabled="true"
            >
              결제하기
            </button>
            <p className="mt-2 text-center text-xs text-muted">
              결제 연동 준비 중입니다 (다음 단계 범위)
            </p>

            <Link href="/products" className="btn-secondary mt-3 w-full">
              계속 둘러보기
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
