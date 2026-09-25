import React from "react";
import type { Metadata } from "next";
import { campaigns, BRAND } from "@/data/campaigns";
import CollectionGallery from "@/components/campaign/CollectionGallery";
import Link from "next/link";

export const metadata: Metadata = {
  title: `Collection | ${BRAND.name}`,
  description:
    "Une collection pensée pour les lieux qui comptent — proposition personnalisée sur simple demande.",
};

export default function CollectionPage() {
  const campaign = campaigns[0]!;
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="bg-neutral-950 text-white py-12 md:py-16">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <p className="text-sm uppercase tracking-widest text-[#66C6E8] font-semibold mb-2">
            Galerie
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Collection</h1>
          <p className="text-neutral-400 mb-6">
            Une collection pensée pour les lieux qui comptent. Chaque proposition
            est unique — parlons de la vôtre.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/personnaliser"
              className="px-5 py-2.5 rounded-md bg-[#66C6E8] text-neutral-950 font-semibold text-sm"
            >
              Demander une proposition
            </Link>
            <Link
              href={`/c/${campaign.code}#collection`}
              className="px-5 py-2.5 rounded-md border border-white/30 text-sm hover:bg-white/10"
            >
              Voir dans un univers
            </Link>
          </div>
        </div>
      </div>
      <CollectionGallery campaign={campaign} />
    </div>
  );
}
