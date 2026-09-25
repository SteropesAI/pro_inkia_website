import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Paintbrush, Palette } from "lucide-react";
import type { Campaign } from "@/data/campaigns";

export default function PersonalizeCTA({ campaign }: { campaign: Campaign }) {
  return (
    <section id="personnalise" className="py-20 bg-white scroll-mt-8">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <p
            className="text-sm uppercase tracking-widest font-semibold mb-3"
            style={{ color: campaign.accent }}
          >
            Sur mesure
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Deux propositions, pour votre espace
          </h2>
          <div
            className="w-16 h-1 mx-auto mb-5"
            style={{ backgroundColor: campaign.accent }}
          />
          <p className="text-neutral-600 max-w-xl mx-auto">
            Une œuvre murale choisie ou composée — ou une proposition d&apos;ambiance
            qui redessine les couleurs de votre lieu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          <article className="rounded-2xl border border-neutral-200 bg-neutral-50 px-6 py-8 text-center flex flex-col">
            <Palette className="mx-auto mb-3 text-neutral-700" size={22} />
            <h3 className="text-xl font-semibold mb-2">Tableau</h3>
            <p className="text-sm text-neutral-600 mb-6 flex-1">
              Collection prête à accrocher, ou création guidée selon votre style,
              vos couleurs et votre format.
            </p>
            <div className="flex flex-col gap-2">
              <Link
                href="#collection"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md font-semibold text-neutral-950 transition-opacity hover:opacity-90"
                style={{ backgroundColor: campaign.accent }}
              >
                Voir la collection
              </Link>
              <Link
                href="/personnaliser"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md font-semibold border border-neutral-300 hover:bg-white"
              >
                <Sparkles size={16} />
                Composer la mienne
                <ArrowRight size={16} />
              </Link>
            </div>
          </article>

          <article className="rounded-2xl border border-neutral-200 bg-neutral-50 px-6 py-8 text-center flex flex-col">
            <Paintbrush className="mx-auto mb-3 text-neutral-700" size={22} />
            <h3 className="text-xl font-semibold mb-2">Proposition déco</h3>
            <p className="text-sm text-neutral-600 mb-6 flex-1">
              Peinture des murs, palette, atmosphère — Fatou imagine une
              nouvelle ambiance pour votre espace professionnel.
            </p>
            <Link
              href="/proposition-deco"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md font-semibold text-neutral-950 transition-opacity hover:opacity-90"
              style={{ backgroundColor: campaign.accent }}
            >
              Demander une proposition déco
              <ArrowRight size={16} />
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}
