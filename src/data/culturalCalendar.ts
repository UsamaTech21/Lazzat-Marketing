/**
 * Cultural / seasonal calendar — Oct 1, 2026 → Dec 31, 2027
 * Canada + Ontario + Brampton-relevant occasions.
 * Statutory dates: Ontario ESA / federal observances.
 * Lunar festivals: widely published almanac dates; Islamic dates marked moon-dependent.
 * Diwali 2027 listed for GTA/Brampton local evening (Oct 28) with India date noted.
 */

export type CulturalEvent = {
  id: string;
  /** ISO date YYYY-MM-DD (start) */
  date: string;
  /** Optional end for multi-day windows */
  endDate?: string;
  title: string;
  type: "statutory" | "cultural" | "seasonal" | "community";
  region: "Canada" | "Ontario" | "Brampton" | "GTA";
  accuracy: string;
  heroDish: string;
  lazzatAngle: string;
  formats: string;
};

export const culturalCampaignMeta = {
  title: "Cultural / Seasonal Calendar",
  subtitle:
    "Oct 1, 2026 → Dec 31, 2027 — Canada / Ontario / Brampton occasions with exact dates and a Lazzat post or video angle for each.",
  rule: "Plan each major occasion ≥2 weeks ahead. Soft cultural respect only — never religious phrases, never “halal” / charcoal / Desi brand framing. Canadian brand for every table.",
  sourcesNote:
    "Ontario public holidays follow ESA dates. Civic Holiday and Remembrance Day are widely observed but not all are ESA statutory. Eid dates can shift ±1 day with moon sighting. Diwali 2027 for Brampton uses local GTA evening (Oct 28).",
};

/** Full timeline for the portal calendar */
export const culturalEvents: CulturalEvent[] = [
  // ——— 2026 Q4 ———
  {
    id: "2026-10-01",
    date: "2026-10-01",
    title: "October content kickoff",
    type: "seasonal",
    region: "Brampton",
    accuracy: "Planning marker (Thu)",
    heroDish: "Family platter + paneer",
    lazzatAngle:
      "Start Navratri/Diwali prep week: Reel of veg grill + family platter build. Caption: autumn weekends, every table welcome.",
    formats: "Reel · Stories countdown",
  },
  {
    id: "2026-10-11-navratri",
    date: "2026-10-11",
    endDate: "2026-10-19",
    title: "Sharad Navratri (begins)",
    type: "cultural",
    region: "Brampton",
    accuracy: "Almanac — Ashwin Shukla Pratipada (Sun Oct 11 → ~Oct 19)",
    heroDish: "Paneer tikka · grilled veg",
    lazzatAngle:
      "Vegetarian spotlight series: Paneer Tikka close-ups, platter builds, “veg heroes on lava stone.” No religious copy — celebrate food and family.",
    formats: "Reel daily hook · Carousel menu · Stories",
  },
  {
    id: "2026-10-12-thanksgiving",
    date: "2026-10-12",
    title: "Thanksgiving Day (Canada)",
    type: "statutory",
    region: "Canada",
    accuracy: "Second Monday of October — Ontario ESA public holiday",
    heroDish: "Family platter · Sajji",
    lazzatAngle:
      "Canadian Thanksgiving table: big family platter Reel, “gather without the stress.” Soft gratitude — no religious language. McVean + Clarence pickup CTAs.",
    formats: "Reel · Static offer · Stories",
  },
  {
    id: "2026-10-20-dussehra",
    date: "2026-10-20",
    title: "Dussehra (Vijayadashami)",
    type: "cultural",
    region: "Brampton",
    accuracy: "Almanac — Ashwin Shukla Dashami (Tue)",
    heroDish: "Family shareables · paneer",
    lazzatAngle:
      "Closing Navratri window with a bright family feast post — light, food, togetherness. Hero veg + grill mix.",
    formats: "Reel · Carousel",
  },
  {
    id: "2026-10-29-karva",
    date: "2026-10-29",
    title: "Karva Chauth",
    type: "cultural",
    region: "Brampton",
    accuracy: "Almanac (Thu)",
    heroDish: "Evening feast platter · dessert",
    lazzatAngle:
      "Soft evening feast framing only — dinner-ready platters and dessert add-ons. Avoid ritual/religious copy; focus on “dinner for two / family after a long day.”",
    formats: "Stories · Static",
  },
  {
    id: "2026-10-31-halloween",
    date: "2026-10-31",
    title: "Halloween",
    type: "seasonal",
    region: "Canada",
    accuracy: "Fixed annual date (Sat)",
    heroDish: "Shakes · wraps · kids platter",
    lazzatAngle:
      "Fun Canadian night: shake transform Reel, “treat yourself” platter. Keep brand-safe — playful, not scary gore.",
    formats: "Reel · Stories",
  },
  {
    id: "2026-11-08-diwali",
    date: "2026-11-08",
    title: "Diwali (Deepavali)",
    type: "cultural",
    region: "Brampton",
    accuracy: "Widely published — Kartika Amavasya (Sun). Confirm local temple timing week-of.",
    heroDish: "Family platter · dessert / tiramisu",
    lazzatAngle:
      "Festival of lights feast: warm lighting Reel, family platter + dessert station. “Light the table” — community pillar, no religious phrases.",
    formats: "Reel · Carousel · Stories series (3 days)",
  },
  {
    id: "2026-11-11-remembrance",
    date: "2026-11-11",
    title: "Remembrance Day",
    type: "community",
    region: "Canada",
    accuracy: "Fixed Nov 11 — not an Ontario ESA statutory holiday; widely observed",
    heroDish: "—",
    lazzatAngle:
      "Quiet respect post only if needed (simple graphic). Prefer low promo that day — pause hard-sell offers.",
    formats: "Optional static (respectful)",
  },
  {
    id: "2026-11-15-chhath",
    date: "2026-11-15",
    endDate: "2026-11-16",
    title: "Chhath Puja window",
    type: "cultural",
    region: "Brampton",
    accuracy: "Almanac window (Sun–Mon)",
    heroDish: "Family feast · clean-meat trust",
    lazzatAngle:
      "Community family dining soft post — not ritual content. Focus on wholesome family plates for Brampton households.",
    formats: "Stories · Static",
  },
  {
    id: "2026-11-24-gurpurab",
    date: "2026-11-24",
    title: "Guru Nanak Gurpurab (Jayanti)",
    type: "cultural",
    region: "Brampton",
    accuracy: "Almanac — Kartik Purnima (Tue). High relevance for Brampton Sikh community.",
    heroDish: "Family shareables · seekh · platter",
    lazzatAngle:
      "Respectful community post: family shareables, langar-spirit of sharing food without religious phrases. Soft gratitude + platter CTA.",
    formats: "Reel · Static",
  },
  {
    id: "2026-12-01-holiday",
    date: "2026-12-01",
    title: "December holiday season kickoff",
    type: "seasonal",
    region: "Canada",
    accuracy: "Planning marker (Tue)",
    heroDish: "Sajji · desserts · shakes",
    lazzatAngle:
      "“Gift of a feast” series starts: Sajji hero Reel, dessert station, shake gifts. Plan Christmas creatives now.",
    formats: "Reel · Carousel",
  },
  {
    id: "2026-12-21-solstice",
    date: "2026-12-21",
    title: "Winter solstice / cozy season",
    type: "seasonal",
    region: "Canada",
    accuracy: "Astronomical (Mon)",
    heroDish: "Warm platters · hot sides · shakes",
    lazzatAngle:
      "Cozy Canadian winter Reel — steam, flame, hot food. “Warm the table” mood.",
    formats: "Reel · Stories",
  },
  {
    id: "2026-12-25-xmas",
    date: "2026-12-25",
    title: "Christmas Day",
    type: "statutory",
    region: "Canada",
    accuracy: "Ontario ESA public holiday (Fri)",
    heroDish: "Sajji · family platter · desserts",
    lazzatAngle:
      "Holiday feast Reel (pre-shot if closed): Sajji + dessert. Hours story if open for pickup — confirm ops first.",
    formats: "Reel · Stories (hours)",
  },
  {
    id: "2026-12-26-boxing",
    date: "2026-12-26",
    title: "Boxing Day",
    type: "statutory",
    region: "Ontario",
    accuracy: "Ontario ESA public holiday (Sat Dec 26). Some retail observe Mon Dec 28.",
    heroDish: "Leftover-feast platters · shakes",
    lazzatAngle:
      "Boxing Day feast continue: “still gathering” platter + shake deal Story. Confirm open hours with ops.",
    formats: "Stories · Static",
  },
  {
    id: "2026-12-31-nye",
    date: "2026-12-31",
    title: "New Year’s Eve",
    type: "seasonal",
    region: "Canada",
    accuracy: "Fixed (Thu)",
    heroDish: "Sajji · party platters · shakes",
    lazzatAngle:
      "NYE party platter Reel — flame, shareable spreads, shake toast (no alcohol). Pre-order / pickup CTA.",
    formats: "Reel · Stories",
  },

  // ——— 2027 ———
  {
    id: "2027-01-01-ny",
    date: "2027-01-01",
    title: "New Year’s Day",
    type: "statutory",
    region: "Canada",
    accuracy: "Ontario ESA public holiday (Fri)",
    heroDish: "Fresh start platter · shakes",
    lazzatAngle:
      "New year, same flame: short brand Reel + menu CTA. Soft reset energy, Canadian brand.",
    formats: "Reel · Static",
  },
  {
    id: "2027-01-14-lohri",
    date: "2027-01-14",
    title: "Lohri / Makar Sankranti window",
    type: "cultural",
    region: "Brampton",
    accuracy: "Lohri often Jan 13–14; Makar Sankranti ~Jan 14–15 (almanac)",
    heroDish: "Warm grill · seekh · family sides",
    lazzatAngle:
      "Winter warmth content — fire, seekh, family plates. Celebrate harvest/winter gathering vibe without ritual copy.",
    formats: "Reel · Stories",
  },
  {
    id: "2027-02-14-valentine",
    date: "2027-02-14",
    title: "Valentine’s Day",
    type: "seasonal",
    region: "Canada",
    accuracy: "Fixed (Sun)",
    heroDish: "Dinner for two · dessert · shakes",
    lazzatAngle:
      "Date-night platter + shake transform Reel. “Dinner for two, flame included.”",
    formats: "Reel · Stories",
  },
  {
    id: "2027-02-15-family",
    date: "2027-02-15",
    title: "Family Day (Ontario)",
    type: "statutory",
    region: "Ontario",
    accuracy: "Third Monday in February — Ontario ESA (Mon)",
    heroDish: "Family platter · kids + shakes",
    lazzatAngle:
      "Ontario Family Day: big platter Reel, kids-friendly shake, both locations CTA. Long weekend family dining.",
    formats: "Reel · Carousel · Stories",
  },
  {
    id: "2027-02-black-history",
    date: "2027-02-01",
    endDate: "2027-02-28",
    title: "Black History Month (Canada)",
    type: "community",
    region: "Canada",
    accuracy: "Official Canadian observance — full month of February",
    heroDish: "Doner · wraps · shakes (Clarence corridor)",
    lazzatAngle:
      "Inclusive “every table” community posts — Clarence corridor welcome, craft food, no tokenism. Optional creator collab with local Brampton voices.",
    formats: "Reel · Static series",
  },
  {
    id: "2027-03-10-eid-fitr",
    date: "2027-03-10",
    title: "Eid al-Fitr (expected)",
    type: "cultural",
    region: "Brampton",
    accuracy: "Expected ~Mar 9–10, 2027 — confirm ±1 day with local moon sighting",
    heroDish: "Biryani · Sajji · family bundle",
    lazzatAngle:
      "End-of-Ramadan family feast: Biryani + Sajji Reel, clean-meat trust close-ups, family bundle CTA. Plan creatives 2 weeks early.",
    formats: "Reel · Carousel · Stories",
  },
  {
    id: "2027-03-22-holi",
    date: "2027-03-22",
    title: "Holi",
    type: "cultural",
    region: "Brampton",
    accuracy: "Almanac — often Mar 22 (Mon); Holika Dahan eve ~Mar 21",
    heroDish: "Colourful platters · shakes · paneer",
    lazzatAngle:
      "Colour + food joy: bright shake Reel, veg + grill mix. Fun Canadian celebration energy — no religious copy.",
    formats: "Reel · Stories",
  },
  {
    id: "2027-03-26-good-friday",
    date: "2027-03-26",
    title: "Good Friday",
    type: "statutory",
    region: "Canada",
    accuracy: "Ontario ESA public holiday (Fri)",
    heroDish: "Family platter · fish-free grill heroes",
    lazzatAngle:
      "Quiet long-weekend dining CTA. Confirm hours. Soft family meal content — respectful tone, light promo.",
    formats: "Stories (hours) · Static",
  },
  {
    id: "2027-03-28-easter",
    date: "2027-03-28",
    title: "Easter Sunday",
    type: "seasonal",
    region: "Canada",
    accuracy: "Western Christian calendar (Sun) — not Ontario ESA statutory",
    heroDish: "Family feast · desserts",
    lazzatAngle:
      "Spring family table Reel — brunch/dinner feast framing. Optional dessert spotlight.",
    formats: "Reel · Stories",
  },
  {
    id: "2027-04-14-vaisakhi",
    date: "2027-04-14",
    title: "Vaisakhi (Baisakhi)",
    type: "cultural",
    region: "Brampton",
    accuracy: "Fixed solar — April 14 annually (Wed in 2027). Major Brampton Sikh occasion.",
    heroDish: "Lamb seekh · chicken skewers · family platter",
    lazzatAngle:
      "Spring harvest / community feast energy: seekh + skewers Reel, Punjabi+English captions OK for community connection, no religious phrases. Family platter CTA.",
    formats: "Reel · Carousel · Stories",
  },
  {
    id: "2027-05-09-mothers",
    date: "2027-05-09",
    title: "Mother’s Day (Canada)",
    type: "seasonal",
    region: "Canada",
    accuracy: "Second Sunday of May (Sun)",
    heroDish: "Family platter · dessert · shakes",
    lazzatAngle:
      "Treat Mom: dessert + platter Reel, “table reserved for her.” Takeout gift framing.",
    formats: "Reel · Stories · Static",
  },
  {
    id: "2027-05-17-eid-adha",
    date: "2027-05-16",
    endDate: "2027-05-17",
    title: "Eid al-Adha (expected)",
    type: "cultural",
    region: "Brampton",
    accuracy: "Expected ~May 16–17, 2027 — confirm ±1 day with moon sighting",
    heroDish: "Lamb chops · seekh · lamb platter",
    lazzatAngle:
      "Lamb week on lava stone: chops + seekh Reel, clean-meat trust, family feast CTA. Shoot and schedule early.",
    formats: "Reel · Carousel",
  },
  {
    id: "2027-05-24-victoria",
    date: "2027-05-24",
    title: "Victoria Day",
    type: "statutory",
    region: "Canada",
    accuracy: "Monday before May 25 — Ontario ESA (Mon)",
    heroDish: "BBQ weekend platters · shakes",
    lazzatAngle:
      "Long weekend grill mood: outdoor/patio-adjacent flame content, platter deals, both pins.",
    formats: "Reel · Stories",
  },
  {
    id: "2027-05-asian-heritage",
    date: "2027-05-01",
    endDate: "2027-05-31",
    title: "Asian Heritage Month (Canada)",
    type: "community",
    region: "Canada",
    accuracy: "Official Canadian observance — full month of May",
    heroDish: "Global Kitchen heroes · paneer · Sajji",
    lazzatAngle:
      "Global Kitchen pillar: world flavours for Canadian tables — showcase menu breadth without ethnic brand framing.",
    formats: "Reel series · Carousel",
  },
  {
    id: "2027-06-20-fathers",
    date: "2027-06-20",
    title: "Father’s Day (Canada)",
    type: "seasonal",
    region: "Canada",
    accuracy: "Third Sunday of June (Sun)",
    heroDish: "Grill heroes · lamb · Sajji",
    lazzatAngle:
      "Grill-for-Dad Reel: lamb/Sajji hero, “flame for him.” Family shareable.",
    formats: "Reel · Stories",
  },
  {
    id: "2027-06-21-indigenous",
    date: "2027-06-21",
    title: "National Indigenous Peoples Day",
    type: "community",
    region: "Canada",
    accuracy: "Fixed June 21 — federal observance",
    heroDish: "—",
    lazzatAngle:
      "Optional quiet respect / closed-promo day. Prefer learning/share from official sources over sales posts.",
    formats: "Optional static",
  },
  {
    id: "2027-07-01-canada",
    date: "2027-07-01",
    title: "Canada Day",
    type: "statutory",
    region: "Canada",
    accuracy: "Ontario ESA public holiday (Thu)",
    heroDish: "Canadian brand feast · platters · shakes",
    lazzatAngle:
      "Canadian brand day: “Taste the World. Crafted Fresh.” flame Reel, red/white soft palette, every-table welcome. Strong brand film style.",
    formats: "Reel · Carousel",
  },
  {
    id: "2027-07-caribana",
    date: "2027-07-31",
    endDate: "2027-08-02",
    title: "Toronto Caribbean Carnival weekend (approx.)",
    type: "community",
    region: "GTA",
    accuracy: "Carnival weekend traditionally late Jul / early Aug — confirm 2027 festival dates when published",
    heroDish: "Doner · wraps · shakes",
    lazzatAngle:
      "Clarence corridor energy: fast wraps/Doner, shake Reel, summer foot-traffic CTAs. Confirm Clarence live status before geo ads.",
    formats: "Reel · Stories",
  },
  {
    id: "2027-08-02-civic",
    date: "2027-08-02",
    title: "Civic Holiday (Ontario)",
    type: "community",
    region: "Ontario",
    accuracy: "First Monday in August — widely observed; not ESA statutory for all workplaces",
    heroDish: "Summer platters · shakes",
    lazzatAngle:
      "Long weekend summer feast Reel — pickup CTA, shake specials.",
    formats: "Reel · Stories",
  },
  {
    id: "2027-08-17-rakhi",
    date: "2027-08-17",
    title: "Raksha Bandhan",
    type: "cultural",
    region: "Brampton",
    accuracy: "Almanac (~Tue Aug 17, 2027)",
    heroDish: "Family shareables · dessert",
    lazzatAngle:
      "Sibling/family shareable feast — soft community post, dessert add-on. No ritual framing.",
    formats: "Stories · Static",
  },
  {
    id: "2027-08-25-janmashtami",
    date: "2027-08-25",
    title: "Krishna Janmashtami",
    type: "cultural",
    region: "Brampton",
    accuracy: "Almanac (~Wed Aug 25, 2027)",
    heroDish: "Vegetarian grill · paneer · shakes",
    lazzatAngle:
      "Veg-forward celebration day content — paneer/veg grill only. Keep secular food joy.",
    formats: "Reel · Stories",
  },
  {
    id: "2027-09-04-ganesh",
    date: "2027-09-04",
    title: "Ganesh Chaturthi",
    type: "cultural",
    region: "Brampton",
    accuracy: "Almanac (~Sat Sep 4, 2027)",
    heroDish: "Vegetarian platter · paneer",
    lazzatAngle:
      "Veg spotlight Reel for Gujarati/Hindu families — Global Kitchen veg heroes.",
    formats: "Reel · Carousel",
  },
  {
    id: "2027-09-06-labour",
    date: "2027-09-06",
    title: "Labour Day",
    type: "statutory",
    region: "Canada",
    accuracy: "First Monday in September — Ontario ESA (Mon)",
    heroDish: "Weekend feast · platter",
    lazzatAngle:
      "Last long weekend of summer: family platter Reel, “back to routine fuel” shake Story.",
    formats: "Reel · Stories",
  },
  {
    id: "2027-09-30-truth",
    date: "2027-09-30",
    title: "National Day for Truth and Reconciliation",
    type: "community",
    region: "Canada",
    accuracy: "Fixed Sep 30 — federal observance (Thu)",
    heroDish: "—",
    lazzatAngle:
      "Low/no promo. Optional respectful share pointing to official Indigenous resources. Orange Shirt Day awareness — not a sales day.",
    formats: "Optional static",
  },
  {
    id: "2027-09-30-navratri",
    date: "2027-09-30",
    endDate: "2027-10-09",
    title: "Sharad Navratri (begins)",
    type: "cultural",
    region: "Brampton",
    accuracy: "Almanac — begins Thu Sep 30, 2027 through ~Dussehra Oct 9/10",
    heroDish: "Paneer tikka · grilled veg",
    lazzatAngle:
      "Nine-day veg grill series: Paneer Tikka, veg platters. Schedule assets before Sep 20.",
    formats: "Reel series · Stories",
  },
  {
    id: "2027-10-09-dussehra",
    date: "2027-10-09",
    endDate: "2027-10-10",
    title: "Dussehra (Vijayadashami)",
    type: "cultural",
    region: "Brampton",
    accuracy: "Almanac ~Sat Oct 9 / Sun Oct 10, 2027 (sources vary by tradition)",
    heroDish: "Family shareables",
    lazzatAngle:
      "Navratri close-out feast post — light and family table.",
    formats: "Reel · Static",
  },
  {
    id: "2027-10-11-thanksgiving",
    date: "2027-10-11",
    title: "Thanksgiving Day (Canada)",
    type: "statutory",
    region: "Canada",
    accuracy: "Second Monday of October — Ontario ESA (Mon)",
    heroDish: "Family platter · Sajji",
    lazzatAngle:
      "Canadian Thanksgiving gather Reel — platter, gratitude for the table, both locations.",
    formats: "Reel · Stories · Static",
  },
  {
    id: "2027-10-18-karva",
    date: "2027-10-18",
    title: "Karva Chauth",
    type: "cultural",
    region: "Brampton",
    accuracy: "Almanac (Mon)",
    heroDish: "Evening feast · dessert",
    lazzatAngle:
      "Evening dinner-ready platter Soft post — pairs/family after sunset framing, no ritual copy.",
    formats: "Stories · Static",
  },
  {
    id: "2027-10-28-diwali-gta",
    date: "2027-10-28",
    title: "Diwali (GTA / Brampton evening)",
    type: "cultural",
    region: "Brampton",
    accuracy:
      "GTA/Brampton Lakshmi Puja evening often Oct 28, 2027 (local pradosh). India commonly lists Oct 29 — confirm with local temple week-of.",
    heroDish: "Family platter · desserts",
    lazzatAngle:
      "Lights + feast: warm Reel, family platter, dessert add-ons. “Light the table” community series over 3 days.",
    formats: "Reel · Carousel · Stories",
  },
  {
    id: "2027-10-29-diwali-india-ref",
    date: "2027-10-29",
    title: "Diwali (widely listed India date)",
    type: "cultural",
    region: "Brampton",
    accuracy: "Common India almanac date Fri Oct 29 — many GTA families celebrate across Oct 28–29",
    heroDish: "Family platter · desserts",
    lazzatAngle:
      "Continue Diwali feast content / late pickup CTA if ops open. Same creative system as Oct 28.",
    formats: "Stories · Static",
  },
  {
    id: "2027-10-31-halloween",
    date: "2027-10-31",
    title: "Halloween",
    type: "seasonal",
    region: "Canada",
    accuracy: "Fixed (Sun)",
    heroDish: "Shakes · wraps",
    lazzatAngle:
      "Playful shake Reel — treat energy, brand-safe fun.",
    formats: "Reel · Stories",
  },
  {
    id: "2027-11-11-remembrance",
    date: "2027-11-11",
    title: "Remembrance Day",
    type: "community",
    region: "Canada",
    accuracy: "Fixed Nov 11 (Thu) — not Ontario ESA statutory",
    heroDish: "—",
    lazzatAngle: "Quiet day — pause hard sell; optional respectful graphic only.",
    formats: "Optional static",
  },
  {
    id: "2027-11-14-gurpurab",
    date: "2027-11-14",
    title: "Guru Nanak Gurpurab (Jayanti)",
    type: "cultural",
    region: "Brampton",
    accuracy: "Almanac — Kartik Purnima (Sun Nov 14, 2027)",
    heroDish: "Family shareables · seekh",
    lazzatAngle:
      "Respectful sharing-food community post for Brampton Sikh families — no religious phrases, platter CTA.",
    formats: "Reel · Static",
  },
  {
    id: "2027-12-01-holiday",
    date: "2027-12-01",
    title: "December holiday season kickoff",
    type: "seasonal",
    region: "Canada",
    accuracy: "Planning marker (Wed)",
    heroDish: "Sajji · desserts · shakes",
    lazzatAngle: "Start “gift of a feast” December series — schedule Christmas assets.",
    formats: "Reel · Carousel",
  },
  {
    id: "2027-12-25-xmas",
    date: "2027-12-25",
    title: "Christmas Day",
    type: "statutory",
    region: "Canada",
    accuracy: "Ontario ESA public holiday (Sat)",
    heroDish: "Sajji · desserts",
    lazzatAngle:
      "Holiday feast content (pre-shot). Confirm if open — Stories for hours.",
    formats: "Reel · Stories",
  },
  {
    id: "2027-12-26-boxing",
    date: "2027-12-26",
    title: "Boxing Day",
    type: "statutory",
    region: "Ontario",
    accuracy: "Ontario ESA (Sun Dec 26). Retail often observes Mon Dec 27.",
    heroDish: "Platters · shakes",
    lazzatAngle: "Continue holiday feast / pickup CTA if open.",
    formats: "Stories · Static",
  },
  {
    id: "2027-12-31-nye",
    date: "2027-12-31",
    title: "New Year’s Eve",
    type: "seasonal",
    region: "Canada",
    accuracy: "Fixed (Fri)",
    heroDish: "Party platters · Sajji · shakes",
    lazzatAngle:
      "NYE shareable feast Reel — flame, platters, alcohol-free toast with shakes.",
    formats: "Reel · Stories",
  },
];

export function culturalMonthKey(date: string) {
  return date.slice(0, 7); // YYYY-MM
}

export function formatCulturalDate(date: string) {
  const d = new Date(`${date}T12:00:00`);
  return d.toLocaleDateString("en-CA", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/** Compact preview for Organic section */
export const culturalCalendarPreview = culturalEvents
  .filter((e) => e.type === "cultural" || e.type === "statutory")
  .slice(0, 12)
  .map((e) => ({
    month: e.date.slice(5, 7) === "10" && e.date.startsWith("2026") ? "Oct 2026" : formatCulturalDate(e.date).slice(4, 12),
    occasion: e.title,
    dish: e.heroDish,
  }));
