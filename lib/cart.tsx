"use client";

/**
 * Cart state — localStorage + React context. No Stripe.
 */

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  computeCartTotals,
  type CartTotals,
  type FormatId,
  type LineKind,
  unitPriceEur,
} from "@/lib/pricing";

const STORAGE_KEY = "inkia-pro-cart-v1";

export type CartLine = {
  /** Stable line key (piece+format+kind). */
  key: string;
  kind: LineKind;
  pieceId?: string;
  title: string;
  image?: string;
  formatId: FormatId | null;
  formatLabel: string;
  unitPrice: number;
  qty: number;
};

export type AddCollectionArgs = {
  pieceId: string;
  title: string;
  image: string;
  formatId: FormatId;
  formatLabel: string;
};

export type AddPersoArgs = {
  title: string;
  kind: "perso_print" | "file_only";
  formatId: FormatId | null;
  formatLabel: string;
};

type CartContextValue = {
  lines: CartLine[];
  totals: CartTotals;
  hydrated: boolean;
  addCollection: (args: AddCollectionArgs) => void;
  addPerso: (args: AddPersoArgs) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function lineKey(
  kind: LineKind,
  pieceId: string | undefined,
  formatId: FormatId | null
): string {
  return `${kind}::${pieceId ?? "perso"}::${formatId ?? "file"}`;
}

function loadLines(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartLine[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (l) =>
        l &&
        typeof l.key === "string" &&
        typeof l.qty === "number" &&
        l.qty > 0
    );
  } catch {
    return [];
  }
}

function saveLines(lines: CartLine[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  } catch {
    /* ignore quota */
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setLines(loadLines());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveLines(lines);
  }, [lines, hydrated]);

  const upsert = useCallback((line: CartLine) => {
    setLines((prev) => {
      const i = prev.findIndex((l) => l.key === line.key);
      if (i === -1) return [...prev, line];
      const next = [...prev];
      const existing = next[i]!;
      next[i] = { ...existing, qty: existing.qty + line.qty };
      return next;
    });
  }, []);

  const addCollection = useCallback(
    (args: AddCollectionArgs) => {
      const unit = unitPriceEur("collection", args.formatId);
      upsert({
        key: lineKey("collection", args.pieceId, args.formatId),
        kind: "collection",
        pieceId: args.pieceId,
        title: args.title,
        image: args.image,
        formatId: args.formatId,
        formatLabel: args.formatLabel,
        unitPrice: unit,
        qty: 1,
      });
    },
    [upsert]
  );

  const addPerso = useCallback(
    (args: AddPersoArgs) => {
      const unit = unitPriceEur(args.kind, args.formatId);
      upsert({
        key: lineKey(args.kind, undefined, args.formatId),
        kind: args.kind,
        title: args.title,
        formatId: args.formatId,
        formatLabel: args.formatLabel,
        unitPrice: unit,
        qty: 1,
      });
    },
    [upsert]
  );

  const setQty = useCallback((key: string, qty: number) => {
    setLines((prev) => {
      if (qty <= 0) return prev.filter((l) => l.key !== key);
      return prev.map((l) => (l.key === key ? { ...l, qty } : l));
    });
  }, []);

  const remove = useCallback((key: string) => {
    setLines((prev) => prev.filter((l) => l.key !== key));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const totals = useMemo(() => computeCartTotals(lines), [lines]);

  const value = useMemo(
    () => ({
      lines,
      totals,
      hydrated,
      addCollection,
      addPerso,
      setQty,
      remove,
      clear,
    }),
    [
      lines,
      totals,
      hydrated,
      addCollection,
      addPerso,
      setQty,
      remove,
      clear,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}
