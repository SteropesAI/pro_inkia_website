/**
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

export type SupportId =
  | "toile"
  | "acrylique"
  | "aluminium"
  | "affiche"
  | "bois";

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
    thumb: "/collection/5f0418a6-3.png",
    accent: "#4FA8C6",
  },
  {
    id: "figuratif_portrait",
    label: "Portrait stylisé",
    blurb: "Visage comme toile, motifs sur la peau.",
    thumb: "/collection/profil-ambre-7aa97398-0.png",
    accent: "#C4A35A",
  },
  {
    id: "figuratif_espace",
    label: "Figuratif / espace",
    blurb: "Composition murale pour intérieur pro.",
    thumb: "/collection/550473a4-1.png",
    accent: "#66C6E8",
  },
  {
    id: "afro_contemporain",
    label: "Afro-contemporain",
    blurb: "Motifs culturels réinterprétés.",
    thumb: "/collection/5bc3b8a4-3.png",
    accent: "#E85D3B",
  },
  {
    id: "minimal_zen",
    label: "Minimal zen",
    blurb: "Sumi-e, espace négatif, calme.",
    thumb: "/collection/49fb0c94-3.png",
    accent: "#A3A3A3",
  },
  {
    id: "expressionniste",
    label: "Expressionniste",
    blurb: "Mouvement, impact, énergie du geste.",
    thumb: "/collection/fcefbedb-0.png",
    accent: "#D4AF37",
  },
  {
    id: "alcohol_ink",
    label: "Alcohol ink",
    blurb: "Fluides métalliques, veines luxueuses.",
    thumb: "/collection/onyx-cuivre-3a4d76f2-0.png",
    accent: "#9B59B6",
  },
  {
    id: "neo_classique",
    label: "Néo-classique",
    blurb: "Clair-obscur, grandeur picturale.",
    thumb: "/collection/99aa93e9-0.png",
    accent: "#F0B429",
  },
];

export const INSPIRATIONS: (OptionMeta & { id: InspirationId })[] = [
  { id: "nature_delicate", label: "Délicatesse Naturelle", thumb: "/collection/corolles-sables-db592d2f-0.png", accent: "#7EB8A2" },
  { id: "nature_force", label: "Force de la Nature", thumb: "/collection/braise-argile-75d44cf1-0.png", accent: "#8B5A2B" },
  { id: "aquatic_dream", label: "Rêve Aquatique", thumb: "/collection/maree-dazur-17e4bc8e-0.png", accent: "#2E86AB" },
  { id: "vegetal_life", label: "Vie Végétale", thumb: "/collection/feuilles-nacre-db250741-0.png", accent: "#4A7C59" },
  { id: "crystal_mystery", label: "Mystère Cristallin", thumb: "/collection/a88dde19-3.png", accent: "#9BB7D4" },
  { id: "silk_web", label: "Tissage Délicat", thumb: "/collection/3effdf4f-0.png", accent: "#D4C4A8" },
];

export const AMBIANCES: (OptionMeta & { id: AmbianceId })[] = [
  { id: "luxury_classic", label: "Élégance Intemporelle", thumb: "/collection/9b7e3500-0.png", accent: "#C4A35A" },
  { id: "modern_bold", label: "Modernité Audacieuse", thumb: "/collection/37949faf-0.png", accent: "#4FA8C6" },
  { id: "sensual_organic", label: "Sensualité Organique", thumb: "/collection/drape-ivoire-280acdc6-0.png", accent: "#C47A6A" },
  { id: "powerful_dramatic", label: "Puissance Dramatique", thumb: "/collection/0f40c236-2.png", accent: "#8B1E1E" },
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


export const SUPPORTS: (OptionMeta & { id: SupportId; blurb: string })[] = [
  {
    id: "toile",
    label: "Toile",
    blurb: "Impression sur toile tendue — rendu galerie.",
    thumb: "/wizard/sup-toile.svg",
    accent: "#C4A35A",
  },
  {
    id: "acrylique",
    label: "Acrylique",
    blurb: "Support plexi lumineux, profondeur et éclat.",
    thumb: "/wizard/sup-acrylique.svg",
    accent: "#66C6E8",
  },
  {
    id: "aluminium",
    label: "Aluminium",
    blurb: "Dibond / alu brossé — moderne et durable.",
    thumb: "/wizard/sup-aluminium.svg",
    accent: "#9aa0a6",
  },
  {
    id: "affiche",
    label: "Affiche",
    blurb: "Papier fine art — léger, à encadrer.",
    thumb: "/wizard/sup-affiche.svg",
    accent: "#f5f0e6",
  },
  {
    id: "bois",
    label: "Bois",
    blurb: "Support bois naturel — chaleur et matière.",
    thumb: "/wizard/sup-bois.svg",
    accent: "#8B5A2B",
  },
];

export interface WizardSelection {
  styleFamily: StyleFamilyId;
  inspiration: InspirationId;
  ambiance: AmbianceId;
  /** one or several palettes */
  couleur: CouleurId[];
  taille: TailleId;
  support: SupportId;
}

export function labelFor(
  kind: "style" | "inspiration" | "ambiance" | "couleur" | "taille" | "support",
  id: string
): string {
  const lists = {
    style: STYLE_FAMILIES,
    inspiration: INSPIRATIONS,
    ambiance: AMBIANCES,
    couleur: COULEURS,
    taille: TAILLES,
    support: SUPPORTS,
  } as const;
  const found = lists[kind].find((o) => o.id === id);
  return found?.label ?? id;
}

export function cmForTaille(id: TailleId): string {
  return TAILLES.find((t) => t.id === id)?.cm ?? "";
}

export function labelsForCouleurs(ids: CouleurId[]): string {
  return ids.map((id) => labelFor("couleur", id)).filter(Boolean).join(" / ");
}
