export type NavItem = {
  id: string;
  label: string;
  group: string;
  n: number;
};

/** Default Sir-facing view — $200 first Meta flight */
export const SHORT_NAV: NavItem[] = [
  { id: "current", label: "Current Situation", group: "Snapshot", n: 1 },
  { id: "goals", label: "Goals", group: "Snapshot", n: 2 },
  { id: "paid", label: "Paid Marketing Plan", group: "Flight", n: 3 },
  { id: "budget", label: "Budget & Resource Plan", group: "Flight", n: 4 },
  { id: "next", label: "Next Actions", group: "Flight", n: 5 },
];

/** Full strategy archive — unhide via portal toggle */
export const FULL_NAV: NavItem[] = [
  { id: "current", label: "Current Situation", group: "0 · Snapshot", n: 0 },
  { id: "goals", label: "Goals", group: "1 · Strategy", n: 1 },
  { id: "audience", label: "Target Audience / ICPs", group: "1 · Strategy", n: 2 },
  { id: "competitors", label: "Competitor Research", group: "1 · Strategy", n: 3 },
  { id: "swot", label: "SWOT Analysis", group: "1 · Strategy", n: 4 },
  { id: "positioning", label: "Positioning & Value Prop", group: "1 · Strategy", n: 5 },
  { id: "pricing", label: "Pricing", group: "1 · Strategy", n: 6 },
  { id: "costing", label: "Costing Calculator", group: "2 · Tools", n: 7 },
  { id: "funnel", label: "Customer Journey / Funnel", group: "2 · Growth", n: 8 },
  { id: "keywords", label: "Keyword Research", group: "2 · Growth", n: 9 },
  { id: "organic", label: "Organic Marketing", group: "2 · Growth", n: 10 },
  { id: "influencer", label: "Influencer Marketing", group: "2 · Growth", n: 11 },
  { id: "paid", label: "Paid Marketing Plan", group: "2 · Growth", n: 12 },
  { id: "budget", label: "Budget & Resource Plan", group: "3 · Ops", n: 13 },
  { id: "timeline", label: "Timeline / Roadmap", group: "3 · Ops", n: 14 },
  { id: "kpis", label: "KPIs & Measurement", group: "3 · Ops", n: 15 },
  { id: "growth", label: "Growth Plan", group: "3 · Ops", n: 16 },
  { id: "tasks", label: "Team Tasks (Kanban)", group: "4 · Execution", n: 17 },
  { id: "calendar", label: "Content Calendar", group: "4 · Execution", n: 18 },
  { id: "recycle", label: "Recycle Bin", group: "4 · Execution", n: 19 },
  { id: "findings", label: "Key Findings & Flags", group: "5 · Control", n: 20 },
  { id: "checklist", label: "Progress Checklist", group: "5 · Control", n: 21 },
  { id: "next", label: "Next Actions", group: "5 · Control", n: 22 },
];

/** @deprecated use SHORT_NAV / FULL_NAV */
export const NAV = SHORT_NAV;
