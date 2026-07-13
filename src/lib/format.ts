/** 원화 표기: 12000 → "12,000원" */
export function formatKRW(value: number): string {
  return `${value.toLocaleString("ko-KR")}원`;
}
