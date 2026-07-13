import type { NextRequest } from "next/server";
import { queryProducts, type ProductSort } from "@/lib/data/products";
import type { ProductListResponse } from "@/types/commerce";

/**
 * GET /api/products
 *
 * 상품 목록 조회. 쿼리 파라미터로 필터/정렬한다.
 *
 * Query:
 *   - category : CategorySlug (book | stationery | goods | print | card)
 *   - badge    : ProductBadge (best | new | low_stock | signed | limited)
 *   - featured : "true" 이면 메인 추천 상품만
 *   - q        : 이름/요약 검색어
 *   - sort     : latest(기본) | price_asc | price_desc
 *
 * 200 응답: ProductListResponse { products, total }
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const sortParam = searchParams.get("sort");
  const sort: ProductSort | undefined =
    sortParam === "price_asc" ||
    sortParam === "price_desc" ||
    sortParam === "latest"
      ? sortParam
      : undefined;

  const products = queryProducts({
    category: searchParams.get("category") ?? undefined,
    badge: searchParams.get("badge") ?? undefined,
    featured: searchParams.get("featured") === "true" ? true : undefined,
    q: searchParams.get("q") ?? undefined,
    sort,
  });

  const body: ProductListResponse = {
    products,
    total: products.length,
  };

  return Response.json(body);
}
