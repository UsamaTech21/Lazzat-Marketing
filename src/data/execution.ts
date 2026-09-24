export type TeamRole = "designer" | "writer" | "marketer" | "seo_dev";
export type TaskStatus = "todo" | "in_progress" | "review" | "done" | "blocked";
export type TaskPriority = "low" | "medium" | "high" | "critical";

export type Task = {
  id: string;
  teamRole: TeamRole;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  weekNumber: number;
  deletedAt?: string | null;
};

export const tasksSeed: Task[] = [
  { id: "t1", teamRole: "designer", title: "Hero platter stills (dark BG)", description: "Char marks + steam; logo corner", status: "todo", priority: "high", weekNumber: 1 },
  { id: "t2", teamRole: "designer", title: "GMB photo pack (20+)", description: "Both live locations attributes", status: "todo", priority: "critical", weekNumber: 1 },
  { id: "t3", teamRole: "writer", title: "Blog: flame grill Brampton differentiator", description: "No charcoal/halal language", status: "todo", priority: "high", weekNumber: 1 },
  { id: "t4", teamRole: "writer", title: "Caption bank — Pillar 1 & 5", description: "Clean meat + live grill", status: "in_progress", priority: "medium", weekNumber: 1 },
  { id: "t5", teamRole: "marketer", title: "QR review cards in every bag", description: "Staff verbal script", status: "todo", priority: "critical", weekNumber: 1 },
  { id: "t6", teamRole: "marketer", title: "5 Brampton micro-influencer DMs", description: "Tasting for two; @lazzat.ca collab", status: "todo", priority: "high", weekNumber: 2 },
  { id: "t7", teamRole: "seo_dev", title: "NAP audit across GMB + delivery", description: "Exact address strings", status: "todo", priority: "critical", weekNumber: 1 },
  { id: "t8", teamRole: "seo_dev", title: "Medium post: meal box vs protein box", description: "Internal links to menu/order", status: "review", priority: "medium", weekNumber: 2 },
  { id: "t9", teamRole: "designer", title: "Reel cut: lava stone close-ups", description: "9:16 + captions", status: "todo", priority: "high", weekNumber: 2 },
  { id: "t10", teamRole: "marketer", title: "Dish of the Weekend announce (Thu)", description: "10–15% Fri–Sun", status: "todo", priority: "medium", weekNumber: 2 },
  { id: "t11", teamRole: "writer", title: "Compliance pass on next 7 posts PDF", description: "Sir Waqas review pack", status: "todo", priority: "high", weekNumber: 2 },
  { id: "t12", teamRole: "seo_dev", title: "Keyword seed → page briefs", description: "P0 clusters only", status: "todo", priority: "medium", weekNumber: 3 },
];

export type CalendarItem = {
  id: string;
  day: string;
  week: number;
  title: string;
  format: string;
  pillar: string;
  deletedAt?: string | null;
};

export const calendarSeed: CalendarItem[] = [
  { id: "c1", day: "Mon", week: 1, title: "Clean meat / respect every table", format: "Carousel", pillar: "1" },
  { id: "c2", day: "Wed", week: 1, title: "Lava stone flame reel", format: "Reel", pillar: "5" },
  { id: "c3", day: "Fri", week: 1, title: "Build-your-plate family Friday", format: "Carousel", pillar: "3" },
  { id: "c4", day: "Sun", week: 1, title: "Community / brand story", format: "Reel", pillar: "6" },
  { id: "c5", day: "Mon", week: 2, title: "Paneer tikka vegetarian spotlight", format: "Carousel", pillar: "2" },
  { id: "c6", day: "Wed", week: 2, title: "Honest pricing hook vs $40+ BBQ", format: "Reel", pillar: "4" },
  { id: "c7", day: "Fri", week: 2, title: "Sajji occasion platter", format: "Photo", pillar: "2" },
  { id: "c8", day: "Sun", week: 2, title: "Real-fruit shake transform", format: "Reel", pillar: "5" },
  { id: "c9", day: "Mon", week: 3, title: "No alcohol / every table welcome", format: "Carousel", pillar: "1" },
  { id: "c10", day: "Wed", week: 3, title: "Hot sauce challenge teaser", format: "Reel", pillar: "5" },
  { id: "c11", day: "Fri", week: 3, title: "Dish of the Weekend hero", format: "Carousel", pillar: "3" },
  { id: "c12", day: "Sun", week: 3, title: "UGC / review proof montage", format: "Reel", pillar: "6" },
];

export type CheckItem = { id: string; label: string; group: string };

export const checklistSeed: CheckItem[] = [
  { id: "ch1", label: "GMB fields complete for live locations", group: "Foundation" },
  { id: "ch2", label: "20+ food photos uploaded to GMB", group: "Foundation" },
  { id: "ch3", label: "QR review cards printed & in bags", group: "Foundation" },
  { id: "ch4", label: "Staff verbal review script trained", group: "Foundation" },
  { id: "ch5", label: "IG bio + link-in-bio → menu/order", group: "Social" },
  { id: "ch6", label: "TikTok created (Canadian IP) same handle", group: "Social" },
  { id: "ch7", label: "Facebook location addresses correct", group: "Social" },
  { id: "ch8", label: "CEO access links documented", group: "Social" },
  { id: "ch9", label: "Uber Eats / DoorDash / Skip live", group: "Ops" },
  { id: "ch10", label: "NAP identical across all platforms", group: "Ops" },
  { id: "ch11", label: "Clarence live status confirmed for ads", group: "Ops" },
  { id: "ch12", label: "Mayfield NOT marketed as open", group: "Ops" },
  { id: "ch13", label: "Blog 01 published (compliance-safe)", group: "Content" },
  { id: "ch14", label: "Blog 02 published", group: "Content" },
  { id: "ch15", label: "Post 01 / Reel 01 shipped all platforms", group: "Content" },
  { id: "ch16", label: "Next 7 posts PDF to Sir Waqas", group: "Content" },
  { id: "ch17", label: "5 influencer DMs sent", group: "Growth" },
  { id: "ch18", label: "WhatsApp Business broadcast ready", group: "Growth" },
  { id: "ch19", label: "Catering form live on website", group: "Growth" },
  { id: "ch20", label: "Steak wrap / no-beef naming resolved with Menu Engineer", group: "Compliance" },
  { id: "ch21", label: "Paid test live: top 2 Reels · Ads Manager · 3–5 km McVean", group: "Paid" },
  { id: "ch22", label: "Follower CTA end-cards on all new Reels", group: "Paid" },
];

export const findings = {
  title: "Key Findings & Flags",
  flags: [
    { level: "red", text: "Ad/copy lock: lava stone + clean meat only — never charcoal or halal in customer-facing paid/organic." },
    { level: "red", text: "Use documented Aug–Sep 2026 metrics (163 followers, ~19K impressions) — re-verify before CEO decks if live drift." },
    { level: "amber", text: "Reach ≠ followers: close conversion gap with CTAs + paid amplify of winning Reels." },
    { level: "amber", text: "Clarence/Mayfield: confirm live status before any 'now open' geo or creative." },
    { level: "amber", text: "Steak wrap vs no-beef pillar — Menu Engineer decision before paid menu creatives." },
    { level: "green", text: "Reels + TikTok FYP already distribute — paid should amplify, not reinvent." },
    { level: "green", text: "Local search queries (veg Brampton, whole chicken, skewers) feed creative + Google keywords." },
  ],
};

export const nextActions = [
  { owner: "Media", action: "Publish Flight 1: $20/day · $200 · 10 days · 3 creatives · McVean 5 km + Clarence 8 km" },
  { owner: "Media", action: "Track live CPC, IG profile visits, follower growth daily" },
  { owner: "Ops", action: "Confirm in-store 5% claim steps match static creative" },
  { owner: "Sir / Media", action: "After Day 10 — review live numbers before any scale" },
];

export const culturalCalendar = [
  {
    month: "Apr",
    occasion: "Vaisakhi",
    dish: "Chicken skewers + Lamb seekh",
    anchor: "Family feast / spring celebration",
    campaign: "Family platter + seekh spotlight · soft cultural respect (no religious copy)",
  },
  {
    month: "May/Jun",
    occasion: "Eid ul-Fitr",
    dish: "Biryani + Sajji",
    anchor: "End of Ramadan feast tables",
    campaign: "Family bundle · clean-meat trust · plan ≥2 weeks ahead",
  },
  {
    month: "Jun/Jul",
    occasion: "Eid ul-Adha",
    dish: "Lamb chops + seekh",
    anchor: "Lamb-forward occasion",
    campaign: "Lamb week · lava-stone chops · platter CTAs",
  },
  {
    month: "Jul/Aug",
    occasion: "Caribbean Carnival / JAMBANA",
    dish: "Doner + wraps",
    anchor: "Summer street / Clarence foot traffic",
    campaign: "Doner & wraps · speed + shakes · confirm Clarence live before push",
  },
  {
    month: "Sep/Oct",
    occasion: "Navratri",
    dish: "Paneer tikka",
    anchor: "Vegetarian celebration window",
    campaign: "Veg grill heroes · paneer tikka · Global Kitchen pillar",
  },
  {
    month: "Oct/Nov",
    occasion: "Diwali",
    dish: "Family platter",
    anchor: "Festival of lights / family tables",
    campaign: "Family platter + dessert add-ons · community pillar",
  },
  {
    month: "Nov",
    occasion: "Gurpurab",
    dish: "Family shareables",
    anchor: "Sikh community soft gratitude",
    campaign: "Respectful community post · no religious phrases · shareable platters",
  },
  {
    month: "Dec",
    occasion: "Holiday feast / NY",
    dish: "Sajji + desserts",
    anchor: "Year-end gatherings",
    campaign: "Sajji + tiramisu / dessert station · gift-of-feast framing",
  },
];
