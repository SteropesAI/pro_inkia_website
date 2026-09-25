"use client";

import React, { useState } from "react";
import Link from "next/link";
import ContactFields, { EMPTY_CONTACT } from "@/components/forms/ContactFields";
import SoftConfirm from "@/components/forms/SoftConfirm";
import type { ContactInfo } from "@/lib/contact";

export default function PartenariatForm() {
  const [contact, setContact] = useState<ContactInfo>(EMPTY_CONTACT);
  const [societe, setSociete] = useState("");
  const [role, setRole] = useState("");
  const [siteWeb, setSiteWeb] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const payload = {
        ...contact,
        societe,
        role,
        siteWeb,
        message,
      };
      const res = await fetch("/api/partenariat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
        message="Fatou a bien reçu votre proposition de partenariat. Elle vous recontacte bientôt."
      />
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8 max-w-2xl mx-auto">
      <section>
        <h2 className="text-lg font-semibold text-neutral-900 mb-1">
          Votre structure
        </h2>
        <p className="text-sm text-neutral-500 mb-4">
          Société, rôle, et le projet que vous aimeriez partager.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <label className="block text-sm">
            <span className="block mb-1.5 text-neutral-600">Société</span>
            <input
              required
              type="text"
              value={societe}
              onChange={(e) => setSociete(e.target.value)}
              autoComplete="organization"
              className="w-full rounded-md border border-neutral-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#66C6E8]"
            />
          </label>
          <label className="block text-sm">
            <span className="block mb-1.5 text-neutral-600">Rôle</span>
            <input
              required
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Ex. décoratrice, architecte…"
              className="w-full rounded-md border border-neutral-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#66C6E8]"
            />
          </label>
          <label className="block text-sm sm:col-span-2">
            <span className="block mb-1.5 text-neutral-600">
              Site web <span className="text-neutral-400">(optionnel)</span>
            </span>
            <input
              type="url"
              value={siteWeb}
              onChange={(e) => setSiteWeb(e.target.value)}
              placeholder="https://"
              autoComplete="url"
              className="w-full rounded-md border border-neutral-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#66C6E8]"
            />
          </label>
        </div>
        <label className="block text-sm">
          <span className="block mb-1.5 text-neutral-600">Message</span>
          <textarea
            required
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Présentez votre activité et l'esprit du partenariat souhaité…"
            className="w-full rounded-md border border-neutral-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#66C6E8]"
          />
        </label>
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
          {submitting ? "Envoi…" : "Envoyer ma demande"}
        </button>
        <Link href="/contact" className="text-sm text-neutral-500 hover:text-neutral-800">
          Autres demandes
        </Link>
      </div>
    </form>
  );
}
