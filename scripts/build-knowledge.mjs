/**
 * Build Lazzat knowledge chunks for RAG.
 * Run: node scripts/build-knowledge.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const workspace = path.join(root, "..");
const outDir = path.join(root, "knowledge");
const learnedDir = path.join(outDir, "learned");

const CHUNK_SIZE = 1000;
const CHUNK_OVERLAP = 120;

function ensureDir(d) {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
}

function readSafe(file) {
  try {
    return fs.readFileSync(file, "utf8");
  } catch {
    return null;
  }
}

function listMd(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => path.join(dir, f));
}

function chunkText(text, source, title) {
  const clean = text.replace(/\r\n/g, "\n").trim();
  if (!clean) return [];
  const chunks = [];
  let i = 0;
  let part = 0;
  while (i < clean.length) {
    const end = Math.min(i + CHUNK_SIZE, clean.length);
    let slice = clean.slice(i, end);
    if (end < clean.length) {
      const lastBreak = Math.max(slice.lastIndexOf("\n\n"), slice.lastIndexOf("\n"), slice.lastIndexOf(" "));
      if (lastBreak > CHUNK_SIZE * 0.5) {
        slice = slice.slice(0, lastBreak);
      }
    }
    part += 1;
    chunks.push({
      id: `${source.replace(/[^a-zA-Z0-9]+/g, "_")}_${part}`,
      source,
      title: part === 1 ? title : `${title} (part ${part})`,
      text: slice.trim(),
    });
    if (slice.length === 0) break;
    i += Math.max(slice.length - CHUNK_OVERLAP, 1);
  }
  return chunks;
}

function ingestFile(filePath, sourceLabel, title) {
  const text = readSafe(filePath);
  if (!text) return [];
  return chunkText(text, sourceLabel, title || path.basename(filePath, path.extname(filePath)));
}

function ingestTsDataModule(filePath) {
  const text = readSafe(filePath);
  if (!text) return [];
  const name = path.basename(filePath, ".ts");
  // Strip imports/types lightly — keep string content for RAG
  const stripped = text
    .replace(/^import .+$/gm, "")
    .replace(/^export type[\s\S]*?=[\s\S]*?;/gm, "")
    .trim();
  return chunkText(stripped, `portal/data/${name}.ts`, `Portal data: ${name}`);
}

const allChunks = [];

// Marketing skill
const marketingDir = path.join(workspace, "Lazzat Marketing");
allChunks.push(...ingestFile(path.join(marketingDir, "SKILL.md"), "Lazzat Marketing/SKILL.md", "Lazzat Marketing Skill"));
for (const f of listMd(path.join(marketingDir, "references"))) {
  const base = path.basename(f);
  allChunks.push(...ingestFile(f, `Lazzat Marketing/references/${base}`, base.replace(/\.md$/, "")));
}

// Brain now
const brainNow = path.join(workspace, "lazzat brain now");
for (const f of listMd(brainNow)) {
  const base = path.basename(f);
  allChunks.push(...ingestFile(f, `lazzat brain now/${base}`, base.replace(/\.md$/, "")));
}

// Creative brain
allChunks.push(
  ...ingestFile(path.join(workspace, "Lazzat_Brain.md"), "Lazzat_Brain.md", "Lazzat Creative Brain")
);

// Portal data modules
const dataDir = path.join(root, "src", "data");
if (fs.existsSync(dataDir)) {
  for (const f of fs.readdirSync(dataDir).filter((x) => x.endsWith(".ts"))) {
    allChunks.push(...ingestTsDataModule(path.join(dataDir, f)));
  }
}

// Learned knowledge
ensureDir(learnedDir);
for (const f of listMd(learnedDir)) {
  const base = path.basename(f);
  allChunks.push(...ingestFile(f, `knowledge/learned/${base}`, `Learned: ${base.replace(/\.md$/, "")}`));
}

const filtered = allChunks.filter((c) => c.text && c.text.length > 40);

ensureDir(outDir);
fs.writeFileSync(path.join(outDir, "chunks.json"), JSON.stringify(filtered, null, 2), "utf8");
fs.writeFileSync(
  path.join(outDir, "manifest.json"),
  JSON.stringify(
    {
      builtAt: new Date().toISOString(),
      chunkCount: filtered.length,
      sources: [...new Set(filtered.map((c) => c.source))],
    },
    null,
    2
  ),
  "utf8"
);

console.log(`Built ${filtered.length} chunks → knowledge/chunks.json`);
console.log(`Sources: ${[...new Set(filtered.map((c) => c.source))].length}`);
