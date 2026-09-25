import Link from "next/link";
import { BRAND } from "@/data/campaigns";

export default function CampaignNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-950 text-white px-4 text-center">
      <p className="text-sm tracking-widest uppercase text-white/60 mb-3">{BRAND.name}</p>
      <h1 className="text-3xl md:text-4xl font-bold mb-4">Code inconnu</h1>
      <p className="text-neutral-400 max-w-md mb-8">
        Ce code carte n&apos;est pas reconnu. Vérifiez le QR ou contactez-nous.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/"
          className="px-6 py-3 rounded-md bg-[#66C6E8] text-neutral-950 font-semibold hover:opacity-90"
        >
          Retour à l&apos;accueil
        </Link>
        <Link
          href="/contact"
          className="px-6 py-3 rounded-md border border-white/40 hover:bg-white/10 font-semibold"
        >
          Contacter / Demander une proposition
        </Link>
      </div>
    </div>
  );
}

