import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import {
  isValidContact,
  normalizeContact,
  type ContactInfo,
} from "@/lib/contact";

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
  };
}

export async function POST(req: Request) {
  const payload = await readPayload(req);
  if ("error" in payload) {
    return NextResponse.json({ ok: false, error: payload.error }, { status: 400 });
  }

  const { contact, societe, role, siteWeb, message } = payload;

  if (!isValidContact(contact)) {
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

  const normalized = normalizeContact(contact);
  const summary = {
    kind: "partenariat",
    at: new Date().toISOString(),
    contact: normalized,
    societe,
    role,
    siteWeb: siteWeb || undefined,
    message,
  };

  try {
    console.log("[partenariat]", JSON.stringify(summary));
    const logPath = path.join(process.cwd(), ".prompts-log");
    fs.appendFileSync(logPath, JSON.stringify(summary) + "\n", "utf8");
  } catch (err) {
    console.warn("[partenariat] log write failed", err);
  }

  return NextResponse.json({ ok: true });
}
