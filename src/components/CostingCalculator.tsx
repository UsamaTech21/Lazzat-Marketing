"use client";

import { useEffect, useMemo, useState } from "react";
import { CostItem, costingSeed } from "@/data/growthCore";
import { STORAGE_KEYS, loadJson, saveJson } from "@/lib/storage";

type Assumptions = typeof costingSeed.assumptions;

export function CostingCalculator() {
  const [items, setItems] = useState<CostItem[]>(costingSeed.items);
  const [assumptions, setAssumptions] = useState<Assumptions>(costingSeed.assumptions);

  useEffect(() => {
    setItems(loadJson(STORAGE_KEYS.costing, costingSeed.items));
    setAssumptions(loadJson(STORAGE_KEYS.costingAssumptions, costingSeed.assumptions));
  }, []);

  const persistItems = (next: CostItem[]) => {
    setItems(next);
    saveJson(STORAGE_KEYS.costing, next);
  };

  const persistAssumptions = (next: Assumptions) => {
    setAssumptions(next);
    saveJson(STORAGE_KEYS.costingAssumptions, next);
  };

  const modeled = useMemo(() => {
    const revenue = assumptions.monthlyOrders * assumptions.avgTicket;
    const foodCogs = revenue * (assumptions.targetFoodCostPct / 100);
    const deliveryShare = 0.55;
    const deliveryFees = revenue * deliveryShare * (assumptions.deliveryCommissionPct / 100);
    const fixed = items.filter((i) => i.section === "fixed").reduce((s, i) => s + i.amount, 0);
    const variableManual = items
      .filter((i) => i.section === "variable" && !i.label.includes("modeled"))
      .reduce((s, i) => s + i.amount, 0);
    const market = items.filter((i) => i.section === "market").reduce((s, i) => s + i.amount, 0);
    const totalCost = fixed + variableManual + foodCogs + deliveryFees + market;
    const profit = revenue - totalCost;
    const margin = revenue ? (profit / revenue) * 100 : 0;
    return { revenue, foodCogs, deliveryFees, fixed, variableManual, market, totalCost, profit, margin };
  }, [assumptions, items]);

  const sections: CostItem["section"][] = ["fixed", "variable", "product", "market"];

  return (
    <div className="space-y-4">
      <div className="card grid gap-3 md:grid-cols-4">
        {(
          [
            ["monthlyOrders", "Monthly orders"],
            ["avgTicket", "Avg ticket ($)"],
            ["targetFoodCostPct", "Food cost %"],
            ["deliveryCommissionPct", "Delivery commission %"],
          ] as const
        ).map(([key, label]) => (
          <label key={key} className="text-xs text-[var(--muted)]">
            {label}
            <input
              className="input mt-1"
              type="number"
              value={assumptions[key]}
              onChange={(e) =>
                persistAssumptions({ ...assumptions, [key]: Number(e.target.value) || 0 })
              }
            />
          </label>
        ))}
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        {[
          ["Revenue", modeled.revenue],
          ["Total cost", modeled.totalCost],
          ["Profit", modeled.profit],
          ["Margin %", modeled.margin],
        ].map(([label, val]) => (
          <div key={label as string} className="card">
            <div className="text-[10px] uppercase tracking-wider text-[var(--muted)]">{label}</div>
            <div className="mt-1 font-[family-name:var(--font-display)] text-2xl text-[var(--gold-light)]">
              {label === "Margin %"
                ? `${(val as number).toFixed(1)}%`
                : `$${(val as number).toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
            </div>
          </div>
        ))}
      </div>

      <div className="card text-sm text-[var(--muted)]">
        Modeled food COGS ${modeled.foodCogs.toFixed(0)} · Modeled delivery fees ${modeled.deliveryFees.toFixed(0)}{" "}
        (assumes ~55% of orders via delivery apps). Placeholders — replace with real books.
      </div>

      {sections.map((section) => (
        <div key={section} className="card">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--gold)]">{section}</h3>
            <button
              type="button"
              className="btn"
              onClick={() =>
                persistItems([
                  ...items,
                  {
                    id: `${section}-${Date.now()}`,
                    section,
                    label: "New line",
                    amount: 0,
                    notes: "",
                  },
                ])
              }
            >
              Add line
            </button>
          </div>
          <div className="space-y-2">
            {items
              .filter((i) => i.section === section)
              .map((i) => (
                <div key={i.id} className="grid gap-2 md:grid-cols-[1fr_120px_1fr_auto]">
                  <input
                    className="input"
                    value={i.label}
                    onChange={(e) =>
                      persistItems(items.map((x) => (x.id === i.id ? { ...x, label: e.target.value } : x)))
                    }
                  />
                  <input
                    className="input"
                    type="number"
                    value={i.amount}
                    onChange={(e) =>
                      persistItems(
                        items.map((x) =>
                          x.id === i.id ? { ...x, amount: Number(e.target.value) || 0 } : x
                        )
                      )
                    }
                  />
                  <input
                    className="input"
                    value={i.notes}
                    onChange={(e) =>
                      persistItems(items.map((x) => (x.id === i.id ? { ...x, notes: e.target.value } : x)))
                    }
                  />
                  <button
                    type="button"
                    className="btn btn-ghost text-[var(--danger)]"
                    onClick={() => persistItems(items.filter((x) => x.id !== i.id))}
                  >
                    ×
                  </button>
                </div>
              ))}
          </div>
        </div>
      ))}

      <button
        type="button"
        className="btn"
        onClick={() => {
          persistItems(costingSeed.items);
          persistAssumptions(costingSeed.assumptions);
        }}
      >
        Reset costing seed
      </button>
    </div>
  );
}
