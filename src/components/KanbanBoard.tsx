"use client";

import { useEffect, useMemo, useState } from "react";
import { Task, TaskStatus, TeamRole, tasksSeed } from "@/data/execution";
import { STORAGE_KEYS, loadJson, saveJson } from "@/lib/storage";

const STATUSES: TaskStatus[] = ["todo", "in_progress", "review", "done", "blocked"];
const ROLES: TeamRole[] = ["designer", "writer", "marketer", "seo_dev"];

const STATUS_LABEL: Record<TaskStatus, string> = {
  todo: "To do",
  in_progress: "In progress",
  review: "Review",
  done: "Done",
  blocked: "Blocked",
};

export function KanbanBoard({
  onProgress,
  onSoftDelete,
}: {
  onProgress: (pct: number) => void;
  onSoftDelete: () => void;
}) {
  const [tasks, setTasks] = useState<Task[]>(tasksSeed);
  const [role, setRole] = useState<TeamRole | "all">("all");
  const [dragId, setDragId] = useState<string | null>(null);

  useEffect(() => {
    setTasks(loadJson<Task[]>(STORAGE_KEYS.tasks, tasksSeed));
  }, []);

  const persist = (next: Task[]) => {
    setTasks(next);
    saveJson(STORAGE_KEYS.tasks, next);
  };

  const active = useMemo(() => tasks.filter((t) => !t.deletedAt), [tasks]);
  const visible = useMemo(
    () => active.filter((t) => (role === "all" ? true : t.teamRole === role)),
    [active, role]
  );

  useEffect(() => {
    const done = active.filter((t) => t.status === "done").length;
    onProgress(active.length ? Math.round((done / active.length) * 100) : 0);
  }, [active, onProgress]);

  const move = (id: string, status: TaskStatus) => {
    persist(tasks.map((t) => (t.id === id ? { ...t, status } : t)));
  };

  const softDelete = (id: string) => {
    persist(tasks.map((t) => (t.id === id ? { ...t, deletedAt: new Date().toISOString() } : t)));
    onSoftDelete();
  };

  const addTask = () => {
    persist([
      ...tasks,
      {
        id: `t-${Date.now()}`,
        teamRole: role === "all" ? "marketer" : role,
        title: "New task",
        description: "Edit details",
        status: "todo",
        priority: "medium",
        weekNumber: 1,
      },
    ]);
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <select
          className="select max-w-[180px]"
          value={role}
          onChange={(e) => setRole(e.target.value as TeamRole | "all")}
        >
          <option value="all">All roles</option>
          {ROLES.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        <button type="button" className="btn" onClick={addTask}>
          Add task
        </button>
        <button type="button" className="btn" onClick={() => persist(tasksSeed)}>
          Reset seed
        </button>
      </div>

      <div className="kanban-board">
        {STATUSES.map((status) => (
          <div
            key={status}
            className="kanban-col"
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => {
              if (dragId) move(dragId, status);
              setDragId(null);
            }}
          >
            <div className="kanban-col-head">
              <span className="badge">{STATUS_LABEL[status]}</span>
              <span className="text-[11px] text-[var(--muted)]">
                {visible.filter((t) => t.status === status).length}
              </span>
            </div>
            {visible
              .filter((t) => t.status === status)
              .map((t) => (
                <div
                  key={t.id}
                  className="task-card"
                  draggable
                  onDragStart={() => setDragId(t.id)}
                >
                  <div className="mb-1.5 flex items-center justify-between gap-2">
                    <span className="badge">{t.teamRole}</span>
                    <button
                      type="button"
                      className="text-[10px] text-[var(--muted)] hover:text-[var(--danger)]"
                      onClick={() => softDelete(t.id)}
                    >
                      Delete
                    </button>
                  </div>
                  <input
                    className="input mb-0.5 font-medium"
                    value={t.title}
                    onChange={(e) =>
                      persist(tasks.map((x) => (x.id === t.id ? { ...x, title: e.target.value } : x)))
                    }
                  />
                  <textarea
                    className="textarea text-[11px] text-[var(--muted)]"
                    value={t.description}
                    onChange={(e) =>
                      persist(
                        tasks.map((x) => (x.id === t.id ? { ...x, description: e.target.value } : x))
                      )
                    }
                  />
                  <div className="mt-1.5 flex gap-2 text-[10px] uppercase tracking-wide text-[var(--muted)]">
                    <span>{t.priority}</span>
                    <span>·</span>
                    <span>W{t.weekNumber}</span>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
