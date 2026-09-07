"use client";

import { useCallback, useState } from "react";
import { PortalShell, Section, StatTile } from "@/components/PortalShell";
import { ChecklistPanel } from "@/components/ChecklistPanel";
import { KanbanBoard } from "@/components/KanbanBoard";
import { KeywordTable } from "@/components/KeywordTable";
import { ContentCalendar } from "@/components/ContentCalendar";
import { CostingCalculator } from "@/components/CostingCalculator";
import { RecycleBin } from "@/components/RecycleBin";
import { brand } from "@/data/brand";
import { currentSituation } from "@/data/currentSituation";
import { paidPlan } from "@/data/paidPlan";
import { goals, audience, competitors, swot } from "@/data/strategyCore";
import {
  positioning,
  pricing,
  funnel,
} from "@/data/growthCore";
import {
  organic,
  influencer,
  budget,
  timeline,
  kpis,
  growth,
} from "@/data/channels";
import { findings, nextActions, culturalCalendar } from "@/data/execution";
import { STORAGE_KEYS, clearKeys } from "@/lib/storage";

function Severity({ s }: { s: "critical" | "high" | "medium" | "low" }) {
  const color =
    s === "critical" || s === "high"
      ? "text-[var(--danger)] border-[var(--danger)]/40"
      : s === "medium"
        ? "text-[var(--warn)] border-[var(--warn)]/40"
        : "text-[var(--success)] border-[var(--success)]/40";
  return <span className={`badge ${color}`}>{s}</span>;
}

export function StrategyApp() {
  const [checkPct, setCheckPct] = useState(0);
  const [taskPct, setTaskPct] = useState(0);
  const [recycleKey, setRecycleKey] = useState(0);
  const bumpRecycle = () => setRecycleKey((k) => k + 1);

  const onCheckProgress = useCallback((pct: number) => setCheckPct(pct), []);
  const onTaskProgress = useCallback((pct: number) => setTaskPct(pct), []);

  const resetAll = () => {
    clearKeys(Object.values(STORAGE_KEYS));
    window.location.reload();
  };

  return (
    <PortalShell checklistProgress={checkPct} taskProgress={taskPct} onResetAll={resetAll}>
      <Section id="current" title={currentSituation.title} subtitle={currentSituation.subtitle}>
        <p className="mb-4 text-[11px] text-[var(--muted)]">{currentSituation.sourceNote}</p>
        <div className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatTile label="Followers" value={currentSituation.headline.followers} sub={currentSituation.headline.period} />
          <StatTile label="Impressions" value={currentSituation.headline.impressions} sub="Across tracked networks" />
          <StatTile label="Interactions" value={currentSituation.headline.interactions} sub="Engagement total" />
          <StatTile label="Posts" value={currentSituation.headline.posts} sub="Publishing volume" />
        </div>

        <div className="mb-5 grid gap-3 md:grid-cols-2">
          <div className="card">
            <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-[var(--gold)]">Followers by platform</h3>
            <div className="table-wrap">
              <table className="data">
                <tbody>
                  {currentSituation.followersByPlatform.map((r) => (
                    <tr key={r.platform}>
                      <td>{r.platform}</td>
                      <td className="text-right font-semibold text-[var(--gold-light)]">{r.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="card">
            <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-[var(--gold)]">Impressions by platform</h3>
            <div className="table-wrap">
              <table className="data">
                <tbody>
                  {currentSituation.impressionsByPlatform.map((r) => (
                    <tr key={r.platform}>
                      <td>{r.platform}</td>
                      <td className="text-right font-semibold text-[var(--gold-light)]">
                        {r.value.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mb-5 grid gap-3 md:grid-cols-3">
          <div className="card">
            <h3 className="mb-1 text-xs font-bold uppercase tracking-wider text-[var(--gold)]">TikTok · 365d</h3>
            <p className="text-[11px] text-[var(--muted)]">{currentSituation.tiktok365.period}</p>
            <p className="mt-2 text-sm">
              <strong className="text-[var(--gold-light)]">{currentSituation.tiktok365.videoViews}</strong> views ·{" "}
              {currentSituation.tiktok365.profileViews} profile · {currentSituation.tiktok365.likes} likes
            </p>
            <ul className="mt-2 space-y-1 text-[12px] text-[var(--muted)]">
              {currentSituation.tiktok365.traffic.map((t) => (
                <li key={t.source}>
                  {t.source}: <span className="text-[var(--cream)]">{t.pct}%</span>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-[11px] text-[var(--muted)]">{currentSituation.tiktok365.note}</p>
          </div>
          <div className="card">
            <h3 className="mb-1 text-xs font-bold uppercase tracking-wider text-[var(--gold)]">Instagram · 90d</h3>
            <p className="text-[11px] text-[var(--muted)]">{currentSituation.instagram90.period}</p>
            <p className="mt-2 text-sm">
              <strong className="text-[var(--gold-light)]">
                {currentSituation.instagram90.views.toLocaleString()}
              </strong>{" "}
              views · {currentSituation.instagram90.uniqueViewers.toLocaleString()} unique
            </p>
            <p className="mt-1 text-[12px]">
              Non-followers <strong>{currentSituation.instagram90.nonFollowersPct}%</strong> · Followers{" "}
              {currentSituation.instagram90.followersPct}%
            </p>
            <ul className="mt-2 space-y-1 text-[12px] text-[var(--muted)]">
              {currentSituation.instagram90.byType.map((t) => (
                <li key={t.type}>
                  {t.type}: <span className="text-[var(--cream)]">{t.pct}%</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card">
            <h3 className="mb-1 text-xs font-bold uppercase tracking-wider text-[var(--gold)]">Facebook video · 90d</h3>
            <p className="text-[11px] text-[var(--muted)]">{currentSituation.facebook90.period}</p>
            <p className="mt-2 text-sm">
              <strong className="text-[var(--gold-light)]">
                {currentSituation.facebook90.views.toLocaleString()}
              </strong>{" "}
              views · +{currentSituation.facebook90.viewsGrowthPct}%
            </p>
            <p className="mt-1 text-[12px] text-[var(--muted)]">
              {currentSituation.facebook90.viewers.toLocaleString()} viewers ·{" "}
              {currentSituation.facebook90.threeSecViews.toLocaleString()} × 3s views ·{" "}
              <strong className="text-[var(--warn)]">{currentSituation.facebook90.oneMinViews}</strong> × 1-min
            </p>
          </div>
        </div>

        <div className="card mb-5">
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-[var(--gold)]">TikTok search queries</h3>
          <div className="flex flex-wrap gap-2">
            {currentSituation.tiktok365.searchQueries.map((q) => (
              <span key={q} className="badge">
                {q}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-5 grid gap-3 md:grid-cols-2">
          <div className="card">
            <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-[var(--success)]">What is working</h3>
            <ul className="list-disc space-y-1.5 pl-4 text-[13px]">
              {currentSituation.strengths.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <div className="card">
            <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-[var(--warn)]">Gaps to close</h3>
            <ul className="list-disc space-y-1.5 pl-4 text-[13px]">
              {currentSituation.gaps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mb-5 grid gap-3 md:grid-cols-3">
          {currentSituation.growthCeiling.map((g) => (
            <div key={g.stage} className="stat-tile">
              <div className="stat-label">{g.stage}</div>
              <p className="mt-2 text-[13px] text-[var(--cream)]">{g.target}</p>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--gold)]">Priority focus areas</h3>
          {currentSituation.opsPriorities.map((item) => (
            <div key={item.id} className="card">
              <div className="mb-1.5 flex flex-wrap items-center gap-2">
                <Severity s={item.severity} />
                <h4 className="font-semibold text-[var(--cream)]">{item.focus}</h4>
              </div>
              <p className="text-[12px] text-[var(--muted)]">
                <strong className="text-[var(--gold-deep)]">Now:</strong> {item.now}
              </p>
              <p className="mt-1 text-[13px]">
                <strong className="text-[var(--gold)]">Next:</strong> {item.next}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="goals" title={goals.title} subtitle={goals.oneLiner}>
        <div className="mb-4 grid gap-3 md:grid-cols-3">
          {brand.vision.map((v) => (
            <div key={v} className="card text-sm">
              {v}
            </div>
          ))}
        </div>
        <div className="card mb-4">
          <div className="badge mb-2">Launch</div>
          <p>
            Opened <strong>{brand.launchDate}</strong> · {brand.taglines.primary}
          </p>
          <p className="mt-2 text-sm text-[var(--muted)]">{goals.franchiseHorizon}</p>
        </div>
        <div className="table-wrap mb-4">
          <table className="data">
            <thead>
              <tr>
                <th>Phase</th>
                <th>Window</th>
                <th>Outcome</th>
              </tr>
            </thead>
            <tbody>
              {goals.phaseOutcomes.map((p) => (
                <tr key={p.phase}>
                  <td>{p.phase}</td>
                  <td>{p.window}</td>
                  <td>{p.outcome}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="card">
            <h3 className="mb-2 text-sm font-bold text-[var(--gold)]">Primary goals</h3>
            <ul className="list-disc space-y-1 pl-5 text-sm">
              {goals.primaryGoals.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
          </div>
          <div className="card">
            <h3 className="mb-2 text-sm font-bold text-[var(--gold)]">Secondary goals</h3>
            <ul className="list-disc space-y-1 pl-5 text-sm">
              {goals.secondaryGoals.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section id="audience" title={audience.title}>
        <div className="card mb-4 grid gap-2 md:grid-cols-4">
          <div>
            <div className="text-[10px] uppercase text-[var(--muted)]">Population</div>
            <div className="text-[var(--gold-light)]">{audience.bramptonSnap.pop}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase text-[var(--muted)]">Median income</div>
            <div className="text-[var(--gold-light)]">{audience.bramptonSnap.medianIncome}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase text-[var(--muted)]">Household</div>
            <div className="text-[var(--gold-light)]">{audience.bramptonSnap.household}</div>
          </div>
          <div className="text-sm text-[var(--muted)] md:col-span-1">{audience.bramptonSnap.insight}</div>
        </div>
        <div className="mb-4 flex flex-wrap gap-2">
          {audience.rules.map((r) => (
            <span key={r} className="badge">
              {r}
            </span>
          ))}
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {audience.personas.map((p) => (
            <div key={p.name} className="card">
              <h3 className="font-[family-name:var(--font-display)] text-xl text-[var(--gold-light)]">
                {p.name}
              </h3>
              <p className="text-xs text-[var(--muted)]">{p.where}</p>
              <p className="mt-2 text-sm">
                <strong>Pain:</strong> {p.pain}
              </p>
              <p className="text-sm">
                <strong>Deliver:</strong> {p.deliver}
              </p>
              <p className="text-sm text-[var(--muted)]">
                <strong>Content:</strong> {p.content}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="competitors" title={competitors.title} subtitle={competitors.finding}>
        <div className="space-y-3 mb-4">
          {competitors.direct.map((c) => (
            <div key={c.name} className="card">
              <h3 className="font-semibold text-[var(--cream)]">{c.name}</h3>
              <p className="text-sm text-[var(--muted)]">Weakness: {c.weakness}</p>
              <p className="text-sm text-[var(--gold-light)]">Lazzat angle: {c.angle}</p>
            </div>
          ))}
        </div>
        <div className="card">
          <h3 className="mb-2 text-sm font-bold text-[var(--gold)]">Watch list</h3>
          <p className="text-sm">{competitors.watch.join(" · ")}</p>
          <h3 className="mb-2 mt-4 text-sm font-bold text-[var(--gold)]">Failure patterns</h3>
          <ul className="list-disc pl-5 text-sm">
            {competitors.patterns.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </Section>

      <Section id="swot" title={swot.title}>
        <div className="grid gap-3 md:grid-cols-2">
          {(
            [
              ["Strengths", swot.strengths],
              ["Weaknesses", swot.weaknesses],
              ["Opportunities", swot.opportunities],
              ["Threats", swot.threats],
            ] as const
          ).map(([label, list]) => (
            <div key={label} className="card">
              <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-[var(--gold)]">{label}</h3>
              <ul className="list-disc space-y-1 pl-5 text-sm">
                {list.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section id="positioning" title={positioning.title}>
        <div className="card mb-4 text-base leading-relaxed">{positioning.statement}</div>
        <div className="mb-4 grid gap-2 md:grid-cols-3">
          {positioning.pillars.map((p, i) => (
            <div key={p} className="card text-sm">
              <span className="text-[var(--gold)]">{i + 1}.</span> {p}
            </div>
          ))}
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="card">
            <h3 className="mb-2 text-sm font-bold text-[var(--gold)]">What Lazzat is NOT</h3>
            <ul className="list-disc pl-5 text-sm">
              {positioning.notThis.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
          <div className="card">
            <h3 className="mb-2 text-sm font-bold text-[var(--gold)]">Message by audience</h3>
            {positioning.messageByAudience.map((m) => (
              <p key={m.who} className="mb-2 text-sm">
                <strong>{m.who}:</strong> {m.msg}
              </p>
            ))}
          </div>
        </div>
        <div className="card mt-4">
          <h3 className="mb-2 text-sm font-bold text-[var(--gold)]">Non-negotiables</h3>
          <ul className="list-disc space-y-1 pl-5 text-sm">
            {brand.nonNegotiables.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </div>
      </Section>

      <Section id="pricing" title={pricing.title} subtitle={pricing.note}>
        <ul className="mb-4 list-disc pl-5 text-sm">
          {pricing.philosophy.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
        <div className="table-wrap mb-4">
          <table className="data">
            <thead>
              <tr>
                <th>Category</th>
                <th>Range</th>
                <th>Heroes</th>
              </tr>
            </thead>
            <tbody>
              {pricing.categories.map((c) => (
                <tr key={c.cat}>
                  <td>{c.cat}</td>
                  <td>{c.range}</td>
                  <td>{c.heroes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card text-sm">{pricing.openingSpecial}</div>
        <div className="card mt-3">
          <h3 className="mb-2 text-sm font-bold text-[var(--gold)]">Locations</h3>
          {brand.locations.map((l) => (
            <div key={l.name} className="mb-2 border-b border-[var(--border)] pb-2 text-sm last:border-0">
              <strong>{l.name}</strong> · <span className="badge">{l.status}</span>
              <div className="text-[var(--muted)]">{l.address}</div>
              <div>{l.hours}</div>
              <div className="text-[var(--gold-light)]">{l.angle}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="costing"
        title="Costing Calculator"
        subtitle="Restaurant model — local seed + localStorage. No backend."
      >
        <CostingCalculator />
      </Section>

      <Section id="funnel" title={funnel.title}>
        <div className="grid gap-3 md:grid-cols-3">
          {funnel.stages.map((s) => (
            <div key={s.stage} className="card">
              <div className="badge mb-2">{s.stage}</div>
              <p className="text-sm text-[var(--muted)]">{s.channels}</p>
              <p className="mt-2 text-sm">{s.job}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="keywords"
        title="Keyword Research"
        subtitle="Local SEO lanes — never charcoal or halal keywords."
      >
        <KeywordTable onSoftDelete={bumpRecycle} />
      </Section>

      <Section id="organic" title={organic.title}>
        <div className="mb-4 grid gap-2 md:grid-cols-3">
          {organic.pillars.map((p) => (
            <div key={p} className="card text-sm">
              {p}
            </div>
          ))}
        </div>
        <div className="table-wrap mb-4">
          <table className="data">
            <thead>
              <tr>
                <th>When</th>
                <th>Format</th>
                <th>Pillar</th>
              </tr>
            </thead>
            <tbody>
              {organic.rhythm.map((r) => (
                <tr key={r.day}>
                  <td>{r.day}</td>
                  <td>{r.format}</td>
                  <td>{r.pillar}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="card">
            <h3 className="mb-2 text-sm font-bold text-[var(--gold)]">Visual rules</h3>
            <ul className="list-disc pl-5 text-sm">
              {organic.visualRules.map((v) => (
                <li key={v}>{v}</li>
              ))}
            </ul>
          </div>
          <div className="card">
            <h3 className="mb-2 text-sm font-bold text-[var(--gold)]">GMB</h3>
            <ul className="list-disc pl-5 text-sm">
              {organic.gmb.map((v) => (
                <li key={v}>{v}</li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-[var(--muted)]">{organic.blogs}</p>
          </div>
        </div>
        <div className="card mt-4">
          <h3 className="mb-2 text-sm font-bold text-[var(--gold)]">Cultural calendar hooks</h3>
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Occasion</th>
                  <th>Hero dish</th>
                </tr>
              </thead>
              <tbody>
                {culturalCalendar.map((c) => (
                  <tr key={c.occasion}>
                    <td>{c.month}</td>
                    <td>{c.occasion}</td>
                    <td>{c.dish}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      <Section id="influencer" title={influencer.title} subtitle={influencer.approach}>
        <ol className="list-decimal space-y-1 pl-5 text-sm">
          {influencer.process.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ol>
        <p className="mt-3 text-sm text-[var(--danger)]">Avoid: {influencer.avoid}</p>
      </Section>

      <Section id="paid" title={paidPlan.title} subtitle={paidPlan.subtitle}>
        <div className="card mb-4 text-[13px] leading-relaxed text-[var(--cream)]">{paidPlan.principle}</div>
        <ul className="mb-5 list-disc space-y-1 pl-5 text-[13px]">
          {paidPlan.rules.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>

        <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-[var(--gold)]">Funnel objectives</h3>
        <div className="table-wrap mb-5">
          <table className="data">
            <thead>
              <tr>
                <th>Stage</th>
                <th>Objective</th>
                <th>KPI</th>
              </tr>
            </thead>
            <tbody>
              {paidPlan.objectives.map((o) => (
                <tr key={o.stage}>
                  <td>{o.stage}</td>
                  <td>{o.meta}</td>
                  <td>{o.kpi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mb-5 grid gap-3 md:grid-cols-2">
          <div className="card">
            <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-[var(--gold)]">Geo</h3>
            <ul className="space-y-2 text-[13px]">
              {paidPlan.geo.map((g) => (
                <li key={g.zone}>
                  <strong className="text-[var(--gold-light)]">{g.zone}:</strong> {g.detail}
                </li>
              ))}
            </ul>
          </div>
          <div className="card">
            <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-[var(--gold)]">Budget bands (CAD plan)</h3>
            <ul className="space-y-2 text-[13px]">
              {paidPlan.budgetBands.map((b) => (
                <li key={b.phase}>
                  <strong className="text-[var(--gold-light)]">{b.phase}</strong> · {b.cad}
                  <div className="text-[12px] text-[var(--muted)]">{b.focus}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mb-5 grid gap-3 md:grid-cols-2">
          {paidPlan.channels.map((c) => (
            <div key={c.ch} className="card">
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <h3 className="font-semibold text-[var(--gold-light)]">{c.ch}</h3>
                <span className="badge">{c.role}</span>
              </div>
              <p className="text-[13px] text-[var(--muted)]">{c.detail}</p>
            </div>
          ))}
        </div>

        <div className="mb-5 grid gap-3 md:grid-cols-2">
          <div className="card">
            <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-[var(--gold)]">Creative brief</h3>
            <ul className="list-disc space-y-1 pl-4 text-[13px]">
              {paidPlan.creativeBrief.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
          <div className="card">
            <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-[var(--gold)]">Offers</h3>
            <ul className="space-y-2 text-[13px]">
              {paidPlan.offers.map((o) => (
                <li key={o.name}>
                  <strong className="text-[var(--gold-light)]">{o.name}:</strong> {o.detail}
                </li>
              ))}
            </ul>
            <div className="mt-3 flex flex-wrap gap-2">
              {paidPlan.weeklyThemes.map((t) => (
                <span key={t} className="badge">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-[var(--gold)]">Growth stages A→D</h3>
        <div className="mb-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {paidPlan.growthStages.map((s) => (
            <div key={s.id} className="stat-tile">
              <div className="stat-label">
                Stage {s.id} · {s.name}
              </div>
              <p className="mt-2 text-[12px] text-[var(--muted)]">{s.from}</p>
              <p className="mt-1 text-[13px]">{s.actions}</p>
            </div>
          ))}
        </div>

        <div className="card">
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-[var(--gold)]">Paid KPIs</h3>
          <ul className="list-disc space-y-1 pl-4 text-[13px]">
            {paidPlan.kpis.map((k) => (
              <li key={k}>{k}</li>
            ))}
          </ul>
        </div>
      </Section>

      <Section id="budget" title={budget.title} subtitle={budget.note}>
        <div className="table-wrap mb-4">
          <table className="data">
            <thead>
              <tr>
                <th>Line</th>
                <th>%</th>
              </tr>
            </thead>
            <tbody>
              {budget.lines.map((l) => (
                <tr key={l.line}>
                  <td>{l.line}</td>
                  <td>{l.pct}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card">
          <h3 className="mb-2 text-sm font-bold text-[var(--gold)]">Team</h3>
          <ul className="list-disc pl-5 text-sm">
            {budget.team.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </Section>

      <Section id="timeline" title={timeline.title} subtitle={timeline.caveat}>
        <div className="grid gap-3 md:grid-cols-2">
          {timeline.months.map((m) => (
            <div key={m.m} className="card">
              <div className="badge mb-2">{m.m}</div>
              <h3 className="font-semibold text-[var(--gold-light)]">{m.theme}</h3>
              <p className="mt-1 text-sm text-[var(--muted)]">{m.goals}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="kpis" title={kpis.title} subtitle={kpis.baseline}>
        <div className="table-wrap mb-4">
          <table className="data">
            <thead>
              <tr>
                <th>Channel</th>
                <th>Metrics</th>
              </tr>
            </thead>
            <tbody>
              {kpis.weekly.map((k) => (
                <tr key={k.kpi}>
                  <td>{k.kpi}</td>
                  <td>{k.metrics}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mb-4 grid gap-3 md:grid-cols-3">
          {kpis.growthTargets.map((t) => (
            <div key={t.horizon} className="stat-tile">
              <div className="stat-label">{t.horizon}</div>
              <div className="stat-value text-[1.25rem]">{t.followers}</div>
              <div className="stat-sub">{t.notes}</div>
            </div>
          ))}
        </div>
        <div className="card text-sm">
          <h3 className="mb-2 font-bold text-[var(--gold)]">Legacy deck targets (historical)</h3>
          <div className="flex flex-wrap gap-3">
            {kpis.planTargetsLegacy.map((t) => (
              <span key={t.month} className="badge">
                {t.month}: IG {t.ig} · GMB {t.gmb}
              </span>
            ))}
          </div>
          <p className="mt-2 text-[var(--muted)]">{kpis.starNote}</p>
        </div>
      </Section>

      <Section id="growth" title={growth.title} subtitle={growth.summary}>
        <div className="mb-4 grid gap-2 md:grid-cols-2">
          {growth.levers.map((l) => (
            <div key={l} className="card text-sm">
              {l}
            </div>
          ))}
        </div>
        <div className="card">
          <h3 className="mb-2 text-sm font-bold text-[var(--gold)]">Pending approvals</h3>
          <ul className="list-disc pl-5 text-sm">
            {growth.pendingApprovals.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </Section>

      <Section id="tasks" title="Team Tasks (Kanban)" subtitle="Drag across columns · soft-delete → Recycle Bin">
        <KanbanBoard onProgress={onTaskProgress} onSoftDelete={bumpRecycle} />
      </Section>

      <Section id="calendar" title="Content Calendar" subtitle="Mon/Wed/Fri/Sun rhythm by week">
        <ContentCalendar onSoftDelete={bumpRecycle} />
      </Section>

      <Section id="recycle" title="Recycle Bin" subtitle="Restore soft-deleted tasks, keywords, calendar slots">
        <RecycleBin refreshKey={recycleKey} />
      </Section>

      <Section id="findings" title={findings.title}>
        <div className="space-y-2">
          {findings.flags.map((f) => (
            <div
              key={f.text}
              className={`card border-l-4 text-sm ${
                f.level === "red"
                  ? "border-l-[var(--danger)]"
                  : f.level === "amber"
                    ? "border-l-[var(--warn)]"
                    : "border-l-[var(--success)]"
              }`}
            >
              <span className="badge mb-1">{f.level}</span>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="checklist" title="Progress Checklist" subtitle="Persists in localStorage">
        <ChecklistPanel onProgress={onCheckProgress} />
      </Section>

      <Section id="next" title="Next Actions">
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>Owner</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {nextActions.map((n) => (
                <tr key={n.action}>
                  <td>{n.owner}</td>
                  <td>{n.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </PortalShell>
  );
}
