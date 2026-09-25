import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Handshake, Sparkles, Paintbrush, HelpCircle, ArrowRight, BookOpen } from "lucide-react";
import { BRAND } from "@/data/campaigns";

export const metadata: Metadata = {
  title: `Contact | ${BRAND.name}`,
  description:
    "Parlons de votre espace — partenariat, personnalisation ou proposition déco.",
};

const CARDS = [
  {
    href: "/contact/partenariat",
    eyebrow: "Pros & déco",
    title: "Partenariat",
    body: "Décorateurs d'intérieur, architectes, lieux partenaires — construisons une collaboration élégante.",
    icon: Handshake,
    cta: "Proposer un partenariat",
  },
  {
    href: "/personnaliser",
    eyebrow: "Sur mesure",
    title: "Personnalisation",
    body: "Un tableau pensé pour votre espace — style, couleurs, format, inspiration.",
    icon: Sparkles,
    cta: "Composer mon tableau",
  },
  {
    href: "/proposition-deco",
    eyebrow: "Ambiance",
    title: "Proposition déco",
    body: "Peinture, couleurs, atmosphère — une proposition pour redéfinir votre lieu.",
    icon: Paintbrush,
    cta: "Demander une proposition",
  },
] as const;

export default function ContactHubPage() {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-gradient-to-b from-neutral-50 to-white">
      <div className="bg-neutral-950 text-white py-12 md:py-16">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <p className="text-sm uppercase tracking-widest text-[#66C6E8] font-semibold mb-2">
            Contact
          </p>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            Parlons de votre espace.
          </h1>
          <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-4">
            Partenariat, création sur mesure ou proposition d&apos;ambiance -
            Fatou vous accompagne vers la proposition juste.
          </p>
          <p className="text-sm text-neutral-500">
            <a href={`mailto:${BRAND.email}`} className="hover:text-neutral-300">
              {BRAND.email}
            </a>
            {" · "}
            <a href={BRAND.phoneHref} className="hover:text-neutral-300">
              {BRAND.phone}
            </a>
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto mb-10">
          {CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.href}
                href={card.href}
                className="group flex flex-col rounded-2xl border border-neutral-200 bg-white p-7 md:p-8 shadow-sm hover:shadow-lg hover:border-[#66C6E8]/50 transition-all"
              >
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#66C6E8]/15 text-[#2a7a96] group-hover:bg-[#66C6E8]/25 transition-colors">
                  <Icon size={20} />
                </div>
                <p className="text-xs uppercase tracking-widest text-[#66C6E8] font-semibold mb-2">
                  {card.eyebrow}
                </p>
                <h2 className="text-xl md:text-2xl font-semibold text-neutral-900 mb-3">
                  {card.title}
                </h2>
                <p className="text-sm text-neutral-600 leading-relaxed flex-1 mb-6">
                  {card.body}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 group-hover:text-[#2a7a96]">
                  {card.cta}
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            );
          })}
        </div>

        <div className="max-w-5xl mx-auto mb-10">
          <Link
            href="/conseil"
            className="group flex flex-col sm:flex-row sm:items-center gap-4 rounded-2xl border border-dashed border-neutral-300 bg-neutral-50/80 px-6 py-5 md:px-8 md:py-6 hover:border-[#66C6E8]/60 hover:bg-white transition-all"
          >
            <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#66C6E8]/15 text-[#2a7a96]">
              <BookOpen size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs uppercase tracking-widest text-[#66C6E8] font-semibold mb-1">
                Éditorial
              </p>
              <h2 className="text-base md:text-lg font-semibold text-neutral-900 mb-1">
                Conseil
              </h2>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Repères élégants pour placer l&apos;art mural dans vos espaces professionnels.
              </p>
            </div>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 group-hover:text-[#2a7a96] shrink-0">
              Lire les conseils
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </span>
          </Link>
        </div>

        <div className="text-center max-w-md mx-auto">
          <Link
            href="/besoin-conseil"
            className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-800 transition-colors"
          >
            <HelpCircle size={16} />
            Je ne sais pas encore
          </Link>
        </div>
      </div>
    </div>
  );
}
