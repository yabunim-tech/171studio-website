# 02. Backend — 데이터 모델 & API 명세 (171studio)

작성: backend-developer / 대상: frontend-developer(주 소비자), qa-engineer(검증)

이 문서는 상품 데이터 모델, API 엔드포인트 계약(요청/응답 shape), 장바구니 상태
처리 방식과 그 근거를 정의한다. **API 응답 shape의 단일 출처(source of truth)는
`src/types/commerce.ts`이며, 이 문서는 그 계약을 설명한다.** shape을 바꿀 때는
타입 파일을 먼저 고치고 frontend-developer에게 알린다(경계면 불일치는 QA 최다 결함).

---

## 0. 실 데이터 접근 관련 고지

네이버 스마트스토어(`smartstore.naver.com/onesevenonestudio`)는 이 환경에서
**접근이 차단되어(WebFetch 실패) 실 상품 데이터를 가져오지 못했다.** 따라서 상품
데이터는 "독립서점" 업종에 맞는 **합리적 샘플 데이터**로 구성했다.
- 카테고리 구성: 도서 / 문구 / 굿즈 / 프린트 / 엽서·카드 (국내 독립서점 일반 구성 참고)
- 가격대: 3,000원 ~ 22,000원
- 실 데이터 확보 시 `src/lib/data/products.ts`의 배열만 교체하면 되고, **타입과 API
  계약은 그대로 유지**되도록 설계했다.

---

## 1. 파일 구조

| 경로 | 역할 |
|------|------|
| `src/types/commerce.ts` | 공유 타입(계약). Product, Cart, Order 등 |
| `src/lib/data/products.ts` | mock 상품 데이터 + 조회/필터 헬퍼 |
| `src/app/api/products/route.ts` | 상품 목록 API |
| `src/app/api/products/[slug]/route.ts` | 상품 상세 API |
| `src/app/api/categories/route.ts` | 카테고리 목록 API |

> 상품 이미지는 아직 준비 전이라 `/images/products/*.svg` 플레이스홀더 경로를 쓴다.
> 실제 에셋은 ui-designer / frontend-developer가 `public/images/products/`에 넣고
> 데이터의 `images` 경로와 맞춘다.

---

## 2. 데이터 모델

### Product

| 필드 | 타입 | 설명 |
|------|------|------|
| `id` | string | 불변 식별자. DB 이관 시 PK. slug가 바뀌어도 유지 |
| `slug` | string | URL 세그먼트. `/products/[slug]`, API 상세 조회 키 |
| `name` | string | 상품명 |
| `price` | number | 판매가(원, 정수) |
| `compareAtPrice` | number \| null | 정가/할인 전 가격. `price < compareAtPrice`면 할인 표시 |
| `category` | CategorySlug | `book`\|`stationery`\|`goods`\|`print`\|`card` |
| `images` | string[] | 이미지 URL 배열. `images[0]`이 대표(썸네일) |
| `summary` | string | 목록 카드용 한 줄 요약 |
| `description` | string | 상세 본문 설명(여러 줄) |
| `inStock` | boolean | false면 "품절" 표시 + 담기 비활성화 |
| `stockQuantity?` | number | 남은 수량(선택). 품절임박 판단/향후 재고 차감용 |
| `badges` | ProductBadge[] | `best`\|`new`\|`low_stock`\|`signed`\|`limited` |
| `featured` | boolean | 메인 페이지 추천 노출 여부 |
| `bookMeta?` | BookMeta | 도서일 때만. author/publisher/pages/publishedAt/isbn |
| `createdAt` | string | ISO 8601. "신상품(latest)" 정렬 기준 |

**라벨 매핑**(한글 노출용)은 `CATEGORY_LABELS`, `badge`는 프론트에서 다음과 같이
매핑 권장: best→"베스트", new→"신상품", low_stock→"품절임박", signed→"사인본",
limited→"한정판". (라벨 매핑을 백엔드로 옮겨야 하면 알려달라.)

### Category
`{ slug: CategorySlug, label: string, count: number }` — count는 판매 상품 수(API가 계산).

---

## 3. API 명세

모든 응답은 `Content-Type: application/json`. 성공 응답은 **envelope로 감싼다**
(향후 pagination/meta 확장 시 프론트를 깨지 않기 위함).

### 3-1. GET `/api/products` — 상품 목록

쿼리 파라미터 (모두 선택):

| param | 값 | 의미 |
|-------|----|----|
| `category` | CategorySlug | 카테고리 필터 |
| `badge` | ProductBadge | 배지 필터 |
| `featured` | `true` | 추천 상품만 |
| `q` | string | 이름/요약 부분 검색 |
| `sort` | `latest`(기본) \| `price_asc` \| `price_desc` | 정렬 |

**200 응답** (`ProductListResponse`):
```json
{
  "products": [
    {
      "id": "prd_0001",
      "slug": "slow-days-essay",
      "name": "느린 날들 — 에세이집",
      "price": 15000,
      "compareAtPrice": null,
      "category": "book",
      "images": ["/images/products/slow-days-1.svg", "/images/products/slow-days-2.svg"],
      "summary": "천천히 흘러가는 하루를 담은 독립출판 에세이.",
      "description": "도시의 속도에서 한 발짝 물러나 ...",
      "inStock": true,
      "stockQuantity": 24,
      "badges": ["best"],
      "featured": true,
      "bookMeta": {
        "author": "김서연", "publisher": "171studio",
        "pages": 168, "publishedAt": "2025-11-20", "isbn": "9791198000011"
      },
      "createdAt": "2025-11-20T00:00:00.000Z"
    }
  ],
  "total": 1
}
```
> `total`은 **필터 적용 후 결과 개수**다. (현재 pagination 없음 → products.length와 동일)
> 유효하지 않은 category/badge 값은 오류가 아니라 **빈 배열**을 반환한다.

### 3-2. GET `/api/products/[slug]` — 상품 상세

**200 응답** (`ProductDetailResponse`): `{ "product": { ...Product } }`

**404 응답** (`ApiErrorResponse`):
```json
{ "error": "Product not found", "slug": "nope" }
```

### 3-3. GET `/api/categories` — 카테고리 목록

**200 응답** (`CategoryListResponse`):
```json
{
  "categories": [
    { "slug": "book", "label": "도서", "count": 3 },
    { "slug": "stationery", "label": "문구", "count": 2 },
    { "slug": "goods", "label": "굿즈", "count": 3 },
    { "slug": "print", "label": "프린트", "count": 2 },
    { "slug": "card", "label": "엽서·카드", "count": 2 }
  ]
}
```

> **참고(프론트 구현 선택지):** 목록/상세/메인 페이지는 서버 컴포넌트에서 위 API를
> fetch 해도 되고, mock이 정적이므로 `src/lib/data/products.ts`의 헬퍼
> (`getAllProducts`, `getProductBySlug`, `queryProducts`, `getCategories`)를 서버
> 컴포넌트에서 **직접 import** 해도 된다(네트워크 왕복 없음). API Route는 클라이언트
> 컴포넌트/검색·필터 인터랙션용으로 열어둔 것이다. 둘 다 동일한 shape을 반환한다.

---

## 4. 장바구니 상태 처리 방식 — 결정: **클라이언트 로컬 상태(localStorage)**

### 결정
장바구니는 **서버 API 없이 프론트엔드의 클라이언트 상태 + `localStorage`로 처리**한다.
서버 세션/DB 저장을 하지 않는다.

### 근거
1. **이번 MVP는 결제가 범위 밖**이다. 장바구니는 결제 직전까지의 임시 사용자 상태일
   뿐이라 서버 영속화가 필요 없다.
2. **로그인/인증이 없다.** 서버에 저장해도 사용자를 식별할 키가 없어 익명 세션을
   따로 만들어야 하는데, 이는 MVP 대비 과잉 설계다.
3. `localStorage`는 새로고침·재방문 간 장바구니 유지라는 사용자 기대를 충족한다.
4. 결제 연동 단계에서 "결제하기" 클릭 시점에 로컬 `Cart` → 서버 `Order`(아래 5번
   뼈대)로 변환해 넘기면 되므로, **지금 로컬로 가도 나중에 갈아엎지 않는다.**

### 프론트가 쓸 타입 (이미 정의됨, `src/types/commerce.ts`)
```ts
interface CartItem {
  productId: string;  // = Product.id
  slug: string;
  name: string;
  price: number;      // 담는 시점 단가 스냅샷
  image: string;      // images[0]
  quantity: number;
}
interface Cart {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}
```

### 프론트 구현 가이드(권장)
- `CartContext`(React Context) + `useReducer`로 담기/수량변경/삭제/비우기 관리.
- 변경 시마다 `localStorage`(키 예: `"171studio.cart"`)에 직렬화, 초기 마운트 시 복원.
- 담는 시점에 `name/price/image` **스냅샷을 함께 저장**한다(상품이 나중에 삭제·가격
  변동돼도 장바구니가 깨지지 않도록). `productId`로 최신 상품과 재대조 가능.
- "결제하기" 버튼은 **UI만, 동작은 placeholder/비활성**(브리프 범위 밖).

> 만약 frontend-developer가 서버 장바구니 API가 필요하다고 판단하면(예: 다중 기기
> 동기화 요구) 알려달라 — `POST/GET/PATCH /api/cart`를 추가할 수 있다. 현재 근거로는
> 불필요하다고 본다.

---

## 5. 주문/결제(Order/Payment) — 뼈대만 (미구현)

결제(PG) 연동은 다음 단계 범위다. 이후 구조를 갈아엎지 않도록 `src/types/commerce.ts`에
**타입 뼈대만** 정의해 두었고, 지금 이를 사용하는 API/로직은 **없다**.
- `Order` { id, status(OrderStatus), items(LineItem[]), subtotal, shippingFee, total, payment, createdAt }
- `LineItem` { productId, name, unitPrice, quantity, lineTotal } — 주문 시점 스냅샷
- `Payment` { status(PaymentStatus), method?, provider?, transactionId?, paidAt? }

결제 연동 시: 로컬 `Cart.items` → `LineItem[]`로 매핑 → `POST /api/orders`로 `Order`
생성 → PG 결제 → webhook으로 `Payment`/`OrderStatus` 갱신. 이 흐름에 맞는 필드를
미리 잡아둔 것이다.

---

## 6. 검증 상태 (qa-engineer 참고)

- `npx tsc --noEmit` 통과 (Next 16 `RouteContext` 타입 위해 `next typegen` 선행 필요).
- 실제 dev 서버로 전 엔드포인트 curl 확인 완료:
  - `GET /api/categories` → 5개 카테고리 + count 정상
  - `GET /api/products?category=book&sort=price_asc` → 도서 3개 가격 오름차순
  - `GET /api/products?featured=true` → 추천 6개
  - `GET /api/products/slow-days-essay` → 단일 product
  - `GET /api/products/nope` → HTTP 404 + `{ error, slug }`
