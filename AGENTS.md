# AGENTS.md — Working Rules for Coding Agents

## Process
1. **TDD is non-negotiable**: write the failing test first, watch it fail, implement minimally, watch it pass, refactor. Never write production code without a failing test.
2. **Analysis before code**: for any non-trivial feature, extend `docs/ANALYSIS.md` and `docs/PLAN.md` first (numbered steps, acceptance criteria, verification method).
3. **Agent-team gate for content or release changes**: run Analyzer (content extraction) → implement → Debugger (code/a11y review) + Verifier (fact cross-check vs live Wikipedia wikitext + engineering checks) in parallel. **Consensus required**: fixes are applied, then both re-verify. Max 3 failed attempts per step, then stop and ask the human.
4. **Data authority**: the live Wikipedia wikitext (`action=raw`) beats summarized fetches. If two agents disagree on a fact, the conservative phrasing wins (attribute loosely, drop invented specifics).

## Engineering conventions
- TypeScript strict; no `any`, no `@ts-ignore`, no non-null `!` outside obvious root elements.
- Tailwind design tokens only (`bg-primary`, `text-secondary`, `var(--color-chart-*)`) — no raw hex in components; Recharts props use `var(--color-…)` too.
- Accessibility (WCAG 2.1 AA): single h1; heading levels never skip; skip-link first; focus-visible never removed; text contrast ≥4.5:1 (check chips/labels on tinted backgrounds); charts get aria-label + table alternative + text note (in the `note` slot, outside `role="img"`); `prefers-reduced-motion` respected (global CSS override exists).
- Mobile-first; no horizontal page scroll at 375px; tables wrap in `overflow-x-auto`.
- Comments only for constraints code can't express (e.g. why the note slot exists).

## Content rules
- All facts from `src/data/fund.ts` only — components must not hard-code facts or figures.
- Keep neutrality: criticism AND defence, both sourced; footer disclaimer stays.
- PSU donation figures are not additive; estimates are labeled "estimate"; derived arithmetic labeled "derived".

## Definition of done (per step)
`npm test` (all pass) + `npx tsc --noEmit` (clean) + `npm run build` (succeeds). Dev/preview on 5199/4199 only.
