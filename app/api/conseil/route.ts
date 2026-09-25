import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import {
  isValidContact,
  normalizeContact,
  type ContactInfo,
} from "@/lib/contact";
import { collectImageFiles, saveUploadedImages } from "@/lib/uploads";

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

  const contact: ContactInfo = {
    prenom: str(form, "prenom"),
    nom: str(form, "nom"),
    email: str(form, "email"),
    telephone: str(form, "telephone"),
    adresse: str(form, "adresse"),
    codePostal: str(form, "codePostal"),
    ville: str(form, "ville"),
  };

  if (!isValidContact(contact)) {
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
  if (!INTENTS.has(intent)) {
    return NextResponse.json(
      { ok: false, error: "Précisez votre intention" },
      { status: 400 }
    );
  }

  let photos: string[] = [];
  try {
    photos = await saveUploadedImages(collectImageFiles(form), "conseil");
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Erreur upload";
    return NextResponse.json({ ok: false, error: msg }, { status: 400 });
  }

  const normalized = normalizeContact(contact);
  const summary = {
    kind: "conseil",
    at: new Date().toISOString(),
    contact: normalized,
    lieu,
    intent,
    photos,
  };

  try {
    console.log("[conseil]", JSON.stringify(summary));
    const logPath = path.join(process.cwd(), ".prompts-log");
    fs.appendFileSync(logPath, JSON.stringify(summary) + "\n", "utf8");
  } catch (err) {
    console.warn("[conseil] log write failed", err);
  }

  return NextResponse.json({ ok: true });
}
