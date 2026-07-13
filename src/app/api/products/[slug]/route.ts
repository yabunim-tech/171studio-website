import { getProductBySlug } from "@/lib/data/products";
import type {
  ProductDetailResponse,
  ApiErrorResponse,
} from "@/types/commerce";

/**
 * GET /api/products/[slug]
 *
 * 단일 상품 상세 조회.
 *
 * 200 응답: ProductDetailResponse { product }
 * 404 응답: ApiErrorResponse { error, slug }
 */
export async function GET(
  _request: Request,
  ctx: RouteContext<"/api/products/[slug]">,
) {
  const { slug } = await ctx.params;
  const product = getProductBySlug(slug);

  if (!product) {
    const error: ApiErrorResponse = {
      error: "Product not found",
      slug,
    };
    return Response.json(error, { status: 404 });
  }

  const body: ProductDetailResponse = { product };
  return Response.json(body);
}
