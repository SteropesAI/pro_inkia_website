import React from "react";
import Link from "next/link";
import { Check } from "lucide-react";

export default function SoftConfirm({
  title = "Merci",
  message = "Fatou a bien reçu votre demande. Elle vous recontacte très bientôt.",
  dark = false,
}: {
  title?: string;
  message?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-8 md:p-10 text-center max-w-lg mx-auto ${
        dark
          ? "border-white/10 bg-white/[0.04] text-white"
          : "border-neutral-200 bg-neutral-50 text-neutral-900"
      }`}
    >
      <div
        className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full ${
          dark ? "bg-[#66C6E8]/20 text-[#66C6E8]" : "bg-[#66C6E8]/15 text-[#2a7a96]"
        }`}
      >
        <Check size={22} />
      </div>
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <p
        className={`text-sm leading-relaxed mb-6 ${
          dark ? "text-neutral-400" : "text-neutral-600"
        }`}
      >
        {message}
      </p>
      <Link
        href="/collection"
        className={`inline-flex text-sm font-medium ${
          dark ? "text-[#66C6E8] hover:underline" : "text-[#2a7a96] hover:underline"
        }`}
      >
        Retour à la collection
      </Link>
    </div>
  );
}
