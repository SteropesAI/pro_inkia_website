const fs = require("fs");
const path = require("path");
const root = "C:/Users/Laurent/Documents/projet_claude/PRJ-031-inkia-pro/code";

const strip = `"use client";

import React from "react";
import Image from "next/image";
import type { Campaign } from "@/data/campaigns";
import { avantApresPieces } from "@/data/collection";

interface Props {
  campaign: Campaign;
}

export default function AvantApresStrip({ campaign }: Props) {
  return (
    <section className="py-14 bg-white border-y border-neutral-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Avant / après</h2>
          <div
            className="w-16 h-1 mx-auto mb-3"
            style={{ backgroundColor: campaign.accent }}
          />
          <p className="text-neutral-600 max-w-xl mx-auto text-sm md:text-base">
            Des espaces professionnels transformés par un tableau Inkia.
          </p>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
          {avantApresPieces.map((piece) => (
            <figure
              key={piece.id}
              className="relative shrink-0 w-64 sm:w-72 aspect-[4/3] rounded-xl overflow-hidden shadow-md snap-start bg-neutral-200"
            >
              <Image
                src={piece.image}
                alt={piece.title}
                fill
                className="object-cover"
                sizes="288px"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 pt-8">
                <span className="text-white text-sm font-medium">{piece.title}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
`;
fs.writeFileSync(path.join(root, "components/campaign/AvantApresStrip.tsx"), strip, "utf8");

const pagePath = path.join(root, "app/c/[code]/page.tsx");
let page = fs.readFileSync(pagePath, "utf8");
if (!page.includes("AvantApresStrip")) {
  page = page.replace(
    'import CollectionGallery from "@/components/campaign/CollectionGallery";',
    'import CollectionGallery from "@/components/campaign/CollectionGallery";\nimport AvantApresStrip from "@/components/campaign/AvantApresStrip";'
  );
  page = page.replace(
    "<CampaignHero campaign={campaign} />\n      <CollectionGallery campaign={campaign} />",
    "<CampaignHero campaign={campaign} />\n      <AvantApresStrip campaign={campaign} />\n      <CollectionGallery campaign={campaign} />"
  );
  fs.writeFileSync(pagePath, page, "utf8");
  console.log("page patched");
} else {
  console.log("page already patched");
}

const colPath = path.join(root, "data/collection.ts");
let s = fs.readFileSync(colPath, "utf8");
if (s.charCodeAt(0) === 0xfeff) s = s.slice(1);
const reps = [
  ['label: "Or / dore"', 'label: "Or / doré"'],
  ['label: "Rouge / orange"', 'label: "Rouge / orangé"'],
  ['"Geometrique contemporain"', '"Géométrique contemporain"'],
  ['"Texture & matiere"', '"Texture & matière"'],
  ['"Salon de coiffure / beaute"', '"Salon de coiffure / beauté"'],
  ['"Spa / bien-etre"', '"Spa / bien-être"'],
  ['"Hotel / lobby"', '"Hôtel / lobby"'],
  ['"Restaurant / cafe"', '"Restaurant / café"'],
];
for (const [a, b] of reps) s = s.split(a).join(b);
s = s.split("Avant / apres").join("Avant / après");
s = s.split("Pas de prix inventes").join("Pas de prix inventés");
fs.writeFileSync(colPath, s, "utf8");
console.log("accents ok");
console.log("AvantApresStrip exists", fs.existsSync(path.join(root, "components/campaign/AvantApresStrip.tsx")));
