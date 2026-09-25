"use client";

import React, { useMemo, useState } from "react";
import { Calendar, Info } from "lucide-react";
import type { Campaign } from "@/data/campaigns";
import { BRAND } from "@/data/campaigns";
import { STYLE_OPTIONS, SPACE_OPTIONS, COLOR_FILTERS } from "@/data/collection";

interface Props {
  campaign: Campaign;
}

export default function PersonalizeForm({ campaign }: Props) {
  const [style, setStyle] = useState<string>(STYLE_OPTIONS[0]);
  const [colors, setColors] = useState<string[]>([]);
  const [space, setSpace] = useState<string>(SPACE_OPTIONS[0]);
  const [name, setName] = useState("");
  const [note, setNote] = useState("");

  const toggleColor = (id: string) => {
    setColors((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent(
      `[RDV personnalisé] ${campaign.universe} — code ${campaign.code}`
    );
    const colorLabels = colors
      .map((id) => COLOR_FILTERS.find((c) => c.id === id)?.label ?? id)
      .join(", ");
    const body = encodeURIComponent(
      [
        "Bonjour Fatou,",
        "",
        "Je souhaite prendre rendez-vous pour un tableau personnalisé.",
        "",
        `Univers carte : ${campaign.universe}`,
        `Code : ${campaign.code}`,
        `Style souhaité : ${style}`,
        `Couleurs : ${colorLabels || "(à préciser)"}`,
        `Type d'espace : ${space}`,
        name ? `Nom / structure : ${name}` : "",
        note ? `Notes : ${note}` : "",
        "",
        "Merci de me proposer un créneau.",
        "",
      ]
        .filter(Boolean)
        .join("\n")
    );
    return `mailto:${BRAND.email}?subject=${subject}&body=${body}`;
  }, [campaign, style, colors, space, name, note]);

  return (
    <section id="personnalise" className="py-20 bg-white scroll-mt-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Tableau personnalisé</h2>
          <div
            className="w-20 h-1 mx-auto mb-4"
            style={{ backgroundColor: campaign.accent }}
          />
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Indiquez style, couleurs et type d&apos;espace. Nous préparons une
            proposition sur mesure — pas de génération IA en direct pour l&apos;instant.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div
            className="mb-8 flex gap-3 rounded-lg border px-4 py-3 text-sm"
            style={{
              borderColor: `${campaign.accent}55`,
              backgroundColor: `${campaign.accent}12`,
            }}
          >
            <Info className="shrink-0 mt-0.5" size={18} style={{ color: campaign.accent }} />
            <p className="text-neutral-700">
              La représentation personnalisée sera proposée sous peu après échange
              (pas d&apos;aperçu instantané en v1). Pour avancer, prenez rendez-vous
              avec Fatou.
            </p>
          </div>

          <form
            className="space-y-6 bg-neutral-50 rounded-2xl p-6 md:p-8 shadow-sm border border-neutral-100"
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = mailtoHref;
            }}
          >
            <div>
              <label className="block text-sm font-semibold mb-2" htmlFor="style">
                Style (liste Inkia)
              </label>
              <select
                id="style"
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-md border border-neutral-300 bg-white focus:outline-none focus:ring-2"
                style={{ ["--tw-ring-color" as string]: campaign.accent }}
              >
                {STYLE_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p className="block text-sm font-semibold mb-2">Couleurs</p>
              <div className="flex flex-wrap gap-2">
                {COLOR_FILTERS.map((c) => {
                  const active = colors.includes(c.id);
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => toggleColor(c.id)}
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm border transition-colors ${
                        active
                          ? "bg-neutral-900 text-white border-neutral-900"
                          : "bg-white text-neutral-700 border-neutral-300"
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full border border-black/10"
                        style={{ background: c.swatch }}
                      />
                      {c.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" htmlFor="space">
                Type d&apos;espace
              </label>
              <select
                id="space"
                value={space}
                onChange={(e) => setSpace(e.target.value)}
                className="w-full px-4 py-2.5 rounded-md border border-neutral-300 bg-white focus:outline-none focus:ring-2 focus:ring-neutral-400"
              >
                {SPACE_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" htmlFor="name">
                Nom / structure (optionnel)
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-md border border-neutral-300 bg-white focus:outline-none focus:ring-2 focus:ring-neutral-400"
                placeholder="Votre salon, hôtel, restaurant…"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" htmlFor="note">
                Précisions (optionnel)
              </label>
              <textarea
                id="note"
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full px-4 py-2.5 rounded-md border border-neutral-300 bg-white focus:outline-none focus:ring-2 focus:ring-neutral-400"
                placeholder="Dimensions, ambiance, contraintes…"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md font-semibold text-neutral-950 transition-opacity hover:opacity-90"
                style={{ backgroundColor: campaign.accent }}
              >
                <Calendar size={18} />
                Prendre RDV
              </button>
              <a
                href={`mailto:${BRAND.email}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md font-semibold border border-neutral-300 bg-white hover:bg-neutral-100 transition-colors"
              >
                {BRAND.email}
              </a>
            </div>
            <p className="text-sm text-neutral-500">
              Ou appelez le{" "}
              <a href={BRAND.phoneHref} className="underline font-medium text-neutral-700">
                {BRAND.phone}
              </a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
