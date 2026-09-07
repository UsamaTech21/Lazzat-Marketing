import { NextRequest } from "next/server";
import { formatContext, retrieve } from "@/lib/rag";
import {
  completeWithFallback,
  friendlyError,
  SYSTEM_PROMPT,
  type ChatMessage,
} from "@/lib/openrouter";
import { formatWebContext, searchWeb } from "@/lib/webSearch";

export const runtime = "nodejs";

type Body = {
  messages?: { role: "user" | "assistant"; content: string }[];
  message?: string;
  webSearch?: boolean;
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Body;
    const history = body.messages ?? [];
    const wantWeb = Boolean(body.webSearch);
    const lastUser =
      body.message?.trim() ||
      [...history].reverse().find((m) => m.role === "user")?.content?.trim() ||
      "";

    if (!lastUser) {
      return Response.json({ error: "Message required" }, { status: 400 });
    }

    // Drop prior junk assistant turns so the model doesn't imitate them
    const cleanHistory = history.filter((m) => {
      if (m.role !== "assistant") return true;
      const c = m.content || "";
      if (/tool_call|User Safety|Response Safety|read\(file=/i.test(c)) return false;
      if (/^Error:/i.test(c.trim())) return false;
      if (/unavailable for free/i.test(c)) return false;
      return c.trim().length > 20;
    });

    const chunks = retrieve(lastUser);
    const context = formatContext(chunks);
    const sources: {
      id: string;
      title: string;
      source: string;
      score?: number;
      kind: "knowledge" | "web";
    }[] = chunks.map((c) => ({
      id: c.id,
      title: c.title,
      source: c.source,
      score: c.score,
      kind: "knowledge",
    }));

    let webBlock = "";
    if (wantWeb) {
      try {
        const hits = await searchWeb(lastUser, 5);
        webBlock = formatWebContext(hits);
        for (const h of hits) {
          sources.push({
            id: `web_${h.url}`,
            title: h.title,
            source: h.url,
            kind: "web",
          });
        }
      } catch {
        webBlock = "(Live web search failed — answer from Lazzat knowledge only.)";
      }
    }

    const system: ChatMessage = {
      role: "system",
      content: `${SYSTEM_PROMPT}\n\n--- Retrieved Lazzat knowledge ---\n${
        context || "(No matching chunks — answer from brand locks only and ask for clarification.)"
      }${
        wantWeb
          ? `\n\n--- Live web results (DuckDuckGo; not Google official) ---\n${webBlock}`
          : ""
      }`,
    };

    const recent = cleanHistory.slice(-8).map((m) => ({
      role: m.role,
      content: m.content,
    })) as ChatMessage[];

    if (!recent.length || recent[recent.length - 1].content !== lastUser) {
      recent.push({ role: "user", content: lastUser });
    }

    const { text, model } = await completeWithFallback([system, ...recent]);

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(
          encoder.encode(
            `event: meta\ndata: ${JSON.stringify({ sources, model, webSearch: wantWeb })}\n\n`
          )
        );

        // Chunk for smoother UI without mid-stream garbage
        const step = 24;
        for (let i = 0; i < text.length; i += step) {
          const token = text.slice(i, i + step);
          controller.enqueue(
            encoder.encode(`event: token\ndata: ${JSON.stringify({ token })}\n\n`)
          );
        }
        controller.enqueue(encoder.encode("event: done\ndata: {}\n\n"));
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch (err) {
    const raw = err instanceof Error ? err.message : "Chat failed";
    return Response.json({ error: friendlyError(raw) }, { status: 500 });
  }
}
