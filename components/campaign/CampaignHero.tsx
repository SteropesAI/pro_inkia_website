"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Palette, Sparkles, Paintbrush } from "lucide-react";
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
              Code temporaire — à remplacer par le code QR de la carte
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
            Des œuvres sélectionnées pour sublimer vos espaces professionnels.
            Explorez la collection, composez la vôtre, ou demandez une proposition
            déco — Fatou vous accompagne.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            <Link
              href="#collection"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md font-semibold text-neutral-950 transition-opacity hover:opacity-90"
              style={{ backgroundColor: accent }}
            >
              <Palette size={18} />
              Découvrir la collection
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/personnaliser"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md font-semibold border border-white/80 bg-white/5 hover:bg-white/15 transition-colors"
            >
              <Sparkles size={18} />
              Composer la mienne
            </Link>
            <Link
              href="/proposition-deco"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md font-semibold border border-white/40 text-white/90 hover:bg-white/10 transition-colors"
            >
              <Paintbrush size={18} />
              Proposition déco
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
