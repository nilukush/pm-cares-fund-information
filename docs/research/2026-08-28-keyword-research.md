# Keyword Research Brief — PM CARES Fund site (2026-08-28)

Method: `keyword-research` skill, 8 phases, manual-data mode (no paid SEO tools).
Evidence sources, all free & real: (1) Wikimedia Pageviews API, (2) Google autocomplete
suggest API, (3) GSC export 28 Aug, (4) two live SERP probes. Volumes are PROXIES —
labeled "estimate" per project content rules. Difficulty is evidence-graded, not tool-scored.

## Headline finding
Demand for the entity roughly TRIPLED in 2026 (Wikipedia PV: ~1,700/mo late 2025 →
8,307 Jul 2026, 7,616 through 28 Aug). The site already CONTAINS answers to nearly every
high-demand query, but the page's PHRASING doesn't match the queries people type
(e.g. "full form" pos 84 with the expansion present but the literal phrase absent —
Debugger-verified). Improvement lever #1 is question-alias alignment, not new content.

## Demand evidence

| Source | Signal | Value |
|---|---|---|
| Wikimedia PV, PM_CARES_Fund, Jul 2026 | entity demand | 8,307/mo (vs 1,653 Nov 2025) |
| Wikimedia PV, PMNRF | comparison-cluster demand | 400–700/mo |
| Autocomplete (5 seeds) | strongest repeats | audit ×3, total amount ×3, controversy ×3, utilization report ×3, private-or-government ×3, rti ×2, full form ×1 (pmcares seed) |
| GSC 18–25 Aug | actual served queries | 6 visible, best "pm cares fund audit report" pos 22 |

## Keyword clusters (intent · difficulty · fit)

| Cluster | Query language (autocomplete/GSC verbatim) | Intent | Difficulty (SERP evidence) | Content fit today |
|---|---|---|---|---|
| A. Audit & accountability | "pm cares fund audit / audit report", "pm cares fund rti", "utilization report" | Informational | HIGH head (probe SERP: pmcares.gov.in, pmindia, india.gov.in, Wikipedia; TOI/NDTV/Frontline for RTI) — long-tail phrasings winnable | audit block fund.ts:68-79, litigation 11, FAQ "Who audits it?" (fund.ts:870). "utilization" wording absent |
| B. Money totals | "pm cares fund total amount 2026", "amount", "how much money in pm cares fund" (GSC pos 53) | Informational | HIGH (news+gov) | Finances/Donations + FAQ fund.ts:856. Title already targets; "total amount" wording absent |
| C. Status & structure | "is private or government", "what happened to pm cares fund", "pmcares full form" (GSC pos 84) | Informational | MEDIUM (answer is nuanced; probe SERP is news, gov FAQ) | trust-deed/private-trust fact in llms.txt key facts + RTI section; "full form" phrase absent from entire page; no FAQ asks it |
| D. Comparison | "what is pm cares fund and pm relief fund" (autocomplete) | Informational | LOW-MEDIUM (few dedicated comparison pages; PMNRF PV small) | PMNRF table + FAQ fund.ts:864 — STRONGEST existing fit |
| Excluded | pmcares.gov.in, qr, pmcares@sbi (navigational), "pm cares for children" (excluded-by-absence rule), "in hindi" (out of scope) | — | unwinnable/out-of-scope | never chase (reconfirms 21 Aug + 28 Aug verdicts) |

## GEO / AI-overview overlap (Phase 6): HIGH
Every winnable query is definitional/factual/well-documented — prime AI-Overview and
assistant-citation fodder. Site is purpose-built for it (prerendered HTML, FAQPage
JSON-LD, llms.txt, robots.txt welcomes GPTBot/ClaudeBot/PerplexityBot). AI-referral
success will show in Vercel WA referrers, NOT GSC (measurement note in MEMORY.md).

## Recommendations (evidence → action)

**Tier 1 — one gated release, additive only (the real lever).** All answers already in
fund.ts; this is phrasing alignment, not new facts. Requires agent-team gate + TDD
(StructData tests extend) + release ritual:
1. Add FAQ "What is the full form of PM CARES?" (answer = fund.ts:41 expansion) — query sits pos 84, phrase absent page-wide.
2. Add 3 question-alias FAQs in autocomplete language, answers from existing sections: "Is the PM CARES Fund private or government?" (identity/RTI), "What is the PM CARES Fund controversy?" (criticism 10 + defence 4), "How was the money utilized?" (spending/delivery gaps). Visible FAQ + FAQPage JSON-LD + llms.txt updated together.
3. DEFER title/H1 churn ("2026" freshness modifier) to week 8–12 — mid-calibration churn risks resetting the pos-22 stabilization.

**Tier 2 — parked, stop-criterion-gated (mid-Oct–mid-Nov):** multi-page split (audit/
finances/litigation as URLs with internal links — the structural answer to the authority
ceiling); mirror noindex; Bing WMT position check (friendlier to new sites).

**Not on the table:** Wikipedia self-links (COI), link schemes, paid tools (constraint),
navigational/head-term chasing, new facts beyond the article (content rules).

## Expected impact (honest)
Entity demand ≈ 8K Wikipedia PV/mo ≠ our TAM; realistic 6-month goal: top-10 on
Cluster-A long-tails → first organic clicks, plus AI-assistant citations. Volumes are
estimates; treat positions in weekly GSC log as ground truth.
