"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { SidebarChats } from "./SidebarChats";
import { ChatThread, type ChatMessage, type SourceChip } from "./ChatThread";
import { Composer } from "./Composer";

const STORAGE_KEY = "lazzat-assistant-chats-v1";

export type ChatSession = {
  id: string;
  title: string;
  updatedAt: number;
  messages: ChatMessage[];
};

function uid() {
  return `${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function loadSessions(): ChatSession[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as ChatSession[];
  } catch {
    return [];
  }
}

function saveSessions(sessions: ChatSession[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions.slice(0, 40)));
}

const SUGGESTIONS = [
  { label: "Write caption", prompt: "Write 3 Instagram caption options for a flame-grill platter Reel at McVean." },
  { label: "Brand rules", prompt: "List Lazzat brand non-negotiables for customer-facing copy." },
  { label: "Paid plan", prompt: "Summarize the Lazzat paid marketing plan and first week actions." },
  { label: "Current metrics", prompt: "What do Current Situation metrics say about followers, impressions, and conversion?" },
  { label: "Menu", prompt: "Give a quick menu highlight pitch for shakes + grill suitable for Reels." },
];

export function AssistantShell() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"chat" | "strategy">("chat");
  const [plusOpen, setPlusOpen] = useState(false);
  const [webSearch, setWebSearch] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const loaded = loadSessions();
    setSessions(loaded);
    if (loaded[0]) setActiveId(loaded[0].id);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveSessions(sessions);
  }, [sessions, hydrated]);

  const active = useMemo(
    () => sessions.find((s) => s.id === activeId) || null,
    [sessions, activeId]
  );

  const upsertSession = useCallback((next: ChatSession) => {
    setSessions((prev) => {
      const rest = prev.filter((s) => s.id !== next.id);
      return [next, ...rest].sort((a, b) => b.updatedAt - a.updatedAt);
    });
  }, []);

  const newChat = useCallback(() => {
    const s: ChatSession = {
      id: uid(),
      title: "New chat",
      updatedAt: Date.now(),
      messages: [],
    };
    setActiveId(s.id);
    setSessions((prev) => [s, ...prev]);
    setError(null);
  }, []);

  const send = useCallback(
    async (text: string) => {
      const content = text.trim();
      if (!content || streaming) return;

      let session = active;
      if (!session) {
        session = { id: uid(), title: content.slice(0, 48), updatedAt: Date.now(), messages: [] };
        setActiveId(session.id);
      }

      const userMsg: ChatMessage = {
        id: uid(),
        role: "user",
        content,
        createdAt: Date.now(),
      };
      const assistantId = uid();
      const assistantMsg: ChatMessage = {
        id: assistantId,
        role: "assistant",
        content: "",
        createdAt: Date.now(),
        sources: [],
        saving: false,
        saved: false,
      };

      const title =
        session.messages.length === 0 ? content.slice(0, 48) : session.title;
      let working: ChatSession = {
        ...session,
        title,
        updatedAt: Date.now(),
        messages: [...session.messages, userMsg, assistantMsg],
      };
      upsertSession(working);
      setStreaming(true);
      setError(null);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            webSearch,
            messages: working.messages
              .filter((m) => m.id !== assistantId)
              .map((m) => ({ role: m.role, content: m.content })),
          }),
        });

        if (!res.ok || !res.body) {
          const errBody = (await res.json().catch(() => ({ error: res.statusText }))) as {
            error?: string;
          };
          throw new Error(errBody.error || "Chat request failed");
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let full = "";
        let sources: SourceChip[] = [];

        const applyAssistant = (patch: Partial<ChatMessage>) => {
          working = {
            ...working,
            updatedAt: Date.now(),
            messages: working.messages.map((m) =>
              m.id === assistantId ? { ...m, ...patch } : m
            ),
          };
          upsertSession(working);
        };

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const parts = buffer.split("\n\n");
          buffer = parts.pop() || "";

          for (const part of parts) {
            const lines = part.split("\n");
            let event = "message";
            let data = "";
            for (const line of lines) {
              if (line.startsWith("event:")) event = line.slice(6).trim();
              if (line.startsWith("data:")) data += line.slice(5).trim();
            }
            if (!data) continue;
            try {
              const json = JSON.parse(data) as {
                token?: string;
                sources?: SourceChip[];
                model?: string;
                error?: string;
                content?: string;
              };
              if (event === "meta" && json.sources) {
                sources = json.sources;
                applyAssistant({ sources });
              } else if (event === "token" && json.token) {
                full += json.token;
                applyAssistant({ content: full, sources });
              } else if (event === "replace" && typeof json.content === "string") {
                full = json.content;
                applyAssistant({ content: full, sources });
              } else if (event === "error" && json.error) {
                throw new Error(json.error);
              }
            } catch (e) {
              if (e instanceof SyntaxError) continue;
              throw e;
            }
          }
        }

        if (!full.trim()) {
          applyAssistant({
            content: "No response generated. Check OpenRouter key / free model availability.",
            sources,
          });
        }
      } catch (e) {
        const raw = e instanceof Error ? e.message : "Something went wrong";
        let msg = raw;
        try {
          const parsed = JSON.parse(raw) as { error?: string };
          if (parsed.error) msg = parsed.error;
        } catch {
          /* already plain */
        }
        // Collapse raw OpenRouter JSON if it leaked through
        if (/unavailable for free/i.test(msg)) {
          msg = "Free AI model is busy or offline. Wait ~20 seconds and try again.";
        } else if (msg.length > 220 || msg.trim().startsWith("{")) {
          msg = "Couldn’t get an answer from the free model. Wait a moment and retry.";
        }
        setError(msg);
        upsertSession({
          ...working,
          messages: working.messages.map((m) =>
            m.id === assistantId
              ? {
                  ...m,
                  content: m.content || msg,
                  isError: true,
                  sources: [],
                }
              : m
          ),
        });
      } finally {
        setStreaming(false);
      }
    },
    [active, streaming, upsertSession, webSearch]
  );

  const saveToKnowledge = useCallback(
    async (messageId: string) => {
      if (!active) return;
      const assistant = active.messages.find((m) => m.id === messageId);
      if (!assistant || assistant.role !== "assistant" || !assistant.content.trim()) return;
      const idx = active.messages.findIndex((m) => m.id === messageId);
      const question =
        [...active.messages.slice(0, idx)].reverse().find((m) => m.role === "user")?.content ||
        active.title;

      upsertSession({
        ...active,
        messages: active.messages.map((m) =>
          m.id === messageId ? { ...m, saving: true } : m
        ),
      });

      try {
        const res = await fetch("/api/learn", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question,
            answer: assistant.content,
            tags: ["assistant-approved"],
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Save failed");
        setSessions((prev) =>
          prev.map((s) =>
            s.id !== active.id
              ? s
              : {
                  ...s,
                  messages: s.messages.map((m) =>
                    m.id === messageId ? { ...m, saving: false, saved: true } : m
                  ),
                }
          )
        );
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Save failed";
        setError(msg);
        setSessions((prev) =>
          prev.map((s) =>
            s.id !== active.id
              ? s
              : {
                  ...s,
                  messages: s.messages.map((m) =>
                    m.id === messageId ? { ...m, saving: false } : m
                  ),
                }
          )
        );
      }
    },
    [active, upsertSession]
  );

  const deleteSession = useCallback(
    (id: string) => {
      setSessions((prev) => {
        const next = prev.filter((s) => s.id !== id);
        if (activeId === id) setActiveId(next[0]?.id ?? null);
        return next;
      });
    },
    [activeId]
  );

  const showWelcome = !active || active.messages.length === 0;

  const composer = (
    <>
      {error && (
        <p className="mb-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-left text-sm text-red-700">
          {error}
        </p>
      )}
      <Composer
        disabled={streaming}
        mode={mode}
        onModeChange={setMode}
        plusOpen={plusOpen}
        onPlusOpenChange={setPlusOpen}
        webSearch={webSearch}
        onWebSearchChange={setWebSearch}
        onSend={send}
      />
    </>
  );

  return (
    <div className="assistant-shell flex h-dvh overflow-hidden bg-[#fafafa] text-slate-900">
      <SidebarChats
        sessions={sessions}
        activeId={activeId}
        onSelect={setActiveId}
        onNew={newChat}
        onDelete={deleteSession}
      />

      <main className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(29,78,216,0.05),_transparent_55%)]" />

        <div className="relative mx-auto flex min-h-0 w-full max-w-3xl flex-1 flex-col px-4 pt-6 sm:px-6">
          {showWelcome ? (
            <div className="flex min-h-0 flex-1 flex-col items-center justify-center overflow-y-auto px-1 pb-8 text-center">
              <p className="font-[family-name:var(--font-display)] text-4xl tracking-tight text-slate-900 sm:text-5xl">
                You&apos;re here
                <span className="ml-1 inline-block h-2.5 w-2.5 translate-y-[-0.35em] rounded-sm bg-blue-600" />
              </p>
              <p className="mt-3 max-w-md text-[15px] text-slate-500">
                Ask anything about Lazzat brand, menu, paid plan, or current metrics.
              </p>
              <div className="mt-8 flex w-full max-w-2xl flex-wrap justify-center gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s.label}
                    type="button"
                    onClick={() => send(s.prompt)}
                    className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-[13px] text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              <div className="mt-8 w-full max-w-2xl text-left">{composer}</div>
            </div>
          ) : (
            <>
              <div className="min-h-0 flex-1 overflow-y-auto pr-1">
                <ChatThread
                  messages={active!.messages}
                  streaming={streaming}
                  onSave={saveToKnowledge}
                />
              </div>
              <div className="shrink-0 bg-[#fafafa] pb-4 pt-2">{composer}</div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
