import { getCategories } from "@/lib/data/products";
import type { CategoryListResponse } from "@/types/commerce";

/**
 * GET /api/categories
 *
 * 카테고리 목록 + 각 카테고리의 상품 수. 목록 페이지 필터 네비게이션에 사용.
 *
 * 200 응답: CategoryListResponse { categories: [{ slug, label, count }] }
 */
export async function GET() {
  const body: CategoryListResponse = {
    categories: getCategories(),
  };
  return Response.json(body);
}
