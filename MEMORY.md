# MEMORY.md — Project Memory (compacted 2026-08-28, end of session)

## Status: v2.2.1 · DEPLOYED (28 Aug) · Three source tiers · 141/141 tests · All gates PASS · SEO/GEO audit r2 SHIPPED

Public-information website about India's PM CARES Fund, now the most complete public
compilation of its audited figures (ahead of Wikipedia). **Three labeled tiers**
(user-approved 28 Aug, policy in AGENTS.md): `article` (English Wikipedia, data as of
16 Aug 2026 — article itself stale, tagged "needs update July 2026"), `primary`
(pmcares.gov.in audited statements FY2019-20→FY2024-25 — ALL SIX PDFs fetched,
vision-extracted and identity-verified 28 Aug; wins all conflicts), `news` (attributed
Aug 2026 coverage; name+outlet+date required; conflicting news figures dropped, never
averaged).

- **Primary URL**: https://pm-cares-fund-information.vercel.app/ · **Mirror**: https://nilukush.github.io/pm-cares-fund-information/ (canonical → Vercel)
- **Repo**: github.com/nilukush/pm-cares-fund-information (public, main; NO domain purchase per user constraint)

## Session 2026-08-28 (v2.0 → v2.2, all deployed + live-checked + IndexNow'd)

**Published primary-tier record (all identity-verified: opening + receipts-during −
payments = closing, rupee precision; chain-continuous):**
- Closings: 3,076.62 / 7,013.99 / 5,415.66 / 6,283.68 / 7,173.03 / 8,452.07 cr (FY19-20→FY24-25). Six-year receipts-during 16,598.87 cr; payments 8,146.81 cr (both derived).
- FY24-25 detail card: opening 7,173.03; receipts-during 1,279.91 (derived; domestic 479.05, foreign 0.93, int-SB 5.77, int-FD 469.38, TDS 0.13, agency refunds 324.66); payments 0.88 cr (₹87,85,291 = Children ₹87,84,840 + ₹451 charges); closing 8,452.07 (SB 605.41 + FD 7,846.65 ≈ 93% FD).
- FY22-23 payments 437.87 = Children **346.00** + 99,986 oxygen concentrators **91.87** + fees. Domestic donations declined every year: 7,183.78→1,896.76→908.13→681.81→479.05.
- **CORRECTION SHIPPED**: wikitext's FY20-21 "Receipts 10,990.17" is a receipts-side TOTAL incl. the 3,076.62 opening — new money 7,913.55 (derived). Old "₹14,066.79 both years" KPI double-counted → deleted (totalReceiptsCrore removed; KPIs now six-year receipts/payments; Hero stat relabeled "as published"; printed side-total is a dedicated table column).
- **Auditors**: SARC (FRN 006085N, Sunil Kumar Gupta M.No 084884) FY19-20→FY22-23, 4 FYs (Frontline's count), UDINs 22084884AXGCSU1642 (30.09.2022) / 24084884BKIKDZ2614 (29.03.2024) → KKC & Associates LLP (formerly Khimji Kunverji & Co LLP; Tejas Parikh M.No 123215) FY23-24+FY24-25, Mumbai 7 Aug 2026, trust sign-off Delhi 6 Aug (Panda/Nair/Srivastava/Nil); no UDIN on KKC statements (CA Modani: correctable oversight).
- **News tier** (7 outlets, 18–22 Aug 2026; jointly released 18 Aug after ~2-yr gap The Hindu reported 8 Aug; disclosure lags 6/12/28 months): Bhardwaj/NCPRI, Batra, Nayak/CHRI, Khera criticism + Telegraph govt defence (reserved for crises; FD cushion) + CA observations.
- **v2.2 consolidation**: Finances section = KPI strip (six-year receipts/payments, auditor, latest balance) + ToI donut → SixYearRecord (bar chart + 5-col table incl. printed side-totals + donations-by-year table + FY24-25 card folded as `<details open>` deep-dive). CoverageReactions moved to #debate. FinancesBarChart deleted (exactly 4 charts, test-locked).
- News errors caught & dropped: India This Week FY23-24 "interest 407.50" (statement: 137.69). Frontline's "₹346 cr children FY22-23" was CORRECT (brief once mis-adopted 34.60/403.27 — rejected via 400/600dpi re-reads + Frontline triangulation).
- FAQ 12→18 (v2.0 aliases: full form / private-or-government / controversy / utilization / how-much-now; v2.1: recent-spending). Timeline 42→45 events (Children scheme 30.05.2022; gap report 08.08.2026; release 18.08.2026). dataCaveats 15. PM CARES-for-Children exclusion rule SUPERSEDED (news+primary cover it).
- **Gate lessons (the reason the gate exists)**: Analyzer caught my payments crore slip (0.88 not 0.09); Verifier caught two 10× conversion errors (foreign 0.93, TDS 0.13 — divided by 10⁸ not 10⁷); Debugger caught a false "only spending since FY22-23" claim + itemization contradiction. **NEVER convert lakh/crore-range rupee figures mentally — 1 crore = 10⁷ — always python. Vision OCR of Indian digit-grouping is unreliable: transcribe, then verify against accounting identities; identities are ground truth; re-read at 400–600dpi on dispute; triangulate with news.**
- v2.2 was the first round-1 double-APPROVE. NICE leftovers (not done): split the merged six-year note into paragraphs; tighten deep-dive containment test; lone-donut grid wrapper.
- Research docs: docs/research/2026-08-28-keyword-research.md, docs/research/2026-08-28-audit-sources.md (full fact inventory + news corroboration/errors), docs/research/2026-08-28-seo-geo-audit.md (audit r2 with GSC data; 3-role consensus).

## Session 2026-08-28 late — SEO/GEO audit round 2 + v2.2.1 fixes (SHIPPED, TDD + gate)
- **Verdicts (consensus)**: Technical SEO PASS; SEO performance PASS-needs-patience; GEO PASS-with-concerns → concerns fixed same session. GSC cross-foots exactly (devices/countries/daily all = 26; queries table shows 6 of 26 — 20 impr privacy-anonymized, normal). P(0 clicks) ≈ 99.4% at these positions → 0 clicks expected, no action. Freshness decay 5.5→1.0 impr/day confirmed.
- **v2.2.1 (Step 30, user-approved "ok")**: noscript FY2020-21 sentence → corrected framing (3,076.62 + 7,913.55 new money; 10,990.17 gone, test-locked in index-html.test.ts); Dataset variableMeasured row 1 → "Receipts-side total as printed (article tier, ₹ crore)"; WebPage dateModified + Dataset modifiedDate = DATA_AS_OF_ISO ('2026-08-28', new fund.ts export — vite-node resolves missing exports as undefined, so the test ALSO asserts ISO-format to avoid a false pass); FAQ phrasing aliases: "total amount received across the six audited years … ₹16,598.87 crore (derived)" in the now-FAQ + "entire recorded programme utilization" in recent-years FAQ. Tests 137→141.
- **llms.txt demoted to hedge (research-backed)**: no major AI crawler fetches it (Ahrefs 137K sites 97% never fetched; 62k-request log audit 0.14%; Mueller "no AI system uses it"). KEEP (zero cost, good briefing doc, 5 tests) but not a lever. Real GEO levers (Princeton GEO paper + Ahrefs 75K brands): sourced statistics (+40% citations), attributed quotes, answer-first structure, top-10 Google rankings (38% of AIO citations), off-site brand mentions (out of scope).
- Audit verified live: all endpoints 200; live HTML was byte-identical to dist (248,547 B pre-fix); mirror canonical → Vercel; JSON-LD parses, 18 FAQ entities; 1 h1 / 79 headings / zero skips; India best-positioned country (9 impr @ 21.78). Agent-tool launches interrupted again → direct-role fallback used (2nd time).

## Run / verify
- `npm run dev` → :5199 · `npm run preview` → :4199 (strictPort, non-standard by constraint)
- `npm test` → 141/141 (fund ~79 · App ~39 · format 14 · references 3 · StructuredData 8 · ChartCard 2 · ChartSlot 2 · index-html 2 · analytics 1 · about 1 · llms 5 — approximate split)
- `npx tsc --noEmit` clean · `npm run build` = tsc + vite build + prerender (~243.5 KB content injected into dist/index.html)

## Stack & architecture (decided — do not re-litigate)
Vite 8 + React 19 + TS strict + Tailwind v4 (`@theme` tokens in src/index.css) + Recharts 3 + Vitest 4/RTL (globals:false; cleanup in src/test/setup.ts). No router/backend.
- `src/data/fund.ts` — ALL content: identity+audit (audit.primarySourceUpdate = full auditor history), finances (article rows w/ sourceTier + fy202021ReceiptsNote), auditedStatementFY202425 (detail card), auditedSeries + auditedSeriesTotals (six years), donationsByYear, newsSources/newsReactions/newsDefence/newsDisclosureLag/newsAnalysisNotes, donations incl. voluntaryDonors+headline-only, military, salary examples, firstAllocation, oxygen+ventilator programmes, popularCulture, 45-event timeline, criticism 10 / defence 4, PMNRF table, litigation 11, faq 18, caveats 15, about.
- `src/data/references.ts` — AUTO-GENERATED (119 citations) by `scripts/parse-references.mjs` (re-run against fresh wikitext; never hand-edit; gotchas: first-param pipe, apostrophe-safe JSON, `{{!}}` normalize BEFORE parsing).
- Components: ChartCard (aria-label + tnum table + note OUTSIDE role="img"; tableCaption prop); ChartSlot (mount-time dynamic import, alive-flag guard); **charts.tsx = exactly 4 charts** (AuditedBalanceBarChart, FinancesDonutChart, DonationsBarChart [useDesktop hook], SpendingBarChart) as ONE lazy chunk; AuditedStatement (FY24-25 detail, folded); SixYearRecord (six-year chart+table, donations table, deep-dive details); CoverageReactions (news tier, in #debate); AuditCard (SARC/KKC history); Hero kicker "WIKIPEDIA + PMCARES.GOV.IN".
- Analytics beacons: `@vercel/analytics@2/react` + `@vercel/speed-insights@2/react` (**named exports on /react subpaths; root defaults are imperative inject bundles**).
- Design: navy #0F172A / blue #0369A1, Fira Sans + Fira Code (.tnum only), WCAG 2.1 AA. Light cards (bg-surface) inside dark sections = the deliberate "document vs chart" tier signal.

## Hard rules
1. Three tiers (see AGENTS.md); estimates labeled "estimate", computed values "derived", month-level dates when no day given. 2. Never sum 32-PSU vs 101-PSU figures. 3. Charts never color-only. 4. TDD mandatory; agent-gate (Analyzer→implement→Debugger+Verifier parallel→consensus→re-verify; max 3 attempts) for content/release changes; conservative phrasing wins disputes. 5. Excluded-by-absence (still): Vande Bharat, Tata ₹1,500 cr. PM CARES-for-Children NO LONGER excluded.

## Audit & verification history (compressed; 2026-08-15 → 08-21)
v1.4 clause-completeness (+65 items) → v1.5 dual re-audit (22 fixes) → v1.6 UI/UX (20 additive) → v1.7 FINAL clause-complete → 19 Aug SEO/GEO 3-role PASS (all endpoints 200; JSON-LD @graph valid; headings no skips; wikitext figures grep WITHOUT commas; check drift via API rvprop=timestamp) → v1.8 perf (Recharts code-split, entry 683→309 KB) → v1.9 analytics (cookieless beacons; GA4 rejected).

## SEO / GEO
Prerendered full HTML; JSON-LD (WebSite/WebPage/FAQPage-18Q/Dataset FY2019-20→FY2024-25, temporalCoverage 2020-03/2025-03); robots.txt welcomes AI crawlers; llms.txt (now with six-year + news sections); og-image 1200×630. GSC verified + sitemap; Bing imported; IndexNow key 0e7c80d58618f01b8673e21f543f7f13 (POST JSON body; GET-style params on POST = HTTP 411). sitemap lastmod 2026-08-28.

## Search & analytics state (2026-08-28)
- **GSC (28 Aug export, data 18–25 Aug)**: 26 impr / 0 clicks / avg pos 32.46 — post-index freshness spike decayed to ≈1/day; 0 clicks arithmetically expected (P(0)≈75–80% at these positions/CTR curves). **Verdict: no action.** Like-for-like anchor: "pm cares fund audit report" pos 22. Don't chase "bank account details"/"scanner"; NEVER self-link on Wikipedia (COI).
- **Weekly watch**: position + daily-impr rate + Devices/Countries (is India present?). 24/26 desktop + exotic 1-impr countries → audience likely dev/monitoring community. **Stop criterion (8–12 wks = mid-Oct–mid-Nov)**: daily impr ≤1–2 AND no query top-20 → structural ceiling → decide multi-page lever or accept. Title/meta churn deferred to then.
- **FAQ rich results removed for ALL sites 7 May 2026** — empty Search appearance is universal; FAQPage markup harmless, keep.
- **One-time human checks**: `site:` both domains (mirror consolidation = cross-domain canonical hint, invisible in Vercel-scoped GSC). Parked: mirror noindex.
- Keyword research: docs/research/2026-08-28-keyword-research.md — entity demand TRIPLED in 2026 (Wikipedia PV 1.7k→8.3k/mo, driven by the mid-Aug audit-release news cycle); phrasing-alias FAQs shipped in v2.0.
- Vercel Web Analytics ON; Speed Insights BLOCKED (Hobby 1-project slot held by other project — keep). AI-referral traffic shows in WA referrers, not GSC.
- Known minor: duplicate React key warning (two Timeline events share 2020-04-13) — harmless, unfixed by choice.

## Ops notes
- Deploy = `git push` → Vercel + GitHub Actions Pages mirror (runs tests). Vite base = `GITHUB_ACTIONS ? '/pm-cares-fund-information/' : '/'` (NOT `CI`). Explicit devDeps: esbuild, @types/node. Runtime: @vercel/analytics, @vercel/speed-insights.
- Release ritual: bump sitemap lastmod → push → live-check → IndexNow re-ping. (Used ×3 today.)
- PDF extraction recipe (reusable): curl PDF → pdftoppm -r 200/400 → Read (CDN URL) → 4.5v analyze_image (zai tools time out) → python identity checks → never trust single-pass digits.
- Agent-tool subagents worked all session (9+ launches); if harness interrupts launches, run the three roles DIRECTLY (proven fallback from 21 Aug session).
- Env files: .env.local|.dev|.staging|.production (VITE_SITE_NAME, VITE_ENV, VITE_DATA_AS_OF). .idea/ gitignored.

## Maintenance / next-session quickstarts
- **Wikipedia changed** (likely — it's stale and the audit is news): diff fresh wikitext vs fund.ts → the article may add FY22-25 figures; reconcile with auditedSeries (primary already wins; drop superseded article-tier caveats) → `node scripts/parse-references.mjs` if refs changed → sync exact-value tests → `npm test && npm run build` → push → release ritual.
- **New audited statement appears** (FY2025-26, expect ~Aug 2027 or earlier): same PDF recipe; extend auditedSeries (chain-continuity test will enforce opening = prior closing).
- **Watch-list (passive)**: GSC weekly; Vercel WA referrers; Bing WMT glance.
- **Parked (none requested)**: Speed Insights slot; section-view events via scrollspy; PSI API key; custom domain; dark mode; monthly wikitext-diff CI job; v2.2 NICE leftovers.
