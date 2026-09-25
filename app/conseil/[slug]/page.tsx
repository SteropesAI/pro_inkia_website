import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { BRAND } from "@/data/campaigns";
import {
  formatDateFr,
  getArticle,
  listArticles,
} from "@/lib/conseil";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return listArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: `Conseil | ${BRAND.name}` };
  return {
    title: `${article.title} | Conseil | ${BRAND.name}`,
    description: article.description,
  };
}

export default async function ConseilArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-gradient-to-b from-neutral-50 to-white">
      <div className="container mx-auto px-4 py-10 md:py-14 max-w-3xl">
        <Link
          href="/conseil"
          className="text-sm font-medium text-[#2a7a96] hover:underline"
        >
          ← Conseil
        </Link>

        {article.category ? (
          <p className="mt-8 text-xs uppercase tracking-widest text-[#66C6E8] font-semibold">
            {article.category}
          </p>
        ) : (
          <div className="mt-8" />
        )}

        <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 mb-3">
          {article.title}
        </h1>
        <time
          dateTime={article.date}
          className="block text-sm text-neutral-500 mb-10"
        >
          {formatDateFr(article.date)}
        </time>

        <article className="prose-conseil text-base md:text-lg text-neutral-700 leading-relaxed [&_p]:mb-4 [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:md:text-2xl [&_h2]:font-semibold [&_h2]:text-neutral-900 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_a]:text-[#2a7a96] [&_strong]:text-neutral-900">
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </article>

        <div className="mt-14 pt-8 border-t border-neutral-200 flex flex-wrap gap-4 text-sm">
          <Link
            href="/conseil"
            className="font-medium text-neutral-600 hover:text-neutral-900"
          >
            Tous les conseils
          </Link>
          <Link
            href="/proposition-deco"
            className="font-medium text-[#2a7a96] hover:underline"
          >
            Demander une proposition déco
          </Link>
        </div>
      </div>
    </div>
  );
}
