import { NextResponse } from "next/server";
import {
  buildPrompt,
  buildSummaryLabels,
  isValidSelection,
} from "@/lib/buildPrompt";
import {
  isValidContact,
  normalizeContact,
  type ContactInfo,
} from "@/lib/contact";
import {
  MAX_LONG,
  contactRows,
  contactTooLong,
  hasResendKey,
  isHoneypot,
  isTestMessage,
  logRequest,
  sendContact,
} from "@/lib/sendContact";

export const runtime = "nodejs";

type Body = Record<string, unknown>;

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "JSON invalide" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, error: "Corps invalide" }, { status: 400 });
  }

  const raw = body as Body;

  // Honeypot (champ caché hp_field) : rempli = robot → faux succès silencieux, aucun envoi.
  if (isHoneypot(raw.hp_field)) {
    console.info("[personnaliser] honeypot : ignoré");
    return NextResponse.json({ ok: true });
  }

  const contactRaw = raw.contact;
  const selectionCandidate = {
    styleFamily: raw.styleFamily,
    inspiration: raw.inspiration,
    ambiance: raw.ambiance,
    couleur: raw.couleur,
    taille: raw.taille,
    support: raw.support,
  };

  if (!isValidSelection(selectionCandidate)) {
    return NextResponse.json({ ok: false, error: "Sélection invalide" }, { status: 400 });
  }

  if (!isValidContact(contactRaw) || contactTooLong(contactRaw)) {
    return NextResponse.json(
      { ok: false, error: "Coordonnées incompletes ou invalides" },
      { status: 400 }
    );
  }

  // Champ texte optionnel (API uniquement, pas de champ visible) : support du marqueur [TEST AUTO hebdo].
  if (raw.message !== undefined && typeof raw.message !== "string") {
    return NextResponse.json({ ok: false, error: "Corps invalide" }, { status: 400 });
  }
  const message = typeof raw.message === "string" ? raw.message.trim() : "";
  if (message.length > MAX_LONG) {
    return NextResponse.json({ ok: false, error: "Corps invalide" }, { status: 400 });
  }

  if (!hasResendKey()) {
    console.error("[personnaliser] RESEND_API_KEY manquante : envoi impossible");
    return NextResponse.json({ ok: false, error: "Échec de l'enregistrement" }, { status: 500 });
  }

  const contact: ContactInfo = normalizeContact(contactRaw);
  const prompt = buildPrompt(selectionCandidate);
  const summaryLabels = buildSummaryLabels(selectionCandidate);
  const isTest = isTestMessage(message);

  const sent = await sendContact({
    route: "personnaliser",
    subject: `${contact.prenom} ${contact.nom}`,
    rows: [
      ...contactRows(contact),
      ...Object.entries(summaryLabels as unknown as Record<string, unknown>).map(
        ([k, v]) => [k, Array.isArray(v) ? v.join(", ") : String(v ?? "")] as [string, string]
      ),
      ["Message", message],
    ],
    replyTo: contact.email,
    isTest,
  });

  // .prompts-log : sélection + prompt Midjourney (non personnels, usage ops) ; plus aucune coordonnée.
  logRequest("personnaliser", {
    status: sent.ok ? "sent" : "send_failed",
    id: sent.ok ? sent.id : undefined,
    test: isTest || undefined,
    selection: selectionCandidate,
    summaryLabels,
    prompt,
  });

  if (!sent.ok) {
    return NextResponse.json({ ok: false, error: "Échec de l'enregistrement" }, { status: sent.status });
  }

  const payload: {
    ok: true;
    id: string;
    summaryLabels: typeof summaryLabels;
    prompt?: string;
  } = { ok: true, id: sent.id, summaryLabels };

  // Dev only: expose Midjourney prompt for console copy-test - never in production
  if (process.env.NODE_ENV === "development") {
    payload.prompt = prompt;
  }

  return NextResponse.json(payload);
}
