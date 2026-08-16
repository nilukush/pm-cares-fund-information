# MEMORY.md — Project Memory (compacted 2026-08-16)

## Status: v1.4 DEPLOYED · FULL-ARTICLE COMPLETENESS · LIVE

Public-information website about India's PM CARES Fund, sourced from
https://en.wikipedia.org/wiki/PM_CARES_Fund (accessed 16 August 2026).

**v1.4 (16 Aug 2026) — completeness pass** (user asked: capture EVERY detail incl. SARC points,
references, external links): completeness-audit agent diffed all 25 article sections vs fund.ts
(~65 gaps found). Added: 22 new timeline events (42 total — AIIMS/3-hospital salary reversal,
Sharma PIL, Bombay/Delhi HC cases, Praveen Kumar complaint, Nadda 60k claim, state ventilator
deliveries, Jyoti/AMTZ failed trials, Trivitron, corpus statement, pmcares.fund game, APTEL,
emblem application, embassies RTI, Apr-2021 faults); new sections: **Litigation** (11-case
table), **Audit & auditors** card (full SARC/Gupta detail), **Who pledged support** card
(voluntary donors + 9 clearly-labeled headline-only amounts), **In popular culture** card,
**References** section (ALL 119 citations via `scripts/parse-references.mjs` — reusable parser
from raw wikitext; article has no External-links section, See-also = PMNRF + COVID-Crypto);
enriched criticism (10 items incl. CSR asymmetry/Kulbe, undisclosed spending rules), defence
quotes, litigation FAQ, relatedFundsNote, PSU/military/education/salary detail, first-allocation
notes, oxygen CMSS/Vipun Nayak. Tests 56 → 73. Prerendered HTML 77 KB → 173 KB.
**Verifier gate**: 31/34 OK initially; fixed 1 ERROR (CSR-exceeded detail belonged to 32-PSU
Aug-2020 RTI, not 101-PSU) + 2 unsupported ("registered by NIC" → RTI filed with NIC allotted
gov-domain; Sharma sort-key aligned to cited report) + 4 nuances (ToI referent, scare quotes,
"wrote to the PM" not "open letter", PhonePe "alleged"). DATA_AS_OF → 16 Aug 2026 (footer,
About, llms.txt, tests updated).

**Search engine registration (16 Aug 2026, user-performed steps + agent support)**:
- Google Search Console: URL-prefix property `https://pm-cares-fund-information.vercel.app/`
  verified via HTML file (`public/googled3cc5e1274fa98d4.html`); sitemap submitted. (Note:
  Domain-property verification is impossible for a vercel.app subdomain — no DNS control.)
- Bing Webmaster Tools: imported from GSC (covers Yahoo + DuckDuckGo).
- IndexNow enabled: key file `public/0e7c80d58618f01b8673e21f543f7f13.txt`, first ping
  accepted (HTTP 202). Re-ping after notable content updates:
  `curl -X POST https://api.indexnow.org/indexnow -H "Content-Type: application/json" -d '{"host":"pm-cares-fund-information.vercel.app","key":"0e7c80d58618f01b8673e21f543f7f13","keyLocation":"https://pm-cares-fund-information.vercel.app/0e7c80d58618f01b8673e21f543f7f13.txt","urlList":["https://pm-cares-fund-information.vercel.app/"]}'`
  (POST needs a JSON body — bare GET-style params on POST return HTTP 411.)

**v1.3 (16 Aug 2026) — SEO + GEO**: prerender full page to static HTML at build (`scripts/prerender.mjs`, esbuild CJS bundle + react-dom/server renderToString injected into dist/index.html — ~73 KB of content, crawlers/LLM bots without JS now see everything); schema.org JSON-LD (WebSite/WebPage/FAQPage 11 Q&As/Dataset, `src/components/StructuredData.tsx`); question-format H1; keyword-front-loaded title+description; Twitter card + vision-verified 1200×630 og-image.png; robots.txt explicitly welcomes AI crawlers (GPTBot/ClaudeBot/PerplexityBot/CCBot/Google-Extended/etc.); `public/llms.txt` GEO convention file; noscript fallback. Tests 50 → 56. Deploy lessons: (1) esbuild must be an explicit devDependency — Vite 8 uses rolldown, esbuild isn't hoisted in CI; (2) qlmanage SVG thumbnails are square-letterboxed (center-crop with sips) and cached by input filename (use unique names); (3) esbuild bundling CJS react-dom/server into ESM breaks `require('util')` — emit CJS format instead.

**v1.2 (16 Aug 2026)**: PRIMARY host moved to **Vercel** — https://pm-cares-fund-information.vercel.app/ (free Hobby tier, project-named subdomain chosen for credibility; NO domain purchase per user constraint). Vercel CLI 54.15.0, authed as `nilukush` via GitHub device flow; GitHub repo connected to the Vercel project (push to main = auto-deploy). GitHub Pages kept as MIRROR. Key config: Vite base prefix keys off `GITHUB_ACTIONS` (NOT `CI` — Vercel also sets CI=true); canonical/og:url/robots/sitemap point to the vercel.app domain.

**v1.1 (16 Aug 2026)**: Added "About this site" section (`src/components/About.tsx`, `about` export in fund.ts) — mission, editorial principles (single source / labeled uncertainty / both sides no verdict / no tracking), 3-step verification methodology, known limitations, GitHub-issues feedback button. Nav now has 9 items. Tests 44→50 (TDD: 3 about-data + 3 App tests). No domain purchase per user constraint — stays on GitHub Pages.

- **Live URL**: https://nilukush.github.io/pm-cares-fund-information/ (HTTP 200 verified; robots.txt + sitemap.xml serve; asset bundle loads under the Pages base path)
- **Repo**: github.com/nilukush/pm-cares-fund-information (public, `main`). Git initialized 16 Aug 2026; gh CLI used (`nilukush`, scopes repo+workflow).
- **CI/CD**: `.github/workflows/deploy.yml` — on push to main: npm ci → npm test (44) → build (CI=true sets Vite `base` to `/pm-cares-fund-information/`) → upload-pages-artifact → deploy-pages. Pages enabled via `gh api .../pages -f build_type=workflow`.
- **Deploy lesson**: `process.env.CI` in vite.config.ts required an explicit `@types/node` devDependency (transitive types weren't hoisted in clean CI) — fixed in commit "fix(ci)".

## Run / verify
- `npm run dev` → http://localhost:5199 · `npm run preview` → http://localhost:4199 (strictPort, non-standard by constraint)
- `npm test` → 44/44 (format 14 · fund data 20 · App integration 10) · `npx tsc --noEmit` clean · `npm run build` OK (~183 KB gzip; Recharts dominates — accepted)

## Stack & architecture (decided — do not re-litigate)
Vite 8 + React 19 + TypeScript strict + Tailwind 4 (`@theme` tokens in `src/index.css`) + Recharts 3 + Vitest 4/RTL (jsdom, `globals:false`, cleanup wired in `src/test/setup.ts`). No router/backend.
- `src/data/fund.ts` — single source of truth for ALL content/figures (typed; estimates/derived flagged)
- `src/lib/format.ts` — `formatCrore`/`formatINR` (Indian grouping, 10,990.17 → "₹10,990.17 cr")/`formatPercent`; invalid → "—"
- `src/components/*` — one file per section; `ChartCard` = chart + aria-label + visible data table; notes go in the `note` prop, never inside `role="img"` (screen-reader rule)
- Design: "Accessible & Ethical" (ui-ux-pro-max skill) — navy #0F172A / blue #0369A1, bento stat cards, WCAG-AA

## Content invariants (hard rules)
1. Every figure traceable to the Wikipedia article; estimates labeled "estimate", arithmetic labeled "derived" (e.g. ventilator ₹2,000 cr = 3,100−1,000−100).
2. Never sum overlapping PSU figures (32 PSUs ₹2,105 cr Aug 2020 vs 101 PSUs ₹2,400 cr + ₹155 cr Dec 2020).
3. Month-level dates where the article gives no day; never invent a day.
4. Article contains NO Vande Bharat / PM CARES-for-Children / Tata ₹1,500 cr figures — deliberately excluded.
5. Key verified figures: FY19-20 receipts 3,076.62; FY20-21 receipts 10,990.17, balance 7,013.99; donor mix 53/42/5 (ToI estimate); first allocation 13 May 2020 = 3,100 (2,000 derived + 1,000 migrants + 100 vaccine); ventilators 50,000→2,923; oxygen 162→11 (Scroll) / 33 (govt) / Delhi 8→1.
6. No derived "spent" chart figure — FY21 spend is ambiguous (receipts−balance vs opening+receipts−balance); site shows exact table figures + quotes The Hindu "one-third spent" headline.

## Agent team (3-agent consensus gate — history)
- Round 1: Debugger HOLD (2 majors: timeline chip 2.65:1 contrast → fixed to text-chart-1; notes inside role="img" → ChartCard note slot). Verifier FAIL (7 ERRORs, 8 UNSUPPORTED — mostly Analyzer-brief hallucinations vs wikitext: invented IIT breakdown, wrong bank list, 3 wrong dates, misattributed "stone-hearted", unsupported defence quotes, PMNRF rows). All fixed.
- Round 2: Debugger SHIP. Verifier caught 1 new ERROR (fake-UPI clarification credited to PM; article says "Press Bureau of India") — fixed verbatim. Analyzer partial dissent → moot (its 2 contested PMNRF facts were already present).
- Round 3 FINAL: **Analyzer CONSENSUS · Debugger SHIP · Verifier PASS.** Every figure/date/actor/quote verified against live wikitext. Analyzer's non-blocking caveat applied ("Press Bureau of India" kept verbatim; real agency is PIB — noted in dataCaveats).
- Process rule proven: wikitext (`action=raw`) is the fact authority; conservative phrasing wins disputes.

## Docs
`docs/ANALYSIS.md` + `docs/PLAN.md` (process artifacts) · `CLAUDE.md` (project context/invariants) · `AGENTS.md` (TDD + a11y + agent-gate rules) · `README.md` (public) · env files: `.env.local|.dev|.staging|.production` (VITE_SITE_NAME, VITE_ENV, VITE_DATA_AS_OF).

## Maintenance / next-session quickstarts
- **Refresh data when Wikipedia changes**: edit only `src/data/fund.ts` + sync exact-value assertions in `fund.test.ts` → `npm test && npm run build`. Re-run the Verifier-style wikitext cross-check first.
- **Possible future work** (none requested): code-split Recharts below the fold; add dark mode pairing; deploy to a static host; screenshot-based visual QA.
