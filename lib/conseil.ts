import fs from "fs";
import path from "path";

export type ConseilArticle = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category?: string;
  cover?: string;
  content: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content", "conseil");

/** Lightweight YAML-ish frontmatter parse (no gray-matter). */
function parseFrontmatter(raw: string): { data: Record<string, string>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    return { data: {}, content: raw.trim() };
  }
  const data: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!m) continue;
    let value = m[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    data[m[1]] = value;
  }
  return { data, content: match[2].trim() };
}

function toIsoDate(value: string | undefined): string {
  if (!value) return "";
  const d = new Date(value);
  if (!Number.isNaN(d.getTime())) return d.toISOString().slice(0, 10);
  return value.slice(0, 10);
}

function readArticleFile(file: string): ConseilArticle | null {
  const slug = file.replace(/\.md$/, "");
  if (slug.includes("/") || slug.includes("\\")) return null;

  const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
  const { data, content } = parseFrontmatter(raw);
  const title = data.title ?? "";
  const date = toIsoDate(data.date);
  if (!title || !date) return null;

  return {
    slug,
    title,
    date,
    description: data.description ?? content.slice(0, 160),
    category: data.category || undefined,
    cover: data.cover || undefined,
    content,
  };
}

export function listArticles(): ConseilArticle[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".md"))
    .map(readArticleFile)
    .filter((a): a is ConseilArticle => a !== null)
    .sort(
      (a, b) =>
        b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug),
    );
}

export function getArticle(slug: string): ConseilArticle | null {
  if (!slug || slug.includes("/") || slug.includes("\\")) return null;
  const file = `${slug}.md`;
  const full = path.join(CONTENT_DIR, file);
  if (!fs.existsSync(full)) return null;
  return readArticleFile(file);
}

export function formatDateFr(iso: string): string {
  const d = new Date(iso + (iso.length === 10 ? "T12:00:00" : ""));
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}
