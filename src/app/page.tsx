import Link from "next/link";
import { queryProducts, getCategories } from "@/lib/data/products";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  const featured = queryProducts({ featured: true }).slice(0, 6);
  const categories = getCategories();

  return (
    <div>
      {/* ── 히어로 ─────────────────────────────────────────────── */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <p className="text-label text-primary">SELECT SHOP</p>
          <h1 className="mt-4 max-w-2xl text-display-lg text-ink sm:text-display-hero">
            읽고 쓰고 곁에 두는
            <br />
            독립서점 171studio
          </h1>
          <p className="mt-6 max-w-xl text-lg text-secondary">
            171studio는 천천히 고른 독립출판물과 문구·굿즈를 큐레이션합니다.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/products" className="btn-primary">
              제품 구경하기
            </Link>
            <Link href="/about" className="btn-secondary">
              브랜드 소개
            </Link>
          </div>
        </div>
      </section>

      {/* ── 카테고리 바로가기 ─────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-5 pt-12 sm:px-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/products?category=${c.slug}`}
              className="chip"
            >
              {c.label}
              <span className="ml-1.5 opacity-60">{c.count}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 대표 상품 (featured) ──────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-5 pt-12 sm:px-8">
        <div className="mb-6 flex items-end justify-between gap-4 border-b border-line pb-4">
          <div>
            <h2 className="text-h1 text-ink">추천 상품</h2>
            <p className="mt-1 text-secondary">요즘 특별히 아끼는 것들.</p>
          </div>
          <Link
            href="/products"
            className="shrink-0 text-base font-semibold text-ink hover:text-primary"
          >
            전체 보기 →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ── 브랜드 인트로 밴드 ────────────────────────────────── */}
      <section className="mt-section bg-surface-muted">
        <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-8">
          <h2 className="text-h1 text-ink">느리지만 밀도있게</h2>
          <p className="mt-4 text-lg leading-relaxed text-secondary">
            우리는 빠르게 스쳐 지나가는 것들 대신, 오래 곁에 두고 싶은 것들을
            고릅니다. 
            <br />
            한 권의 책, 한 장의 엽서에도 만든 사람의 손길이 담기도록.
          </p>
          <Link href="/about" className="btn-secondary mt-8">
            브랜드 이야기 더 보기
          </Link>
        </div>
      </section>
    </div>
  );
}
