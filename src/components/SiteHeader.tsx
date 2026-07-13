"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCart } from "@/hooks/useCart";

const NAV = [
  { href: "/", label: "홈" },
  { href: "/products", label: "제품" },
  { href: "/about", label: "소개" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const { cart } = useCart();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        {/* 브랜드 로고 이미지 (텍스트 워드마크는 footer로 이동) */}
        <Link href="/" aria-label="171studio 홈">
          <Image
            src="/brand/171studio-logo.png"
            alt="171studio"
            width={800}
            height={168}
            className="h-8 w-auto"
            priority
          />
        </Link>

        {/* 네비 */}
        <nav className="flex items-center gap-1 sm:gap-2">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-1.5 text-base font-semibold transition-colors ${
                isActive(item.href)
                  ? "text-ink"
                  : "text-secondary hover:text-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}

          {/* 장바구니 */}
          <Link
            href="/cart"
            aria-label="장바구니"
            className={`relative ml-1 px-3 py-1.5 text-base font-semibold transition-colors ${
              isActive("/cart") ? "text-ink" : "text-secondary hover:text-ink"
            }`}
          >
            장바구니
            {cart.totalQuantity > 0 && (
              <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs font-bold text-white">
                {cart.totalQuantity}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
