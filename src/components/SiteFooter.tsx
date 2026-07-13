import Link from "next/link";
import { STORE_INFO } from "@/lib/store-info";

// 사이트 푸터. 매장 정보는 src/lib/store-info.ts 공용 데이터를 사용한다.
export default function SiteFooter() {
  return (
    <footer className="mt-section border-t border-line bg-surface-muted">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 sm:grid-cols-3 sm:px-8">
        <div>
          {/* 브랜드 로고 텍스트 워드마크 (이미지 로고는 header로 이동) */}
          <span className="flex items-baseline gap-1">
            <span className="text-2xl font-bold tracking-tight text-primary">171</span>
            <span className="text-2xl font-bold tracking-tight text-ink">studio</span>
          </span>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-secondary">
            오늘도 당신의 느린 하루를 응원하며 문을 엽니다.
          </p>
        </div>

        <div className="text-sm text-secondary">
          <h4 className="mb-3 text-base font-semibold text-ink">둘러보기</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/products" className="hover:text-ink">
                제품 보기
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-ink">
                소개 · 오시는 길
              </Link>
            </li>
            <li>
              <Link href="/cart" className="hover:text-ink">
                장바구니
              </Link>
            </li>
          </ul>
        </div>

        <div className="text-sm text-secondary">
          <h4 className="mb-3 text-base font-semibold text-ink">찾아오는 길</h4>
          <address className="space-y-2 not-italic">
            <p>{STORE_INFO.address}</p>
            <p>
              전화{" "}
              <a
                href={`tel:${STORE_INFO.phone.replace(/-/g, "")}`}
                className="hover:text-ink"
              >
                {STORE_INFO.phone}
              </a>
            </p>
            {STORE_INFO.hours.map((h) => (
              <p key={h.day}>
                {h.day} {h.time}
              </p>
            ))}
          </address>
        </div>
      </div>
      <div className="border-t border-line py-5 text-center text-xs text-muted">
        © {new Date().getFullYear()} 171studio.
      </div>
    </footer>
  );
}
