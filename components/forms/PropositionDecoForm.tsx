"use client";

import React, { useState } from "react";
import Link from "next/link";
import ContactFields, { EMPTY_CONTACT } from "@/components/forms/ContactFields";
import SoftConfirm from "@/components/forms/SoftConfirm";
import type { ContactInfo } from "@/lib/contact";

const AMBIANCE_TAGS = [
  "Douce & lumineuse",
  "Chaleureuse",
  "Épurée",
  "Contrastée",
  "Naturelle",
  "Sophistiquée",
];

export default function PropositionDecoForm() {
  const [contact, setContact] = useState<ContactInfo>(EMPTY_CONTACT);
  const [lieu, setLieu] = useState("");
  const [ambiance, setAmbiance] = useState("");
  const [couleurs, setCouleurs] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [files, setFiles] = useState<FileList | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleTag = (t: string) => {
    setTags((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const fd = new FormData();
      Object.entries(contact).forEach(([k, v]) => fd.append(k, v));
      fd.append("lieu", lieu);
      fd.append("ambiance", ambiance);
      fd.append("couleurs", couleurs);
      fd.append("tags", tags.join(", "));
      if (files) {
        Array.from(files).forEach((f) => fd.append("photos", f));
      }
      const res = await fetch("/api/proposition-deco", {
        method: "POST",
        body: fd,
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Envoi impossible");
      }
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur réseau");
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <SoftConfirm
        title="Demande reçue"
        message="Fatou prépare une proposition d'ambiance pour votre lieu. Elle vous recontacte bientôt."
      />
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8 max-w-2xl mx-auto">
      <section>
        <h2 className="text-lg font-semibold text-neutral-900 mb-1">
          Votre lieu
        </h2>
        <p className="text-sm text-neutral-500 mb-4">
          Pièces concernées, volumes, usage — ce qui compte pour l&apos;ambiance.
        </p>
        <textarea
          required
          rows={4}
          value={lieu}
          onChange={(e) => setLieu(e.target.value)}
          placeholder="Ex. salon d'attente + espace shampooing, murs clairs…"
          className="w-full rounded-md border border-neutral-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#66C6E8]"
        />
      </section>

      <section>
        <h2 className="text-lg font-semibold text-neutral-900 mb-1">
          Ambiance souhaitée
        </h2>
        <p className="text-sm text-neutral-500 mb-4">
          Peinture, couleurs, atmosphère — pas seulement un tableau.
        </p>
        <textarea
          required
          rows={3}
          value={ambiance}
          onChange={(e) => setAmbiance(e.target.value)}
          placeholder="Ex. plus chaleureux, tons terre, lumière douce…"
          className="w-full rounded-md border border-neutral-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#66C6E8] mb-3"
        />
        <div className="flex flex-wrap gap-2">
          {AMBIANCE_TAGS.map((t) => {
            const on = tags.includes(t);
            return (
              <button
                key={t}
                type="button"
                onClick={() => toggleTag(t)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                  on
                    ? "border-[#66C6E8] bg-[#66C6E8]/15 text-neutral-900"
                    : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-neutral-900 mb-1">
          Couleurs actuelles / à éviter
        </h2>
        <textarea
          rows={2}
          value={couleurs}
          onChange={(e) => setCouleurs(e.target.value)}
          placeholder="Ex. murs beige, à éviter : rose vif…"
          className="w-full rounded-md border border-neutral-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#66C6E8]"
        />
      </section>

      <section>
        <h2 className="text-lg font-semibold text-neutral-900 mb-1">
          Photos du lieu
        </h2>
        <p className="text-sm text-neutral-500 mb-3">
          Optionnel — jpg, png ou webp, jusqu&apos;à 5 images.
        </p>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          onChange={(e) => setFiles(e.target.files)}
          className="block w-full text-sm text-neutral-600 file:mr-3 file:rounded-md file:border-0 file:bg-neutral-100 file:px-3 file:py-2 file:text-sm file:font-medium"
        />
      </section>

      <section>
        <h2 className="text-lg font-semibold text-neutral-900 mb-1">
          Vos coordonnées
        </h2>
        <p className="text-sm text-neutral-500 mb-4">
          Pour que Fatou puisse vous répondre.
        </p>
        <ContactFields value={contact} onChange={setContact} />
      </section>

      {error ? <p className="text-sm text-red-600 text-center">{error}</p> : null}

      <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex justify-center px-8 py-3.5 rounded-md font-semibold bg-[#66C6E8] text-neutral-950 hover:opacity-90 disabled:opacity-50"
        >
          {submitting ? "Envoi…" : "Demander ma proposition déco"}
        </button>
        <Link
          href="/personnaliser"
          className="text-sm text-neutral-500 hover:text-neutral-800"
        >
          Je préfère composer un tableau
        </Link>
      </div>
    </form>
  );
}
