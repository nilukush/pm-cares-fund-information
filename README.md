# PM CARES Fund — Facts, Figures & Timeline

**Live site: https://pm-cares-fund-information.vercel.app/**
(mirror: https://nilukush.github.io/pm-cares-fund-information/)

A single-page, citizen-friendly public-information website presenting India's PM CARES
Fund graphically: what it is, the six-year audited money record (FY2019-20 → FY2024-25),
what was allocated, how delivery tracked against promises, and the transparency debate.

## Data sourcing — three labeled tiers

Every figure on the site belongs to one of three clearly labeled source tiers
(policy in [`AGENTS.md`](AGENTS.md)):

- **`article`** — the [English Wikipedia article](https://en.wikipedia.org/wiki/PM_CARES_Fund)
  (accessed 16 Aug 2026; the article itself is tagged "needs update" and its financial
  table stops at FY2020-21): the baseline for identity, history and narrative.
- **`primary`** — the fund's own audited Receipts & Payments accounts, FY2019-20 →
  FY2024-25, from [pmcares.gov.in](https://www.pmcares.gov.in/) (accessed 28 Aug 2026).
  Every figure was verified against each statement's own accounting identities at rupee
  precision. **This tier wins all conflicts** and holds figures Wikipedia does not have.
- **`news`** — attributed August 2026 coverage (criticism and the government's defence);
  each item carries name + outlet + date. News figures that conflict with an audited
  statement are dropped, never averaged.

Tiers are never mixed in one chart or one total. Estimates are labeled "estimate",
derived arithmetic is labeled "derived", and the overall data-as-of date lives in
`DATA_AS_OF_ISO` in `src/data/fund.ts`.

## Highlights

- **The six-year audited record**: closing balances FY2019-20 → FY2024-25 from the
  fund's audited statements, with a printable per-year table and an expandable
  FY2024-25 deep-dive.
- **Graphical, quick to scan**: audited closing-balance bars (primary tier), finances
  donut, institutional-donation bars, spending chart, promise-vs-delivery CSS progress
  bars, and a multi-year category-coded timeline.
- **Data transparency**: every chart has a visible data table, values carry units
  (₹ crore), and a caveats section explains what to keep in mind.
- **Neutrality**: criticism and the government's defence are presented side by side; the
  footer carries a non-affiliation disclaimer.
- **Accessibility-first**: WCAG 2.1 AA targets — skip link, landmarks, keyboard navigable,
  aria-labelled charts with table alternatives, reduced-motion support, 375px-safe layout.

## Quick start

```bash
npm install
npm run dev        # http://localhost:5199  (non-standard port, intentional)
```

Other commands:

```bash
npm test           # Vitest — unit + integration (exact count maintained in CLAUDE.md)
npm run build      # typecheck (tsc --noEmit) + bundle + prerender → dist/
npm run preview    # http://localhost:4199  (non-standard port, intentional)
```

## Project layout

```
src/
├── data/fund.ts            # single source of truth — ALL content & figures (typed, three tiers)
├── data/references.ts      # AUTO-GENERATED citation list (scripts/parse-references.mjs) — do not hand-edit
├── lib/format.ts           # Indian-locale formatters (₹ crore, 1,23,456 grouping)
├── components/             # sections, ChartCard/ChartSlot (a11y chart wrapper), charts.tsx
│                           #   (the four lazy-loaded Recharts charts), StructuredData (JSON-LD)
├── App.tsx                 # page assembly
└── test/setup.ts           # RTL cleanup (globals: false)
scripts/
├── prerender.mjs           # post-build: injects fully-rendered HTML into dist/index.html
└── parse-references.mjs    # regenerates src/data/references.ts from live Wikipedia wikitext
public/                     # robots.txt (welcomes AI crawlers), sitemap.xml, llms.txt, og-image.png
docs/                       # ANALYSIS.md, PLAN.md (process artifacts), research/ (audits)
.github/workflows/deploy.yml  # GitHub Pages mirror CI (install → test → build → deploy)
.env.local|.dev|.staging|.production
```

## Data provenance & refresh

All facts live in `src/data/fund.ts` — no other file holds content. When a source
changes:

- **Wikipedia article changes** → reconcile `fund.ts` against the audited series
  (the primary tier wins conflicts), regenerate `src/data/references.ts` with
  `node scripts/parse-references.mjs`, and keep the exact-value tests in sync.
- **A new audited statement appears** (next expected: FY2025-26) → extend the audited
  series; a chain-continuity test enforces opening balance = prior closing balance.

Both paths end with `npm test && npm run build`.

## Deployment

**Primary: Vercel** — https://pm-cares-fund-information.vercel.app/. The GitHub
repository is connected to the Vercel project, so every push to `main` auto-deploys.
**Mirror: GitHub Pages** — the same pushes run `.github/workflows/deploy.yml`
(install → test → build → deploy) and keep the `github.io` URL live. The
`/pm-cares-fund-information/` asset prefix applies only on GitHub Actions
(`GITHUB_ACTIONS`, not `CI` — Vercel sets `CI=true` too); the canonical URL,
`og:url`, `robots.txt` and `sitemap.xml` point to the Vercel domain.

## SEO & GEO (search engines + LLM visibility)

- **Prerendered**: the build injects the fully-rendered page into `index.html`
  (`scripts/prerender.mjs`), so crawlers and AI bots that don't run JavaScript
  (GPTBot, ClaudeBot, PerplexityBot, …) see the complete content.
- **Structured data**: schema.org JSON-LD — WebSite, WebPage, FAQPage, Dataset
  (financial figures).
- **AI-crawler-friendly**: `robots.txt` explicitly welcomes AI crawlers; `llms.txt`
  provides a machine-readable fact summary; question-format H1 and FAQs match real
  public queries ("what is", "how much raised/spent", "CAG audit", "RTI",
  "PM CARES vs PMNRF").
- **Social preview**: 1200×630 `og-image.png`, Twitter summary_large_image card,
  canonical URL pointing to the Vercel domain.

## License

- **Code** in this repository is released under the [MIT License](LICENSE).
- **Site content** (prose, data compilation and presentation in `src/data/fund.ts`
  and the rendered text) is released under
  [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) — see
  [LICENSE-CONTENT](LICENSE-CONTENT) — the same license as the Wikipedia text it
  partly adapts, which keeps the derivative chain clean.
- The underlying **facts and figures** (amounts, dates, names) are not copyrightable
  and carry no copyright claim; the fund's audited figures are reproduced from
  Government of India publications.

## Contributing

Corrections — especially sourced factual ones — are welcome. See
[`CONTRIBUTING.md`](CONTRIBUTING.md); full working rules for agents and humans are in
[`AGENTS.md`](AGENTS.md).

## Note on neutrality

This is an independent, non-commercial public-information page. It is not affiliated with
the Government of India or the PM CARES Fund. Where figures are contested or estimated,
that is stated on the page.
