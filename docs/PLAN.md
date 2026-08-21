# Implementation Plan — PM CARES Fund Information Website

Contract between requester and engineering. Strict TDD (Red → Green → Refactor) for every step.
Environment: LOCAL · dev port 5199 · preview port 4199 (strict, non-standard by constraint).
Max 3 failed attempts per step, then STOP and ask the human.

---

**Step 1: Data module (`src/data/fund.ts`)**
├─ Objective: Single typed source of truth for all content (identity, finances, donations, allocations, timeline, criticism, defence, FAQ).
├─ Prerequisites: Analyzer agent content brief (done).
├─ Test First:
│  ├─ Test type: unit (Vitest)
│  ├─ Cases: identity fields present & exact (name, formed 2020-03-27, chairperson, trustees count); finance figures > 0 and self-consistent (spent ≤ mobilized); every donation/allocation entry has amount>0, label, and note; timeline sorted chronologically & ≥ 8 events; FAQ ≥ 6 entries with non-empty Q&A; every section has ≥1 source URL.
│  └─ Expected: fails — module does not exist.
├─ Implementation: typed exports only (no logic beyond derivation helpers).
├─ Acceptance: tests pass; `tsc --noEmit` clean.
├─ Verification: `npm test`.
└─ Stop/Go: go — data is foundation for all UI.

**Step 2: Formatters (`src/lib/format.ts`)**
├─ Objective: INR crore formatting (`₹3,100 cr`), Indian-grouping numbers, percent, compact date.
├─ Test First: unit — crore formatting incl. thousands separators; Indian digit grouping (1,23,456); percent 1 decimal; invalid inputs (negative/NaN → "—").
├─ Implementation: pure functions, no side effects.
├─ Acceptance & Verification: `npm test`.
└─ Stop/Go: go.

**Step 3: App shell — skip-link, sticky nav, section layout, footer**
├─ Objective: semantic landmarks (header/nav/main/footer), skip-to-content link, active-section nav.
├─ Test First: integration (RTL) — renders skip link, nav anchors for every section id, single h1.
├─ Implementation: static shell + anchor nav (scroll-smooth, reduced-motion safe).
├─ Acceptance: a11y tree landmarks present.
└─ Stop/Go: go.

**Step 4: Hero + Key-Facts bento cards**
├─ Objective: above-the-fold summary — what the fund is + 4 stat cards (formed, mobilized, spent, tax status).
├─ Test First: stat labels & values render; disclaimer "estimates as reported by Wikipedia" present.
├─ Implementation: Tailwind bento grid, tabular-nums figures.
└─ Stop/Go: go.

**Step 5: Finances — mobilized vs spent bar + utilization donut**
├─ Objective: two charts, each with legend, tooltip, direct labels, and an accessible `<table>` alternative + one-line text summary.
├─ Test First: section renders heading, chart container with role/aria-label, and the data table with correct totals.
├─ Implementation: Recharts BarChart + PieChart (donut), palette tokens chart-1..6.
└─ Stop/Go: go.

**Step 6: Donations — horizontal bar chart**
├─ Test First: top donors render (Tata, Reliance…), table alternative present.
├─ Implementation: layout="vertical" BarChart with value labels.
└─ Stop/Go: go.

**Step 7: Timeline — vertical alternating timeline**
├─ Test First: all events render in order; list semantics.
├─ Implementation: ordered-list markup, date chips (Fira Code).
└─ Stop/Go: go.

**Step 8: Criticism vs Defence — two-column balance**
├─ Test First: both sections non-empty; each item has a fact sentence.
├─ Implementation: neutral side-by-side cards (stack on mobile).
└─ Stop/Go: go.

**Step 9: FAQ — accessible disclosure**
├─ Test First: ≥6 items; buttons have aria-expanded/aria-controls; panels hidden until opened (userEvent).
├─ Implementation: native `<details>/<summary>` styled, animated minimally.
└─ Stop/Go: go.

**Step 10: Sources & footer**
├─ Test First: Wikipedia link + access date render.
├─ Implementation: reference list + neutrality disclaimer.
└─ Stop/Go: go.

**Step 11: Full suite + typecheck + production build**
├─ Test First: n/a (verification step).
├─ Verification: `npm test && npm run build` zero errors.
└─ Stop/Go: go.

**Step 12: Agent-team review (Debugger + Verifier, in parallel)**
├─ Objective: independent review; **consensus required** before shipping.
├─ Debugger: code bugs, TS strictness, a11y violations, chart misuse.
├─ Verifier: re-fetch Wikipedia and cross-check every figure in `fund.ts`; run tests/build; check acceptance criteria.
└─ Stop/Go: fix findings → re-run both → consensus ⇒ go.

**Step 13: Serve production build on port 4199 and verify HTTP 200.**

**Step 14: Project docs — CLAUDE.md, AGENTS.md, MEMORY.md, README.md.**

---

**Regression protection:** test suite grows cumulatively; every step ends with full `npm test` run. No existing tests (greenfield) — regressions impossible until first green, then suite is the guardrail.

---

## Release v1.8 — performance + markup validity (2026-08-19)

**Step 15: Social-card title entity fix**
├─ Objective: `og:title` / `twitter:title` encode `&` as `&amp;` (matches `<title>`).
├─ Test First: unit (`src/index-html.test.ts`) — reads root `index.html`; og:title and twitter:title content contains `&amp;` and no raw ` & `. Expected: fails (raw `&` present).
├─ Implementation: two-character edit in `index.html` lines 17/32.
├─ Acceptance: new test passes; existing 82 unaffected (no runtime code).
└─ Verification: `npm test`.

**Step 16: Code-split Recharts via `ChartSlot`**
├─ Objective: Recharts leaves the initial JS chunk; loads after hydration; zero change to prerendered facts/tables.
├─ Test First: unit (`src/components/ChartSlot.test.tsx`) — (a) placeholder shows until the module resolves, then the chart renders; (b) resolution after unmount is ignored (no crash/leak). Expected: fails — component does not exist.
├─ Implementation: new `ChartSlot` (dynamic import in `useEffect`, guarded by `alive` flag); move all four chart JSX trees to `src/components/charts.tsx`; `Finances`/`Donations`/`Spending` drop Recharts imports and pass `ChartSlot` as ChartCard children; prune newly-unused imports (strict tsc).
├─ Acceptance: all tests pass; `tsc --noEmit` clean; `npm run build` succeeds; `dist/assets` shows a separate charts chunk with the entry chunk materially smaller; `dist/index.html` still contains all tables/figures and 4 placeholders instead of empty Recharts divs.
├─ Verification: gates above + preview :4199 browser check (charts render, tables visible) + Debugger/Verifier consensus passes.
└─ Stop/Go: consensus ⇒ deploy (`git push`), sitemap `lastmod` bump, live re-check, IndexNow re-ping.

**Step 17: Analytics + real-user CWV beacons**
├─ Objective: mount Vercel Web Analytics and Speed Insights without perf/prerender/privacy regressions.
├─ Test First: integration (`src/analytics.test.tsx`) — App renders both beacons (packages mocked — the assertion is our wiring, not their internals) and the shell still mounts (h1 present). Expected: fails — beacons not wired.
├─ Implementation: `npm i @vercel/analytics @vercel/speed-insights` (runtime deps); render `<Analytics />` + `<SpeedInsights />` in App's fragment; no other changes.
├─ Acceptance: new test + all 85 existing tests pass; `tsc --noEmit` clean; build succeeds; entry-chunk delta ≈ 1–2 KB; prerendered `dist/index.html` substance unchanged (no beacon markup injected server-side).
├─ Verification: gates + live browser check post-deploy (beacon `<script>` present in DOM at runtime) + IndexNow re-ping.
└─ Stop/Go: manual prerequisite remains — enable both products in the Vercel dashboard (human step, no code).
