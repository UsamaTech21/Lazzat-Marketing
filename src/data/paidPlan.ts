/** Paid marketing — first Meta Instagram flight only ($200). */

export const paidPlan = {
  title: "Paid Marketing Plan",
  subtitle: "First Meta ad on Instagram — $20/day · $200 · 10 days.",
  principle:
    "First spend on this Meta account. No invented results. Share live CPC, profile visits, and follower growth after the flight.",
  activeFlight: {
    name: "Lazzat: First Meta ad on Instagram",
    dailyCad: 20,
    totalCad: 200,
    days: 10,
    platform: "Instagram via Meta Ads Manager",
  },
  goals: [
    { priority: "Primary", text: "Grow Instagram followers" },
    {
      priority: "Secondary",
      text: "Promote lifetime 5% off — drive direct orders and store footfall",
    },
  ],
  rules: [
    "Ads Manager only — not Boost Post as primary.",
    "Geo: McVean 5 km + Clarence 8 km only. No Mayfield.",
    'No "halal" or "charcoal" in ads — lava stone / flame grill only.',
    "Report live metrics before any scale budget.",
  ],
  geo: [
    { pin: "McVean Dr", radiusKm: 5, detail: "Primary pin — 5 km" },
    { pin: "Clarence St", radiusKm: 8, detail: "Second pin — 8 km" },
  ],
  creatives: [
    { id: "c1", type: "Video", name: "5% off offer", role: "Offer" },
    { id: "c2", type: "Video", name: "Lazzat store", role: "Footfall" },
    { id: "c3", type: "Static", name: "Offer + claim steps", role: "How to redeem" },
  ],
  offer: "Lifetime 5% off — steps on static creative",
  kpis: [
    "Spend to $200 / 10 days",
    "CPC / cost per result (live)",
    "IG profile visits (live)",
    "Follower growth (live)",
    "Orders / footfall when trackable",
  ],
  askOfSir:
    "Approve Flight 1: $20/day · $200 / 10 days · McVean 5 km + Clarence 8 km · 3 creatives. Performance shared once live.",
  postLiveNote: "Will share performance once live for future planning.",
};
