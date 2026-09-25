/**
 * Shared collection filter options — SAME data-value keys as sector HTML wizards
 * (hôtel / cabinets / médical / déco particulière), sourced from
 * doc/wizard-tag-mapping.json. Not the old promptMapping taxonomy
 * (silk_web, luxury_classic, golden_warmth…).
 */

export interface FilterOption<T extends string = string> {
  id: T;
  label: string;
}

/** Domaine = nuance établissement (data-value wizard secteur). */
export type DomaineId =
  | "hotel_luxe_boutique"
  | "hotel_affaires"
  | "hotel_charme_campagne"
  | "chambre_hotes"
  | "hotel_bord_de_mer"
  | "residence_appart"
  | "cabinet_avocats"
  | "etude_notariale"
  | "cabinet_comptable"
  | "cabinet_conseil"
  | "gestion_patrimoine"
  | "cabinet_architecture"
  | "generaliste"
  | "dentiste"
  | "kine"
  | "osteo"
  | "masseur"
  | "autre"
  | "salon_sejour"
  | "chambre"
  | "entree_couloir"
  | "bureau_home_office"
  | "salle_a_manger"
  | "espace_professionnel";

export type UniversId =
  | "voyage_horizon"
  | "textiles_precieux"
  | "lumiere_ombre"
  | "terroir_local"
  | "mineral_marbre"
  | "vegetation_abstraite"
  | "ocean_rivage"
  | "metropole_nocturne"
  | "architecture_structurelle"
  | "bois_noble_cuir"
  | "encre_papier"
  | "marbre_pierre"
  | "geometrie_precision"
  | "metal_brosse_verre"
  | "bibliotheque_reliure"
  | "lignes_autorite"
  | "nature_calm"
  | "botanical_medicinal"
  | "geometric_harmony"
  | "body_flow"
  | "mineral_crystal"
  | "soft_watercolor"
  | "anatomical_lines"
  | "waves_motion"
  | "scandinave"
  | "boheme"
  | "industriel"
  | "minimaliste"
  | "classique_intemporel"
  | "maximaliste"
  | "japandi"
  | "mediterraneen";

export type AmbianceId =
  | "cocooning_intime"
  | "luxueux_raffine"
  | "contemporain_epure"
  | "chaleureux_authentique"
  | "evasion_exotique"
  | "autorite_confiance"
  | "feutre_discret"
  | "moderne_rigoureux"
  | "intemporel_elegant"
  | "audacieux_innovant"
  | "serene_calm"
  | "professional_reassuring"
  | "warm_human"
  | "minimal_contemporary"
  | "apaisant_zen"
  | "chaleureux_cosy"
  | "elegant_sophistique"
  | "audacieux_creatif"
  | "epure_aerien";

export type CouleurId =
  | "blanc_lin"
  | "bleu_marine_or"
  | "terracotta_sable"
  | "vert_foret_bois"
  | "gris_perle_argent"
  | "noir_laiton_hotel"
  | "noir_or"
  | "bleu_nuit_argent"
  | "bordeaux_bois"
  | "gris_anthracite_blanc"
  | "vert_anglais_laiton"
  | "beige_camel_noir"
  | "soft_clinical_blue"
  | "sage_green"
  | "warm_beige_terracotta"
  | "mineral_white_grey"
  | "soft_pastel"
  | "mint_fresh"
  | "blanc_bois_clair"
  | "terracotta_naturel"
  | "beton_metal"
  | "bleu_azur_blanc"
  | "couleurs_vives_motifs"
  | "neutres_intemporels";

export const DOMAINES: FilterOption<DomaineId>[] = [
  { id: "hotel_luxe_boutique", label: "Hôtel luxe / boutique" },
  { id: "hotel_affaires", label: "Hôtel d'affaires" },
  { id: "hotel_charme_campagne", label: "Hôtel de charme / campagne" },
  { id: "chambre_hotes", label: "Chambre d'hôtes" },
  { id: "hotel_bord_de_mer", label: "Hôtel bord de mer" },
  { id: "residence_appart", label: "Résidence / appart'hôtel" },
  { id: "cabinet_avocats", label: "Cabinet d'avocats" },
  { id: "etude_notariale", label: "Étude notariale" },
  { id: "cabinet_comptable", label: "Cabinet comptable" },
  { id: "cabinet_conseil", label: "Cabinet de conseil" },
  { id: "gestion_patrimoine", label: "Gestion de patrimoine" },
  { id: "cabinet_architecture", label: "Cabinet d'architecture" },
  { id: "generaliste", label: "Médecine générale" },
  { id: "dentiste", label: "Dentiste" },
  { id: "kine", label: "Kinésithérapeute" },
  { id: "osteo", label: "Ostéopathe" },
  { id: "masseur", label: "Masseur / bien-être" },
  { id: "autre", label: "Autre (médical)" },
  { id: "salon_sejour", label: "Salon / séjour" },
  { id: "chambre", label: "Chambre" },
  { id: "entree_couloir", label: "Entrée / couloir" },
  { id: "bureau_home_office", label: "Bureau / home office" },
  { id: "salle_a_manger", label: "Salle à manger" },
  { id: "espace_professionnel", label: "Espace professionnel" },
];

export const UNIVERS: FilterOption<UniversId>[] = [
  { id: "voyage_horizon", label: "Voyage & horizon" },
  { id: "textiles_precieux", label: "Textiles précieux" },
  { id: "lumiere_ombre", label: "Lumière & ombre" },
  { id: "terroir_local", label: "Terroir local" },
  { id: "mineral_marbre", label: "Minéral & marbre" },
  { id: "vegetation_abstraite", label: "Végétation abstraite" },
  { id: "ocean_rivage", label: "Océan & rivage" },
  { id: "metropole_nocturne", label: "Métropole nocturne" },
  { id: "architecture_structurelle", label: "Architecture structurelle" },
  { id: "bois_noble_cuir", label: "Bois noble & cuir" },
  { id: "encre_papier", label: "Encre & papier" },
  { id: "marbre_pierre", label: "Marbre & pierre" },
  { id: "geometrie_precision", label: "Géométrie & précision" },
  { id: "metal_brosse_verre", label: "Métal brossé & verre" },
  { id: "bibliotheque_reliure", label: "Bibliothèque & reliure" },
  { id: "lignes_autorite", label: "Lignes d'autorité" },
  { id: "nature_calm", label: "Nature calme" },
  { id: "botanical_medicinal", label: "Botanique médicinale" },
  { id: "geometric_harmony", label: "Harmonie géométrique" },
  { id: "body_flow", label: "Flux du corps" },
  { id: "mineral_crystal", label: "Minéral & cristal" },
  { id: "soft_watercolor", label: "Aquarelle douce" },
  { id: "anatomical_lines", label: "Lignes anatomiques" },
  { id: "waves_motion", label: "Vagues & mouvement" },
  { id: "scandinave", label: "Scandinave" },
  { id: "boheme", label: "Bohème" },
  { id: "industriel", label: "Industriel" },
  { id: "minimaliste", label: "Minimaliste" },
  { id: "classique_intemporel", label: "Classique intemporel" },
  { id: "maximaliste", label: "Maximaliste" },
  { id: "japandi", label: "Japandi" },
  { id: "mediterraneen", label: "Méditerranéen" },
];

export const AMBIANCE_FILTERS: FilterOption<AmbianceId>[] = [
  { id: "cocooning_intime", label: "Cocooning intime" },
  { id: "luxueux_raffine", label: "Luxueux raffiné" },
  { id: "contemporain_epure", label: "Contemporain épuré" },
  { id: "chaleureux_authentique", label: "Chaleureux authentique" },
  { id: "evasion_exotique", label: "Évasion exotique" },
  { id: "autorite_confiance", label: "Autorité & confiance" },
  { id: "feutre_discret", label: "Feutré discret" },
  { id: "moderne_rigoureux", label: "Moderne rigoureux" },
  { id: "intemporel_elegant", label: "Intemporel élégant" },
  { id: "audacieux_innovant", label: "Audacieux innovant" },
  { id: "serene_calm", label: "Serein & calme" },
  { id: "professional_reassuring", label: "Professionnel rassurant" },
  { id: "warm_human", label: "Chaleureux humain" },
  { id: "minimal_contemporary", label: "Minimal contemporain" },
  { id: "apaisant_zen", label: "Apaisant zen" },
  { id: "chaleureux_cosy", label: "Chaleureux cosy" },
  { id: "elegant_sophistique", label: "Élégant sophistiqué" },
  { id: "audacieux_creatif", label: "Audacieux créatif" },
  { id: "epure_aerien", label: "Épuré aérien" },
];

export const COLORIS_FILTERS: FilterOption<CouleurId>[] = [
  { id: "blanc_lin", label: "Blanc lin" },
  { id: "bleu_marine_or", label: "Bleu marine & or" },
  { id: "terracotta_sable", label: "Terracotta & sable" },
  { id: "vert_foret_bois", label: "Vert forêt & bois" },
  { id: "gris_perle_argent", label: "Gris perle & argent" },
  { id: "noir_laiton_hotel", label: "Noir & laiton" },
  { id: "noir_or", label: "Noir & or" },
  { id: "bleu_nuit_argent", label: "Bleu nuit & argent" },
  { id: "bordeaux_bois", label: "Bordeaux & bois" },
  { id: "gris_anthracite_blanc", label: "Gris anthracite & blanc" },
  { id: "vert_anglais_laiton", label: "Vert anglais & laiton" },
  { id: "beige_camel_noir", label: "Beige camel & noir" },
  { id: "soft_clinical_blue", label: "Bleu clinique doux" },
  { id: "sage_green", label: "Vert sauge" },
  { id: "warm_beige_terracotta", label: "Beige terracotta" },
  { id: "mineral_white_grey", label: "Blanc minéral & gris" },
  { id: "soft_pastel", label: "Pastels doux" },
  { id: "mint_fresh", label: "Menthe fraîche" },
  { id: "blanc_bois_clair", label: "Blanc & bois clair" },
  { id: "terracotta_naturel", label: "Terracotta naturel" },
  { id: "beton_metal", label: "Béton & métal" },
  { id: "bleu_azur_blanc", label: "Bleu azur & blanc" },
  { id: "couleurs_vives_motifs", label: "Couleurs vives & motifs" },
  { id: "neutres_intemporels", label: "Neutres intemporels" },
];

export const COLLECTION_FILTER_AXES = [
  { key: "domaine" as const, label: "Domaine", options: DOMAINES },
  { key: "univers" as const, label: "Univers", options: UNIVERS },
  { key: "ambiance" as const, label: "Ambiance", options: AMBIANCE_FILTERS },
  { key: "colors" as const, label: "Coloris", options: COLORIS_FILTERS },
];

export type CollectionFilterKey = (typeof COLLECTION_FILTER_AXES)[number]["key"];


/** Sector groupings from doc/wizard-tag-mapping.json (hotel / prestige / medical / deco). */
export type SecteurId = "hotel" | "prestige" | "medical" | "deco_particuliere";

export const UNIVERS_TO_SECTEUR: Record<UniversId, SecteurId> = {
  voyage_horizon: "hotel",
  textiles_precieux: "hotel",
  lumiere_ombre: "hotel",
  terroir_local: "hotel",
  mineral_marbre: "hotel",
  vegetation_abstraite: "hotel",
  ocean_rivage: "hotel",
  metropole_nocturne: "hotel",
  architecture_structurelle: "prestige",
  bois_noble_cuir: "prestige",
  encre_papier: "prestige",
  marbre_pierre: "prestige",
  geometrie_precision: "prestige",
  metal_brosse_verre: "prestige",
  bibliotheque_reliure: "prestige",
  lignes_autorite: "prestige",
  nature_calm: "medical",
  botanical_medicinal: "medical",
  geometric_harmony: "medical",
  body_flow: "medical",
  mineral_crystal: "medical",
  soft_watercolor: "medical",
  anatomical_lines: "medical",
  waves_motion: "medical",
  scandinave: "deco_particuliere",
  boheme: "deco_particuliere",
  industriel: "deco_particuliere",
  minimaliste: "deco_particuliere",
  classique_intemporel: "deco_particuliere",
  maximaliste: "deco_particuliere",
  japandi: "deco_particuliere",
  mediterraneen: "deco_particuliere",
};

export const DOMAINE_TO_SECTEUR: Record<DomaineId, SecteurId> = {
  hotel_luxe_boutique: "hotel",
  hotel_affaires: "hotel",
  hotel_charme_campagne: "hotel",
  chambre_hotes: "hotel",
  hotel_bord_de_mer: "hotel",
  residence_appart: "hotel",
  cabinet_avocats: "prestige",
  etude_notariale: "prestige",
  cabinet_comptable: "prestige",
  cabinet_conseil: "prestige",
  gestion_patrimoine: "prestige",
  cabinet_architecture: "prestige",
  generaliste: "medical",
  dentiste: "medical",
  kine: "medical",
  osteo: "medical",
  masseur: "medical",
  autre: "medical",
  salon_sejour: "deco_particuliere",
  chambre: "deco_particuliere",
  entree_couloir: "deco_particuliere",
  bureau_home_office: "deco_particuliere",
  salle_a_manger: "deco_particuliere",
  espace_professionnel: "deco_particuliere",
};

export const AMBIANCE_TO_SECTEUR: Record<AmbianceId, SecteurId> = {
  cocooning_intime: "hotel",
  luxueux_raffine: "hotel",
  contemporain_epure: "hotel",
  chaleureux_authentique: "hotel",
  evasion_exotique: "hotel",
  autorite_confiance: "prestige",
  feutre_discret: "prestige",
  moderne_rigoureux: "prestige",
  intemporel_elegant: "prestige",
  audacieux_innovant: "prestige",
  serene_calm: "medical",
  professional_reassuring: "medical",
  warm_human: "medical",
  minimal_contemporary: "medical",
  apaisant_zen: "deco_particuliere",
  chaleureux_cosy: "deco_particuliere",
  elegant_sophistique: "deco_particuliere",
  audacieux_creatif: "deco_particuliere",
  epure_aerien: "deco_particuliere",
};

export const COLORS_TO_SECTEUR: Record<CouleurId, SecteurId> = {
  blanc_lin: "hotel",
  bleu_marine_or: "hotel",
  terracotta_sable: "hotel",
  vert_foret_bois: "hotel",
  gris_perle_argent: "hotel",
  noir_laiton_hotel: "hotel",
  noir_or: "prestige",
  bleu_nuit_argent: "prestige",
  bordeaux_bois: "prestige",
  gris_anthracite_blanc: "prestige",
  vert_anglais_laiton: "prestige",
  beige_camel_noir: "prestige",
  soft_clinical_blue: "medical",
  sage_green: "medical",
  warm_beige_terracotta: "medical",
  mineral_white_grey: "medical",
  soft_pastel: "medical",
  mint_fresh: "medical",
  blanc_bois_clair: "deco_particuliere",
  terracotta_naturel: "deco_particuliere",
  beton_metal: "deco_particuliere",
  bleu_azur_blanc: "deco_particuliere",
  couleurs_vives_motifs: "deco_particuliere",
  neutres_intemporels: "deco_particuliere",
};

export const SECTEUR_LABELS: Record<SecteurId, string> = {
  hotel: "Hôtellerie",
  prestige: "Cabinets & prestige",
  medical: "Médical",
  deco_particuliere: "Déco particulière",
};

export function secteurFromUnivers(universId: string | null): SecteurId | null {
  if (!universId) return null;
  return UNIVERS_TO_SECTEUR[universId as UniversId] ?? null;
}

/** Domaine options narrowed by selected univers (same secteur). */
export function domainesForUnivers(universId: string | null): FilterOption<DomaineId>[] {
  const secteur = secteurFromUnivers(universId);
  if (!secteur) return DOMAINES;
  return DOMAINES.filter((d) => DOMAINE_TO_SECTEUR[d.id] === secteur);
}

export function ambiancesForUnivers(universId: string | null): FilterOption<AmbianceId>[] {
  const secteur = secteurFromUnivers(universId);
  if (!secteur) return AMBIANCE_FILTERS;
  return AMBIANCE_FILTERS.filter((a) => AMBIANCE_TO_SECTEUR[a.id] === secteur);
}

export function colorsForUnivers(universId: string | null): FilterOption<CouleurId>[] {
  const secteur = secteurFromUnivers(universId);
  if (!secteur) return COLORIS_FILTERS;
  return COLORIS_FILTERS.filter((c) => COLORS_TO_SECTEUR[c.id] === secteur);
}

export function labelForOption(
  options: FilterOption[],
  id: string | null | undefined
): string | null {
  if (!id) return null;
  return options.find((o) => o.id === id)?.label ?? null;
}
