import React from "react";
import type { Metadata } from "next";
import PersonnaliserWizard from "@/components/wizard/PersonnaliserWizard";
import { BRAND } from "@/data/campaigns";

export const metadata: Metadata = {
  title: `Personnaliser | ${BRAND.name}`,
  description:
    "Créez votre œuvre unique en quelques étapes — style, inspiration, ambiance, couleurs, format.",
};

export default function PersonnaliserPage() {
  return <PersonnaliserWizard />;
}
