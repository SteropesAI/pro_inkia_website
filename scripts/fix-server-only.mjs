import fs from "fs";

const root = process.argv[2];

// 1) Fix wizard Image -> img
let wiz = fs.readFileSync(root + "/components/wizard/PersonnaliserWizard.tsx", "utf8");
wiz = wiz.replace('import Image from "next/image";\n', "");
wiz = wiz.replace(
  '<Image src={thumb} alt="" fill className="object-cover opacity-90" sizes="200px" />',
  '<img src={thumb} alt="" className="absolute inset-0 w-full h-full object-cover opacity-90" />'
);
fs.writeFileSync(root + "/components/wizard/PersonnaliserWizard.tsx", wiz);
console.log("wizard img fixed");

// 2) Strip technical pools from promptMapping
let map = fs.readFileSync(root + "/data/promptMapping.ts", "utf8");
const cut = map.indexOf("/** Technical pools — never expose to client */");
if (cut < 0) throw new Error("pools marker missing");
const helpersStart = map.indexOf("export interface WizardSelection");
const head = map.slice(0, cut).trimEnd();
const helpers = map.slice(helpersStart);
fs.writeFileSync(root + "/data/promptMapping.ts", head + "\n\n" + helpers);
console.log("promptMapping stripped");

// 3) Rewrite buildPrompt with pools inside
const buildPrompt = `/**
 * Server-only Midjourney prompt builder.
 * Never import this module from client components.
 */

import {
  type WizardSelection,
  type StyleFamilyId,
  type InspirationId,
  type AmbianceId,
  type CouleurId,
  type TailleId,
  labelFor,
  cmForTaille,
} from "@/data/promptMapping";

const ELEMENT_POOLS: Record<InspirationId, string[]> = {
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

const ADJECTIVE_POOLS: Record<AmbianceId, string[]> = {
  luxury_classic: ["luxury", "elegant", "sophisticated", "refined"],
  modern_bold: ["contemporary", "sleek", "bold", "innovative"],
  sensual_organic: ["sensual", "organic", "flowing", "graceful"],
  powerful_dramatic: ["dramatic", "striking", "powerful", "intense"],
};

const COLOR_PALETTE_POOLS: Record<CouleurId, string[]> = {
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

const ASPECT_BY_TAILLE: Record<TailleId, string> = {
  small_intimate: "4:3",
  medium_balanced: "16:9",
  large_statement: "16:9",
  xl_masterpiece: "16:9",
};

const STYLE_TAG_POOL = [
  "editorial fine-art",
  "painterly",
  "hyper-detailed illustrative",
] as const;

const SPACE_POOL = [
  "beauty salon",
  "spa",
  "hotel lobby",
  "coworking",
  "restaurant",
] as const;

const MOTIF_POOL = [
  "Adinkra symbols",
  "Bamum mask geometry",
  "Ge'ez letterforms as pattern",
  "textile weave patterns",
] as const;

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
    if (
      typeof b[key] !== "string" ||
      !(ids[key] as readonly string[]).includes(b[key] as string)
    ) {
      return false;
    }
  }
  return true;
}
`;
fs.writeFileSync(root + "/lib/buildPrompt.ts", buildPrompt);
console.log("buildPrompt rewritten");
