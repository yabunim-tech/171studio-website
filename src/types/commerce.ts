/**
 * 171studio 커머스 도메인 타입
 *
 * 이 파일은 프론트엔드(frontend-developer)와 백엔드(API Route)가 공유하는
 * 단일 계약(source of truth)이다. API 응답 shape을 바꿀 때는 이 파일을
 * 먼저 수정하고 frontend-developer에게 알린다.
 *
 * 현재 단계(MVP)는 실 DB 없이 mock 데이터로 동작하지만, 모든 필드는
 * 실제 DB(예: Postgres) 컬럼으로 그대로 옮길 것을 전제로 설계했다.
 */

/* -------------------------------------------------------------------------- */
/* 상품 (Product)                                                              */
/* -------------------------------------------------------------------------- */

/** 상품 카테고리 slug. 실 DB에서는 별도 categories 테이블의 FK가 된다. */
export type CategorySlug =
  | "book" // 도서
  | "stationery" // 문구
  | "goods" // 굿즈
  | "print" // 리소/포스터/프린트
  | "card"; // 엽서·카드

/** 상품에 붙는 배지. 목록/상세에서 라벨 뱃지로 노출한다. */
export type ProductBadge =
  | "best" // 베스트
  | "new" // 신상품
  | "low_stock" // 품절임박
  | "signed" // 사인본
  | "limited"; // 한정판

export interface Category {
  slug: CategorySlug;
  /** 화면 노출용 한글 라벨 */
  label: string;
  /** 이 카테고리에 속한 (판매중) 상품 수. API가 계산해서 채운다. */
  count: number;
}

/**
 * 도서 전용 메타. 도서가 아닌 상품은 생략(undefined)한다.
 * 실 서비스에서 도서 상세(저자/출판사 등)를 노출할 때 재작업을 줄이기 위해
 * MVP 단계부터 선택 필드로 잡아둔다.
 */
export interface BookMeta {
  author?: string;
  publisher?: string;
  /** 페이지 수 */
  pages?: number;
  /** 발행일 (YYYY-MM-DD) */
  publishedAt?: string;
  isbn?: string;
}

export interface Product {
  /** 불변 식별자. DB 이관 시 PK. slug가 바뀌어도 이 값은 유지된다. */
  id: string;
  /** URL 세그먼트로 쓰는 사람이 읽기 좋은 고유 키. /products/[slug] */
  slug: string;
  name: string;

  /** 판매가 (원, KRW). 소수점 없는 정수로 저장한다. */
  price: number;
  /**
   * 정가/할인 전 가격 (원). 할인 중일 때만 존재.
   * price < compareAtPrice 이면 화면에서 할인 표시.
   */
  compareAtPrice: number | null;

  category: CategorySlug;

  /** 이미지 URL 배열. images[0]을 대표(썸네일) 이미지로 사용한다. */
  images: string[];

  /** 목록 카드에 쓰는 한 줄 요약 */
  summary: string;
  /** 상세 페이지 본문 설명 (여러 줄) */
  description: string;

  /** 재고 있음 여부. false면 "품절"로 표시하고 담기 비활성화. */
  inStock: boolean;
  /**
   * 남은 수량(선택). MVP에서는 표시/로직에 필수가 아니지만,
   * "품절임박" 판단 및 향후 재고 차감 로직을 위해 자리를 잡아둔다.
   */
  stockQuantity?: number;

  badges: ProductBadge[];

  /** 메인 페이지 추천 노출 여부 */
  featured: boolean;

  /** 도서일 때만 채워지는 메타 */
  bookMeta?: BookMeta;

  /** 등록일 (ISO 8601). "신상품" 정렬 기준. */
  createdAt: string;
}

/* -------------------------------------------------------------------------- */
/* 장바구니 (Cart) — 클라이언트 로컬 상태 (localStorage)                        */
/* -------------------------------------------------------------------------- */
/*
 * 결제가 범위 밖인 MVP에서는 장바구니를 서버에 영속화할 필요가 없다.
 * 아래 타입은 프론트엔드의 CartContext + localStorage 직렬화에 사용한다.
 * 상세 근거는 _workspace/02_backend-developer_data-model.md 참고.
 */

/**
 * 장바구니 항목. 가격 변동/상품 삭제에 대비해 담는 시점의 스냅샷 일부를
 * 함께 저장한다(name, price, image). productId(=Product.id)로 최신 정보와
 * 재대조할 수 있다.
 */
export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  /** 담는 시점의 단가 (원) */
  price: number;
  /** 대표 이미지 (images[0]) */
  image: string;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  /** 총 수량 합계 */
  totalQuantity: number;
  /** 총 금액 합계 (원) */
  totalPrice: number;
}

/* -------------------------------------------------------------------------- */
/* 주문/결제 (Order / Payment) — 뼈대만 (결제 연동 전이므로 미구현)             */
/* -------------------------------------------------------------------------- */
/*
 * 실제 결제(PG) 연동은 다음 단계 범위다. 여기서는 이후 확장 시 구조를
 * 갈아엎지 않도록 최소 뼈대만 정의한다. 지금 단계에서 이 타입들을
 * 사용하는 API/로직은 없다.
 */

export type OrderStatus =
  | "pending" // 주문 생성됨(결제 전)
  | "paid" // 결제 완료
  | "preparing" // 상품 준비중
  | "shipped" // 배송중
  | "delivered" // 배송완료
  | "cancelled"; // 취소

export type PaymentStatus = "unpaid" | "paid" | "failed" | "refunded";

/** 주문 라인 항목. 주문 시점의 상품 정보를 스냅샷으로 고정한다. */
export interface LineItem {
  productId: string;
  name: string;
  /** 주문 확정 시점의 단가 (원) */
  unitPrice: number;
  quantity: number;
  /** unitPrice * quantity */
  lineTotal: number;
}

export interface Order {
  id: string;
  status: OrderStatus;
  items: LineItem[];
  /** 상품 합계 (원) */
  subtotal: number;
  /** 배송비 (원) */
  shippingFee: number;
  /** 최종 결제 예정/완료 금액 (원) */
  total: number;
  payment: Payment;
  createdAt: string;
}

export interface Payment {
  status: PaymentStatus;
  /** PG 연동 후 채워질 필드들 (지금은 전부 미사용) */
  method?: string; // 예: "card", "kakaopay", "naverpay"
  provider?: string; // PG사 식별자
  transactionId?: string;
  paidAt?: string;
}

/* -------------------------------------------------------------------------- */
/* API 응답 envelope                                                           */
/* -------------------------------------------------------------------------- */

export interface ProductListResponse {
  products: Product[];
  /** 필터 적용 후 결과 개수 */
  total: number;
}

export interface ProductDetailResponse {
  product: Product;
}

export interface CategoryListResponse {
  categories: Category[];
}

export interface ApiErrorResponse {
  error: string;
  [key: string]: unknown;
}
