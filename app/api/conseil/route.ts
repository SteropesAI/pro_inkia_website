import { NextResponse } from "next/server";
import {
  isValidContact,
  normalizeContact,
  type ContactInfo,
} from "@/lib/contact";
import { collectImageFiles, saveUploadedImages } from "@/lib/uploads";
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

const INTENTS = new Set(["tableau", "deco", "both", "unsure"]);

function str(form: FormData, key: string): string {
  const v = form.get(key);
  return typeof v === "string" ? v.trim() : "";
}

export async function POST(req: Request) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Formulaire invalide" }, { status: 400 });
  }

  // Honeypot (champ caché hp_field) : rempli = robot → faux succès silencieux, aucun envoi.
  if (isHoneypot(form.get("hp_field"))) {
    console.info("[conseil] honeypot : ignoré");
    return NextResponse.json({ ok: true });
  }

  const contact: ContactInfo = {
    prenom: str(form, "prenom"),
    nom: str(form, "nom"),
    email: str(form, "email"),
    telephone: str(form, "telephone"),
    adresse: str(form, "adresse"),
    codePostal: str(form, "codePostal"),
    ville: str(form, "ville"),
  };

  if (!isValidContact(contact) || contactTooLong(contact)) {
    return NextResponse.json(
      { ok: false, error: "Coordonnées incompletes ou invalides" },
      { status: 400 }
    );
  }

  const lieu = str(form, "lieu");
  const intent = str(form, "intent");

  if (!lieu) {
    return NextResponse.json(
      { ok: false, error: "Décrivez votre lieu" },
      { status: 400 }
    );
  }
  if (lieu.length > MAX_LONG) {
    return NextResponse.json({ ok: false, error: "Formulaire invalide" }, { status: 400 });
  }
  if (!INTENTS.has(intent)) {
    return NextResponse.json(
      { ok: false, error: "Précisez votre intention" },
      { status: 400 }
    );
  }

  if (!hasResendKey()) {
    console.error("[conseil] RESEND_API_KEY manquante : envoi impossible");
    return NextResponse.json({ ok: false, error: "Envoi impossible" }, { status: 500 });
  }

  let photos: string[] = [];
  try {
    photos = await saveUploadedImages(collectImageFiles(form), "conseil");
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Erreur upload";
    return NextResponse.json({ ok: false, error: msg }, { status: 400 });
  }

  const normalized = normalizeContact(contact);
  const isTest = isTestMessage(lieu);
  const sent = await sendContact({
    route: "conseil",
    subject: `${normalized.prenom} ${normalized.nom} — ${intent}`,
    rows: [
      ...contactRows(normalized),
      ["Lieu", lieu],
      ["Intention", intent],
      ["Photos (dossier uploads/)", photos.join(", ")],
    ],
    replyTo: normalized.email,
    isTest,
  });

  logRequest("conseil", {
    status: sent.ok ? "sent" : "send_failed",
    id: sent.ok ? sent.id : undefined,
    test: isTest || undefined,
    intent,
    photos: photos.length,
  });

  if (!sent.ok) {
    return NextResponse.json({ ok: false, error: "Envoi impossible" }, { status: sent.status });
  }
  return NextResponse.json({ ok: true, id: sent.id });
}
