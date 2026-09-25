"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Minus, Plus } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatEur } from "@/lib/pricing";
import { BRAND } from "@/data/campaigns";

function kindLabel(kind: string): string {
  if (kind === "collection") return "Collection";
  if (kind === "perso_print") return "Personnalisé imprimé";
  if (kind === "file_only") return "Fichier seul";
  return kind;
}

export default function PanierPage() {
  const { lines, totals, hydrated, setQty, remove, clear } = useCart();

  if (!hydrated) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-neutral-500">
        Chargement du panier…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="bg-neutral-950 text-white py-10 md:py-14">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <p className="text-sm uppercase tracking-widest text-[#66C6E8] font-semibold mb-2">
            Sélection
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Panier</h1>
          <p className="text-neutral-400 text-sm">
            Pas de paiement en ligne pour l&apos;instant — validez votre sélection,
            nous vous recontactons.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 max-w-3xl">
        {lines.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-neutral-200 shadow-sm">
            <p className="text-neutral-600 mb-6">Votre panier est vide.</p>
            <Link
              href="/collection"
              className="inline-flex px-5 py-2.5 rounded-md bg-[#66C6E8] text-neutral-950 font-semibold text-sm"
            >
              Parcourir la collection
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <ul className="space-y-4">
              {lines.map((line) => (
                <li
                  key={line.key}
                  className="flex gap-4 bg-white rounded-xl border border-neutral-200 p-4 shadow-sm"
                >
                  {line.image ? (
                    <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-neutral-100">
                      <Image
                        src={line.image}
                        alt={line.title}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                  ) : (
                    <div className="w-20 h-20 shrink-0 rounded-lg bg-neutral-100" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-neutral-900 line-clamp-2">
                      {line.title}
                    </p>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      {kindLabel(line.kind)}
                      {line.formatLabel ? ` · ${line.formatLabel}` : ""}
                    </p>
                    <p className="text-sm font-medium mt-1">
                      {formatEur(line.unitPrice)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        type="button"
                        aria-label="Diminuer"
                        className="p-1.5 rounded-md border border-neutral-300 hover:bg-neutral-50"
                        onClick={() => setQty(line.key, line.qty - 1)}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm w-6 text-center tabular-nums">
                        {line.qty}
                      </span>
                      <button
                        type="button"
                        aria-label="Augmenter"
                        className="p-1.5 rounded-md border border-neutral-300 hover:bg-neutral-50"
                        onClick={() => setQty(line.key, line.qty + 1)}
                      >
                        <Plus size={14} />
                      </button>
                      <button
                        type="button"
                        aria-label="Retirer"
                        className="ml-auto p-1.5 rounded-md text-neutral-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => remove(line.key)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="text-sm font-semibold tabular-nums shrink-0">
                    {formatEur(line.unitPrice * line.qty)}
                  </div>
                </li>
              ))}
            </ul>

            <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-sm space-y-2">
              <div className="flex justify-between text-sm text-neutral-600">
                <span>
                  Sous-total ({totals.itemCount} {totals.itemCount > 1 ? "tableaux" : "tableau"})
                </span>
                <span className="tabular-nums">
                  {formatEur(totals.subtotalEur)}
                </span>
              </div>
              {totals.qualifiesMultiDiscount ? (
                <div className="flex justify-between text-sm text-emerald-700">
                  <span>Remise −{totals.discountPct}&nbsp;% (≥ 2 tableaux)</span>
                  <span className="tabular-nums">
                    −{formatEur(totals.discountEur)}
                  </span>
                </div>
              ) : (
                <p className="text-xs text-neutral-400">
                  Ajoutez un 2<sup>e</sup> tableau pour −10&nbsp;% automatique.
                </p>
              )}
              <div className="flex justify-between text-base font-bold pt-2 border-t border-neutral-100">
                <span>Total</span>
                <span className="tabular-nums">{formatEur(totals.totalEur)}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/besoin-conseil"
                className="flex-1 text-center px-5 py-3 rounded-md bg-[#66C6E8] text-neutral-950 font-semibold text-sm"
              >
                Demander un devis / volume
              </Link>
              <a
                href={`mailto:${BRAND.email}?subject=${encodeURIComponent(
                  `[Panier] ${totals.itemCount} tableau(x) — ${formatEur(totals.totalEur)}`
                )}&body=${encodeURIComponent(
                  `Bonjour,\n\nJe souhaite valider ma sélection (${totals.itemCount} pièce(s), total ${formatEur(totals.totalEur)}).\n\nMerci de me recontacter.\n`
                )}`}
                className="flex-1 text-center px-5 py-3 rounded-md border border-neutral-300 bg-white text-sm font-medium hover:bg-neutral-50"
              >
                Être recontacté(e)
              </a>
            </div>

            <div className="flex flex-wrap justify-between gap-3 text-sm">
              <Link
                href="/collection"
                className="text-neutral-600 underline-offset-2 hover:underline"
              >
                Continuer la sélection
              </Link>
              <button
                type="button"
                onClick={clear}
                className="text-neutral-400 hover:text-neutral-700"
              >
                Vider le panier
              </button>
            </div>

            <p className="text-xs text-neutral-400 text-center pt-2">
              Volumes multi-sites ou grandes quantités : privilégiez le devis — pas
              de grille au-delà de la remise −10&nbsp;%.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
