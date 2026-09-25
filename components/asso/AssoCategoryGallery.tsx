"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { CollectionPiece } from "@/data/collection";
import { BRAND } from "@/data/campaigns";

interface Props {
  categorie: string;
  label: string;
  pieces: CollectionPiece[];
}

export default function AssoCategoryGallery({ categorie, label, pieces }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = pieces.find((p) => p.id === selectedId) || null;

  const mailto = (piece: CollectionPiece) => {
    const subject = encodeURIComponent(
      `[Associations — ${label}] Tableau offert / commander — ${piece.title}`
    );
    const body = encodeURIComponent(
      `Bonjour Fatou,\n\nJe souhaite commander / recevoir le tableau offert « ${piece.title} » (catégorie ${label}, id ${piece.id}).\n\nMerci de me recontacter pour organiser la suite.\n`
    );
    return `mailto:${BRAND.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <p className="text-sm text-neutral-500 mb-1">
            <Link href="/asso" className="hover:text-[#4FA8C6]">
              Galerie associations
            </Link>
            <span className="mx-2">/</span>
            <span className="capitalize text-neutral-800 font-medium">{label}</span>
          </p>
          <h1 className="text-3xl md:text-4xl font-bold capitalize">{label}</h1>
          <p className="text-neutral-600 mt-2 max-w-2xl">
            Sélectionnez une œuvre — tableau offert pour les associations.
            Contactez-nous pour commander, sans engagement.
          </p>
        </div>
        <p className="text-sm text-neutral-500">{pieces.length} tableaux</p>
      </div>

      {selected ? (
        <div className="mb-8 rounded-2xl border border-[#4FA8C6]/40 bg-white shadow-sm p-4 md:p-6 flex flex-col md:flex-row gap-6 items-stretch">
          <div className="relative w-full md:w-72 aspect-square rounded-xl overflow-hidden bg-neutral-100 shrink-0">
            <Image
              src={selected.image}
              alt={selected.title}
              fill
              className="object-cover"
              sizes="288px"
            />
          </div>
          <div className="flex flex-col justify-between flex-1 gap-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-[#4FA8C6] font-semibold mb-1">
                Sélection — {label}
              </p>
              <h2 className="text-xl font-semibold text-neutral-900 mb-2">
                {selected.title}
              </h2>
              <p className="text-neutral-600 text-sm">
                Tableau offert pour les associations. Nous organisons la
                livraison / la commande avec vous — aucun tarif affiché ici.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={mailto(selected)}
                className="inline-flex items-center justify-center rounded-full bg-[#4FA8C6] hover:bg-[#3d8fad] text-white font-medium px-5 py-2.5 transition-colors"
              >
                Commander / nous contacter
              </a>
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                className="inline-flex items-center justify-center rounded-full border border-neutral-300 text-neutral-700 hover:border-neutral-500 px-5 py-2.5 text-sm transition-colors"
              >
                Changer de sélection
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {pieces.map((piece) => {
          const active = piece.id === selectedId;
          return (
            <button
              key={piece.id}
              type="button"
              onClick={() => setSelectedId(piece.id)}
              className={`group text-left rounded-xl overflow-hidden bg-white shadow-sm border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4FA8C6] ${
                active
                  ? "border-[#4FA8C6] ring-2 ring-[#4FA8C6]/40 shadow-md"
                  : "border-transparent hover:shadow-md hover:border-neutral-200"
              }`}
            >
              <div className="relative aspect-square bg-neutral-100">
                <Image
                  src={piece.image}
                  alt={piece.title}
                  fill
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                {active ? (
                  <span className="absolute top-2 right-2 rounded-full bg-[#4FA8C6] text-white text-[10px] font-semibold px-2 py-0.5">
                    Sélectionné
                  </span>
                ) : null}
              </div>
              <div className="p-2.5">
                <p className="text-xs md:text-sm font-medium text-neutral-800 line-clamp-2">
                  {piece.title}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {pieces.length === 0 ? (
        <p className="text-center text-neutral-500 py-16">
          Aucun tableau pour la catégorie « {categorie} ».
        </p>
      ) : null}
    </div>
  );
}
