"use client";

import React from "react";
import type { Campaign } from "@/data/campaigns";
import { avantApresPairs } from "@/data/collection";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";

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
            Voyez comment une œuvre d’exception change un lieu. Glissez le
            curseur — la pièce fait le reste.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {avantApresPairs.map((pair) => (
            <BeforeAfterSlider
              key={pair.id}
              beforeSrc={pair.before}
              afterSrc={pair.after}
              label={pair.label}
              beforeAlt={`${pair.label} — avant`}
              afterAlt={`${pair.label} — après`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
