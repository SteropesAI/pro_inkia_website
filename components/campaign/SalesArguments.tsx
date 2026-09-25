import React from "react";
import Link from "next/link";
import type { Campaign } from "@/data/campaigns";

const ARGS = [
  {
    title: "Œuvres d’exception",
    body: "Des pièces sélectionnées pour sublimer vos espaces professionnels — chaque mur devient signature.",
  },
  {
    title: "Lieux qui comptent",
    body: "Une collection pensée pour les salons, spas, hôtels et lieux d’accueil où l’ambiance se joue aussi sur les murs.",
  },
  {
    title: "Sur mesure",
    body: "Choisissez dans la collection, composez votre tableau, ou confiez-nous une proposition déco. Chaque proposition est unique.",
  },
  {
    title: "Accompagnement",
    body: "Fatou vous guide vers la pièce juste — ou vers une nouvelle ambiance pour votre espace.",
  },
];

export default function SalesArguments({ campaign }: { campaign: Campaign }) {
  return (
    <section className="py-16 bg-neutral-950 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <p className="text-sm uppercase tracking-widest mb-2" style={{ color: campaign.accent }}>
            Pourquoi Inkia
          </p>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            L&apos;art au service de vos espaces
          </h2>
          <p className="text-neutral-400 text-sm md:text-base">
            Des œuvres d’exception, choisies pour sublimer vos lieux professionnels.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto mb-10">
          {ARGS.map((a) => (
            <article
              key={a.title}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-5"
            >
              <div
                className="w-8 h-0.5 mb-3"
                style={{ backgroundColor: campaign.accent }}
              />
              <h3 className="font-semibold mb-2 text-white">{a.title}</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">{a.body}</p>
            </article>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="#collection"
            className="inline-flex justify-center px-6 py-3 rounded-md font-semibold text-neutral-950"
            style={{ backgroundColor: campaign.accent }}
          >
            Voir la collection
          </Link>
          <Link
            href="/personnaliser"
            className="inline-flex justify-center px-6 py-3 rounded-md font-semibold border border-white/50 hover:bg-white/10"
          >
            Composer la mienne
          </Link>
          <Link
            href="/proposition-deco"
            className="inline-flex justify-center px-6 py-3 rounded-md font-semibold border border-white/30 text-white/80 hover:bg-white/5"
          >
            Proposition déco
          </Link>
        </div>
      </div>
    </section>
  );
}
