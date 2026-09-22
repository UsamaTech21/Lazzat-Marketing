# Lazzat Marketing Portal + RAG Assistant

Interactive strategy portal for **Lazzat Grill & Shakes** (Brampton), plus a Claude-style RAG assistant.

- **`/`** — Strategy portal (Current Situation, charts, Paid Plan, Kanban, IG campaign…)
- **`/strategy`** — Same strategy app (bookmark alias)
- **`/assistant`** — Marketing Assistant (RAG + OpenRouter free LLM)

## Stack
- Next.js 15 (App Router) + TypeScript + Tailwind CSS v4
- Knowledge RAG over chunked Lazzat corpus (`knowledge/chunks.json`)
- OpenRouter chat completions — key stays server-side
- Strategy tools persist to **localStorage** — no database

## Setup
```bash
cd lazzat-marketing-portal
npm install
cp .env.example .env
# Put OPENROUTER_API_KEY in .env (never commit .env)
npm run knowledge:build
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Env
| Variable | Required | Notes |
|----------|----------|--------|
| `OPENROUTER_API_KEY` | Yes for chat | Server-only |
| `OPENROUTER_SITE_URL` | No | Referer header |
| `OPENROUTER_APP_NAME` | No | App title header |

Primary free model: `minimax/minimax-m3:free` (auto-fallback through other free instruct models). Free catalog changes — if chat fails, wait for rate limits then retry.

## Knowledge base
Rebuild after editing Marketing skill, brain docs, or `src/data/*`:
```bash
npm run knowledge:build
```

Sources ingested: `Lazzat Marketing/`, `Lazzat_Brain.md`, `lazzat brain now/`, portal `src/data/*`, and `knowledge/learned/*.md`.

In chat, use **Save to knowledge** on an assistant reply to append an approved Q&A under `knowledge/learned/` (human-approved only).

## Build
```bash
npm run build
npm start
```

Deploy the `lazzat-marketing-portal` folder. Set `OPENROUTER_API_KEY` in the host env. Do not commit secrets.

## Brand locks
Lava stone (not charcoal) · no “halal” in customer copy · Canadian positioning · cite Current Situation numbers only when in retrieved context · Mayfield = planned only

## IG Paid Campaign (Sir Deck)
See `campaigns/ig-followers-offer/`:
- `SIR-STRATEGY.md` — 1-pager for leadership
- `ADS-MANAGER-SETUP.md` — step-by-step Ads Manager
- `00-INPUTS.md` — defaults + screenshot checklist

Also in portal: **/strategy#ig-campaign**
