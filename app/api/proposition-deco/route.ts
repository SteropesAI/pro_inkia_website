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
  const ambiance = str(form, "ambiance");
  const couleurs = str(form, "couleurs");
  const tags = str(form, "tags");

  if (!lieu || !ambiance) {
    return NextResponse.json(
      { ok: false, error: "Décrivez le lieu et l'ambiance souhaitée" },
      { status: 400 }
    );
  }

  let photos: string[] = [];
  try {
    photos = await saveUploadedImages(collectImageFiles(form), "deco");
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Erreur upload";
    return NextResponse.json({ ok: false, error: msg }, { status: 400 });
  }

  const normalized = normalizeContact(contact);
  const summary = {
    kind: "proposition-deco",
    at: new Date().toISOString(),
    contact: normalized,
    lieu,
    ambiance,
    couleurs,
    tags,
    photos,
  };

  try {
    console.log("[proposition-deco]", JSON.stringify(summary));
    const logPath = path.join(process.cwd(), ".prompts-log");
    fs.appendFileSync(logPath, JSON.stringify(summary) + "\n", "utf8");
  } catch (err) {
    console.warn("[proposition-deco] log write failed", err);
  }

  return NextResponse.json({ ok: true });
}
