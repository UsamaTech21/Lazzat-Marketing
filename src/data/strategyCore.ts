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
    "Specific, measurable, and time-bound goals built on live baselines — IG 96.7K views, McVean 8.9K GMB interactions, and domain authority 11.",
  note: "Re-verify review counts and follower totals in-platform before external decks. Search-query ranking goals report what people type; brand copy never uses “halal.”",
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
            "Meta social so far ~0% ads on FB/IG organic charts · Flight 1 parameters locked in Paid Marketing Plan · 3 creatives · McVean 5 km + Clarence 8 km.",
          realistic:
            "Flight 1 complete in 10 days with live CPC / profile visits / follows reported (no invented ROAS).",
          ambitious:
            "Within 30–45 days: optional Brand Film / amplify test after Flight 1 learnings (if approved).",
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
    "Flight 1 Meta learnings → CPC baselines",
  ],
  secondaryGoals: [
    "DA 11 → 20+ in 6 months (ambitious) with off-page restart",
    "Carousels live · TikTok search-led discovery · Phase 1 Brampton POC",
  ],
};

export const audience = {
  title: "Target Audience / ICPs",
  subtitle:
    "Brampton-first: families and young professionals within the McVean and Clarence catchments who want live-flame grill with full dietary respect — positioned as a Canadian brand for every table.",
  positioning:
    "For Brampton families and individuals who want premium lava-stone grilled food that respects their culture and their wallet — global cuisine, no pork, no beef, alcohol-free, honest pricing.",
  bramptonSnap: {
    pop: "~833,000 (2026 proj.)",
    growth: "2.58% / year — among Canada’s fastest-growing cities",
    medianAge: "35.8",
    medianIncome: "$111,000 HH",
    household: "3.6 avg (vs 2.5 national)",
    foreignBorn: "52.9%",
    visibleMinority: "80.6%",
    insight:
      "Sikh + Hindu + Muslim ≈ 52.3% of Brampton. Lazzat’s menu serves all three with zero pork / beef / alcohol friction — while brand positioning stays Canadian, not ethnic.",
  },
  ethnicity: [
    { group: "South Asian", share: "~48–52%", note: "Dominant — Punjabi/Sikh largest; Gujarati + Pakistani/Urdu strong" },
    { group: "Black / Caribbean", share: "~13–13.5%", note: "Jamaican, Guyanese, Trinidadian — Clarence corridor mix" },
    { group: "European / White", share: "~18.9%", note: "Part of “every table” Canadian audience" },
    { group: "Filipino + Tamil + other", share: "Growing", note: "Food-curious secondary reach" },
  ],
  religion: [
    { name: "Christianity", share: "35.7%" },
    { name: "Sikhism", share: "25.1% — highest of any Canadian city" },
    { name: "Hinduism", share: "18.1%" },
    { name: "Islam", share: "9.1%" },
    { name: "No religion", share: "10.3%" },
  ],
  languages: [
    { name: "English", share: "42.9% mother tongue — default public language" },
    { name: "Punjabi", share: "21.7% — 2nd language of the city; unmatched scale in Canada" },
    { name: "Gujarati / Urdu / Hindi", share: "~3% each — community captions where natural" },
  ],
  rules: [
    "Geo: ~3 km organic focus around both live locations (McVean + Clarence); paid geo follows Paid Marketing Plan pins",
    "Priority age: Millennials and Gen Z (with family decision-makers in the household)",
    "Language targeting: English primary; Punjabi, Urdu, Arabic where community fit is clear",
    "Priority segment: big family platter buyers (household 3.6+)",
    "Lookalikes / lists: unknown people only — never friends lists",
    "Paid negative targeting: follow brand instruction on general Hindu exclusions; vegetarian Gujarati families still served via menu + organic content",
    "Public meat language: clean meat / ethically sourced — never “halal” in ads or captions",
    "Brand frame: Canadian grill for every table — never Pakistani / Desi / South Asian brand positioning",
  ],
  personas: [
    {
      id: "punjabi-sikh",
      name: "Punjabi / Sikh Family",
      priority: "Primary",
      where: "Castlemore, Vales of Castlemore, Gore (McVean catchment)",
      profile: "Household 4–6 · income often $111K+ · weekend family dining · grill culture",
      pain: "Hard to find premium grill without alcohol or pork risk.",
      deliver: "Lamb, Sajji, Seekh, Biryani — live flame, large portions, family platters.",
      content: "Friday/weekend posts · Vaisakhi · Punjabi + English captions · Lamb & Sajji Reels",
      channels: "IG Reels · WhatsApp groups · GMB · in-store word of mouth",
    },
    {
      id: "pakistani-muslim",
      name: "Pakistani / Muslim Family",
      priority: "Primary",
      where: "Bramalea, downtown / Queen corridor (Clarence catchment)",
      profile: "20,400+ Urdu-speaking community · biryani & sajji as comfort foods · group dining",
      pain: "Uncertainty about meat sourcing and trust.",
      deliver: "Clean-meat trust messaging · Biryani · Sajji · family bundles.",
      content: "Eid occasions · Urdu/English captions · close-up craft · trust-led stills",
      channels: "IG · FB community · WhatsApp · GMB reviews",
    },
    {
      id: "gujarati-hindu",
      name: "Gujarati / Hindu Family",
      priority: "Primary (organic / menu)",
      where: "Bramalea, Clarence St area",
      profile: "Vegetarian-leaning · Diwali / Navratri celebrators · no-beef non-negotiable",
      pain: "Most BBQ places have weak or token vegetarian options.",
      deliver: "Paneer Tikka · grilled vegetables · vegan-friendly builds.",
      content: "Diwali / Navratri · vegetarian spotlights · Paneer Tikka Reels",
      channels: "IG · organic community · cultural calendar campaigns",
    },
    {
      id: "gen-z-pro",
      name: "Second-Gen & Young Professional (18–34)",
      priority: "Primary (growth / social)",
      where: "All Brampton areas",
      profile: "Canadian-born or raised · IG/TikTok native · food-curious · aesthetics matter",
      pain: "Wants cultural flavour without a dated “old restaurant” vibe.",
      deliver: "Shakes · desserts · Doner · wraps · shareable Reels moments.",
      content: "Hooks · BTS flame · shake transforms · TikTok search-led clips",
      channels: "TikTok · IG Reels · FB secondary",
    },
    {
      id: "caribbean-mix",
      name: "Caribbean / Mixed Clarence Corridor",
      priority: "Secondary (Clarence footfall)",
      where: "Clarence St / Queen St corridor",
      profile: "Jamaican, Guyanese, Trinidadian + South Asian + European mix · high foot traffic",
      pain: "Wants reliable, welcoming takeout near corridor — not niche-only branding.",
      deliver: "Global grill plates · shakes · fast pickup · every-table welcome.",
      content: "Location CTAs · platter value · open-kitchen trust · community posts",
      channels: "GMB · FB · IG · walk-by / delivery",
    },
  ],
  neighbourhoods: [
    {
      name: "Castlemore / Vales of Castlemore",
      near: "McVean Dr",
      note: "Premium, affluent Punjabi Sikh + Gujarati + Pakistani mix · large families · high disposable income",
    },
    {
      name: "Clarence / Queen corridor",
      near: "Location 2",
      note: "High foot traffic · affordable corridor · Caribbean + South Asian + European mix",
    },
    {
      name: "Bramalea",
      near: "Both catchments",
      note: "South Asian dominant · Caribbean mix · budget-conscious families · strong community feel",
    },
    {
      name: "Gore Meadows",
      near: "McVean side growth",
      note: "Newer development · new immigrant families · fast-growing",
    },
  ],
  psychology: [
    "Word-of-mouth and WhatsApp / Facebook groups drive decisions more than ads alone.",
    "Food signals identity for 1st/2nd-gen households — brands that “get” the table earn loyalty.",
    "Primary occasion: family dining (avg HH 3.6). Friday night + Sunday are peak.",
    "Say clean meat / ethically sourced in public — never “halal” in marketing copy.",
    "Value frame: premium without the shock price — never cheap / budget / affordable.",
    "GMB under ~4.2★ blocks trial for many — reviews are table-stakes.",
    "Punjabi phrases in captions can create instant community connection when used naturally.",
  ],
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
  subtitle:
    "Internal strengths and gaps vs external openings and risks — grounded in live Sep 2026 baselines (social, GMB, SEO) and a 4-person marketing team.",
  note: "Use Strengths and Opportunities to prioritize content and Flight learnings. Use Weaknesses and Threats as weekly ops checklist items — not slide decoration.",
  strengths: [
    {
      point: "Lava-stone / live-flame grill as a visible differentiator",
      detail: "Open-kitchen craft is already proven in top Reels (lava stone BBQ, open kitchen + shake).",
    },
    {
      point: "Dual pillar: grill + real-fruit shakes",
      detail: "Rare combo locally; supports both family platters and Gen-Z shareable content.",
    },
    {
      point: "Dietary universality without niche-only branding",
      detail: "No pork, no beef, alcohol-free, plus vegetarian options — serves Sikh, Hindu, and Muslim tables while staying positioned as a Canadian brand.",
    },
    {
      point: "Global menu breadth in one takeaway model",
      detail: "Sajji, Biryani, Doner, skewers, paneer — one kitchen covers multiple Brampton ICPs.",
    },
    {
      point: "Two-location Brampton footprint",
      detail: "McVean (Castlemore / premium catchment) + Clarence (corridor foot traffic) — complementary geos.",
    },
    {
      point: "Organic social already distributing",
      detail: "IG 96.7K YTD views · TikTok 36.2K with real buyer search queries · 118 pieces uploaded · Reels-led engagement.",
    },
    {
      point: "Lean, clear marketing ownership",
      detail: "4-person team (lead/design, video/social/ads, SEO/web/GMB, writer) — short approval chain to Sir Waqas.",
    },
  ],
  weaknesses: [
    {
      point: "Follower / review conversion lags reach",
      detail: "Strong views; IG follower base still small (~91 in Metricool window). Review velocity still a foundation risk.",
    },
    {
      point: "Format and funnel gaps in content",
      detail: "Carousels = 0 · shake SKU depth still thin vs brand promise · YouTube weaker than IG/TikTok.",
    },
    {
      point: "SEO / site engine paused on key levers",
      detail: "DA 11 · off-page inconsistent · blog publishing paused (site access) · non-branded local intent rankings weak.",
    },
    {
      point: "GMB uneven across locations",
      detail: "McVean leads every metric; Clarence strong on directions but soft on calls/menu; both dipped Aug→Sep.",
    },
    {
      point: "Paid learning curve just starting",
      detail: "FB/IG charts still ~0% ads historically — Flight 1 is the first Meta IG test; no CPC baseline yet.",
    },
    {
      point: "Ops / claim discipline still fragile",
      detail: "Compliance (lava stone not charcoal; never “halal” in copy) must stay enforced as volume scales.",
    },
    {
      point: "Delivery economics and location messaging",
      detail: "App commissions ~25–30% · Mayfield must never be marketed as open · Clarence live status must stay accurate in ads/GMB.",
    },
  ],
  opportunities: [
    {
      point: "TikTok search intent is already buying-language",
      detail: "Queries like party chicken platters Brampton, best goat meat Brampton, cheese skewer — turn into weekly search-led Reels.",
    },
    {
      point: "Cultural calendar as campaign backbone",
      detail: "Vaisakhi, Eid, Diwali/Navratri, Carnival — plan ≥2 weeks ahead; each ICP has a natural occasion.",
    },
    {
      point: "Direct local micro-influencer lane",
      detail: "Marketplace spam fails; complimentary tasting + @lazzat.ca collab + WhatsApp follow-up fits Brampton.",
    },
    {
      point: "Local SEO / GMB white space",
      detail: "Branded search is strong; non-branded “near me” and platter intent still winnable with citations, blogs, GBP posts.",
    },
    {
      point: "Clarence conversion upside",
      detail: "High direction intent — lift calls and menu views with location-specific creative, offers, and GBP posts.",
    },
    {
      point: "Catering and group occasions",
      detail: "Mehndi, corporate, baby shower, weekend family platters — once form + SLA are live.",
    },
    {
      point: "Flight 1 → paid playbook",
      detail: "First Meta IG learnings create CPC / profile-visit baselines before any scale or Brand Film amplify.",
    },
  ],
  threats: [
    {
      point: "Competitors with deeper review moats",
      detail: "Established BBQ / grill players can outlast thin early rating history if Lazzat review velocity stalls.",
    },
    {
      point: "One viral bad review early",
      detail: "Thin GMB history amplifies a single food-safety or service complaint — ≤24h reply SLA is critical.",
    },
    {
      point: "Cost-of-living pressure on “honest pricing”",
      detail: "If guests feel sticker shock vs promise, trust erodes faster than ads can fix.",
    },
    {
      point: "Claim / compliance slip in public copy",
      detail: "Charcoal, “halal,” Desi framing, or unverified health claims create brand and CEO risk.",
    },
    {
      point: "Wrong-location marketing",
      detail: "Mayfield or stale Clarence hours/status in ads or GBP destroys trust in both catchments.",
    },
    {
      point: "Delivery platforms and category noise",
      detail: "Commission + algorithm changes can squeeze margins; Osmow’s / Lazeez-class players compete on speed and awareness.",
    },
  ],
  implications: [
    "Near-term: protect strengths in Reels (flame craft + platters + shakes) while closing carousel and review gaps.",
    "SEO/GMB: unblock site access, restart blogs/off-page, and run Clarence-specific GBP conversion plays.",
    "Paid: finish Flight 1 learnings before any budget scale — report live CPC and profile visits only.",
    "Risk control: compliance skim on every public asset; location status locked; review replies ≤24h.",
  ],
};
