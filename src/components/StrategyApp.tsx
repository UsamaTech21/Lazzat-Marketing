"use client";

import { useCallback, useEffect, useState } from "react";
import { PortalShell, Section, StatTile } from "@/components/PortalShell";
import {
  FullStrategyAfterBudget,
  FullStrategyBeforePaid,
} from "@/components/FullStrategyExtras";
import { BarChartCard } from "@/components/charts/BarChartCard";
import { DonutChartCard } from "@/components/charts/DonutChartCard";
import { ImageLightbox } from "@/components/ImageLightbox";
import { currentSituation } from "@/data/currentSituation";
import { paidPlan } from "@/data/paidPlan";
import { goals } from "@/data/strategyCore";
import { budget } from "@/data/channels";
import { nextActions } from "@/data/execution";
import { FULL_NAV, SHORT_NAV } from "@/data/nav";
import { STORAGE_KEYS, clearKeys, loadJson, saveJson } from "@/lib/storage";

export function StrategyApp() {
  const [fullStrategy, setFullStrategy] = useState(false);
  const [checkPct, setCheckPct] = useState(0);
  const [taskPct, setTaskPct] = useState(0);
  const [recycleKey, setRecycleKey] = useState(0);
  const [preview, setPreview] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    setFullStrategy(loadJson(STORAGE_KEYS.fullStrategy, false));
  }, []);

  const toggleFull = () => {
    setFullStrategy((prev) => {
      const next = !prev;
      saveJson(STORAGE_KEYS.fullStrategy, next);
      return next;
    });
  };

  const bumpRecycle = useCallback(() => setRecycleKey((k) => k + 1), []);
  const onCheckProgress = useCallback((pct: number) => setCheckPct(pct), []);
  const onTaskProgress = useCallback((pct: number) => setTaskPct(pct), []);

  const resetAll = () => {
    clearKeys(Object.values(STORAGE_KEYS).filter((k) => k !== STORAGE_KEYS.fullStrategy));
    window.location.reload();
  };

  return (
    <PortalShell
      nav={fullStrategy ? FULL_NAV : SHORT_NAV}
      fullStrategy={fullStrategy}
      onToggleFullStrategy={toggleFull}
      checklistProgress={checkPct}
      taskProgress={taskPct}
      onResetAll={fullStrategy ? resetAll : undefined}
    >
      <Section id="current" title={currentSituation.title} subtitle={currentSituation.subtitle}>
        <p className="mb-4 text-[13px] text-[var(--muted)]">{currentSituation.sourceNote}</p>

        <div className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <StatTile
            label="Social views"
            value={currentSituation.headline.totalViews}
            sub={currentSituation.headline.totalViewsNote}
          />
          <StatTile
            label="Instagram"
            value={currentSituation.headline.topChannelViews}
            sub="Top social channel YTD"
          />
          <StatTile label="GSC clicks" value={currentSituation.headline.gscClicks} sub={currentSituation.headline.gscClicksNote} />
          <StatTile
            label="GMB interactions"
            value={currentSituation.headline.gmbInteractions}
            sub={currentSituation.headline.gmbInteractionsNote}
          />
          <StatTile
            label="Content uploaded"
            value={currentSituation.headline.contentTotal}
            sub={currentSituation.headline.contentTotalNote}
          />
          <StatTile label="Weekly cadence" value="4+3" sub={currentSituation.headline.cadence} />
        </div>

        <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-[var(--gold)]">
          Active platforms
        </h3>
        <div className="mb-8 flex flex-wrap gap-2">
          {currentSituation.activePlatforms.map((p) => (
            <span key={p} className="badge">
              {p}
            </span>
          ))}
        </div>

        {/* —— Social —— */}
        <h3 className="mb-3 border-b border-[var(--border)] pb-2 text-sm font-bold uppercase tracking-wider text-[var(--gold)]">
          1 · Social performance (YTD)
        </h3>
        <div className="mb-5 grid gap-4 lg:grid-cols-2">
          <BarChartCard
            title="Views by platform (YTD)"
            layout="vertical"
            height={280}
            data={currentSituation.viewsByPlatform.map((r) => ({
              name: r.platform,
              value: r.value,
            }))}
          />
          <DonutChartCard
            title="Facebook views by format"
            height={280}
            data={currentSituation.facebook.viewsByFormat.map((t) => ({
              name: t.type,
              value: t.value,
            }))}
          />
        </div>
        <div className="table-wrap mb-5">
          <table className="data">
            <thead>
              <tr>
                <th>Platform</th>
                <th>Views</th>
                <th>Reach / impressions</th>
                <th>Engagement</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {currentSituation.platforms.map((p) => (
                <tr key={p.name}>
                  <td>
                    {p.name}
                    {"estimate" in p && p.estimate ? (
                      <span className="ml-1 text-[11px] text-[var(--muted)]">(est.)</span>
                    ) : null}
                  </td>
                  <td>{p.views}</td>
                  <td>{p.reach}</td>
                  <td>{p.engagement}</td>
                  <td className="text-[13px] text-[var(--muted)]">{p.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mb-5 grid gap-3 md:grid-cols-2">
          <DonutChartCard
            title="TikTok traffic sources"
            height={240}
            data={currentSituation.tiktok.traffic.map((t) => ({
              name: t.source,
              value: t.pct,
            }))}
          />
          <div className="card">
            <h4 className="mb-2 text-sm font-bold text-[var(--gold)]">Instagram top Reels</h4>
            <div className="space-y-2">
              {currentSituation.instagram.topReels.map((r) => (
                <div key={r.title} className="flex items-baseline justify-between gap-2 border-b border-[var(--border)] pb-2 text-sm last:border-0">
                  <span className="min-w-0 truncate text-[var(--gold-light)]">{r.title}</span>
                  <span className="shrink-0 font-semibold">{r.views}</span>
                </div>
              ))}
            </div>
            <h4 className="mb-1 mt-4 text-xs font-bold uppercase tracking-wider text-[var(--gold)]">
              TikTok search queries
            </h4>
            <div className="flex flex-wrap gap-2">
              {currentSituation.tiktok.searchQueries.map((q) => (
                <span key={q} className="badge">
                  {q}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* —— Cadence + SEO ops (priority — section 2) —— */}
        <h3 className="mb-3 border-b border-[var(--border)] pb-2 text-sm font-bold uppercase tracking-wider text-[var(--gold)]">
          2 · Cadence & SEO ops
        </h3>
        <div className="mb-8 grid gap-3 md:grid-cols-2">
          <div className="card border-amber-200 bg-amber-50/50">
            <h4 className="mb-2 text-sm font-bold text-[var(--gold)]">{currentSituation.cadence.title}</h4>
            <p className="text-[14px]">{currentSituation.cadence.live}</p>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              <div className="stat-tile !p-3">
                <div className="stat-label">Total</div>
                <div className="stat-value text-[1.25rem]">{currentSituation.cadence.uploaded.total}</div>
              </div>
              <div className="stat-tile !p-3">
                <div className="stat-label">Videos</div>
                <div className="stat-value text-[1.25rem]">{currentSituation.cadence.uploaded.videos}</div>
              </div>
              <div className="stat-tile !p-3">
                <div className="stat-label">Influencer</div>
                <div className="stat-value text-[1.25rem]">{currentSituation.cadence.uploaded.influencerVideos}</div>
              </div>
              <div className="stat-tile !p-3">
                <div className="stat-label">Static</div>
                <div className="stat-value text-[1.25rem]">{currentSituation.cadence.uploaded.static}</div>
              </div>
            </div>
            <p className="mt-2 text-[13px] text-[var(--muted)]">{currentSituation.cadence.uploaded.note}</p>
            <p className="mt-2 text-[14px] font-medium text-amber-900">{currentSituation.cadence.gap}</p>
            <p className="mt-1 text-[13px] text-[var(--muted)]">{currentSituation.cadence.need}</p>
          </div>
          <div className="card">
            <h4 className="mb-2 text-sm font-bold text-[var(--gold)]">{currentSituation.seo.title}</h4>
            <p className="mb-2 text-[14px]">
              <strong>Blogs live:</strong> 23 (on-page total)
            </p>
            <p className="text-[14px]">
              <strong>On-page:</strong> {currentSituation.seo.onPage}
            </p>
            <p className="mt-2 text-[14px]">
              <strong>Off-page:</strong> {currentSituation.seo.offPage}
            </p>
          </div>
        </div>

        {/* —— Website / GSC —— */}
        <h3 className="mb-3 border-b border-[var(--border)] pb-2 text-sm font-bold uppercase tracking-wider text-[var(--gold)]">
          3 · {currentSituation.websiteGsc.title}
        </h3>
        <p className="mb-3 text-[13px] text-[var(--muted)]">{currentSituation.websiteGsc.period}</p>
        <div className="card mb-4 border-amber-200 bg-amber-50/60 text-[13px] text-amber-950">
          {currentSituation.websiteGsc.paidNote}
        </div>
        <div className="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatTile label="Total clicks" value={currentSituation.websiteGsc.clicks} sub="Includes Google Ads" />
          <StatTile label="Impressions" value={currentSituation.websiteGsc.impressions} sub="Organic + paid search" />
          <StatTile label="Avg CTR" value={currentSituation.websiteGsc.ctr} />
          <StatTile label="Avg position" value={currentSituation.websiteGsc.avgPosition} />
        </div>
        <div className="mb-4 grid gap-3 md:grid-cols-2">
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th>Top queries</th>
                  <th>Clicks</th>
                  <th>Position</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {currentSituation.websiteGsc.topQueries.map((q) => (
                  <tr key={q.query}>
                    <td>
                      {q.query}
                      {"note" in q && q.note ? (
                        <div className="text-[11px] text-[var(--muted)]">{q.note}</div>
                      ) : null}
                    </td>
                    <td>{q.clicks}</td>
                    <td>{q.position}</td>
                    <td>
                      <span className="badge">{q.kind}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="space-y-3">
            <div className="card">
              <h4 className="mb-2 text-sm font-bold text-[var(--gold)]">Top pages</h4>
              {currentSituation.websiteGsc.topPages.map((p) => (
                <div key={p.page} className="mb-2 border-b border-[var(--border)] pb-2 text-sm last:mb-0 last:border-0">
                  <strong>{p.page}</strong> · {p.clicks} clicks · {p.impressions} impr.
                  {"ctr" in p && p.ctr ? ` · CTR ${p.ctr}` : ""}
                  <div className="text-[12px] text-[var(--muted)]">{p.note}</div>
                </div>
              ))}
            </div>
            <div className="card text-sm">
              <h4 className="mb-2 font-bold text-[var(--gold)]">Devices & geography</h4>
              {currentSituation.websiteGsc.devices.map((d) => (
                <p key={d.device}>
                  <strong>{d.device}:</strong> {d.clicks} clicks · {d.impressions} impressions
                </p>
              ))}
              <p className="mt-2 text-[13px] text-[var(--muted)]">{currentSituation.websiteGsc.geography}</p>
              <a
                className="mt-3 inline-flex text-[13px] font-medium text-blue-700 underline"
                href={currentSituation.gscExportFile}
                download
              >
                Download GSC export (xlsx)
              </a>
            </div>
          </div>
        </div>

        {/* —— Domain SEO —— */}
        <h3 className="mb-3 border-b border-[var(--border)] pb-2 text-sm font-bold uppercase tracking-wider text-[var(--gold)]">
          4 · {currentSituation.domainSeo.title}
        </h3>
        <p className="mb-3 text-[13px] text-[var(--muted)]">{currentSituation.domainSeo.period}</p>
        <div className="mb-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatTile
            label="Organic keywords"
            value={currentSituation.domainSeo.organicKeywords}
            sub={currentSituation.domainSeo.keywordsDelta}
          />
          <StatTile
            label="Organic traffic"
            value={currentSituation.domainSeo.organicTraffic}
            sub={currentSituation.domainSeo.trafficDelta}
          />
          <StatTile label="Domain authority" value={currentSituation.domainSeo.domainAuthority} sub="Still low" />
          <StatTile
            label="Backlinks"
            value={currentSituation.domainSeo.backlinks}
            sub={`${currentSituation.domainSeo.nofollow} nofollow`}
          />
        </div>
        <div className="card mb-8 text-[14px]">{currentSituation.domainSeo.curveNote}</div>

        {/* —— GMB —— */}
        <h3 className="mb-3 border-b border-[var(--border)] pb-2 text-sm font-bold uppercase tracking-wider text-[var(--gold)]">
          5 · {currentSituation.gmb.title}
        </h3>
        <p className="mb-1 text-[13px] text-[var(--muted)]">{currentSituation.gmb.period}</p>
        <p className="mb-4 text-[12px] text-amber-800">{currentSituation.gmb.reviewsNote}</p>
        <div className="table-wrap mb-5">
          <table className="data">
            <thead>
              <tr>
                <th>Metric</th>
                <th>{currentSituation.gmb.mcvean.name}</th>
                <th>{currentSituation.gmb.clarence.name}</th>
              </tr>
            </thead>
            <tbody>
              {(
                [
                  ["Total interactions", "interactions"],
                  ["Menu views", "menuViews"],
                  ["Calls", "calls"],
                  ["Direction requests", "directions"],
                  ["Website clicks", "websiteClicks"],
                ] as const
              ).map(([label, key]) => (
                <tr key={key}>
                  <td>{label}</td>
                  <td className="font-semibold">{currentSituation.gmb.mcvean[key].toLocaleString()}</td>
                  <td className="font-semibold">{currentSituation.gmb.clarence[key].toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mb-4 grid gap-4 lg:grid-cols-3">
          <BarChartCard
            title="GMB interactions"
            height={200}
            data={currentSituation.gmb.chartInteractions}
          />
          <BarChartCard
            title="Direction requests"
            height={200}
            color="#0ea5e9"
            data={currentSituation.gmb.chartDirections}
          />
          <BarChartCard
            title="Calls"
            height={200}
            color="#334155"
            data={currentSituation.gmb.chartCalls}
          />
        </div>
        <ul className="mb-8 list-disc space-y-1.5 pl-5 text-[14px]">
          {currentSituation.gmb.reading.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>

        {/* —— Snapshot —— */}
        <h3 className="mb-3 border-b border-[var(--border)] pb-2 text-sm font-bold uppercase tracking-wider text-[var(--gold)]">
          6 · Full snapshot summary
        </h3>
        <ul className="mb-4 list-disc space-y-2 pl-5 text-[14px]">
          {currentSituation.snapshotSummary.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <div className="card mb-8">
          <h4 className="mb-2 text-sm font-bold text-[var(--gold)]">Signals worth flagging</h4>
          <ul className="list-disc space-y-1.5 pl-5 text-[14px]">
            {currentSituation.signals.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        {/* —— Evidence —— */}
        <h3 className="mb-2 border-b border-[var(--border)] pb-2 text-sm font-bold uppercase tracking-wider text-[var(--gold)]">
          7 · Source screenshots
        </h3>
        <p className="mb-4 text-[13px] text-[var(--muted)]">
          Click any screenshot for full-screen preview — Esc or Close to dismiss. Mobile and desktop.
        </p>
        {currentSituation.evidenceGroups.map((group) => (
          <div key={group.id} className="mb-6">
            <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">{group.title}</h4>
            <div className="grid gap-4 sm:grid-cols-2">
              {group.items.map((e) => (
                <button
                  key={e.src}
                  type="button"
                  onClick={() => setPreview({ src: e.src, alt: e.label })}
                  className="card block w-full overflow-hidden p-0 text-left transition hover:border-blue-300"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={e.src}
                    alt={e.label}
                    className="h-auto max-h-[280px] w-full object-cover object-top sm:max-h-[320px]"
                    loading="lazy"
                  />
                  <div className="border-t border-[var(--border)] px-3 py-2.5">
                    <span className="badge mb-1">{e.platform}</span>
                    <p className="text-[13px] font-medium text-slate-700">{e.label}</p>
                    <p className="mt-1 text-[11px] text-blue-700">Click to preview →</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </Section>

      {preview && (
        <ImageLightbox src={preview.src} alt={preview.alt} onClose={() => setPreview(null)} />
      )}

      <Section id="goals" title={goals.title} subtitle={goals.oneLiner}>
        <div className="mb-5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5">
          <p className="text-[12px] font-bold uppercase tracking-wider text-slate-600">Kaise padhein</p>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-[13.5px] leading-relaxed text-slate-700">
            <li>
              Pillars <strong>A → E</strong>: Social → SEO → GMB → Paid goals → Expansion.
            </li>
            <li>
              Har goal: <strong>Now</strong> → <strong>Realistic</strong> → <strong>Stretch</strong> →{" "}
              <strong>Measure</strong>.
            </li>
            <li>
              $200 Meta flight → <a href="#paid" className="font-semibold text-blue-700 underline">Paid Marketing Plan</a>.
            </li>
          </ol>
          <p className="mt-2 text-[12px] text-slate-500">{goals.note}</p>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {goals.pillars.map((p) => (
            <a
              key={p.id}
              href={`#goals-${p.id}`}
              className="badge border-slate-200 bg-white text-slate-700 no-underline hover:bg-slate-50"
            >
              {p.letter}. {p.title.split(" / ")[0]}
            </a>
          ))}
        </div>

        <div className="space-y-10">
          {goals.pillars.map((pillar, pIdx) => (
            <div key={pillar.id} id={`goals-${pillar.id}`} className="scroll-mt-24">
              <div className="mb-4 flex items-end gap-3 border-b-2 border-slate-900 pb-3">
                <span className="font-[family-name:var(--font-display)] text-3xl font-bold leading-none text-slate-900 sm:text-4xl">
                  {pillar.letter}
                </span>
                <div className="min-w-0 flex-1 pb-0.5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                    {pIdx + 1} / {goals.pillars.length}
                  </p>
                  <h3 className="text-[1.15rem] font-semibold leading-tight text-slate-900 sm:text-[1.3rem]">
                    {pillar.title}
                  </h3>
                </div>
                <span className="hidden text-[12px] text-slate-400 sm:inline">{pillar.items.length} goals</span>
              </div>

              <ol className="space-y-0 divide-y divide-slate-200 border border-slate-200 bg-white">
                {pillar.items.map((item, iIdx) => {
                  const code = `${pillar.letter}${iIdx + 1}`;
                  return (
                    <li key={item.goal} className="grid gap-0 sm:grid-cols-[3.25rem_1fr]">
                      <div className="flex items-start justify-center bg-slate-50 px-2 py-4 sm:border-r sm:border-slate-200">
                        <span className="text-[13px] font-bold text-slate-500">{code}</span>
                      </div>
                      <div className="px-4 py-4 sm:px-5">
                        <h4 className="text-[15px] font-semibold leading-snug text-slate-900 sm:text-[16px]">
                          {item.goal}
                        </h4>
                        <dl className="mt-3 grid gap-2 text-[13.5px] leading-relaxed sm:grid-cols-[6.5rem_1fr] sm:gap-x-3 sm:gap-y-2">
                          <dt className="font-semibold text-slate-500">Now</dt>
                          <dd className="text-slate-700">{item.baseline}</dd>
                          {item.realistic && (
                            <>
                              <dt className="font-semibold text-slate-500">Realistic</dt>
                              <dd className="text-slate-800">{item.realistic}</dd>
                            </>
                          )}
                          {item.ambitious && (
                            <>
                              <dt className="font-semibold text-slate-500">Stretch</dt>
                              <dd className="text-slate-800">{item.ambitious}</dd>
                            </>
                          )}
                          <dt className="font-semibold text-slate-500">Measure</dt>
                          <dd className="text-slate-800">{item.target}</dd>
                        </dl>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          ))}
        </div>
      </Section>

      {fullStrategy && <FullStrategyBeforePaid bumpRecycle={bumpRecycle} />}

      <Section id="paid" title={paidPlan.title} subtitle={paidPlan.subtitle}>
        <div
          id="paid-flight"
          className="mb-5 scroll-mt-24 rounded-xl border-2 border-blue-200 bg-white p-4 sm:p-5"
        >
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="badge border-blue-600 bg-blue-600 text-white">Active flight</span>
            <h3 className="text-base font-semibold text-slate-900">Near-term Flight 1 (Meta IG)</h3>
          </div>
          <div className="mb-3 grid gap-3 sm:grid-cols-3">
            <StatTile
              label="Spend"
              value={`$${paidPlan.activeFlight.totalCad}`}
              sub={`$${paidPlan.activeFlight.dailyCad}/day`}
            />
            <StatTile
              label="Duration"
              value={`${paidPlan.activeFlight.days} days`}
              sub="First Meta IG ads"
            />
            <StatTile label="Offer" value="5%" sub="Lifetime off · flight creatives" />
          </div>
          <p className="text-[13px] text-slate-600">{paidPlan.activeFlight.name}</p>
        </div>

        <div className="card mb-4 text-[15px] leading-relaxed">{paidPlan.principle}</div>

        <div className="mb-5 grid gap-3 sm:grid-cols-2">
          <StatTile label="Creatives" value="3" sub="2 video + 1 static" />
          <StatTile label="Geo" value="2 pins" sub="McVean 5 km · Clarence 8 km" />
        </div>

        <div className="mb-5 grid gap-3 md:grid-cols-2">
          {paidPlan.goals.map((g) => (
            <div key={g.priority} className="card">
              <div className="badge mb-2">{g.priority}</div>
              <p className="text-[14px]">{g.text}</p>
            </div>
          ))}
        </div>

        <div className="card mb-5 text-[14px]">
          <strong className="text-[var(--gold-light)]">Offer:</strong> {paidPlan.offer}
        </div>

        <div className="mb-5 grid gap-4 lg:grid-cols-3">
          <BarChartCard
            title="Flight budget ($)"
            height={200}
            data={[
              { name: "Daily", value: paidPlan.activeFlight.dailyCad },
              { name: "Total (10d)", value: paidPlan.activeFlight.totalCad },
            ]}
          />
          <DonutChartCard
            title="Creatives (equal weight)"
            height={200}
            data={paidPlan.creatives.map((c) => ({
              name: c.name,
              value: 1,
            }))}
          />
          <BarChartCard
            title="Geo radius (km)"
            height={200}
            color="#334155"
            data={paidPlan.geo.map((g) => ({
              name: g.pin,
              value: g.radiusKm,
            }))}
          />
        </div>

        <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-[var(--gold)]">Creatives</h3>
        <div className="mb-5 grid gap-3 md:grid-cols-3">
          {paidPlan.creatives.map((c) => (
            <div key={c.id} className="card">
              <span className="badge mb-2">{c.type}</span>
              <h3 className="font-semibold text-[var(--gold-light)]">{c.name}</h3>
              <p className="mt-1 text-[13px] text-[var(--muted)]">{c.role}</p>
            </div>
          ))}
        </div>

        <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-[var(--gold)]">Targeting</h3>
        <div className="mb-5 grid gap-3 md:grid-cols-2">
          {paidPlan.geo.map((g) => (
            <div key={g.pin} className="card">
              <h3 className="font-semibold text-[var(--gold-light)]">
                {g.pin} · {g.radiusKm} km
              </h3>
              <p className="mt-1 text-[13px] text-[var(--muted)]">{g.detail}</p>
            </div>
          ))}
        </div>

        <div className="mb-5 grid gap-3 md:grid-cols-2">
          <div className="card">
            <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-[var(--gold)]">Rules</h3>
            <ul className="list-disc space-y-1 pl-4 text-[14px]">
              {paidPlan.rules.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
          <div className="card">
            <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-[var(--gold)]">KPIs (live only)</h3>
            <ul className="list-disc space-y-1 pl-4 text-[14px]">
              {paidPlan.kpis.map((k) => (
                <li key={k}>{k}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="card mb-3 border-amber-200 bg-amber-50/60 text-[14px] text-amber-950">
          {paidPlan.postLiveNote}
        </div>
        <div className="card border-[var(--gold)]/30 bg-blue-50/50">
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-[var(--gold)]">Ask of Sir</h3>
          <p className="text-[14px] leading-relaxed">{paidPlan.askOfSir}</p>
        </div>
      </Section>

      <Section id="budget" title={budget.title} subtitle={budget.note}>
        <div className="card border-amber-200 bg-amber-50/70">
          <div className="badge mb-3 border-amber-300 bg-amber-100 text-amber-900">Pending</div>
          <p className="text-[15px] leading-relaxed text-amber-950">{budget.pendingMessage}</p>
        </div>
      </Section>

      {fullStrategy && (
        <FullStrategyAfterBudget
          onCheckProgress={onCheckProgress}
          onTaskProgress={onTaskProgress}
          recycleKey={recycleKey}
          bumpRecycle={bumpRecycle}
        />
      )}

      <Section id="next" title="Next Actions">
        <ol className="list-decimal space-y-2 pl-5 text-[15px]">
          {nextActions.map((a) => (
            <li key={a.action}>
              <strong className="text-[var(--gold-light)]">{a.owner}:</strong> {a.action}
            </li>
          ))}
        </ol>
      </Section>
    </PortalShell>
  );
}
