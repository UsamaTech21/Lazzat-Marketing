"use client";

import { Section } from "@/components/PortalShell";
import { brand } from "@/data/brand";
import { audience, competitors, swot } from "@/data/strategyCore";
import { positioning, funnel } from "@/data/growthCore";
import { organic, influencer, timeline, kpis, growth } from "@/data/channels";
import {
  culturalCampaignMeta,
  culturalEvents,
  culturalMonthKey,
  formatCulturalDate,
} from "@/data/culturalCalendar";
import {
  brandVoice,
  localSeo,
  reputation,
  channelStrategy,
  culturalCampaigns,
} from "@/data/strategyExtras";

export function FullStrategyBeforePaid() {
  return (
    <>
      <Section id="audience" title={audience.title} subtitle={audience.subtitle}>
        <div className="card mb-5 border-blue-100 bg-blue-50/40 text-[14px] leading-relaxed text-slate-800">
          <p className="text-[11px] font-bold uppercase tracking-wider text-blue-800">Positioning</p>
          <p className="mt-1.5">{audience.positioning}</p>
        </div>

        <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-[var(--gold)]">
          1 · Brampton snapshot
        </h3>
        <div className="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="card py-3">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Population</div>
            <div className="mt-1 text-[15px] font-semibold text-[var(--gold-light)]">{audience.bramptonSnap.pop}</div>
            <p className="mt-1 text-[12px] text-slate-500">{audience.bramptonSnap.growth}</p>
          </div>
          <div className="card py-3">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Median age</div>
            <div className="mt-1 text-[15px] font-semibold text-[var(--gold-light)]">{audience.bramptonSnap.medianAge}</div>
          </div>
          <div className="card py-3">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Median HH income</div>
            <div className="mt-1 text-[15px] font-semibold text-[var(--gold-light)]">
              {audience.bramptonSnap.medianIncome}
            </div>
          </div>
          <div className="card py-3">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Household size</div>
            <div className="mt-1 text-[15px] font-semibold text-[var(--gold-light)]">
              {audience.bramptonSnap.household}
            </div>
          </div>
        </div>
        <div className="mb-4 grid gap-3 sm:grid-cols-2">
          <div className="card py-3 text-sm">
            <strong className="text-slate-800">Foreign-born:</strong> {audience.bramptonSnap.foreignBorn}
            <span className="mx-2 text-slate-300">·</span>
            <strong className="text-slate-800">Visible minority:</strong> {audience.bramptonSnap.visibleMinority}
          </div>
          <div className="card border-amber-100 bg-amber-50/50 py-3 text-[13.5px] leading-relaxed text-amber-950">
            {audience.bramptonSnap.insight}
          </div>
        </div>

        <div className="mb-6 grid gap-3 lg:grid-cols-3">
          <div className="card">
            <h4 className="mb-2 text-[11px] font-bold uppercase tracking-wider text-[var(--gold)]">Ethnicity</h4>
            <ul className="space-y-2 text-[13px]">
              {audience.ethnicity.map((e) => (
                <li key={e.group}>
                  <strong className="text-slate-900">{e.group}</strong>
                  <span className="text-slate-500"> · {e.share}</span>
                  <p className="text-[12px] text-slate-500">{e.note}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="card">
            <h4 className="mb-2 text-[11px] font-bold uppercase tracking-wider text-[var(--gold)]">Religion</h4>
            <ul className="space-y-1.5 text-[13px]">
              {audience.religion.map((r) => (
                <li key={r.name}>
                  <strong className="text-slate-900">{r.name}</strong>
                  <span className="text-slate-500"> · {r.share}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card">
            <h4 className="mb-2 text-[11px] font-bold uppercase tracking-wider text-[var(--gold)]">Languages</h4>
            <ul className="space-y-2 text-[13px]">
              {audience.languages.map((l) => (
                <li key={l.name}>
                  <strong className="text-slate-900">{l.name}</strong>
                  <p className="text-[12px] text-slate-500">{l.share}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-[var(--gold)]">
          2 · Targeting rules (locked)
        </h3>
        <ul className="mb-6 list-disc space-y-1.5 rounded-xl border border-slate-200 bg-white px-5 py-4 pl-8 text-[13.5px] leading-relaxed text-slate-700">
          {audience.rules.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>

        <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-[var(--gold)]">
          3 · Buyer personas / ICPs
        </h3>
        <div className="mb-6 grid gap-3 md:grid-cols-2">
          {audience.personas.map((p) => (
            <article key={p.id} className="card">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="badge">{p.priority}</span>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-slate-900">
                  {p.name}
                </h3>
              </div>
              <p className="text-[12px] text-slate-500">{p.where}</p>
              <p className="mt-2 text-[13px] text-slate-600">{p.profile}</p>
              <dl className="mt-3 space-y-2 text-[13.5px] leading-relaxed">
                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Pain</dt>
                  <dd className="text-slate-800">{p.pain}</dd>
                </div>
                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-wider text-slate-500">We deliver</dt>
                  <dd className="text-slate-800">{p.deliver}</dd>
                </div>
                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Content</dt>
                  <dd className="text-slate-700">{p.content}</dd>
                </div>
                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Channels</dt>
                  <dd className="text-slate-700">{p.channels}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>

        <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-[var(--gold)]">
          4 · Neighbourhood catchments
        </h3>
        <div className="mb-6 grid gap-3 sm:grid-cols-2">
          {audience.neighbourhoods.map((n) => (
            <div key={n.name} className="card py-3">
              <h4 className="font-semibold text-slate-900">{n.name}</h4>
              <p className="text-[12px] text-blue-800">{n.near}</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">{n.note}</p>
            </div>
          ))}
        </div>

        <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-[var(--gold)]">
          5 · Buying psychology
        </h3>
        <ul className="list-disc space-y-1.5 rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 pl-8 text-[13.5px] leading-relaxed text-slate-700">
          {audience.psychology.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
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

      <Section id="swot" title={swot.title} subtitle={swot.subtitle}>
        <p className="mb-5 text-[13.5px] leading-relaxed text-slate-600">{swot.note}</p>
        <div className="mb-5 grid gap-3 md:grid-cols-2">
          {(
            [
              {
                label: "Strengths",
                hint: "Internal · protect & amplify",
                items: swot.strengths,
                tone: "border-emerald-200 bg-emerald-50/40",
                head: "text-emerald-900",
              },
              {
                label: "Weaknesses",
                hint: "Internal · fix this quarter",
                items: swot.weaknesses,
                tone: "border-amber-200 bg-amber-50/40",
                head: "text-amber-950",
              },
              {
                label: "Opportunities",
                hint: "External · prioritize plays",
                items: swot.opportunities,
                tone: "border-blue-200 bg-blue-50/40",
                head: "text-blue-900",
              },
              {
                label: "Threats",
                hint: "External · watch & mitigate",
                items: swot.threats,
                tone: "border-rose-200 bg-rose-50/40",
                head: "text-rose-950",
              },
            ] as const
          ).map((col) => (
            <div key={col.label} className={`rounded-xl border p-4 sm:p-5 ${col.tone}`}>
              <div className="mb-3 border-b border-black/5 pb-2">
                <h3 className={`text-sm font-bold uppercase tracking-wider ${col.head}`}>{col.label}</h3>
                <p className="text-[11px] text-slate-500">{col.hint}</p>
              </div>
              <ul className="space-y-3">
                {col.items.map((item) => (
                  <li key={item.point} className="text-[13.5px] leading-relaxed">
                    <strong className="text-slate-900">{item.point}</strong>
                    <p className="mt-0.5 text-slate-600">{item.detail}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="card border-slate-300 bg-slate-50">
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-[var(--gold)]">
            What this means for Lazzat now
          </h3>
          <ul className="list-disc space-y-1.5 pl-5 text-[13.5px] leading-relaxed text-slate-700">
            {swot.implications.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
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
            Full dated calendar with Lazzat angles → Cultural / Seasonal Calendar section.
          </p>
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Occasion</th>
                  <th>Hero dish</th>
                </tr>
              </thead>
              <tbody>
                {culturalEvents
                  .filter((e) => e.type === "cultural" || e.type === "statutory")
                  .slice(0, 10)
                  .map((c) => (
                    <tr key={c.id}>
                      <td>{formatCulturalDate(c.date)}</td>
                      <td>{c.title}</td>
                      <td>{c.heroDish}</td>
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

export function FullStrategyAfterBudget() {
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
        <div className="card mb-4 text-[14px] leading-relaxed">{culturalCampaigns.rule}</div>
        <p className="mb-5 text-[12px] text-slate-500">{culturalCampaignMeta.sourcesNote}</p>

        <div className="space-y-8">
          {Object.entries(
            culturalEvents.reduce<Record<string, typeof culturalEvents>>((acc, ev) => {
              const key = culturalMonthKey(ev.date);
              (acc[key] ??= []).push(ev);
              return acc;
            }, {})
          )
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([monthKey, events]) => {
            const label = new Date(`${monthKey}-01T12:00:00`).toLocaleDateString("en-CA", {
              month: "long",
              year: "numeric",
            });
            const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date));
            return (
              <div key={monthKey} id={`cultural-${monthKey}`} className="scroll-mt-24">
                <div className="mb-3 flex items-end justify-between border-b-2 border-slate-900 pb-2">
                  <h3 className="text-[1.1rem] font-semibold text-slate-900">{label}</h3>
                  <span className="text-[12px] text-slate-400">{sorted.length} occasions</span>
                </div>
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                  {sorted.map((ev) => (
                    <article
                      key={ev.id}
                      className="grid gap-3 border-b border-slate-100 p-4 last:border-b-0 sm:grid-cols-[7.5rem_1fr]"
                    >
                      <div className="rounded-lg bg-slate-50 px-3 py-2 text-center sm:text-left">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                          {formatCulturalDate(ev.date).split(",")[0]}
                        </div>
                        <div className="text-[15px] font-semibold text-slate-900">
                          {ev.date.slice(8, 10)} {formatCulturalDate(ev.date).split(" ")[1]}
                        </div>
                        {ev.endDate && (
                          <div className="mt-1 text-[11px] text-slate-500">→ {formatCulturalDate(ev.endDate)}</div>
                        )}
                        <span className="badge mt-2">{ev.type}</span>
                      </div>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-[15px] font-semibold text-slate-900">{ev.title}</h4>
                          <span className="text-[11px] text-slate-400">{ev.region}</span>
                        </div>
                        <p className="mt-1 text-[12px] text-slate-500">{ev.accuracy}</p>
                        <p className="mt-2 text-[13px]">
                          <strong className="text-slate-700">Hero dish:</strong>{" "}
                          <span className="text-slate-800">{ev.heroDish}</span>
                        </p>
                        <p className="mt-2 text-[13.5px] leading-relaxed text-slate-800">
                          <strong className="text-blue-800">Lazzat angle:</strong> {ev.lazzatAngle}
                        </p>
                        <p className="mt-1.5 text-[12px] text-slate-500">
                          <strong>Formats:</strong> {ev.formats}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Section>
    </>
  );
}
