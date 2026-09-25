import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAvailableAssoCategories,
  getAssoPiecesByCategory,
} from "@/data/collection";
import { BRAND } from "@/data/campaigns";
import AssoCategoryGallery from "@/components/asso/AssoCategoryGallery";

type PageProps = {
  params: Promise<{ categorie: string }>;
};

export async function generateStaticParams() {
  return getAvailableAssoCategories().map((c) => ({ categorie: c.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { categorie } = await params;
  const cats = getAvailableAssoCategories();
  const cat = cats.find((c) => c.id === categorie.toLowerCase());
  if (!cat) {
    return { title: `Catégorie inconnue | ${BRAND.name}` };
  }
  return {
    title: `${cat.label} — Galerie associations | ${BRAND.name}`,
    description: `Tableaux offerts associations — catégorie ${cat.label} (${cat.count} œuvres).`,
  };
}

export default async function AssoCategoriePage({ params }: PageProps) {
  const { categorie } = await params;
  const id = decodeURIComponent(categorie).trim().toLowerCase();
  const cats = getAvailableAssoCategories();
  const cat = cats.find((c) => c.id === id);
  if (!cat) {
    notFound();
  }

  const pieces = getAssoPiecesByCategory(id);

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100">
      <main className="container mx-auto px-4 py-10 md:py-14">
        <AssoCategoryGallery
          categorie={cat.id}
          label={cat.label}
          pieces={pieces}
        />
      </main>
      <footer className="border-t border-neutral-200 py-8 text-center text-sm text-neutral-500">
        <a href={`mailto:${BRAND.email}`} className="hover:text-[#4FA8C6]">
          {BRAND.email}
        </a>
        {" · tableau offert / commander"}
      </footer>
    </div>
  );
}
