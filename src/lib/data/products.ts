import type {
  Product,
  Category,
  CategorySlug,
} from "@/types/commerce";

/**
 * 171studio 상품 mock 데이터
 *
 * 주의: 네이버 스마트스토어(onesevenonestudio) 실 데이터 접근이 이 환경에서
 * 차단되어(WebFetch 실패), "독립서점" 업종에 맞는 합리적 샘플 데이터로 구성했다.
 * 카테고리 구성(도서/문구/굿즈/프린트/카드)과 가격대(3,000~28,000원)는
 * 국내 독립서점의 일반적 상품 구성을 참고했다. 실 데이터 확보 시 이 파일만
 * 교체하면 되며, API/타입 계약은 그대로 유지된다.
 *
 * 이미지는 아직 준비 전이므로 플레이스홀더 경로(/images/products/*.svg)를 쓴다.
 * ui-designer / frontend-developer가 실제 에셋으로 교체한다.
 */

export const CATEGORY_LABELS: Record<CategorySlug, string> = {
  book: "도서",
  stationery: "문구",
  goods: "굿즈",
  print: "프린트",
  card: "엽서·카드",
};

/** 카테고리 노출 순서 */
export const CATEGORY_ORDER: CategorySlug[] = [
  "book",
  "stationery",
  "goods",
  "print",
  "card",
];

const ph = (name: string) => `/images/products/${name}.svg`;

export const products: Product[] = [
  {
    id: "prd_0001",
    slug: "slow-days-essay",
    name: "느린 날들 — 에세이집",
    price: 15000,
    compareAtPrice: null,
    category: "book",
    images: [ph("slow-days-1"), ph("slow-days-2")],
    summary: "천천히 흘러가는 하루를 담은 독립출판 에세이.",
    description:
      "도시의 속도에서 한 발짝 물러나 자신만의 리듬을 찾아가는 이야기들을 모았습니다. 171studio가 처음으로 소개하는 독립출판 에세이집으로, 잔잔한 손그림 삽화가 함께 실려 있습니다.",
    inStock: true,
    stockQuantity: 24,
    badges: ["best"],
    featured: true,
    bookMeta: {
      author: "김서연",
      publisher: "171studio",
      pages: 168,
      publishedAt: "2025-11-20",
      isbn: "9791198000011",
    },
    createdAt: "2025-11-20T00:00:00.000Z",
  },
  {
    id: "prd_0002",
    slug: "city-of-small-shops",
    name: "작은 가게들의 도시",
    price: 18000,
    compareAtPrice: 20000,
    category: "book",
    images: [ph("small-shops-1")],
    summary: "동네 작은 가게들을 기록한 로컬 인터뷰집.",
    description:
      "오래된 골목의 작은 가게 주인들을 인터뷰하고 사진과 함께 엮은 로컬 다큐멘터리 도서입니다. 사라져가는 동네 풍경을 천천히 들여다봅니다.",
    inStock: true,
    stockQuantity: 12,
    badges: ["signed"],
    featured: true,
    bookMeta: {
      author: "이도현",
      publisher: "골목출판",
      pages: 224,
      publishedAt: "2025-09-05",
      isbn: "9791198000028",
    },
    createdAt: "2025-09-05T00:00:00.000Z",
  },
  {
    id: "prd_0003",
    slug: "midnight-poems",
    name: "자정의 시 — 시집",
    price: 12000,
    compareAtPrice: null,
    category: "book",
    images: [ph("midnight-poems-1")],
    summary: "밤에 읽기 좋은 짧은 시 48편.",
    description:
      "하루를 마무리하는 늦은 밤에 어울리는 짧은 시들을 모은 독립출판 시집입니다. 얇고 가벼워 잠들기 전 머리맡에 두기 좋습니다.",
    inStock: true,
    stockQuantity: 7,
    badges: ["low_stock"],
    featured: false,
    bookMeta: {
      author: "박하늘",
      publisher: "171studio",
      pages: 96,
      publishedAt: "2026-01-15",
      isbn: "9791198000035",
    },
    createdAt: "2026-01-15T00:00:00.000Z",
  },
  {
    id: "prd_0004",
    slug: "reading-journal-notebook",
    name: "독서 기록 노트",
    price: 13000,
    compareAtPrice: null,
    category: "stationery",
    images: [ph("reading-journal-1"), ph("reading-journal-2")],
    summary: "읽은 책을 기록하는 손그림 표지 노트.",
    description:
      "제목, 인상 깊은 문장, 별점을 적어 나만의 독서 기록을 남길 수 있는 노트입니다. 171studio 손그림 표지에 100매 내지로 제작했습니다.",
    inStock: true,
    stockQuantity: 40,
    badges: ["new"],
    featured: true,
    createdAt: "2026-02-01T00:00:00.000Z",
  },
  {
    id: "prd_0005",
    slug: "book-lover-pen",
    name: "책방 볼펜 (3종 세트)",
    price: 6500,
    compareAtPrice: null,
    category: "stationery",
    images: [ph("book-pen-1")],
    summary: "부드럽게 써지는 0.5mm 검정 볼펜 3종.",
    description:
      "책방에서 메모하기 좋은 0.5mm 젤 볼펜 3종 세트입니다. 각기 다른 손그림 문구가 인쇄되어 있습니다.",
    inStock: true,
    stockQuantity: 55,
    badges: [],
    featured: false,
    createdAt: "2025-12-10T00:00:00.000Z",
  },
  {
    id: "prd_0006",
    slug: "reading-cat-bookmark",
    name: "책 읽는 고양이 책갈피",
    price: 3500,
    compareAtPrice: null,
    category: "goods",
    images: [ph("cat-bookmark-1")],
    summary: "황동 소재 손그림 고양이 책갈피.",
    description:
      "책 읽는 고양이를 손그림으로 담은 황동 책갈피입니다. 얇고 튼튼해 책에 자국이 남지 않습니다.",
    inStock: true,
    stockQuantity: 30,
    badges: ["best"],
    featured: true,
    createdAt: "2025-10-02T00:00:00.000Z",
  },
  {
    id: "prd_0007",
    slug: "171-canvas-tote",
    name: "171 캔버스 에코백",
    price: 16000,
    compareAtPrice: null,
    category: "goods",
    images: [ph("tote-1"), ph("tote-2")],
    summary: "책 몇 권 넉넉히 담기는 두꺼운 캔버스 에코백.",
    description:
      "12수 두꺼운 캔버스에 171studio 로고를 실크스크린으로 인쇄한 에코백입니다. 책 서너 권을 담아도 넉넉한 크기입니다.",
    inStock: true,
    stockQuantity: 18,
    badges: [],
    featured: false,
    createdAt: "2025-08-22T00:00:00.000Z",
  },
  {
    id: "prd_0008",
    slug: "bookshop-enamel-pin",
    name: "작은 책방 에나멜 뱃지",
    price: 8000,
    compareAtPrice: null,
    category: "goods",
    images: [ph("pin-1")],
    summary: "손그림 책방 일러스트 에나멜 뱃지.",
    description:
      "171studio의 시그니처 책방 일러스트를 에나멜 뱃지로 만들었습니다. 에코백이나 옷에 달아 포인트를 줄 수 있습니다.",
    inStock: false,
    stockQuantity: 0,
    badges: ["limited"],
    featured: false,
    createdAt: "2025-07-14T00:00:00.000Z",
  },
  {
    id: "prd_0009",
    slug: "quiet-morning-riso-print",
    name: "고요한 아침 — 리소 프린트 (A4)",
    price: 14000,
    compareAtPrice: null,
    category: "print",
    images: [ph("riso-morning-1")],
    summary: "2도 리소그래피로 인쇄한 A4 아트 프린트.",
    description:
      "이른 아침의 책방 풍경을 손그림으로 그려 2도 리소그래피로 인쇄한 A4 아트 프린트입니다. 액자에 넣어 걸기 좋습니다.",
    inStock: true,
    stockQuantity: 15,
    badges: ["new"],
    featured: true,
    createdAt: "2026-01-30T00:00:00.000Z",
  },
  {
    id: "prd_0010",
    slug: "shelf-of-books-poster",
    name: "책장 포스터 (B3)",
    price: 22000,
    compareAtPrice: 26000,
    category: "print",
    images: [ph("shelf-poster-1")],
    summary: "빼곡한 책장을 그린 B3 대형 포스터.",
    description:
      "좋아하는 책들로 빼곡히 채운 책장을 손그림으로 그린 B3 대형 포스터입니다. 두꺼운 무광 아트지에 인쇄했습니다.",
    inStock: true,
    stockQuantity: 9,
    badges: [],
    featured: false,
    createdAt: "2025-11-01T00:00:00.000Z",
  },
  {
    id: "prd_0011",
    slug: "seasons-postcard-set",
    name: "사계절 엽서 세트 (4매)",
    price: 5000,
    compareAtPrice: null,
    category: "card",
    images: [ph("postcard-set-1")],
    summary: "봄·여름·가을·겨울 책방 풍경 엽서 4매.",
    description:
      "계절마다 다른 책방의 풍경을 손그림으로 담은 엽서 4매 세트입니다. 편지로 보내거나 벽에 붙여 두기 좋습니다.",
    inStock: true,
    stockQuantity: 60,
    badges: ["best"],
    featured: true,
    createdAt: "2025-12-20T00:00:00.000Z",
  },
  {
    id: "prd_0012",
    slug: "thank-you-mini-card",
    name: "고맙습니다 미니 카드",
    price: 3000,
    compareAtPrice: null,
    category: "card",
    images: [ph("thankyou-card-1")],
    summary: "선물에 곁들이기 좋은 손그림 미니 카드.",
    description:
      "작은 감사의 마음을 전하기 좋은 손그림 미니 카드입니다. 봉투가 함께 들어 있어 선물에 곁들이기 좋습니다.",
    inStock: true,
    stockQuantity: 80,
    badges: [],
    featured: false,
    createdAt: "2026-02-10T00:00:00.000Z",
  },
];

/* -------------------------------------------------------------------------- */
/* 데이터 접근 헬퍼 (실 DB 전환 시 이 함수들의 내부만 쿼리로 바꾸면 된다)       */
/* -------------------------------------------------------------------------- */

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getCategories(): Category[] {
  return CATEGORY_ORDER.map((slug) => ({
    slug,
    label: CATEGORY_LABELS[slug],
    count: products.filter((p) => p.category === slug).length,
  }));
}

export type ProductSort = "latest" | "price_asc" | "price_desc";

export interface ProductQuery {
  category?: string;
  badge?: string;
  featured?: boolean;
  /** 이름/요약 검색어 */
  q?: string;
  sort?: ProductSort;
}

/** 목록 API의 필터·정렬 로직. mock 배열을 in-memory로 처리한다. */
export function queryProducts(query: ProductQuery): Product[] {
  let result = [...products];

  if (query.category) {
    result = result.filter((p) => p.category === query.category);
  }
  if (query.badge) {
    result = result.filter((p) =>
      p.badges.includes(query.badge as Product["badges"][number]),
    );
  }
  if (query.featured) {
    result = result.filter((p) => p.featured);
  }
  if (query.q) {
    const q = query.q.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q),
    );
  }

  switch (query.sort) {
    case "price_asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price_desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "latest":
    default:
      result.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      break;
  }

  return result;
}
