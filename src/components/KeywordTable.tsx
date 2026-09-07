"use client";

import { useEffect, useState } from "react";
import { Keyword, keywordsSeed } from "@/data/growthCore";
import { STORAGE_KEYS, loadJson, saveJson } from "@/lib/storage";

export function KeywordTable({ onSoftDelete }: { onSoftDelete: () => void }) {
  const [rows, setRows] = useState<Keyword[]>(keywordsSeed);

  useEffect(() => {
    setRows(loadJson<Keyword[]>(STORAGE_KEYS.keywords, keywordsSeed));
  }, []);

  const persist = (next: Keyword[]) => {
    setRows(next);
    saveJson(STORAGE_KEYS.keywords, next);
  };

  const active = rows.filter((r) => !(r as Keyword & { deletedAt?: string }).deletedAt);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="btn"
          onClick={() =>
            persist([
              ...rows,
              {
                id: `k-${Date.now()}`,
                phrase: "new keyword",
                lane: "seo",
                priority: "P2",
                notes: "",
              },
            ])
          }
        >
          Add keyword
        </button>
        <button type="button" className="btn" onClick={() => persist(keywordsSeed)}>
          Reset keywords seed
        </button>
      </div>
      <div className="table-wrap">
        <table className="data">
          <thead>
            <tr>
              <th>Phrase</th>
              <th>Lane</th>
              <th>Priority</th>
              <th>Notes</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {active.map((r) => (
              <tr key={r.id}>
                <td>
                  <input
                    className="input"
                    value={r.phrase}
                    onChange={(e) =>
                      persist(rows.map((x) => (x.id === r.id ? { ...x, phrase: e.target.value } : x)))
                    }
                  />
                </td>
                <td>
                  <select
                    className="select"
                    value={r.lane}
                    onChange={(e) =>
                      persist(
                        rows.map((x) =>
                          x.id === r.id ? { ...x, lane: e.target.value as Keyword["lane"] } : x
                        )
                      )
                    }
                  >
                    <option value="gmb">gmb</option>
                    <option value="seo">seo</option>
                    <option value="content">content</option>
                    <option value="llmo">llmo</option>
                  </select>
                </td>
                <td>
                  <select
                    className="select"
                    value={r.priority}
                    onChange={(e) =>
                      persist(
                        rows.map((x) =>
                          x.id === r.id ? { ...x, priority: e.target.value as Keyword["priority"] } : x
                        )
                      )
                    }
                  >
                    <option>P0</option>
                    <option>P1</option>
                    <option>P2</option>
                  </select>
                </td>
                <td>
                  <input
                    className="input"
                    value={r.notes}
                    onChange={(e) =>
                      persist(rows.map((x) => (x.id === r.id ? { ...x, notes: e.target.value } : x)))
                    }
                  />
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-ghost text-[var(--danger)]"
                    onClick={() => {
                      persist(
                        rows.map((x) =>
                          x.id === r.id ? { ...x, deletedAt: new Date().toISOString() } as Keyword & { deletedAt: string } : x
                        )
                      );
                      onSoftDelete();
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
