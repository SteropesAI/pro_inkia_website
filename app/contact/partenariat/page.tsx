import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import PartenariatForm from "@/components/forms/PartenariatForm";
import { BRAND } from "@/data/campaigns";

export const metadata: Metadata = {
  title: `Partenariat | ${BRAND.name}`,
  description:
    "Décorateurs, architectes, pros partenaires - parlons collaboration avec Inkia.",
};

export default function PartenariatPage() {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-gradient-to-b from-neutral-50 to-white">
      <div className="bg-neutral-950 text-white py-12 md:py-16">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <p className="text-sm uppercase tracking-widest text-[#66C6E8] font-semibold mb-2">
            Pros &amp; déco
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">
            Partenariat
          </h1>
          <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-3">
            Décorateurs d&apos;intérieur, architectes, lieux d&apos;accueil -
            Inkia collabore avec les professionnels qui habillent les espaces.
          </p>
          <Link
            href="/contact"
            className="text-sm text-neutral-500 hover:text-neutral-300"
          >
            ← Retour au contact
          </Link>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12 md:py-16">
        <PartenariatForm />
      </div>
    </div>
  );
}
