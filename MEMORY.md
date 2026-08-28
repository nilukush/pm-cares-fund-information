# MEMORY.md — Project Memory (compacted 2026-08-28 #2 — docs-hygiene audit session closed; v2.2.1 + repo docs all live)

## Status: v2.2.1 · DEPLOYED (28 Aug) · Three source tiers · 141/141 tests · All gates PASS · repo docs audited 28 Aug (3-role)

Public-information website about India's PM CARES Fund, now the most complete public
compilation of its audited figures (ahead of Wikipedia). **Three labeled tiers**
(policy in AGENTS.md): `article` (English Wikipedia, data as of 16 Aug 2026 — article
stale, tagged "needs update July 2026"), `primary` (pmcares.gov.in audited statements
FY2019-20→FY2024-25 — ALL SIX PDFs fetched, vision-extracted, identity-verified 28 Aug;
wins all conflicts), `news` (attributed Aug 2026 coverage; name+outlet+date required;
conflicting news figures dropped, never averaged).

- **Primary URL**: https://pm-cares-fund-information.vercel.app/ · **Mirror**: https://nilukush.github.io/pm-cares-fund-information/ (canonical → Vercel)
- **Repo**: github.com/nilukush/pm-cares-fund-information (public, main; NO domain purchase per user constraint)

## Session 2026-08-28 (v2.0 → v2.2.1, all deployed + live-checked + IndexNow'd)

**Primary-tier record (all identity-verified: opening + receipts-during − payments = closing, rupee precision; chain-continuous):**
- Closings: 3,076.62 / 7,013.99 / 5,415.66 / 6,283.68 / 7,173.03 / 8,452.07 cr (FY19-20→FY24-25). Six-year receipts-during 16,598.87 cr; payments 8,146.81 cr (both derived).
- FY24-25 detail: opening 7,173.03; receipts-during 1,279.91 (derived; domestic 479.05, foreign 0.93, int-SB 5.77, int-FD 469.38, TDS 0.13, agency refunds 324.66); payments 0.88 cr (₹87,85,291 = Children ₹87,84,840 + ₹451 charges); closing 8,452.07 (SB 605.41 + FD 7,846.65 ≈ 93% FD).
- FY22-23 payments 437.87 = Children 346.00 + 99,986 oxygen concentrators 91.87 + fees. Domestic donations declined every year: 7,183.78→1,896.76→908.13→681.81→479.05.
- **CORRECTION (v2.1)**: wikitext's FY20-21 "Receipts 10,990.17" is a receipts-side TOTAL incl. the 3,076.62 opening — new money 7,913.55 (derived). Old "₹14,066.79 both years" KPI double-counted → deleted. Every surface now consistent (v2.2.1 closed the last one, the noscript).
- **Auditors**: SARC (FRN 006085N, Sunil Kumar Gupta M.No 084884) FY19-20→FY22-23, 4 FYs, UDINs 22084884AXGCSU1642 (30.09.2022) / 24084884BKIKDZ2614 (29.03.2024) → KKC & Associates LLP (formerly Khimji Kunverji & Co LLP; Tejas Parikh M.No 123215) FY23-24+FY24-25, Mumbai 7 Aug 2026, trust sign-off Delhi 6 Aug; no UDIN on KKC statements (CA Modani: correctable oversight).
- **News tier** (7 outlets, 18–22 Aug 2026; jointly released 18 Aug after ~2-yr gap, The Hindu reported it 8 Aug; disclosure lags 6/12/28 months): Bhardwaj/NCPRI, Batra, Nayak/CHRI, Khera criticism + Telegraph govt defence (reserved for crises; FD cushion) + CA observations.
- **v2.2 consolidation**: Finances = KPI strip (six-year receipts/payments, auditor, latest balance) + ToI donut → SixYearRecord (bar + 5-col table incl. printed side-totals + donations-by-year table + FY24-25 `<details open>` deep-dive). CoverageReactions in #debate. FinancesBarChart deleted (exactly 4 charts, test-locked). FAQ 18 (5 phrasing aliases), timeline 45 events, caveats 15.
- News errors caught: India This Week "interest 407.50" (statement: 137.69) dropped; Frontline's ₹346 cr children figure CORRECT (34.60/403.27 alternative rejected via 400/600dpi re-reads + triangulation).
- **Gate lessons (why the gate exists)**: Analyzer caught a payments crore slip (0.88 not 0.09); Verifier caught two 10× errors (foreign 0.93, TDS 0.13 — divided by 10⁸ not 10⁷); Debugger caught a false "only spending since FY22-23" claim. **NEVER convert lakh/crore mentally — 1 crore = 10⁷ — always python. Vision OCR of Indian digit-grouping is unreliable: transcribe, verify against accounting identities (identities are ground truth), re-read 400–600dpi on dispute, triangulate with news.**

**v2.2.1 — SEO/GEO audit round 2 (PLAN Step 30, TDD + gate, shipped same session):**
- Audit verdicts (3-role consensus, docs/research/2026-08-28-seo-geo-audit.md): Technical SEO PASS; SEO performance PASS-needs-patience; GEO PASS-with-concerns → fixed.
- Fixes: noscript FY2020-21 sentence corrected (3,076.62 + 7,913.55 new money; 10,990.17 gone — test-locked); Dataset variableMeasured row 1 → "Receipts-side total as printed (article tier, ₹ crore)"; WebPage dateModified + Dataset modifiedDate = DATA_AS_OF_ISO ('2026-08-28', new fund.ts export); FAQ phrasing aliases ("total amount received across the six audited years … 16,598.87 (derived)" + "entire recorded programme utilization"). Tests 137→141.
- **vite-node gotcha**: missing named imports resolve as `undefined` (no link error) — a `toBe(undefined)` comparison false-passes; always assert export format/shape too.
- **llms.txt demoted to hedge (research-backed)**: no major AI crawler fetches it (Ahrefs 137K sites: 97% never; log audits ~0.14%; Mueller "no AI system uses it"). KEEP (zero cost, briefing doc, 5 tests) but not a lever. Real GEO levers: sourced statistics (+40% citations, Princeton GEO paper), attributed quotes, answer-first structure, top-10 Google rankings (38% of AI-Overview citations), off-site brand mentions (out of scope here).
- Research docs: docs/research/2026-08-28-keyword-research.md, 2026-08-28-audit-sources.md (fact inventory), 2026-08-28-seo-geo-audit.md.

### Docs-hygiene audit (same day, session 2 — user-requested; 3-role gate, round-2 double-APPROVE; commits 19158a9/8360927/8765960, all pushed, Pages CI green, live-checked)
- Verdict: README materially stale (described the v1.x Wikipedia-only product: "44/50 tests", "11 Q&As", "20-event", chart deleted in v2.2, wrong provenance + 15-Aug date); LICENSE/CONTRIBUTING absent; CLAUDE/MEMORY test split didn't sum (claimed 156, phantom "about" file — exact: fund 67 · App 37 · format 14 · references 3 · StructuredData 8 · ChartCard 2 · ChartSlot 2 · index-html 2 · analytics 1 · llms 5).
- Shipped: README rewritten (three-tier sourcing w/ correct dates, current 4 charts, full project layout, License + Contributing sections); CONTRIBUTING.md added (issue-first, tier weighing, TDD/gates); deploy.yml step → "Test"; package.json → 2.2.1 + three-tier description (+ lockfile sync). **License: MIT (code) in LICENSE + CC BY-SA 4.0 (content) in LICENSE-CONTENT** — CC BY-SA because article-tier text adapts Wikipedia; facts-not-copyrightable notice included; user ratified, then ok'd the split so GitHub detects the MIT badge.
- **Anti-rot policy (now in AGENTS.md): NO test/FAQ/event counts in README or CI step names — exact counts live only in CLAUDE.md/MEMORY.md, re-count when the suite changes.**
- Deploy: dist byte-identical → lastmod NOT bumped, IndexNow NOT pinged; both URLs 200 live-checked; GitHub serves new README/LICENSE(-CONTENT)/CONTRIBUTING.
- Parked from audit: index.html meta + StructuredData.tsx "audited FY2024-25 statement" (singular → six-statement + news-tier phrasing, content-gate owned, next content pass); fund.ts "over 130 tests" (true, next content pass); robots.txt newer AI tokens (cosmetic — `User-agent: *` allows all); git tags (v2.2.1 untagged); Node engines pin.

## Run / verify
- `npm run dev` → :5199 · `npm run preview` → :4199 (strictPort, non-standard by constraint)
- `npm test` → 141/141 (fund 67 · App 37 · format 14 · references 3 · StructuredData 8 · ChartCard 2 · ChartSlot 2 · index-html 2 · analytics 1 · llms 5 — exact split; re-count when the suite changes)
- `npx tsc --noEmit` clean · `npm run build` = tsc + vite build + prerender (~244 KB content injected into dist/index.html)

## Stack & architecture (decided — do not re-litigate)
Vite 8 + React 19 + TS strict + Tailwind v4 (`@theme` tokens in src/index.css) + Recharts 3 + Vitest 4/RTL (globals:false; cleanup in src/test/setup.ts). No router/backend.
- `src/data/fund.ts` — ALL content incl. DATA_AS_OF_ISO; identity+audit, finances (article rows w/ sourceTier + fy202021ReceiptsNote), auditedStatementFY202425, auditedSeries + auditedSeriesTotals, donationsByYear, news tier arrays, donations, military, salary examples, firstAllocation, oxygen+ventilator programmes, popularCulture, 45-event timeline, criticism 10 / defence 4, PMNRF table, litigation 11, faq 18, caveats 15, about.
- `src/data/references.ts` — AUTO-GENERATED (119 citations) by `scripts/parse-references.mjs` (re-run against fresh wikitext; never hand-edit; gotchas: first-param pipe, apostrophe-safe JSON, `{{!}}` normalize BEFORE parsing).
- Components: ChartCard (aria-label + tnum table + note OUTSIDE role="img"); ChartSlot (mount-time dynamic import, alive-flag guard); **charts.tsx = exactly 4 charts** (AuditedBalanceBarChart, FinancesDonutChart, DonationsBarChart [useDesktop hook], SpendingBarChart) as ONE lazy chunk; AuditedStatement (folded deep-dive); SixYearRecord; CoverageReactions (#debate); AuditCard; Hero kicker "WIKIPEDIA + PMCARES.GOV.IN"; StructuredData (WebSite/WebPage+dateModified/FAQPage-18Q/Dataset+modifiedDate, @graph).
- Analytics beacons: `@vercel/analytics@2/react` + `@vercel/speed-insights@2/react` (named exports on /react subpaths).
- Design: navy #0F172A / blue #0369A1, Fira Sans + Fira Code (.tnum only), WCAG 2.1 AA. Light cards (bg-surface) inside dark sections = "document vs chart" tier signal.

## Hard rules
1. Three tiers (see AGENTS.md); estimates labeled "estimate", computed values "derived", month-level dates when no day given. 2. Never sum 32-PSU vs 101-PSU figures. 3. Charts never color-only. 4. TDD mandatory; agent-gate (Analyzer→implement→Debugger+Verifier parallel→consensus→re-verify; max 3 attempts) for content/release changes; conservative phrasing wins disputes. 5. Vande Bharat, Tata ₹1,500 cr still excluded-by-absence.

## Audit & verification history (compressed; 2026-08-15 → 08-28)
v1.4 clause-completeness → v1.5 dual re-audit → v1.6 UI/UX → v1.7 FINAL clause-complete → 19 Aug SEO/GEO 3-role PASS → v1.8 perf (Recharts code-split) → v1.9 analytics → v2.0 aliases → v2.1 six-year+news (first 10× catch) → v2.2 consolidation (first round-1 double-APPROVE) → 28 Aug SEO/GEO audit r2 with GSC data → v2.2.1 fixes same session → 28 Aug docs-hygiene audit (README/LICENSE/CONTRIBUTING; round-2 double-APPROVE).

## SEO / GEO
Prerendered full HTML; JSON-LD @graph valid (WebSite/WebPage+dateModified/FAQPage-18/Dataset+modifiedDate, temporalCoverage 2020-03/2025-03); robots.txt welcomes AI crawlers (current official tokens); llms.txt = hedge only (see gate lessons above); og-image 1200×630. GSC verified + sitemap; Bing imported; IndexNow key 0e7c80d58618f01b8673e21f543f7f13 (POST JSON body; GET-style params on POST = HTTP 411). sitemap lastmod 2026-08-28.

## Search & analytics state (2026-08-28)
- **GSC (28 Aug export, data 18–25 Aug)**: 26 impr / 0 clicks / avg pos 32.46. Cross-foots exactly (devices/countries/daily = 26; queries table 6 of 26, rest privacy-anonymized). **P(0 clicks) ≈ 99.4%** at these positions — 0 clicks arithmetically expected. Freshness spike decayed 5.5→1.0 impr/day. India best-positioned country (9 impr @ 21.78). **Verdict: no action.**
- Anchor query: "pm cares fund audit report" pos 22. Don't chase "bank account details"/"scanner" (donation-intent → pmcares.gov.in); NEVER self-link on Wikipedia (COI).
- **Weekly watch**: position + daily-impr rate + Devices/Countries. **Stop criterion (8–12 wks = mid-Oct–mid-Nov)**: daily impr ≤1–2 AND no query top-20 → structural ceiling → decide multi-page lever or accept. Title/meta churn deferred to then.
- FAQ rich results removed for ALL sites 7 May 2026 — empty Search appearance is universal; FAQPage markup harmless, keep.
- **One-time human checks**: `site:` both domains; Bing WMT position glance.
- Keyword research: docs/research/2026-08-28-keyword-research.md — entity demand TRIPLED in 2026 (Wikipedia PV 1.7k→8.3k/mo); alias FAQs + phrasing ("total amount", "utilization") now shipped.
- Vercel Web Analytics ON; Speed Insights BLOCKED (Hobby 1-project slot). AI-referral traffic shows in WA referrers, not GSC.
- Known minor: two duplicate React key warnings — Timeline `2020-04-13` ×2, and caveats sharing the `The Wikipedia article is` prefix (fund.ts two caveats) — both harmless, unfixed by choice.

## Ops notes
- Deploy = `git push` → Vercel + GitHub Actions Pages mirror (runs tests). Vite base = `GITHUB_ACTIONS ? '/pm-cares-fund-information/' : '/'` (NOT `CI`). Explicit devDeps: esbuild, @types/node. Runtime: @vercel/analytics, @vercel/speed-insights.
- Release ritual: bump sitemap lastmod → push → live-check → IndexNow re-ping (used 28 Aug ×4 incl. v2.2.1).
- PDF extraction recipe: curl PDF → pdftoppm -r 200/400 → Read (CDN URL) → 4.5v analyze_image → python identity checks → never trust single-pass digits.
- Agent-tool subagent launches interrupted 3× across sessions; direct-role fallback (run Analyzer/Debugger/Verifier inline) is proven — use it immediately on interruption.
- Env files: .env.local|.dev|.staging|.production (VITE_SITE_NAME, VITE_ENV, VITE_DATA_AS_OF). .idea/ gitignored.

## Maintenance / next-session quickstarts
- **Wikipedia changed** (likely — it's stale and the audit is news): diff fresh wikitext vs fund.ts → reconcile with auditedSeries (primary wins; drop superseded article-tier caveats) → `node scripts/parse-references.mjs` if refs changed → sync exact-value tests → `npm test && npm run build` → push → release ritual.
- **New audited statement appears** (FY2025-26, expect ~Aug 2027 or earlier): PDF recipe; extend auditedSeries (chain-continuity test enforces opening = prior closing); bump DATA_AS_OF_ISO.
- **Watch-list (passive)**: GSC weekly; Vercel WA referrers; Bing WMT glance.
- **Parked (none requested)**: Speed Insights slot; section-view events; PSI API key; custom domain; dark mode; monthly wikitext-diff CI job; v2.2 NICE leftovers (split six-year note into paragraphs; tighten deep-dive containment test; lone-donut grid wrapper).
