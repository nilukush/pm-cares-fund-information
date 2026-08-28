# MEMORY.md — Project Memory (compacted 2026-08-21, end of session)

## Status: v2.2 · DEPLOYED (28 Aug) · Three tiers · Finances consolidated · 137/137 tests · All gates PASS

Public-information website about India's PM CARES Fund. Three labeled source tiers since v2.1:
`article` (English Wikipedia, data as of 16 Aug 2026 — stale, tagged "needs update July 2026"),
`primary` (pmcares.gov.in audited statements FY2019-20→FY2024-25, all six PDFs fetched+verified
28 Aug 2026), `news` (attributed Aug 2026 coverage). Policy recorded in AGENTS.md (user-approved).

## v2.2 (28 Aug): Finances consolidation (user-approved restructure)
- Retired the article-tier 2-year chart; printed side-totals (incl. 10,990.17) became a dedicated six-year-table column; the 3 finance notes absorbed into its note slot (nothing-lost checklist verified against dist). KPI 2 = "Payments over six years (derived) ₹8,146.81 cr". AuditedStatement folded into SixYearRecord as <details open> deep-dive (prerendered; card byte-identical). CoverageReactions moved to #debate after Debate. FinancesBarChart deleted. Data layer untouched; tests 132→137 (incl. exact chart-count lock 4). Debugger+Verifier BOTH round-1 APPROVE (first time). Finances section now: KPI+donut → six-year record+donations+deep-dive. Optional NICE leftovers (not done): split merged note into paragraphs; tighten deep-dive containment test; lone-donut grid wrapper.

## v2.1 (28 Aug): six-year audited record + news tier + FY20-21 correction
- **Six-year series (all identity-verified, chain-continuous)**: closings 3,076.62 / 7,013.99 / 5,415.66 / 6,283.68 / 7,173.03 / 8,452.07 cr; receipts-during 16,598.87 cr; payments 8,146.81 cr (derived). FY22-23 payments 437.87 = Children 346.00 + 99,986 oxygen concentrators 91.87 + fees. Donations decline (domestic): 7,183.78→1,896.76→908.13→681.81→479.05.
- **CORRECTION**: wikitext's FY20-21 "Receipts 10,990.17" is a receipts-side TOTAL incl. 3,076.62 opening (per the fund's own statement) — new money 7,913.55. Old "Received, both years ₹14,066.79" KPI double-counted → removed (totalReceiptsCrore deleted; KPI now six-year 16,598.87; Hero stat relabeled "as published").
- **Auditors (primary)**: SARC (FRN 006085N, Sunil Kumar Gupta M.No 084884) signed FY21-22 (UDIN 22084884AXGCSU1642, 30.09.2022) + FY22-23 (UDIN 24084884BKIKDZ2614, 29.03.2024) = 4 FYs (Frontline's count); KKC & Associates LLP (Tejas Parikh M.No 123215) FY23-24+FY24-25, Mumbai 7 Aug 2026, no UDIN on either (CA Modani: correctable oversight). Trust signatories 6 Aug: Panda/Nair/Srivastava/Nil.
- **News tier** (7 outlets, 18-22 Aug): Bhardwaj/NCPRI, Batra, Nayak/CHRI, Khera (criticism) + Telegraph govt defence (reserved for crises; FD cushion) + CA observations + disclosure lag (6/12/28 months; joint release 18 Aug after Hindu gap report 8 Aug). News errors caught by identity checks & dropped: ITW FY23-24 "interest 407.50" (statement: 137.69). Frontline FY22-23 children "₹346 cr" VERIFIED CORRECT (mis-challenged once as 34.60 — grouping double-checked at 600dpi in two statements).
- **Statement URLs all verified 200**: …/Audited%20Statement.PDF, …/Audited_Statement_2020_21.pdf … _2024_25.pdf.
- New components: SixYearRecord (AuditedBalanceBarChart + donations table), CoverageReactions. FAQ 17→18 (+"What has it spent in recent years?"). Timeline 45→48 (Children scheme 30.05.2022; gap report 08.08.2026; release 18.08.2026). Tests 103→132. llms.txt: six-year + news sections; zero "14,066.79".
- **Gate history**: Analyzer (rejected its 34.60/403.27 adoption after 400dpi re-read + Frontline triangulation) → TDD → Debugger BLOCKER (false "only spending since FY22-23" — concentrators!) + Verifier 4 fact fixes (Hindu headline, 16-pages attribution, budget-session date, unquote SC) → both re-verified APPROVE.
- **PM CARES-for-Children exclusion rule SUPERSEDED** (news+primary cover it).

## v2.0 (28 Aug): audited FY2024-25 statement + 5 query-aligned FAQs
- **Published figures (all identity-verified at rupee precision: opening+items=total, total−payments=closing):** opening ₹7,173.03 cr; receipts during FY ₹1,279.91 cr (derived: printed total 8,452.95 − opening; exact ₹12,79,91,28,444); payments ₹87,85,291 (₹0.88 cr = PM CARES for Children ₹87,84,840 + bank/SMS ₹451); closing ₹8,452.07 cr (SB 605.41 + FD 7,846.65). Itemized: domestic 479.05, foreign **0.93**, int-SB 5.77, int-FD 469.38, TDS **0.13**, agency refunds 324.66. FY2023-24: closing ₹7,173.03 cr ONLY (comparative columns failed verification — omitted by design).
- **Auditor changed:** SARC & Associates (article, Jun 2020, 3 yrs) → by FY24-25 **KKC & Associates LLP** (formerly Khimji Kunverji & Co LLP), FRN 105146W/W100621, report dated 7 Aug 2026.
- **Architecture:** separate `auditedStatementFY202425` export + AuditedStatement.tsx card in #finances (NOT in finances.years — totalReceiptsCrore/charts/Dataset map it; extending would fake totals over non-contiguous years). `sourceTier: 'article' | 'primary'` on FiscalYearFinance. FAQ 12→17 (full form / private-or-government / controversy / utilization / how-much-now — the keyword-research aliases). Consistency sweep: Hero kicker "WIKIPEDIA + PMCARES.GOV.IN", 4th hero stat = latest balance, 4th Finances KPI, AuditCard addendum, Dataset FY2019-20→FY2024-25 + temporalCoverage 2020-03/2025-03, llms.txt primary-source section, index.html ×3 metas, Footer, about "Two labeled tiers", methodology. Tests 86→103 (new llms.test.ts; receipts-itemization guard).
- **Gate history (2 rounds):** Analyzer caught my payments crore slip (0.88 not 0.09); Verifier caught TWO 10× conversion errors (foreign 0.09→0.93, TDS 0.01→0.13 — I divided by 10⁸ not 10⁷); Debugger caught the resulting itemization contradiction + 10 polish fixes. Both re-verified: APPROVE. **LESSON: never convert lakh-range rupee figures in your head — 1 crore = 10⁷; run python.**

- **Primary URL**: https://pm-cares-fund-information.vercel.app/ · **Mirror**: https://nilukush.github.io/pm-cares-fund-information/ (canonical → Vercel)
- **Repo**: github.com/nilukush/pm-cares-fund-information (public, main; NO domain purchase per user constraint)
- **Content**: every body-text clause of the article is on the page (v1.7 clause-complete audit). Headline-only citation figures appear only in a clearly-labeled list, never as facts.

## Run / verify
- `npm run dev` → :5199 · `npm run preview` → :4199 (strictPort, non-standard by constraint)
- `npm test` → 137/137 (fund ~60 · App ~34 · format 14 · references 3 · StructuredData 6 · ChartCard 2 · ChartSlot 2 · index-html 1 · analytics 1 · about 1 · llms 5)
- `npx tsc --noEmit` clean · `npm run build` = tsc + vite build + prerender (~193.7 KB content injected into dist/index.html)

## Stack & architecture (decided — do not re-litigate)
Vite 8 + React 19 + TS strict + Tailwind v4 (`@theme` tokens in src/index.css) + Recharts 3 + Vitest 4/RTL (globals:false; cleanup in src/test/setup.ts). No router/backend.
- `src/data/fund.ts` — ALL content (identity+audit, finances, donations incl. voluntaryDonors+headline-only, military, salary examples, firstAllocation, oxygen+ventilator programmes incl. state deliveries/hospital episodes, popularCulture, 42-event timeline, criticism 10 / defence 4, PMNRF table + relatedFundsNote, litigation 11, faq 12, caveats 9, about)
- `src/data/references.ts` — AUTO-GENERATED (119 citations + seeAlso) by `scripts/parse-references.mjs` (re-run against fresh wikitext; never hand-edit). Parser gotchas fixed: first-param pipe, apostrophe-safe JSON output, `{{!}}` escaped pipes (normalize in wikitext BEFORE parsing).
- `src/components/*` — per-section; ChartCard (chart + aria-label + numericColumns mono-only table + note slot OUTSIDE role="img"); **ChartSlot** (mount-time dynamic import; placeholder "Loading chart…"; alive-flag race guard; failed chunk load leaves placeholder — table remains the fallback); **charts.tsx** (all 4 Recharts charts — FinancesBarChart, FinancesDonutChart, DonationsBarChart [useDesktop hook lives here], SpendingBarChart — loads as ONE on-demand chunk); icons.tsx; ScrollChrome; Header (NAV_ITEMS export + scrollspy IntersectionObserver, guarded for jsdom).
- Analytics beacons in App: `@vercel/analytics@2/react` + `@vercel/speed-insights@2/react`. **v2 gotcha: React components are NAMED exports on the `/react` subpaths; root default exports are imperative `inject` bundles, NOT components — tsc TS2614 catches the misuse.**
- Design system: "Accessible & Ethical" — navy #0F172A / blue #0369A1, Fira Sans + Fira Code (.tnum figures only), WCAG 2.1 AA.

## Hard rules (unchanged)
1. Every fact traceable to the article; estimates labeled "estimate", arithmetic labeled "derived", month-level dates when article gives no day. 2. Never sum 32-PSU vs 101-PSU figures. 3. Charts never color-only: labels + legend + table + aria-label. 4. TDD mandatory; agent-gate (Analyzer/Debugger/Verifier) for content or release changes; wikitext (action=raw) is the fact authority, conservative phrasing wins disputes. 5. Excluded-by-absence: Vande Bharat, PM CARES-for-Children, Tata ₹1,500 cr (not in article).

## Audit & verification history (2026-08-15 → 08-21)
1. Analyzer brief → build. 2. Verifier rounds 1-3 (killed 7 ERROR-class hallucinations; final 3-role consensus). 3. v1.4 completeness (+65 items, 4 new sections). 4. v1.5 dual re-audit (22 fixes incl. parser pipe bug). 5. v1.6 UI/UX audit (20 additive fixes). 6. Table readability (mono on numeric columns only). 7. v1.7 FINAL clause-complete audit (last 4 sub-clauses verbatim).
8. **19 Aug SEO/GEO 3-role audit: PASS, no MAJOR findings.** Live: all endpoints 200 (robots/sitemap/llms.txt/og-image 1200×630/IndexNow key/GSC file), gzip+cache HIT, mirror canonical→Vercel + base-path assets, JSON-LD @graph valid (WebSite/WebPage/FAQPage-12Q/Dataset), headings h1×1/h2×11/h3×40/h4×14 no skips, 11 anchor ids in prerendered HTML. Fact "mismatch" was format variance: raw wikitext writes 3076.62/10990.17/7013.99 inside templates — grep WITHOUT commas. Check article revision via API (`rvprop=timestamp`) to detect drift.
9. **v1.8 perf release**: Recharts code-split via ChartSlot; entry JS 683→309 KB (95 KB gzipped), charts chunk 392 KB loads post-hydration; og/twitter titles entity-encoded (`&amp;`); prerender substance unchanged (4 placeholders replace empty ResponsiveContainer divs); tests 82→85.
10. **v1.9 analytics**: cookieless/consent-free beacons (+1.5 KB gz); prerender unchanged (0 beacon markup server-side); runtime injection verified live in browser (h1 + 4 charts healthy). GA4 rejected (135 KB script + consent-mode + brand mismatch).

## SEO / GEO (v1.3+)
Prerendered full HTML (crawlers/LLM bots without JS see everything); JSON-LD (WebSite/WebPage/FAQPage/Dataset); question-format H1; keyword title/description; Twitter card + og-image 1200×630; robots.txt welcomes AI crawlers (GPTBot/ClaudeBot/PerplexityBot/CCBot/Google-Extended/etc.); llms.txt (11 sections); noscript. Registered: GSC URL-prefix property (verified, sitemap submitted), Bing imported from GSC, IndexNow (key 0e7c80d58618f01b8673e21f543f7f13; re-ping command in commit 7237c1f — POST JSON body; GET-style params on POST = HTTP 411). sitemap lastmod currently 2026-08-28.

## Search & analytics state (2026-08-28)
- **GSC (28 Aug export, web, data 18–25 Aug)**: 26 impr / 0 clicks / avg pos 32.46. Pattern = post-index freshness spike (18–21 Aug ≈5.5 impr/day) decayed to ≈1/day (22–25 Aug, window truncated by 2–3-day lag); earlier "13→26 doubled" was a lag artifact (13 = cumulative through ~19 Aug). Only like-for-like baseline point: "pm cares fund audit report" stable at pos 22. 19/26 impressions anonymized — NO query-level CTR math at this n; pos 6–8 days (n≈2/day) = noise. **0 clicks arithmetically expected** (≈0.2–0.3 expected clicks at CTR-by-position curves; P(0)≈75–80%). **Verdict UNCHANGED: no action.** Still don't chase "bank account details" (no account specifics in article) / "scanner" (navigational noise); NEVER self-link on Wikipedia (COI).
- **Weekly watch widened**: position + daily-impr rate + Devices/Countries (is India present?). Audience caveat (3-role consensus 28 Aug): 24/26 desktop + nine 1-impr exotic countries → impressions likely dev/monitoring community, not Indian info-seekers. **Stop criterion (8–12 wks = mid-Oct–mid-Nov)**: daily impr ≤1–2 AND no query in top 20 → structural ceiling → decide multi-page lever or accept.
- **FAQ rich results REMOVED for ALL sites 7 May 2026** (docs pulled 15 Jun 2026) — empty Search appearance is universal, not a defect; FAQPage markup now display-irrelevant but harmless, keep.
- One-time human checks: `site:pm-cares-fund-information.vercel.app` + `site:nilukush.github.io/pm-cares-fund-information` (mirror consolidates only via cross-domain canonical = hint, invisible in Vercel-scoped GSC). Parked: mirror noindex hardening.
- **Keyword research 28 Aug (docs/research/2026-08-28-keyword-research.md)**: entity demand TRIPLED in 2026 (Wikipedia PV 1.7k→8.3k/mo). Answers to all high-demand queries already on page; PHRASING mismatch is the gap ("full form" pos 84 w/ phrase absent; "utilization", "controversy", "total amount", "is private or government" wording absent). Tier-1 lever (gated, additive): 4 question-alias FAQs + llms.txt sync. Title churn deferred to wk 8–12. Excluded clusters reconfirmed.
- **Vercel Web Analytics: ENABLED, confirmed collecting** (script serves only post-enable). **Speed Insights: BLOCKED** — Hobby allows 1 project, slot held by another project. Decision: keep the other slot; CWV via pagespeed.web.dev manually or PSI API with a free key (anonymous PSI quota persistently exhausted — unreliable fallback).
- AI-referral traffic (chatgpt.com, perplexity.ai) shows in Vercel WA referrers, NOT in GSC.
- Known minor (pre-existing): duplicate React key warning — two Timeline events share a 2020-04-13 date key. Harmless; unfixed by choice.

## Ops notes
- Deploy = `git push` → Vercel (auto, primary) + GitHub Actions → Pages mirror (runs tests). Vite base = `GITHUB_ACTIONS ? '/pm-cares-fund-information/' : '/'` (NOT `CI` — Vercel sets CI too).
- Explicit devDeps: esbuild, @types/node (not hoisted in clean CI). Runtime deps: @vercel/analytics, @vercel/speed-insights.
- Release ritual: bump sitemap lastmod → push → live-check → IndexNow re-ping.
- Agent-tool subagent launches were interrupted twice this session at harness level; running Analyzer/Debugger/Verifier roles DIRECTLY worked — do the same if it recurs.
- macOS tooling gotchas: qlmanage SVG thumbnails are square-letterboxed (center-crop with sips) and cached by input filename (use unique names); headless-Chrome anchor screenshots don't settle under smooth-scroll (scroll with `behavior:'instant'` + disable scroll-behavior, or full-page tall window and crop with sips).
- Env files: .env.local|.dev|.staging|.production (VITE_SITE_NAME, VITE_ENV, VITE_DATA_AS_OF). .idea/ gitignored.

## Maintenance / next-session quickstarts
- **Wikipedia changed**: diff fresh wikitext (`curl 'https://en.wikipedia.org/w/index.php?title=PM_CARES_Fund&action=raw'`) vs data → edit `fund.ts` (+ `node scripts/parse-references.mjs` if refs changed) → sync exact-value tests → `npm test && npm run build` → push → release ritual → re-run a clause-sweep audit.
- **Watch-list (passive)**: GSC position weekly; Vercel WA referrers; glance at Bing WMT (often friendlier positions for new sites).
- **Parked (none requested)**: move Speed Insights slot if other project winds down; section-view custom events via scrollspy (phase 2); free PSI API key for automated vitals; custom domain if constraints change; dark mode; monthly wikitext diff as scheduled CI job.
