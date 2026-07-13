import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-5 py-28 text-center sm:px-8">
      <p className="text-label text-primary">404</p>
      <h1 className="mt-3 text-display-lg text-ink">찾는 페이지가 없어요</h1>
      <p className="mt-3 text-secondary">
        주소가 바뀌었거나, 서가에서 잠시 사라진 것 같아요.
      </p>
      <Link href="/" className="btn-primary mt-8">
        홈으로 돌아가기
      </Link>
    </div>
  );
}
