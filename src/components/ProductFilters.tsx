"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { Category } from "@/types/commerce";

const SORTS: { value: string; label: string }[] = [
  { value: "latest", label: "신상품순" },
  { value: "price_asc", label: "가격 낮은순" },
  { value: "price_desc", label: "가격 높은순" },
];

/**
 * 제품 목록 필터(카테고리 칩 + 정렬).
 * 상태는 URL 쿼리스트링에 둔다 → 서버 컴포넌트(products/page)가 읽어 필터링.
 * (클라이언트는 라우팅만 담당, 데이터 shape 은 백엔드 계약 그대로.)
 */
export default function ProductFilters({
  categories,
  activeCategory,
  activeSort,
}: {
  categories: Category[];
  activeCategory?: string;
  activeSort: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === null) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    const qs = params.toString();
    router.push(qs ? `/products?${qs}` : "/products");
  };

  return (
    <div className="flex flex-col gap-4">
      {/* 카테고리 칩 */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="chip"
          data-active={!activeCategory}
          onClick={() => setParam("category", null)}
        >
          전체
        </button>
        {categories.map((c) => (
          <button
            key={c.slug}
            type="button"
            className="chip"
            data-active={activeCategory === c.slug}
            onClick={() => setParam("category", c.slug)}
          >
            {c.label}
            <span className="ml-1.5 opacity-60">{c.count}</span>
          </button>
        ))}
      </div>

      {/* 정렬 */}
      <div className="flex items-center gap-2">
        <label htmlFor="sort" className="text-sm text-secondary">
          정렬
        </label>
        <select
          id="sort"
          value={activeSort}
          onChange={(e) => setParam("sort", e.target.value)}
          className="field text-sm"
        >
          {SORTS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
