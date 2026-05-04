import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { CartItem } from '../types';

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  add: (item: CartItem) => void;
  remove: (productId: string, size: number | null) => void;
  setQty: (productId: string, size: number | null, qty: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = 'vien-cart-v1';

const sameLine = (a: CartItem, b: { productId: string; size: number | null }) =>
  a.productId === b.productId && a.size === b.size;

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const add = useCallback((item: CartItem) => {
    setItems((prev) => {
      const idx = prev.findIndex((p) => sameLine(p, item));
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + item.qty };
        return next;
      }
      return [...prev, item];
    });
    setIsOpen(true);
  }, []);

  const remove = useCallback((productId: string, size: number | null) => {
    setItems((prev) => prev.filter((p) => !sameLine(p, { productId, size })));
  }, []);

  const setQty = useCallback(
    (productId: string, size: number | null, qty: number) => {
      setItems((prev) =>
        prev
          .map((p) => (sameLine(p, { productId, size }) ? { ...p, qty } : p))
          .filter((p) => p.qty > 0)
      );
    },
    []
  );

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      count: items.reduce((n, i) => n + i.qty, 0),
      subtotal: items.reduce((n, i) => n + i.price * i.qty, 0),
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      toggle: () => setIsOpen((v) => !v),
      add,
      remove,
      setQty,
      clear,
    }),
    [items, isOpen, add, remove, setQty, clear]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
