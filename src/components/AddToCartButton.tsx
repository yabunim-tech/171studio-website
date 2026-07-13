"use client";

import { useState } from "react";
import type { Product } from "@/types/commerce";
import { useCart } from "@/hooks/useCart";

/**
 * 담기 버튼 (상세 페이지용, 수량 선택 포함).
 * 품절(inStock=false)이면 비활성.
 */
export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product.inStock) {
    return (
      <button type="button" className="btn-disabled w-full sm:w-auto" disabled>
        품절된 상품입니다
      </button>
    );
  }

  const handleAdd = () => {
    addItem(product, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      {/* 수량 스텝퍼 */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-secondary">수량</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="stepper-btn"
            aria-label="수량 줄이기"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity <= 1}
          >
            −
          </button>
          <span className="w-8 text-center text-lg font-semibold tabular-nums text-ink">
            {quantity}
          </span>
          <button
            type="button"
            className="stepper-btn"
            aria-label="수량 늘리기"
            onClick={() => setQuantity((q) => q + 1)}
          >
            +
          </button>
        </div>
      </div>

      <button
        type="button"
        className="btn-primary w-full sm:w-auto"
        onClick={handleAdd}
      >
        {added ? "담았어요" : "장바구니에 담기"}
      </button>
    </div>
  );
}
