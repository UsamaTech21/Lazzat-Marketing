/** Sir-facing goals — specific, measurable, time-bound. Baselines from Current Situation (Sep 2026). */

export type SmartGoal = {
  goal: string;
  baseline: string;
  target: string;
  realistic?: string;
  ambitious?: string;
  /** Optional — shown in Team section, not on Goals cards */
  owner?: string;
};

export type GoalPillar = {
  id: string;
  letter: string;
  title: string;
  items: SmartGoal[];
};

export const goals = {
  title: "Goals",
  oneLiner:
    "Specific · measurable · time-bound — live baselines (IG 96.7K views, McVean 8.9K GMB interactions, DA 11). Paid Flight $200 lives under Paid Marketing Plan.",
  note: "Review counts and follower totals: re-verify in-platform before external decks. Search-query ranking goals report what people type — brand copy still never says “halal.”",
  pillars: [
    {
      id: "awareness",
      letter: "A",
      title: "Brand Awareness / Social Growth",
      items: [
        {
          goal: "Grow Instagram followers with a visible month-over-month rate (not views alone).",
          baseline:
            "IG ~91 followers (Metricool Aug–Sep 2026 window) · 96.7K YTD views · engagement strong on Reels.",
          realistic: "6 months: 1,500–2,500 IG followers · consistent MoM % growth tracked weekly.",
          ambitious: "12 months: 10,000+ IG followers.",
          target: "Publish weekly follower count + MoM % in ops review.",
          owner: "Usama (social) · Khadija (lead check) · Sir Waqas (approval on paid amplify)",
        },
        {
          goal: "Make TikTok the primary discovery engine for Brampton buyer intent.",
          baseline:
            "36.2K video views · 92.4% For You · search queries already show intent (party chicken platters Brampton, best goat meat Brampton, cheese skewer).",
          realistic: "90 days: weekly TikTok search-query log + 2 search-led Reels/week answering those queries.",
          ambitious:
            "6 months: TikTok profile visits + follows grow faster than IG for new discovery (tracked monthly).",
          target: "Own local platter / goat / dessert search themes in content calendar.",
          owner: "Usama (video + social cadence) · Minahil (hooks / captions)",
        },
        {
          goal: "Launch carousels and lift engagement rate — not vanity views only.",
          baseline:
            "Cadence 4 Reels + 3 static / week · 118 uploads (78 video / 19 influencer / 40 static) · carousels = 0.",
          realistic: "30 days: ≥2 carousels/week on IG + FB (menu / offer steps / platter builds).",
          ambitious:
            "90 days: carousel + Reel mix on IG, TikTok, FB · engagement rate (interactions ÷ reach) trending up MoM.",
          target: "Format gap closed; ER reported with views every week.",
          owner: "Khadija (static/carousel) · Usama (publish) · Minahil (copy)",
        },
        {
          goal: "Position YouTube as long-form / behind-the-scenes craft channel.",
          baseline: "YouTube ~18.6K views — weaker than IG/TikTok.",
          realistic: "90 days: 2 long-form or BTS uploads / month (lava stone, open kitchen, platter builds).",
          ambitious:
            "6 months: YouTube becomes the archive for Brand Film + craft series; views trajectory up vs today’s floor.",
          target: "Do not treat YT as primary paid surface until organic baseline is weekly.",
          owner: "Usama (edit + upload) · Khadija (lead check)",
        },
      ],
    },
    {
      id: "seo",
      letter: "B",
      title: "Local Search & SEO",
      items: [
        {
          goal: "Raise domain authority from the current floor.",
          baseline:
            "DA 11 · 72 backlinks (3 nofollow) · organic traffic 84 (+67 MoM) · keywords 43 (+19).",
          realistic: "6 months: DA 15–18 with consistent monthly off-page.",
          ambitious: "6 months: DA 20+.",
          target: "Off-page resume: citations, directories, guest posts tracked monthly.",
          owner: "Moeed (SEO + web)",
        },
        {
          goal: "Improve non-branded high-intent local rankings (report search queries; brand copy stays clean-meat / lava-stone).",
          baseline:
            "GSC: “food near me” pos ~19.3 · “shawarma near me” ~9.2 · “halal food near me” ~6.7 (4 clicks — query fact only). Branded queries already strong (Lazzat positions ~1–3).",
          realistic:
            "6 months: all three intent clusters into top 10 average position (organic split monitored separately from paid).",
          ambitious:
            "12 months: top 5 on primary Brampton food-near-me / shawarma-near-me style queries we choose to compete on.",
          target: "GSC organic-only view + keyword tracker; never put “halal” in Lazzat ads/copy.",
          owner: "Moeed (SEO) · Minahil (supporting content)",
        },
        {
          goal: "Restart on-page blog engine when website access is restored.",
          baseline: "23 blogs live · was ~4/week · publishing paused (access with Moeed).",
          realistic: "Access restored + 30 days: resume 4 blogs/week (local FAQ + menu internal links).",
          ambitious:
            "90 days post-access: menu page CTR lifts from ~1.3% via better titles/snippets + internal links.",
          target: "Moeed access unblocked = Day 0 for blog SLA.",
          owner: "Minahil (write) · Moeed (publish / access) · Sir Waqas (claims)",
        },
        {
          goal: "Rebuild off-page volume.",
          baseline: "72 backlinks · off-page cadence unclear / inconsistent.",
          realistic: "6 months: 120+ backlinks with monthly directory + citation rhythm.",
          ambitious: "6–9 months: 150+ backlinks + recurring guest posts.",
          target: "Monthly off-page checklist in ops review.",
          owner: "Moeed (SEO)",
        },
      ],
    },
    {
      id: "gmb",
      letter: "C",
      title: "GMB / Conversion",
      items: [
        {
          goal: "Reverse Aug→Sep interaction dip on both locations.",
          baseline:
            "Apr–Sep 2026: McVean 8,905 interactions · Clarence 3,925 · both peaked Jul–Aug then dipped into Sep.",
          realistic: "Next 90 days: MoM interactions ≥ prior 3-month average for each location.",
          ambitious:
            "6 months: McVean sustained above Jul peak band; Clarence closes gap toward 0.6× McVean interactions.",
          target: "Weekly GBP overview screenshot in Current Situation refresh.",
          owner: "Moeed (GMB day-to-day) · Usama (promo alignment)",
        },
        {
          goal: "Close Clarence discovery gap (calls/menu weak vs strong directions).",
          baseline:
            "Clarence directions 2,496 vs calls 333 · menu views 590 — directions/interactions ~63% (intent high, conversion soft).",
          realistic: "90 days: Clarence calls + menu views +25% vs Apr–Sep run-rate.",
          ambitious: "6 months: Clarence call-to-direction ratio improves materially (tracked monthly).",
          target: "Clarence-specific creative + GBP posts + offer CTAs.",
          owner: "Moeed (GMB posts) · Usama (creative/promo) · Khadija (assets)",
        },
        {
          goal: "Build review velocity — priority #1 if live counts are still low.",
          baseline:
            "Live star/review totals TBD (do not invent). Plan ladder: 10 / wk1 · 25 / wk2 · 50 / month1 · path to 100+.",
          realistic: "Per location: 50+ Google reviews within 90 days of review-system go-live.",
          ambitious: "Per location: 100+ Google reviews within 6 months.",
          target: "Verbal → QR bag → WhatsApp ~1h · ≤24h replies (Reputation section).",
          owner: "Moeed (GBP replies) · Usama (ask cadence) · Sir Waqas (sensitive replies)",
        },
      ],
    },
    {
      id: "paid",
      letter: "D",
      title: "Paid Marketing (Ads)",
      items: [
        {
          goal: "Ship first Meta ads learnings with a fixed test budget.",
          baseline:
            "Meta social so far ~0% ads on FB/IG organic charts · Flight 1 locked: $20/day · $200 · 10 days · 3 creatives · McVean 5 km + Clarence 8 km.",
          realistic:
            "Flight 1 complete in 10 days with live CPC / profile visits / follows reported (no invented ROAS).",
          ambitious:
            "Within 30–45 days: optional $500 Brand Film / amplify test after Flight 1 learnings (if Sir approves).",
          target: "Ads Manager only — not Boost as primary.",
          owner: "Usama (ads ops) · Khadija (creatives) · Sir Waqas (budget approval)",
        },
        {
          goal: "Establish CPC and cost-per-website-visit baselines in month one of paid.",
          baseline:
            "No paid Meta CPC baseline yet · GSC clicks include Google Ads mix — not a clean Meta CPC.",
          realistic: "End of first paid month: documented CPC + cost per IG profile visit + cost per site click.",
          ambitious: "Month two: beat Flight 1 CPC on winning creative only (pause losers).",
          target: "Shared sheet after Day 10 of Flight 1.",
          owner: "Usama (reporting) · Khadija (lead review)",
        },
        {
          goal: "Phase 2 — GMB-linked local awareness then retargeting.",
          baseline: "No retargeting pools yet · geo pins defined for Flight 1.",
          realistic: "After Flight 1: radius ads around both locations feeding GBP + site.",
          ambitious: "Retarget website visitors + IG engagers once pixel/events are verified.",
          target: "Awareness → retargeting sequence; never skip learning phase.",
          owner: "Usama (ads) · Moeed (pixel / events + GMB)",
        },
      ],
    },
    {
      id: "expansion",
      letter: "E",
      title: "Business Expansion (long-term)",
      items: [
        {
          goal: "Phase 1 — Brampton proof of concept (both locations).",
          baseline: "McVean + Clarence live · McVean stronger on every GMB metric · reviews TBD.",
          target:
            "Complete when both locations show 6 months consistent profitability AND review-strong GBP (100+ reviews path per location) with Aug–Sep dips reversed.",
          realistic: "12–18 months focused Brampton domination before new cities.",
          ambitious: "Faster if unit economics + reviews hit early — still require 6-month consistency gate.",
          owner: "Sir Waqas · ops / finance",
        },
        {
          goal: "Phase 2 — GTA expansion.",
          baseline: "Vision only — no live GTA locations marketed as open.",
          target: "Mississauga / Toronto / Scarborough-style high-density after Phase 1 gate.",
          realistic: "Start site search only after Phase 1 success criteria signed off.",
          ambitious: "First GTA LOI within 6 months of Phase 1 complete.",
          owner: "Sir Waqas · Sir Mudassar",
        },
        {
          goal: "Phase 3 — Wider Ontario.",
          baseline: "Long-term vision (Ottawa, London, Hamilton class cities).",
          target: "Ontario secondary cities after ≥1 GTA unit is stable 6 months.",
          realistic: "Multi-year roadmap — not a 2026 ops KPI.",
          ambitious: "Playbook reuse from Brampton + first GTA (brand, GMB, social, paid).",
          owner: "Sir Waqas",
        },
        {
          goal: "Phase 4 — National (Alberta, BC major cities).",
          baseline: "Franchise / national ambition in brand vision — not current execution.",
          target: "National only after Ontario playbook is repeatable.",
          realistic: "Horizon planning; no paid spend earmarked in Flight 1.",
          ambitious: "Franchise inputs collected during Phase 1–2 (ops SOPs, creative system).",
          owner: "Sir Waqas",
        },
      ],
    },
  ] as GoalPillar[],
  primaryGoals: [
    "IG followers: visible MoM growth toward 10K ambitious (baseline ~91)",
    "GMB reviews path to 100+ per location · reverse Aug–Sep dip",
    "Flight 1 Meta $200 learnings → CPC baselines",
  ],
  secondaryGoals: [
    "DA 11 → 20+ in 6 months (ambitious) with off-page restart",
    "Carousels live · TikTok search-led discovery · Phase 1 Brampton POC",
  ],
};

export const audience = {
  title: "Target Audience / ICPs",
  rules: [
    "Radius: 3km around live locations",
    "Priority age: Millennials & Gen Z",
    "Languages: English, Punjabi, Urdu, Arabic",
    "Exclude general Hindu via negative targeting (per brand instruction)",
    "Big family platter buyers priority",
    "Lookalikes: unknown people only — never friends lists",
  ],
  personas: [
    {
      name: "Punjabi / Sikh Family",
      where: "Castlemore, Gore",
      pain: "Premium grill without alcohol/pork risk",
      deliver: "Lamb, Sajji, Seekh, Biryani — live flame, large portions",
      content: "Friday/weekend, Vaisakhi, Punjabi captions",
    },
    {
      name: "Pakistani / Muslim Family",
      where: "Bramalea, Downtown",
      pain: "Meat sourcing trust",
      deliver: "Clean meat messaging, Biryani, Sajji",
      content: "Eid, Urdu/English, trust close-ups",
    },
    {
      name: "Gujarati / Hindu Family",
      where: "Bramalea, Clarence",
      pain: "BBQ places with weak vegetarian options",
      deliver: "Paneer Tikka, grilled veg, vegan builds",
      content: "Diwali/Navratri, vegetarian spotlight",
    },
    {
      name: "Second-gen & Young Pro (18–34)",
      where: "All areas",
      pain: "Cultural roots without dated vibe",
      deliver: "Desserts, shakes, Doner, wraps — shareable",
      content: "Reels, TikTok, BTS, hook formats",
    },
  ],
  bramptonSnap: {
    pop: "~833k (2026 proj)",
    medianIncome: "$111k",
    household: "3.6 avg",
    insight: "Sikh + Hindu + Muslim ≈ 52.3% — menu serves all three with no pork/beef/alcohol friction.",
  },
};

export const competitors = {
  title: "Competitor Research",
  finding:
    "Near Clarence St, almost no one combines lava/flame grill + no pork/beef/alcohol + global menu + all delivery apps + active social. That lane is open.",
  direct: [
    { name: "King Tandoori Kennedy", weakness: "Full alcohol bar; shrinkflation; foreign object complaints", angle: "Every item clean. No alcohol. No confusion." },
    { name: "Baigs Grill", weakness: "Closed Mon+Tue; biryani complaints; weak TikTok", angle: "WE ARE OPEN posts; capture disappointed biryani buyers." },
    { name: "Sharmz Mediterranean", weakness: "High post volume, low return; zero delivery", angle: "Own delivery-only customers." },
    { name: "Caravan Kabob House", weakness: "Hygiene complaints; zero social", angle: "Open kitchen / clean flame trust." },
  ],
  watch: ["Paranthe Wali Gali", "Blackstone Steakhouse", "Patty Kulcha (TikTok study)", "Osmow's", "Lazeez Shawarma"],
  patterns: [
    "Hair / plastic in food across multiple competitors",
    "Weak or zero TikTok",
    "Closed weekdays = revenue leaks",
    "Missing delivery apps",
  ],
};

export const swot = {
  title: "SWOT Analysis",
  strengths: [
    "Lava stone grilling + dual grill/shakes pillar",
    "Dietary universality: no pork, no beef, alcohol-free, veg options",
    "Global menu breadth (Sajji, Biryani, Doner, skewers, paneer)",
    "Takeaway model = lower overhead into ingredients",
    "Castlemore + downtown catchment mix",
    "Himalayan salt counter as photo prop",
  ],
  weaknesses: [
    "Review / social foundation still maturing",
    "Shake SKU depth vs brand promise",
    "Claim compliance education needed across team",
    "Delivery commission pressure 25–30%",
    "Location status messaging risk (Clarence/Mayfield)",
  ],
  opportunities: [
    "Cultural calendar peaks (Vaisakhi, Eid, Diwali, Carnival)",
    "Local micro-influencers + WhatsApp groups",
    "Medium + GMB local SEO white space",
    "Catering for mehndi / corporate / baby shower",
    "Franchise narrative after 6-month proof",
  ],
  threats: [
    "Established BBQ competitors with review moats",
    "One early bad GMB review with thin history",
    "Cost-of-living pressure on 'honest pricing' authenticity",
    "Ops claim overreach → regulatory / trust damage",
  ],
};
