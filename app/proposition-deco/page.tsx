import React from "react";
import type { Metadata } from "next";
import PropositionDecoForm from "@/components/forms/PropositionDecoForm";
import { BRAND } from "@/data/campaigns";

export const metadata: Metadata = {
  title: `Proposition déco | ${BRAND.name}`,
  description:
    "Peinture, couleurs, ambiance - une proposition pour redéfinir votre espace professionnel.",
};

export default function PropositionDecoPage() {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-gradient-to-b from-neutral-50 to-white">
      <div className="bg-neutral-950 text-white py-12 md:py-16">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <p className="text-sm uppercase tracking-widest text-[#66C6E8] font-semibold mb-2">
            Ambiance
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">
            Proposition déco
          </h1>
          <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
            Peinture des murs, choix des couleurs, nouvelle atmosphère -
            Fatou imagine une proposition d&apos;ambiance pour votre lieu.
            Ce n&apos;est pas un tableau seul : c&apos;est l&apos;espace qui change.
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12 md:py-16">
        <PropositionDecoForm />
      </div>
    </div>
  );
}
