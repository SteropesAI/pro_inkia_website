#!/usr/bin/env python3
"""Cumul « nouveau tableau 2 » (192 PNG) into Inkia Pro collection.

CUMUL only — never deletes existing collection PNGs or purges the manifest.
"""
from __future__ import annotations

import hashlib
import json
import re
import shutil
import sys
from pathlib import Path

ROOT = Path(r"C:\Users\Laurent\Documents\projet_claude\PRJ-031-inkia-pro")
MANIFEST = ROOT / "code" / "data" / "collection-manifest.json"
BACKUP = ROOT / "code" / "data" / "collection-manifest.pre-nt2.json"
SRC = ROOT / "nouveau tableau 2"
DST = ROOT / "code" / "public" / "collection"
MAPPING = ROOT / "doc" / "wizard-tag-mapping.json"
SOURCE = "nouveau-tableau-2"

sys.path.insert(0, str(ROOT / "tools" / "mj-ingest"))
from ingest import extract_prompt, mj_id_from_filename, sha256_file  # noqa: E402

UUID_RE = re.compile(
    r"([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})(?:_(\d+))?",
    re.IGNORECASE,
)

# Lightweight FR-ish title helpers from English stems
EN_FR_HINTS = [
    (r"\babstract art inspired by\b", ""),
    (r"\babstract (?:oil )?painting\b", "Peinture abstraite"),
    (r"\babstract expressionist painting\b", "Expressionnisme abstrait"),
    (r"\babstraction\b", "Abstraction"),
    (r"\bbutterfly wing\b", "aile de papillon"),
    (r"\bfish scale\b", "écaille de poisson"),
    (r"\bflower petal\b", "pétale"),
    (r"\bpeacock feather\b", "plume de paon"),
    (r"\bgolden\b", "doré"),
    (r"\bluxurious?\b", "luxueux"),
    (r"\bjazz\b", "jazz"),
    (r"\bnotary\b", "notaire"),
    (r"\blaw firm\b", "cabinet d'avocats"),
    (r"\bjustice scale\b", "balance de justice"),
    (r"\bwatercolor\b", "aquarelle"),
    (r"\bink\b", "encre"),
]


def clean_prompt_text(prompt: str, filename: str) -> str:
    text = (prompt or "").strip()
    if not text:
        # Fallback: stem before uuid
        stem = Path(filename).stem
        m = UUID_RE.search(stem)
        if m:
            stem = stem[: m.start()].rstrip("_- ")
        text = stem.replace("_", " ").strip()
    text = re.split(r"\s+--", text, maxsplit=1)[0]
    text = re.sub(r"\s*Job ID:.*$", "", text, flags=re.I)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def title_fr_from_stem(prompt_clean: str, variant: str | None) -> str:
    raw = prompt_clean
    # Drop common MJ boilerplate prefixes for a shorter title
    raw = re.sub(
        r"^(abstract art inspired by|abstract expressionist painting of|"
        r"abstract expressionist painting (?:suitable )?for|"
        r"abstract expressionism|abstract oil painting|"
        r"abstract painting evocating|abstract painting evoking|"
        r"abstract form emerging from|"
        r"A Buffer Overflow Metamorphosis of|"
        r"A blooming rose rendered through)\s*",
        "",
        raw,
        flags=re.I,
    )
    # Keep first ~8 words, strip trailing commas
    words = [w for w in re.split(r"\s+", raw) if w]
    words = words[:8]
    title = " ".join(words).strip(" ,.;:-")
    if not title:
        title = "Œuvre abstraite"
    # Capitalize first letter
    title = title[0].upper() + title[1:]
    # Soft FR touch: if mostly English and starts with Abstract...
    if title.lower().startswith("abstract "):
        title = "Abstraction — " + title[9:]
        title = title[0].upper() + title[1:] if title else title
    # Variant nuance for multi-ups (optional short suffix only if helpful)
    # Keep clean — Laurent wants readable titles; variants share stem so append lightly
    if variant and variant.isdigit() and int(variant) > 0:
        # Only differentiate if we want — prior catalog used "— matière" etc.
        # Keep base title identical for variants of same stem (fiche per file still unique by id)
        pass
    # Cap length
    if len(title) > 72:
        title = title[:69].rsplit(" ", 1)[0] + "…"
    return title


def description_fr_from_stem(prompt_clean: str, title: str) -> str:
    snippet = prompt_clean
    if len(snippet) > 180:
        snippet = snippet[:177].rsplit(" ", 1)[0] + "…"
    return (
        f"Proposition visuelle inspirée de « {title} ». "
        f"Lecture libre du motif : {snippet}"
    )


def build_phrase_index(secteurs: dict, axis: str):
    index: dict[str, dict[str, set[str]]] = {}
    for secteur, data in secteurs.items():
        bag = (data or {}).get(axis) or {}
        for key, phrases in bag.items():
            plist = phrases if isinstance(phrases, list) else [phrases]
            for phrase in plist:
                if not phrase or not isinstance(phrase, str):
                    continue
                p = phrase.lower()
                index.setdefault(p, {}).setdefault(key, set()).add(secteur)
    return index


def unique_key(index, prompt_lower: str, secteur_hint: str | None):
    hits: dict[str, set[str]] = {}
    for phrase, by_key in index.items():
        if phrase not in prompt_lower:
            continue
        for key, secteurs in by_key.items():
            hits.setdefault(key, set()).update(secteurs)
    if not hits:
        return None
    if secteur_hint:
        in_sector = [(k, ss) for k, ss in hits.items() if secteur_hint in ss]
        if len(in_sector) == 1:
            return in_sector[0][0]
        return None
    if len(hits) == 1:
        return next(iter(hits))
    return None


def match_domaine(domaine_entries, prompt_lower: str):
    matches = [e for e in domaine_entries if e["phrase"] in prompt_lower]
    if not matches:
        return None, None
    keys = {m["key"] for m in matches}
    if len(keys) != 1:
        return None, None
    secteurs = {m["secteur"] for m in matches}
    return matches[0]["key"], (matches[0]["secteur"] if len(secteurs) == 1 else None)


def match_ambiance(ambiance_index, prompt: str, secteur_hint: str | None):
    m = re.search(r",\s*([a-z]+)\s+aesthetic", prompt, flags=re.I)
    if not m:
        return None
    adj = m.group(1).lower()
    by_key = ambiance_index.get(adj)
    if not by_key:
        return None
    if secteur_hint:
        in_sector = [(k, ss) for k, ss in by_key.items() if secteur_hint in ss]
        if len(in_sector) == 1:
            return in_sector[0][0]
        return None
    if len(by_key) == 1:
        return next(iter(by_key))
    return None


# Extra keyword heuristics when wizard phrases don't hit (NT2 prompts are freer)
HEUR_UNIVERS = [
    (r"ocean|wave|sea|rivage|marine|saphir|azure|bleu\b", "ocean_rivage"),
    (r"marble|marbre|stone|mineral|pierre", "mineral_marbre"),
    (r"botanic|leaf|petal|flower|rose|lily|sunflower|vegetation|plant", "vegetation_abstraite"),
    (r"silk|velvet|textile|fabric|linen|weave", "textiles_precieux"),
    (r"horizon|voyage|map|compass|travel", "voyage_horizon"),
    (r"city|skyline|nocturne|night light|urbain", "metropole_nocturne"),
    (r"shadow|light ray|lumière|lumiere|ombre", "lumiere_ombre"),
    (r"wood|bois|terroir|clay|rustic", "terroir_local"),
    (r"ink|encre|papier|watercolor|aquarelle", "encre_papier"),
    (r"geometr|precision|fibonacci|fractal", "geometrie_precision"),
    (r"scale of justice|notary|avocat|law firm|legal", "lignes_autorite"),
    (r"jazz|music|musical|syncope|resonance", "encre_papier"),
]
HEUR_COLORS = [
    (r"sapphire|saphir|navy|marine|azure|bleu", "bleu_marine_or"),
    (r"gold|golden|amber|doré|dore|laiton|brass", "noir_laiton_hotel"),
    (r"terracotta|sable|sand|burnt sienna", "terracotta_sable"),
    (r"forest|vert|moss|emerald", "vert_foret_bois"),
    (r"pearl|silver|gris|gray|grey", "gris_perle_argent"),
    (r"ivory|linen|cream|blanc|white|pale", "blanc_lin"),
    (r"ruby|midnight|obsidian|noir|black|charcoal", "noir_laiton_hotel"),
]
HEUR_AMBIANCE = [
    (r"luxur|raffin|elegant|exclusive", "luxueux_raffine"),
    (r"cozy|intimate|cocoon|soft envelop", "cocooning_intime"),
    (r"contemporary|epure|minimal|clean", "contemporain_epure"),
    (r"warm|chaleur|authent", "chaleureux_authentique"),
    (r"exotic|tropical|evasion", "evasion_exotique"),
    (r"authority|confiance|legal|notary|justice", "autorite_confiance"),
    (r"serene|calm|zen|apais", "serene_calm"),
]
HEUR_DOMAINE = [
    (r"notary|notariale|sundial|justice|law firm|avocat|legal office", "etude_notariale"),
    (r"hotel|boutique luxury|hospitality", "hotel_luxe_boutique"),
    (r"medical|clinic|cabinet médical", "generaliste"),
]


def heur_first(patterns, text_lower: str):
    for pat, key in patterns:
        if re.search(pat, text_lower, flags=re.I):
            return key
    return None


def tag_entry(prompt: str, mapping: dict) -> dict:
    secteurs = mapping.get("secteurs") or {}
    univers_index = build_phrase_index(secteurs, "univers")
    colors_index = build_phrase_index(secteurs, "colors")
    ambiance_index = build_phrase_index(secteurs, "ambiance")
    domaine_entries = []
    for secteur, data in secteurs.items():
        bag = (data or {}).get("domaine") or {}
        for key, phrase in bag.items():
            if isinstance(phrase, str) and phrase:
                domaine_entries.append(
                    {"key": key, "secteur": secteur, "phrase": phrase.lower()}
                )

    prompt_lower = (prompt or "").lower()
    auto: list[str] = []
    univers = unique_key(univers_index, prompt_lower, None)
    colors = unique_key(colors_index, prompt_lower, None)
    dom_key, secteur_hint = match_domaine(domaine_entries, prompt_lower)
    ambiance = match_ambiance(ambiance_index, prompt or "", secteur_hint)

    # Heuristics fallback (NT2 prompts rarely match wizard phrases exactly)
    if not univers:
        univers = heur_first(HEUR_UNIVERS, prompt_lower)
    if not colors:
        colors = heur_first(HEUR_COLORS, prompt_lower)
    if not ambiance:
        ambiance = heur_first(HEUR_AMBIANCE, prompt_lower)
    if not dom_key:
        dom_key = heur_first(HEUR_DOMAINE, prompt_lower)

    if univers:
        auto.append("univers")
    if ambiance:
        auto.append("ambiance")
    if colors:
        auto.append("colors")
    if dom_key:
        auto.append("domaine")

    pending = not (univers and ambiance and colors and dom_key)
    return {
        "univers": univers,
        "ambiance": ambiance,
        "colors": colors,
        "domaine": dom_key or "",
        "tags_pending": pending,
        "tags_auto": auto,
    }


def main() -> int:
    assert SRC.is_dir(), f"SRC missing: {SRC}"
    DST.mkdir(parents=True, exist_ok=True)

    if BACKUP.exists():
        print("BACKUP already exists, leaving as-is:", BACKUP)
    else:
        shutil.copy2(MANIFEST, BACKUP)
        print("BACKUP created:", BACKUP, "size", BACKUP.stat().st_size)

    with open(MANIFEST, encoding="utf-8") as f:
        existing = json.load(f)
    assert isinstance(existing, list)
    old_ids = {e["id"] for e in existing}
    old_hashes = {e.get("hash") for e in existing if e.get("hash")}
    old_files = {e.get("file") for e in existing}
    print("existing entries", len(existing), "unique ids", len(old_ids))

    with open(MAPPING, encoding="utf-8") as f:
        mapping = json.load(f)

    pngs = sorted(SRC.glob("*.png"))
    print("src pngs", len(pngs))
    assert len(pngs) == 192, f"expected 192, got {len(pngs)}"

    copied = 0
    skipped_exist = 0
    id_collisions = []
    hash_skips = []
    new_entries = []
    trous = []  # missing dest after copy attempt
    titles_sample = []

    for img in pngs:
        digest = sha256_file(img)
        mj = mj_id_from_filename(img.name)
        image_id = mj if mj else digest[:12]
        if image_id in old_ids:
            # disambiguate
            alt = f"{image_id}-{digest[:6]}"
            id_collisions.append({"from": image_id, "to": alt, "file": img.name})
            image_id = alt
        if image_id in {e["id"] for e in new_entries}:
            alt = f"{image_id}-{digest[:6]}"
            id_collisions.append({"from": image_id, "to": alt, "file": img.name})
            image_id = alt

        dest_name = f"{image_id}.png"
        dest_path = DST / dest_name
        if dest_path.exists():
            skipped_exist += 1
        else:
            shutil.copy2(img, dest_path)
            copied += 1

        if not dest_path.is_file():
            trous.append(image_id)
            continue

        # Prefer dest hash
        h = sha256_file(dest_path)
        prompt = extract_prompt(img) or extract_prompt(dest_path)
        clean = clean_prompt_text(prompt, img.name)
        m = UUID_RE.search(img.name)
        variant = m.group(2) if m else None
        title = title_fr_from_stem(clean, variant)
        desc = description_fr_from_stem(clean, title)
        tags = tag_entry(prompt or clean, mapping)

        entry = {
            "id": image_id,
            "file": f"/collection/{dest_name}",
            "univers": tags["univers"],
            "ambiance": tags["ambiance"],
            "colors": tags["colors"],
            "domaine": tags["domaine"],
            "prompt": prompt or clean,
            "source": SOURCE,
            "tags_pending": tags["tags_pending"],
            "hash": h,
            "tags_auto": tags["tags_auto"],
            "title": title,
            "description": desc,
            "title_fr": title,
            "description_fr": desc,
            "original_filename": img.name,
        }
        new_entries.append(entry)
        if len(titles_sample) < 3:
            titles_sample.append(title)

        if h in old_hashes:
            hash_skips.append(image_id)  # informational only — still cumul as new fiche

    print("copied", copied, "already_exist_dest", skipped_exist)
    print("new_entries", len(new_entries), "id_collisions", len(id_collisions))
    print("hash overlap with existing (info)", len(hash_skips))
    print("trous", trous)

    # Ensure we don't drop existing
    merged = existing + new_entries
    seen = set()
    deduped = []
    for e in merged:
        if e["id"] in seen:
            continue
        seen.add(e["id"])
        deduped.append(e)

    assert len(deduped) >= len(existing), "refusing to shrink manifest"
    assert all(e["id"] in seen for e in existing)

    with open(MANIFEST, "w", encoding="utf-8") as f:
        json.dump(deduped, f, ensure_ascii=False, indent=2)
        f.write("\n")

    flat = sum(1 for p in DST.iterdir() if p.is_file() and p.suffix.lower() == ".png")
    by_source = {}
    for e in deduped:
        by_source[e.get("source")] = by_source.get(e.get("source"), 0) + 1

    # Dest files referenced but missing
    missing_files = []
    for e in deduped:
        rel = e.get("file") or ""
        name = Path(rel).name
        if name and not (DST / name).is_file():
            missing_files.append(e["id"])

    report = {
        "existing_before": len(existing),
        "src_pngs": len(pngs),
        "copied": copied,
        "new_entries": len(new_entries),
        "manifest_after": len(deduped),
        "png_flat_collection": flat,
        "sources": by_source,
        "id_collisions": id_collisions,
        "trous": trous,
        "missing_dest_for_manifest": missing_files,
        "titles_sample": titles_sample,
        "tags_pending_new": sum(1 for e in new_entries if e.get("tags_pending")),
        "fully_tagged_new": sum(1 for e in new_entries if not e.get("tags_pending")),
    }
    report_path = ROOT / "code" / "data" / "cumul-nt2-report.json"
    report_path.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(report, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
