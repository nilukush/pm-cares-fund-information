# MEMORY.md — Project Memory (compacted 2026-08-21, end of session)

## Status: v1.9 · DEPLOYED · Analytics live · All audits PASS · No pending work

Public-information website about India's PM CARES Fund, sourced from the English Wikipedia
article https://en.wikipedia.org/wiki/PM_CARES_Fund (data as of 16 Aug 2026; article last
revised 2026-08-09 — facts verified current at the 19 Aug audit).

- **Primary URL**: https://pm-cares-fund-information.vercel.app/ · **Mirror**: https://nilukush.github.io/pm-cares-fund-information/ (canonical → Vercel)
- **Repo**: github.com/nilukush/pm-cares-fund-information (public, main; NO domain purchase per user constraint)
- **Content**: every body-text clause of the article is on the page (v1.7 clause-complete audit). Headline-only citation figures appear only in a clearly-labeled list, never as facts.

## Run / verify
- `npm run dev` → :5199 · `npm run preview` → :4199 (strictPort, non-standard by constraint)
- `npm test` → 86/86 (fund 34 · App 24 · format 14 · references 3 · StructuredData 4 · ChartCard 2 · ChartSlot 2 · index-html 1 · analytics 1 · about 1)
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
Prerendered full HTML (crawlers/LLM bots without JS see everything); JSON-LD (WebSite/WebPage/FAQPage/Dataset); question-format H1; keyword title/description; Twitter card + og-image 1200×630; robots.txt welcomes AI crawlers (GPTBot/ClaudeBot/PerplexityBot/CCBot/Google-Extended/etc.); llms.txt (11 sections); noscript. Registered: GSC URL-prefix property (verified, sitemap submitted), Bing imported from GSC, IndexNow (key 0e7c80d58618f01b8673e21f543f7f13; re-ping command in commit 7237c1f — POST JSON body; GET-style params on POST = HTTP 411). sitemap lastmod currently 2026-08-19.

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
