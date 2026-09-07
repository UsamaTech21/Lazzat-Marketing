"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  disabled?: boolean;
  mode: "chat" | "strategy";
  onModeChange: (m: "chat" | "strategy") => void;
  plusOpen: boolean;
  onPlusOpenChange: (v: boolean) => void;
  webSearch: boolean;
  onWebSearchChange: (v: boolean) => void;
  onSend: (text: string) => void;
};

const SKILL_TOPICS = [
  "Brand locks",
  "Locations",
  "Menu",
  "Demographics",
  "Paid plan",
  "Current metrics",
  "Social calendar",
];

export function Composer({
  disabled,
  mode,
  onModeChange,
  plusOpen,
  onPlusOpenChange,
  webSearch,
  onWebSearchChange,
  onSend,
}: Props) {
  const [value, setValue] = useState("");
  const [skillsOpen, setSkillsOpen] = useState(false);
  const taRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  useEffect(() => {
    const el = taRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 180)}px`;
  }, [value]);

  const submit = () => {
    const t = value.trim();
    if (!t || disabled) return;
    setValue("");
    onSend(t);
  };

  return (
    <div className="relative mt-auto w-full">
      {(plusOpen || skillsOpen) && (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-10 cursor-default"
          onClick={() => {
            onPlusOpenChange(false);
            setSkillsOpen(false);
          }}
        />
      )}

      {plusOpen && (
        <div className="absolute bottom-[calc(100%+8px)] left-0 z-20 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
          <button
            type="button"
            className="block w-full px-3 py-2.5 text-left text-sm text-slate-400"
            disabled
            title="Coming in a later version"
          >
            Attach file (soon)
          </button>
          <button
            type="button"
            className="block w-full px-3 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50"
            onClick={() => {
              setSkillsOpen(true);
              onPlusOpenChange(false);
            }}
          >
            Skills / knowledge topics
          </button>
          <button
            type="button"
            className="flex w-full items-center justify-between px-3 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50"
            onClick={() => onWebSearchChange(!webSearch)}
          >
            <span>Web search</span>
            <span className="text-xs text-slate-400">{webSearch ? "On · live" : "Off"}</span>
          </button>
        </div>
      )}

      {skillsOpen && (
        <div className="absolute bottom-[calc(100%+8px)] left-0 z-20 w-64 overflow-hidden rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
          <p className="px-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            Knowledge topics
          </p>
          {SKILL_TOPICS.map((t) => (
            <button
              key={t}
              type="button"
              className="block w-full rounded-lg px-2 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
              onClick={() => {
                setValue((v) => (v ? `${v} ` : "") + `Tell me about Lazzat ${t.toLowerCase()}.`);
                setSkillsOpen(false);
                taRef.current?.focus();
              }}
            >
              {t}
            </button>
          ))}
        </div>
      )}

      <div className="rounded-2xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.06)]">
        <div className="flex items-center gap-2 border-b border-slate-100 px-3 py-2">
          <button
            type="button"
            onClick={() => onPlusOpenChange(!plusOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-lg text-slate-500 hover:bg-slate-50"
            aria-label="Open tools"
          >
            +
          </button>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => onModeChange("chat")}
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                mode === "chat" ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              Chat
            </button>
            <button
              type="button"
              onClick={() => {
                onModeChange("strategy");
                router.push("/strategy");
              }}
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                mode === "strategy" ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              Strategy
            </button>
          </div>
          {webSearch && (
            <span className="ml-auto rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-700 ring-1 ring-blue-100">
              Live web on
            </span>
          )}
        </div>

        <div className="flex items-end gap-2 px-3 py-3">
          <textarea
            ref={taRef}
            rows={1}
            value={value}
            disabled={disabled}
            placeholder="Ask anything about Lazzat…"
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit();
              }
            }}
            className="max-h-[180px] min-h-[28px] flex-1 resize-none bg-transparent text-[15px] text-slate-900 outline-none placeholder:text-slate-400"
          />
          <button
            type="button"
            disabled={disabled || !value.trim()}
            onClick={submit}
            className="mb-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white transition hover:bg-slate-800 disabled:opacity-40"
            aria-label="Send"
          >
            ↑
          </button>
        </div>
      </div>

      <p className="mt-2 text-center text-[11px] text-slate-400 md:hidden">
        <a href="/strategy" className="underline">
          Open strategy portal
        </a>
      </p>
    </div>
  );
}
