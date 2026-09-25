"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import {
  STYLE_FAMILIES,
  INSPIRATIONS,
  AMBIANCES,
  COULEURS,
  TAILLES,
  SUPPORTS,
  type StyleFamilyId,
  type InspirationId,
  type AmbianceId,
  type CouleurId,
  type TailleId,
  type SupportId,
} from "@/data/promptMapping";
import ContactFields, { EMPTY_CONTACT } from "@/components/forms/ContactFields";
import SoftConfirm from "@/components/forms/SoftConfirm";
import type { ContactInfo } from "@/lib/contact";

type Step = 0 | 1 | 2 | 3 | 4 | 5 | 6;

const STEP_LABELS = [
  "Style",
  "Inspiration",
  "Ambiance",
  "Couleurs",
  "Taille",
  "Support",
  "Coordonnées",
] as const;

interface SummaryLabels {
  styleFamily: string;
  inspiration: string;
  ambiance: string;
  couleur: string;
  taille: string;
  cm: string;
  support: string;
}

function OptionCard({
  selected,
  onClick,
  thumb,
  label,
  blurb,
  swatches,
  sub,
}: {
  selected: boolean;
  onClick: () => void;
  thumb: string;
  label: string;
  blurb?: string;
  accent?: string;
  swatches?: string[];
  sub?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left rounded-xl border overflow-hidden transition-all ${
        selected
          ? "border-[#66C6E8] ring-2 ring-[#66C6E8]/30 bg-[#66C6E8]/5 shadow-sm"
          : "border-neutral-200 bg-white hover:border-[#66C6E8]/50 hover:shadow-sm"
      }`}
    >
      <div
        className="relative aspect-square"
        style={{ background: "#0a0a0a" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={thumb} alt="" className="absolute inset-0 w-full h-full object-cover" />
      </div>
      <div className="p-3">
        <p className="font-semibold text-sm text-neutral-900 flex items-center gap-2">
          {selected ? <Check size={14} className="text-[#66C6E8] shrink-0" /> : null}
          {label}
        </p>
        {blurb ? <p className="text-xs text-neutral-500 mt-1 leading-snug">{blurb}</p> : null}
        {sub ? <p className="text-xs text-[#C4A35A] mt-1">{sub}</p> : null}
        {swatches ? (
          <div className="flex gap-1 mt-2">
            {swatches.map((c) => (
              <span
                key={c}
                className="w-4 h-4 rounded-full border border-neutral-200"
                style={{ background: c }}
              />
            ))}
          </div>
        ) : null}
      </div>
    </button>
  );
}

function AltLinks() {
  return (
    <p className="text-center text-sm text-neutral-500 mt-8 space-x-1">
      <Link
        href="/besoin-conseil"
        className="text-neutral-600 hover:text-neutral-900 underline-offset-2 hover:underline"
      >
        Je ne sais pas choisir
      </Link>
      <span aria-hidden className="text-neutral-400">
        ·
      </span>
      <Link
        href="/proposition-deco"
        className="text-neutral-600 hover:text-neutral-900 underline-offset-2 hover:underline"
      >
        Je préfère une proposition déco
      </Link>
    </p>
  );
}

export default function PersonnaliserWizard() {
  const [step, setStep] = useState<Step>(0);
  const [styleFamily, setStyleFamily] = useState<StyleFamilyId>("abstrait");
  const [inspiration, setInspiration] = useState<InspirationId | null>(null);
  const [ambiance, setAmbiance] = useState<AmbianceId | null>(null);
  const [couleurs, setCouleurs] = useState<CouleurId[]>([]);
  const toggleCouleur = (id: CouleurId) => {
    setCouleurs((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };
  const [taille, setTaille] = useState<TailleId | null>(null);
  const [support, setSupport] = useState<SupportId | null>(null);
  const [contact, setContact] = useState<ContactInfo>(EMPTY_CONTACT);
  const [summary, setSummary] = useState<SummaryLabels | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const contactOk = useMemo(() => {
    return (
      contact.prenom.trim() &&
      contact.nom.trim() &&
      contact.email.trim() &&
      contact.telephone.trim() &&
      contact.adresse.trim() &&
      contact.codePostal.trim() &&
      contact.ville.trim()
    );
  }, [contact]);

  const canNext = useMemo(() => {
    if (step === 0) return !!styleFamily;
    if (step === 1) return !!inspiration;
    if (step === 2) return !!ambiance;
    if (step === 3) return couleurs.length > 0;
    if (step === 4) return !!taille;
    if (step === 5) return !!support;
    if (step === 6) return !!contactOk;
    return true;
  }, [
    step,
    styleFamily,
    inspiration,
    ambiance,
    couleurs,
    taille,
    support,
    contactOk,
  ]);

  const goNext = async () => {
    setError(null);
    if (step < 6) {
      setStep((s) => (s + 1) as Step);
      return;
    }
    if (step === 6) {
      if (
        !inspiration ||
        !ambiance ||
        !couleurs.length ||
        !taille ||
        !support ||
        !contactOk
      )
        return;
      setSubmitting(true);
      try {
        const res = await fetch("/api/personnaliser", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            styleFamily,
            inspiration,
            ambiance,
            couleur: couleurs,
            taille,
            support,
            contact,
          }),
        });
        const data = (await res.json()) as {
          ok?: boolean;
          summaryLabels?: SummaryLabels;
          prompt?: string;
          error?: string;
        };
        if (!res.ok || !data.ok || !data.summaryLabels) {
          throw new Error(data.error || "Échec de l'enregistrement");
        }
        if (typeof data.prompt === "string" && data.prompt) {
          console.log("[Inkia prompt]", data.prompt);
        }
        setSummary(data.summaryLabels);
        setDone(true);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Erreur réseau");
      } finally {
        setSubmitting(false);
      }
    }
  };

  const goBack = () => {
    setError(null);
    if (step > 0) setStep((s) => (s - 1) as Step);
  };

  if (done && summary) {
    return (
      <div className="min-h-[calc(100vh-3.5rem)] bg-gradient-to-b from-neutral-50 to-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <SoftConfirm
            title="Votre projet est enregistré"
            message={`Fatou a bien reçu vos choix (${summary.styleFamily} · ${summary.support}). Elle vous recontacte bientôt.`}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-gradient-to-b from-neutral-50 to-white">
      <div className="bg-neutral-950 text-white py-12 md:py-16">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <p className="text-sm uppercase tracking-widest text-[#66C6E8] font-semibold mb-2">
            Tableau sur mesure
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">
            Créez votre œuvre unique
          </h1>
          <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
            Quelques choix guidés. Le récapitulatif reste en français clair —
            Fatou s&apos;occupe du reste.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 md:py-14 max-w-4xl">
        <ol className="flex flex-wrap justify-center gap-2 mb-10">
          {STEP_LABELS.map((label, i) => {
            const active = step === i;
            const doneStep = step > i;
            return (
              <li
                key={label}
                className={`text-xs px-2.5 py-1 rounded-full border ${
                  active
                    ? "border-[#66C6E8] text-[#66C6E8] bg-[#66C6E8]/10"
                    : doneStep
                      ? "border-[#C4A35A]/50 text-[#C4A35A]"
                      : "border-neutral-200 text-neutral-500"
                }`}
              >
                {i}. {label}
              </li>
            );
          })}
        </ol>

        {step === 0 && (
          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">Quel style d&apos;œuvre ?</h2>
            <p className="text-sm text-neutral-500 mb-6">
              Abstrait par défaut — explorez aussi les autres familles.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {STYLE_FAMILIES.map((o) => (
                <OptionCard
                  key={o.id}
                  selected={styleFamily === o.id}
                  onClick={() => setStyleFamily(o.id)}
                  thumb={o.thumb}
                  label={o.label}
                  blurb={o.blurb}
                  accent={o.accent}
                />
              ))}
            </div>
          </section>
        )}

        {step === 1 && (
          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">Inspiration</h2>
            <p className="text-sm text-neutral-500 mb-6">
              Quelle matière ou motif vous attire ?
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {INSPIRATIONS.map((o) => (
                <OptionCard
                  key={o.id}
                  selected={inspiration === o.id}
                  onClick={() => setInspiration(o.id)}
                  thumb={o.thumb}
                  label={o.label}
                  accent={o.accent}
                />
              ))}
            </div>
          </section>
        )}

        {step === 2 && (
          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">Ambiance</h2>
            <p className="text-sm text-neutral-500 mb-6">
              Quelle atmosphère pour votre espace ?
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {AMBIANCES.map((o) => (
                <OptionCard
                  key={o.id}
                  selected={ambiance === o.id}
                  onClick={() => setAmbiance(o.id)}
                  thumb={o.thumb}
                  label={o.label}
                  accent={o.accent}
                />
              ))}
            </div>
          </section>
        )}

        {step === 3 && (
          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">Couleurs</h2>
            <p className="text-sm text-neutral-500 mb-6">
              Choisissez une ou plusieurs palettes.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {COULEURS.map((o) => (
                <OptionCard
                  key={o.id}
                  selected={couleurs.includes(o.id)}
                  onClick={() => toggleCouleur(o.id)}
                  thumb={o.thumb}
                  label={o.label}
                  swatches={o.swatches}
                />
              ))}
            </div>
          </section>
        )}

        {step === 4 && (
          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">Taille</h2>
            <p className="text-sm text-neutral-500 mb-6">
              Formats en centimètres — proposition tarifaire sur demande.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TAILLES.map((o) => (
                <OptionCard
                  key={o.id}
                  selected={taille === o.id}
                  onClick={() => setTaille(o.id)}
                  thumb={o.thumb}
                  label={o.label}
                  sub={o.cm}
                  accent={o.accent}
                />
              ))}
            </div>
          </section>
        )}

        {step === 5 && (
          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">Support</h2>
            <p className="text-sm text-neutral-500 mb-6">
              Choisissez le matériau de votre tableau.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {SUPPORTS.map((o) => (
                <OptionCard
                  key={o.id}
                  selected={support === o.id}
                  onClick={() => setSupport(o.id)}
                  thumb={o.thumb}
                  label={o.label}
                  blurb={o.blurb}
                  accent={o.accent}
                />
              ))}
            </div>
          </section>
        )}

        {step === 6 && (
          <section className="rounded-2xl border border-neutral-200 bg-white p-6 md:p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">
              Récapitulatif &amp; coordonnées
            </h2>
            <p className="text-sm text-neutral-500 mb-6">
              Vérifiez vos choix, puis laissez vos coordonnées pour que Fatou
              vous réponde.
            </p>
            <dl className="space-y-3 text-sm mb-8">
              {[
                [
                  "Style",
                  STYLE_FAMILIES.find((x) => x.id === styleFamily)?.label || "",
                ],
                [
                  "Inspiration",
                  INSPIRATIONS.find((x) => x.id === inspiration)?.label || "",
                ],
                [
                  "Ambiance",
                  AMBIANCES.find((x) => x.id === ambiance)?.label || "",
                ],
                [
                  "Couleurs",
                  couleurs.map((id) => COULEURS.find((x) => x.id === id)?.label).filter(Boolean).join(" / ") || "",
                ],
                [
                  "Format",
                  taille
                    ? `${TAILLES.find((x) => x.id === taille)?.label} — ${TAILLES.find((x) => x.id === taille)?.cm}`
                    : "",
                ],
                [
                  "Support",
                  SUPPORTS.find((x) => x.id === support)?.label || "",
                ],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 border-b border-neutral-100 pb-3"
                >
                  <dt className="text-neutral-500 sm:w-28 shrink-0">{k}</dt>
                  <dd className="font-medium text-neutral-900">{v}</dd>
                </div>
              ))}
            </dl>
            <ContactFields value={contact} onChange={setContact} />
          </section>
        )}

        {error ? (
          <p className="mt-4 text-sm text-red-600 text-center">{error}</p>
        ) : null}

        <div className="mt-10 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={goBack}
            disabled={step === 0}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md text-sm border border-neutral-200 text-neutral-700 disabled:opacity-30 hover:bg-neutral-50"
          >
            <ArrowLeft size={16} />
            Retour
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={!canNext || submitting}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-md text-sm font-semibold bg-[#66C6E8] text-neutral-950 disabled:opacity-40 hover:opacity-90"
          >
            {step === 6
              ? submitting
                ? "Envoi…"
                : "Envoyer mon projet"
              : "Continuer"}
            <ArrowRight size={16} />
          </button>
        </div>

        <AltLinks />
      </div>
    </div>
  );
}
