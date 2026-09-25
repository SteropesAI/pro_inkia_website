import React from "react";
import type { Metadata } from "next";
import { BRAND } from "@/data/campaigns";
import { avantApresPairs } from "@/data/collection";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import Link from "next/link";

export const metadata: Metadata = {
  title: `Avant / après | ${BRAND.name}`,
  description:
    "Des espaces professionnels sublimés par une œuvre Inkia — glissez pour découvrir la transformation.",
};

export default function AvantApresPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="bg-neutral-950 text-white py-12 md:py-16">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <p className="text-sm uppercase tracking-widest text-[#C4A35A] font-semibold mb-2">
            L’espace transformé
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Avant / après</h1>
          <p className="text-neutral-400 mb-6">
            Voyez comment une œuvre d’exception change un lieu. Glissez le
            curseur — la pièce fait le reste.
          </p>
          <Link
            href="/collection"
            className="inline-block px-5 py-2.5 rounded-md bg-[#66C6E8] text-neutral-950 font-semibold text-sm"
          >
            Découvrir la collection
          </Link>
        </div>
      </div>
      <section className="py-14">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {avantApresPairs.map((pair) => (
              <BeforeAfterSlider
                key={pair.id}
                beforeSrc={pair.before}
                afterSrc={pair.after}
                label={pair.label}
                beforeAlt={`${pair.label} — avant`}
                afterAlt={`${pair.label} — après`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
