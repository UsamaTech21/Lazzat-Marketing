"use client";

import Link from "next/link";
import { useState } from "react";
import type { ChatSession } from "./AssistantShell";

type Props = {
  sessions: ChatSession[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onNew: () => void;
  onDelete: (id: string) => void;
};

export function SidebarChats({ sessions, activeId, onSelect, onNew, onDelete }: Props) {
  const [pendingDelete, setPendingDelete] = useState<ChatSession | null>(null);

  return (
    <>
      <aside className="hidden h-dvh w-[260px] shrink-0 flex-col border-r border-slate-200 bg-[#f5f5f4] md:flex">
        <div className="flex items-center gap-2 px-4 pb-2 pt-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-[11px] font-bold tracking-wide text-white">
            Lz
          </div>
          <div>
            <p className="text-[15px] font-semibold tracking-tight text-slate-900">Lazzat</p>
            <p className="text-[11px] text-slate-500">Marketing Assistant</p>
          </div>
        </div>

        <div className="px-3 pt-3">
          <button
            type="button"
            onClick={onNew}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-800 shadow-sm transition hover:bg-slate-50"
          >
            <span className="text-lg leading-none">+</span> New chat
          </button>
        </div>

        <nav className="mt-4 min-h-0 flex-1 overflow-y-auto px-2 pb-4">
          <p className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            Recents
          </p>
          {sessions.length === 0 && (
            <p className="px-2 text-xs text-slate-400">No chats yet</p>
          )}
          <ul className="space-y-0.5">
            {sessions.map((s) => (
              <li key={s.id} className="group relative">
                <button
                  type="button"
                  onClick={() => onSelect(s.id)}
                  className={`w-full rounded-lg px-2.5 py-2 pr-8 text-left text-[13px] transition ${
                    activeId === s.id
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-600 hover:bg-white/70"
                  }`}
                >
                  <span className="line-clamp-1">{s.title || "Untitled"}</span>
                </button>
                <button
                  type="button"
                  aria-label="Delete chat"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPendingDelete(s);
                  }}
                  className="absolute right-1.5 top-1/2 hidden -translate-y-1/2 rounded px-1.5 py-0.5 text-xs text-slate-400 hover:bg-slate-100 hover:text-slate-700 group-hover:block"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="shrink-0 border-t border-slate-200 p-3">
          <Link
            href="/"
            className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-white"
          >
            <span>Strategy portal</span>
            <span aria-hidden>→</span>
          </Link>
        </div>
      </aside>

      {pendingDelete && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-900/40 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-chat-title"
            className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-5 shadow-xl"
          >
            <h2 id="delete-chat-title" className="text-base font-semibold text-slate-900">
              Delete this chat?
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              “{pendingDelete.title || "Untitled"}” will be removed. This can’t be undone.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                onClick={() => setPendingDelete(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="rounded-xl bg-slate-900 px-3.5 py-2 text-sm font-medium text-white hover:bg-slate-800"
                onClick={() => {
                  onDelete(pendingDelete.id);
                  setPendingDelete(null);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
