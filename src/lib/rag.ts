import fs from "fs";
import path from "path";

export type KnowledgeChunk = {
  id: string;
  source: string;
  title: string;
  text: string;
};

export type RetrievedChunk = KnowledgeChunk & { score: number };

const STOP = new Set([
  "a",
  "an",
  "the",
  "and",
  "or",
  "of",
  "to",
  "in",
  "on",
  "for",
  "is",
  "are",
  "was",
  "were",
  "be",
  "with",
  "as",
  "at",
  "by",
  "from",
  "that",
  "this",
  "it",
  "we",
  "you",
  "i",
  "our",
  "your",
  "about",
  "what",
  "how",
  "can",
  "do",
  "does",
  "me",
  "my",
  "please",
  "write",
  "tell",
  "give",
]);

let cachedChunks: KnowledgeChunk[] | null = null;
let cachedLearnedMtime = 0;

function knowledgeDir() {
  return path.join(process.cwd(), "knowledge");
}

function loadBaseChunks(): KnowledgeChunk[] {
  const file = path.join(knowledgeDir(), "chunks.json");
  if (!fs.existsSync(file)) return [];
  const raw = JSON.parse(fs.readFileSync(file, "utf8")) as KnowledgeChunk[];
  return raw;
}

function loadLearnedChunks(): KnowledgeChunk[] {
  const dir = path.join(knowledgeDir(), "learned");
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
  const out: KnowledgeChunk[] = [];
  for (const f of files) {
    const text = fs.readFileSync(path.join(dir, f), "utf8").trim();
    if (text.length < 20) continue;
    const title = f.replace(/\.md$/, "");
    out.push({
      id: `learned_${title}`,
      source: `knowledge/learned/${f}`,
      title: `Learned: ${title}`,
      text,
    });
  }
  return out;
}

function learnedMtime(): number {
  const dir = path.join(knowledgeDir(), "learned");
  if (!fs.existsSync(dir)) return 0;
  let max = 0;
  for (const f of fs.readdirSync(dir)) {
    const st = fs.statSync(path.join(dir, f));
    if (st.mtimeMs > max) max = st.mtimeMs;
  }
  return max;
}

export function getChunks(): KnowledgeChunk[] {
  const m = learnedMtime();
  if (!cachedChunks || m !== cachedLearnedMtime) {
    const base = loadBaseChunks().filter((c) => !c.source.startsWith("knowledge/learned/"));
    cachedChunks = [...base, ...loadLearnedChunks()];
    cachedLearnedMtime = m;
  }
  return cachedChunks;
}

export function invalidateChunkCache() {
  cachedChunks = null;
  cachedLearnedMtime = 0;
}

function tokenize(q: string): string[] {
  return q
    .toLowerCase()
    .replace(/[^a-z0-9\s$%-]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOP.has(t));
}

function scoreChunk(tokens: string[], chunk: KnowledgeChunk, queryLower: string): number {
  if (!tokens.length) return 0;
  const hay = `${chunk.title}\n${chunk.text}`.toLowerCase();
  const title = chunk.title.toLowerCase();
  const src = chunk.source.toLowerCase();
  let score = 0;
  for (const t of tokens) {
    if (title.includes(t)) score += 5;
    if (src.includes(t)) score += 2;
    const re = new RegExp(`\\b${t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "g");
    const matches = hay.match(re);
    if (matches) score += Math.min(matches.length, 8);
  }

  // Topic routing — stop demographics from winning "paid strategy" queries
  const wantsPaid =
    /\b(paid|ads?|advertis|meta ads|tiktok ads|boost|cpc|cpm|campaign)\b/.test(queryLower) ||
    /\bmarketing\s+strat/.test(queryLower);
  const wantsMetrics = /\b(metric|follower|impression|current situation|analytics)\b/.test(
    queryLower
  );
  const wantsBrand =
    /\b(brand|rules?|tagline|lava|halal|positioning)\b/.test(queryLower) ||
    /\bwhat\s+is\s+lazzat\b/.test(queryLower) ||
    /^lazzat\??$/.test(queryLower.trim());
  const wantsMenu = /\b(menu|shake|sajji|platter|bowl)\b/.test(queryLower);

  if (wantsPaid && (src.includes("paidplan") || /paid marketing/i.test(title))) score += 40;
  if (wantsPaid && src.includes("currentsituation")) score += 8;
  if (wantsMetrics && src.includes("currentsituation")) score += 35;
  if (wantsBrand && (src.includes("01-brand") || src.includes("skill.md") || src.includes("brand.ts")))
    score += 35;
  if (wantsMenu && src.includes("03-menu")) score += 25;

  // Penalize tiny / broken TS fragment chunks
  if (chunk.text.length < 120) score *= 0.35;
  if (/^[\s,{}\[\]"':]+$/.test(chunk.text.slice(0, 40))) score *= 0.2;

  // Light boost for brand-critical sources
  if (src.includes("01-brand") || src.includes("skill.md")) score += 1;
  if (src.includes("currentsituation") || src.includes("paidplan")) score += 2;
  return score;
}

export function retrieve(query: string, topK = 7): RetrievedChunk[] {
  const tokens = tokenize(query);
  const queryLower = query.toLowerCase();
  const scored = getChunks()
    .map((c) => ({ ...c, score: scoreChunk(tokens, c, queryLower) }))
    .filter((c) => c.score > 0)
    .sort((a, b) => b.score - a.score);

  // Dedupe near-identical titles so we don't fill with "part N" of same doc
  const picked: RetrievedChunk[] = [];
  const titleRoots = new Set<string>();
  let chars = 0;
  const maxChars = 6000;
  for (const c of scored) {
    if (picked.length >= topK) break;
    const root = c.title.replace(/\s*\(part \d+\)\s*$/i, "").toLowerCase();
    const sameRoot = [...picked].filter(
      (p) => p.title.replace(/\s*\(part \d+\)\s*$/i, "").toLowerCase() === root
    ).length;
    if (sameRoot >= 2) continue;
    if (chars + c.text.length > maxChars && picked.length >= 3) break;
    titleRoots.add(root);
    picked.push(c);
    chars += c.text.length;
  }
  return picked;
}

export function formatContext(chunks: RetrievedChunk[]): string {
  return chunks
    .map(
      (c, i) =>
        `[${i + 1}] ${c.title}\nSource: ${c.source}\n${c.text}`
    )
    .join("\n\n---\n\n");
}
