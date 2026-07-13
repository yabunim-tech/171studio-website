import type { Metadata } from "next";
import { Inter, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

/* 라틴/숫자 — 기하학적 산세리프 (var: --font-inter) */
const inter = Inter({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/* 한글 — Noto Sans KR 페어링 (var: --font-noto-kr) */
const notoSansKr = Noto_Sans_KR({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-noto-kr",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "171studio — 독립출판·문구·굿즈 셀렉트숍",
    template: "%s · 171studio",
  },
  description:
    "171studio가 큐레이션한 독립출판물과 문구·굿즈·프린트·엽서. 군더더기 없이, 상품과 가격이 스스로 말하게.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${inter.variable} ${notoSansKr.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-canvas text-body">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
