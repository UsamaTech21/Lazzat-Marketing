"use client";

import { useCallback, useEffect, useState } from "react";
import { PortalShell, Section, StatTile } from "@/components/PortalShell";
import {
  FullStrategyAfterBudget,
  FullStrategyBeforePaid,
} from "@/components/FullStrategyExtras";
import { BarChartCard } from "@/components/charts/BarChartCard";
import { DonutChartCard } from "@/components/charts/DonutChartCard";
import { brand } from "@/data/brand";
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
        <div className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatTile
            label="Followers"
            value={currentSituation.headline.followers}
            sub={currentSituation.headline.period}
          />
          <StatTile
            label="Impressions"
            value={currentSituation.headline.impressions}
            sub="Tracked networks"
          />
          <StatTile
            label="Interactions"
            value={currentSituation.headline.interactions}
            sub="Engagement total"
          />
          <StatTile label="IG" value={91} sub="~84% non-follower views" />
        </div>

        <div className="mb-5 grid gap-4 lg:grid-cols-3">
          <BarChartCard
            title="Followers by platform"
            layout="vertical"
            height={220}
            data={currentSituation.followersByPlatform.map((r) => ({
              name: r.platform,
              value: r.value,
            }))}
          />
          <BarChartCard
            title="Impressions by platform"
            layout="vertical"
            color="#0ea5e9"
            height={220}
            data={currentSituation.impressionsByPlatform.map((r) => ({
              name: r.platform,
              value: r.value,
            }))}
          />
          <DonutChartCard
            title="IG views by type (90d)"
            height={220}
            data={currentSituation.instagram90.byType.map((t) => ({
              name: t.type,
              value: t.pct,
            }))}
          />
        </div>

        <ul className="list-disc space-y-1.5 pl-5 text-[14px] text-[var(--muted)]">
          <li>Reels dominate IG views (~86.5%) — paid should amplify, not reinvent.</li>
          <li>Follower base flat vs strong reach — this flight targets follows + offer.</li>
          <li>Brand: {brand.taglines.webHero}</li>
        </ul>
      </Section>

      <Section id="goals" title={goals.title} subtitle={goals.oneLiner}>
        <div className="mb-4 grid gap-3 sm:grid-cols-3">
          <StatTile label="Flight spend" value={goals.flight.spend} sub={goals.flight.daily} />
          <StatTile label="Days" value={goals.flight.days} sub="First Meta ads" />
          <StatTile label="Offer" value="5%" sub="Lifetime off" />
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="card">
            <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-[var(--gold)]">Primary</h3>
            <ul className="list-disc space-y-1 pl-4 text-[14px]">
              {goals.primaryGoals.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
          </div>
          <div className="card">
            <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-[var(--gold)]">After flight</h3>
            <ul className="list-disc space-y-1 pl-4 text-[14px]">
              {goals.secondaryGoals.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {fullStrategy && <FullStrategyBeforePaid bumpRecycle={bumpRecycle} />}

      <Section id="paid" title={paidPlan.title} subtitle={paidPlan.subtitle}>
        <div className="card mb-4 text-[15px] leading-relaxed">{paidPlan.principle}</div>

        <div className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatTile label="Daily" value={`$${paidPlan.activeFlight.dailyCad}`} sub={paidPlan.activeFlight.platform} />
          <StatTile label="Total" value={`$${paidPlan.activeFlight.totalCad}`} sub={`${paidPlan.activeFlight.days} days`} />
          <StatTile label="Creatives" value="3" sub="2 video + 1 static" />
          <StatTile label="Geo" value="2 pins" sub="McVean + Clarence" />
        </div>

        <p className="mb-4 text-[14px] font-medium text-[var(--gold-light)]">{paidPlan.activeFlight.name}</p>

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
