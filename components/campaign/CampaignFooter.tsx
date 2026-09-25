import React from "react";
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
            <p className="text-neutral-400 italic mb-1">{BRAND.tagline}</p>
            <p className="text-sm text-neutral-500 mb-4">Parlons de votre espace.</p>
            <p className="text-sm text-neutral-400">
              <a href={`mailto:${BRAND.email}`} className="hover:text-white">
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
            <Link href="/contact" className="block hover:text-white transition-colors">
              Contact
            </Link>
          </div>
        </div>
        <div className="border-t border-neutral-800 mt-10 pt-6 text-center text-xs text-neutral-500">
          <p>{BRAND.legal}</p>
        </div>
      </div>
    </footer>
  );
}
