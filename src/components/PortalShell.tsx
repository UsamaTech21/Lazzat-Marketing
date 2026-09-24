"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { NavItem } from "@/data/nav";
import { brand } from "@/data/brand";

type Props = {
  children: React.ReactNode;
  nav: NavItem[];
  fullStrategy: boolean;
  onToggleFullStrategy: () => void;
  checklistProgress?: number;
  taskProgress?: number;
  onResetAll?: () => void;
};

export function PortalShell({
  children,
  nav,
  fullStrategy,
  onToggleFullStrategy,
  checklistProgress = 0,
  taskProgress = 0,
  onResetAll,
}: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("current");
  const [query, setQuery] = useState("");
  const lockUntilRef = useRef(0);
  const navIds = useMemo(() => nav.map((n) => n.id), [nav]);

  // Reliable scroll-spy: section under sticky header (with fallback if probe sits in a gap).
  useEffect(() => {
    const resolve = () => {
      if (Date.now() < lockUntilRef.current) return;
      const header = document.querySelector("header.sticky") as HTMLElement | null;
      // Align with section scroll-mt (~6rem) so the in-view section owns this line.
      const probeY = Math.max((header?.getBoundingClientRect().bottom ?? 64) + 48, 160);
      let next = navIds[0] ?? "current";
      let contained = false;
      for (const id of navIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const { top, bottom } = el.getBoundingClientRect();
        if (top <= probeY && bottom > probeY) {
          next = id;
          contained = true;
        }
      }
      if (!contained) {
        // Gap between sections / sub-pixel miss — last section whose top crossed the probe.
        for (const id of navIds) {
          const el = document.getElementById(id);
          if (!el) continue;
          if (el.getBoundingClientRect().top <= probeY + 2) next = id;
        }
      }
      // Page end: highlight the last partially-visible nav section (short sections can't reach probe).
      const doc = document.documentElement;
      if (window.scrollY + window.innerHeight >= doc.scrollHeight - 12) {
        for (let i = navIds.length - 1; i >= 0; i--) {
          const el = document.getElementById(navIds[i]);
          if (!el) continue;
          const { top, bottom } = el.getBoundingClientRect();
          if (bottom > 80 && top < window.innerHeight) {
            next = navIds[i];
            break;
          }
        }
      }
      setActive((prev) => (prev === next ? prev : next));
    };

    resolve();
    const interval = window.setInterval(resolve, 120);
    document.addEventListener("scroll", resolve, { capture: true, passive: true });
    window.addEventListener("resize", resolve);
    window.addEventListener("hashchange", resolve);
    return () => {
      window.clearInterval(interval);
      document.removeEventListener("scroll", resolve, true);
      window.removeEventListener("resize", resolve);
      window.removeEventListener("hashchange", resolve);
    };
  }, [navIds]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const filteredNav = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return nav;
    return nav.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.group.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q)
    );
  }, [query, nav]);

  const groups = useMemo(() => {
    const map = new Map<string, NavItem[]>();
    filteredNav.forEach((item) => {
      const list = map.get(item.group) ?? [];
      list.push(item);
      map.set(item.group, list);
    });
    return [...map.entries()];
  }, [filteredNav]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <div className="min-h-screen overflow-x-clip bg-[var(--background)]">
      {mobileOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-slate-900/40 md:hidden"
          aria-label="Close menu"
          onClick={closeMobile}
        />
      )}

      <aside
        data-active-section={active}
        className={`fixed inset-y-0 left-0 z-50 flex w-[min(300px,88vw)] flex-col border-r border-[var(--border)] bg-white transition-transform duration-200 md:transition-[width] ${
          collapsed ? "md:w-[68px]" : "md:w-[280px]"
        } ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className={`border-b border-[var(--border)] ${collapsed ? "md:p-3" : "px-4 py-4"}`}>
          <div className={`flex items-center gap-3 ${collapsed ? "md:justify-center" : ""}`}>
            <img
              src="/lazzat-logo.jpg"
              alt="Lazzat Grill & Shakes"
              className="h-10 w-10 shrink-0 rounded-lg object-cover ring-1 ring-slate-200"
            />
            <div className={`min-w-0 flex-1 ${collapsed ? "md:hidden" : ""}`}>
              <div className="text-base font-semibold tracking-tight text-slate-900">Lazzat</div>
              <div className="text-[11px] uppercase tracking-[0.12em] text-slate-500">
                Marketing Portal
              </div>
            </div>
            <button
              type="button"
              className="btn btn-ghost h-8 w-8 shrink-0 p-0 text-sm md:hidden"
              onClick={closeMobile}
              aria-label="Close menu"
            >
              ✕
            </button>
            <button
              type="button"
              className="btn btn-ghost hidden h-7 w-7 shrink-0 p-0 text-xs md:inline-flex"
              onClick={() => setCollapsed((v) => !v)}
              aria-label="Toggle sidebar"
            >
              {collapsed ? "»" : "«"}
            </button>
          </div>
          <div className={collapsed ? "md:hidden" : ""}>
            <p className="mt-2 truncate text-[12px] text-slate-500">{brand.taglines.webHero}</p>
            <label className="mt-3 block">
              <span className="sr-only">Jump to section</span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Jump to section…"
                className="input w-full text-[13px]"
              />
            </label>
          </div>
        </div>

        {fullStrategy && (
          <div className={`space-y-2 border-b border-[var(--border)] px-4 py-3 ${collapsed ? "md:hidden" : ""}`}>
            <div className="flex justify-between text-[11px] uppercase tracking-wider text-slate-500">
              <span>Checklist</span>
              <span>{checklistProgress}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-[#1d4ed8] transition-all"
                style={{ width: `${checklistProgress}%` }}
              />
            </div>
            <div className="flex justify-between text-[12px] text-slate-500">
              <span>Tasks done</span>
              <span>{taskProgress}%</span>
            </div>
          </div>
        )}

        <nav className="flex-1 overflow-y-auto overscroll-contain px-2 py-3">
          {groups.length === 0 && (
            <p className={`px-2 text-[13px] text-slate-400 ${collapsed ? "md:hidden" : ""}`}>
              No sections match “{query}”
            </p>
          )}
          {groups.map(([group, items]) => (
            <div key={group} className="mb-3">
              <div
                className={`px-2 pb-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400 ${
                  collapsed ? "md:hidden" : ""
                }`}
              >
                {group}
              </div>
              {items.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    lockUntilRef.current = Date.now() + 1200;
                    setActive(item.id);
                    closeMobile();
                    const el = document.getElementById(item.id);
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                    window.history.replaceState(null, "", `#${item.id}`);
                  }}
                  data-nav-id={item.id}
                  data-active={active === item.id ? "true" : "false"}
                  className={`mb-0.5 flex items-center gap-2 rounded-lg px-2 py-2.5 text-[13.5px] transition-colors md:py-2 ${
                    active === item.id
                      ? "border border-blue-200 bg-blue-50 font-medium text-blue-800"
                      : "border border-transparent text-slate-600 hover:bg-slate-50"
                  } ${collapsed ? "md:justify-center" : ""}`}
                  title={item.label}
                  aria-current={active === item.id ? "true" : undefined}
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded text-[11px] font-bold ${
                      active === item.id ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {item.n}
                  </span>
                  <span className={`leading-snug ${collapsed ? "md:hidden" : ""}`}>{item.label}</span>
                </a>
              ))}
            </div>
          ))}
        </nav>

        <div className="space-y-2 border-t border-[var(--border)] p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <button
            type="button"
            className={`btn w-full justify-center ${fullStrategy ? "" : "btn-solid"}`}
            onClick={() => {
              onToggleFullStrategy();
              closeMobile();
            }}
            title={fullStrategy ? "Back to short $200 flight portal" : "Unhide full strategy"}
          >
            <span className={collapsed ? "md:hidden" : ""}>
              {fullStrategy ? "← Short portal" : "Unhide full strategy"}
            </span>
            <span className={`hidden ${collapsed ? "md:inline" : ""}`}>
              {fullStrategy ? "Short" : "Full"}
            </span>
          </button>
          <Link
            href="/assistant"
            className="btn w-full justify-center"
            title="Open Assistant chat"
            onClick={closeMobile}
          >
            <span className={collapsed ? "md:hidden" : ""}>Assistant chat →</span>
            <span className={`hidden ${collapsed ? "md:inline" : ""}`}>AI</span>
          </Link>
          <a
            className="btn btn-solid w-full justify-center md:hidden"
            href={brand.site}
            target="_blank"
            rel="noreferrer"
            onClick={closeMobile}
          >
            lazzat.ca
          </a>
          <div className={collapsed ? "md:hidden" : ""}>
            {fullStrategy && onResetAll && (
              <button type="button" className="btn mb-2 w-full" onClick={onResetAll}>
                Reset tools to seed
              </button>
            )}
            <p className="text-[11px] leading-snug text-slate-500">
              {fullStrategy
                ? "Full strategy visible — jump any section in the nav."
                : "Short view · First Meta IG flight · $200 / 10 days"}
            </p>
          </div>
        </div>
      </aside>

      <div className={`min-h-screen transition-all ${collapsed ? "md:pl-[68px]" : "md:pl-[280px]"}`}>
        <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-white/95 backdrop-blur supports-[padding:max(0px)]:pt-[env(safe-area-inset-top)]">
          {/* Mobile: Menu + title + one short toggle only (Assistant / site live in drawer) */}
          <div className="flex items-center gap-2 px-3 py-2.5 md:hidden">
            <button
              type="button"
              className="btn shrink-0 px-2.5"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              Menu
            </button>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[14px] font-semibold text-slate-900">Lazzat</div>
              <div className="truncate text-[11px] text-slate-500">
                {fullStrategy ? "Full strategy" : "$20/day · $200"}
              </div>
            </div>
            <button
              type="button"
              className="btn shrink-0 whitespace-nowrap px-2.5 text-[12px]"
              onClick={onToggleFullStrategy}
            >
              {fullStrategy ? "Short" : "Full"}
            </button>
          </div>

          {/* Desktop / tablet header */}
          <div className="hidden items-center gap-3 px-4 py-3 md:flex">
            <div className="min-w-0 flex-1">
              <div className="truncate text-[15px] font-semibold text-slate-900">{brand.name}</div>
              <div className="truncate text-[12px] text-slate-500">
                {fullStrategy ? "Full strategy" : "First Meta IG · $20/day · $200"}
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button type="button" className="btn" onClick={onToggleFullStrategy}>
                {fullStrategy ? "Short portal" : "Full strategy"}
              </button>
              <Link href="/assistant" className="btn">
                Assistant
              </Link>
              <a className="btn btn-solid" href={brand.site} target="_blank" rel="noreferrer">
                lazzat.ca
              </a>
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-5xl space-y-6 px-3 py-6 pb-24 sm:space-y-10 sm:px-4 sm:py-10 sm:pb-28">
          {children}
        </main>
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
    <section id={id} className="section-enter section-panel scroll-mt-20 sm:scroll-mt-24">
      <div className="mb-4 border-b border-[var(--border)] pb-4 sm:mb-6 sm:pb-5">
        <div className="badge mb-2.5">Lazzat Strategy</div>
        <h2 className="font-[family-name:var(--font-display)] text-[1.35rem] font-semibold leading-tight tracking-tight text-slate-900 sm:text-[1.65rem] md:text-[1.9rem]">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 max-w-3xl text-[13.5px] leading-relaxed text-slate-500 sm:mt-2.5 sm:text-[15px]">
            {subtitle}
          </p>
        )}
      </div>
      <div className="min-w-0 overflow-x-auto">{children}</div>
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
    <div className="stat-tile min-w-0">
      <div className="stat-label">{label}</div>
      <div className="stat-value break-words">{value}</div>
      {sub && <div className="stat-sub break-words">{sub}</div>}
    </div>
  );
}
