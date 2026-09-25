import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/data/campaigns";

export const metadata: Metadata = {
  title: `Supports d'impression | ${BRAND.name}`,
  description:
    "Toile, aluminium, acrylique, poster — choisir le support selon le lieu. L'œuvre Inkia, l'impression orchestrée, ou le fichier pour imprimer soi-même.",
};

type Support = {
  id: string;
  name: string;
  essence: string;
  feel: string;
  shines: string[];
  prefer: string;
  caution?: string;
};

const SUPPORTS: Support[] = [
  {
    id: "toile",
    name: "Toile tendue",
    essence:
      "Impression sur toile polyester tendue à la main sur châssis bois (épicéa FSC). Rendu galerie, mat et texturé.",
    feel: "Chaleureux, peu de reflets, présence d'un tableau d'atelier.",
    shines: [
      "Lobby d'hôtel, salon d'accueil",
      "Chambre, suite, spa (hors zones humides)",
      "Bureau direction, salle de réunion",
      "Grand format mural, récit d'espace",
    ],
    prefer:
      "Quand l'œuvre doit habiter le lieu sans glare — lumière douce, distances de vision variables, ton exclusif.",
    caution:
      "Sensible à l'humidité : éviter salles de bain, cuisines très humides, nettoyage humide.",
  },
  {
    id: "aluminium",
    name: "Aluminium",
    essence:
      "Tirage sur panneau aluminium (type dibond) — surface plane, nette, contemporaine.",
    feel: "Léger, précis, look industriel chic ; tient mieux l'humidité que la toile.",
    shines: [
      "Cuisine, office, zones techniques propres",
      "Salle d'eau / spa (hors projection directe)",
      "Couloirs, open spaces, signalétique premium",
      "Ambiances contemporaines, lumière contrôlée",
    ],
    prefer:
      "Quand le lieu demande durabilité et ligne moderne — sans sacrifier la lecture de l'image.",
    caution: "Attention aux spots frontaux : la surface peut renvoyer la lumière.",
  },
  {
    id: "acrylique",
    name: "Acrylique / plexiglas",
    essence:
      "Impression derrière verre acrylique — profondeur, saturation, finition premium.",
    feel: "Brillant, intensité des couleurs, présence « bijou » sur le mur.",
    shines: [
      "Réception prestige, lobby signature",
      "Showroom, boutique, espace de marque",
      "Zones à forte lumière ambiante (hors face aux spots)",
      "Formats moyens à grands, point focal",
    ],
    prefer:
      "Quand l'œuvre doit capturer le regard — éclat, contraste, statut.",
    caution:
      "Reflets : éviter l'accrochage face à des spots ou une baie très lumineuse.",
  },
  {
    id: "plexi-alu",
    name: "Plexi + aluminium",
    essence:
      "Combinaison plexiglas et aluminium — rigidité de l'alu, profondeur du plexi.",
    feel: "Premium structuré, prêt à poser, présence affirmée.",
    shines: [
      "Lieux d'image de marque",
      "Grands formats demandant tenue mécanique",
      "Espaces où l'on veut un rendu « musée » sans cadre visible",
    ],
    prefer:
      "Quand le format ou le lieu exige robustesse et rendu haut de gamme réunis.",
  },
  {
    id: "poster",
    name: "Poster / papier fine art",
    essence:
      "Tirage papier — léger, à encadrer selon le projet (caisse américaine, verre, etc.).",
    feel: "Souple, précis, discret — la mise en cadre fait le décorum.",
    shines: [
      "Projets temporaires ou évolutifs",
      "Séries, corridors, chambres multiples",
      "Quand l'encadrement est déjà choisi sur place",
    ],
    prefer:
      "Quand l'économie du support imprimé compte, ou quand le cadre est une pièce du lieu.",
  },
];

const ENVIRONMENTS: { title: string; lead: string; supports: string }[] = [
  {
    title: "Hôtel & accueil",
    lead: "Lobby, réception, suites — l'œuvre donne le ton dès l'entrée.",
    supports:
      "Toile pour la chaleur d'un salon d'hôtel ; acrylique ou plexi+alu pour un point focal signature ; aluminium dans les circulations.",
  },
  {
    title: "Spa & bien-être",
    lead: "Lumière douce, matériaux nobles — l'image doit apaiser sans s'imposer.",
    supports:
      "Toile hors zones humides ; aluminium près des bassins (hors projection) ; éviter l'acrylique face aux spots.",
  },
  {
    title: "Bureau & corporate",
    lead: "Réunion, direction, open space — présence claire, lecture nette à distance.",
    supports:
      "Aluminium et toile grand format ; acrylique pour la salle de prestige ; poster encadré pour les séries de plateaux.",
  },
  {
    title: "Humidité & lumière",
    lead: "Cuisine, salles d'eau, baies vitrées — le support suit la contrainte.",
    supports:
      "Préférer aluminium (humidité) ; garder la toile au sec ; placer l'acrylique hors reflets directs.",
  },
];

export default function SupportsPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Bandeau titre — même langue visuelle que collection / conseil */}
      <div className="bg-neutral-950 text-white py-12 md:py-16">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <p className="text-sm uppercase tracking-widest text-[#C4A35A] font-semibold mb-2">
            En situation
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Supports d&apos;impression
          </h1>
          <p className="text-neutral-400 mb-2 leading-relaxed">
            L&apos;œuvre Inkia est la création. Le support suit le lieu et le
            format — sans grille catalogue, sans friction.
          </p>
          <p className="text-neutral-500 text-sm">
            Référence de filière : familles murales type{" "}
            <a
              href="https://www.monoeuvre.fr/decoration-murale/photo-sur-toile.jsf"
              className="text-[#66C6E8] hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              MonOeuvre
            </a>{" "}
            (toile, alu, acrylique, poster) — partenaires selon projet, pas une
            exclusivité figée.
          </p>
        </div>
      </div>

      {/* Modèle Inkia */}
      <section className="py-14 md:py-16 border-b border-neutral-200 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <p className="text-sm uppercase tracking-widest text-[#66C6E8] font-semibold mb-2 text-center">
            Le modèle Inkia
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 text-center mb-10">
            Trois temps, une proposition
          </h2>
          <ol className="space-y-8">
            <li className="flex gap-4">
              <span className="shrink-0 w-10 h-10 rounded-full bg-neutral-950 text-white flex items-center justify-center text-sm font-bold">
                1
              </span>
              <div>
                <h3 className="font-semibold text-neutral-900 mb-1">
                  L&apos;œuvre
                </h3>
                <p className="text-neutral-600 text-sm md:text-base leading-relaxed">
                  Le travail Inkia : l&apos;image, le regard, la pièce unique
                  pour votre espace. C&apos;est le cœur de la proposition —
                  pas un produit rayon.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="shrink-0 w-10 h-10 rounded-full bg-neutral-950 text-white flex items-center justify-center text-sm font-bold">
                2
              </span>
              <div>
                <h3 className="font-semibold text-neutral-900 mb-1">
                  Support &amp; impression
                </h3>
                <p className="text-neutral-600 text-sm md:text-base leading-relaxed">
                  Inkia orchestre l&apos;impression via des partenaires adaptés
                  au lieu et à la taille. MonOeuvre illustre une filière de
                  supports muraux ; d&apos;autres ateliers peuvent intervenir
                  selon le projet.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="shrink-0 w-10 h-10 rounded-full bg-neutral-950 text-white flex items-center justify-center text-sm font-bold">
                3
              </span>
              <div>
                <h3 className="font-semibold text-neutral-900 mb-1">
                  Option « J&apos;imprime moi-même »
                </h3>
                <p className="text-neutral-600 text-sm md:text-base leading-relaxed">
                  Vous recevez le fichier haute définition. Vous économisez le
                  coût du support imprimé — utile si vous avez déjà un tireur,
                  un encadreur, ou une contrainte logistique sur site. Les
                  montants se précisent au devis, après qualification — jamais
                  en grille publique.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* Environnements */}
      <section className="py-14 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <p className="text-sm uppercase tracking-widest text-[#C4A35A] font-semibold mb-2 text-center">
            Selon le lieu
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 text-center mb-3">
            Environnements × supports
          </h2>
          <p className="text-neutral-600 text-center max-w-2xl mx-auto mb-10 text-sm md:text-base">
            On ne choisit pas un support « en catalogue » : on le choisit en
            situation — lumière, humidité, distance de vision, geste d&apos;accueil.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {ENVIRONMENTS.map((env) => (
              <article
                key={env.title}
                className="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm"
              >
                <h3 className="font-semibold text-neutral-900 mb-2">
                  {env.title}
                </h3>
                <p className="text-neutral-600 text-sm mb-3 leading-relaxed">
                  {env.lead}
                </p>
                <p className="text-neutral-500 text-sm leading-relaxed border-t border-neutral-100 pt-3">
                  {env.supports}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Familles de supports */}
      <section className="py-14 md:py-16 bg-white border-y border-neutral-200">
        <div className="container mx-auto px-4 max-w-3xl">
          <p className="text-sm uppercase tracking-widest text-[#66C6E8] font-semibold mb-2 text-center">
            Familles murales
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 text-center mb-10">
            Ce que chaque support apporte
          </h2>
          <div className="space-y-10">
            {SUPPORTS.map((s) => (
              <article
                key={s.id}
                id={s.id}
                className="scroll-mt-20 border-b border-neutral-100 pb-10 last:border-0 last:pb-0"
              >
                <h3 className="text-xl font-bold text-neutral-900 mb-2">
                  {s.name}
                </h3>
                <p className="text-neutral-700 text-sm md:text-base leading-relaxed mb-3">
                  {s.essence}
                </p>
                <p className="text-neutral-600 text-sm italic mb-4">{s.feel}</p>
                <p className="text-xs uppercase tracking-wider text-neutral-400 mb-2">
                  Où il brille
                </p>
                <ul className="list-disc list-inside text-sm text-neutral-600 space-y-1 mb-4">
                  {s.shines.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
                <p className="text-sm text-neutral-800 leading-relaxed">
                  <span className="font-medium">Quand le préférer — </span>
                  {s.prefer}
                </p>
                {s.caution ? (
                  <p className="text-sm text-neutral-500 mt-2 leading-relaxed">
                    <span className="font-medium text-neutral-600">
                      À noter —{" "}
                    </span>
                    {s.caution}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
          <p className="mt-10 text-xs text-neutral-400 text-center max-w-xl mx-auto leading-relaxed">
            Détails techniques de référence (toile ~285&nbsp;g/m², châssis 2&nbsp;cm /
            4&nbsp;cm, bords pli / miroir / étiré / blanc / noir, option caisse
            américaine) : voir la filière MonOeuvre. Inkia départage le support
            au moment du projet — pas avant.
          </p>
        </div>
      </section>

      {/* Auto-impression */}
      <section className="py-14 md:py-16">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <p className="text-sm uppercase tracking-widest text-[#C4A35A] font-semibold mb-2">
            Liberté de production
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
            J&apos;imprime moi-même
          </h2>
          <p className="text-neutral-600 text-sm md:text-base leading-relaxed mb-6">
            L&apos;œuvre reste Inkia. Le fichier vous est remis pour tirage chez
            votre prestataire ou en interne. C&apos;est une économie sur le
            support imprimé — pas un rabais catalogue. La proposition chiffrée
            arrive après échange sur le lieu, le format et le niveau de
            finition.
          </p>
          <Link
            href="/personnaliser"
            className="inline-block px-5 py-2.5 rounded-md border border-neutral-300 text-sm font-medium text-neutral-900 hover:bg-white transition-colors"
          >
            Personnaliser une œuvre
          </Link>
        </div>
      </section>

      {/* CTA soft */}
      <section className="py-14 md:py-16 bg-neutral-950 text-white">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Parlons de votre lieu
          </h2>
          <p className="text-neutral-400 mb-8 text-sm md:text-base leading-relaxed">
            Une proposition sur mesure — œuvre, support, ou fichier seul.
            Sans grille tarifaire publique : un devis après qualification.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-md bg-[#66C6E8] text-neutral-950 font-semibold text-sm"
            >
              Nous contacter
            </Link>
            <Link
              href="/personnaliser"
              className="px-5 py-2.5 rounded-md border border-white/30 text-sm hover:bg-white/10"
            >
              Personnaliser
            </Link>
            <Link
              href="/proposition-deco"
              className="px-5 py-2.5 rounded-md border border-white/30 text-sm hover:bg-white/10"
            >
              Proposition déco
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
