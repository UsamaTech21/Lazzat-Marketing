"use client";

import { useEffect, useState } from "react";
import { Task, tasksSeed } from "@/data/execution";
import { CalendarItem, calendarSeed } from "@/data/execution";
import { STORAGE_KEYS, loadJson, saveJson } from "@/lib/storage";

export function RecycleBin({ refreshKey }: { refreshKey: number }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [calendar, setCalendar] = useState<CalendarItem[]>([]);

  const reload = () => {
    setTasks(loadJson<Task[]>(STORAGE_KEYS.tasks, tasksSeed).filter((t) => t.deletedAt));
    setCalendar(
      loadJson<CalendarItem[]>(STORAGE_KEYS.calendar, calendarSeed).filter((c) => c.deletedAt)
    );
  };

  useEffect(() => {
    reload();
  }, [refreshKey]);

  const restoreTask = (id: string) => {
    const all = loadJson<Task[]>(STORAGE_KEYS.tasks, tasksSeed).map((t) =>
      t.id === id ? { ...t, deletedAt: null } : t
    );
    saveJson(STORAGE_KEYS.tasks, all);
    reload();
  };

  const restoreCal = (id: string) => {
    const all = loadJson<CalendarItem[]>(STORAGE_KEYS.calendar, calendarSeed).map((c) =>
      c.id === id ? { ...c, deletedAt: null } : c
    );
    saveJson(STORAGE_KEYS.calendar, all);
    reload();
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="card">
        <h3 className="mb-2 text-sm font-bold text-[var(--gold)]">Tasks ({tasks.length})</h3>
        {tasks.length === 0 && <p className="text-sm text-[var(--muted)]">Empty</p>}
        {tasks.map((t) => (
          <div key={t.id} className="mb-2 flex items-center justify-between gap-2 text-sm">
            <span>{t.title}</span>
            <button type="button" className="btn" onClick={() => restoreTask(t.id)}>
              Restore
            </button>
          </div>
        ))}
      </div>
      <div className="card">
        <h3 className="mb-2 text-sm font-bold text-[var(--gold)]">Calendar ({calendar.length})</h3>
        {calendar.length === 0 && <p className="text-sm text-[var(--muted)]">Empty</p>}
        {calendar.map((c) => (
          <div key={c.id} className="mb-2 flex items-center justify-between gap-2 text-sm">
            <span>
              W{c.week} {c.day}: {c.title}
            </span>
            <button type="button" className="btn" onClick={() => restoreCal(c.id)}>
              Restore
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
