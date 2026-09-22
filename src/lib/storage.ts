export const STORAGE_KEYS = {
  checklist: "lazzat-portal-checklist",
  tasks: "lazzat-portal-tasks",
  keywords: "lazzat-portal-keywords",
  calendar: "lazzat-portal-calendar",
  costing: "lazzat-portal-costing",
  costingAssumptions: "lazzat-portal-costing-assumptions",
  fullStrategy: "lazzat-portal-full-strategy",
} as const;

export function loadJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function saveJson<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

export function clearKeys(keys: string[]) {
  if (typeof window === "undefined") return;
  keys.forEach((k) => localStorage.removeItem(k));
}
