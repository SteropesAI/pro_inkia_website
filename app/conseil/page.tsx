import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BRAND } from "@/data/campaigns";
import { formatDateFr, listArticles } from "@/lib/conseil";

export const metadata: Metadata = {
  title: `Conseil | ${BRAND.name}`,
  description:
    "Conseils élégants pour choisir, placer et vivre l'art mural dans vos espaces professionnels.",
};

export default function ConseilIndexPage() {
  const articles = listArticles();

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-gradient-to-b from-neutral-50 to-white">
      <div className="bg-neutral-950 text-white py-12 md:py-16">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <p className="text-sm uppercase tracking-widest text-[#66C6E8] font-semibold mb-2">
            Éditorial
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">
            Conseil
          </h1>
          <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
            Des repères sobres pour accompagner l&apos;art mural dans vos lieux
            professionnels — espace, format, ambiance.
          </p>
        </div>
      </div>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          {articles.length === 0 ? (
            <p className="text-center text-neutral-500 text-sm">
              Bientôt de nouveaux conseils.
            </p>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {articles.map((article) => (
                <li key={article.slug}>
                  <Link
                    href={`/conseil/${article.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm transition-all hover:border-[#66C6E8]/50 hover:shadow-lg"
                  >
                    {article.category ? (
                      <p className="text-xs uppercase tracking-widest text-[#66C6E8] font-semibold mb-3">
                        {article.category}
                      </p>
                    ) : null}
                    <h2 className="text-lg md:text-xl font-semibold text-neutral-900 mb-3 leading-snug group-hover:text-[#2a7a96] transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-sm text-neutral-600 leading-relaxed flex-1 mb-6">
                      {article.description}
                    </p>
                    <div className="flex items-center justify-between gap-3 text-sm">
                      <time
                        dateTime={article.date}
                        className="text-neutral-400"
                      >
                        {formatDateFr(article.date)}
                      </time>
                      <span className="inline-flex items-center gap-1.5 font-semibold text-neutral-900 group-hover:text-[#2a7a96]">
                        Lire
                        <ArrowRight
                          size={14}
                          className="transition-transform group-hover:translate-x-0.5"
                        />
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
