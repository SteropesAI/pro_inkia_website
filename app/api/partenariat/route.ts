import { NextResponse } from "next/server";
import {
  isValidContact,
  normalizeContact,
  type ContactInfo,
} from "@/lib/contact";
import {
  MAX_LONG,
  MAX_SHORT,
  contactRows,
  contactTooLong,
  hasResendKey,
  isHoneypot,
  isTestMessage,
  logRequest,
  sendContact,
} from "@/lib/sendContact";

export const runtime = "nodejs";

function strFromForm(form: FormData, key: string): string {
  const v = form.get(key);
  return typeof v === "string" ? v.trim() : "";
}

function strFromObj(obj: Record<string, unknown>, key: string): string {
  const v = obj[key];
  return typeof v === "string" ? v.trim() : "";
}

async function readPayload(req: Request): Promise<{
  contact: ContactInfo;
  societe: string;
  role: string;
  siteWeb: string;
  message: string;
  hpField: string;
} | { error: string }> {
  const contentType = req.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return { error: "JSON invalide" };
    }
    if (!body || typeof body !== "object") {
      return { error: "Corps invalide" };
    }
    const o = body as Record<string, unknown>;
    return {
      contact: {
        prenom: strFromObj(o, "prenom"),
        nom: strFromObj(o, "nom"),
        email: strFromObj(o, "email"),
        telephone: strFromObj(o, "telephone"),
        adresse: strFromObj(o, "adresse"),
        codePostal: strFromObj(o, "codePostal"),
        ville: strFromObj(o, "ville"),
      },
      societe: strFromObj(o, "societe"),
      role: strFromObj(o, "role"),
      siteWeb: strFromObj(o, "siteWeb"),
      message: strFromObj(o, "message"),
      hpField: strFromObj(o, "hp_field"),
    };
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return { error: "Formulaire invalide" };
  }
  return {
    contact: {
      prenom: strFromForm(form, "prenom"),
      nom: strFromForm(form, "nom"),
      email: strFromForm(form, "email"),
      telephone: strFromForm(form, "telephone"),
      adresse: strFromForm(form, "adresse"),
      codePostal: strFromForm(form, "codePostal"),
      ville: strFromForm(form, "ville"),
    },
    societe: strFromForm(form, "societe"),
    role: strFromForm(form, "role"),
    siteWeb: strFromForm(form, "siteWeb"),
    message: strFromForm(form, "message"),
    hpField: strFromForm(form, "hp_field"),
  };
}

export async function POST(req: Request) {
  const payload = await readPayload(req);
  if ("error" in payload) {
    return NextResponse.json({ ok: false, error: payload.error }, { status: 400 });
  }

  const { contact, societe, role, siteWeb, message, hpField } = payload;

  // Honeypot (champ caché hp_field) : rempli = robot → faux succès silencieux, aucun envoi.
  if (isHoneypot(hpField)) {
    console.info("[partenariat] honeypot : ignoré");
    return NextResponse.json({ ok: true });
  }

  if (!isValidContact(contact) || contactTooLong(contact)) {
    return NextResponse.json(
      { ok: false, error: "Coordonnées incompletes ou invalides" },
      { status: 400 }
    );
  }

  if (!societe || !role || !message) {
    return NextResponse.json(
      { ok: false, error: "Société, rôle et message sont requis" },
      { status: 400 }
    );
  }
  if ([societe, role, siteWeb].some((v) => v.length > MAX_SHORT) || message.length > MAX_LONG) {
    return NextResponse.json({ ok: false, error: "Formulaire invalide" }, { status: 400 });
  }

  if (!hasResendKey()) {
    console.error("[partenariat] RESEND_API_KEY manquante : envoi impossible");
    return NextResponse.json({ ok: false, error: "Envoi impossible" }, { status: 500 });
  }

  const normalized = normalizeContact(contact);
  const isTest = isTestMessage(message);
  const sent = await sendContact({
    route: "partenariat",
    subject: `${societe} — ${normalized.prenom} ${normalized.nom}`,
    rows: [
      ...contactRows(normalized),
      ["Société", societe],
      ["Rôle", role],
      ["Site web", siteWeb],
      ["Message", message],
    ],
    replyTo: normalized.email,
    isTest,
  });

  logRequest("partenariat", {
    status: sent.ok ? "sent" : "send_failed",
    id: sent.ok ? sent.id : undefined,
    test: isTest || undefined,
  });

  if (!sent.ok) {
    return NextResponse.json({ ok: false, error: "Envoi impossible" }, { status: sent.status });
  }
  return NextResponse.json({ ok: true, id: sent.id });
}
