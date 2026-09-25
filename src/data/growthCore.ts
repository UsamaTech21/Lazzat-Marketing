export const positioning = {
  title: "Positioning & Value Prop",
  statement:
    "For families and individuals in Brampton who want premium live-flame food that respects their culture and wallet, Lazzat is the only fast-casual delivering lava-stone global cuisine with complete dietary inclusivity (no pork, no beef, alcohol-free) at honest pricing.",
  pillars: [
    "We Respect Every Table",
    "Your Culture, Your Plate",
    "Build Your Own Plate",
    "Real Flame. Not Overpriced.",
    "Live Grill Experience",
    "Speed + Brampton Community",
  ],
  notThis: [
    "Not a Desi/Pakistani restaurant brand in positioning",
    "Not 'cheap eats' — honest premium",
    "Not charcoal nostalgia copy",
    "Not health-claim / nutritious / halal ad language",
  ],
  messageByAudience: [
    { who: "Families", msg: "One menu that welcomes every appetite — platters built for the table." },
    { who: "Young Canada", msg: "Fire, steam, shakes — food that looks as good as it tastes." },
    { who: "Trust seekers", msg: "Clean meat. No alcohol. Flame you can see." },
  ],
};

export const pricing = {
  title: "Pricing",
  note: "CAD figures below are structural placeholders from internal exports — confirm live Toast / delivery prices before publishing.",
  philosophy: [
    "Honest pricing / premium without the shock price",
    "Big platters = primary revenue driver",
    "Never say cheap / budget / affordable",
  ],
  categories: [
    { cat: "Grills & Skewers", range: "$12.99–$22.99", heroes: "Chicken skewers, Lamb chops, Paneer tikka, Sajji" },
    { cat: "Wraps & Doner", range: "$10.99–$15.99", heroes: "Doner supreme, smoked chicken wrap" },
    { cat: "Biryani / Sajji", range: "$19.99–$22.99", heroes: "Family occasion heroes" },
    { cat: "Desserts", range: "$4.50–$7.99", heroes: "Tiramisu station, Dubai cake, entremets" },
    { cat: "Shakes / drinks", range: "$4.99–$6.99+", heroes: "Expand real-fruit lineup" },
  ],
  openingSpecial:
    "Reference: 50% off Sajji full chicken at $18.99 with Instagram tag + Google review (confirm if still active).",
};

export type CostItem = {
  id: string;
  section: "fixed" | "variable" | "product" | "market";
  label: string;
  amount: number;
  notes: string;
};

export const costingSeed: {
  assumptions: { deliveryCommissionPct: number; targetFoodCostPct: number; monthlyOrders: number; avgTicket: number };
  items: CostItem[];
} = {
  assumptions: {
    deliveryCommissionPct: 28,
    targetFoodCostPct: 32,
    monthlyOrders: 1200,
    avgTicket: 28,
  },
  items: [
    { id: "f1", section: "fixed", label: "Rent / occupancy (est.)", amount: 8500, notes: "Placeholder — replace with actuals" },
    { id: "f2", section: "fixed", label: "Labour (est.)", amount: 18000, notes: "Placeholder" },
    { id: "f3", section: "fixed", label: "Utilities + insurance", amount: 2200, notes: "Placeholder" },
    { id: "f4", section: "fixed", label: "Marketing retainer / creatives", amount: 2500, notes: "Content + ads production" },
    { id: "v1", section: "variable", label: "Food COGS (modeled)", amount: 0, notes: "Calc from orders × ticket × food cost %" },
    { id: "v2", section: "variable", label: "Delivery commissions (modeled)", amount: 0, notes: "Calc from delivery share" },
    { id: "v3", section: "variable", label: "Packaging", amount: 900, notes: "Alibaba / Iris pipeline" },
    { id: "p1", section: "product", label: "Avg platter contribution (illustrative)", amount: 12, notes: "Per order contribution target" },
    { id: "m1", section: "market", label: "Meta ads test budget", amount: 1500, notes: "5km geo when approved" },
    { id: "m2", section: "market", label: "Influencer tastings (food cost)", amount: 600, notes: "Food-only early phase" },
  ],
};

export const funnel = {
  title: "Customer Journey / Funnel",
  stages: [
    { stage: "Aware", channels: "IG/TikTok Reels, GMB photos, community WhatsApp, Medium", job: "Show flame + platters + shakes" },
    { stage: "Consider", channels: "Menu page, reviews, influencer reel tags", job: "Trust: clean meat, no alcohol, lava stone" },
    { stage: "Order", channels: "Toast, Uber Eats, DoorDash, Skip, walk-in takeaway", job: "Reduce friction; NAP consistent" },
    { stage: "Experience", channels: "Packaging, open-grill story, sauce choice", job: "Photo-worthy unboxing + taste" },
    { stage: "Review", channels: "QR card, bill ask, WhatsApp 1h", job: "GMB velocity" },
    { stage: "Loyalty", channels: "Weekend dish, loyalty stamps, catering, story tags", job: "Repeat + referrals" },
  ],
};
