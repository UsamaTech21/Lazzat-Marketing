"use client";

import { Section } from "@/components/PortalShell";
import { ChecklistPanel } from "@/components/ChecklistPanel";
import { KanbanBoard } from "@/components/KanbanBoard";
import { KeywordTable } from "@/components/KeywordTable";
import { ContentCalendar } from "@/components/ContentCalendar";
import { CostingCalculator } from "@/components/CostingCalculator";
import { RecycleBin } from "@/components/RecycleBin";
import { brand } from "@/data/brand";
import { audience, competitors, swot } from "@/data/strategyCore";
import { positioning, pricing, funnel } from "@/data/growthCore";
import { organic, influencer, timeline, kpis, growth } from "@/data/channels";
import { findings, culturalCalendar } from "@/data/execution";
import {
  brandVoice,
  localSeo,
  reputation,
  channelStrategy,
  culturalCampaigns,
  teamRoles,
  compliance,
} from "@/data/strategyExtras";

type Handlers = {
  onCheckProgress: (pct: number) => void;
  onTaskProgress: (pct: number) => void;
  recycleKey: number;
  bumpRecycle: () => void;
};

export function FullStrategyBeforePaid({ bumpRecycle }: Pick<Handlers, "bumpRecycle">) {
  return (
    <>
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

      <Section id="brand-voice" title={brandVoice.title} subtitle={brandVoice.subtitle}>
        <div className="card mb-4 text-[15px] leading-relaxed">{brandVoice.story}</div>
        <div className="mb-4 grid gap-3 md:grid-cols-2">
          <div className="card">
            <h3 className="mb-2 text-sm font-bold text-[var(--gold)]">Tone of voice</h3>
            <ul className="list-disc space-y-1 pl-5 text-sm">
              {brandVoice.tone.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          <div className="card">
            <h3 className="mb-2 text-sm font-bold text-[var(--gold)]">Taglines</h3>
            <p className="text-sm">
              <strong>Primary:</strong> {brandVoice.taglines.primary}
            </p>
            <p className="mt-1 text-sm">
              <strong>Secondary:</strong> {brandVoice.taglines.secondary}
            </p>
            <p className="mt-1 text-sm">
              <strong>Web:</strong> {brandVoice.taglines.webHero}
            </p>
          </div>
        </div>
        <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-[var(--gold)]">
          Visual identity
        </h3>
        <div className="mb-4 flex flex-wrap gap-2">
          {brandVoice.visual.palette.map((c) => (
            <span key={c.name} className="badge">
              {c.name} {c.hex}
            </span>
          ))}
        </div>
        <ul className="mb-5 list-disc space-y-1 pl-5 text-sm text-[var(--muted)]">
          {brandVoice.visual.rules.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
        <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-[var(--gold)]">
          Brand-value pillars
        </h3>
        <div className="mb-4 grid gap-2 md:grid-cols-3">
          {brandVoice.brandValuePillars.map((p, i) => (
            <div key={p} className="card text-sm">
              <span className="text-[var(--gold)]">{i + 1}.</span> {p}
            </div>
          ))}
        </div>
        <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-[var(--gold)]">
          Content pillars
        </h3>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {brandVoice.contentPillars.map((p) => (
            <div key={p.name} className="card">
              <h4 className="font-semibold text-[var(--gold-light)]">{p.name}</h4>
              <p className="mt-1 text-[13px] text-[var(--muted)]">{p.focus}</p>
            </div>
          ))}
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

      <Section id="local-seo" title={localSeo.title} subtitle={localSeo.subtitle}>
        <p className="mb-4 text-[13px] text-[var(--muted)]">{localSeo.liveNote}</p>
        <div className="mb-4 grid gap-3 md:grid-cols-2">
          <div className="card">
            <h3 className="mb-2 text-sm font-bold text-[var(--gold)]">GBP optimization</h3>
            <ul className="list-disc space-y-1 pl-5 text-sm">
              {localSeo.gbpOptimization.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
          <div className="card">
            <h3 className="mb-2 text-sm font-bold text-[var(--gold)]">Review generation system</h3>
            <ol className="list-decimal space-y-1 pl-5 text-sm">
              {localSeo.reviewSystem.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ol>
          </div>
        </div>
        <div className="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {localSeo.reviewGoalsPlan.map((g) => (
            <div key={g.horizon} className="stat-tile">
              <div className="stat-label">{g.horizon}</div>
              <div className="stat-value text-[1.25rem]">{g.target}</div>
              <div className="stat-sub">{g.note}</div>
            </div>
          ))}
        </div>
        <div className="card text-sm">
          <strong>Owners:</strong> {localSeo.owners.dayToDay} · backup {localSeo.owners.backup} ·{" "}
          {localSeo.owners.escalate}
        </div>
      </Section>

      <Section id="reputation" title={reputation.title} subtitle={reputation.subtitle}>
        <div className="mb-4 grid gap-3 md:grid-cols-2">
          <div className="card">
            <h3 className="mb-2 text-sm font-bold text-[var(--gold)]">Response protocol</h3>
            <ul className="list-disc space-y-1 pl-5 text-sm">
              {reputation.responseProtocol.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
          <div className="card">
            <h3 className="mb-2 text-sm font-bold text-[var(--gold)]">Negative review handling</h3>
            <ol className="list-decimal space-y-1 pl-5 text-sm">
              {reputation.negativeHandling.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ol>
          </div>
        </div>
        <div className="card">
          <h3 className="mb-2 text-sm font-bold text-[var(--gold)]">Velocity tracking</h3>
          <ul className="list-disc space-y-1 pl-5 text-sm">
            {reputation.velocityTracking.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
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
            <h3 className="mb-2 text-sm font-bold text-[var(--gold)]">GMB (summary)</h3>
            <ul className="list-disc pl-5 text-sm">
              {organic.gmb.map((v) => (
                <li key={v}>{v}</li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-[var(--muted)]">{organic.blogs}</p>
            <p className="mt-2 text-[12px] text-[var(--muted)]">
              Full GBP + review system → Local SEO / GMB section.
            </p>
          </div>
        </div>

        <h3 className="mb-2 mt-5 text-xs font-bold uppercase tracking-wider text-[var(--gold)]">
          {channelStrategy.title}
        </h3>
        <p className="mb-3 text-[13px] text-[var(--muted)]">{channelStrategy.subtitle}</p>
        <div className="mb-4 grid gap-3 md:grid-cols-3">
          {channelStrategy.platforms.map((p) => (
            <div key={p.name} className="card">
              <div className="badge mb-2">{p.name}</div>
              <p className="text-sm font-medium">{p.role}</p>
              <p className="mt-2 text-[13px] text-[var(--muted)]">
                <strong>Formats:</strong> {p.formats}
              </p>
              <p className="mt-1 text-[13px] text-[var(--muted)]">
                <strong>Cadence:</strong> {p.cadence}
              </p>
              <p className="mt-2 text-[12px] text-[var(--muted)]">{p.notes}</p>
            </div>
          ))}
        </div>
        <ul className="mb-4 list-disc space-y-1 pl-5 text-sm">
          {channelStrategy.sharedRules.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>

        <div className="card mt-4">
          <h3 className="mb-2 text-sm font-bold text-[var(--gold)]">Cultural calendar hooks</h3>
          <p className="mb-2 text-[12px] text-[var(--muted)]">
            Full event-anchor campaigns → Cultural / Seasonal Calendar section.
          </p>
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
    </>
  );
}

export function FullStrategyAfterBudget({
  onCheckProgress,
  onTaskProgress,
  recycleKey,
  bumpRecycle,
}: Handlers) {
  return (
    <>
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

      <Section id="cultural" title={culturalCampaigns.title} subtitle={culturalCampaigns.subtitle}>
        <div className="card mb-4 text-sm">{culturalCampaigns.rule}</div>
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>Window</th>
                <th>Occasion</th>
                <th>Event anchor</th>
                <th>Campaign angle</th>
                <th>Hero dish</th>
              </tr>
            </thead>
            <tbody>
              {culturalCalendar.map((c) => (
                <tr key={c.occasion}>
                  <td>{c.month}</td>
                  <td>{c.occasion}</td>
                  <td>{c.anchor}</td>
                  <td>{c.campaign}</td>
                  <td>{c.dish}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="team" title={teamRoles.title} subtitle={teamRoles.subtitle}>
        <div className="mb-4 grid gap-3 md:grid-cols-2">
          {teamRoles.roster.map((r) => (
            <div key={r.name} className="card text-sm">
              <strong className="text-[var(--gold-light)]">{r.name}</strong>
              <p className="mt-1 text-[var(--muted)]">{r.role}</p>
            </div>
          ))}
        </div>
        <div className="card">
          <h3 className="mb-2 text-sm font-bold text-[var(--gold)]">Approval chain</h3>
          <ol className="list-decimal space-y-1 pl-5 text-sm">
            {teamRoles.approvalChain.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
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

      <Section id="compliance" title={compliance.title} subtitle={compliance.subtitle}>
        <div className="mb-4 grid gap-3 md:grid-cols-2">
          <div className="card">
            <h3 className="mb-2 text-sm font-bold text-[var(--gold)]">Do&apos;s</h3>
            <ul className="list-disc space-y-1 pl-5 text-sm">
              {compliance.dos.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
          <div className="card">
            <h3 className="mb-2 text-sm font-bold text-[var(--gold)]">Don&apos;ts</h3>
            <ul className="list-disc space-y-1 pl-5 text-sm">
              {compliance.donts.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="card mb-4 text-sm">
          <strong className="text-[var(--gold-light)]">Competitor policy:</strong>{" "}
          {compliance.competitorPolicy}
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="card">
            <h3 className="mb-2 text-sm font-bold text-[var(--gold)]">Approved claims</h3>
            <ul className="list-disc space-y-1 pl-5 text-sm">
              {compliance.approvedClaims.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
          <div className="card">
            <h3 className="mb-2 text-sm font-bold text-[var(--gold)]">Unverified until ops</h3>
            <ul className="list-disc space-y-1 pl-5 text-sm">
              {compliance.unverifiedUntilOps.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        </div>
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
    </>
  );
}
