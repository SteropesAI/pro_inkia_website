const fs = require("fs");
const path = "C:/Users/Laurent/Documents/projet_claude/PRJ-031-inkia-pro/code/data/collection.ts";
let src = fs.readFileSync(path, "utf8");

if (!src.includes("assoCategory?:")) {
  src = src.replace(
    "  description: string;\n}",
    "  description: string;\n  /** Sport category for asso pieces (boxe|karate), inferred from filename prefix */\n  assoCategory?: string;\n}"
  );
}

src = src.replace(
  /(image: "(\/collection\/asso\/([a-z0-9]+)-[^"]+)"),\n(\s+)(colors:)/g,
  (m, imgLine, fullPath, prefix, indent, colors) => {
    if (m.includes("assoCategory:")) return m;
    return imgLine + ",\n" + indent + 'assoCategory: "' + prefix + '",\n' + indent + colors;
  }
);

const helpers = `

/** Infer asso category from filename prefix (boxe-, karate-, …). */
export function inferAssoCategory(imagePath: string): string | undefined {
  const file = imagePath.split("/").pop() || "";
  const m = file.match(/^([a-z0-9]+)-/i);
  return m ? m[1].toLowerCase() : undefined;
}

export function getPieceAssoCategory(piece: CollectionPiece): string | undefined {
  return piece.assoCategory || inferAssoCategory(piece.image);
}

export function getAssoPieces(): CollectionPiece[] {
  return collectionPieces.filter((p) => p.image.includes("/collection/asso/"));
}

export function getAvailableAssoCategories(): { id: string; label: string; count: number; cover: string }[] {
  const map = new Map<string, CollectionPiece[]>();
  for (const p of getAssoPieces()) {
    const cat = getPieceAssoCategory(p);
    if (!cat) continue;
    if (!map.has(cat)) map.set(cat, []);
    map.get(cat)!.push(p);
  }
  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([id, pieces]) => ({
      id,
      label: id.charAt(0).toUpperCase() + id.slice(1),
      count: pieces.length,
      cover: pieces[0].image,
    }));
}

export function getAssoPiecesByCategory(categorie: string): CollectionPiece[] {
  const needle = categorie.toLowerCase();
  return getAssoPieces().filter((p) => getPieceAssoCategory(p) === needle);
}

export interface AvantApresPair {
  id: string;
  label: string;
  before: string;
  after: string;
}

/** Paired avant/après in-situ reveals for the campaign strip. */
export const avantApresPairs: AvantApresPair[] = [
  {
    id: "spa",
    label: "Spa",
    before: "/collection/avant-apres/spa-avant-tableau.png",
    after: "/collection/avant-apres/aube-spa.png",
  },
  {
    id: "opticien",
    label: "Opticien",
    before: "/collection/avant-apres/opticien-avant-tableau.png",
    after: "/collection/avant-apres/opticien-le-regard.png",
  },
  {
    id: "salon",
    label: "Salon de coiffure",
    before: "/collection/avant-apres/salon-coiffure-av-tableau.png",
    after: "/collection/avant-apres/salon-coiffure-format-reduit.png",
  },
  {
    id: "bureau",
    label: "Bureau direction",
    before: "/collection/avant-apres/bureau-direction-av-tableau.png",
    after: "/collection/avant-apres/vortex-salon-direction.png",
  },
];
`;

if (!src.includes("avantApresPairs")) {
  src = src.replace("\nexport const STYLE_OPTIONS", helpers + "\nexport const STYLE_OPTIONS");
}

fs.writeFileSync(path, src, "utf8");
console.log("patched ok");
console.log("assoCategory fields", (src.match(/assoCategory: "/g) || []).length);
console.log("has helpers", src.includes("getAvailableAssoCategories"));
