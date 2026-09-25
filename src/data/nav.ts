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

/** Full strategy — Tools / Execution / Control temporarily hidden */
export const FULL_NAV: NavItem[] = [
  { id: "current", label: "Current Situation", group: "0 · Snapshot", n: 0 },
  { id: "goals", label: "Goals", group: "1 · Strategy", n: 1 },
  { id: "audience", label: "Target Audience / ICPs", group: "1 · Strategy", n: 2 },
  { id: "competitors", label: "Competitor Research", group: "1 · Strategy", n: 3 },
  { id: "swot", label: "SWOT Analysis", group: "1 · Strategy", n: 4 },
  { id: "positioning", label: "Positioning & Value Prop", group: "1 · Strategy", n: 5 },
  { id: "brand-voice", label: "Brand Identity & Voice", group: "1 · Strategy", n: 6 },
  { id: "pricing", label: "Pricing", group: "1 · Strategy", n: 7 },
  { id: "funnel", label: "Customer Journey / Funnel", group: "2 · Growth", n: 8 },
  { id: "keywords", label: "Keyword Research", group: "2 · Growth", n: 9 },
  { id: "local-seo", label: "Local SEO / GMB", group: "2 · Growth", n: 10 },
  { id: "reputation", label: "Reputation & Reviews", group: "2 · Growth", n: 11 },
  { id: "organic", label: "Organic Marketing", group: "2 · Growth", n: 12 },
  { id: "influencer", label: "Influencer Marketing", group: "2 · Growth", n: 13 },
  { id: "paid", label: "Paid Marketing Plan", group: "2 · Growth", n: 14 },
  { id: "budget", label: "Budget & Resource Plan", group: "3 · Ops", n: 15 },
  { id: "timeline", label: "Timeline / Roadmap", group: "3 · Ops", n: 16 },
  { id: "kpis", label: "KPIs & Measurement", group: "3 · Ops", n: 17 },
  { id: "growth", label: "Growth Plan", group: "3 · Ops", n: 18 },
  { id: "cultural", label: "Cultural / Seasonal Calendar", group: "3 · Ops", n: 19 },
  { id: "next", label: "Next Actions", group: "3 · Ops", n: 20 },
];

/** @deprecated use SHORT_NAV / FULL_NAV */
export const NAV = SHORT_NAV;
