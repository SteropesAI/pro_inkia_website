import json, os, hashlib, shutil
from pathlib import Path

ROOT = Path(r"C:\Users\Laurent\Documents\projet_claude\PRJ-031-inkia-pro")
MANIFEST = ROOT / "code" / "data" / "collection-manifest.json"
BACKUP = ROOT / "code" / "data" / "collection-manifest.pre-108.json"
CATALOG = ROOT / "doc" / "nouveau-tableaux-catalog.json"
SRC = ROOT / "nouveau_tableau"
DST = ROOT / "code" / "public" / "collection"

if BACKUP.exists():
    print("BACKUP already exists, leaving as-is:", BACKUP)
else:
    shutil.copy2(MANIFEST, BACKUP)
    print("BACKUP created:", BACKUP, "size", BACKUP.stat().st_size)

with open(MANIFEST, encoding="utf-8") as f:
    existing = json.load(f)
assert isinstance(existing, list)
old_ids = {e["id"] for e in existing}
print("existing entries", len(existing), "unique ids", len(old_ids))

with open(CATALOG, encoding="utf-8") as f:
    catalog = json.load(f)
pieces = catalog["pieces"]
print("catalog pieces", len(pieces))

copied = 0
skipped_exist = 0
missing_src = []
for p in pieces:
    src_file = SRC / p["file"]
    dest_name = p["id"] + ".png"
    dest_path = DST / dest_name
    if not src_file.is_file():
        missing_src.append(p["file"])
        continue
    if dest_path.exists():
        skipped_exist += 1
    else:
        shutil.copy2(src_file, dest_path)
        copied += 1
print("copied", copied, "already_exist", skipped_exist, "missing_src", missing_src)

id_collisions = []
new_entries = []
for p in pieces:
    if p["id"] in old_ids:
        id_collisions.append(p["id"])
        continue
    dest_name = p["id"] + ".png"
    dest_path = DST / dest_name
    h = None
    if dest_path.is_file():
        h = hashlib.sha256(dest_path.read_bytes()).hexdigest()
    entry = {
        "id": p["id"],
        "file": "/collection/" + dest_name,
        "univers": p.get("univers"),
        "ambiance": p.get("ambiance"),
        "colors": p.get("colors"),
        "domaine": p.get("domaine"),
        "prompt": p.get("prompt_hint") or "",
        "source": "nouveau-catalog",
        "tags_pending": False,
        "hash": h,
        "tags_auto": ["domaine", "univers", "colors", "ambiance"],
        "title": p.get("title_fr"),
        "description": p.get("description_fr"),
        "title_fr": p.get("title_fr"),
        "description_fr": p.get("description_fr"),
        "kind": p.get("kind"),
        "notes_visuelles": p.get("notes_visuelles"),
    }
    new_entries.append(entry)

print("new_entries", len(new_entries), "id_collisions", id_collisions)

merged = existing + new_entries
seen = set()
deduped = []
for e in merged:
    if e["id"] in seen:
        continue
    seen.add(e["id"])
    deduped.append(e)

with open(MANIFEST, "w", encoding="utf-8") as f:
    json.dump(deduped, f, ensure_ascii=False, indent=2)
    f.write("\n")

print("merged written", len(deduped))
print("sources", sorted({e.get("source") for e in deduped}))
print("with title", sum(1 for e in deduped if e.get("title") or e.get("title_fr")))
