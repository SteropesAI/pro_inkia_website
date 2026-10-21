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
    console.info("[proposition-deco] honeypot : ignoré");
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
  const ambiance = str(form, "ambiance");
  const couleurs = str(form, "couleurs");
  const tags = str(form, "tags");

  if (!lieu || !ambiance) {
    return NextResponse.json(
      { ok: false, error: "Décrivez le lieu et l'ambiance souhaitée" },
      { status: 400 }
    );
  }
  if ([lieu, ambiance, couleurs, tags].some((v) => v.length > MAX_LONG)) {
    return NextResponse.json({ ok: false, error: "Formulaire invalide" }, { status: 400 });
  }

  if (!hasResendKey()) {
    console.error("[proposition-deco] RESEND_API_KEY manquante : envoi impossible");
    return NextResponse.json({ ok: false, error: "Envoi impossible" }, { status: 500 });
  }

  let photos: string[] = [];
  try {
    photos = await saveUploadedImages(collectImageFiles(form), "deco");
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Erreur upload";
    return NextResponse.json({ ok: false, error: msg }, { status: 400 });
  }

  const normalized = normalizeContact(contact);
  const isTest = isTestMessage(lieu, ambiance);
  const sent = await sendContact({
    route: "proposition-deco",
    subject: `${normalized.prenom} ${normalized.nom}`,
    rows: [
      ...contactRows(normalized),
      ["Lieu", lieu],
      ["Ambiance", ambiance],
      ["Couleurs", couleurs],
      ["Tags", tags],
      ["Photos (dossier uploads/)", photos.join(", ")],
    ],
    replyTo: normalized.email,
    isTest,
  });

  logRequest("proposition-deco", {
    status: sent.ok ? "sent" : "send_failed",
    id: sent.ok ? sent.id : undefined,
    test: isTest || undefined,
    photos: photos.length,
  });

  if (!sent.ok) {
    return NextResponse.json({ ok: false, error: "Envoi impossible" }, { status: sent.status });
  }
  return NextResponse.json({ ok: true, id: sent.id });
}
