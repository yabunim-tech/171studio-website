"use client";

/**
 * useCart — 장바구니 클라이언트 로컬 상태(localStorage) 캡슐화 훅
 *
 * backend-developer 결정(02_..._data-model.md §4): 장바구니는 서버 없이
 * 프론트 로컬 상태 + localStorage 로 처리한다. 담는 시점에 name/price/image
 * 스냅샷을 함께 저장한다.
 *
 * 설계 의도: 상태 로직을 이 훅 "내부"에만 가둔다. 이후 결제 연동 단계에서
 * 로컬 Cart → 서버 Order 로 바꿀 때, 컴포넌트는 그대로 두고 이 파일 내부만
 * 교체하면 되도록 한다(모듈 스토어 + useSyncExternalStore 로 컴포넌트 간 동기화).
 */

import { useCallback, useSyncExternalStore } from "react";
import type { Cart, CartItem, Product } from "@/types/commerce";

const STORAGE_KEY = "171studio.cart";

const EMPTY_CART: Cart = { items: [], totalQuantity: 0, totalPrice: 0 };

/* ---- 모듈 레벨 스토어 (여러 컴포넌트가 같은 상태를 구독) ---- */
let cart: Cart = EMPTY_CART;
let hydrated = false;
const listeners = new Set<() => void>();

function recompute(items: CartItem[]): Cart {
  return {
    items,
    totalQuantity: items.reduce((sum, it) => sum + it.quantity, 0),
    totalPrice: items.reduce((sum, it) => sum + it.price * it.quantity, 0),
  };
}

function emit() {
  listeners.forEach((l) => l());
}

function persist() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart.items));
  } catch {
    /* 저장 실패(사생활 모드 등)는 무시 — 세션 내 상태는 유지 */
  }
}

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const items = JSON.parse(raw) as CartItem[];
      if (Array.isArray(items)) cart = recompute(items);
    }
  } catch {
    cart = EMPTY_CART;
  }
}

function setItems(items: CartItem[]) {
  cart = recompute(items);
  persist();
  emit();
}

/* 다른 탭에서의 변경을 반영 */
if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (e.key !== STORAGE_KEY) return;
    try {
      const items = e.newValue ? (JSON.parse(e.newValue) as CartItem[]) : [];
      cart = recompute(Array.isArray(items) ? items : []);
      emit();
    } catch {
      /* ignore */
    }
  });
}

/* ---- 스토어 액션 ---- */
function addItem(product: Product, quantity = 1) {
  hydrate();
  const existing = cart.items.find((it) => it.productId === product.id);
  let items: CartItem[];
  if (existing) {
    items = cart.items.map((it) =>
      it.productId === product.id
        ? { ...it, quantity: it.quantity + quantity }
        : it,
    );
  } else {
    const snapshot: CartItem = {
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0] ?? "",
      quantity,
    };
    items = [...cart.items, snapshot];
  }
  setItems(items);
}

function updateQuantity(productId: string, quantity: number) {
  hydrate();
  if (quantity <= 0) {
    setItems(cart.items.filter((it) => it.productId !== productId));
    return;
  }
  setItems(
    cart.items.map((it) =>
      it.productId === productId ? { ...it, quantity } : it,
    ),
  );
}

function removeItem(productId: string) {
  hydrate();
  setItems(cart.items.filter((it) => it.productId !== productId));
}

function clear() {
  setItems([]);
}

/* ---- 구독/스냅샷 ---- */
function subscribe(listener: () => void) {
  // 첫 구독 시 localStorage 에서 복원
  hydrate();
  listener(); // 복원값 즉시 반영
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): Cart {
  return cart;
}

function getServerSnapshot(): Cart {
  return EMPTY_CART;
}

export interface UseCartResult {
  cart: Cart;
  addItem: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
}

export function useCart(): UseCartResult {
  const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const add = useCallback(addItem, []);
  const update = useCallback(updateQuantity, []);
  const remove = useCallback(removeItem, []);
  const clearCart = useCallback(clear, []);

  return {
    cart: value,
    addItem: add,
    updateQuantity: update,
    removeItem: remove,
    clear: clearCart,
  };
}
