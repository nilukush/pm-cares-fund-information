# Source inventory — PM CARES audit coverage + prior-year statements (2026-08-28)

Basis for v2.1. All figures below pass the statements' own accounting identities
(opening + receipts-during − payments = closing) at rupee precision, verified in python
from vision transcriptions of the fund's own PDFs. News figures shown only where they
corroborate or add; where news and statement disagree, the statement wins.

## A. Primary tier — the fund's own statements (pmcares.gov.in, fetched 28 Aug 2026)

| FY | Domestic donations | Foreign donations | Interest | Agency refunds | Receipts-during | Payments | Closing balance |
|---|---|---|---|---|---|---|---|
| 2019-20 | — (total 3,076.62 incl. foreign) | — | — | — | 3,076.62 | 0 (5 days) | 3,076.62 |
| 2020-21 | 7,183.78 | 494.92 | ~230* | ~4.6* | **7,913.55 (derived)** | 3,976.17 | 7,013.99 (SB) |
| 2021-22 | 1,896.76 | 40.12 | 147.15 | 2.07 | 2,117.95 (derived) | 3,716.29 | 5,415.66 (SB) |
| 2022-23 | 908.13 | 2.57 | 170.38 | 224.83 | 1,305.90 (derived) | 437.87 | 6,283.68 (SB) |
| 2023-24 | 681.81 | 1.13 | 137.69 | 84.31 | 904.94 | 15.60 | 7,173.03 (SB 531.47 + FD 6,641.57) |
| 2024-25 | 479.05 | 0.93 | 475.15 | 324.66 | 1,279.91 (derived) | 0.88 | 8,452.07 (SB 605.41 + FD 7,846.65) |

*FY20-21 interest/refund item digits are fuzzy in the scan; aggregate receipts-during
(7,913.55) is identity-anchored (side-total 10,990.17 − opening 3,076.62), so the row
closes exactly. All ₹ crore. FY22-23 receipts-side total 6,721.56; FY23-24 7,188.63;
FY24-25 8,452.95; FY21-22 9,131.95; FY20-21 10,990.17.

**Critical reinterpretation:** the FY2020-21 "Receipts 10,990.17" reproduced by Wikipedia
(and currently shown on this site) is the receipts-side TOTAL including the 3,076.62
opening balance. New money that year: 7,913.55 cr. Consequence: the site's
"Received, both years ₹14,066.79 cr" KPI double-counts the opening by 3,076.62 cr;
true new money across both years = 10,990.17 cr. The fund's 2020-21 statement itself
(Audited_Statement_2020_21.pdf, wikitext-cited) is the origin of the 10,990.17 figure.

**Payments detail (verified):** FY22-23: PM CARES for Children 346.00 + oxygen
concentrators (99,986 units) 91.87 + bank 0.0000278 + legal 0.00024 = 437.87.
FY23-24: children 15.38 + bank charges 0.22 = 15.60. FY24-25: children 0.88 (₹87,84,840)
+ bank/SMS ₹451 = 0.88. FY20-21 total 3,976.17 (item digits garbled — do not itemize).
FY21-22 total 3,716.29 (same).

**Auditors (primary-verified):** FY21-22: SARC & Associates (FRN 006085N), Sunil Kumar
Gupta (M.No 084884), UDIN 22084884AXGCSU1642, signed 30.09.2022 New Delhi. FY22-23: same
firm/partner, UDIN 24084884BKIKDZ2614, signed 29.03.2024 New Delhi. FY23-24 + FY24-25:
KKC & Associates LLP (formerly Khimji Kunverji & Co LLP), FRN 105146W/W100621, Tejas
Parikh (M.No 123215), signed Mumbai 7 Aug 2026; trust signed New Delhi 6 Aug 2026 by
Subhashish Panda (Secretary), Reshma R Nair (Director), Pradeep Kumar Srivastava (US),
Pranay Nand Nil (SO). (FY22-23 signatories: Arvind Shrivastava, Saurabh Shukla, P.K.
Srivastava, Vijay Singh Negl.) SARC thus audited four financial years (matches Frontline's
rotation-rule observation). Neither KKC statement shows a UDIN (news: CA Atul Modani
flagged the missing UDIN on FY24-25 as a correctable oversight).

## B. News tier — 7 articles (user-supplied, 18–22 Aug 2026)

Corroborating (match statements): corpus 8,452.06/8,452.07; FD ~93% (7,846.65);
payments 87.85 lakh; refunds 324.66 vs 84.31 prior; domestic 479.04; foreign 92.83 lakh;
FY23-24 domestic 681.8, foreign 1.13, children 15.37/15.4; FY22-23 closing 6,283;
FY21-22 closing 5,415; 2020-21 disbursals 3,976; 2021-22 disbursals 3,716.
News ERRORS caught by identity checks (do NOT reproduce): India This Week's FY23-24
"interest ₹407.50 cr" (statement: 137.69 SB only); Frontline's FY22-23 children "₹346
crore" (statement: 346.00 total payments, children 34.60 — comma-grouping error);
India This Week FY23-24 "₹15.60 crore total expenditure" is CORRECT (our earlier ₹1.56
mis-read was the error).

New factual material (news tier, attributed):
1. Release timeline: FY23-24 + FY24-25 statements published together 18 Aug 2026 after
   ~2-year disclosure gap (The Hindu reported the gap 8 Aug 2026); audits signed 6-7 Aug;
   FY23-24 finalized 28 months after year-end (indiathisweek; consistent with SARC's
   FY22-23 signature 29 Mar 2024 = 12 months, FY21-22 = 6 months).
2. Reactions — criticism: Anjali Bhardwaj (NCPRI co-convenor): "utilised only 0.01% of
   available ₹8,452 crore"; "why is the fund keeping such large sums of money idle";
   refunds "no info on what these payments were for" / "Were refunds done to evade
   accountability for faulty equipment"; "shrouded in secrecy"; notes not uploaded.
   Cmde Lokesh Batra (retd): why "allowed to be accumulated to over ₹8,000 crore, with
   little money spent"; unexplained ₹324 cr refund. Venkatesh Nayak (CHRI): release
   timing "curious"; "'need to know' disclosure era, and not in the 'right to know'";
   urges CAG performance audit. Pawan Khera / Kushagra Saxena (Congress): "₹8,452 crore
   sitting idle while people suffer. PM CARES? Hardly." CAs: 2-year delay + missing UDIN
   (Atul Modani); Ruchita Vaghani questioned inflow-vs-spending gap.
3. Defence (Telegraph): government maintains the fund is reserved for crises/national
   emergencies; ₹6,641 cr in FDs is a deliberate cushion earning returns. Prior
   positions: Dec 2020 RTI reply ("owned and established" by govt but private-source
   funded, not under RTI); Sep 2021 Delhi HC ("not the state / public authority");
   Feb 2026 PMO told Lok Sabha Secretariat fund questions inadmissible under Rules of
   Procedure 41(2)(viii) & 41(2)(xvii); RTI-coverage question still pending before
   Delhi HC. SC (Aug 2020): PM CARES and NDRF "entirely different funds".
4. Analysis (news-derived, label derived/attributed): cumulative spend Mar 2020–Mar 2025
   = 18.4% of total income (The Hindu); donations down ~30% YoY (The Hindu; FY24 vs FY23:
   479.97 vs 682.94 = −29.7%); domestic donations declined every year since 2020-21
   (Telegraph series — now primary-verified); interest (~₹475 cr) nearly equals fresh
   donations (India Today); FD share ~93% (India Today). DRDO and NHAI cited (via Note
   11, not uploaded) as implementing agencies that refunded (India Today).
5. PM CARES for Children scheme background (Frontline): announced 30 May 2022 for
   children orphaned by COVID-19; ₹4,000/month daily needs, ₹10 lakh at 23, education
   loans, Ayushman Bharat cover. (Payments to this scheme are the fund's only spending
   FY22-23→FY24-25.) NOTE: scheme was previously excluded-by-absence (not in Wikipedia
   article) — news tier now covers it.
6. Newslaundry: paywalled beyond lede; lede corroborates corpus/FD/SB figures only.
7. Skip (unverified/fringe): Chinese tech giants donation claim (Congress Kerala social
   media image, "purportedly"); Cockroach Janta Party episode; Udhayanidhi Stalin's
   "₹30,000 crore" January claim (pre-audit figure contradicted by audited data).

## C. What this changes on the site (candidate scope for v2.1 — Analyzer to finalize)
1. FY2023-24 upgraded from balance-only to full row; FY2022-23 added (both primary tier).
2. New six-year audited record table (FY19-20→FY24-25): closing balances, receipts-during,
   payments — all article/primary tier, chartable without tier mixing.
3. CORRECTION: FY2020-21 "receipts 10,990.17" relabeled as receipts-side total incl.
   3,076.62 opening; new money 7,913.55 (derived). KPI "Received, both years 14,066.79"
   → corrected/relabelled (true new money both years = 10,990.17 cr). llms.txt + Hero +
   FAQ answers touched by this figure must be re-checked.
4. Donations-by-year series (primary tier): domestic 7,183.78 → 1,896.76 → 908.13 →
   681.81 → 479.05; foreign 494.92 → 40.12 → 2.57 → 1.13 → 0.93.
5. Auditor history completed (SARC 4 FYs incl. UDINs/dates → KKC 2 FYs); four trust
   signatories named; 16 pages of notes not uploaded (news); UDIN absent on KKC
   statements (news, attributed).
6. News-coverage & reactions block: criticism + defence, all attributed; PMO/Lok Sabha
   rules; Delhi HC pending.
7. Disclosure-lag mini-fact (6/12/28 months; joint release 18 Aug 2026).
8. Timeline +3 events (8 Aug gap report; 18 Aug release; reactions). PM CARES for
   Children background sentence. Sources +7 news URLs; caveats +news-tier note; llms.txt;
   sitemap lastmod; release ritual.
