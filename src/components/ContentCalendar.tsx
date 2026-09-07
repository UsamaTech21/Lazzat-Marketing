"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarItem, calendarSeed } from "@/data/execution";
import { STORAGE_KEYS, loadJson, saveJson } from "@/lib/storage";

const DAYS = ["Mon", "Wed", "Fri", "Sun"];

export function ContentCalendar({ onSoftDelete }: { onSoftDelete: () => void }) {
  const [items, setItems] = useState<CalendarItem[]>(calendarSeed);
  const [week, setWeek] = useState(1);

  useEffect(() => {
    setItems(loadJson<CalendarItem[]>(STORAGE_KEYS.calendar, calendarSeed));
  }, []);

  const persist = (next: CalendarItem[]) => {
    setItems(next);
    saveJson(STORAGE_KEYS.calendar, next);
  };

  const active = useMemo(
    () => items.filter((i) => !i.deletedAt && i.week === week),
    [items, week]
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {[1, 2, 3].map((w) => (
          <button
            key={w}
            type="button"
            className={`btn ${week === w ? "btn-active" : ""}`}
            onClick={() => setWeek(w)}
          >
            Week {w}
          </button>
        ))}
        <button type="button" className="btn" onClick={() => persist(calendarSeed)}>
          Reset calendar seed
        </button>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {DAYS.map((day) => {
          const slot = active.find((i) => i.day === day);
          return (
            <div key={day} className="card">
              <div className="mb-2 flex items-center justify-between">
                <span className="badge">{day}</span>
                {slot && (
                  <button
                    type="button"
                    className="text-xs text-[var(--danger)]"
                    onClick={() => {
                      persist(
                        items.map((x) =>
                          x.id === slot.id ? { ...x, deletedAt: new Date().toISOString() } : x
                        )
                      );
                      onSoftDelete();
                    }}
                  >
                    Remove
                  </button>
                )}
              </div>
              {slot ? (
                <div className="space-y-2">
                  <input
                    className="input"
                    value={slot.title}
                    onChange={(e) =>
                      persist(items.map((x) => (x.id === slot.id ? { ...x, title: e.target.value } : x)))
                    }
                  />
                  <div className="flex gap-2">
                    <input
                      className="input"
                      value={slot.format}
                      onChange={(e) =>
                        persist(
                          items.map((x) => (x.id === slot.id ? { ...x, format: e.target.value } : x))
                        )
                      }
                    />
                    <input
                      className="input max-w-[80px]"
                      value={slot.pillar}
                      onChange={(e) =>
                        persist(
                          items.map((x) => (x.id === slot.id ? { ...x, pillar: e.target.value } : x))
                        )
                      }
                      title="Pillar"
                    />
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  className="btn"
                  onClick={() =>
                    persist([
                      ...items,
                      {
                        id: `cal-${Date.now()}`,
                        day,
                        week,
                        title: "New post",
                        format: "Reel",
                        pillar: "5",
                      },
                    ])
                  }
                >
                  Add slot
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
