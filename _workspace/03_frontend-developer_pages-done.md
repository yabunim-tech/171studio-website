# 03. Frontend — 구현 완료 목록 (171studio)

> **최신: v2 리스킨(유니클로 스타일) 완료 — 아래 "## v2 리스킨 완료" 섹션 참조.**
> 이 위쪽 v1 기록은 이력 보존을 위해 그대로 남겨둔다(구조·로직 설명은 v2에도 유효).

작성: frontend-developer / 대상: qa-engineer(검증), 팀 리더

디자인 토큰(`01_ui-designer_*`)과 데이터 계약(`02_backend-developer_data-model.md`,
`src/types/commerce.ts`)을 그대로 사용해 구현. 스택: Next.js 16 App Router +
Tailwind v4(CSS `@theme`) + TypeScript.

## 디자인 토큰 반영
- `src/app/globals.css` — `tailwind-tokens.json`을 Tailwind v4 `@theme`로 병합.
  색/폰트/타이포/여백/**불규칙 radius**/**웜 잉크 그림자**/미세 회전(`--tilt-*`) 전부 토큰화.
  손그림 정체성 컴포넌트 클래스(`.btn-primary/secondary/disabled`, `.badge`,
  `.wonky-card(+hover)`, `.chip`, `.highlight`, `.stepper-btn`)는 값을 토큰(var)만 참조 →
  톤 조정은 `@theme` 한 곳에서.
- `src/app/layout.tsx` — Gaegu/Gowun Dodum/Gowun Batang 3종을 `next/font/google`로
  로드, CSS 변수(`--font-gaegu/-gowun-dodum/-gowun-batang`)로 폰트 토큰과 연결.
  전역 헤더/푸터 배치.

## 페이지
| 페이지 | 경로 | 상태 | 비고 |
|--------|------|------|------|
| 메인 | `src/app/page.tsx` | ✅ | 히어로 + 카테고리 바로가기 + 대표상품(featured) + 브랜드 인트로 밴드 |
| 소개 | `src/app/about/page.tsx` | ✅ | 브랜드 스토리 + 오시는 길/약도(placeholder) + 영업시간 + 연락처. **STORE_INFO 객체 = 예시값(TODO 주석)** |
| 제품 목록 | `src/app/products/page.tsx` | ✅ | 서버에서 `queryProducts` 필터·정렬. 카테고리 칩+정렬은 URL 쿼리(`ProductFilters`) |
| 제품 상세 | `src/app/products/[slug]/page.tsx` | ✅ | `getProductBySlug`, 없으면 `notFound()`. `generateStaticParams`/`generateMetadata`. 도서 메타 노출 |
| 장바구니 | `src/app/cart/page.tsx` | ✅ | `useCart` 훅. 담기/수량조절/삭제/비우기. 결제하기=비활성+“결제 연동 준비 중” 안내 |
| 404 | `src/app/not-found.tsx` | ✅ | 손그림 무드 not-found |

## 컴포넌트 / 훅 / 유틸
- `src/hooks/useCart.ts` — 장바구니 로컬 상태(localStorage) 캡슐화. 모듈 스토어 +
  `useSyncExternalStore`로 헤더/카트 페이지 실시간 동기화, 다른 탭 `storage` 이벤트 반영.
  담는 시점 name/price/image 스냅샷 저장(계약 §4). **결제 붙일 때 이 파일 내부만 교체하면 됨.**
- `src/components/`: `SiteHeader`(카트 뱃지), `SiteFooter`, `ProductCard`, `Badge`,
  `Price`, `ProductImage`(카테고리별 placeholder — 실 에셋 준비 시 next/image로 교체),
  `AddToCartButton`, `ProductFilters`.
- `src/lib/format.ts`(원화 표기), `src/lib/badges.ts`(배지 라벨/색 매핑 — 계약 §2 라벨 준수).

## 데이터 계약 준수
- 목록/상세/메인은 서버 컴포넌트에서 `src/lib/data/products.ts` 헬퍼 직접 import
  (계약 §3 참고: API와 동일 shape, 네트워크 왕복 없음). API Route는 그대로 열려 있음.
- `Product`/`CartItem`/`Cart`/`CategorySlug`/`ProductBadge` 타입은 `src/types/commerce.ts` 그대로 사용.

## 상품 이미지
- 데이터의 `/images/products/*.svg`는 아직 없는 경로 → `ProductImage`가 카테고리별
  손그림 무드 placeholder(그라데이션+이모지+상품명) 렌더. 실 에셋을 `public/images/products/`에
  넣고 컴포넌트를 `next/image`로 교체하면 됨.

## 반응형
- 모바일 우선. 카드 그리드 2→3→4열, 히어로/상세 1→2열, 카트 요약 sticker aside 등.

## 빌드
- `npm run build` 결과: (아래 최종 반환 참조)

## 남은 이슈 / 인계
- 실제 매장 정보(주소/전화/영업시간)·지도 임베드·브랜드 스토리 교체 필요(placeholder, TODO 표기).
- 상품 실이미지 교체 필요.
- 결제 연동은 범위 밖(placeholder).

---

# v2 리스킨 완료 (유니클로 스타일 전면 교체)

작업일 2026-07-11 · 근거: `01_ui-designer_design-system.md` v2 §7 인계 메모 + `01_ui-designer_tailwind-tokens.json` v2.
**페이지 구조·라우팅·데이터 fetching·`useCart` 로직은 전부 그대로 유지 — 시각 스타일만 전면 교체.**
페이지/컴포넌트 파일 목록·데이터 계약·반응형 브레이크포인트는 위 v1 기록과 동일하다(변경 없음).

## 무엇을 바꿨나

### 디자인 토큰 (`src/app/globals.css`)
- v1 `@theme`(크림 paper/테라코타 primary/세이지 secondary/버터 accent, wonky-radius, blob, pill, tilt, soft/card/lifted/sticker 웜 그림자)를 **전량 삭제**하고 v2 토큰으로 재작성.
- 색: `canvas #fff` / `surface-muted #f5f5f5` / `ink #1a1a1a` / `body #333` / `secondary #666` / `muted #999` / **`primary #ed1d24`(+hover #c8161c) — 유일한 포인트색** / `success #1a8917` / `line #e0e0e0` / `gray-50~300`.
- 폰트: `--font-sans = var(--font-inter), var(--font-noto-kr), …`. font-display/body/serif 삭제, `font-sans` 단일.
- 타이포 스케일: label(11/700 대문자+자간)·subtitle(16/600)·h1(28/700)·h2·h3·display-lg(36)·display-hero(48)·**price(18/700)·price-lg(24/700)**. 본문 xs12/sm13/base14/lg16.
- radius: `none 0px`(기본) / `sm 2px`(버튼·인풋·칩만) / `full`. wonky/blob/pill(카드·배지용) 폐기.
- shadow: 기본 없음. border/subtle/floating/modal만 남김(떠 있는 UI용). 웜 잉크 그림자 전부 삭제.
- 컴포넌트 클래스 재작성: `.btn-primary`(레드), `.btn-secondary`(아웃라인→hover 반전), `.btn-dark`, `.btn-disabled`(gray-100/muted), `.badge`(radius0·대문자·자간), `.chip`(선택 시 ink 반전), `.stepper-btn`(정사각), `.field`(인풋). 값은 전부 v2 토큰 var 참조.

### 폰트 (`src/app/layout.tsx`)
- `Gaegu / Gowun_Dodum / Gowun_Batang` 제거 → **`Inter` + `Noto_Sans_KR`** 로드(`next/font/google`, weight 400/600/700), `--font-inter`·`--font-noto-kr` 주입. body를 `bg-canvas text-body`로.

### 컴포넌트
- `SiteHeader`: 순백 헤더 + 하단 보더, 텍스트 워드마크(레드 171 + 근흑 studio), 카트 배지 레드. tilt/wonky/blur 제거.
- **`SiteFooter`: `next/image`로 `public/brand/171studio-logo.png` 로고 추가**(`h-12 w-auto`, `alt="171studio"`), 배경 `surface-muted`. 기존 텍스트 로고 제거.
- `ProductCard`: border/그림자 제거, radius0, 이미지 3:4, 배지 좌상단(radius0), hover 시 이동/그림자 없이 상품명만 레드로.
- `Badge`/`badges.ts`: tilt 제거. 세일·품절임박·한정판=레드, 그 외(신상품·베스트·사인본)=근흑. 품절 배지=gray-100/muted 취소선.
- `Price`: 헤드라인급으로 격상 — `text-price`(18/700)·`text-price-lg`(24/700), tabular-nums, 세일 시 세일가 레드+정가 muted 취소선.
- `ProductImage`: 크림 그라데이션+컬러 이모지 → 중립 `surface-muted` 박스 + 저채도(grayscale/opacity) 아이콘 + 상품명 muted.
- `AddToCartButton`·`ProductFilters`: font-display/wonky 제거, `.field`·tabular-nums 적용.

### 페이지 (구조 동일, 클래스만 교체)
- 메인: blob/highlight/tilt/이모지 히어로 패널 제거 → "SELECT SHOP" 레이블 + 대형 헤드라인 + 레드/아웃라인 CTA. featured 그리드 gutter 구분, 인트로 밴드는 surface-muted.
- 소개: wonky 카드·shadow 제거 → 보더 구분 그리드(`gap-px bg-line`)로 평면화. 전화 링크 레드.
- 제품 목록/상세: wonky·warm shadow 제거, 배지/가격 v2, 상세 재고 표시 success/primary, 도서 메타 dl은 surface-muted.
- 장바구니: 카드 리스트 → `divide-y` 평면 리스트, 합계 price-lg, 결제하기=btn-disabled + "결제 연동 준비 중" 안내(동작 placeholder 유지).
- 404: 이모지 제거 → "404" 레이블 + display-lg.

## 빌드 & 검증
- `npm run build` (Next 16.2.10 / Turbopack): **성공** — 컴파일 OK, TypeScript OK, 정적 페이지 21개 생성 완료.
- 실행 중인 dev 프리뷰(:3000)에서 메인/제품그리드/장바구니 육안 확인: 순백 캔버스·근흑 텍스트·레드 포인트·하드 코너·무그림자 정상 적용, **footer 로고 이미지 정상 렌더** 확인.

## qa-engineer 인계 포인트
- 데이터 계약(`src/types/commerce.ts`, 엔드포인트 shape)·`useCart`는 미변경 — 경계면 회귀 없음 예상.
- 확인 요청: v1 잔재 클래스(wonky/blob/tilt/font-display/paper/sale 등) 잔존 여부 grep, 레드가 한 화면에서 과다 사용되지 않는지(배급 원칙), 모바일 2열 그리드/장바구니 요약 sticky 동작.
