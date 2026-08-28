# CLAUDE.md — Project Context

## What this is
A single-page public-information website presenting India's **PM CARES Fund** facts graphically (charts, stat cards, timeline). Content comes from three labeled tiers (see AGENTS.md): the English Wikipedia article https://en.wikipedia.org/wiki/PM_CARES_Fund (accessed 16 Aug 2026), the fund's own audited statements FY2019-20 → FY2024-25 (pmcares.gov.in, accessed 28 Aug 2026 — every figure verified against the statements' accounting identities), and attributed August 2026 news coverage. The site is neutral: criticism and the government's defence are shown side by side; no editorial verdicts.

## Stack (decided — do not re-litigate)
- Vite 8 + React 19 + TypeScript (strict) — SPA, no router, no backend
- Tailwind CSS 4 (via `@tailwindcss/vite`; design tokens in `src/index.css` `@theme`)
- Recharts 3 for charts (donut/bars), CSS progress bars for promise-vs-delivery
- Vitest 4 + @testing-library/react (jsdom, `globals: false` — import test fns explicitly; cleanup wired in `src/test/setup.ts`)

## Commands & ports (non-standard by project constraint)
- `npm run dev` → http://localhost:5199 (strictPort)
- `npm run preview` → http://localhost:4199 (strictPort)
- `npm test` / `npm run build` (typecheck + bundle + prerender: full static HTML injected into dist/index.html)

## Architecture
- `src/data/fund.ts` — **single source of truth for ALL content**. Typed, with derived/estimated values flagged (`derived: true`, "estimate" labels). Everything else reads from here.
- `src/lib/format.ts` — Indian-locale formatting (`formatCrore`, `formatINR`, `formatPercent`); invalid input → "—".
- `src/components/*` — one file per section; `ChartCard` wraps every chart with `role="img"` + aria-label and a visible data-table alternative (notes must go in the `note` prop, NEVER inside the chart children — they'd be hidden from screen readers inside `role="img"`). `ChartSlot` lazy-loads `charts.tsx` (exactly 4 Recharts charts, one on-demand chunk — count is test-locked) after hydration — keep Recharts OUT of statically-imported modules so the initial bundle stays lean. `SixYearRecord` owns the six-year audited table/chart + the FY2024-25 `<details open>` deep-dive; `CoverageReactions` (news tier) lives in #debate.
- Analytics beacons: `<Analytics />` / `<SpeedInsights />` from `@vercel/analytics/react` + `@vercel/speed-insights/react` (v2: named exports on `/react` subpaths only).
- `docs/ANALYSIS.md`, `docs/PLAN.md` — the approved analysis & TDD plan.

## Invariants (must hold)
1. Three source tiers, never mixed in one chart or total: `article` (Wikipedia), `primary` (pmcares.gov.in audited statements — wins all conflicts), `news` (attributed only). Estimated/derived values are labeled as such.
2. Never sum overlapping donation figures (32-PSU vs 101-PSU periods differ).
3. Charts never rely on color alone: direct labels + legend + table + aria-label.
4. Tests: 141 (fund 67, App 37, format 14, references 3, StructuredData 8, ChartCard 2, ChartSlot 2, index-html 2, analytics 1, llms 5). TDD is mandatory for any new feature: red → green → refactor.
5. Where a source gives only month-level dates, show month-level dates (never invent a day).

## Updating data when sources change
Edit only `src/data/fund.ts`, keep tests in `fund.test.ts` in sync (exact-value assertions), run `npm test && npm run build`. If Wikipedia updates (it is stale — tagged "needs update July 2026" and missing FY2021-22→FY2024-25), reconcile against `auditedSeries` (primary tier already published here; primary wins). If a new audited statement appears, extend `auditedSeries` (the chain-continuity test enforces opening = prior closing) — extraction recipe in MEMORY.md.
