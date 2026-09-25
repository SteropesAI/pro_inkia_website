import React from "react";
import type { Metadata } from "next";
import ConseilForm from "@/components/forms/ConseilForm";
import { BRAND } from "@/data/campaigns";

export const metadata: Metadata = {
  title: `Besoin de conseil | ${BRAND.name}`,
  description:
    "Vous hésitez entre un tableau et une proposition déco — décrivez votre lieu, Fatou vous oriente.",
};

export default function BesoinConseilPage() {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-gradient-to-b from-neutral-50 to-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <p className="text-sm uppercase tracking-widest text-[#66C6E8] font-semibold mb-2">
            Accompagnement
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-3">
            Je ne sais pas choisir
          </h1>
          <p className="text-neutral-600 text-sm md:text-base leading-relaxed">
            Tableau, proposition déco, ou les deux — partagez quelques indices
            sur votre lieu. Fatou vous guide vers la proposition juste.
          </p>
        </div>
        <ConseilForm />
      </div>
    </div>
  );
}
