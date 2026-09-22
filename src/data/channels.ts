export const organic = {
  title: "Organic Marketing",
  pillars: [
    "We Respect Every Table",
    "Your Culture, Your Plate",
    "Build Your Own Plate",
    "Real Flame. Not Overpriced.",
    "Live Grill Experience",
    "Speed + Brampton Community",
  ],
  rhythm: [
    { day: "Monday 12–1pm", format: "Photo/Carousel", pillar: "1 or 2" },
    { day: "Wednesday 6–8pm", format: "Reel", pillar: "4 or 5" },
    { day: "Friday 5–7pm", format: "Photo/Carousel", pillar: "3 or 4" },
    { day: "Sunday 6–9pm", format: "Reel", pillar: "2 or 6" },
  ],
  visualRules: [
    "Dark near-black BG; food pops",
    "Warm amber/gold flame light — never cool clinical",
    "Show char marks, steam, drizzle, cut interior",
    "Logo subtle bottom corner",
    "Video 9:16 + subtitles always",
  ],
  gmb: [
    "Category: Takeout Restaurant",
    "20+ photos at launch; weekly adds",
    "Weekly GMB post: food photo + 100–150 words + CTA",
    "Respond to every review ≤24h",
  ],
  blogs: "2 posts/week on site and/or Medium @lazzat.ca — local Brampton FAQ + menu internal links.",
};

export const influencer = {
  title: "Influencer Marketing",
  approach: "Direct local Brampton micro-influencer outreach beats marketplace platforms for fit.",
  process: [
    "Personal DM — no rigid script",
    "Complimentary tasting for two",
    "Ask to add @lazzat.ca as collaborator on reel",
    "Soha handles on-ground hospitality when remote",
    "WhatsApp follow-up",
    "Early phase: food only — no cash",
  ],
  avoid: "Collabstr-style paid-collab spam lists as primary channel.",
};

export const budget = {
  title: "Budget & Resource Plan",
  status: "pending" as const,
  note: "Full Budget & Resource Plan is not set yet.",
  pendingMessage:
    "Pending finance / ops allocation. Active paid spend right now is Flight 1 only: $200 / 10 days ($20/day) — see Paid Marketing Plan.",
  lines: [] as { line: string; pct: number }[],
};

export const timeline = {
  title: "Timeline / Roadmap",
  months: [
    { m: "M1 Ignite", theme: "Brand exists", goals: "GMB optimized, IG/TikTok/FB live, QR reviews, blogs 1–2, delivery live" },
    { m: "M2 Build", theme: "People discover", goals: "Influencers, loyalty stamp, WhatsApp list, Dish of Weekend, Meta tests" },
    { m: "M3 Amplify", theme: "People trust", goals: "Summer/Carnival content, catering first win, hero photo shoot" },
    { m: "M4 Dominate", theme: "People prefer", goals: "Guerrilla props, Google Local, sauce challenge, Top-of-local push" },
    { m: "M5 Celebrate", theme: "People recommend", goals: "Navratri/Diwali prep, testimonials, 4.5★ trajectory" },
    { m: "M6 Scale", theme: "People loyal", goals: "Diwali campaign, SEO page-1 chase, franchise planning inputs" },
  ],
  caveat: "Month follower/review numbers in legacy decks are aspirational plans — verify live dashboards.",
};

export const kpis = {
  title: "KPIs & Measurement",
  baseline: "Aug–Sep 2026 baseline: 163 followers · ~19.05K impressions · 336 interactions · 109 posts.",
  weekly: [
    { kpi: "GMB", metrics: "Reviews, stars, calls, direction requests, photo views" },
    { kpi: "Instagram", metrics: "Followers (from 91), Reel views, engagement 4%+, profile visits" },
    { kpi: "TikTok", metrics: "Followers (from 37), FYP views, profile visits, follows from non-followers" },
    { kpi: "Facebook", metrics: "Views growth, 3s views, engagement — watch retention" },
    { kpi: "Paid", metrics: "CPR / CPC / cost per message · not vanity reach alone" },
    { kpi: "Delivery / Toast", metrics: "Orders/week, rating, reorder rate in spend windows" },
    { kpi: "Web/SEO", metrics: "Organic sessions, keyword ranks, menu page visits" },
  ],
  growthTargets: [
    { horizon: "30 days", followers: "250–400 total", notes: "Cadence + CTA + light paid test" },
    { horizon: "90 days", followers: "800–1,500 total", notes: "Paid amplify winners + offers" },
    { horizon: "180 days", followers: "2,500–4,000 total", notes: "Lookalikes + occasions" },
  ],
  planTargetsLegacy: [
    { month: "Legacy M1 deck", ig: "300*", gmb: "50+*" },
    { month: "Legacy M3 deck", ig: "1,200*", gmb: "150+*" },
    { month: "Legacy M6 deck", ig: "3,000+*", gmb: "300+*" },
  ],
  starNote: "* = old launch-deck aspirations — superseded by Current Situation baselines + growth targets above",
};

export const growth = {
  title: "Growth Plan",
  summary:
    "From today's measured floor (163 followers, strong Reel/FYP reach): stabilize quality → pay to amplify winners → convert with offers → compound with lookalikes.",
  levers: [
    "Amplify top organic Reels with Meta/TikTok paid (3–5 km)",
    "Follower CTAs on every Reel end card",
    "GMB review machine (QR + verbal + WhatsApp)",
    "Bill-time follow-and-review discount",
    "Reel coupon codes → delivery apps",
    "Dish of the Weekend (Thu announce → paid Thu night)",
    "Micro-influencer collaborator reels (@lazzat.ca)",
    "Google Local on sajji / biryani / paneer / flame grill Brampton",
    "Cultural calendar campaigns",
    "Catering SEO + form",
  ],
  pendingApprovals: [
    "Paid test budget approval ($150–300 week 1–2)",
    "Social growth proposal (discount / giveaway / sequencing)",
    "Next 7 posts PDF for Sir Waqas",
    "Menu Engineer group formation",
  ],
};
