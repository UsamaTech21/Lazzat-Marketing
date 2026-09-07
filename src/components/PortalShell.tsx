"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { NAV } from "@/data/nav";
import { brand } from "@/data/brand";

type Props = {
  children: React.ReactNode;
  checklistProgress: number;
  taskProgress: number;
  onResetAll: () => void;
};

export function PortalShell({ children, checklistProgress, taskProgress, onResetAll }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("current");

  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    if (!sections.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-18% 0px -58% 0px", threshold: [0.12, 0.3, 0.5] }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const groups = useMemo(() => {
    const map = new Map<string, typeof NAV>();
    NAV.forEach((item) => {
      const list = map.get(item.group) ?? [];
      list.push(item);
      map.set(item.group, list);
    });
    return [...map.entries()];
  }, []);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {mobileOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-slate-900/40 md:hidden"
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-[var(--border)] bg-white transition-all duration-200 ${
          collapsed ? "w-[68px]" : "w-[280px]"
        } ${mobileOpen ? "translate-x-0" : "max-md:-translate-x-full"} md:translate-x-0`}
      >
        <div className={`border-b border-[var(--border)] ${collapsed ? "p-3" : "px-4 py-4"}`}>
          <div className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#1d4ed8] text-sm font-bold text-white">
              L
            </div>
            {!collapsed && (
              <div className="min-w-0 flex-1">
                <div className="text-[15px] font-semibold tracking-tight text-slate-900">Lazzat</div>
                <div className="text-[10px] uppercase tracking-[0.12em] text-slate-500">
                  Marketing Portal
                </div>
              </div>
            )}
            <button
              type="button"
              className="btn btn-ghost hidden h-7 w-7 shrink-0 p-0 text-xs md:inline-flex"
              onClick={() => setCollapsed((v) => !v)}
              aria-label="Toggle sidebar"
            >
              {collapsed ? "»" : "«"}
            </button>
          </div>
          {!collapsed && (
            <p className="mt-2 truncate text-[11px] text-slate-500">{brand.taglines.webHero}</p>
          )}
        </div>

        {!collapsed && (
          <div className="space-y-2 border-b border-[var(--border)] px-4 py-3">
            <div className="flex justify-between text-[10px] uppercase tracking-wider text-slate-500">
              <span>Checklist</span>
              <span>{checklistProgress}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-[#1d4ed8] transition-all"
                style={{ width: `${checklistProgress}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>Tasks done</span>
              <span>{taskProgress}%</span>
            </div>
          </div>
        )}

        <nav className="flex-1 overflow-y-auto px-2 py-3">
          {groups.map(([group, items]) => (
            <div key={group} className="mb-3">
              {!collapsed && (
                <div className="px-2 pb-1 text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400">
                  {group}
                </div>
              )}
              {items.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMobileOpen(false)}
                  className={`mb-0.5 flex items-center gap-2 rounded-lg px-2 py-1.5 text-[12.5px] transition-colors ${
                    active === item.id
                      ? "border border-blue-200 bg-blue-50 font-medium text-blue-800"
                      : "border border-transparent text-slate-600 hover:bg-slate-50"
                  } ${collapsed ? "justify-center" : ""}`}
                  title={item.label}
                >
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded text-[10px] font-bold ${
                      active === item.id ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {item.n}
                  </span>
                  {!collapsed && <span className="leading-snug">{item.label}</span>}
                </a>
              ))}
            </div>
          ))}
        </nav>

        <div className="border-t border-[var(--border)] p-3 space-y-2">
          <Link
            href="/"
            className={`btn btn-solid w-full justify-center ${collapsed ? "px-0" : ""}`}
            title="Open Assistant chat"
          >
            {collapsed ? "AI" : "← Assistant chat"}
          </Link>
          {!collapsed && (
            <>
              <button type="button" className="btn w-full" onClick={onResetAll}>
                Reset all to seed
              </button>
              <p className="text-[10px] leading-snug text-slate-500">
                Local data only — code seeds + localStorage.
              </p>
            </>
          )}
        </div>
      </aside>

      <div className={`min-h-screen transition-all ${collapsed ? "md:pl-[68px]" : "md:pl-[280px]"}`}>
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-[var(--border)] bg-white/90 px-4 py-2.5 backdrop-blur">
          <div className="flex items-center gap-3">
            <button type="button" className="btn md:hidden" onClick={() => setMobileOpen(true)}>
              Menu
            </button>
            <div>
              <div className="text-[13px] font-semibold text-slate-900">{brand.name}</div>
              <div className="text-[11px] text-slate-500">Brampton GTM · Interactive strategy</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/" className="btn">
              Assistant
            </Link>
            <a className="btn btn-solid" href={brand.site} target="_blank" rel="noreferrer">
              lazzat.ca
            </a>
          </div>
        </header>
        <main className="mx-auto max-w-5xl space-y-8 px-4 py-8 pb-28">{children}</main>
      </div>
    </div>
  );
}

export function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="section-enter section-panel scroll-mt-20">
      <div className="mb-5 border-b border-[var(--border)] pb-4">
        <div className="badge mb-2">Lazzat Strategy</div>
        <h2 className="text-[1.5rem] font-semibold leading-tight tracking-tight text-slate-900 md:text-[1.75rem]">
          {title}
        </h2>
        {subtitle && <p className="mt-2 max-w-3xl text-[13px] text-slate-500">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

export function StatTile({
  label,
  value,
  sub,
}: {
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <div className="stat-tile">
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      {sub && <div className="stat-sub">{sub}</div>}
    </div>
  );
}
