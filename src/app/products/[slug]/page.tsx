import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllProducts,
  getProductBySlug,
  CATEGORY_LABELS,
} from "@/lib/data/products";
import ProductImage from "@/components/ProductImage";
import Badge from "@/components/Badge";
import Price from "@/components/Price";
import AddToCartButton from "@/components/AddToCartButton";
import { SOLD_OUT_BADGE } from "@/lib/badges";

/** 정적 생성: 모든 상품 slug */
export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "상품을 찾을 수 없어요" };
  return {
    title: product.name,
    description: product.summary,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  // 백엔드 계약: 없는 slug 는 404 (API 는 { error, slug }, 페이지는 not-found)
  if (!product) notFound();

  const book = product.bookMeta;

  return (
    <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8">
      {/* breadcrumb */}
      <nav className="mb-6 text-sm text-secondary">
        <Link href="/products" className="hover:text-ink">
          제품
        </Link>
        <span className="mx-2 text-muted">/</span>
        <Link
          href={`/products?category=${product.category}`}
          className="hover:text-ink"
        >
          {CATEGORY_LABELS[product.category]}
        </Link>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* 이미지 */}
        <div>
          <div className="relative overflow-hidden border border-line">
            <ProductImage
              category={product.category}
              name={product.name}
              className="aspect-square w-full"
              emojiClassName="text-7xl"
            />
            {!product.inStock && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/60">
                <span className={`badge text-base ${SOLD_OUT_BADGE.className}`}>
                  {SOLD_OUT_BADGE.label}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* 정보 */}
        <div>
          {product.badges.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {product.badges.map((b) => (
                <Badge key={b} badge={b} />
              ))}
            </div>
          )}

          <h1 className="text-h1 text-ink">{product.name}</h1>

          {book?.author && (
            <p className="mt-2 text-secondary">
              {book.author}
              {book.publisher ? ` · ${book.publisher}` : ""}
            </p>
          )}

          <div className="mt-4">
            <Price
              price={product.price}
              compareAtPrice={product.compareAtPrice}
              size="lg"
            />
          </div>

          <p className="mt-5 text-base leading-relaxed text-body">
            {product.summary}
          </p>

          {/* 재고 상태 */}
          <p className="mt-4 text-sm font-semibold">
            {product.inStock ? (
              <span className="text-success">● 재고 있음</span>
            ) : (
              <span className="text-primary">● 품절</span>
            )}
          </p>

          {/* 담기 */}
          <div className="mt-6">
            <AddToCartButton product={product} />
          </div>

          {/* 상세 설명 */}
          <div className="mt-8 border-t border-line pt-6">
            <h2 className="text-h3 text-ink">상세 설명</h2>
            <p className="mt-3 whitespace-pre-line leading-relaxed text-body">
              {product.description}
            </p>
          </div>

          {/* 도서 메타 */}
          {book && (
            <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 border border-line bg-surface-muted p-6 text-sm">
              {book.author && (
                <>
                  <dt className="text-muted">저자</dt>
                  <dd className="text-ink">{book.author}</dd>
                </>
              )}
              {book.publisher && (
                <>
                  <dt className="text-muted">출판</dt>
                  <dd className="text-ink">{book.publisher}</dd>
                </>
              )}
              {book.pages && (
                <>
                  <dt className="text-muted">쪽수</dt>
                  <dd className="text-ink">{book.pages}쪽</dd>
                </>
              )}
              {book.publishedAt && (
                <>
                  <dt className="text-muted">발행일</dt>
                  <dd className="text-ink">{book.publishedAt}</dd>
                </>
              )}
              {book.isbn && (
                <>
                  <dt className="text-muted">ISBN</dt>
                  <dd className="text-ink">{book.isbn}</dd>
                </>
              )}
            </dl>
          )}
        </div>
      </div>
    </div>
  );
}
