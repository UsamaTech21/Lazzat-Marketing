export type WebHit = {
  title: string;
  url: string;
  snippet: string;
};

/**
 * Lightweight live web search via DuckDuckGo HTML (no API key).
 * Not Google-official; good enough for local competitor / trend lookups.
 */
export async function searchWeb(query: string, limit = 5): Promise<WebHit[]> {
  const q = query.trim().slice(0, 200);
  if (!q) return [];

  const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(q)}`;
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; LazzatAssistant/1.0; +http://localhost)",
      Accept: "text/html",
    },
    next: { revalidate: 0 },
  });

  if (!res.ok) return [];
  const html = await res.text();
  const hits: WebHit[] = [];

  // DuckDuckGo result blocks
  const blockRe =
    /<a[^>]*class="result__a"[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>[\s\S]*?(?:class="result__snippet"[^>]*>([\s\S]*?)<\/(?:a|td)>)?/gi;

  let m: RegExpExecArray | null;
  while ((m = blockRe.exec(html)) && hits.length < limit) {
    const rawUrl = decodeDuckRedirect(m[1]);
    const title = stripTags(m[2]).trim();
    const snippet = stripTags(m[3] || "").trim();
    if (!title || !rawUrl.startsWith("http")) continue;
    hits.push({ title, url: rawUrl, snippet });
  }

  // Fallback: simpler anchors if markup differs
  if (!hits.length) {
    const simple = /<a[^>]+href="(https?:\/\/[^"]+)"[^>]*class="[^"]*result[^"]*"[^>]*>([\s\S]*?)<\/a>/gi;
    while ((m = simple.exec(html)) && hits.length < limit) {
      hits.push({
        title: stripTags(m[2]).trim() || m[1],
        url: m[1],
        snippet: "",
      });
    }
  }

  return hits;
}

function stripTags(s: string) {
  return s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
}

function decodeDuckRedirect(href: string) {
  try {
    if (href.includes("uddg=")) {
      const u = new URL(href, "https://duckduckgo.com");
      const target = u.searchParams.get("uddg");
      if (target) return decodeURIComponent(target);
    }
  } catch {
    /* ignore */
  }
  return href.startsWith("//") ? `https:${href}` : href;
}

export function formatWebContext(hits: WebHit[]): string {
  if (!hits.length) return "(No live web results returned.)";
  return hits
    .map(
      (h, i) =>
        `[Web ${i + 1}] ${h.title}\nURL: ${h.url}\n${h.snippet || "(no snippet)"}`
    )
    .join("\n\n");
}
