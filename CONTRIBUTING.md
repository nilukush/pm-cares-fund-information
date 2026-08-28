# Contributing

This is an independent, non-commercial public-information page about India's PM CARES
Fund. Corrections are welcome — especially **sourced factual corrections**. The fastest
channel is a [GitHub issue](https://github.com/nilukush/pm-cares-fund-information/issues)
(the site's feedback section links there too).

## Reporting a factual correction

Include, at minimum:

1. **The exact claim** on the page (quote it) and what you believe is wrong.
2. **A source**: a URL (audited statement, Wikipedia wikitext, or a dated news article)
   plus the exact figure or quote from that source.

How sources are weighed (full policy in [`AGENTS.md`](AGENTS.md)):

- **`primary`** — the fund's audited statements on pmcares.gov.in **win all conflicts**.
- **`article`** — the English Wikipedia article is the narrative baseline.
- **`news`** — attributed coverage (name + outlet + date required); a news figure that
  conflicts with an audited statement is dropped, never averaged.

If two sources disagree and it cannot be resolved, the more conservative phrasing
ships. Figures cannot be introduced without a source; nothing is estimated on the
site's behalf.

## Code changes

- **TDD is mandatory**: failing test first, minimal implementation, then refactor.
  `npm test` must pass, `npx tsc --noEmit` must be clean, `npm run build` must succeed.
- **Content changes are gated**: they go through an Analyzer → Debugger + Verifier
  review with consensus required (see `AGENTS.md`). Expect factual PRs to be
  verified against the live sources before merging.
- TypeScript strict (no `any`, no `@ts-ignore`); Tailwind design tokens only
  (`bg-primary`, `text-secondary`, `var(--color-chart-*)`); WCAG 2.1 AA.
- **All facts belong in `src/data/fund.ts`** — components must not hard-code figures.
  `src/data/references.ts` is auto-generated; never hand-edit it
  (`node scripts/parse-references.mjs` regenerates it).
- Dev/preview servers use non-standard ports **5199/4199** (strict) — intentional,
  don't change them.

## Neutrality

Criticism and the government's defence must both stay present and sourced. The footer
non-affiliation disclaimer stays.
