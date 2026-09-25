/**
 * MonOeuvre formats + Inkia Pro pricing (locked amounts).
 * Collection = base+20 · Perso printed = base+70 · File-only = 70 fixed · ≥2 items −10%.
 */

import costs from "@/data/monoeuvre-toiles-cout.json";

export type LineKind = "collection" | "perso_print" | "file_only";

export type FormatId = string;

export type CanvasFormat = {
  id: FormatId;
  label: string;
  largeur_cm: number;
  hauteur_cm: number;
  baseEur: number;
};

type CostRow = {
  format_cm: string;
  largeur_cm: number;
  hauteur_cm: number;
  prix_sans_remise_eur: number;
};

function rowToFormat(row: CostRow): CanvasFormat {
  const id = `${row.largeur_cm}x${row.hauteur_cm}`;
  return {
    id,
    label: `${row.largeur_cm}×${row.hauteur_cm} cm`,
    largeur_cm: row.largeur_cm,
    hauteur_cm: row.hauteur_cm,
    baseEur: row.prix_sans_remise_eur,
  };
}

/** 18 MonOeuvre formats, sorted small → large by area then width. */
export const CANVAS_FORMATS: CanvasFormat[] = (costs as CostRow[])
  .map(rowToFormat)
  .sort((a, b) => {
    const aa = a.largeur_cm * a.hauteur_cm;
    const bb = b.largeur_cm * b.hauteur_cm;
    if (aa !== bb) return aa - bb;
    return a.largeur_cm - b.largeur_cm;
  });

const BY_ID = new Map(CANVAS_FORMATS.map((f) => [f.id, f]));

export function getFormat(id: FormatId): CanvasFormat | undefined {
  return BY_ID.get(id);
}

export const COLLECTION_MARKUP_EUR = 20;
export const PERSO_PRINT_MARKUP_EUR = 70;
export const FILE_ONLY_EUR = 70;
export const MULTI_DISCOUNT_PCT = 10;
export const MULTI_DISCOUNT_MIN_QTY = 2;

export function unitPriceEur(kind: LineKind, formatId: FormatId | null): number {
  if (kind === "file_only") return FILE_ONLY_EUR;
  const fmt = formatId ? getFormat(formatId) : undefined;
  if (!fmt) return 0;
  if (kind === "collection") return round2(fmt.baseEur + COLLECTION_MARKUP_EUR);
  if (kind === "perso_print") return round2(fmt.baseEur + PERSO_PRINT_MARKUP_EUR);
  return 0;
}

export function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export function formatEur(n: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(n);
}

export type CartTotals = {
  itemCount: number;
  subtotalEur: number;
  discountPct: number;
  discountEur: number;
  totalEur: number;
  qualifiesMultiDiscount: boolean;
};

export function computeCartTotals(
  lines: { unitPrice: number; qty: number }[]
): CartTotals {
  const itemCount = lines.reduce((s, l) => s + l.qty, 0);
  const subtotalEur = round2(
    lines.reduce((s, l) => s + l.unitPrice * l.qty, 0)
  );
  const qualifiesMultiDiscount = itemCount >= MULTI_DISCOUNT_MIN_QTY;
  const discountPct = qualifiesMultiDiscount ? MULTI_DISCOUNT_PCT : 0;
  const discountEur = qualifiesMultiDiscount
    ? round2(subtotalEur * (MULTI_DISCOUNT_PCT / 100))
    : 0;
  const totalEur = round2(subtotalEur - discountEur);
  return {
    itemCount,
    subtotalEur,
    discountPct,
    discountEur,
    totalEur,
    qualifiesMultiDiscount,
  };
}


/** Absolute aspect ratio w/h (always >= 1 for matching landscape/portrait separately). */
export function formatAspect(f: CanvasFormat): number {
  return f.largeur_cm / f.hauteur_cm;
}

/** Pick the MonOeuvre format whose cm ratio is closest to the image ratio (w/h). */
export function closestFormatForRatio(imageRatio: number): CanvasFormat {
  if (!Number.isFinite(imageRatio) || imageRatio <= 0) {
    return CANVAS_FORMATS[0]!;
  }
  let best = CANVAS_FORMATS[0]!;
  let bestDist = Infinity;
  for (const f of CANVAS_FORMATS) {
    const d = Math.abs(formatAspect(f) - imageRatio);
    if (d < bestDist) {
      bestDist = d;
      best = f;
    }
  }
  return best;
}

/** Formats whose cm ratio matches imageRatio within tolerance (same family, e.g. all 3:2). */
export function formatsForRatio(
  imageRatio: number,
  tolerance = 0.04
): CanvasFormat[] {
  if (!Number.isFinite(imageRatio) || imageRatio <= 0) {
    return CANVAS_FORMATS.slice();
  }
  const matched = CANVAS_FORMATS.filter(
    (f) => Math.abs(formatAspect(f) - imageRatio) <= tolerance
  );
  if (matched.length > 0) return matched;
  // Portrait: try inverted ratio against landscape catalog
  const inv = 1 / imageRatio;
  const matchedInv = CANVAS_FORMATS.filter(
    (f) => Math.abs(formatAspect(f) - inv) <= tolerance
  );
  if (matchedInv.length > 0) {
    // Return as-is (labels stay MonOeuvre cm); UI can note orientation
    return matchedInv;
  }
  return [closestFormatForRatio(imageRatio)];
}

