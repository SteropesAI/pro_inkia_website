"use client";

import React from "react";
import type { ContactInfo } from "@/lib/contact";

type Props = {
  value: ContactInfo;
  onChange: (next: ContactInfo) => void;
  dark?: boolean;
};

const FIELDS: {
  key: keyof ContactInfo;
  label: string;
  type?: string;
  autoComplete?: string;
  span?: string;
}[] = [
  { key: "prenom", label: "Prénom", autoComplete: "given-name" },
  { key: "nom", label: "Nom", autoComplete: "family-name" },
  {
    key: "email",
    label: "Email",
    type: "email",
    autoComplete: "email",
    span: "sm:col-span-2",
  },
  {
    key: "telephone",
    label: "Téléphone",
    type: "tel",
    autoComplete: "tel",
    span: "sm:col-span-2",
  },
  {
    key: "adresse",
    label: "Adresse",
    autoComplete: "street-address",
    span: "sm:col-span-2",
  },
  { key: "codePostal", label: "Code postal", autoComplete: "postal-code" },
  { key: "ville", label: "Ville", autoComplete: "address-level2" },
];

export const EMPTY_CONTACT: ContactInfo = {
  prenom: "",
  nom: "",
  email: "",
  telephone: "",
  adresse: "",
  codePostal: "",
  ville: "",
};

export default function ContactFields({ value, onChange, dark = false }: Props) {
  const labelCls = dark ? "text-neutral-400" : "text-neutral-600";
  const inputCls = dark
    ? "bg-white/5 border-white/15 text-white placeholder:text-neutral-500 focus:border-[#66C6E8]/60"
    : "bg-white border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus:border-[#66C6E8]";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {FIELDS.map((f) => (
        <label key={f.key} className={`block text-sm ${f.span || ""}`}>
          <span className={`block mb-1.5 ${labelCls}`}>{f.label}</span>
          <input
            required
            type={f.type || "text"}
            autoComplete={f.autoComplete}
            value={value[f.key]}
            onChange={(e) => onChange({ ...value, [f.key]: e.target.value })}
            className={`w-full rounded-md border px-3 py-2.5 text-sm outline-none transition-colors ${inputCls}`}
          />
        </label>
      ))}
    </div>
  );
}
