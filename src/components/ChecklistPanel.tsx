"use client";

import { useEffect, useMemo, useState } from "react";
import { checklistSeed } from "@/data/execution";
import { STORAGE_KEYS, loadJson, saveJson } from "@/lib/storage";

export function ChecklistPanel({ onProgress }: { onProgress: (pct: number) => void }) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setChecked(loadJson<Record<string, boolean>>(STORAGE_KEYS.checklist, {}));
  }, []);

  useEffect(() => {
    const total = checklistSeed.length;
    const done = checklistSeed.filter((i) => checked[i.id]).length;
    onProgress(total ? Math.round((done / total) * 100) : 0);
  }, [checked, onProgress]);

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      saveJson(STORAGE_KEYS.checklist, next);
      return next;
    });
  };

  const groups = useMemo(() => {
    const map = new Map<string, typeof checklistSeed>();
    checklistSeed.forEach((item) => {
      const list = map.get(item.group) ?? [];
      list.push(item);
      map.set(item.group, list);
    });
    return [...map.entries()];
  }, []);

  return (
    <div className="space-y-4">
      {groups.map(([group, items]) => (
        <div key={group} className="card">
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-[var(--gold)]">{group}</h3>
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item.id}>
                <label className="flex cursor-pointer items-start gap-3 rounded-lg px-2 py-2 hover:bg-white/5">
                  <input
                    type="checkbox"
                    className="mt-1 accent-[var(--gold)]"
                    checked={!!checked[item.id]}
                    onChange={() => toggle(item.id)}
                  />
                  <span className={checked[item.id] ? "text-[var(--muted)] line-through" : ""}>{item.label}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
