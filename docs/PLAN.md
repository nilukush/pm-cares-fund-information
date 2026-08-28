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

---

## Step 27: Primary-source audited FY2024-25 statement + 5 FAQ aliases (2026-08-28)

- Objective: publish the fund's audited FY2024-25 figures as a labeled primary-source tier and align FAQ language with real query demand; zero regressions to article-sourced content.
- Prerequisites: user approval (28 Aug); figures identity-verified at rupee precision; Analyzer brief adopted (separate export, not finances.years).
- Test First: unit/integration — fund.test.ts new describe (tier marker, exact figures 7173.03/1279.91/8785291/0.88/8452.07/7173.03, identity tolerance ≤0.01, payments itemization exact 8784840+451=8785291, FAQ 17 + 5 regexes, sources/caveats updates); App.test.tsx (AuditedStatement card: h3, ₹8,452.07 cr, KKC & Associates, PDF link rel=noopener, accessed date; Hero latest-balance; AuditCard addendum); StructuredData.test.tsx (Dataset name FY2024-25, temporalCoverage 2020-03/2025-03); new src/llms.test.ts (PDF URL, 8,452.07, 'derived'). Expected: all fail — feature absent.
- Implementation: fund.ts (constants, AuditedStatementFY202425 interface+data, sourceTier on FiscalYearFinance rows, faq +5, sources +1, dataCaveats +3, about.principles[0], header comment); new AuditedStatement.tsx (bordered card, badge, summary + itemized tables in overflow-x-auto with tnum, notes as text); App.tsx (component inside #finances + lead sentence); Finances.tsx (KPI grid 2/4 + 4th card); Hero.tsx (4th StatCard → latest balance); AuditCard.tsx (auditor addendum); StructuredData.tsx (Dataset fields); llms.txt (header line, key fact, primary-source section).
- Acceptance: all new tests pass; 86 existing tests pass unmodified (assertions verified: no FAQ-count hardcode; totalReceiptsCrore untouched; isBasedOn untouched); tsc --noEmit clean; build succeeds; prerender includes the card.
- Verification: Debugger (code/a11y: table semantics, contrast on badge, heading levels) + Verifier (facts vs PDF image + wikitext + engineering checks) in parallel; consensus required; then release ritual (sitemap lastmod, push, live-check, IndexNow).
- Stop/Go: max 3 attempts per step; on Verifier dissent about any figure, that figure is dropped (conservative wins).

## Step 28: v2.1 — six-year audited record, FY20-21 receipts relabel, news tier (2026-08-28)

- Objective: publish the complete FY2019-20→FY2024-25 audited series (all identity-verified), correct the ₹14,066.79 two-year KPI (double-counted the ₹3,076.62 opening), add attributed August-2026 news coverage (criticism + defence), donations-decline table, auditor history with UDINs, disclosure-lag facts, PM CARES for Children background, 3 timeline events, FAQ 17→18.
- Test First: per Analyzer brief §7 with R1 adjudication — FY22-23 children = 346.00 (not 34.60) regression guard; auditedSeries identity + chain-continuity loops; totals 16,598.87/8,146.81; donationsByYear monotonic decline; news-tier attribution + conflict-absence checks; App tests for SixYearRecord/CoverageReactions/donations/Hero relabel; KPI ₹16,598.87 replaces ₹14,066.79; timeline regex extends to 18 Aug 2026; llms + StructuredData assertions.
- Implementation: fund.ts (auditedSeries + totals, donationsByYear, newsSources/newsReactions/newsDefence/newsDisclosureLag/newsAnalysisNotes, finances.fy202021ReceiptsNote, DELETE totalReceiptsCrore, audit.primarySourceUpdate→auditor history, priorYearNote rewrite, FAQ updates + Q18, timeline +3, sources +7 news +5 statement PDFs, caveats rewrite, about three-tiers); new SixYearRecord.tsx + CoverageReactions.tsx; AuditedBalanceBarChart in charts.tsx (lazy chunk); Finances KPI + Hero stat relabel; App wiring (#finances: Finances → SixYearRecord → AuditedStatement → CoverageReactions); StructuredData + llms.txt; AGENTS.md 3-tier policy.
- Acceptance: all tests pass (red→green), tsc clean, build + prerender OK; Debugger + Verifier parallel gate → consensus → re-verify; release ritual (lastmod, push, live-check, IndexNow).
- Stop/Go: R1-style digit disputes → identity checks + high-DPI re-read + news triangulation; unresolved → drop the figure (conservative wins).

## Step 29: v2.2 — Finances consolidation (2026-08-28)

- Objective: three-block #finances (KPI+donut → six-year record with expandable FY24-25 deep-dive → nothing else) + coverage card in #debate; zero content loss; data layer untouched.
- Test First: App.test adjustments (chart-count assertions, AuditedStatement heading now inside <details open>, coverage card now under #debate, KPI 2 swap, retired-chart strings absent); all red before implementation where behavior changes.
- Implementation: Finances.tsx (drop 2-year ChartCard; KPI 2 → six-year payments), SixYearRecord.tsx (add "Receipts-side total (printed)" column; absorb unspentQuote/corpusStatementNote/fy202021ReceiptsNote into note slot; embed AuditedStatement as <details open> deep-dive), App.tsx (remove AuditedStatement slot; CoverageReactions → #debate after <Debate />), charts.tsx (remove dead FinancesBarChart export).
- Acceptance: every previously rendered fact still rendered or consciously relocated (checklist in tests); a11y: details/summary keyboard+SR native; gates green; Debugger + Verifier consensus; release ritual.
- Stop/Go: if folding breaks any FY24-25 test irreparably (jsdom/hidden issues), fall back to keeping the card as its own block directly under SixYearRecord (still consolidated visually).
