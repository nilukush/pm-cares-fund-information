# High-Level Analysis — PM CARES Fund Information Website

Date: 2026-08-15 · Status: Approved for planning (greenfield project, no open questions — decisions delegated to the engineering team by the requester)

## 1. Business Problem Definition

**Problem (non-technical):** Citizens of India lack a single, quick, trustworthy place to understand the PM CARES Fund — what it is, how much money it raised, where that money went, and why it is debated. The primary public source (Wikipedia) is a long-form encyclopedic article that takes significant time and effort to read; key figures are buried in prose and tables.

**Core objectives:**
1. Present the fund's story in a **graphical, scannable** way (charts, stat cards, timeline) so a visitor can grasp the essentials in under two minutes.
2. Be **user-friendly**: works on low-end mobiles, accessible to screen readers, fast to load, works over poor connections.
3. Be **factually faithful**: every figure traceable to the Wikipedia article, with estimates/contested numbers clearly labeled. Present criticism and the government's defence side-by-side, neutrally.

**Success criteria:**
- All key Wikipedia facts (identity, finances, donations, allocations, timeline, criticism) represented.
- No horizontal scroll at 375px; keyboard navigable; WCAG AA contrast.
- Tests pass; production build serves on a non-standard port.

**Why it matters:** The fund received massive public donations during COVID-19 and remains politically contested. Public comprehension requires neutral, visual synthesis — not another opinion piece.

## 2. Codebase Investigation

- Workspace `pm-cares-fund-information` is **empty** (no files, not a git repository). Greenfield — no existing patterns, dependencies, or duplication risks.
- Environment: macOS (Apple M1 Pro), Node v26.4.0, npm 11.17.0 — modern toolchain fully supported.
- Source material: https://en.wikipedia.org/wiki/PM_CARES_Fund (fetched 2026-08-15; full content brief produced by the Analyzer agent).
- No external APIs at runtime — content is compile-time data (deterministic, testable, offline-friendly).

## 3. Technical Approach Evaluation

| | Option A — Plain HTML + CDN Chart.js | Option B — Next.js (SSR) | Option C — Vite + React SPA (chosen) |
|---|---|---|---|
| Alignment with need | Quick one-off page | Full framework for content sites | Static content + interactive charts |
| Testability / TDD | Poor (no module system for tests) | Good | **Excellent** (Vitest + RTL, typed data layer) |
| Type safety | None | TypeScript | **TypeScript strict** |
| Charts | Chart.js manual DOM mgmt | Any | **Recharts** (declarative, React-native, accessible tooltips) |
| Complexity / maintenance | Low upfront, degrades as page grows | Heavy: SSR infra, more moving parts for zero dynamic content | **Low-moderate**: one build step, static `dist/` output |
| SEO | Fine | Best | Good (meta/OG tags; content is client-rendered but site is a single informational page) |

**Recommendation: Option C — Vite + React 19 + TypeScript + Tailwind CSS v4 + Recharts + Vitest/Testing Library.**
Rationale: purely static informational content; no server runtime needed; the data layer can be isolated in one typed module (ideal for TDD and future refreshes when Wikipedia updates); Recharts gives accessible, responsive SVG charts; Vite produces a static bundle deployable anywhere.

**Design system (via ui-ux-pro-max skill):** "Accessible & Ethical" style — Bento Grid Showcase pattern, navy (#0F172A) + blue (#0369A1) on light background, Fira Sans (body) with Fira Code reserved for tabular data figures, WCAG-AA/AAA contrast, visible focus rings, reduced-motion support, no emoji icons (inline SVG only).

## 4. Context and Constraints

- **Ports:** non-standard — dev `5199`, preview `4199` (strict).
- **Data integrity:** figures are estimates/contested in places; every chart must label units (₹ crore) and provenance ("as reported by Wikipedia, accessed 15 Aug 2026").
- **Neutrality:** criticism and defence sections must both be present and sourced; no editorial conclusions drawn on the site.
- **Environment files:** `.env.local`, `.env.dev`, `.env.staging`, `.env.production` (Vite `VITE_*` convention).
- **Risks:**
  - Wikipedia content changes → mitigation: all content in `src/data/fund.ts`, single source to refresh.
  - Chart color-only meaning → mitigation: direct value labels + legends + text summaries (color is never the sole carrier).
  - Google Fonts unavailable → mitigation: `display=swap` + system font fallbacks.
  - jsdom chart rendering → mitigation: chart components wrapped with ResponsiveContainer (size-dependent) are smoke-tested by section heading/data-table presence, not pixel output.

## 5. Post-launch performance analysis (2026-08-19, from SEO/GEO audit)

**Problem:** the production build ships one 683 KB JS chunk (`index-*.js`) because three section components (`Finances`, `Donations`, `Spending`) import Recharts statically. Content visibility is protected by prerendering, but mobile users download + execute all of Recharts before the page is interactive (Total Blocking Time / INP cost).

**Constraints that any fix must preserve:** prerendered HTML keeps every text/table fact (charts are already client-side by design — see `src/prerender-entry.tsx`); ChartCard's `role="img"` aria-label + data table + note stay server-rendered; no new runtime dependencies; tests stay deterministic in jsdom.

**Options evaluated:**

| | A — `manualChunks` split | B — `React.lazy` + `Suspense` | C — mount-time dynamic import (chosen) |
|---|---|---|---|
| Initial JS weight | Unchanged (chunk still fetched at startup — static import graph) | Reduced | **Reduced** |
| Prerender behavior | Unchanged | `renderToString` renders fallbacks; lazy+Suspense semantics risk changing prerendered markup | Renders a static placeholder deterministically |
| Test ergonomics in jsdom | Unchanged | Async boundary in every App test | Async boundary contained in one small component |
| Complexity | Config-only but no real win | Medium | **Low — one ~30-line wrapper** |

**Chosen: C.** A single `ChartSlot` component resolves a chart module via `import()` in `useEffect` and renders a placeholder until then. All four Recharts chart instances move to one `charts.tsx` module (one extra chunk). Sections lose their Recharts imports; tables/notes/aria-labels untouched. Side benefit: the esbuild prerender bundle stops carrying Recharts.

**Bundled micro-fix (same release):** `og:title` / `twitter:title` in `index.html` contain raw `&` where `<title>` uses `&amp;` — encode for strict validity.

## 6. Analytics decision (2026-08-21, from first GSC data)

**Problem:** first Search Console data appeared (indexed ~18 Aug; 13 impressions, 0 clicks, position trending 70 → 27). GSC covers the search side only; there is no visibility into direct/AI-referral visits, and no real-user Core Web Vitals (the 19 Aug audit's open item — PSI quota blocked measurement).

**Options evaluated:** Vercel Web Analytics + Speed Insights (free on Hobby — ~50K events/mo and 10K/mo one-project allowances, overage pauses rather than bills; ~1 KB async beacons, cookieless, no consent banner) vs Cloudflare Web Analytics (free, ~4.3 KB, but third-party to the stack) vs GA4 (free but ~135 KB client script + consent-mode/banner obligations — would surrender ~a third of the v1.8 bundle win and clash with the site's ethics positioning) vs self-hosted Umami-class tools (need a backend — violates the no-backend architecture decision).

**Chosen: the Vercel pair.** Zero cost, negligible async-after-hydration weight (prerendered HTML and critical path untouched), no personal data collected (no banner, DPDP-friendly), and Speed Insights directly closes the real-user CWV gap. Known trade-off accepted: on a single-page site path analytics is trivial, so value = visits/referrers/countries/devices + CWV; section-level tracking (custom events via the existing scrollspy observer) noted as possible phase 2, deliberately not built now. Beacons run on both deployments (mirror traffic ≈ 0; canonical is Vercel). One manual prerequisite: Web Analytics and Speed Insights must be toggled on in the Vercel dashboard before data flows.

---

## Addendum G — Primary-source tier: audited FY2024-25 statement + FAQ aliases (2026-08-28)

**Problem:** (a) The fund's own audited Receipts & Payments Account for FY2024-25 (pmcares.gov.in PDF, accessed 28 Aug 2026) exists but is not in the Wikipedia article (its table stops at FY2020-21; article tagged "needs update — July 2026") — the site's single-source policy blocks showing the fund's current balance. (b) Keyword research (docs/research/2026-08-28-keyword-research.md) found high-demand question queries ("full form", "private or government", "controversy", "utilized", "total amount 2026") whose answers exist on the page but whose phrasings don't.

**Decision (user-approved):** extend sourcing with a clearly-labeled primary-source tier — audited-statement data from pmcares.gov.in may be shown when (1) every figure passes the statement's own accounting identities (verified programmatically), (2) it is visually/semantically separated from article-sourced figures, and (3) source + accessed date are stated. Never mixed with article figures in one chart.

**Data verification (scanned PDF → two vision passes → programmatic identity checks):** FY2024-25 reconciles exactly (opening + itemized receipts = printed total; total − payments = closing, at rupee precision): opening ₹7,173.03 cr; receipts during year ₹1,279.91 cr (derived: printed total ₹8,452.95 cr − opening; exact ₹12,79,91,28,444); payments ₹87,85,291 (₹0.88 cr); closing ₹8,452.07 cr; auditor KKC & Associates LLP (formerly Khimji Kunverji & Co LLP), report dated 7 Aug 2026. FY2023-24 comparative column FAILED itemization verification — only its closing balance ₹7,173.03 cr is published (double-anchored as FY2024-25 opening). The Analyzer role independently caught a crore-conversion error in the draft (payments 0.88, not 0.09).

**Design chosen:** separate `auditedStatementFY202425` export + new AuditedStatement card inside #finances (NOT extending `finances.years`, which feeds the KPI sum ₹14,066.79 cr, FinancesBarChart, and Dataset JSON-LD — extending it would publish an arithmetically-wrong total over non-contiguous years and render a false zero bar for FY2023-24). Self-consistency sweep: fund.ts header, about.principles[0], sources, dataCaveats, Finances section lead, Hero 4th stat, AuditCard auditor addendum, StructuredData Dataset, llms.txt — all updated together so no surface still claims Wikipedia-only. FAQ 12→17 (5 question aliases). Neutrality: the striking FY24-25 payments figure is stated with plain numbers + refunds context + article-era spending context; no evaluative language.

## Addendum H — v2.1: six-year audited record + news tier (2026-08-28)

Adjudications beyond the Analyzer brief (docs/research/2026-08-28-audit-sources.md):
1. **R1 RESOLVED against the brief's adopted values.** 400-DPI re-read of the FY23-24 statement's payments rows: PM CARES for Children FY2022-23 = 3,46,00,00,000 (₹346.00 cr), Procurement of 99,986 Oxygen Concentrators = 91,87,00,000 (₹91.87 cr); items + ₹278 + ₹24,000 = printed total 4,37,87,24,278 EXACTLY. Frontline independently printed ₹346 cr (children) and ₹439 cr (total). The brief's 34.60/403.27-derived alternative is REJECTED. Both figures ship as PRINTED (not derived).
2. **R3 RESOLVED**: all six statement PDF URLs verified HTTP 200 (FY19-20 Audited%20Statement.PDF; FY20-21 …2020_21.pdf; FY21-22 …2021_22.pdf; FY22-23 …2022_23.pdf; FY23-24 …2023_24.pdf; FY24-25 …2024_25.pdf).
3. **R4 RESOLVED** from fetch records: Bhardwaj quotes → The Hindu + Scroll; Batra, Nayak, rotation observation → Frontline; Khera/Saxena → The Telegraph; Modani, Vaghani → India Today.
4. **R2** as briefed: The Hindu's 18.4% ships attributed-only (naïve statement arithmetic gives 49.1%; their denominator is unstated — never re-derive on-site).
5. Policy amendments: three source tiers (article/primary/news — AGENTS.md updated); "excluded-by-absence" rule for PM CARES-for-Children superseded (news + primary payments lines now cover it).
