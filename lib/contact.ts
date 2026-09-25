export interface ContactInfo {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  adresse: string;
  codePostal: string;
  ville: string;
}

export function isValidContact(value: unknown): value is ContactInfo {
  if (!value || typeof value !== "object") return false;
  const c = value as Record<string, unknown>;
  const required = [
    "prenom",
    "nom",
    "email",
    "telephone",
    "adresse",
    "codePostal",
    "ville",
  ] as const;
  for (const key of required) {
    if (typeof c[key] !== "string" || !(c[key] as string).trim()) return false;
  }
  const email = (c.email as string).trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return false;
  return true;
}

export function normalizeContact(c: ContactInfo): ContactInfo {
  return {
    prenom: c.prenom.trim(),
    nom: c.nom.trim(),
    email: c.email.trim().toLowerCase(),
    telephone: c.telephone.trim(),
    adresse: c.adresse.trim(),
    codePostal: c.codePostal.trim(),
    ville: c.ville.trim(),
  };
}
