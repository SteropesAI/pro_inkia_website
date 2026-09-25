const fs = require("fs");
const path = require("path");
const codeRoot = "C:/Users/Laurent/Documents/projet_claude/PRJ-031-inkia-pro/code";
let raw = fs.readFileSync(path.join(codeRoot, "data/_collection_generated.json"), "utf8");
if (raw.charCodeAt(0) === 0xfeff) raw = raw.slice(1);
const pieces = JSON.parse(raw);

function esc(s) {
  return String(s).replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\r?\n/g, " ");
}

const lines = [];
lines.push("/**");
lines.push(" * Collection pieces for gallery + filters (couleurs + univers).");
lines.push(" * Generated from public/collection/ (avant-apres, situations, asso).");
lines.push(" * Pas de prix inventes.");
lines.push(" */");
lines.push("");
lines.push("export type ColorFilter =");
lines.push('  | "teal"');
lines.push('  | "or"');
lines.push('  | "rouge"');
lines.push('  | "bleu"');
lines.push('  | "neutre"');
lines.push('  | "multicolore";');
lines.push("");
lines.push("export interface CollectionPiece {");
lines.push("  id: string;");
lines.push("  title: string;");
lines.push("  image: string;");
lines.push("  colors: ColorFilter[];");
lines.push("  /** Matches Campaign.universeId */");
lines.push("  universes: string[];");
lines.push("  description: string;");
lines.push("}");
lines.push("");
lines.push("export const COLOR_FILTERS: { id: ColorFilter; label: string; swatch: string }[] = [");
lines.push('  { id: "teal", label: "Teal / turquoise", swatch: "#4FA8C6" },');
lines.push('  { id: "or", label: "Or / dore", swatch: "#D4AF37" },');
lines.push('  { id: "rouge", label: "Rouge / orange", swatch: "#E85D3B" },');
lines.push('  { id: "bleu", label: "Bleu profond", swatch: "#1E3A5F" },');
lines.push('  { id: "neutre", label: "Neutres", swatch: "#A3A3A3" },');
lines.push(
  '  { id: "multicolore", label: "Multicolore", swatch: "linear-gradient(135deg,#4FA8C6,#E85D3B,#D4AF37)" },'
);
lines.push("];");
lines.push("");
lines.push("/** Avant/apres in-situ strip (8 images) — also included in collectionPieces. */");
lines.push("export const avantApresPieces: CollectionPiece[] = [");

const aa = pieces.filter((p) => String(p.id).startsWith("aa-"));
for (const p of aa) {
  const colors = p.colors.map((c) => '"' + c + '"').join(", ");
  const universes = p.universes.map((u) => '"' + u + '"').join(", ");
  lines.push("  {");
  lines.push('    id: "' + esc(p.id) + '",');
  lines.push('    title: "' + esc(p.title) + '",');
  lines.push('    image: "' + esc(p.image) + '",');
  lines.push("    colors: [" + colors + "],");
  lines.push("    universes: [" + universes + "],");
  lines.push('    description: "' + esc(p.description) + '",');
  lines.push("  },");
}
lines.push("];");
lines.push("");
lines.push("export const collectionPieces: CollectionPiece[] = [");
for (const p of pieces) {
  const colors = p.colors.map((c) => '"' + c + '"').join(", ");
  const universes = p.universes.map((u) => '"' + u + '"').join(", ");
  lines.push("  {");
  lines.push('    id: "' + esc(p.id) + '",');
  lines.push('    title: "' + esc(p.title) + '",');
  lines.push('    image: "' + esc(p.image) + '",');
  lines.push("    colors: [" + colors + "],");
  lines.push("    universes: [" + universes + "],");
  lines.push('    description: "' + esc(p.description) + '",');
  lines.push("  },");
}
lines.push("];");
lines.push("");
lines.push("export const STYLE_OPTIONS = [");
lines.push('  "Abstrait fluide",');
lines.push('  "Portrait artistique",');
lines.push('  "Geometrique contemporain",');
lines.push('  "Texture & matiere",');
lines.push('  "Minimaliste",');
lines.push('  "Nature & organique",');
lines.push("] as const;");
lines.push("");
lines.push("export const SPACE_OPTIONS = [");
lines.push('  "Salon de coiffure / beaute",');
lines.push('  "Spa / bien-etre",');
lines.push('  "Hotel / lobby",');
lines.push('  "Restaurant / cafe",');
lines.push('  "Cabinet / accueil",');
lines.push('  "Boutique",');
lines.push('  "Autre espace professionnel",');
lines.push("] as const;");
lines.push("");

const out = path.join(codeRoot, "data/collection.ts");
fs.writeFileSync(out, lines.join("\n"), "utf8");
console.log("Wrote", out, "pieces=", pieces.length, "avantApres=", aa.length);
