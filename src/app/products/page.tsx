import type { Metadata } from "next";
import { queryProducts, getCategories } from "@/lib/data/products";
import type { ProductSort } from "@/lib/data/products";
import ProductCard from "@/components/ProductCard";
import ProductFilters from "@/components/ProductFilters";

export const metadata: Metadata = {
  title: "제품",
  description:
    "171studio가 큐레이션한 독립출판물과 문구·굿즈·프린트·엽서를 만나보세요.",
};

const VALID_SORTS: ProductSort[] = ["latest", "price_asc", "price_desc"];

/** searchParams 는 Next 16 에서 Promise 다. */
export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;

  const category = typeof sp.category === "string" ? sp.category : undefined;
  const q = typeof sp.q === "string" ? sp.q : undefined;
  const rawSort = typeof sp.sort === "string" ? sp.sort : "latest";
  const sort: ProductSort = VALID_SORTS.includes(rawSort as ProductSort)
    ? (rawSort as ProductSort)
    : "latest";

  const categories = getCategories();
  const products = queryProducts({ category, q, sort });

  return (
    <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
      <header className="mb-8">
        <h1 className="text-h1 text-ink">제품</h1>
        <p className="mt-2 text-secondary">
          천천히 고른 책과 물건들. 마음에 드는 것을 담아보세요.
        </p>
      </header>

      <ProductFilters
        categories={categories}
        activeCategory={category}
        activeSort={sort}
      />

      <p className="mt-6 text-sm text-muted">총 {products.length}개의 상품</p>

      {products.length === 0 ? (
        <div className="mt-10 border border-line bg-surface-muted py-20 text-center">
          <p className="text-h3 text-secondary">조건에 맞는 상품이 없어요.</p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
