import type { Metadata } from "next";
import Link from "next/link";
import { STORE_INFO } from "@/lib/store-info";

export const metadata: Metadata = {
  title: "소개 · 오시는 길",
  description:
    "171studio 브랜드 이야기와 오시는 길, 영업시간, 연락처를 안내합니다.",
};

// 매장 정보는 src/lib/store-info.ts 에서 관리한다 (footer와 공유 — 한 곳만 고치면 됨).

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
      {/* 헤더 */}
      <header>
        <p className="text-label text-primary">ABOUT</p>
        <h1 className="mt-3 text-display-lg text-ink">171studio 이야기</h1>
        <p className="mt-3 text-lg text-secondary">
          작은 골목 끝, 종이 냄새가 나는 셀렉트숍입니다.
        </p>
      </header>

      {/* 브랜드 스토리 */}
      <section className="mt-12 border-t border-line pt-10">
        <h2 className="text-h2 text-ink">우리의 이야기</h2>
        {/* TODO: 실제 브랜드 스토리로 교체 */}
        <div className="mt-4 space-y-4 text-base leading-relaxed text-body">
          <p>
            171studio는 &lsquo;좋아하는 것을 오래 곁에 두고 싶다&rsquo;는 작은
            마음에서 시작한 독립서점이자 작업실입니다.
            <br />
            빠르게 소비되고 잊히는 것들 대신, 만든 사람의 손길이 느껴지는 책과
            물건을 골라 소개합니다.
          </p>
          <p>
            직접 만든 독립출판물부터 동네 창작자들의 문구·굿즈까지, 공간 안의
            모든 것에는 저마다의 이야기가 담겨 있습니다.
            <br />
            완벽하지 않아도 더 사람 냄새 나는 공간을 지향합니다.
          </p>
          <p>
            오늘도 171studio는 당신의 느린 하루를 응원하며 문을 엽니다.
          </p>
        </div>
      </section>

      {/* 오시는 길 / 영업시간 / 연락처 */}
      <section className="mt-12 grid gap-px border border-line bg-line md:grid-cols-2">
        {/* 오시는 길 + 약도 */}
        <div className="bg-canvas p-7">
          <h2 className="text-h3 text-ink">오시는 길</h2>
          <address className="mt-4 space-y-1.5 not-italic text-secondary">
            <p className="text-lg text-ink">{STORE_INFO.address}</p>
            <p className="text-sm">{STORE_INFO.addressDetail}</p>
          </address>

          {/* 약도 placeholder — TODO: 실제 지도 임베드(카카오/네이버 지도)로 교체 */}
          <div className="mt-5 flex aspect-video items-center justify-center border border-line bg-surface-muted text-center">
            <div className="text-muted">
              <span className="text-sm">약도 이미지 자리</span>
              <span className="mt-1 block text-xs">
                (지도 임베드로 교체 예정)
              </span>
            </div>
          </div>
        </div>

        {/* 영업시간 + 연락처 */}
        <div className="flex flex-col gap-px bg-line">
          <div className="bg-canvas p-7">
            <h2 className="text-h3 text-ink">영업시간</h2>
            <ul className="mt-4 space-y-2 text-body">
              {STORE_INFO.hours.map((h) => (
                <li
                  key={h.day}
                  className="flex items-center justify-between border-b border-line pb-2 last:border-none"
                >
                  <span className="text-ink">{h.day}</span>
                  <span className="tabular-nums">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-canvas p-7">
            <h2 className="text-h3 text-ink">연락처</h2>
            <div className="mt-4 space-y-2 text-body">
              <p>
                전화{" "}
                <a
                  href={`tel:${STORE_INFO.phone.replace(/-/g, "")}`}
                  className="font-semibold text-primary hover:text-primary-hover"
                >
                  {STORE_INFO.phone}
                </a>
              </p>
              <p>인스타그램 {STORE_INFO.instagram}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="mt-12">
        <Link href="/products" className="btn-primary">
          제품 구경하러 가기
        </Link>
      </div>
    </div>
  );
}
