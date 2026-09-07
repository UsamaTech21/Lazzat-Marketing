const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

/**
 * Live free catalog changes often. Keep several working instruct models.
 * (Llama :free tiers were removed — do not use them.)
 */
export const PRIMARY_MODEL = "minimax/minimax-m3:free";
export const FALLBACK_MODELS = [
  "minimax/minimax-m2.7:free",
  "cohere/north-mini-code:free",
  "nvidia/nemotron-3.5-lightning:free",
  "google/gemma-4-26b-a4b-it:free",
  "poolside/laguna-s-2.1:free",
  "openrouter/free",
] as const;

export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export function getOpenRouterKey(): string | null {
  const key = process.env.OPENROUTER_API_KEY?.trim();
  return key || null;
}

function headers(key: string) {
  return {
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
    "HTTP-Referer": process.env.OPENROUTER_SITE_URL || "http://localhost:3000",
    "X-Title": process.env.OPENROUTER_APP_NAME || "Lazzat Marketing Assistant",
  };
}

/** Turn OpenRouter JSON / raw errors into a short user-facing message. */
export function friendlyError(raw: string): string {
  const text = (raw || "").trim();
  if (!text) return "Chat failed. Please try again.";
  try {
    const j = JSON.parse(text) as {
      error?: { message?: string; code?: number | string };
      message?: string;
    };
    const msg = j.error?.message || j.message || "";
    if (/unavailable for free/i.test(msg)) {
      return "That free model is offline right now. Trying another… If this persists, wait a minute and retry.";
    }
    if (/rate.?limit|temporarily rate/i.test(msg) || j.error?.code === 429) {
      return "Free model rate limit hit. Wait ~20 seconds and try again.";
    }
    if (/api key|unauthorized|401/i.test(msg)) {
      return "OpenRouter API key missing or invalid. Check .env OPENROUTER_API_KEY.";
    }
    if (msg) return msg.length > 180 ? `${msg.slice(0, 177)}…` : msg;
  } catch {
    /* not JSON */
  }
  if (/unavailable for free/i.test(text)) {
    return "Free model unavailable. Retry shortly — another model will be tried automatically.";
  }
  if (text.length > 180) return `${text.slice(0, 177)}…`;
  return text;
}

/** Strip model tool-call / safety-guard / thinking junk. */
export function sanitizeAssistantText(text: string): string {
  let out = text;
  out = out.replace(/<\|tool_call_start\|>[\s\S]*?<\|tool_call_end\|>/gi, "");
  out = out.replace(/<\|tool_call_start\|>[\s\S]*$/gi, "");
  out = out.replace(/<\/?\|?tool_call[_a-z]*\|?>/gi, "");
  out = out.replace(/read\(\s*file\s*=\s*['"][^'"]+['"]\s*\)/gi, "");
  out = out.replace(/\[\s*read\([^[\]]*\)(?:\s*,\s*read\([^[\]]*\))*\s*\]/gi, "");
  out = out.replace(/user\s*safety\s*:\s*safe/gi, "");
  out = out.replace(/response\s*safety\s*:\s*safe/gi, "");
  out = out.replace(/prompt\s*safety\s*:\s*\w+/gi, "");
  // Nemotron-style thinking dumps
  out = out.replace(/^Here's a thinking process:[\s\S]*?(?=\n\n[A-Z#*]|\n## |\n\*\*)/i, "");
  out = out.replace(/<think>[\s\S]*?<\/think>/gi, "");
  out = out.replace(/\n{3,}/g, "\n\n").trim();
  return out;
}

export function isJunkAssistantText(text: string): boolean {
  const t = sanitizeAssistantText(text);
  if (t.length < 24) return true;
  if (/tool_call|read\(file=/i.test(text)) return true;
  if (/^(user|response|prompt)\s*safety/i.test(t)) return true;
  if (/^safe$/i.test(t)) return true;
  if (/^error\s*:/i.test(t)) return true;
  if (/unavailable for free/i.test(t)) return true;
  return false;
}

async function collectChat(
  messages: ChatMessage[],
  model: string
): Promise<{ ok: boolean; text: string; status: number; err: string }> {
  const key = getOpenRouterKey();
  if (!key) return { ok: false, text: "", status: 500, err: "OPENROUTER_API_KEY is not set" };

  const res = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: headers(key),
    body: JSON.stringify({
      model,
      messages,
      stream: false,
      temperature: 0.35,
      max_tokens: 1800,
    }),
  });

  if (!res.ok) {
    const err = await res.text().catch(() => res.statusText);
    return { ok: false, text: "", status: res.status, err };
  }

  const json = (await res.json()) as {
    choices?: { message?: { content?: string | null } }[];
  };
  const text = json.choices?.[0]?.message?.content || "";
  return { ok: true, text, status: 200, err: "" };
}

/**
 * Try models until we get a real answer (not tool-call / safety junk).
 */
export async function completeWithFallback(
  messages: ChatMessage[]
): Promise<{ text: string; model: string }> {
  const models = [PRIMARY_MODEL, ...FALLBACK_MODELS];
  let lastErr = "";

  for (const model of models) {
    const result = await collectChat(messages, model);
    if (!result.ok) {
      lastErr = friendlyError(result.err);
      // Always try next free model (404 unavailable, 429 rate limit, 403, 5xx…)
      continue;
    }
    const cleaned = sanitizeAssistantText(result.text);
    if (!isJunkAssistantText(result.text) && cleaned.length >= 24) {
      return { text: cleaned, model };
    }
    lastErr = `Empty or unusable reply from ${model}`;
  }

  throw new Error(
    lastErr ||
      "All free models failed. Wait ~30 seconds for rate limits, then retry."
  );
}

export const SYSTEM_PROMPT = `You are the Lazzat Marketing Assistant for Lazzat Grill & Shakes (Brampton, Canada).

CRITICAL OUTPUT RULES:
- Reply ONLY with the helpful answer in Markdown.
- Never output tool calls, file paths, XML, <|...|> tags, or "User Safety" / "Response Safety" lines.
- Never say you will read a file — the knowledge is ALREADY in the message below. Use it now.
- Do not narrate your thinking process. Start with the answer.

Non-negotiables:
- Flame grilling is on volcanic lava stone — NEVER say charcoal.
- Do NOT use "halal" in customer-facing copy suggestions.
- Positioning: Canadian / Brampton local — not "Desi restaurant" as the lead identity.
- Only cite Current Situation metrics when they appear in the retrieved context. Do not invent numbers.
- Prefer concrete, actionable marketing advice.

Formatting:
- Use Markdown: **bold**, - bullets, ## headings.
- Short paragraphs. Lead with the direct answer.

When the user asks what Lazzat is: brand = flame-grill (lava stone) + real-fruit shakes in Brampton (McVean), Canadian positioning.
When the user asks about paid / ads / Meta / TikTok ads / marketing plan, summarize the Paid Marketing Plan from context: rules, geo, channels, creative, offers, week-1 actions.`;
