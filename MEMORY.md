# MEMORY.md — Project Memory (compacted 2026-08-16)

## Status: v1.0 DEPLOYED · LIVE · 3-agent consensus achieved

Public-information website about India's PM CARES Fund, built 15 Aug 2026 from
https://en.wikipedia.org/wiki/PM_CARES_Fund (accessed 15 Aug 2026). No pending work.

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
