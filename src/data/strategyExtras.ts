/** Full-strategy extras — Brand voice, GMB, reputation, channels, team, compliance. */

import { brand } from "./brand";

export const brandVoice = {
  title: "Brand Identity & Voice",
  subtitle: "Story, tone, visual identity, and messaging pillars for every public surface.",
  story:
    "Lazzat Grill & Shakes is a Canadian fast-casual brand built on lava-stone flame grill and real-fruit shakes — premium food that welcomes every table in Brampton without ethnic coding. Live fire you can see. Honest pricing. No pork, no beef, alcohol-free.",
  tone: [
    "Polished professional English for customer-facing copy",
    "Confident and warm — never cheap, never preachy",
    "Lead with sensory craft: flame, steam, cut interiors, real fruit",
    "CEO / Sir packs: formal, reasoned, ROI-aware",
  ],
  visual: {
    palette: [
      { name: "Midnight", hex: brand.colors.midnight },
      { name: "Cream", hex: brand.colors.cream },
      { name: "Gold", hex: brand.colors.gold },
      { name: "Gold light", hex: brand.colors.goldLight },
      { name: "Gold deep", hex: brand.colors.goldDeep },
    ],
    rules: [
      "Dark near-black backgrounds so food pops",
      "Warm amber / gold flame light — never cool clinical",
      "Show char marks, steam, drizzle, cut interior",
      "Logo subtle bottom corner; 9:16 + subtitles on video",
    ],
  },
  taglines: brand.taglines,
  brandValuePillars: [
    "We Respect Every Table",
    "Your Culture, Your Plate",
    "Build Your Own Plate",
    "Real Flame. Not Overpriced.",
    "Live Grill Experience",
    "Speed + Brampton Community",
  ],
  contentPillars: [
    {
      name: "Lava Stone Story",
      focus: "Live flame, lava stone (never charcoal), open-kitchen trust",
    },
    {
      name: "Menu Spotlight",
      focus: "Hero dishes, platters, shakes — one strength + one menu item / week",
    },
    {
      name: "Team & Craft",
      focus: "Behind-the-grill craft, weighed portions, build-your-plate",
    },
    {
      name: "Community",
      focus: "Brampton local love, family tables, cultural respect without religious phrases",
    },
    {
      name: "Wellness",
      focus: "Fresh / real / clean-meat language — never health, nutritious, or halal claims",
    },
    {
      name: "Global Kitchen",
      focus: "World flavours for every Canadian appetite — not Desi/Pakistani framing",
    },
  ],
};

export const localSeo = {
  title: "Local SEO / GMB Strategy",
  subtitle:
    "Google Business Profile is a launch-critical lever — plan path from 0 toward 100+ reviews (targets below are plans, not live counts).",
  liveNote: "Live GMB review / rating totals: TBD — verify in GBP before external decks.",
  gbpOptimization: [
    "Primary category: Takeout Restaurant (confirm secondary categories with ops)",
    "Complete all GBP fields: hours, attributes, menu links, service options",
    "NAP identical everywhere (site, Toast, delivery apps, Meta)",
    "20+ photos at launch; add weekly food / store photos",
    "Weekly GBP post: food photo + 100–150 words + clear CTA",
    "Uptime: keep location Open / Temporarily closed accurate (Clarence confirm live)",
  ],
  reviewSystem: [
    "Verbal ask at bill / pickup",
    "QR in bag → Google review",
    "WhatsApp follow-up ~1 hour after pickup",
    "Optional bill-time follow + review incentive when ops approves",
    "Respond to every review ≤24h (see Reputation section)",
  ],
  reviewGoalsPlan: [
    { horizon: "Week 1", target: "10 reviews", note: "Plan target" },
    { horizon: "Week 2", target: "25 reviews", note: "Plan target" },
    { horizon: "Month 1", target: "50 reviews", note: "Plan target" },
    { horizon: "Launch path", target: "100+ reviews", note: "Cumulative plan goal — not a live count" },
  ],
  owners: {
    dayToDay: "Kamran (POS + customer reviews)",
    backup: "Fatma (ops / comments)",
    escalate: "Sir Waqas — policy / sensitive replies",
  },
};

export const reputation = {
  title: "Reputation & Review Management",
  subtitle: "Response protocol, negative-review handling, and review velocity tracking.",
  responseProtocol: [
    "Every Google / delivery review answered within ≤24 hours",
    "Thank positives; invite return; never invent guarantees",
    "Use clean-meat / lava-stone language only — never halal / charcoal",
    "Tag owner in sheet or WhatsApp ops thread after reply",
  ],
  negativeHandling: [
    "Acknowledge + apologize for the experience (no blame on guest)",
    "Move detail offline: phone / email / in-store manager",
    "Do not argue, do not name staff publicly, do not offer unverified refunds in public",
    "Escalate food-safety or legal claims to Sir Waqas + ops before public reply",
    "Log issue → fix → optional private follow-up invite",
  ],
  velocityTracking: [
    "Weekly count of new GBP reviews (vs plan ladder)",
    "Star average trend (flag if dipping)",
    "Response SLA % answered ≤24h",
    "Source mix: QR / verbal / WhatsApp / organic",
  ],
  owners: localSeo.owners,
};

export const channelStrategy = {
  title: "Channel Strategy",
  subtitle: "Platform-wise organic play — cadence tied to Mon / Wed / Fri / Sun rhythm.",
  platforms: [
    {
      name: "Instagram",
      role: "Primary brand + discovery — Reels dominate views; profile visits for follows",
      formats: "Reels (hero), carousels, Stories, static offer posts",
      cadence: "Mon photo/carousel · Wed Reel · Fri photo/carousel · Sun Reel",
      notes: "Same master video across platforms when possible; ads reset Tuesday",
    },
    {
      name: "TikTok",
      role: "FYP discovery engine — non-follower reach; Canadian IP for posting",
      formats: "Short hook Reels, BTS flame, trend-safe craft clips",
      cadence: "Align Wed + Sun Reels minimum; extra when FYP winners appear",
      notes: "Amplify winners with Meta/TikTok paid only after organic proof",
    },
    {
      name: "Facebook",
      role: "Local reach + parents / community — secondary to IG/TikTok",
      formats: "Cross-post Reels, occasion posts, location updates",
      cadence: "Match IG publish window; prioritize occasions + offers",
      notes: "Watch retention; do not treat FB as primary creative lab",
    },
  ],
  sharedRules: [
    "One strength + one menu item per week across the grid",
    "9:16 + subtitles always",
    "Content pillars: Lava Stone · Menu · Team · Community · Wellness · Global Kitchen",
  ],
};

export const culturalCampaigns = {
  title: "Cultural / Seasonal Calendar",
  subtitle: "Every major push needs an event anchor — plan ≥2 weeks ahead.",
  rule: "Calendar occasions are the backbone of campaigns, not optional decoration.",
};

export const teamRoles = {
  title: "Team Roles & Responsibilities",
  subtitle: "Who owns what — and who approves before it goes public.",
  roster: [
    { name: "Sir Waqas Mukhtar", role: "CEO — final approval (paid, claims, sensitive replies)" },
    { name: "Sir Mudassar", role: "Co-founder / IT" },
    { name: "Sir Shahid", role: "Menu Engineer — menu naming / steak-wrap decisions" },
    { name: "Sir Kamran", role: "POS + customer reviews (day-to-day GBP)" },
    { name: "Ahmed (Ali Ahmed)", role: "Senior digital / team lead — creative + ads check" },
    { name: "Soha", role: "Social + data; influencer hospitality" },
    { name: "Fatma", role: "Ops / comments backup" },
    { name: "Khadija", role: "Graphics lead" },
    { name: "Zohaib", role: "Videographer" },
    { name: "Ali Hamza", role: "SEO / local content" },
    { name: "Usama", role: "Video edit / portal" },
  ],
  approvalChain: [
    "Draft (designer / writer / editor)",
    "Channel check — Ahmed and/or Soha (fit, cadence, brand voice)",
    "Compliance skim — no halal / charcoal / unverified claims",
    "Sir Waqas final — paid ads, public offers, sensitive reputation replies",
  ],
};

export const compliance = {
  title: "Compliance / Brand Guardrails",
  subtitle: "Do’s, don’ts, competitor policy, and approved vs unverified claims.",
  dos: [
    "Say lava stone / flame grill / live fire",
    "Say clean meat / ethically sourced / blood-free preparation",
    "Say Canadian brand; welcome every table",
    "Show real food craft; use approved taglines",
    "Mark live metrics TBD until verified",
  ],
  donts: [
    'Never say "halal" in ads, captions, keywords, or GMB posts',
    'Never say "charcoal"',
    "Never Pakistani / South Asian / Desi brand framing",
    "No religious phrases (e.g. JazakAllah) in brand communications",
    "Never say cheap / budget / affordable",
    "No competitor name-shame or attack ads",
    "No healthy / nutritious / medical-adjacent claims",
  ],
  competitorPolicy:
    "Study competitors privately. Public creative compares on craft and experience — never naming-and-shaming rival brands.",
  approvedClaims: [
    "Lava-stone grilling / live flame",
    "No pork · no beef · alcohol-free",
    "Vegetarian / vegan options available",
    "Real-fruit shakes (when true to recipe)",
    brand.taglines.primary,
    brand.taglines.webHero,
  ],
  unverifiedUntilOps: [
    "Any fixed minute SLA (e.g. 5-minute fresh)",
    "Allergen-free / blanket allergy claims",
    "Zero frozen / 100% never-frozen unless ops locks it",
    "AU/NZ sourcing claims without ops confirmation",
    "Steak / beef wording on wraps — confirm with Menu Engineer (no-beef pillar)",
    "Live follower, GMB review, or star counts",
  ],
};
