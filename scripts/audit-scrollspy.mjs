/** Audit sidebar scroll-spy: scroll each section into view and read aria-current. */
import { chromium } from "playwright";

const BASE = process.env.AUDIT_URL || "http://localhost:3000";

async function activeNav(page) {
  return page.evaluate(() => {
    const aside = document.querySelector("aside[data-active-section]");
    const cur = document.querySelector('nav a[data-active="true"]');
    return {
      section: aside?.getAttribute("data-active-section") || null,
      id: cur?.getAttribute("data-nav-id") || null,
      label: cur?.textContent?.replace(/\s+/g, " ").trim() || null,
    };
  });
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  await page.goto(BASE, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForSelector("#current");
  await page.waitForTimeout(500);

  const ids = ["current", "goals", "paid", "budget", "next"];
  const results = [];

  for (const id of ids) {
    await page.evaluate((sectionId) => {
      const el = document.getElementById(sectionId);
      if (!el) return;
      const y = el.getBoundingClientRect().top + window.scrollY - 160;
      window.scrollTo({ top: Math.max(0, y), behavior: "instant" });
      if (sectionId === "next") {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        window.scrollTo({ top: max, behavior: "instant" });
      }
    }, id);
    await page.waitForTimeout(500);
    const active = await activeNav(page);
    const tops = await page.evaluate((sectionIds) => {
      return Object.fromEntries(
        sectionIds.map((sid) => {
          const el = document.getElementById(sid);
          if (!el) return [sid, null];
          const r = el.getBoundingClientRect();
          return [sid, { top: Math.round(r.top), bottom: Math.round(r.bottom) }];
        })
      );
    }, ids);
    results.push({ scrolledTo: id, active, tops });
  }

  // Click Paid in sidebar
  await page.click('nav a[href="#paid"]');
  await page.waitForTimeout(500);
  const afterClick = await activeNav(page);
  results.push({ scrolledTo: "click-paid", active: afterClick });

  console.log(JSON.stringify(results, null, 2));

  const fails = results.filter((r) => {
    const got = r.active.section || r.active.id;
    if (r.scrolledTo === "click-paid") return got !== "paid";
    return got !== r.scrolledTo;
  });

  await browser.close();
  if (fails.length) {
    console.error("FAIL", fails);
    process.exit(1);
  }
  console.log("PASS — scroll-spy matches every section");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
