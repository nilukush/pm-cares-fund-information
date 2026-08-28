# SEO + GEO Audit — round 2, with Search Console data (2026-08-28)

Method: 3-role agent gate (Analyzer / Debugger / Verifier) run directly in-session
(Agent-tool launches were interrupted; direct-role fallback per MEMORY.md ops note).
Input: GSC export "Performance on Search" 2026-08-28 (Web filter, rows 18–25 Aug),
live-site verification, dist inspection, online research (sources at bottom).
No production code was changed in this audit — all fixes below are PROPOSED (gated).

## Verdicts (consensus of all three roles)

| Dimension | Verdict | One-line reason |
|---|---|---|
| Technical SEO | **PASS** | Every infrastructure check verified live (below); nothing broken to fix. |
| SEO performance | **PASS (needs patience)** | 26 impr / 0 clicks / pos 32.46 in week 1 post-index is arithmetically expected; structural ceiling of a single deep page acknowledged; stop-criterion unchanged (mid-Oct–mid-Nov). |
| GEO infrastructure | **PASS-with-concerns** | Prerendered HTML + stats/quotes/sourcing + AI-crawler-friendly robots are the real levers and all present; one internal contradiction (noscript) and two labeling gaps to fix. |

## 1. GSC data interpretation (Analyzer, cross-checked by Verifier)

Data cross-foots exactly: daily 3+10+7+2+0+2+2+0 = 26; devices 24+2 = 26; countries = 26.
Queries table shows only 6 impr total → the other 20 impressions are privacy-thresholded
anonymized rows (normal for a low-volume site, not an anomaly).

- **0 clicks is expected, not a bug.** Applying standard position→CTR curves to the six
  visible queries: total expected clicks ≈ 0.006 for the week → P(0 clicks) ≈ 99.4%.
  At position 32 average, clicks are near-impossible; the click gate is top-20, reached
  so far only transiently ("pm cares fund audit report" pos 22; India-only avg 21.78).
- **Freshness spike decayed as predicted**: 5.5 impr/day (18–21 Aug) → 1.0/day (22–25 Aug).
  Consistent with the 28-Aug memory verdict "no action".
- **Query intent split (Analyzer)**: of 6 visible queries, three are donation-intent
  ("bank account details" pos 72, "scanner" pos 55, and navigational "pm-cares fund") —
  these belong to pmcares.gov.in and are correctly NOT chased. Three are informational
  ("audit report" 22, "how much money" 53, "full form" 84) — all three now have exact-phrase
  FAQ coverage shipped in v2.0/v2.1 (verified in live HTML: "full form" ×2,
  "how much money" ×4). Remaining phrasing gaps: "total amount" 0 matches,
  "utilization" 0 matches (only "utilized" in a FAQ title) — known from keyword brief, low priority.
- **Audience signal**: India is the best-positioned country (9 impr, pos 21.78) — target
  audience is finding it. Desktop 24 : mobile 2 supports the "dev/monitoring community
  early adopters" reading; general-public mobile demand comes with rankings.

## 2. Verified-PASS checklist (Debugger findings + Verifier live checks)

All verified against live HTML (byte-identical to dist/index.html, 248,547 B — deploy current):

- Title/meta description present, front-loaded, entity-encoded (test-locked).
- `<meta name="robots">` index,follow + max-snippet:-1 + max-image-preview:large.
- Canonical → Vercel on BOTH live and mirror (cross-domain consolidation working).
- OG + Twitter cards complete incl. image 1200×630 + alt; og-image.png live (75 KB PNG).
- JSON-LD: valid JSON, @graph [WebSite, WebPage, FAQPage, Dataset], FAQPage exactly
  18 Question entities = faq array; Dataset temporalCoverage 2020-03/2025-03,
  isAccessibleForFree, keywords.
- Heading tree: 79 headings, exactly 1 `<h1>`, zero level skips; skip-link present;
  `lang="en"`; charts lazy-loaded (entry 348 KB JS, charts 384 KB on-demand chunk, CSS 31 KB).
- robots.txt: `User-agent: * Allow: /` + explicit Allow groups for current official AI
  crawler tokens (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, anthropic-ai,
  PerplexityBot, Google-Extended, CCBot, Bytespider, Applebot-Extended) + sitemap line.
- sitemap.xml: correct single URL, lastmod 2026-08-28.
- llms.txt: llmstxt.org-conformant (H1 + blockquote + section links), figures
  consistent with fund.ts incl. the corrected FY2020-21 framing, corrections URL present.
- All endpoints HTTP 200 incl. IndexNow key file; x-vercel-cache HIT from bom1 (Mumbai)
  edge, ~0.25 s TTFB — good for the Indian audience.
- Empty "Search appearance" is universal since Google removed FAQ rich results for all
  sites (7 May 2026) — FAQPage markup remains harmless (and feeds LLM grounding).

## 3. Findings needing action (consensus, gated next release)

| ID | Sev | Finding | Evidence | Fix | Effort |
|---|---|---|---|---|---|
| D1 | **Med** | `<noscript>` still uses the superseded framing "money received … ₹10,990.17 crore in FY2020-21" (that number is the receipts-side TOTAL incl. the ₹3,076.62 cr opening; new money ₹7,913.55 cr). Contradicts the corrected body, Dataset JSON-LD and llms.txt — an LLM reading raw HTML sees two conflicting "receipts" stories, which directly undercuts the verifiability signal that drives AI citations. | index.html:56-58, live-confirmed | Rewrite to "…₹3,076.62 crore in FY2019-20 and ₹7,913.55 crore of new money in FY2020-21…" | S |
| D2 | Low | Dataset `variableMeasured` row 1 "Receipts (₹ crore) — … 2020–21: 10990.17" is unlabeled and sits beside row 5 "Receipts during year … 7913.55" — two "receipts" rows without the incl-opening note on row 1. | StructuredData.tsx:64-75 | Relabel row 1 to "Receipts-side total as printed (article tier, ₹ crore)" | S |
| D3 | Low | No `dateModified`/`datePublished` on WebPage, no `modifiedDate` on Dataset — freshness currently relies on sitemap lastmod + in-text "accessed" dates. | StructuredData.tsx (absent) | Add dateModified = data-as-of date (from env/fund.ts) | S |
| D7 | Low | index-html test suite locks only og/twitter encoding; noscript content is unlocked → D1-class regressions can't fail a test. | src/index-html.test.ts | Add noscript lock test alongside the D1 fix | S |
| A4 | Low | Exact-phrase gaps "total amount", "utilization" (autocomplete language) — answers exist, phrasing absent. | live HTML greps | Optional: weave into existing FAQ/heading wording; or defer to the stop-criterion decision | S |

## 4. GEO reality check — llms.txt demoted to hedge (Analyzer, research-backed)

Current evidence says **no major AI platform fetches llms.txt**: Ahrefs (137K sites) found
97% of llms.txt files never get fetched; a 62,100-request server-log audit saw 84 llms.txt
hits (~0.14%); Longato's audit recorded zero GPTBot/ClaudeBot/PerplexityBot requests; John
Mueller (Google): "no AI system currently uses llms.txt". Consensus: **keep it** (zero cost,
doubles as an excellent human/agent briefing doc; our 5 llms tests keep it honest) but
**stop counting it as a GEO lever**. What actually drives AI citations (Princeton/IIT-D GEO
paper; Ahrefs 75K-brand study): specific sourced statistics (+up to 40% citation lift),
quotations with attribution, credible source citations, answer-first structure, traditional
top-10 rankings (38% of AI Overview citations come from top-10 Google results), and off-site
brand mentions. This site is purpose-built on exactly those on-site levers; off-site levers
are out of scope (free-tier constraint, no Wikipedia self-linking per COI rule).

## 5. Measurement plan (unchanged, reconfirmed)

- Weekly GSC watch: position + daily-impression rate + Devices/Countries (India present ✓).
- Anchor query: "pm cares fund audit report" (pos 22).
- Stop criterion mid-Oct–mid-Nov (8–12 wks): if daily impr ≤1–2 AND no query stabilizes
  top-20 → structural ceiling confirmed → decide multi-page lever vs accept.
- AI-referral traffic: Vercel Web Analytics referrers (not GSC).
- One-time human checks still open: `site:` on both domains; Bing WMT position glance.

## Sources

- [Google: optimizing for generative AI features in Search](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- [Princeton/IIT-Delhi GEO paper (arXiv 2311.09735)](https://arxiv.org/html/2311.09735v3) — statistics/quotes/source-citations lift citations 30–40%
- [Ahrefs: brand-visibility correlations in ChatGPT/AI Mode/AI Overviews](https://ahrefs.com/blog/ai-brand-visibility-correlations/) — incl. llms.txt fetch data (97% never fetched)
- [Search Engine Roundtable: Google does not endorse llms.txt](https://www.seroundtable.com/google-does-not-endorse-llms-txt-40789.html)
- [Search Engine Journal: llms.txt "purely speculative"](https://www.searchenginejournal.com/google-says-llms-txt-is-purely-speculative-for-now/577576/)
- [IndexLab: does llms.txt actually work (Oct 2025 update)](https://www.indexlab.ai/blog/llms-txt-does-it-actually-work-october-2025-updated)
- [Semrush: generative engine optimization guide](https://www.semrush.com/blog/generative-engine-optimization/)
