"use client";

import { useEffect, useRef } from "react";
import { Markdown } from "./Markdown";

export type SourceChip = {
  id: string;
  title: string;
  source: string;
  score?: number;
  kind?: "knowledge" | "web";
};

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: number;
  sources?: SourceChip[];
  saving?: boolean;
  saved?: boolean;
  isError?: boolean;
};

type Props = {
  messages: ChatMessage[];
  streaming: boolean;
  onSave: (messageId: string) => void;
};

function dedupeSources(sources: SourceChip[]): SourceChip[] {
  const seen = new Set<string>();
  const out: SourceChip[] = [];
  for (const s of sources) {
    const key = `${s.kind || "knowledge"}:${s.title}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(s);
  }
  return out;
}

export function ChatThread({ messages, streaming, onSave }: Props) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streaming]);

  return (
    <div className="space-y-8 pb-6 pt-2">
      {messages.map((m, idx) => {
        const isLast = idx === messages.length - 1;
        const showCursor = streaming && isLast && m.role === "assistant";
        return (
          <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            {m.role === "user" ? (
              <div className="max-w-[85%] rounded-3xl bg-slate-900 px-4 py-3 text-[15px] leading-relaxed text-white sm:max-w-[75%]">
                <div className="whitespace-pre-wrap">{m.content}</div>
              </div>
            ) : (
              <div className="w-full max-w-2xl">
                <div className="mb-2 flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-900 text-[10px] font-bold text-white">
                    Lz
                  </span>
                  <span className="text-sm font-medium text-slate-800">Lazzat Assistant</span>
                </div>

                <div className="pl-9">
                  {m.content ? (
                    m.isError ? (
                      <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-[14px] leading-relaxed text-red-700">
                        {m.content}
                      </p>
                    ) : (
                      <Markdown content={m.content} />
                    )
                  ) : showCursor ? (
                    <p className="text-[15px] text-slate-400">Thinking…</p>
                  ) : null}
                  {showCursor && m.content && !m.isError ? (
                    <span className="ml-0.5 inline-block h-4 w-1.5 animate-pulse bg-slate-400 align-middle" />
                  ) : null}

                  {!m.isError && m.sources && m.sources.length > 0 && (
                    <SourcesRow sources={m.sources} />
                  )}

                  {!m.isError && m.content.trim() && !(streaming && isLast) && (
                    <div className="mt-3 flex justify-start">
                      <button
                        type="button"
                        disabled={m.saving || m.saved}
                        onClick={() => onSave(m.id)}
                        className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[12px] font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-60"
                      >
                        {m.saved
                          ? "Saved to knowledge"
                          : m.saving
                            ? "Saving…"
                            : "Save to knowledge"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
      <div ref={endRef} />
    </div>
  );
}

function SourcesRow({ sources }: { sources: SourceChip[] }) {
  const clean = dedupeSources(sources);
  const knowledge = clean.filter((s) => s.kind !== "web");
  const web = clean.filter((s) => s.kind === "web");

  return (
    <div className="mt-4 space-y-2 border-t border-slate-100 pt-3">
      {knowledge.length > 0 && (
        <div>
          <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            Knowledge sources
          </p>
          <div className="flex flex-wrap gap-1.5">
            {knowledge.map((s) => (
              <span
                key={s.id}
                title={s.source}
                className="rounded-full bg-slate-50 px-2.5 py-0.5 text-[11px] text-slate-600 ring-1 ring-slate-200"
              >
                {s.title.length > 36 ? `${s.title.slice(0, 34)}…` : s.title}
              </span>
            ))}
          </div>
        </div>
      )}
      {web.length > 0 && (
        <div>
          <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            Live web
          </p>
          <div className="flex flex-wrap gap-1.5">
            {web.map((s) => (
              <a
                key={s.id}
                href={s.source}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] text-blue-700 ring-1 ring-blue-100 hover:bg-blue-100"
              >
                {s.title.length > 36 ? `${s.title.slice(0, 34)}…` : s.title}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
