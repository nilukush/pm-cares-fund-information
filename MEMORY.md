# MEMORY.md — Project Memory (compacted 2026-08-16, end of session)

## Status: v1.8 · DEPLOYED · SEO/GEO audit PASS · No pending work

Public-information website about India's PM CARES Fund, sourced from the English Wikipedia
article https://en.wikipedia.org/wiki/PM_CARES_Fund (accessed 16 Aug 2026; verified
byte-identical across all audits that day).

- **Primary URL**: https://pm-cares-fund-information.vercel.app/ · **Mirror**: https://nilukush.github.io/pm-cares-fund-information/ (canonical → Vercel)
- **Repo**: github.com/nilukush/pm-cares-fund-information (public, main; NO domain purchase per user constraint)
- **Content**: every body-text clause of the article is on the page (6 audit rounds, final independent clause-by-clause audit = COMPLETE). Headline-only citation figures appear only in a clearly-labeled list, never as facts.

## Run / verify
- `npm run dev` → :5199 · `npm run preview` → :4199 (strictPort, non-standard by constraint)
- `npm test` → 85/85 (fund data 34 · App 24 · format 14 · references 3 · StructuredData 4 · ChartCard 2 · ChartSlot 2 · index-html 1 · about 1)
- `npx tsc --noEmit` clean · `npm run build` = tsc + vite build + **prerender** (`scripts/prerender.mjs`, esbuild CJS bundle + renderToString injected into dist/index.html ≈ 198 KB content)

## Stack & architecture (decided — do not re-litigate)
Vite 8 + React 19 + TS strict + Tailwind v4 (`@theme` tokens in src/index.css) + Recharts 3 + Vitest 4/RTL (globals:false; cleanup in src/test/setup.ts). No router/backend.
- `src/data/fund.ts` — ALL content (identity+audit, finances, donations incl. voluntaryDonors+headline-only, military, salary examples, firstAllocation, oxygen+ventilator programmes incl. state deliveries/hospital episodes, popularCulture, 42-event timeline, criticism 10 / defence 4, PMNRF table + relatedFundsNote, litigation 11, faq 12, caveats 9, about)
- `src/data/references.ts` — AUTO-GENERATED (119 citations + seeAlso) by `scripts/parse-references.mjs` (re-run against fresh wikitext; never hand-edit). Parser gotchas fixed: first-param pipe, apostrophe-safe JSON output, `{{!}}` escaped pipes (normalize in wikitext BEFORE parsing or the lazy `}}` capture truncates titles).
- `src/components/*` — per-section; ChartCard (chart + aria-label + numericColumns mono-only table + note slot OUTSIDE role="img"); icons.tsx (11 hand-drawn SVGs); ScrollChrome (progress bar + back-to-top); Header (NAV_ITEMS export + scrollspy IntersectionObserver, guarded for jsdom).
- Design system: "Accessible & Ethical" — navy #0F172A / blue #0369A1, Fira Sans + Fira Code (.tnum figures only), WCAG 2.1 AA.

## Hard rules (unchanged)
1. Every fact traceable to the article; estimates labeled "estimate", arithmetic labeled "derived", month-level dates when article gives no day. 2. Never sum 32-PSU vs 101-PSU figures. 3. Charts never color-only: labels + legend + table + aria-label. 4. TDD mandatory; agent-gate (Analyzer/Debugger/Verifier-style) for content or release changes; wikitext (action=raw) is the fact authority, conservative phrasing wins disputes. 5. Excluded-by-absence: Vande Bharat, PM CARES-for-Children, Tata ₹1,500 cr (not in article).

## Audit & verification history (2026-08-15/16)
1. Analyzer brief → build; 2. Verifier rounds 1-3 (killed 7 ERROR-class hallucinations incl. wrong bank list/invented IIT breakdown; final consensus Analyzer/Debugger/Verifier). 3. v1.4 completeness pass (+65 items; new Litigation/Audit/Voluntary-donors/Popular-culture/References sections; 2 more Verifier fixes). 4. v1.5 dual re-audit (source-side + live-site; 22 fixes incl. Ahmedabad/Karnataka counts, expert-advisors defence, SARC Gupta detail, parser pipe bug). 5. v1.6 UI/UX audit (agent + screenshots; 20 additive fixes — invisible Debate headings WCAG failure, scrollspy, KPI strip, year-grouped timeline, scroll chrome, accessibilityLayer, icons; zero info removed). 6. Table readability fix (user-reported: mono font only on numeric columns). 7. v1.7 FINAL audit: clause-complete except 4 sub-clauses → added verbatim (DUTA channels, PMO PSU-RTI denial, IPC glosses, PMNRF disclosure), grep-verified live.

## SEO / GEO (v1.3+)
Prerendered full HTML (crawlers/LLM bots without JS see everything); JSON-LD (WebSite/WebPage/FAQPage 12/Dataset); question-format H1; keyword title/description; Twitter card + og-image.png 1200×630; robots.txt explicitly welcomes AI crawlers (GPTBot/ClaudeBot/PerplexityBot/CCBot/Google-Extended/etc.); llms.txt (11 sections); noscript. Registered: GSC URL-prefix property (HTML-file verified, sitemap submitted), Bing imported from GSC, IndexNow (key 0e7c80d58618f01b8673e21f543f7f13; re-ping command in git history/MEMORY v1.3 note — POST with JSON body; GET-style params on POST = HTTP 411).

## Ops notes
- Deploy = `git push` → Vercel (auto, primary) + GitHub Actions → Pages mirror (runs tests). Vite base = `GITHUB_ACTIONS ? '/pm-cares-fund-information/' : '/'` (NOT `CI` — Vercel sets CI too).
- esbuild and @types/node are EXPLICIT devDeps (not hoisted in clean CI).
- macOS tooling gotchas: qlmanage SVG thumbnails are square-letterboxed (center-crop with sips) and cached by input filename (use unique names); headless-Chrome anchor-URL screenshots don't settle under smooth-scroll — capture full-page tall window and crop with sips.
- Env files: .env.local|.dev|.staging|.production (VITE_SITE_NAME, VITE_ENV, VITE_DATA_AS_OF). .idea/ gitignored.

## SEO/GEO audit (2026-08-19) — PASS, no content drift
3-role audit (Analyzer/Debugger/Verifier run directly after subagent launches were interrupted twice). No MAJOR findings. Verified live: all endpoints 200 (robots/sitemap/llms.txt/og-image 1200×630/IndexNow key/GSC file), single valid JSON-LD @graph (WebSite+WebPage+FAQPage 12Q+Dataset), headings h1×1/h2×11/h3×40/h4×14 no skips, all 11 anchor ids in prerendered HTML, gzip+cache HIT, Pages mirror canonical→Vercel + correct base-path assets. Wikipedia last rev 2026-08-09 < data-as-of 16 Aug → facts intact (₹3,076.62/10,990.17/7,013.99 crore appear in raw wikitext as 3076.62/10990.17/7013.99 — format variance, not drift). Open items (optional): code-split Recharts (683 KB single JS bundle = only real flag); og/twitter title raw `&` → `&amp;`; PSI anonymous quota exhausted — retry with free API key; FAQ rich snippets unlikely post-2023 Google policy (schema kept for GEO value).

## Maintenance / next-session quickstarts
- **Wikipedia changed**: diff fresh wikitext (`curl 'https://en.wikipedia.org/w/index.php?title=PM_CARES_Fund&action=raw'`) vs data → edit `fund.ts` (+ `node scripts/parse-references.mjs` if refs changed) → sync exact-value tests → `npm test && npm run build` → push → re-run an audit-agent clause sweep → IndexNow re-ping.
- **Optional future work** (none requested): custom domain if constraints change; dark mode; code-split Recharts; periodic (monthly) article-diff check could be a scheduled CI job.
