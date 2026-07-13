# 04 · QA 엔지니어 검증 리포트

프로젝트: 171studio 독립서점 홈페이지 (storefront-builder)
검증 방식: 양쪽 동시 읽기 · 통합 정합성 우선
스택: Next.js 16.2.10 (App Router, Turbopack) · React 19.2.4 · Tailwind v4

---

## 검증 #1 — v2(유니클로) 리스킨 전면 검증 (2026-07-12)

대상 모듈: 전 페이지(메인/소개/제품 목록·상세/장바구니/404) + 전 컴포넌트 + API 경계면 + 로고 교체 반영

### ✅ 통과 (7 영역)

| # | 항목 | 결과 | 근거 |
|---|------|------|------|
| 1 | **API–프론트 경계면** | 통과 | 프론트(서버 컴포넌트)는 `@/lib/data/products.ts`의 `queryProducts / getProductBySlug / getCategories / getAllProducts`를 직접 import하고, API Route(`/api/products`·`/api/products/[slug]`·`/api/categories`)도 **같은 함수 + 같은 `@/types/commerce` 타입**을 통해 응답을 만든다. 두 경로가 동일 소스·동일 타입이라 shape 불일치가 구조적으로 발생할 수 없음. `ProductListResponse{products,total}` / `ProductDetailResponse{product}` / `CategoryListResponse{categories}` envelope 일치 확인. |
| 2 | **라우팅** | 통과 | 코드 내 모든 href/Link/router.push(총 20개)를 `src/app/` 실제 page와 대조. `/`,`/products`,`/products?category=`,`/products/[slug]`,`/about`,`/cart`,`tel:` 전부 매칭. 동적 세그먼트 `/products/${slug}`는 `generateStaticParams`로 12개 slug 프리렌더 확인(빌드 로그). 깨진 링크 0. |
| 3 | **디자인 토큰 v2 적용** | 통과 | v1 잔재 전수 grep(`gaegu\|gowun\|wonky\|blob\|tilt\|sticker\|lifted\|paper\|크림\|cream\|terracotta\|테라코타\|sage\|세이지\|pill\|hand-drawn`) → 코드에서 0건(상품 설명문의 "손그림"은 제품 카피이지 디자인 토큰 아님). 스트레이 기본 Tailwind 색(slate/zinc/amber/orange 등) 0건. `gray-*`는 정의된 50/100/300만 사용. globals.css `@theme`가 토큰 JSON(v2)과 일치: canvas #fff, ink #1a1a1a, primary #ed1d24, radius none/2px, 무그림자 기본. 순백/근흑/레드 포인트/하드코너 원칙 전 페이지 일관. |
| 4 | **로고(footer)** | 통과(1건 수정, 아래) | `SiteFooter.tsx`가 `next/image`로 `/brand/171studio-logo.png` 렌더, `alt="171studio"`. 디자인 스펙 §5.7(footer 배치, next/image, alt) 충족. 헤더는 텍스트 워드마크(스펙상 허용). |
| 5 | **장바구니 흐름** | 통과 | `useCart`(모듈 스토어+`useSyncExternalStore`)에 addItem/updateQuantity/removeItem/clear 구현. 상세 `AddToCartButton`→addItem(수량 포함), 장바구니 페이지 스텝퍼→updateQuantity(0 이하 시 자동 삭제), 삭제 버튼→removeItem, 전체 비우기→clear 모두 실제 연결. "결제하기"는 `btn-disabled`+`disabled`+`aria-disabled`+"결제 연동 준비 중" 안내 문구로 처리(스펙 §122 준수). 품절 상품은 담기 버튼 비활성. |
| 6 | **반응형** | 통과 | 전 페이지 `sm:`/`md:`/`lg:` 분기 사용. 그리드: 메인 2→3열, 목록 2→3→4열, 상세 1→2열, 장바구니 1→`[1fr_20rem]`. body `flex min-h-full flex-col`로 sticky footer. 가로 스크롤 유발 요소 없음. |
| 7 | **프로덕션 빌드** | 통과 | `npm run build` 성공 — Compiled 성공, TypeScript 통과, 정적 21/21 생성. 로고 props 수정 후 재빌드도 통과. |

### 🔧 수정함 (1건)

**[DEFECT-01] footer 로고 `next/image` intrinsic 종횡비 불일치**
- 파일: `src/components/SiteFooter.tsx:15-22`
- 문제: 실제 로고 에셋은 **800×168 (4.76:1)** 인데(방금 투명 배경으로 재처리되며 크기 변경됨), `next/image`에 선언된 `width={180} height={48}` 은 3.75:1 — 선언 종횡비와 실제 에셋 종횡비가 어긋나 `next/image`가 예약하는 레이아웃 박스가 실제 렌더 비율과 불일치(잠재적 CLS/여백 오차).
- 수정: `width={800} height={168}` 로 실제 에셋 비율에 맞춤. 표시 크기는 기존 `className="h-12 w-auto"` 가 그대로 제어(높이 48px, 폭 자동) — 시각적 크기는 동일하되 예약 박스가 정확해짐.
- 확인: 수정 후 `npm run build` 재통과.

### ⚠️ 미검증 / 관찰 노트 (결함 아님 · 리더 판단용)

1. **API Route가 UI에서 미소비(의도된 설계)** — 프론트는 SSR HTTP 왕복을 피하려 데이터 레이어를 직접 import한다. API Route는 외부/향후 클라이언트용 병렬 경로로 남아 있으며, UI 관점에선 미사용이지만 타입·소스가 공유되므로 결함 아님. 향후 클라이언트 fetch 도입 시 `fetchJson<T>` 계약이 이미 타입으로 보장됨.
2. **매장 정적 정보가 예시(placeholder) 값** — `about/page.tsx`의 `STORE_INFO`, `SiteFooter.tsx` 주소/전화가 "(예시)"로 명시 렌더됨. 빈 플레이스홀더가 아니라 실제 텍스트가 렌더되며 코드에 `TODO(실제 정보로 교체)`로 명시. MVP 데모 범위상 허용이나 **런칭 전 실제 정보 교체 필요**(두 곳 동시 갱신). 소개 페이지 약도도 이미지 placeholder 상태(지도 임베드 예정).
3. **헤더 내비 폭(모바일 375px)** — 로고+홈/제품/소개/장바구니 4항목이 375px에서 다소 타이트(추정 여유 ~15px). 현재 폰트/패딩으로는 넘치지 않으나, 라벨이 길어지면 취약. 즉시 조치 불필요, 관찰만.
4. **`getServerSnapshot`→EMPTY_CART** — 장바구니 뱃지가 서버에서 0, 클라 hydrate 후 값 반영. 하이드레이션 미스매치 회피용 올바른 패턴.

### 최종 판정
- 통과 7 / 수정 1 / 블로킹 결함 0
- **빌드 상태: 통과 (21/21 정적 생성, TS 통과)**
- v2 리스킨 정합성: 전 페이지 일관 적용 확인, v1 잔재 0.
