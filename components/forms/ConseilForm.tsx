"use client";

import React, { useState } from "react";
import Link from "next/link";
import ContactFields, { EMPTY_CONTACT } from "@/components/forms/ContactFields";
import SoftConfirm from "@/components/forms/SoftConfirm";
import type { ContactInfo } from "@/lib/contact";

const INTENTS: { id: string; label: string }[] = [
  { id: "tableau", label: "Plutôt un tableau" },
  { id: "deco", label: "Plutôt une proposition déco" },
  { id: "both", label: "Les deux" },
  { id: "unsure", label: "Je ne suis pas sûr(e)" },
];

export default function ConseilForm() {
  const [contact, setContact] = useState<ContactInfo>(EMPTY_CONTACT);
  const [lieu, setLieu] = useState("");
  const [intent, setIntent] = useState("unsure");
  const [files, setFiles] = useState<FileList | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const fd = new FormData();
      Object.entries(contact).forEach(([k, v]) => fd.append(k, v));
      fd.append("lieu", lieu);
      fd.append("intent", intent);
      if (files) {
        Array.from(files).forEach((f) => fd.append("photos", f));
      }
      const res = await fetch("/api/conseil", { method: "POST", body: fd });
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
        title="Message reçu"
        message="Fatou lit votre description et vous oriente vers la proposition la plus juste."
      />
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8 max-w-2xl mx-auto">
      <section>
        <h2 className="text-lg font-semibold text-neutral-900 mb-1">
          Décrivez votre lieu
        </h2>
        <p className="text-sm text-neutral-500 mb-4">
          Ce que vous aimez, ce qui manque, l&apos;ambiance actuelle.
        </p>
        <textarea
          required
          rows={4}
          value={lieu}
          onChange={(e) => setLieu(e.target.value)}
          className="w-full rounded-md border border-neutral-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#66C6E8]"
        />
      </section>

      <section>
        <h2 className="text-lg font-semibold text-neutral-900 mb-1">
          Votre intention
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
          {INTENTS.map((i) => {
            const on = intent === i.id;
            return (
              <button
                key={i.id}
                type="button"
                onClick={() => setIntent(i.id)}
                className={`text-left text-sm px-4 py-3 rounded-lg border transition-colors ${
                  on
                    ? "border-[#66C6E8] bg-[#66C6E8]/10 font-medium"
                    : "border-neutral-200 hover:border-neutral-300"
                }`}
              >
                {i.label}
              </button>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-neutral-900 mb-1">
          Photos
        </h2>
        <p className="text-sm text-neutral-500 mb-3">
          Optionnel — pour mieux saisir les couleurs et l&apos;espace.
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
        <ContactFields value={contact} onChange={setContact} />
      </section>

      {error ? <p className="text-sm text-red-600 text-center">{error}</p> : null}

      <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex justify-center px-8 py-3.5 rounded-md font-semibold bg-[#66C6E8] text-neutral-950 hover:opacity-90 disabled:opacity-50"
        >
          {submitting ? "Envoi…" : "Demander conseil"}
        </button>
        <div className="flex flex-wrap gap-3 text-sm text-neutral-500">
          <Link href="/personnaliser" className="hover:text-neutral-800">
            Composer un tableau
          </Link>
          <span aria-hidden>·</span>
          <Link href="/proposition-deco" className="hover:text-neutral-800">
            Proposition déco
          </Link>
        </div>
      </div>
    </form>
  );
}
