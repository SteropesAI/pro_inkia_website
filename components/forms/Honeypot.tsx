"use client";

// Honeypot anti-robot : champ invisible, ignoré par les humains (rempli = robot, aucun envoi côté serveur).
export default function Honeypot({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <input
      type="text"
      name="hp_field"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      style={{ position: "absolute", left: "-10000px", width: "1px", height: "1px", overflow: "hidden" }}
    />
  );
}