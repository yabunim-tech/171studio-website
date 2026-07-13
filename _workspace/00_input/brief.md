# 171studio 독립서점 홈페이지 — 프로젝트 브리프

## 브랜드
- 이름: 171studio
- 업종: 독립서점
- 레퍼런스 1 (인스타그램): https://www.instagram.com/onesevenone.studio/
- 레퍼런스 2 (네이버 스마트스토어, 상품 구성/가격대/카테고리 참고용): https://smartstore.naver.com/onesevenonestudio
- 무드: 손그림 일러스트, 아기자기하고 인간적인 무드

## 이번 범위 (1단계)
- 메인 페이지
- 소개 페이지 (오시는 길, 전화번호 등 매장 정보)
- 제품 목록/상세 페이지
- 장바구니 페이지

## 범위 밖
- 실제 결제 게이트웨이 연동 (PG사 연동은 다음 단계) — 장바구니의 "결제하기" 버튼은 UI만 두고 동작은 비활성/placeholder 처리

## 기술 스택
- Next.js (App Router) + TypeScript + Tailwind CSS
- 배포 목표: Vercel
- 패키지 매니저: npm

## 프로젝트 경로
- 루트: `/Users/hogyeong-igajunseonmul/Desktop/171studio-website`
- 중간 산출물: `_workspace/` 하위 (00_input, 01_ui-designer_*, 02_backend-developer_*, 03_frontend-developer_*, 04_qa-engineer_*)

## 참고
- 이 Next.js 프로젝트는 `create-next-app` 최신 버전으로 생성되어 API/컨벤션이 학습 데이터와 다를 수 있다. 확신이 없는 API는 `node_modules/next/dist/docs/`에서 확인한다 (프로젝트 루트의 `AGENTS.md` 참고).
