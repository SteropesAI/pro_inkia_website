/**
 * Campaign / universe config for postcard QR codes → /c/{code}
 *
 * Edit this file to map real QR codes to universes.
 * Codes QR branchés 09/09 : r4t9bd, k7m2pq, h3n8wx.
 */

export type CampaignCode = string;

export interface Campaign {
  /** Short code in URL: pro.inkia.art/c/{code} */
  code: string;
  /** True if this is a temporary placeholder until the real postcard QR code is known */
  isPlaceholder: boolean;
  /** Universe / espace label (from postcard) */
  universe: string;
  /** Short slug for filters */
  universeId: string;
  /** Hero lines from postcard front */
  heroLines: {
    line1: string;
    line2: string;
    line3: string;
  };
  /** Accent color (hex) for CTAs / highlights */
  accent: string;
  /** Secondary accent */
  accentSecondary: string;
  /** Hero / postcard image in public/ */
  heroImage: string;
  /** Optional back image */
  backImage?: string;
  /** Short intro under hero */
  intro: string;
}

/** Three postcard QR codes (Laurent 09/09). */
export const campaigns: Campaign[] = [
  {
    code: "r4t9bd",
    isPlaceholder: false,
    universe: "Espaces de bien-être & beauté",
    universeId: "bienetre-teal",
    heroLines: {
      line1: "Votre salon, c'est votre univers.",
      line2: "Vos murs aussi,",
      line3: "peuvent le révéler.",
    },
    accent: "#4FA8C6",
    accentSecondary: "#C4A35A",
    heroImage: "/campaigns/front-bienetre-teal.png",
    backImage: "/campaigns/back-bienetre-teal.png",
    intro:
      "Des tableaux pensés pour les salons, spas et espaces beauté — l'art qui vous ressemble.",
  },
  {
    code: "k7m2pq",
    isPlaceholder: false,
    universe: "Espaces de bien-être & beauté — histoire",
    universeId: "bienetre-histoire",
    heroLines: {
      line1: "Votre espace, c'est votre histoire.",
      line2: "Vos murs aussi,",
      line3: "peuvent la raconter.",
    },
    accent: "#E85D3B",
    accentSecondary: "#F0B429",
    heroImage: "/campaigns/front-bienetre-histoire.png",
    backImage: "/campaigns/back-bienetre-histoire.png",
    intro:
      "Variante histoire : une lecture plus narrative pour les espaces bien-être & beauté.",
  },
  {
    code: "h3n8wx",
    isPlaceholder: false,
    universe: "Espaces de rencontre",
    universeId: "rencontre",
    heroLines: {
      line1: "Chaque espace d'accueil",
      line2: "dit quelque chose.",
      line3: "Le vôtre, que dit-il ?",
    },
    accent: "#D4AF37",
    accentSecondary: "#1E3A5F",
    heroImage: "/campaigns/front-rencontre.png",
    backImage: "/campaigns/back-rencontre.png",
    intro:
      "Pour hôtels, restaurants et lieux d'accueil — des murs qui ouvrent la conversation.",
  },
];

export function getCampaignByCode(code: string): Campaign | undefined {
  const normalized = decodeURIComponent(code).trim().toLowerCase();
  return campaigns.find((c) => c.code.toLowerCase() === normalized);
}

export function getAllUniverseOptions(): { id: string; label: string }[] {
  const seen = new Set<string>();
  const out: { id: string; label: string }[] = [];
  for (const c of campaigns) {
    if (!seen.has(c.universeId)) {
      seen.add(c.universeId);
      out.push({ id: c.universeId, label: c.universe });
    }
  }
  return out;
}

export const BRAND = {
  name: "InkIA.art",
  tagline: "L'art qui vous ressemble",
  email: "fatou@inkia.art",
  phone: "05 64 27 11 38",
  phoneHref: "tel:+33564271138",
  site: "pro.inkia.art",
  legal: "Steropes SAS — RCS Paris 982 430 142 — 60 rue François 1er, 75008 Paris",
} as const;
