# CLAUDE.md — Project Context

## What this is
A single-page public-information website presenting India's **PM CARES Fund** facts graphically (charts, stat cards, timeline). All content is summarized from the English Wikipedia article https://en.wikipedia.org/wiki/PM_CARES_Fund — accessed 15 Aug 2026 — and must remain faithful to it. The site is neutral: criticism and the government's defence are shown side by side; no editorial verdicts.

## Stack (decided — do not re-litigate)
- Vite 8 + React 19 + TypeScript (strict) — SPA, no router, no backend
- Tailwind CSS 4 (via `@tailwindcss/vite`; design tokens in `src/index.css` `@theme`)
- Recharts 3 for charts (donut/bars), CSS progress bars for promise-vs-delivery
- Vitest 4 + @testing-library/react (jsdom, `globals: false` — import test fns explicitly; cleanup wired in `src/test/setup.ts`)

## Commands & ports (non-standard by project constraint)
- `npm run dev` → http://localhost:5199 (strictPort)
- `npm run preview` → http://localhost:4199 (strictPort)
- `npm test` / `npm run build` (typecheck + bundle)

## Architecture
- `src/data/fund.ts` — **single source of truth for ALL content**. Typed, with derived/estimated values flagged (`derived: true`, "estimate" labels). Everything else reads from here.
- `src/lib/format.ts` — Indian-locale formatting (`formatCrore`, `formatINR`, `formatPercent`); invalid input → "—".
- `src/components/*` — one file per section; `ChartCard` wraps every chart with `role="img"` + aria-label and a visible data-table alternative (notes must go in the `note` prop, NEVER inside the chart children — they'd be hidden from screen readers inside `role="img"`).
- `docs/ANALYSIS.md`, `docs/PLAN.md` — the approved analysis & TDD plan.

## Invariants (must hold)
1. Every figure must be traceable to the Wikipedia article; estimated/derived values are labeled as such.
2. Never sum overlapping donation figures (32-PSU vs 101-PSU periods differ).
3. Charts never rely on color alone: direct labels + legend + table + aria-label.
4. Tests: 44 (format 14, data 20, App integration 10). TDD is mandatory for any new feature: red → green → refactor.
5. Where the article gives only month-level dates, show month-level dates (never invent a day).

## Updating data when Wikipedia changes
Edit only `src/data/fund.ts`, keep tests in `fund.test.ts` in sync (exact-value assertions), run `npm test && npm run build`.
