/**
 * Best-effort auto-tag of collection-manifest.json from prompt text.
 * Keys = sector wizard data-values from doc/wizard-tag-mapping.json
 * (NOT old promptMapping: silk_web / luxury_classic / golden_warmth…).
 * Conservative: only assign when mapping is clear; null + tags_pending if ambiguous.
 *
 * Run: node scripts/auto-tag-manifest.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const MANIFEST = path.join(ROOT, "data", "collection-manifest.json");
const REPORT = path.join(ROOT, "data", "auto-tag-report.json");
const MAPPING = path.join(ROOT, "..", "doc", "wizard-tag-mapping.json");

const mapping = JSON.parse(fs.readFileSync(MAPPING, "utf8"));
const secteurs = mapping.secteurs || {};

/** Build reverse indexes. phrase/adj → Map(key → Set(secteur)) */
function buildPhraseIndex(axisField) {
  const index = new Map();
  for (const [secteur, data] of Object.entries(secteurs)) {
    const bag = data[axisField] || {};
    for (const [key, phrases] of Object.entries(bag)) {
      const list = Array.isArray(phrases) ? phrases : [phrases];
      for (const phrase of list) {
        if (!phrase || typeof phrase !== "string") continue;
        const p = phrase.toLowerCase();
        if (!index.has(p)) index.set(p, new Map());
        const byKey = index.get(p);
        if (!byKey.has(key)) byKey.set(key, new Set());
        byKey.get(key).add(secteur);
      }
    }
  }
  return index;
}

const universIndex = buildPhraseIndex("univers");
const colorsIndex = buildPhraseIndex("colors");
const ambianceIndex = buildPhraseIndex("ambiance");

const domaineEntries = [];
for (const [secteur, data] of Object.entries(secteurs)) {
  const bag = data.domaine || {};
  for (const [key, phrase] of Object.entries(bag)) {
    if (!phrase || typeof phrase !== "string") continue;
    domaineEntries.push({
      key,
      secteur,
      phrase: phrase.toLowerCase(),
    });
  }
}

function uniqueKeyForPhrase(index, promptLower, secteurHint) {
  const hits = new Map();
  for (const [phrase, byKey] of index.entries()) {
    if (!promptLower.includes(phrase)) continue;
    for (const [key, secteursSet] of byKey.entries()) {
      if (!hits.has(key)) hits.set(key, new Set());
      for (const s of secteursSet) hits.get(key).add(s);
    }
  }
  if (hits.size === 0) return null;

  if (secteurHint) {
    const inSector = [...hits.entries()].filter(([, ss]) => ss.has(secteurHint));
    if (inSector.length === 1) return inSector[0][0];
    return null;
  }

  if (hits.size === 1) return hits.keys().next().value;
  return null;
}

function matchDomaine(promptLower) {
  const matches = domaineEntries.filter((e) => promptLower.includes(e.phrase));
  if (matches.length === 0) return { key: null, secteur: null };
  const keys = new Set(matches.map((m) => m.key));
  if (keys.size !== 1) return { key: null, secteur: null };
  const secteursHit = new Set(matches.map((m) => m.secteur));
  return {
    key: matches[0].key,
    secteur: secteursHit.size === 1 ? matches[0].secteur : null,
  };
}

function matchAmbiance(prompt, secteurHint) {
  const m = prompt.match(/,\s*([a-z]+)\s+aesthetic/i);
  if (!m) return null;
  const adj = m[1].toLowerCase();
  const byKey = ambianceIndex.get(adj);
  if (!byKey) return null;
  if (secteurHint) {
    const inSector = [...byKey.entries()].filter(([, ss]) => ss.has(secteurHint));
    if (inSector.length === 1) return inSector[0][0];
    return null;
  }
  if (byKey.size === 1) return byKey.keys().next().value;
  return null;
}

function inferSecteurFromUnivers(promptLower, universKey) {
  for (const [phrase, byKey] of universIndex.entries()) {
    if (!promptLower.includes(phrase)) continue;
    if (byKey.has(universKey) && byKey.get(universKey).size === 1) {
      return [...byKey.get(universKey)][0];
    }
  }
  return null;
}

function tagEntry(entry) {
  const prompt = entry.prompt || "";
  const promptLower = prompt.toLowerCase();
  const auto = [];

  // Remap from scratch (clear old taxonomy ids)
  const next = {
    ...entry,
    univers: null,
    ambiance: null,
    colors: null,
    domaine: null,
  };

  const dom = matchDomaine(promptLower);
  let secteurHint = dom.secteur;
  if (dom.key) {
    next.domaine = dom.key;
    auto.push("domaine");
  }

  const univers = uniqueKeyForPhrase(universIndex, promptLower, secteurHint);
  if (univers) {
    next.univers = univers;
    auto.push("univers");
    if (!secteurHint) {
      secteurHint = inferSecteurFromUnivers(promptLower, univers);
    }
  }

  const colors = uniqueKeyForPhrase(colorsIndex, promptLower, secteurHint);
  if (colors) {
    next.colors = colors;
    auto.push("colors");
  }

  const ambiance = matchAmbiance(prompt, secteurHint);
  if (ambiance) {
    next.ambiance = ambiance;
    auto.push("ambiance");
  }

  const stillMissing =
    !next.univers || !next.ambiance || !next.colors || !next.domaine;

  next.tags_pending = stillMissing;
  if (auto.length) next.tags_auto = auto;
  else delete next.tags_auto;

  return { next, auto };
}

const raw = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
const report = {
  taxonomy: "sector-wizard (wizard-tag-mapping.json)",
  total: raw.length,
  autoTaggedAny: 0,
  stillPending: 0,
  fullyTagged: 0,
  byAxis: { univers: 0, ambiance: 0, colors: 0, domaine: 0 },
  byAxisValues: { univers: {}, ambiance: {}, colors: {}, domaine: {} },
  samples: [],
  leftPendingReasons: {
    noUniversMatch: 0,
    noAmbianceMatch: 0,
    noColorsMatch: 0,
    noDomaineMatch: 0,
  },
};

function bump(axis, val) {
  if (!val) return;
  report.byAxisValues[axis][val] = (report.byAxisValues[axis][val] || 0) + 1;
}

const updated = raw.map((entry) => {
  const { next, auto } = tagEntry(entry);
  if (auto.length) {
    report.autoTaggedAny += 1;
    for (const a of auto) report.byAxis[a] += 1;
    if (report.samples.length < 12) {
      report.samples.push({
        id: next.id,
        auto,
        univers: next.univers,
        ambiance: next.ambiance,
        colors: next.colors,
        domaine: next.domaine,
        promptSnippet: (next.prompt || "").slice(0, 160),
      });
    }
  }
  if (next.tags_pending) report.stillPending += 1;
  else report.fullyTagged += 1;

  bump("univers", next.univers);
  bump("ambiance", next.ambiance);
  bump("colors", next.colors);
  bump("domaine", next.domaine);

  if (!next.univers) report.leftPendingReasons.noUniversMatch += 1;
  if (!next.ambiance) report.leftPendingReasons.noAmbianceMatch += 1;
  if (!next.colors) report.leftPendingReasons.noColorsMatch += 1;
  if (!next.domaine) report.leftPendingReasons.noDomaineMatch += 1;

  return next;
});

fs.writeFileSync(MANIFEST, JSON.stringify(updated, null, 2) + "\n", "utf8");
fs.writeFileSync(REPORT, JSON.stringify(report, null, 2) + "\n", "utf8");
console.log(JSON.stringify(report, null, 2));