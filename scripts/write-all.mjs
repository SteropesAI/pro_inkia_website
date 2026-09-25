import fs from "fs";
import path from "path";

const root = process.argv[2] || process.cwd();
function w(rel, content) {
  const p = path.join(root, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content.replace(/\r?\n/g, "\n"), "utf8");
  console.log("wrote", rel);
}

// ========== data/promptMapping.ts ==========
w("data/promptMapping.ts", `/**
 * Prompt mapping for /personnaliser wizard.
 * Technical Midjourney fragments stay server-side only.
 * Client only ever sees FR labels (id → label).
 */

export type StyleFamilyId =
  | "abstrait"
  | "figuratif_portrait"
  | "figuratif_espace"
  | "afro_contemporain"
  | "minimal_zen"
  | "expressionniste"
  | "alcohol_ink"
  | "neo_classique";

export type InspirationId =
  | "nature_delicate"
  | "nature_force"
  | "aquatic_dream"
  | "vegetal_life"
  | "crystal_mystery"
  | "silk_web";

export type AmbianceId =
  | "luxury_classic"
  | "modern_bold"
  | "sensual_organic"
  | "powerful_dramatic";

export type CouleurId =
  | "golden_warmth"
  | "jewel_luxury"
  | "dark_sophistication"
  | "natural_earth"
  | "royal_majesty"
  | "aurora_magic";

export type TailleId =
  | "small_intimate"
  | "medium_balanced"
  | "large_statement"
  | "xl_masterpiece";

export interface OptionMeta {
  id: string;
  label: string;
  /** Placeholder / vignette under public/wizard/ */
  thumb: string;
  /** CSS accent for placeholder card */
  accent?: string;
}

export const STYLE_FAMILIES: (OptionMeta & { id: StyleFamilyId; blurb: string })[] = [
  {
    id: "abstrait",
    label: "Abstrait",
    blurb: "Textures et motifs organiques, sans figure.",
    thumb: "/wizard/style-abstrait.svg",
    accent: "#4FA8C6",
  },
  {
    id: "figuratif_portrait",
    label: "Portrait stylisé",
    blurb: "Visage comme toile, motifs sur la peau.",
    thumb: "/wizard/style-figuratif-portrait.svg",
    accent: "#C4A35A",
  },
  {
    id: "figuratif_espace",
    label: "Figuratif / espace",
    blurb: "Composition murale pour intérieur pro.",
    thumb: "/wizard/style-figuratif-espace.svg",
    accent: "#66C6E8",
  },
  {
    id: "afro_contemporain",
    label: "Afro-contemporain",
    blurb: "Motifs culturels réinterprétés.",
    thumb: "/wizard/style-afro.svg",
    accent: "#E85D3B",
  },
  {
    id: "minimal_zen",
    label: "Minimal zen",
    blurb: "Sumi-e, espace négatif, calme.",
    thumb: "/wizard/style-zen.svg",
    accent: "#A3A3A3",
  },
  {
    id: "expressionniste",
    label: "Expressionniste",
    blurb: "Mouvement, impact, énergie du geste.",
    thumb: "/wizard/style-expressionniste.svg",
    accent: "#D4AF37",
  },
  {
    id: "alcohol_ink",
    label: "Alcohol ink",
    blurb: "Fluides métalliques, veines luxueuses.",
    thumb: "/wizard/style-alcohol.svg",
    accent: "#9B59B6",
  },
  {
    id: "neo_classique",
    label: "Néo-classique",
    blurb: "Clair-obscur, grandeur picturale.",
    thumb: "/wizard/style-neo.svg",
    accent: "#F0B429",
  },
];

export const INSPIRATIONS: (OptionMeta & { id: InspirationId })[] = [
  { id: "nature_delicate", label: "Délicatesse Naturelle", thumb: "/wizard/insp-nature-delicate.svg", accent: "#7EB8A2" },
  { id: "nature_force", label: "Force de la Nature", thumb: "/wizard/insp-nature-force.svg", accent: "#8B5A2B" },
  { id: "aquatic_dream", label: "Rêve Aquatique", thumb: "/wizard/insp-aquatic.svg", accent: "#2E86AB" },
  { id: "vegetal_life", label: "Vie Végétale", thumb: "/wizard/insp-vegetal.svg", accent: "#4A7C59" },
  { id: "crystal_mystery", label: "Mystère Cristallin", thumb: "/wizard/insp-crystal.svg", accent: "#9BB7D4" },
  { id: "silk_web", label: "Tissage Délicat", thumb: "/wizard/insp-silk.svg", accent: "#D4C4A8" },
];

export const AMBIANCES: (OptionMeta & { id: AmbianceId })[] = [
  { id: "luxury_classic", label: "Élégance Intemporelle", thumb: "/wizard/amb-luxury.svg", accent: "#C4A35A" },
  { id: "modern_bold", label: "Modernité Audacieuse", thumb: "/wizard/amb-modern.svg", accent: "#4FA8C6" },
  { id: "sensual_organic", label: "Sensualité Organique", thumb: "/wizard/amb-sensual.svg", accent: "#C47A6A" },
  { id: "powerful_dramatic", label: "Puissance Dramatique", thumb: "/wizard/amb-dramatic.svg", accent: "#8B1E1E" },
];

export const COULEURS: (OptionMeta & { id: CouleurId; swatches: string[] })[] = [
  {
    id: "golden_warmth",
    label: "Chaleur Dorée",
    thumb: "/wizard/col-golden.svg",
    swatches: ["#B8860B", "#1A1A1A", "#FFFFF0"],
  },
  {
    id: "jewel_luxury",
    label: "Luxe de Pierres Précieuses",
    thumb: "/wizard/col-jewel.svg",
    swatches: ["#0F52BA", "#C0C0C0", "#F8F8FF"],
  },
  {
    id: "dark_sophistication",
    label: "Sophistication Sombre",
    thumb: "/wizard/col-dark.svg",
    swatches: ["#0B0B0B", "#D4AF37", "#6B6B6B"],
  },
  {
    id: "natural_earth",
    label: "Terres Naturelles",
    thumb: "/wizard/col-earth.svg",
    swatches: ["#5C4033", "#C4A35A", "#F5F0E6"],
  },
  {
    id: "royal_majesty",
    label: "Majesté Royale",
    thumb: "/wizard/col-royal.svg",
    swatches: ["#4B0082", "#D4AF37", "#FFFFF0"],
  },
  {
    id: "aurora_magic",
    label: "Magie d'Aurore",
    thumb: "/wizard/col-aurora.svg",
    swatches: ["#CC7722", "#FF7F50", "#F7E7CE"],
  },
];

export const TAILLES: (OptionMeta & { id: TailleId; cm: string; aspect: string })[] = [
  { id: "small_intimate", label: "Intimité Précieuse", cm: "40×60 cm", aspect: "4:3", thumb: "/wizard/size-s.svg", accent: "#66C6E8" },
  { id: "medium_balanced", label: "Équilibre Parfait", cm: "60×90 cm", aspect: "16:9", thumb: "/wizard/size-m.svg", accent: "#4FA8C6" },
  { id: "large_statement", label: "Déclaration Audacieuse", cm: "80×120 cm", aspect: "16:9", thumb: "/wizard/size-l.svg", accent: "#C4A35A" },
  { id: "xl_masterpiece", label: "Chef-d'œuvre Monumental", cm: "100×150 cm", aspect: "16:9", thumb: "/wizard/size-xl.svg", accent: "#D4AF37" },
];

/** Technical pools — never expose to client */
export const ELEMENT_POOLS: Record<InspirationId, string[]> = {
  nature_delicate: [
    "butterfly wing scales",
    "butterfly wing patterns",
    "peacock feather barbs",
    "bird feather microstructure",
    "bee wing transparency",
  ],
  nature_force: [
    "snake skin scales",
    "crocodile scales",
    "lizard skin texture",
    "gecko toe pads",
  ],
  aquatic_dream: [
    "fish scale iridescence",
    "jellyfish translucency",
    "octopus skin patterns",
    "coral reef structure",
  ],
  vegetal_life: [
    "flower petal cellular structure",
    "leaf vein patterns",
    "tree bark texture",
    "moss microstructure",
  ],
  crystal_mystery: [
    "crystal formation patterns",
    "mineral crystal faces",
    "ice crystal patterns",
    "salt crystal formation",
  ],
  silk_web: [
    "spider web dewdrops",
    "silk fiber structure",
    "spider web geometry",
    "cocoon silk threads",
  ],
};

export const ADJECTIVE_POOLS: Record<AmbianceId, string[]> = {
  luxury_classic: ["luxury", "elegant", "sophisticated", "refined"],
  modern_bold: ["contemporary", "sleek", "bold", "innovative"],
  sensual_organic: ["sensual", "organic", "flowing", "graceful"],
  powerful_dramatic: ["dramatic", "striking", "powerful", "intense"],
};

export const COLOR_PALETTE_POOLS: Record<CouleurId, string[]> = {
  golden_warmth: [
    "deep gold, charcoal black, ivory white",
    "rose gold, burgundy velvet, cream silk",
    "champagne gold, midnight navy, pearl white",
  ],
  jewel_luxury: [
    "sapphire blue, silver, crystal white",
    "emerald green, gold, rich cream",
    "ruby red, platinum, soft gray",
  ],
  dark_sophistication: [
    "obsidian black, gold leaf, smoke gray",
    "graphite gray, platinum, winter white",
    "raven black, pearl, soft champagne",
  ],
  natural_earth: [
    "truffle brown, gold, cream cashmere",
    "sage green, silver, alabaster",
    "warm taupe, copper, vanilla",
  ],
  royal_majesty: [
    "royal purple, gold, ivory",
    "imperial blue, silver, arctic white",
    "burgundy wine, gold, parchment",
  ],
  aurora_magic: [
    "burnt gold, deep coral, champagne",
    "twilight purple, silver, soft pink",
    "sunset orange, bronze, cream",
  ],
};

export const ASPECT_BY_TAILLE: Record<TailleId, string> = {
  small_intimate: "4:3",
  medium_balanced: "16:9",
  large_statement: "16:9",
  xl_masterpiece: "16:9",
};

export const STYLE_TAG_POOL = [
  "editorial fine-art",
  "painterly",
  "hyper-detailed illustrative",
] as const;

export const SPACE_POOL = [
  "beauty salon",
  "spa",
  "hotel lobby",
  "coworking",
  "restaurant",
] as const;

export const MOTIF_POOL = [
  "Adinkra symbols",
  "Bamum mask geometry",
  "Ge'ez letterforms as pattern",
  "textile weave patterns",
] as const;

export interface WizardSelection {
  styleFamily: StyleFamilyId;
  inspiration: InspirationId;
  ambiance: AmbianceId;
  couleur: CouleurId;
  taille: TailleId;
}

export function labelFor(
  kind: "style" | "inspiration" | "ambiance" | "couleur" | "taille",
  id: string
): string {
  const lists = {
    style: STYLE_FAMILIES,
    inspiration: INSPIRATIONS,
    ambiance: AMBIANCES,
    couleur: COULEURS,
    taille: TAILLES,
  } as const;
  const found = lists[kind].find((o) => o.id === id);
  return found?.label ?? id;
}

export function cmForTaille(id: TailleId): string {
  return TAILLES.find((t) => t.id === id)?.cm ?? "";
}
`);

console.log("promptMapping written");

// ========== lib/buildPrompt.ts ==========
w("lib/buildPrompt.ts", `/**
 * Server-only Midjourney prompt builder.
 * Never import this module from client components.
 */

import {
  type WizardSelection,
  type StyleFamilyId,
  ELEMENT_POOLS,
  ADJECTIVE_POOLS,
  COLOR_PALETTE_POOLS,
  ASPECT_BY_TAILLE,
  STYLE_TAG_POOL,
  SPACE_POOL,
  MOTIF_POOL,
  labelFor,
  cmForTaille,
} from "@/data/promptMapping";

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}

function templateFor(
  family: StyleFamilyId,
  vars: {
    element: string;
    colors: string;
    adjective: string;
    aspect: string;
    styleTag: string;
    space: string;
    motif: string;
  }
): string {
  const { element, colors, adjective, aspect, styleTag, space, motif } = vars;
  switch (family) {
    case "figuratif_portrait":
      return \`\${styleTag} portrait of a person, face as canvas, \${element} motifs across skin, \${colors}, \${adjective} aesthetic, gallery wall art, high detail --ar \${aspect} --v 6.1\`;
    case "figuratif_espace":
      return \`fine art wall piece for \${space}, abstract-figurative composition with \${element}, \${colors}, \${adjective} mood, designed to hang in professional interior, high detail --ar \${aspect} --v 6.1\`;
    case "afro_contemporain":
      return \`contemporary African-inspired fine art, \${element} reinterpreted with \${motif}, \${colors}, \${adjective} aesthetic, museum quality print, high detail --ar \${aspect} --v 6.1\`;
    case "minimal_zen":
      return \`minimal \${element} in sumi-e ink wash style, vast negative space, \${colors}, \${adjective} calm, Japanese aesthetic, high detail --ar \${aspect} --v 6.1\`;
    case "expressionniste":
      return \`expressionist painting of motion and impact, \${element}, explosive brushwork, \${colors}, \${adjective} energy, fine art canvas, high detail --ar \${aspect} --v 6.1\`;
    case "alcohol_ink":
      return \`alcohol ink abstract, flowing \${element}, metallic veins, \${colors}, \${adjective} atmosphere, luxury wall art, high detail --ar \${aspect} --v 6.1\`;
    case "neo_classique":
      return \`neo-classical fine art composition inspired by \${element}, chiaroscuro lighting, \${colors}, \${adjective} grandeur, oil painting look, high detail --ar \${aspect} --v 6.1\`;
    case "abstrait":
    default:
      return \`abstract art inspired by \${element}, \${colors}, \${adjective} aesthetic, high detail --ar \${aspect} --v 6.1\`;
  }
}

export function buildPrompt(selection: WizardSelection): string {
  const element = pick(ELEMENT_POOLS[selection.inspiration]);
  const adjective = pick(ADJECTIVE_POOLS[selection.ambiance]);
  const colors = pick(COLOR_PALETTE_POOLS[selection.couleur]);
  const aspect = ASPECT_BY_TAILLE[selection.taille];
  const styleTag = pick(STYLE_TAG_POOL);
  const space = pick(SPACE_POOL);
  const motif = pick(MOTIF_POOL);
  return templateFor(selection.styleFamily, {
    element,
    colors,
    adjective,
    aspect,
    styleTag,
    space,
    motif,
  });
}

export interface SummaryLabels {
  styleFamily: string;
  inspiration: string;
  ambiance: string;
  couleur: string;
  taille: string;
  cm: string;
}

export function buildSummaryLabels(selection: WizardSelection): SummaryLabels {
  return {
    styleFamily: labelFor("style", selection.styleFamily),
    inspiration: labelFor("inspiration", selection.inspiration),
    ambiance: labelFor("ambiance", selection.ambiance),
    couleur: labelFor("couleur", selection.couleur),
    taille: labelFor("taille", selection.taille),
    cm: cmForTaille(selection.taille),
  };
}

export function isValidSelection(body: unknown): body is WizardSelection {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  const ids = {
    styleFamily: [
      "abstrait",
      "figuratif_portrait",
      "figuratif_espace",
      "afro_contemporain",
      "minimal_zen",
      "expressionniste",
      "alcohol_ink",
      "neo_classique",
    ],
    inspiration: [
      "nature_delicate",
      "nature_force",
      "aquatic_dream",
      "vegetal_life",
      "crystal_mystery",
      "silk_web",
    ],
    ambiance: [
      "luxury_classic",
      "modern_bold",
      "sensual_organic",
      "powerful_dramatic",
    ],
    couleur: [
      "golden_warmth",
      "jewel_luxury",
      "dark_sophistication",
      "natural_earth",
      "royal_majesty",
      "aurora_magic",
    ],
    taille: [
      "small_intimate",
      "medium_balanced",
      "large_statement",
      "xl_masterpiece",
    ],
  } as const;
  for (const key of Object.keys(ids) as (keyof typeof ids)[]) {
    if (typeof b[key] !== "string" || !(ids[key] as readonly string[]).includes(b[key] as string)) {
      return false;
    }
  }
  return true;
}
`);

// ========== app/api/personnaliser/route.ts ==========
w("app/api/personnaliser/route.ts", `import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import {
  buildPrompt,
  buildSummaryLabels,
  isValidSelection,
} from "@/lib/buildPrompt";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "JSON invalide" }, { status: 400 });
  }

  if (!isValidSelection(body)) {
    return NextResponse.json({ ok: false, error: "Sélection invalide" }, { status: 400 });
  }

  const prompt = buildPrompt(body);
  const summaryLabels = buildSummaryLabels(body);

  // Steropes ops log — never returned to client
  try {
    const line = JSON.stringify({
      at: new Date().toISOString(),
      selection: body,
      summaryLabels,
      prompt,
    });
    console.log("[personnaliser]", line);
    const logPath = path.join(process.cwd(), ".prompts-log");
    fs.appendFileSync(logPath, line + "\\n", "utf8");
  } catch (err) {
    console.warn("[personnaliser] log write failed", err);
  }

  // CRITICAL: never include \`prompt\` in the JSON response
  return NextResponse.json({ ok: true, summaryLabels });
}
`);

console.log("buildPrompt + api written");

// ========== components/SiteNav.tsx ==========
w("components/SiteNav.tsx", `"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { BRAND } from "@/data/campaigns";

const LINKS: { href: string; label: string; external?: boolean }[] = [
  { href: "/", label: "Accueil" },
  { href: "/collection", label: "Collection" },
  { href: "/personnaliser", label: "Personnaliser" },
  { href: "/avant-apres", label: "Avant/après" },
  { href: "/asso", label: "Associations" },
  { href: "mailto:fatou@inkia.art", label: "Contact", external: true },
];

export default function SiteNav({
  variant = "auto",
}: {
  variant?: "light" | "dark" | "auto";
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const onCampaign = pathname?.startsWith("/c/") ?? false;
  const onWizard =
    pathname === "/personnaliser" || pathname?.startsWith("/personnaliser/");
  const resolved =
    variant === "auto"
      ? onCampaign || onWizard
        ? "dark"
        : "light"
      : variant;
  const dark = resolved === "dark";

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || (pathname?.startsWith(href + "/") ?? false);
  };

  return (
    <nav
      className={\`sticky top-0 z-50 border-b backdrop-blur \${
        dark
          ? "bg-neutral-950/90 border-white/10 text-white"
          : "bg-white/90 border-neutral-200 text-neutral-900"
      }\`}
    >
      <div className="container mx-auto px-4 h-14 flex items-center justify-between gap-4">
        <Link href="/" className="font-bold text-lg tracking-tight shrink-0">
          Ink<span className="text-[#66C6E8]">IA</span>.art
        </Link>

        <ul className="hidden lg:flex items-center gap-0.5 text-sm">
          {LINKS.map((l) => {
            const active = !l.external && isActive(l.href);
            const cls = \`px-3 py-1.5 rounded-md transition-colors \${
              active
                ? dark
                  ? "bg-white/10 text-white font-medium"
                  : "bg-neutral-100 text-neutral-950 font-semibold"
                : dark
                  ? "text-white/75 hover:text-white hover:bg-white/5"
                  : "text-neutral-600 hover:text-neutral-950 hover:bg-neutral-50"
            }\`;
            return (
              <li key={l.href + l.label}>
                {l.external ? (
                  <a href={l.href} className={cls}>
                    {l.label}
                  </a>
                ) : (
                  <Link href={l.href} className={cls}>
                    {l.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        <p
          className={\`hidden xl:block text-xs italic \${
            dark ? "text-white/45" : "text-neutral-400"
          }\`}
        >
          {BRAND.tagline}
        </p>

        <button
          type="button"
          className={\`lg:hidden p-2 rounded-md \${
            dark ? "hover:bg-white/10" : "hover:bg-neutral-100"
          }\`}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open ? (
        <div
          className={\`lg:hidden border-t \${
            dark ? "border-white/10 bg-neutral-950" : "border-neutral-200 bg-white"
          }\`}
        >
          <ul className="container mx-auto px-4 py-3 space-y-1">
            {LINKS.map((l) => (
              <li key={"m-" + l.href + l.label}>
                {l.external ? (
                  <a
                    href={l.href}
                    className="block px-3 py-2.5 rounded-md text-sm"
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </a>
                ) : (
                  <Link
                    href={l.href}
                    className="block px-3 py-2.5 rounded-md text-sm"
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </nav>
  );
}
`);

console.log("SiteNav written");

// ========== components/campaign/CampaignHero.tsx (upgrade) ==========
w("components/campaign/CampaignHero.tsx", `"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Palette, Sparkles, Mail } from "lucide-react";
import type { Campaign } from "@/data/campaigns";
import { BRAND } from "@/data/campaigns";

interface Props {
  campaign: Campaign;
}

export default function CampaignHero({ campaign }: Props) {
  const { heroLines, accent, heroImage, universe, intro, isPlaceholder } = campaign;

  return (
    <section className="relative min-h-[88vh] flex items-end md:items-center overflow-hidden bg-neutral-950 text-white">
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage}
          alt={universe}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/35" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-2xl">
          <p className="text-sm tracking-widest uppercase text-white/70 mb-3">
            {BRAND.name} · {BRAND.tagline}
          </p>
          {isPlaceholder && (
            <p className="mb-4 inline-block rounded bg-amber-500/20 border border-amber-400/40 px-3 py-1 text-xs text-amber-200">
              Code placeholder — à remplacer par le code QR réel de la carte
            </p>
          )}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
            <span className="block">{heroLines.line1}</span>
            <span className="block font-normal italic text-white/90">
              {heroLines.line2}
            </span>
            <span className="block" style={{ color: accent }}>
              {heroLines.line3}
            </span>
          </h1>
          <p
            className="text-lg md:text-xl italic mb-2"
            style={{ color: campaign.accentSecondary }}
          >
            {universe}
          </p>
          <p className="text-neutral-300 mb-4 max-w-xl">{intro}</p>
          <p className="text-neutral-400 text-sm md:text-base mb-10 max-w-xl leading-relaxed">
            Votre espace parle déjà — la carte a ouvert la conversation ;
            le mur la termine. Deux chemins clairs : une collection prête à
            poser, ou une création sur-mesure guidée. Sans jargon, avec un
            contact humain.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            <Link
              href="#collection"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md font-semibold text-neutral-950 transition-opacity hover:opacity-90"
              style={{ backgroundColor: accent }}
            >
              <Palette size={18} />
              Voir la collection
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/personnaliser"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md font-semibold border border-white/80 bg-white/5 hover:bg-white/15 transition-colors"
            >
              <Sparkles size={18} />
              Personnaliser
            </Link>
            <a
              href={\`mailto:\${BRAND.email}?subject=\${encodeURIComponent(
                \`[Contact] \${campaign.universe} — code \${campaign.code}\`
              )}\`}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md font-semibold border border-white/40 text-white/90 hover:bg-white/10 transition-colors"
            >
              <Mail size={18} />
              Contacter Fatou
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
`);

// ========== components/campaign/SalesArguments.tsx ==========
w("components/campaign/SalesArguments.tsx", `import React from "react";
import Link from "next/link";
import type { Campaign } from "@/data/campaigns";
import { BRAND } from "@/data/campaigns";

const ARGS = [
  {
    title: "Votre espace parle déjà",
    body: "La carte a ouvert la conversation ; le mur la termine. Un tableau posé au bon endroit prolonge l'expérience de vos clients.",
  },
  {
    title: "En situation, pas en catalogue",
    body: "Les curseurs avant/après montrent la transformation réelle — preuve visuelle, sans discours abstrait.",
  },
  {
    title: "Deux chemins clairs",
    body: "Collection prête à poser, ou création sur-mesure guidée étape par étape. Vous choisissez le rythme.",
  },
  {
    title: "Univers professionnel",
    body: "Bien-être, beauté, rencontre : on parle le langage de votre métier, pas de la déco générique.",
  },
  {
    title: "Marque InkIA",
    body: \`\${BRAND.tagline}. Une signature artistique, un contact humain — Fatou vous accompagne.\`,
  },
  {
    title: "Sans friction",
    body: "Scan → page dédiée → choix. Pas de jargon technique côté client.",
  },
];

export default function SalesArguments({ campaign }: { campaign: Campaign }) {
  return (
    <section className="py-16 bg-neutral-950 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <p className="text-sm uppercase tracking-widest mb-2" style={{ color: campaign.accent }}>
            Pourquoi InkIA
          </p>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            L&apos;art qui termine la conversation
          </h2>
          <p className="text-neutral-400 text-sm md:text-base">
            Des arguments simples, un ton calme — pour décider sereinement.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto mb-10">
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
            Collection
          </Link>
          <Link
            href="/personnaliser"
            className="inline-flex justify-center px-6 py-3 rounded-md font-semibold border border-white/50 hover:bg-white/10"
          >
            Personnaliser
          </Link>
          <a
            href={\`mailto:\${BRAND.email}\`}
            className="inline-flex justify-center px-6 py-3 rounded-md font-semibold border border-white/30 text-white/80 hover:bg-white/5"
          >
            Contacter
          </a>
        </div>
      </div>
    </section>
  );
}
`);

// ========== components/campaign/PersonalizeCTA.tsx ==========
w("components/campaign/PersonalizeCTA.tsx", `import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import type { Campaign } from "@/data/campaigns";

export default function PersonalizeCTA({ campaign }: { campaign: Campaign }) {
  return (
    <section id="personnalise" className="py-20 bg-white scroll-mt-8">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center rounded-2xl border border-neutral-200 bg-neutral-50 px-6 py-12 md:px-12">
          <p
            className="text-sm uppercase tracking-widest font-semibold mb-3"
            style={{ color: campaign.accent }}
          >
            Création sur-mesure
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Personnalisez votre œuvre
          </h2>
          <div
            className="w-16 h-1 mx-auto mb-5"
            style={{ backgroundColor: campaign.accent }}
          />
          <p className="text-neutral-600 mb-8 max-w-xl mx-auto">
            Un parcours guidé en quelques étapes : style, inspiration, ambiance,
            couleurs, format. Vous recevez un récapitulatif clair — Fatou
            prépare ensuite la proposition.
          </p>
          <Link
            href="/personnaliser"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-md font-semibold text-neutral-950 transition-opacity hover:opacity-90"
            style={{ backgroundColor: campaign.accent }}
          >
            <Sparkles size={18} />
            Lancer le questionnaire
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
`);

console.log("campaign components written");

// ========== components/wizard/PersonnaliserWizard.tsx ==========
w("components/wizard/PersonnaliserWizard.tsx", `"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Mail } from "lucide-react";
import {
  STYLE_FAMILIES,
  INSPIRATIONS,
  AMBIANCES,
  COULEURS,
  TAILLES,
  type StyleFamilyId,
  type InspirationId,
  type AmbianceId,
  type CouleurId,
  type TailleId,
} from "@/data/promptMapping";
import { BRAND } from "@/data/campaigns";

type Step = 0 | 1 | 2 | 3 | 4 | 5;

const STEP_LABELS = [
  "Style",
  "Inspiration",
  "Ambiance",
  "Couleurs",
  "Taille",
  "Récap",
] as const;

interface SummaryLabels {
  styleFamily: string;
  inspiration: string;
  ambiance: string;
  couleur: string;
  taille: string;
  cm: string;
}

function OptionCard({
  selected,
  onClick,
  thumb,
  label,
  blurb,
  accent,
  swatches,
  sub,
}: {
  selected: boolean;
  onClick: () => void;
  thumb: string;
  label: string;
  blurb?: string;
  accent?: string;
  swatches?: string[];
  sub?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={\`text-left rounded-xl border overflow-hidden transition-all \${
        selected
          ? "border-[#66C6E8] ring-2 ring-[#66C6E8]/40 bg-white/10"
          : "border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]"
      }\`}
    >
      <div
        className="relative aspect-square"
        style={{ background: accent ? \`linear-gradient(145deg, \${accent}55, #0a0a0a)\` : "#111" }}
      >
        <Image src={thumb} alt="" fill className="object-cover opacity-90" sizes="200px" />
      </div>
      <div className="p-3">
        <p className="font-semibold text-sm text-white flex items-center gap-2">
          {selected ? <Check size={14} className="text-[#66C6E8] shrink-0" /> : null}
          {label}
        </p>
        {blurb ? <p className="text-xs text-neutral-400 mt-1 leading-snug">{blurb}</p> : null}
        {sub ? <p className="text-xs text-[#C4A35A] mt-1">{sub}</p> : null}
        {swatches ? (
          <div className="flex gap-1 mt-2">
            {swatches.map((c) => (
              <span
                key={c}
                className="w-4 h-4 rounded-full border border-white/20"
                style={{ background: c }}
              />
            ))}
          </div>
        ) : null}
      </div>
    </button>
  );
}

export default function PersonnaliserWizard() {
  const [step, setStep] = useState<Step>(0);
  const [styleFamily, setStyleFamily] = useState<StyleFamilyId>("abstrait");
  const [inspiration, setInspiration] = useState<InspirationId | null>(null);
  const [ambiance, setAmbiance] = useState<AmbianceId | null>(null);
  const [couleur, setCouleur] = useState<CouleurId | null>(null);
  const [taille, setTaille] = useState<TailleId | null>(null);
  const [summary, setSummary] = useState<SummaryLabels | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canNext = useMemo(() => {
    if (step === 0) return !!styleFamily;
    if (step === 1) return !!inspiration;
    if (step === 2) return !!ambiance;
    if (step === 3) return !!couleur;
    if (step === 4) return !!taille;
    return true;
  }, [step, styleFamily, inspiration, ambiance, couleur, taille]);

  const goNext = async () => {
    setError(null);
    if (step < 4) {
      setStep((s) => (s + 1) as Step);
      return;
    }
    if (step === 4) {
      if (!inspiration || !ambiance || !couleur || !taille) return;
      setSubmitting(true);
      try {
        const res = await fetch("/api/personnaliser", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            styleFamily,
            inspiration,
            ambiance,
            couleur,
            taille,
          }),
        });
        const data = (await res.json()) as {
          ok?: boolean;
          summaryLabels?: SummaryLabels;
          error?: string;
        };
        if (!res.ok || !data.ok || !data.summaryLabels) {
          throw new Error(data.error || "Échec de l'enregistrement");
        }
        // Never expect or display a prompt field
        setSummary(data.summaryLabels);
        setStep(5);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Erreur réseau");
      } finally {
        setSubmitting(false);
      }
    }
  };

  const goBack = () => {
    setError(null);
    if (step > 0) setStep((s) => (s - 1) as Step);
  };

  const mailtoHref = useMemo(() => {
    if (!summary) return \`mailto:\${BRAND.email}\`;
    const subject = encodeURIComponent(
      \`[Personnaliser] \${summary.styleFamily} — \${summary.inspiration}\`
    );
    const body = encodeURIComponent(
      [
        "Bonjour Fatou,",
        "",
        "Voici mon projet d'œuvre personnalisée :",
        "",
        \`Style : \${summary.styleFamily}\`,
        \`Inspiration : \${summary.inspiration}\`,
        \`Ambiance : \${summary.ambiance}\`,
        \`Couleurs : \${summary.couleur}\`,
        \`Format : \${summary.taille} (\${summary.cm})\`,
        "",
        "Merci de me recontacter pour la suite.",
        "",
      ].join("\\n")
    );
    return \`mailto:\${BRAND.email}?subject=\${subject}&body=\${body}\`;
  }, [summary]);

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-neutral-950 text-white">
      <div className="container mx-auto px-4 py-10 md:py-14 max-w-4xl">
        <div className="text-center mb-8">
          <p className="text-sm uppercase tracking-widest text-[#66C6E8] font-semibold mb-2">
            Questionnaire
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Créez votre œuvre unique
          </h1>
          <p className="text-neutral-400 text-sm md:text-base max-w-xl mx-auto">
            Quelques choix guidés. Le récapitulatif reste en français clair —
            Fatou s&apos;occupe du reste.
          </p>
        </div>

        {/* Progress */}
        <ol className="flex flex-wrap justify-center gap-2 mb-10">
          {STEP_LABELS.map((label, i) => {
            const active = step === i;
            const done = step > i;
            return (
              <li
                key={label}
                className={\`text-xs px-2.5 py-1 rounded-full border \${
                  active
                    ? "border-[#66C6E8] text-[#66C6E8] bg-[#66C6E8]/10"
                    : done
                      ? "border-[#C4A35A]/50 text-[#C4A35A]"
                      : "border-white/10 text-neutral-500"
                }\`}
              >
                {i}. {label}
              </li>
            );
          })}
        </ol>

        {/* Steps */}
        {step === 0 && (
          <section>
            <h2 className="text-xl font-semibold mb-2">Quel style d&apos;œuvre ?</h2>
            <p className="text-sm text-neutral-400 mb-6">
              Abstrait par défaut — explorez aussi les autres familles.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {STYLE_FAMILIES.map((o) => (
                <OptionCard
                  key={o.id}
                  selected={styleFamily === o.id}
                  onClick={() => setStyleFamily(o.id)}
                  thumb={o.thumb}
                  label={o.label}
                  blurb={o.blurb}
                  accent={o.accent}
                />
              ))}
            </div>
          </section>
        )}

        {step === 1 && (
          <section>
            <h2 className="text-xl font-semibold mb-2">Inspiration</h2>
            <p className="text-sm text-neutral-400 mb-6">
              Quelle matière ou motif vous attire ?
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {INSPIRATIONS.map((o) => (
                <OptionCard
                  key={o.id}
                  selected={inspiration === o.id}
                  onClick={() => setInspiration(o.id)}
                  thumb={o.thumb}
                  label={o.label}
                  accent={o.accent}
                />
              ))}
            </div>
          </section>
        )}

        {step === 2 && (
          <section>
            <h2 className="text-xl font-semibold mb-2">Ambiance</h2>
            <p className="text-sm text-neutral-400 mb-6">
              Quelle atmosphère pour votre espace ?
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {AMBIANCES.map((o) => (
                <OptionCard
                  key={o.id}
                  selected={ambiance === o.id}
                  onClick={() => setAmbiance(o.id)}
                  thumb={o.thumb}
                  label={o.label}
                  accent={o.accent}
                />
              ))}
            </div>
          </section>
        )}

        {step === 3 && (
          <section>
            <h2 className="text-xl font-semibold mb-2">Couleurs</h2>
            <p className="text-sm text-neutral-400 mb-6">
              Choisissez une palette dominante.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {COULEURS.map((o) => (
                <OptionCard
                  key={o.id}
                  selected={couleur === o.id}
                  onClick={() => setCouleur(o.id)}
                  thumb={o.thumb}
                  label={o.label}
                  swatches={o.swatches}
                />
              ))}
            </div>
          </section>
        )}

        {step === 4 && (
          <section>
            <h2 className="text-xl font-semibold mb-2">Taille</h2>
            <p className="text-sm text-neutral-400 mb-6">
              Formats en centimètres — proposition tarifaire sur demande.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TAILLES.map((o) => (
                <OptionCard
                  key={o.id}
                  selected={taille === o.id}
                  onClick={() => setTaille(o.id)}
                  thumb={o.thumb}
                  label={o.label}
                  sub={o.cm}
                  accent={o.accent}
                />
              ))}
            </div>
          </section>
        )}

        {step === 5 && summary && (
          <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
            <h2 className="text-xl font-semibold mb-2">Votre récapitulatif</h2>
            <p className="text-sm text-neutral-400 mb-6">
              Voici vos choix. Envoyez-les à Fatou pour poursuivre.
            </p>
            <dl className="space-y-3 text-sm mb-8">
              {[
                ["Style", summary.styleFamily],
                ["Inspiration", summary.inspiration],
                ["Ambiance", summary.ambiance],
                ["Couleurs", summary.couleur],
                ["Format", \`\${summary.taille} — \${summary.cm}\`],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 border-b border-white/5 pb-3"
                >
                  <dt className="text-neutral-500 sm:w-28 shrink-0">{k}</dt>
                  <dd className="font-medium text-white">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={mailtoHref}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md font-semibold bg-[#66C6E8] text-neutral-950 hover:opacity-90"
              >
                <Mail size={18} />
                Envoyer à Fatou
              </a>
              <button
                type="button"
                onClick={() => {
                  setStep(0);
                  setSummary(null);
                  setInspiration(null);
                  setAmbiance(null);
                  setCouleur(null);
                  setTaille(null);
                  setStyleFamily("abstrait");
                }}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-md font-semibold border border-white/20 hover:bg-white/5"
              >
                Recommencer
              </button>
              <Link
                href="/collection"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-md text-sm text-neutral-400 hover:text-white"
              >
                Voir la collection
              </Link>
            </div>
          </section>
        )}

        {error ? (
          <p className="mt-4 text-sm text-red-400 text-center">{error}</p>
        ) : null}

        {step < 5 ? (
          <div className="mt-10 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={goBack}
              disabled={step === 0}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md text-sm border border-white/15 disabled:opacity-30 hover:bg-white/5"
            >
              <ArrowLeft size={16} />
              Retour
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={!canNext || submitting}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-md text-sm font-semibold bg-[#66C6E8] text-neutral-950 disabled:opacity-40 hover:opacity-90"
            >
              {step === 4 ? (submitting ? "Enregistrement…" : "Voir le récap") : "Continuer"}
              <ArrowRight size={16} />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
`);

console.log("wizard written");

// ========== Pages ==========
w("app/personnaliser/page.tsx", `import React from "react";
import type { Metadata } from "next";
import PersonnaliserWizard from "@/components/wizard/PersonnaliserWizard";
import { BRAND } from "@/data/campaigns";

export const metadata: Metadata = {
  title: \`Personnaliser | \${BRAND.name}\`,
  description:
    "Créez votre œuvre unique en quelques étapes — style, inspiration, ambiance, couleurs, format.",
};

export default function PersonnaliserPage() {
  return <PersonnaliserWizard />;
}
`);

w("app/collection/page.tsx", `import React from "react";
import type { Metadata } from "next";
import { campaigns, BRAND } from "@/data/campaigns";
import CollectionGallery from "@/components/campaign/CollectionGallery";
import Link from "next/link";

export const metadata: Metadata = {
  title: \`Collection | \${BRAND.name}\`,
  description:
    "Parcourez la galerie InkIA — filtres couleurs et univers professionnels.",
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
            Œuvres prêtes à poser pour vos espaces professionnels. Aucun prix
            affiché — contactez-nous pour une proposition.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/personnaliser"
              className="px-5 py-2.5 rounded-md bg-[#66C6E8] text-neutral-950 font-semibold text-sm"
            >
              Personnaliser
            </Link>
            <Link
              href={\`/c/\${campaign.code}#collection\`}
              className="px-5 py-2.5 rounded-md border border-white/30 text-sm hover:bg-white/10"
            >
              Voir dans un univers carte
            </Link>
          </div>
        </div>
      </div>
      <CollectionGallery campaign={campaign} />
    </div>
  );
}
`);

w("app/avant-apres/page.tsx", `import React from "react";
import type { Metadata } from "next";
import { BRAND } from "@/data/campaigns";
import { avantApresPairs } from "@/data/collection";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import Link from "next/link";

export const metadata: Metadata = {
  title: \`Avant / après | \${BRAND.name}\`,
  description:
    "Faites glisser le curseur — des espaces professionnels sublimés par un tableau Inkia.",
};

export default function AvantApresPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="bg-neutral-950 text-white py-12 md:py-16">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <p className="text-sm uppercase tracking-widest text-[#C4A35A] font-semibold mb-2">
            Preuve visuelle
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Avant / après</h1>
          <p className="text-neutral-400 mb-6">
            En situation, pas en catalogue. Glissez le curseur pour voir la
            transformation.
          </p>
          <Link
            href="/collection"
            className="inline-block px-5 py-2.5 rounded-md bg-[#66C6E8] text-neutral-950 font-semibold text-sm"
          >
            Voir la collection
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
                beforeAlt={\`\${pair.label} — avant\`}
                afterAlt={\`\${pair.label} — après\`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
`);

w("app/layout.tsx", `import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SiteNav from "@/components/SiteNav";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "pro.inkia.art — L'art qui vous ressemble",
  description:
    "Des tableaux exclusifs pour valoriser votre espace professionnel. L'art qui vous ressemble.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={\`\${inter.variable}\`}>
      <body>
        <SiteNav />
        {children}
      </body>
    </html>
  );
}
`);

w("app/c/[code]/page.tsx", `import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCampaignByCode, campaigns, BRAND } from "@/data/campaigns";
import CampaignHero from "@/components/campaign/CampaignHero";
import CollectionGallery from "@/components/campaign/CollectionGallery";
import AvantApresStrip from "@/components/campaign/AvantApresStrip";
import SalesArguments from "@/components/campaign/SalesArguments";
import PersonalizeCTA from "@/components/campaign/PersonalizeCTA";
import CampaignFooter from "@/components/campaign/CampaignFooter";

type PageProps = {
  params: Promise<{ code: string }>;
};

export async function generateStaticParams() {
  return campaigns.map((c) => ({ code: c.code }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { code } = await params;
  const campaign = getCampaignByCode(code);
  if (!campaign) {
    return { title: \`Code inconnu | \${BRAND.name}\` };
  }
  return {
    title: \`\${campaign.universe} | \${BRAND.name}\`,
    description: \`\${campaign.heroLines.line1} \${campaign.heroLines.line2} \${campaign.heroLines.line3} — \${BRAND.tagline}\`,
  };
}

export default async function CampaignPage({ params }: PageProps) {
  const { code } = await params;
  const campaign = getCampaignByCode(code);
  if (!campaign) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <CampaignHero campaign={campaign} />
      <SalesArguments campaign={campaign} />
      <AvantApresStrip campaign={campaign} />
      <CollectionGallery campaign={campaign} />
      <PersonalizeCTA campaign={campaign} />
      <CampaignFooter />
    </div>
  );
}
`);

console.log("pages written");

// ========== Update asso index (remove duplicate header) ==========
w("app/asso/page.tsx", `import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getAvailableAssoCategories } from "@/data/collection";
import { BRAND } from "@/data/campaigns";

export const metadata: Metadata = {
  title: \`Galerie associations | \${BRAND.name}\`,
  description:
    "Tableaux offerts pour les associations — choisissez une catégorie (boxe, karate…) et sélectionnez une œuvre.",
};

export default function AssoIndexPage() {
  const categories = getAvailableAssoCategories();

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100">
      <main className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <p className="text-sm uppercase tracking-widest text-[#4FA8C6] font-semibold mb-2">
            Galerie associations
          </p>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Choisissez votre sport
          </h1>
          <div className="w-16 h-1 bg-[#66C6E8] mx-auto mb-4" />
          <p className="text-neutral-600 text-lg">
            Des tableaux offerts pour les associations. Parcourez une catégorie,
            sélectionnez une œuvre, puis contactez-nous pour commander.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={\`/asso/\${cat.id}\`}
              className="group block bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden border border-neutral-100 hover:-translate-y-0.5"
            >
              <div className="relative aspect-[4/3] bg-neutral-100">
                <Image
                  src={cat.cover}
                  alt={cat.label}
                  fill
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h2 className="text-2xl font-semibold capitalize">{cat.label}</h2>
                  <p className="text-sm text-white/85">{cat.count} tableaux</p>
                </div>
              </div>
              <div className="p-4 text-center text-sm text-neutral-600 group-hover:text-[#4FA8C6] transition-colors">
                Voir les tableaux →
              </div>
            </Link>
          ))}
        </div>

        {categories.length === 0 ? (
          <p className="text-center text-neutral-500 py-16">
            Aucune catégorie disponible pour le moment.
          </p>
        ) : null}
      </main>

      <footer className="border-t border-neutral-200 py-8 text-center text-sm text-neutral-500">
        <a href={\`mailto:\${BRAND.email}\`} className="hover:text-[#4FA8C6]">
          {BRAND.email}
        </a>
        {" · "}
        <span>{BRAND.tagline}</span>
      </footer>
    </div>
  );
}
`);

// Update CampaignFooter
w("components/campaign/CampaignFooter.tsx", `import React from "react";
import Link from "next/link";
import { BRAND } from "@/data/campaigns";

export default function CampaignFooter() {
  return (
    <footer id="contact" className="bg-neutral-950 text-white py-12 scroll-mt-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <div>
            <p className="text-2xl font-bold mb-1">
              Ink<span className="text-[#66C6E8]">IA</span>.art
            </p>
            <p className="text-neutral-400 italic mb-4">{BRAND.tagline}</p>
            <p className="text-sm text-neutral-400">
              <a href={\`mailto:\${BRAND.email}\`} className="hover:text-white">
                {BRAND.email}
              </a>
              {" · "}
              <a href={BRAND.phoneHref} className="hover:text-white">
                {BRAND.phone}
              </a>
              {" · "}
              <span>{BRAND.site}</span>
            </p>
          </div>
          <div className="text-sm text-neutral-400 space-y-2">
            <Link href="/" className="block hover:text-white transition-colors">
              Accueil
            </Link>
            <Link href="/collection" className="block hover:text-white transition-colors">
              Collection
            </Link>
            <Link href="/personnaliser" className="block hover:text-white transition-colors">
              Personnaliser
            </Link>
            <Link href="/avant-apres" className="block hover:text-white transition-colors">
              Avant / après
            </Link>
            <Link href="/asso" className="block hover:text-white transition-colors">
              Associations
            </Link>
            <a
              href={\`mailto:\${BRAND.email}\`}
              className="block hover:text-white transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
        <div className="border-t border-neutral-800 mt-10 pt-6 text-center text-xs text-neutral-500">
          <p>{BRAND.legal}</p>
        </div>
      </div>
    </footer>
  );
}
`);

// Update home to keep contact id working with nav
w("app/page.tsx", `import React from "react";

import HeroSection from "@/components/HeroSection";
import CollectionSection from "@/components/CollectionSection";
import HorizonSection from "@/components/HorizonSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import GarantiesSection from "@/components/GarantiesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100">
      <HeroSection />
      <section id="offres" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-2">NOS OFFRES</h2>
            <div className="w-20 h-1 bg-[#66C6E8] mx-auto mb-6"></div>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Des solutions artistiques adaptées à vos besoins professionnels
            </p>
          </div>
          <CollectionSection />
          <HorizonSection />
        </div>
      </section>
      <WhyChooseUsSection />
      <GarantiesSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
`);

// .gitignore — add prompts log
w(".gitignore", `# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/versions

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# env files (can opt-in for committing if needed)
.env*

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

# Steropes ops — Midjourney prompts (never ship / never expose)
.prompts-log
`);

console.log("asso/footer/home/gitignore written");


// ========== Generate wizard SVG placeholders ==========
function svgCard(bg1, bg2, pattern = "circles") {
  let decor = "";
  if (pattern === "circles") {
    decor = '<circle cx="64" cy="64" r="36" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="2"/>'
      + '<circle cx="64" cy="64" r="18" fill="rgba(255,255,255,0.12)"/>';
  } else if (pattern === "lines") {
    decor = '<path d="M20 100 Q64 20 108 100" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>'
      + '<path d="M30 110 Q64 40 98 110" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="1.5"/>';
  } else if (pattern === "grid") {
    decor = '<path d="M32 32h64v64H32z" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>'
      + '<path d="M32 64h64M64 32v64" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>';
  } else if (pattern === "wave") {
    decor = '<path d="M10 70c20-30 40 30 60 0s40-30 50 10" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="2.5"/>'
      + '<path d="M10 90c25-25 35 20 55 0s40-20 55 5" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>';
  } else if (pattern === "diamond") {
    decor = '<path d="M64 24 L104 64 L64 104 L24 64 Z" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>';
  }
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 128 128">',
    '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">',
    '<stop offset="0%" stop-color="' + bg1 + '"/>',
    '<stop offset="100%" stop-color="' + bg2 + '"/>',
    '</linearGradient></defs>',
    '<rect width="128" height="128" fill="url(#g)"/>',
    decor,
    '</svg>',
    ''
  ].join("\n");
}

const thumbs = {
  "style-abstrait.svg": svgCard("#0a2a33", "#4FA8C6", "wave"),
  "style-figuratif-portrait.svg": svgCard("#2a2110", "#C4A35A", "circles"),
  "style-figuratif-espace.svg": svgCard("#0d2230", "#66C6E8", "grid"),
  "style-afro.svg": svgCard("#3a1508", "#E85D3B", "diamond"),
  "style-zen.svg": svgCard("#1a1a1a", "#6b6b6b", "lines"),
  "style-expressionniste.svg": svgCard("#2a2208", "#D4AF37", "wave"),
  "style-alcohol.svg": svgCard("#2a1030", "#9B59B6", "wave"),
  "style-neo.svg": svgCard("#1a1208", "#F0B429", "diamond"),
  "insp-nature-delicate.svg": svgCard("#1a3028", "#7EB8A2", "circles"),
  "insp-nature-force.svg": svgCard("#2a1a10", "#8B5A2B", "grid"),
  "insp-aquatic.svg": svgCard("#0a2030", "#2E86AB", "wave"),
  "insp-vegetal.svg": svgCard("#142418", "#4A7C59", "lines"),
  "insp-crystal.svg": svgCard("#1a2430", "#9BB7D4", "diamond"),
  "insp-silk.svg": svgCard("#2a2418", "#D4C4A8", "lines"),
  "amb-luxury.svg": svgCard("#1a1508", "#C4A35A", "diamond"),
  "amb-modern.svg": svgCard("#0a2030", "#4FA8C6", "grid"),
  "amb-sensual.svg": svgCard("#2a1818", "#C47A6A", "wave"),
  "amb-dramatic.svg": svgCard("#1a0808", "#8B1E1E", "lines"),
  "col-golden.svg": svgCard("#1a1200", "#B8860B", "diamond"),
  "col-jewel.svg": svgCard("#0a1530", "#0F52BA", "circles"),
  "col-dark.svg": svgCard("#050505", "#3a3a3a", "grid"),
  "col-earth.svg": svgCard("#1a120c", "#5C4033", "lines"),
  "col-royal.svg": svgCard("#12081a", "#4B0082", "diamond"),
  "col-aurora.svg": svgCard("#2a1508", "#CC7722", "wave"),
  "size-s.svg": svgCard("#0a2030", "#66C6E8", "grid"),
  "size-m.svg": svgCard("#0a2830", "#4FA8C6", "grid"),
  "size-l.svg": svgCard("#1a1808", "#C4A35A", "grid"),
  "size-xl.svg": svgCard("#1a1600", "#D4AF37", "grid"),
};

for (const [name, content] of Object.entries(thumbs)) {
  w("public/wizard/" + name, content);
}
console.log("SVG thumbs written:", Object.keys(thumbs).length);

w("app/asso/[categorie]/page.tsx", `import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAvailableAssoCategories,
  getAssoPiecesByCategory,
} from "@/data/collection";
import { BRAND } from "@/data/campaigns";
import AssoCategoryGallery from "@/components/asso/AssoCategoryGallery";

type PageProps = {
  params: Promise<{ categorie: string }>;
};

export async function generateStaticParams() {
  return getAvailableAssoCategories().map((c) => ({ categorie: c.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { categorie } = await params;
  const cats = getAvailableAssoCategories();
  const cat = cats.find((c) => c.id === categorie.toLowerCase());
  if (!cat) {
    return { title: \`Catégorie inconnue | \${BRAND.name}\` };
  }
  return {
    title: \`\${cat.label} — Galerie associations | \${BRAND.name}\`,
    description: \`Tableaux offerts associations — catégorie \${cat.label} (\${cat.count} œuvres).\`,
  };
}

export default async function AssoCategoriePage({ params }: PageProps) {
  const { categorie } = await params;
  const id = decodeURIComponent(categorie).trim().toLowerCase();
  const cats = getAvailableAssoCategories();
  const cat = cats.find((c) => c.id === id);
  if (!cat) {
    notFound();
  }

  const pieces = getAssoPiecesByCategory(id);

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100">
      <main className="container mx-auto px-4 py-10 md:py-14">
        <AssoCategoryGallery
          categorie={cat.id}
          label={cat.label}
          pieces={pieces}
        />
      </main>
      <footer className="border-t border-neutral-200 py-8 text-center text-sm text-neutral-500">
        <a href={\`mailto:\${BRAND.email}\`} className="hover:text-[#4FA8C6]">
          {BRAND.email}
        </a>
        {" · tableau offert / commander"}
      </footer>
    </div>
  );
}
`);

console.log("asso categorie page rewritten");
console.log("\\nALL DONE → root:", root);
