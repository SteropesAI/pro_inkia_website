import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getAvailableAssoCategories } from "@/data/collection";
import { BRAND } from "@/data/campaigns";

export const metadata: Metadata = {
  title: `Galerie associations | ${BRAND.name}`,
  description:
    "Tableaux offerts pour les associations — choisissez une catégorie (boxe, karate…) et sélectionnez une œuvre.",
};

export default function AssoIndexPage() {
  const categories = getAvailableAssoCategories();

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100">
      <main className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <p className="text-sm uppercase tracking-widest text-[#4FA8C6] font-semibold mb-2">
            Galerie associations
          </p>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Choisissez votre sport
          </h1>
          <div className="w-16 h-1 bg-[#66C6E8] mx-auto mb-4" />
          <p className="text-neutral-600 text-lg">
            Des tableaux offerts pour les associations. Parcourez une catégorie,
            sélectionnez une œuvre, puis contactez-nous pour commander.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/asso/${cat.id}`}
              className="group block bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden border border-neutral-100 hover:-translate-y-0.5"
            >
              <div className="relative aspect-[4/3] bg-neutral-100">
                <Image
                  src={cat.cover}
                  alt={cat.label}
                  fill
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h2 className="text-2xl font-semibold capitalize">{cat.label}</h2>
                  <p className="text-sm text-white/85">{cat.count} tableaux</p>
                </div>
              </div>
              <div className="p-4 text-center text-sm text-neutral-600 group-hover:text-[#4FA8C6] transition-colors">
                Voir les tableaux →
              </div>
            </Link>
          ))}
        </div>

        {categories.length === 0 ? (
          <p className="text-center text-neutral-500 py-16">
            Aucune catégorie disponible pour le moment.
          </p>
        ) : null}
      </main>

      <footer className="border-t border-neutral-200 py-8 text-center text-sm text-neutral-500">
        <a href={`mailto:${BRAND.email}`} className="hover:text-[#4FA8C6]">
          {BRAND.email}
        </a>
        {" · "}
        <span>{BRAND.tagline}</span>
      </footer>
    </div>
  );
}
