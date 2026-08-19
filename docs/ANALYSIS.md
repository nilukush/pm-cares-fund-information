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
