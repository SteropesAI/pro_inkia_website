import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
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

  if (!isValidContact(contactRaw)) {
    return NextResponse.json(
      { ok: false, error: "Coordonnées incompletes ou invalides" },
      { status: 400 }
    );
  }

  const contact: ContactInfo = normalizeContact(contactRaw);
  const prompt = buildPrompt(selectionCandidate);
  const summaryLabels = buildSummaryLabels(selectionCandidate);

  try {
    const line = JSON.stringify({
      at: new Date().toISOString(),
      kind: "personnaliser",
      selection: selectionCandidate,
      contact,
      summaryLabels,
      prompt,
    });
    console.log("[personnaliser]", line);
    const logPath = path.join(process.cwd(), ".prompts-log");
    fs.appendFileSync(logPath, line + "\n", "utf8");
  } catch (err) {
    console.warn("[personnaliser] log write failed", err);
  }

  const payload: {
    ok: true;
    summaryLabels: typeof summaryLabels;
    prompt?: string;
  } = { ok: true, summaryLabels };

  // Dev only: expose Midjourney prompt for console copy-test — never in production
  if (process.env.NODE_ENV === "development") {
    payload.prompt = prompt;
  }

  return NextResponse.json(payload);
}
