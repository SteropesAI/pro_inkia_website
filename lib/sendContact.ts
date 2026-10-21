import fs from "fs";
import path from "path";
import { Resend } from "resend";
import type { ContactInfo } from "@/lib/contact";

// Envoi des formulaires inkia-pro via Resend (conseil, partenariat, proposition-deco, personnaliser).
// Client Resend créé à l'appel, jamais au chargement du module : le build passe sans RESEND_API_KEY.

const FROM = "Inkia Pro <inkia-pro@envoi.steropes.fr>";
const DEFAULT_TO = "laurent@steropes.fr";

// Test auto hebdo (_suivi/FORM-TESTS.json) : envoi normal vers CONTACT_TO, sujet préfixé [TEST AUTO].
export const TEST_MARKER = "[TEST AUTO hebdo]";

export const MAX_SHORT = 200;
export const MAX_LONG = 5000;

export function isTestMessage(...texts: string[]): boolean {
  return texts.some((t) => t.startsWith(TEST_MARKER));
}

export function isHoneypot(value: unknown): boolean {
  return typeof value === "string" && value.trim() !== "";
}

export function contactTooLong(c: ContactInfo): boolean {
  return Object.values(c).some((v) => typeof v === "string" && v.length > MAX_SHORT);
}

export function hasResendKey(): boolean {
  return !!process.env.RESEND_API_KEY;
}

function esc(v: string): string {
  return v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function contactRows(c: ContactInfo): [string, string][] {
  return [
    ["Prénom", c.prenom],
    ["Nom", c.nom],
    ["Email", c.email],
    ["Téléphone", c.telephone],
    ["Adresse", c.adresse],
    ["Code postal", c.codePostal],
    ["Ville", c.ville],
  ];
}

export type SendResult = { ok: true; id: string } | { ok: false; status: 500 | 502 };

export async function sendContact(opts: {
  route: string;
  subject: string;
  rows: [string, string][];
  replyTo: string;
  isTest: boolean;
}): Promise<SendResult> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error(`[${opts.route}] RESEND_API_KEY manquante : envoi impossible`);
    return { ok: false, status: 500 };
  }
  const resend = new Resend(key);
  const to = process.env.CONTACT_TO || DEFAULT_TO;
  const rowsHtml = opts.rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 8px 6px 0;color:#666;vertical-align:top;width:160px">${esc(k)}</td>` +
        `<td style="padding:6px 0;white-space:pre-wrap">${v ? esc(v) : "—"}</td></tr>`
    )
    .join("");
  try {
    const { data, error } = await resend.emails.send({
      from: FROM,
      to,
      replyTo: opts.replyTo,
      subject: `${opts.isTest ? "[TEST AUTO] " : ""}[inkia-pro / ${opts.route}] ${opts.subject}`,
      html:
        `<div style="font-family:sans-serif;max-width:640px;margin:auto;color:#1a1a2e">` +
        `<h2 style="border-bottom:2px solid #ccc;padding-bottom:8px">Nouvelle demande : ${esc(opts.route)}</h2>` +
        `<table style="width:100%;border-collapse:collapse;margin:16px 0">${rowsHtml}</table>` +
        `<p style="color:#999;font-size:12px;margin-top:24px;border-top:1px solid #eee;padding-top:12px">` +
        `Envoyé depuis pro.inkia.art · ${new Date().toLocaleString("fr-FR")}</p></div>`,
    });
    if (error || !data?.id) {
      // Code / message Resend uniquement (ni clé, ni contenu du message).
      console.error(`[${opts.route}] envoi Resend échoué :`, error?.name ?? "sans id", error?.message ?? "");
      return { ok: false, status: 502 };
    }
    console.info(`[${opts.route}] envoyé, id Resend :`, data.id, opts.isTest ? "(test auto)" : "");
    return { ok: true, id: data.id };
  } catch (err) {
    console.error(`[${opts.route}] envoi Resend exception :`, err instanceof Error ? err.message : "inconnue");
    return { ok: false, status: 502 };
  }
}

// Journal allégé (.prompts-log, ignoré par git) : plus aucune donnée perso (ni nom, email, téléphone,
// adresse, ni texte libre). Uniquement route, horodatage, statut, id Resend, marqueur de test et
// champs non personnels utiles au suivi (sélection / prompt Midjourney pour personnaliser, nb de photos).
export function logRequest(kind: string, entry: Record<string, unknown>): void {
  const line = JSON.stringify({ at: new Date().toISOString(), kind, ...entry });
  try {
    console.log(`[${kind}]`, line);
    fs.appendFileSync(path.join(process.cwd(), ".prompts-log"), line + "\n", "utf8");
  } catch (err) {
    console.warn(`[${kind}] log write failed`, err instanceof Error ? err.message : "");
  }
}
