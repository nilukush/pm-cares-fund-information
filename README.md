# PM CARES Fund — Facts, Figures & Timeline

A single-page, citizen-friendly public-information website presenting India's PM CARES
Fund graphically: what it is, how much was received, what was allocated, how delivery
tracked against promises, and the transparency debate — with every figure sourced from
the [English Wikipedia article](https://en.wikipedia.org/wiki/PM_CARES_Fund).

## Highlights

- **Graphical, quick to scan**: stat cards, receipts-vs-balance bars, donor-mix donut,
  institutional-donation bars, first-allocation chart, promise-vs-delivery progress bars,
  and a 20-event category-coded timeline.
- **Data transparency**: every chart has a visible data table, values carry units (₹ crore),
  estimates are labeled "estimate", derived arithmetic is labeled "derived", and a caveats
  section explains what to keep in mind.
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
npm test           # Vitest — 44 tests (unit + integration)
npm run build      # typecheck (tsc --noEmit) + production bundle → dist/
npm run preview    # http://localhost:4199  (non-standard port, intentional)
```

## Project layout

```
src/
├── data/fund.ts        # single source of truth — ALL content & figures (typed)
├── lib/format.ts       # Indian-locale formatters (₹ crore, 1,23,456 grouping)
├── components/         # Header, Hero, sections, ChartCard (chart + table + a11y)
├── App.tsx             # page assembly
└── test/setup.ts       # RTL cleanup (globals: false)
docs/                   # ANALYSIS.md, PLAN.md (process artifacts)
.env.local|.dev|.staging|.production
```

## Data provenance & refresh

All facts are summarized from Wikipedia (accessed 15 August 2026; the article itself is
tagged "needs update"). Figures reproduced from pmcares.gov.in, The Hindu and Times of
India are as cited by that article. When the article changes, update
`src/data/fund.ts` (and its exact-value tests) — no other file holds content.

## Note on neutrality

This is an independent, non-commercial public-information page. It is not affiliated with
the Government of India or the PM CARES Fund. Where figures are contested or estimated,
that is stated on the page.
