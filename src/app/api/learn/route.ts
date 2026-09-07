import { NextRequest } from "next/server";
import fs from "fs";
import path from "path";
import { invalidateChunkCache } from "@/lib/rag";

export const runtime = "nodejs";

type Body = {
  question?: string;
  answer?: string;
  tags?: string[];
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Body;
    const question = body.question?.trim();
    const answer = body.answer?.trim();
    if (!question || !answer) {
      return Response.json({ error: "question and answer required" }, { status: 400 });
    }

    const tags = (body.tags || []).filter(Boolean);
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    const slug = slugify(question) || "note";
    const filename = `${stamp}_${slug}.md`;
    const dir = path.join(process.cwd(), "knowledge", "learned");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const md = `# Learned Q&A

**Saved:** ${new Date().toISOString()}
${tags.length ? `**Tags:** ${tags.join(", ")}\n` : ""}
## Question
${question}

## Answer
${answer}
`;

    fs.writeFileSync(path.join(dir, filename), md, "utf8");
    invalidateChunkCache();

    return Response.json({
      ok: true,
      file: `knowledge/learned/${filename}`,
      title: `Learned: ${filename.replace(/\.md$/, "")}`,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Learn failed";
    return Response.json({ error: msg }, { status: 500 });
  }
}
