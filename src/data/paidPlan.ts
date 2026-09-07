/** Brampton local restaurant paid playbook — illustrative CAD budgets labelled as plan. */

export const paidPlan = {
  title: "Paid Marketing Plan",
  subtitle:
    "Local takeaway grill playbook for Lazzat in Brampton — amplify what already works (Reels / FYP), convert within driving distance, measure orders and Maps actions — not vanity reach.",
  principle:
    "Do not invent formats. Pay to put proven organic winners in front of people within 3–8 km who can actually order tonight.",
  rules: [
    "Build in Ads Manager — do not use Boost Post as the primary system.",
    "Ads launch/reset on Tuesdays; next creative already in production while current ad runs.",
    "Same hero creative can ship Meta + TikTok same day; captions stay platform-native.",
    'Never say "halal" or "charcoal" in ads — lava stone / flame grill / clean meat only.',
    "Clarence geo only when location confirmed live; Mayfield never in ads until open.",
  ],
  objectives: [
    {
      stage: "Awareness",
      meta: "Reach / Video views (Reels)",
      kpi: "Thumb-stop rate, cost per 15s view, profile visits",
    },
    {
      stage: "Consideration",
      meta: "Traffic to lazzat.ca / menu / Toast",
      kpi: "CTR, landing engagement, add-to-order proxies",
    },
    {
      stage: "Conversion",
      meta: "Messages / calls / store traffic (where available)",
      kpi: "Cost per message, GMB direction requests, delivery orders in window",
    },
    {
      stage: "Retention",
      meta: "Engagement retarget engagers + site visitors 7–30d",
      kpi: "Frequency cap, repeat order rate, review UGC",
    },
  ],
  geo: [
    { zone: "Core", detail: "3–5 km around 11685 McVean Dr — primary spend" },
    { zone: "Stretch", detail: "5–8 km for weekend platter / family occasions" },
    { zone: "Clarence", detail: "Add pin only when GMB status = open" },
    { zone: "Exclude", detail: "Broad GTA / outside realistic drive time" },
  ],
  channels: [
    {
      ch: "Meta (IG + FB)",
      role: "Primary paid",
      detail:
        "Promote top organic Reels (non-follower heavy). Advantage+ placements OK. Age 18–45 broad inside geo; let algorithm optimize. Offer variants: Dish of Weekend, bowl+shake, review+tag.",
    },
    {
      ch: "TikTok Ads / Spark",
      role: "Discovery scale",
      detail:
        "Spark Ads on FYP winners. Lean into search-intent topics already showing: vegetarian Brampton, whole chicken, skewers, veg platter.",
    },
    {
      ch: "Google Local / Search",
      role: "High intent",
      detail:
        "Keywords: flame grill Brampton, chicken sajji Brampton, biryani takeaway Brampton, paneer tikka Brampton, takeaway McVean. Light Performance Max after search baseline. GMB promotions when reviews rise.",
    },
    {
      ch: "YouTube",
      role: "Hold",
      detail: "No paid until organic posting baseline exists (0 posts in last Metricool window).",
    },
  ],
  creativeBrief: [
    "First 2 seconds = food in motion (lava stone, steam, pour) — no long logo intro.",
    "10–20s vertical Reels; captions burned in; end card: location + order CTA.",
    "UGC-style kitchen footage beats over-produced studio for local restaurants.",
    "Hook bank from proven posts: weighed 200g cubes, hours 11–11, lava stone skewers, vegetarian platter.",
    "Always subtitle for sound-off; dark luxury look consistent with brand.",
  ],
  offers: [
    { name: "Dish of the Weekend", detail: "Announce Thu; Fri–Sun 10–15% — paid amplify Thu night" },
    { name: "Review + tag", detail: "In-store / bag QR path; social proof creative" },
    { name: "Bowl + shake combo", detail: "Dual pillar offer for young Canada / second-gen" },
    { name: "Family platter occasion", detail: "Weekend stretch geo; Vaisakhi/Eid/Diwali calendar" },
  ],
  budgetBands: [
    { phase: "Week 1–2 test", cad: "$150–300", focus: "2–3 Reel ads · McVean 3–5 km · learn CPM/CPR" },
    { phase: "Month 1", cad: "$800–1,500", focus: "Awareness + traffic split · kill losers weekly" },
    { phase: "Month 2–3 scale", cad: "$1,500–3,000+", focus: "Scale winners · add Google Local · retargeting" },
  ],
  weeklyThemes: [
    "The Proof — amplify best organic Reel",
    "The Flame — lava stone process close-ups",
    "The Table — platter / family occasion",
    "The Offer — Dish of Weekend / combo",
  ],
  kpis: [
    "Follower conversion (impressions → follows) — close the flat-163 gap",
    "Cost per profile visit / cost per link click",
    "GMB calls + direction requests in spend windows",
    "Delivery app orders / Toast orders (same-day attribution window)",
    "Reel 3s view rate and hold to CTA",
    "Not primary: raw reach alone",
  ],
  growthStages: [
    {
      id: "A",
      name: "Stabilize",
      from: "163 followers · spiky impressions",
      actions: "4×/week Reels quality lock · compliance pass · GMB review machine",
    },
    {
      id: "B",
      name: "Amplify",
      from: "Organic winners identified",
      actions: "Paid on top 3 Reels · Tue creative reset · 3–5 km geo",
    },
    {
      id: "C",
      name: "Convert",
      from: "Reach without orders",
      actions: "Offer-led traffic campaigns · message ads · review+tag creative",
    },
    {
      id: "D",
      name: "Compound",
      from: "Engager / customer lists",
      actions: "Lookalikes · occasion calendar · catering campaigns",
    },
  ],
};
