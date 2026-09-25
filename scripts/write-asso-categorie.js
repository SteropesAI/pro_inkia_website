const fs = require("fs");
const path = require("path");
const p = path.join(
  "C:/Users/Laurent/Documents/projet_claude/PRJ-031-inkia-pro/code/app/asso/[categorie]/page.tsx"
);
const content = `import React from "react";
import Link from "next/link";
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
    return { title: \`Categorie inconnue | \${BRAND.name}\` };
  }
  return {
    title: \`\${cat.label} — Galerie associations | \${BRAND.name}\`,
    description: \`Tableaux offerts associations — categorie \${cat.label} (\${cat.count} oeuvres).\`,
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
      <header className="border-b border-neutral-200 bg-white/80 backdrop-blur sticky top-0 z-20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="font-bold text-lg tracking-tight">
            Ink<span className="text-[#66C6E8]">IA</span>.art
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/asso" className="text-neutral-500 hover:text-neutral-800">
              Categories
            </Link>
            <Link href="/" className="text-neutral-500 hover:text-neutral-800">
              Accueil pro
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10 md:py-14">
        <AssoCategoryGallery
          categorie={cat.id}
          label={cat.label}
          pieces={pieces}
        />
      </main>

      <footer className="border-t border-neutral-200 py-8 text-center text-sm text-neutral-500">
        <a href={\`mailto:\${BRAND.email}\`} className="hover:text-[#4FA8C6]">
          {BRAND.email}
        </a>
        {" · tableau offert / commander"}
      </footer>
    </div>
  );
}
`;
fs.mkdirSync(path.dirname(p), { recursive: true });
fs.writeFileSync(p, content, "utf8");
console.log("wrote", p, fs.statSync(p).size);