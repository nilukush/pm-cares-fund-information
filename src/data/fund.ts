/**
 * Single source of truth for all site content.
 * Article-sourced facts come from the English Wikipedia article "PM CARES Fund"
 * (accessed 15 August 2026), which itself reproduces figures from pmcares.gov.in,
 * news reports and official statements. Estimates and derived values are flagged.
 * One labeled primary-source addition exists: the fund's own audited FY2024-25
 * statement (pmcares.gov.in, accessed 28 August 2026), kept in a separate export
 * and never mixed with article figures.
 * Corrected against the raw wikitext per the Verifier agent's cross-check.
 */

export const WIKIPEDIA_URL = 'https://en.wikipedia.org/wiki/PM_CARES_Fund'
export const SITE_URL = 'https://pm-cares-fund-information.vercel.app/'
export const SITE_NAME = 'PM CARES Fund — Facts, Figures & Timeline'
export const DATA_AS_OF = 'Wikipedia, accessed 16 August 2026 (article tagged "needs update – July 2026")'
// Machine-readable data-as-of (ISO 8601) for schema.org dateModified/modifiedDate.
export const DATA_AS_OF_ISO = '2026-08-28'

// ---------------------------------------------------------------------------
// Identity
// ---------------------------------------------------------------------------

export interface Identity {
  fullName: string
  shortName: string
  formedOn: string
  formedOnDisplay: string
  registration: string
  address: string
  chairperson: string
  exOfficioTrustees: string[]
  additionalTrustees: string
  advisoryBoard: string
  website: string
  minimumDonationINR: number
  auditor: string
  auditorNote: string
  purposeScope: string
  expertsNote: string
  trusteesPublicNote: string
  lawMinistryNote: string
}

export const identity: Identity = {
  fullName:
    "Prime Minister's Citizen Assistance and Relief in Emergency Situations Fund",
  shortName: 'PM CARES Fund',
  formedOn: '2020-03-27',
  formedOnDisplay: '27 March 2020',
  registration:
    'Registered public charitable trust in New Delhi under the Registration Act, 1908; the trust deed (published December 2020) describes it as "a private trust". It is used at the discretion of the Prime Minister and the fund’s trustees, and does not form part of the Government of India’s accounts.',
  address: "Prime Minister's Office, South Block, New Delhi",
  chairperson: 'Narendra Modi',
  exOfficioTrustees: ['Rajnath Singh (Defence)', 'Amit Shah (Home)', 'Nirmala Sitharaman (Finance)'],
  additionalTrustees:
    'Per September 2022 reports: Justice K. T. Thomas, Kariya Munda, Ratan Tata (formerly)',
  advisoryBoard: 'Per September 2022 reports: Rajiv Mehrishi, Sudha Murthy, Anand Shah',
  website: 'pmcares.gov.in',
  minimumDonationINR: 10,
  auditor: 'SARC & Associates (private chartered accountants)',
  auditorNote:
    'Appointed June 2020 for three years. The fund is not audited by the Comptroller and Auditor General (CAG) of India.',
  purposeScope:
    'The Prime Minister said the PMO had received many requests to help in the war against COVID-19, and that the fund would be used for disaster management and research — also catering to future "distressing situations". Enables micro-donations.',
  expertsNote:
    'April 2020 reports: the fund "could have" 3 experts appointed by the Prime Minister to advise on spending, and an advisory panel of ten members to provide similar advice.',
  trusteesPublicNote: 'A complete list of trustees of the fund is not publicly available.',
  lawMinistryNote:
    'Petitions to the Ministry of Law and Justice for information on the fund’s establishment have not been answered.',
}

// ---------------------------------------------------------------------------
// Audit — everything the article says about SARC & Associates and auditing
// ---------------------------------------------------------------------------

export const audit = {
  firm: 'SARC & Associates',
  appointed: 'June 2020, reported for a period of three years',
  details: [
    'SARC and Associates previously audited the PMNRF in 2019, replacing another private firm as its auditor.',
    'Sunil Kumar Gupta, head of SARC and Associates, has acted as an advisor to several government entities, has written a book about the government’s "Make in India" initiative, and has appeared on Zee News and the state-owned Doordarshan to promote government programs.',
    'The selection and appointment process for the private auditor has not been made public.',
    'The government stated (30 July 2020) that "independent auditors who will be appointed by the trustees" would audit the fund, and agreed to start issuing donation receipts. The article elsewhere describes the auditor as a private party appointed directly by the Government of India — both wordings appear in the source.',
    'The CAG does not audit the fund: its officials said they were not allowed to audit it, since the fund is "based on donations of individuals and organisations".',
  ],
  /** Auditor history, primary-source verified (statement signature blocks) + attributed news observations. */
  primarySourceUpdate:
    'Auditor history (primary sources): SARC & Associates (FRN 006085N) — partner Sunil Kumar Gupta (Membership No. 084884) — signed the FY2021-22 accounts (UDIN 22084884AXGCSU1642, 30 September 2022, New Delhi) and FY2022-23 (UDIN 24084884BKIKDZ2614, 29 March 2024, New Delhi); with the June 2020 appointment, SARC’s engagement spanned four financial years — a span Frontline measured against auditor-rotation expectations. For FY2023-24 and FY2024-25 the auditor is KKC & Associates LLP (formerly Khimji Kunverji & Co LLP), FRN 105146W/W100621 — partner Tejas Parikh (Membership No. 123215), reports signed in Mumbai on 7 August 2026 (trust signatories, New Delhi, 6 August 2026: Subhashish Panda, Reshma R Nair, Pradeep Kumar Srivastava, Pranay Nand Nil). Neither KKC statement displays a UDIN; chartered accountant Atul Modani called this a correctable oversight (news tier). The CAG does not audit the fund.',
}

// ---------------------------------------------------------------------------
// Finances — receipts & balances as published on pmcares.gov.in (via Wikipedia)
// ---------------------------------------------------------------------------

export type SourceTier = 'article' | 'primary'

export interface FiscalYearFinance {
  fiscalYear: string
  period: string
  receiptsCrore: number
  balanceCrore: number
  sourceTier: SourceTier
}

export const finances = {
  years: [
    {
      fiscalYear: '2019–20',
      period: '27–31 March 2020 only',
      receiptsCrore: 3076.62,
      balanceCrore: 3076.62,
      sourceTier: 'article',
    },
    {
      fiscalYear: '2020–21',
      period: 'full financial year',
      receiptsCrore: 10990.17,
      balanceCrore: 7013.99,
      sourceTier: 'article',
    },
  ] as FiscalYearFinance[],
  /** Wikipedia lead, as of 2022: "two-thirds of the corpus remains unspent". */
  unspentQuote:
    'Roughly two-thirds of the corpus remains unspent (Wikipedia lead, as of 2022); The Hindu reported "one-third of ₹10,990 crore spent" per the 2020-21 audit.',
  /** Times of India estimate, 19 May 2020 — NOT an audited figure. */
  twoMonthEstimateCrore: 10600,
  twoMonthEstimateNote:
    'Times of India estimate (19 May 2020): ₹10,600 crore (US$1.4 billion) received in the first two months — an estimate, not audited accounts; ToI noted the undisclosed total could potentially exceed this amount.',
  estimateNote: 'Donor mix is a Times of India estimate (19 May 2020), not audited accounts.',
  corpusStatementNote:
    'A statement uploaded to the fund’s website in September 2020 disclosed ₹30.76 billion received between 27 and 31 March 2020 — already below The Times of India’s ₹10,600 crore two-month estimate — but not the names or identities of donors.',
  /** The ₹10,990.17 cr "receipts" figure is a receipts-side TOTAL incl. the opening balance (per the fund's own statement). */
  fy202021ReceiptsNote:
    'The ₹10,990.17 crore FY2020-21 receipts figure, as published via Wikipedia, is the receipts-side total including the ₹3,076.62 crore opening balance (per the fund’s own FY2020-21 statement). New money received that year: ₹7,913.55 crore (derived).',
}

// The two-year receipts sum formerly exported here (₹14,066.79 cr) double-counted the
// FY2019-20 opening balance inside the FY2020-21 side-total — see fy202021ReceiptsNote.

// ---------------------------------------------------------------------------
// Primary-source tier — the fund's own audited FY2024-25 statement.
// Kept SEPARATE from finances.years (article tier): the two tiers are never
// mixed in one chart or one total. Every figure below was verified against the
// statement's own accounting identities at rupee precision before inclusion.
// ---------------------------------------------------------------------------

export const AUDITED_STATEMENT_URL =
  'https://pmcares.gov.in/assets/donation/pdf/Audited_Statement_2024_25.pdf'
export const AUDITED_STATEMENT_ACCESSED = '28 August 2026'

export interface AuditedBalanceSplit {
  savingsBankCrore: number
  fixedDepositsCrore: number
}

export interface AuditedLineItem {
  label: string
  amountCrore: number
  /** Exact rupee amount as printed, for lines too small for crore rounding. */
  amountRupee?: number
}

export interface AuditedStatementFY202425 {
  sourceTier: 'primary'
  fiscalYear: string
  period: string
  sourceUrl: string
  accessedDisplay: string
  auditorFirm: string
  auditorRegistration: string
  reportDated: string
  openingBalanceCrore: number
  openingSplit: AuditedBalanceSplit
  receiptsTotalCrore: number
  receiptsDerived: true
  receiptsNote: string
  receiptsItemized: AuditedLineItem[]
  paymentsTotalRupee: number
  paymentsTotalCrore: number
  paymentsItemized: AuditedLineItem[]
  closingBalanceCrore: number
  closingSplit: AuditedBalanceSplit
  priorYearFiscalYear: string
  priorYearClosingCrore: number
  priorYearNote: string
  paymentsContextNote: string
  sourceNote: string
}

export const auditedStatementFY202425: AuditedStatementFY202425 = {
  sourceTier: 'primary',
  fiscalYear: '2024–25',
  period: 'year ended 31 March 2025',
  sourceUrl: AUDITED_STATEMENT_URL,
  accessedDisplay: AUDITED_STATEMENT_ACCESSED,
  auditorFirm: 'KKC & Associates LLP (formerly Khimji Kunverji & Co LLP)',
  auditorRegistration: 'FRN 105146W/W100621',
  reportDated: '7 August 2026',
  openingBalanceCrore: 7173.03,
  openingSplit: { savingsBankCrore: 531.47, fixedDepositsCrore: 6641.57 },
  receiptsTotalCrore: 1279.91,
  receiptsDerived: true,
  receiptsNote:
    'Receipts during FY2024-25 are derived: the statement’s printed receipts-side total of ₹8,452.95 crore minus the ₹7,173.03 crore opening balance = ₹1,279.91 crore (₹12,79,91,28,444). Itemized lines are reproduced as printed; rounded to two decimals they appear to sum to slightly more, but in exact rupees they reconcile to the total.',
  receiptsItemized: [
    { label: 'Domestic donations (net)', amountCrore: 479.05 },
    { label: 'Foreign donations (net)', amountCrore: 0.93 },
    { label: 'Interest received on savings-bank accounts', amountCrore: 5.77 },
    { label: 'Interest received on fixed deposits', amountCrore: 469.38 },
    { label: 'Refund of TDS', amountCrore: 0.13 },
    { label: 'Refunds from implementing agencies', amountCrore: 324.66 },
  ],
  paymentsTotalRupee: 8785291,
  paymentsTotalCrore: 0.88,
  paymentsItemized: [
    { label: 'PM CARES for Children Scheme', amountCrore: 0.88, amountRupee: 8784840 },
    { label: 'Bank and SMS charges', amountCrore: 0, amountRupee: 451 },
  ],
  closingBalanceCrore: 8452.07,
  closingSplit: { savingsBankCrore: 605.41, fixedDepositsCrore: 7846.65 },
  priorYearFiscalYear: '2023–24',
  priorYearClosingCrore: 7173.03,
  priorYearNote:
    'The statement’s comparative column also shows the FY2023-24 closing balance of ₹7,173.03 crore — the same figure printed as the FY2024-25 opening balance. The full FY2023-24 row, from the fund’s separately published FY2023-24 statement, appears in the six-year record above.',
  paymentsContextNote:
    'Payments during FY2024-25 totalled ₹87,85,291 (₹0.88 crore): ₹87,84,840 under the PM CARES for Children Scheme and ₹451 in bank and SMS charges. During the same year, implementing agencies refunded ₹324.66 crore to the fund, and the closing balance on 31 March 2025 was ₹8,452.07 crore. Context from the article-sourced record: the fund’s stated purposes cover disaster management and research for future “distressing situations”; its first major allocation was ₹3,100 crore on 13 May 2020; and Wikipedia’s lead (as of 2022) noted roughly two-thirds of the corpus was then unspent.',
  sourceNote:
    'Primary source — PM CARES Fund audited Receipts & Payments Account for FY2024-25 (year ended 31 March 2025), audited by KKC & Associates LLP (formerly Khimji Kunverji & Co LLP), FRN 105146W/W100621, report dated 7 August 2026. Shown separately from the Wikipedia-sourced figures above; the two tiers are never mixed in one chart.',
}

// ---------------------------------------------------------------------------
// Six-year audited record — FY2019-20 → FY2024-25, primary tier.
// Every row satisfies opening + receipts-during − payments = closing at rupee
// precision against the fund's own statements (pmcares.gov.in, accessed 28 Aug
// 2026). Itemizations are omitted where scan digits were unreadable.
// ---------------------------------------------------------------------------

const STATEMENT_PDF_BASE = 'https://pmcares.gov.in/assets/donation/pdf/'

export interface AuditedFiscalYear {
  fiscalYear: string
  period: string
  openingBalanceCrore: number
  openingSplit?: AuditedBalanceSplit
  /** Printed receipts-side total — INCLUDES the opening balance. */
  receiptsSideTotalCrore: number
  receiptsDuringCrore: number
  receiptsDerived: boolean
  receiptsItemized?: AuditedLineItem[]
  receiptsItemizationNote?: string
  paymentsTotalCrore: number
  paymentsItemized?: AuditedLineItem[]
  paymentsItemizationNote?: string
  closingBalanceCrore: number
  closingSplit?: AuditedBalanceSplit
  closingSplitNote?: string
  auditor?: {
    firm: string
    registration: string
    partner: string
    partnerMembershipNo: string
    udin?: string
    signedDisplay: string
  }
  statementUrl: string
  note?: string
}

export const auditedSeries: AuditedFiscalYear[] = [
  {
    fiscalYear: '2019–20',
    period: '27–31 March 2020 only',
    openingBalanceCrore: 0,
    receiptsSideTotalCrore: 3076.62,
    receiptsDuringCrore: 3076.62,
    receiptsDerived: false,
    paymentsTotalCrore: 0,
    closingBalanceCrore: 3076.62,
    closingSplitNote: 'savings-bank figure as printed; deposit split not verified',
    statementUrl: `${STATEMENT_PDF_BASE}Audited%20Statement.PDF`,
    note: 'Five days of receipts; the fund’s first published statement.',
  },
  {
    fiscalYear: '2020–21',
    period: 'year ended 31 March 2021',
    openingBalanceCrore: 3076.62,
    receiptsSideTotalCrore: 10990.17,
    receiptsDuringCrore: 7913.55,
    receiptsDerived: true,
    receiptsItemizationNote:
      'Individual interest and refund lines in the FY2020-21 scan have unreadable digits; the aggregate is identity-anchored (printed side-total ₹10,990.17 cr − opening ₹3,076.62 cr) and the row closes exactly, so itemized lines are not reproduced.',
    paymentsTotalCrore: 3976.17,
    paymentsItemizationNote: 'item digits garbled in the scan — total only',
    closingBalanceCrore: 7013.99,
    closingSplitNote: 'savings-bank figure as printed; deposit split not verified',
    statementUrl: `${STATEMENT_PDF_BASE}Audited_Statement_2020_21.pdf`,
    note: 'The widely-quoted ₹10,990.17 crore “receipts” figure is this year’s receipts-side total including the opening balance.',
  },
  {
    fiscalYear: '2021–22',
    period: 'year ended 31 March 2022',
    openingBalanceCrore: 7013.99,
    receiptsSideTotalCrore: 9131.95,
    receiptsDuringCrore: 2117.95,
    receiptsDerived: true,
    receiptsItemizationNote:
      'Itemized lines are partially unreadable in the scan and do not close against the identity-anchored total, so itemization is omitted.',
    paymentsTotalCrore: 3716.29,
    paymentsItemizationNote: 'item digits garbled in the scan — total only',
    closingBalanceCrore: 5415.66,
    closingSplitNote: 'savings-bank figure as printed; deposit split not verified',
    auditor: {
      firm: 'SARC & Associates',
      registration: 'FRN 006085N',
      partner: 'Sunil Kumar Gupta',
      partnerMembershipNo: '084884',
      udin: '22084884AXGCSU1642',
      signedDisplay: '30 September 2022, New Delhi',
    },
    statementUrl: `${STATEMENT_PDF_BASE}Audited_Statement_2021_22.pdf`,
  },
  {
    fiscalYear: '2022–23',
    period: 'year ended 31 March 2023',
    openingBalanceCrore: 5415.66,
    receiptsSideTotalCrore: 6721.56,
    receiptsDuringCrore: 1305.9,
    receiptsDerived: true,
    receiptsItemized: [
      { label: 'Domestic donations (net)', amountCrore: 908.13 },
      { label: 'Foreign donations (net)', amountCrore: 2.57 },
      { label: 'Interest received on savings-bank accounts', amountCrore: 170.38 },
      { label: 'Refunds from implementing agencies', amountCrore: 224.83 },
    ],
    paymentsTotalCrore: 437.87,
    paymentsItemized: [
      { label: 'PM CARES for Children Scheme', amountCrore: 346.0 },
      { label: 'Procurement of 99,986 oxygen concentrators', amountCrore: 91.87 },
      { label: 'Bank charges', amountCrore: 0, amountRupee: 278 },
      { label: 'Legal charges', amountCrore: 0, amountRupee: 24000 },
    ],
    closingBalanceCrore: 6283.68,
    closingSplitNote: 'savings-bank figure as printed; deposit split not verified',
    auditor: {
      firm: 'SARC & Associates',
      registration: 'FRN 006085N',
      partner: 'Sunil Kumar Gupta',
      partnerMembershipNo: '084884',
      udin: '24084884BKIKDZ2614',
      signedDisplay: '29 March 2024, New Delhi',
    },
    statementUrl: `${STATEMENT_PDF_BASE}Audited_Statement_2022_23.pdf`,
    note: 'Figures from the comparative column of the fund’s FY2023-24 statement; the fund’s separately published FY2022-23 statement matches.',
  },
  {
    fiscalYear: '2023–24',
    period: 'year ended 31 March 2024',
    openingBalanceCrore: 6283.68,
    openingSplit: { savingsBankCrore: 6283.68, fixedDepositsCrore: 0 },
    receiptsSideTotalCrore: 7188.63,
    receiptsDuringCrore: 904.94,
    receiptsDerived: true,
    receiptsItemized: [
      { label: 'Domestic donations (net)', amountCrore: 681.81 },
      { label: 'Foreign donations (net)', amountCrore: 1.13 },
      { label: 'Interest received on savings-bank accounts', amountCrore: 137.69 },
      { label: 'Refunds from implementing agencies', amountCrore: 84.31 },
    ],
    paymentsTotalCrore: 15.6,
    paymentsItemized: [
      { label: 'PM CARES for Children Scheme', amountCrore: 15.38 },
      { label: 'Bank charges', amountCrore: 0.22 },
    ],
    closingBalanceCrore: 7173.03,
    closingSplit: { savingsBankCrore: 531.47, fixedDepositsCrore: 6641.57 },
    auditor: {
      firm: 'KKC & Associates LLP (formerly Khimji Kunverji & Co LLP)',
      registration: 'FRN 105146W/W100621',
      partner: 'Tejas Parikh',
      partnerMembershipNo: '123215',
      signedDisplay: '7 August 2026, Mumbai',
    },
    statementUrl: `${STATEMENT_PDF_BASE}Audited_Statement_2023_24.pdf`,
    note: 'The year the corpus moved into fixed deposits: ₹6,641.57 cr of the ₹7,173.03 cr closing balance.',
  },
  {
    fiscalYear: '2024–25',
    period: 'year ended 31 March 2025',
    openingBalanceCrore: 7173.03,
    openingSplit: { savingsBankCrore: 531.47, fixedDepositsCrore: 6641.57 },
    receiptsSideTotalCrore: 8452.95,
    receiptsDuringCrore: 1279.91,
    receiptsDerived: true,
    receiptsItemized: auditedStatementFY202425.receiptsItemized,
    paymentsTotalCrore: 0.88,
    paymentsItemized: [
      { label: 'PM CARES for Children Scheme', amountCrore: 0.88, amountRupee: 8784840 },
      { label: 'Bank and SMS charges', amountCrore: 0, amountRupee: 451 },
    ],
    closingBalanceCrore: 8452.07,
    closingSplit: { savingsBankCrore: 605.41, fixedDepositsCrore: 7846.65 },
    auditor: {
      firm: 'KKC & Associates LLP (formerly Khimji Kunverji & Co LLP)',
      registration: 'FRN 105146W/W100621',
      partner: 'Tejas Parikh',
      partnerMembershipNo: '123215',
      signedDisplay: '7 August 2026, Mumbai',
    },
    statementUrl: AUDITED_STATEMENT_URL,
    note: 'Detailed card above; ₹7,846.65 cr (about 93%) of the closing balance is in fixed deposits.',
  },
]

export const auditedSeriesTotals = {
  receiptsCrore: Math.round(auditedSeries.reduce((a, y) => a + y.receiptsDuringCrore, 0) * 100) / 100,
  paymentsCrore: Math.round(auditedSeries.reduce((a, y) => a + y.paymentsTotalCrore, 0) * 100) / 100,
}

/** Domestic/foreign donation lines per audited statement (primary tier). FY2019-20 excluded — no split published for the five-day first year. */
export interface DonationYear {
  fiscalYear: string
  domesticCrore: number
  foreignCrore: number
  totalCrore: number
  yoyChangePercent?: number
}

export const donationsByYear: DonationYear[] = [
  { fiscalYear: '2020–21', domesticCrore: 7183.78, foreignCrore: 494.92, totalCrore: 7678.7 },
  { fiscalYear: '2021–22', domesticCrore: 1896.76, foreignCrore: 40.12, totalCrore: 1936.88, yoyChangePercent: -74.8 },
  { fiscalYear: '2022–23', domesticCrore: 908.13, foreignCrore: 2.57, totalCrore: 910.7, yoyChangePercent: -53.0 },
  { fiscalYear: '2023–24', domesticCrore: 681.81, foreignCrore: 1.13, totalCrore: 682.94, yoyChangePercent: -25.0 },
  { fiscalYear: '2024–25', domesticCrore: 479.05, foreignCrore: 0.93, totalCrore: 479.98, yoyChangePercent: -29.7 },
]

export const donationsByYearNote =
  'Domestic and foreign donation lines from the fund’s audited statements (primary tier); totals and year-on-year changes are derived. The Hindu reported donations down about 30% year-on-year in FY2024-25; The Telegraph noted domestic donations have declined every year since FY2020-21; India Today noted FY2024-25 interest (~₹475 crore) nearly equals fresh donations. No domestic/foreign split was published for the five-day first year (FY2019-20), so it is excluded.'

// ---------------------------------------------------------------------------
// News tier — attributed August 2026 coverage of the audited statements.
// Quotes are verbatim fragments, always name + outlet; never audited fact.
// ---------------------------------------------------------------------------

export interface NewsSource {
  id: string
  outlet: string
  title: string
  url: string
  publishedDisplay: string
}

export const newsSources: NewsSource[] = [
  {
    id: 'scroll',
    outlet: 'Scroll.in',
    title: 'PM CARES Fund had Rs 8,452 crore corpus by end of FY25, shows audit report',
    url: 'https://scroll.in/latest/1095124/pm-cares-fund-had-rs-8452-crore-corpus-by-end-of-fy25-shows-audit-report',
    publishedDisplay: '18 August 2026',
  },
  {
    id: 'itw',
    outlet: 'India This Week',
    title: 'PM CARES Fund audit reports released: Rs 8,452 crore corpus',
    url: 'https://indiathisweek.in/business/pm-cares-fund-audit-reports-released-rs-8452-crore-corpus/',
    publishedDisplay: '19 August 2026',
  },
  {
    id: 'hindu',
    outlet: 'The Hindu',
    title: 'Why is PM CARES Fund keeping large sums idle, asks RTI activist',
    url: 'https://www.thehindu.com/news/national/pm-cares-fund-audit-2024-25-domestic-foreign-donations/article71360330.ece',
    publishedDisplay: '18 August 2026',
  },
  {
    id: 'indiatoday',
    outlet: 'India Today',
    title: 'PM CARES Fund: Rs 8,452 crore, 93% in fixed deposits, Rs 87.85 lakh spent in FY25',
    url: 'https://www.indiatoday.in/india/story/pm-cares-fund-rs-8452-crore-93-percent-fixed-deposits-rs-87-85-lakh-spent-fy25-2974064-2026-08-18',
    publishedDisplay: '18 August 2026',
  },
  {
    id: 'telegraph',
    outlet: 'The Telegraph',
    title: '“PM CARES? Hardly”: barbs and questions fly after Rs 8,452-crore fund reveal in audit',
    url: 'https://www.telegraphindia.com/india/pm-cares-hardly-barbs-and-questions-fly-after-rs-8452-crore-fund-reveal-in-audit/cid/2175576',
    publishedDisplay: '18 August 2026',
  },
  {
    id: 'frontline',
    outlet: 'Frontline',
    title: 'PM CARES Fund: Rs 8,452 crore and few disclosures',
    url: 'https://frontline.thehindu.com/politics/pm-cares-fund-audit-transparency-questions/article71373611.ece',
    publishedDisplay: '22 August 2026',
  },
  {
    id: 'newslaundry',
    outlet: 'Newslaundry',
    title: 'Decoding PM CARES Fund audit report: sitting on thousands of crores, yet only lakhs spent',
    url: 'https://www.newslaundry.com/2026/08/19/decoding-pm-cares-fund-audit-report-sitting-on-thousands-of-crores-yet-only-lakhs-spent',
    publishedDisplay: '19 August 2026',
  },
]

export type NewsKind = 'criticism' | 'defence' | 'audit-observation'

export interface NewsReaction {
  quote: string
  attribution: string
  sourceId: string
  kind: NewsKind
}

export const newsReactions: NewsReaction[] = [
  {
    quote:
      'The fund had “utilised only 0.01% of available ₹8,452 crore” — “why is the fund keeping such large sums of money idle?”',
    attribution: 'Anjali Bhardwaj, co-convenor, National Campaign for People’s Right to Information (NCPRI)',
    sourceId: 'hindu',
    kind: 'criticism',
  },
  {
    quote:
      'No information on what refunded payments were for — “were refunds done to evade accountability for faulty equipment?” — the fund is “shrouded in secrecy”, and the notes to the accounts — 16 pages, per Frontline — were not uploaded.',
    attribution: 'Anjali Bhardwaj, NCPRI, as reported by Scroll.in and The Hindu',
    sourceId: 'scroll',
    kind: 'criticism',
  },
  {
    quote:
      'Questioned why money was “allowed to be accumulated to over ₹8,000 crore, with little money spent”, and sought an explanation of the ₹324.66 crore refunded by implementing agencies.',
    attribution: 'Cmde Lokesh Batra (retired), as reported by Frontline',
    sourceId: 'frontline',
    kind: 'criticism',
  },
  {
    quote:
      'Called the release timing “curious”; said disclosure is in a “‘need to know’ disclosure era, and not in the ‘right to know’” one; urged a CAG performance audit.',
    attribution: 'Venkatesh Nayak, Commonwealth Human Rights Initiative (CHRI), as reported by Frontline',
    sourceId: 'frontline',
    kind: 'criticism',
  },
  {
    quote: '“₹8,452 crore sitting idle while people suffer. PM CARES? Hardly.”',
    attribution: 'Pawan Khera, Indian National Congress (Kushagra Saxena quoted separately), as reported by The Telegraph',
    sourceId: 'telegraph',
    kind: 'criticism',
  },
  {
    quote:
      'Flagged the two-year audit delay and the missing UDIN on the FY2024-25 statement — calling the latter a correctable oversight.',
    attribution: 'Atul Modani, chartered accountant, as reported by India Today',
    sourceId: 'indiatoday',
    kind: 'audit-observation',
  },
  {
    quote: 'Questioned the gap between inflows and spending.',
    attribution: 'Ruchita Vaghani, chartered accountant, as reported by India Today',
    sourceId: 'indiatoday',
    kind: 'audit-observation',
  },
  {
    quote:
      'SARC & Associates’ engagement covered four financial years — measured against auditor-rotation expectations.',
    attribution: 'Frontline, on the auditor-rotation span',
    sourceId: 'frontline',
    kind: 'audit-observation',
  },
]

export const newsDefence =
  'The government’s position, as reported by The Telegraph: the fund is reserved for crises and national emergencies, and the money held in fixed deposits — ₹6,641.57 crore on 31 March 2024, ₹7,846.65 crore on 31 March 2025 — is a deliberate cushion earning returns. Prior official positions stand: a December 2020 RTI reply described the fund as “owned and established” by the Government of India while maintaining it is private-source funded and outside RTI; in September 2021 the Delhi High Court was told the fund is “not the state” and not a public authority; during the 2026 budget session the PMO told the Lok Sabha Secretariat that questions on the fund were inadmissible under Rules of Procedure 41(2)(viii) and 41(2)(xvii); the RTI-coverage question remains pending before the Delhi High Court. In August 2020 the Supreme Court held PM CARES and the NDRF to be entirely different funds.'

export const newsDisclosureLag =
  'Disclosure lag: the FY2021-22 audit was signed about 6 months after year-end (30 September 2022), FY2022-23 about 12 months after year-end (29 March 2024), and FY2023-24 about 28 months after year-end (India This Week’s calculation), with both outstanding statements released together on 18 August 2026 after The Hindu reported the gap on 8 August 2026.'

export const newsAnalysisNotes: string[] = [
  'The Hindu calculates cumulative spending from March 2020 to March 2025 at 18.4% of total income (news-derived; not recomputed here).',
  'Donations fell about 30% year-on-year in FY2024-25 (The Hindu; the audited statements give -29.7%, derived).',
  'FY2024-25 interest (~₹475 crore) nearly equals fresh donations; about 93% of the corpus is in fixed deposits (India Today).',
  'DRDO and NHAI are cited — via Note 11 to the accounts, not uploaded — as implementing agencies that refunded money (India Today).',
]

/** Estimated donor mix of the first two months of donations (ToI, 19 May 2020). */
export const donorMix = [
  { label: 'Private-sector corporations & employees', sharePercent: 53 },
  { label: 'PSUs & PSU employees', sharePercent: 42 },
  { label: 'Individuals', sharePercent: 5 },
]

// ---------------------------------------------------------------------------
// Institutional donations reported in the article body text (₹ crore)
// ---------------------------------------------------------------------------

export interface Donation {
  label: string
  amountCrore: number
  note: string
}

export const institutionalDonations: Donation[] = [
  {
    label: '101 PSUs — CSR funds',
    amountCrore: 2400,
    note: 'December 2020; a separate count/period from the 32-PSU figure below.',
  },
  {
    label: '32 PSUs',
    amountCrore: 2105,
    note: 'Reported August 2020 (The Indian Express) — primarily from CSR budget allocations for 2019-20 and 2020-21; do not sum with the 101-PSU figure. Per the RTI replies, in one case the CSR allocation had been exceeded, and in others the allocation had not been finally decided when the transfer was made. A petition for the same information made to the Prime Minister’s Office was denied, the government stating the fund was not a public authority and did not have to account for the funds under the RTI Act.',
  },
  {
    label: 'Banks & financial institutions',
    amountCrore: 204.75,
    note: 'SBI, Union Bank, Central Bank of India, Bank of Maharashtra, SIDBI, LIC, IRDAI (₹2,047.5 million as reported)',
  },
  {
    label: 'Indian military (total)',
    amountCrore: 203.67,
    note: 'One day’s salary sought from all three services; see branch breakdown',
  },
  {
    label: 'PSU staff salaries',
    amountCrore: 155,
    note: 'December 2020, deducted from salaries',
  },
  {
    label: 'Educational institutions',
    amountCrore: 21.81,
    note: 'From staff salary accounts (teaching and non-teaching), pension funds, research funds and student funds of 20 IITs plus NCERT, BHU, AMU and Central Sanskrit University (₹218.1 million as reported; no per-institution breakdown given)',
  },
]

export const militaryBreakdown = [
  { label: 'Army', amountCrore: 157 },
  { label: 'Air Force', amountCrore: 29.18 },
  { label: 'Navy (officers & sailors)', amountCrore: 12.41 },
  { label: 'Navy (civilians)', amountCrore: 4.36 },
]

export const militaryNotes =
  'The Army shared its figure on Twitter (May 2020) but did not reply to a later RTI petition; the Navy declined to disclose contributions made under any other heads of accounts. The Navy’s ₹12.41 crore was contributed between April and October 2020.'

// ---------------------------------------------------------------------------
// Voluntary donations — pledges named in the article body text
// ---------------------------------------------------------------------------

export const voluntaryDonors = {
  corporations: [
    'Larsen & Toubro',
    'Infosys Foundation',
    'Adani Foundation',
    'Reliance Industries',
    'Hero Group',
    'TATA Trust',
    'Paytm',
    'Azim Premji Foundation',
  ],
  individuals: ['Akshay Kumar', 'Deepika Padukone', 'Ranveer Singh', 'Shah Rukh Khan', 'Karan Johar'],
  /** Amounts appearing ONLY in cited reference headlines — not in article body text. */
  titleOnlyAmounts: [
    { label: 'Akshay Kumar', amount: '₹25 crore', note: 'Headline figure only — not stated in the article body' },
    { label: 'Larsen & Toubro', amount: '₹150 crore', note: 'Headline figure only — not stated in the article body' },
    { label: 'BCCI (IPL)', amount: '₹51 crore', note: 'Headline figure only — not stated in the article body' },
    { label: 'Hockey India', amount: '₹75 lakh', note: 'Headline figure only — not stated in the article body' },
    { label: 'Golfer Anirban Lahiri', amount: '₹7 lakh', note: 'Headline figure only — not stated in the article body' },
    {
      label: 'CDS Bipin Rawat',
      amount: '₹50,000/month for one year',
      note: 'Headline figure only — not stated in the article body',
    },
    {
      label: 'President & Vice-President of India',
      amount: 'one month’s salary',
      note: 'Headline figure only — not stated in the article body',
    },
    { label: 'EPFO employees', amount: '₹2.5 crore', note: 'Headline figure only — not stated in the article body' },
    {
      label: 'Wipro + Azim Premji Foundation',
      amount: '₹1,125 crore (broader COVID-19 commitment, not solely PM CARES)',
      note: 'Headline figure only — not stated in the article body',
    },
    {
      label: 'Navi Mumbai PhonePe fraud victim',
      amount: '₹28,000',
      note: 'Headline figure only — not stated in the article body',
    },
  ],
}

/** Salary-deduction practices described in the article (non-₹-figure examples). */
export const salaryDeductionExamples = [
  'Supreme Court registry: 3 days’ salary (officers), 2 (non-gazetted), 1 (Group C) — resolution of 19 April 2020; the circular gave employees one day to opt out, and silence counted as consent',
  'Revenue Department staff: 1 day’s salary per month, April 2020–March 2021 — initially opt-out (“default”), opt-in from 30 April 2020 after criticism; critics noted it amounted to 12% of a month’s salary, a former Comptroller-General of Defence Accounts said the opt-out design left employees vulnerable to professional consequences, and employees objected it crowded out donations to other relief funds such as state Chief Ministers’ Relief Funds',
  'AIIMS and three other Delhi hospitals (Safdarjung, ABVIMS-RML and Lady Hardinge) issued salary-deduction circulars; after protests from doctors’ associations all were withdrawn, with donations becoming opt-in and voluntary',
  'Defence Ministry sought ~₹500 crore (one day’s salary) from the armed forces; ₹203.67 crore was received',
]

// ---------------------------------------------------------------------------
// First allocation — 13 May 2020
// ---------------------------------------------------------------------------

export const firstAllocation = {
  date: '2020-05-13',
  dateDisplay: '13 May 2020',
  totalCrore: 3100,
  headline: 'First major allocation: ₹3,100 crore',
  items: [
    {
      label: 'Ventilators (50,000 made-in-India units)',
      amountCrore: 2000,
      derived: true,
      note: 'Derived by arithmetic (3,100 − 1,000 − 100); the article states the ₹3,100 crore total, the migrant and vaccine shares, and the 50,000-ventilator order — allocated to government hospitals in states and union territories',
    },
    {
      label: 'Migrant worker welfare (via states/UTs)',
      amountCrore: 1000,
      derived: false,
      note: 'Stated as "an additional sum" of ₹1,000 crore for state welfare of migrants — covering accommodation, food, medical treatment and transportation',
    },
    {
      label: 'COVID-19 vaccine development support',
      amountCrore: 100,
      derived: false,
      note: 'To be spent under the supervision of the Principal Scientific Advisor, on indigenous research projects only; Wikipedia lead notes it had not been allotted as of 2022',
    },
  ],
}

// ---------------------------------------------------------------------------
// Implementation programmes — promise vs delivery
// ---------------------------------------------------------------------------

export const oxygenProgramme = {
  sanctionedPlants: 162,
  sanctionedNote: 'PSA oxygen plants for district hospitals tendered October 2020 (150 plants), later increased by 12 more',
  installedScroll: 11,
  operationalScroll: 5,
  scrollNote: 'Scroll.in, April 2021: 11 installed, only 5 operational',
  governmentClaimInstalled: 33,
  governmentClaimNote: 'Health Ministry claim, 18 April 2021',
  delhiSanctioned: 8,
  delhiBuilt: 1,
  delhiNote: 'Told to the Delhi High Court, 22 April 2021',
  april2021Announcement: '26 April 2021 (PMO): 551 oxygen plants + 100,000 portable oxygen concentrators',
  cmssNote:
    'Responsibility for constructing the plants lay with the Central Medical Services Society, an autonomous institution under the Central Health Ministry — not with state governments, as was reported by a number of political activists.',
  slowdownNote:
    'Joint Secretary (Health) Vipun Nayak told the Delhi High Court that a decline in COVID-19 cases during January–February 2021 had slowed construction.',
}

export const ventilatorProgramme = {
  ordered: 50000,
  madeBy: '2020-06-24',
  madeByDate: 2923,
  madeByNote: 'Only 2,923 of 50,000 ventilators (6%) manufactured by 24 June 2020',
  claim60000: {
    dateDisplay: '21 Jun 2020',
    note: 'BJP President J.P. Nadda stated 60,000 ventilators would be made available via the Fund by the end of June.',
  },
  stateDeliveries: [
    { state: 'Maharashtra', units: 275 },
    { state: 'Delhi', units: 275 },
    { state: 'Gujarat', units: 175 },
    { state: 'Bihar', units: 100 },
    { state: 'Karnataka', units: 90 },
    { state: 'Rajasthan', units: 75 },
  ],
  stateDeliveriesNote:
    'Ventilators allocated to states/UTs facing a high number of cases, as of 24 June 2020.',
  qualityNote:
    'Ventilators purchased under PM CARES drew quality criticism: two government clinical-evaluation committees (16 May and 1 June 2020) flagged sub-standard units, recommending use only with a back-up ventilator available. The units were purchased from Indian medical start-ups; one supplier stated there were no guidelines or standards it was required to comply with to be eligible for government procurement. Several hospitals returned units as unusable, and some manufacturers had no prior ventilator experience.',
  hospitalEpisodes:
    'Lok Nayak Hospital (Delhi) found ventilators usable for only 10–15% of patients; PGI Chandigarh declined to use 10 units found faulty; Ahmedabad civil hospital wrote to the Central Government (May 2020) that its ventilators were not functioning as required; Karnataka said it would deploy 640 units only after testing confirmed specifications, and later received 2,025 units but clarified they were unnecessary for its government hospitals — its loan scheme was unsuccessful as ventilators did not meet updated oxygen-treatment protocols; Pimpri-Chinchwad (Maharashtra) reported 17 of 72 units broken down and unrepaired (April 2021); Rajasthan formally complained to the Centre about faulty units (April 2021).',
}

// ---------------------------------------------------------------------------
// In popular culture
// ---------------------------------------------------------------------------

export const popularCulture = {
  domain: 'pmcares.fund',
  monthDisplay: 'September 2020',
  summary:
    'An anonymous Reddit user bought pmcares.fund and built a satirical browser game: a figure representing Prime Minister Narendra Modi overcomes obstacles including the judiciary, media and economy, and an error message states that fund details are unavailable because of the lack of government disclosures. It gained wide attention on Twitter and Facebook.',
}

// ---------------------------------------------------------------------------
// Timeline (chronological; month-level display where the article gives no day)
// ---------------------------------------------------------------------------

export type TimelineCategory = 'fund' | 'money' | 'legal' | 'spend'

export interface TimelineEvent {
  date: string
  dateDisplay: string
  event: string
  category: TimelineCategory
}

export const timeline: TimelineEvent[] = [
  {
    date: '2020-03-27',
    dateDisplay: '27 Mar 2020',
    event:
      'PM CARES Fund created in response to the COVID-19 pandemic; operates from the PMO, South Block. Minimum donation ₹10. The Union Cabinet never discussed its creation (per an August 2020 RTI reply).',
    category: 'fund',
  },
  {
    date: '2020-03-28',
    dateDisplay: '28 Mar 2020',
    event:
      'A day after creation, the government allows PM CARES donations to count as CSR expenditure — a circular describing it as a public fund established by the Central Government, with any excess CSR offset in later years. Schedule VII of the Companies Act, 2013 is later retrospectively amended "to remedy the illegality of the original exemption". State-government funds and the PMNRF do not qualify for the same CSR treatment.',
    category: 'legal',
  },
  {
    date: '2020-03-30',
    dateDisplay: '30 Mar 2020',
    event:
      'Opposition parties question the need for a new fund, pointing to the PMNRF’s ₹3,800 crore unspent balance.',
    category: 'fund',
  },
  {
    date: '2020-03-31',
    dateDisplay: 'Mar 2020',
    event:
      'PM CARES is exempted from all FCRA 2010 provisions, permitting foreign contributions — as India sets aside a 15-year policy of declining foreign aid and directs its ambassadors to mobilise donations abroad. An April ordinance grants 80G income-tax exemption for donations before 30 June 2020.',
    category: 'legal',
  },
  {
    date: '2020-04-02',
    dateDisplay: 'Apr 2020',
    event:
      'The PMO indicates the fund is outside CAG audit; CAG officials are later reported as saying they were "not allowed" to audit it.',
    category: 'legal',
  },
  {
    date: '2020-04-03',
    dateDisplay: '3 Apr 2020',
    event:
      'Doctors’ associations at AIIMS New Delhi object to a circular deducting a day’s salary for PM CARES. The administration ultimately withdraws the circular and accepts an opt-in scheme — or donation to any charity of the doctors’ choice.',
    category: 'money',
  },
  {
    date: '2020-04-13',
    dateDisplay: 'Apr 2020',
    event:
      'Similar mandatory/opt-out salary-deduction proposals are withdrawn from three more Delhi hospitals after protests from doctors’ associations: Safdarjung Hospital, ABVIMS-Ram Manohar Lohia Hospital, and Lady Hardinge Medical College.',
    category: 'money',
  },
  {
    date: '2020-04-13',
    dateDisplay: 'Apr 2020',
    event:
      'The Supreme Court dismisses a PIL by Manohar Lal Sharma questioning the legality of the fund’s constitution, describing the petition as "misconceived".',
    category: 'legal',
  },
  {
    date: '2020-04-17',
    dateDisplay: '17 Apr 2020',
    event:
      'Jharkhand High Court sets bail conditions for six petitioners: a ₹35,000 PM CARES donation and installation of the Aarogya Setu tracking app.',
    category: 'legal',
  },
  {
    date: '2020-04-19',
    dateDisplay: '19 Apr 2020',
    event:
      'Supreme Court registry resolves to donate salary deductions (3/2/1 days by grade) to PM CARES — the circular gives employees one day to opt out, and silence counts as consent.',
    category: 'money',
  },
  {
    date: '2020-04-20',
    dateDisplay: '20 Apr 2020',
    event:
      'Delhi University is criticised after funds collected for the National Disaster Relief Fund are redirected to PM CARES without disclosing it to donors — on orders of the Ministry of Human Resources Development; DUTA calls it "a betrayal of trust", noting the university had traditionally supported the NDRF or the Chief Minister’s Relief Fund, through local Staff Associations or the Vice Chancellor’s Relief Fund.',
    category: 'money',
  },
  {
    date: '2020-04-26',
    dateDisplay: '26 Apr 2020',
    event:
      'Navi Mumbai police register a criminal case after a person paid via PhonePe following a call soliciting PM CARES donations that was alleged to be fraudulent.',
    category: 'money',
  },
  {
    date: '2020-05-10',
    dateDisplay: '10 May 2020',
    event:
      'Government officials state that spending and allocations will begin once a "respectable amount" has been collected.',
    category: 'spend',
  },
  {
    date: '2020-05-13',
    dateDisplay: '13 May 2020',
    event:
      'First allocation of ₹3,100 crore: 50,000 made-in-India ventilators for government hospitals, ₹1,000 crore for migrant-worker welfare via states, ₹100 crore for vaccine development support.',
    category: 'spend',
  },
  {
    date: '2020-05-14',
    dateDisplay: '14 May 2020',
    event:
      'Bombay High Court seeks a response from the Government of India on a petition seeking declaration of amounts received and publication of funds received and spent on the fund’s website.',
    category: 'legal',
  },
  {
    date: '2020-05-19',
    dateDisplay: '19 May 2020',
    event:
      'Times of India estimates ₹10,600 crore (US$1.4 billion) was received in the first two months — 53% from private corporations & employees, 42% PSUs, 5% individuals (estimate, not audited).',
    category: 'money',
  },
  {
    date: '2020-05-22',
    dateDisplay: '22 May 2020',
    event:
      'Bengaluru lawyer Praveen Kumar files a criminal complaint against Sonia Gandhi and other opposition leaders over tweets criticising the fund — under IPC section 153 (provocations with intent to cause riots) and section 505(1)(b) (intent to cause fear or alarm in the public).',
    category: 'legal',
  },
  {
    date: '2020-06-01',
    dateDisplay: 'May–Jun 2020',
    event:
      'Two government clinical-evaluation committees (16 May and 1 June) flag sub-standard PM CARES-funded ventilators as insufficient for COVID-19 patients, recommending use only where a back-up ventilator is available.',
    category: 'spend',
  },
  {
    date: '2020-06-05',
    dateDisplay: '5 Jun 2020',
    event:
      'PMO refuses an RTI request for the trust deed, related government documents and income-tax exemption certificates; its own appellate authority upholds the refusal. A second refusal follows on 17 August 2020.',
    category: 'legal',
  },
  {
    date: '2020-06-10',
    dateDisplay: '4 & 10 Jun 2020',
    event:
      'Delhi High Court hears a PIL seeking RTI applicability to the fund (4 June) and Samyak Gangwal’s challenge to the PMO’s refusal to disclose the fund’s establishment and governance (10 June). The litigation is ongoing.',
    category: 'legal',
  },
  {
    date: '2020-06-15',
    dateDisplay: 'Jun 2020',
    event:
      'Opposition leaders criticise the acceptance of donations from Chinese-owned companies after the 2020 China–India skirmishes — amid the Government of India’s own bans on Chinese products, including mobile applications; Punjab CM Amarinder Singh says such donations ought to be returned.',
    category: 'legal',
  },
  {
    date: '2020-06-17',
    dateDisplay: '17 Jun 2020',
    event:
      'Delhi High Court dismisses a professor’s appeal against DU salary deductions, with the court calling the petitioner "stone-hearted".',
    category: 'legal',
  },
  {
    date: '2020-06-21',
    dateDisplay: '21 Jun 2020',
    event:
      'BJP President J.P. Nadda states 60,000 ventilators would be made available via the Fund by the end of June.',
    category: 'spend',
  },
  {
    date: '2020-06-24',
    dateDisplay: '24 Jun 2020',
    event:
      'Only 2,923 of the 50,000 ordered ventilators (6%) have been manufactured; states with high case loads receive allocations (Maharashtra 275, Delhi 275, Gujarat 175, Bihar 100, Karnataka 90, Rajasthan 75).',
    category: 'spend',
  },
  {
    date: '2020-07-16',
    dateDisplay: 'Jul 2020',
    event:
      'Hospital ventilator problems mount: Lok Nayak Hospital (Delhi) finds units deliver insufficient oxygen for all but 10–15% of patients; PGI Chandigarh declines to use 10 faulty units; BJP leader Prabhakar Shinde urges Mumbai’s Municipal Commissioner to act against officials leaving PM CARES ventilators unused.',
    category: 'spend',
  },
  {
    date: '2020-08-01',
    dateDisplay: 'Aug 2020',
    event:
      'Cabinet Secretariat RTI reply reveals the Union Cabinet never discussed the fund’s creation. The Supreme Court rejects a CPIL petition seeking transfer to the NDRF and a CAG audit — holding the government free to transfer between the funds at its discretion and finding existing disaster-relief plans sufficient; a review petition remains pending as of October 2020.',
    category: 'legal',
  },
  {
    date: '2020-08-05',
    dateDisplay: 'Aug 2020',
    event:
      'Punjab and Haryana High Court requires petitioners to deposit ₹1,00,000 as costs into the PM CARES Fund — an order similar to the Jharkhand bail condition.',
    category: 'legal',
  },
  {
    date: '2020-08-10',
    dateDisplay: 'Aug 2020',
    event:
      'Health Ministry discloses under RTI that two indigenously made ventilator models — by Jyoti CNC Automation and Andhra Pradesh MedTech Zone, funded by a ₹225 million PM CARES allocation — failed trials.',
    category: 'spend',
  },
  {
    date: '2020-08-20',
    dateDisplay: 'Aug 2020',
    event:
      'The Nagpur bench petition (notice issued 3 June) seeking fund totals and audit details is dismissed. RTI petitions on migrant-labour allocations are denied; the Chief Labour Commissioner responds that no funds had yet been earmarked for migrant workers.',
    category: 'legal',
  },
  {
    date: '2020-09-07',
    dateDisplay: 'Sep 2020',
    event:
      'A statement on the fund’s website discloses ₹30.76 billion received in 27–31 March 2020 — without donor names or identities.',
    category: 'money',
  },
  {
    date: '2020-09-15',
    dateDisplay: 'Sep 2020',
    event:
      'Trivitron Healthcare confirms an order for 10,000 PM CARES-funded ventilators despite having no prior ventilator-manufacturing experience — designing the product only after receiving the order.',
    category: 'spend',
  },
  {
    date: '2020-09-20',
    dateDisplay: 'Sep 2020',
    event:
      'An anonymous Reddit user launches pmcares.fund — a satirical browser game mocking the fund’s opacity, gaining wide attention on social media.',
    category: 'fund',
  },
  {
    date: '2020-10-01',
    dateDisplay: 'Oct 2020',
    event:
      'An RTI filed with the National Informatics Centre (NIC) reveals pmcares.gov.in is a government domain name, granted only to government entities; further details were refused. Tender issued for 150 PSA oxygen plants.',
    category: 'spend',
  },
  {
    date: '2020-10-15',
    dateDisplay: 'Oct 2020',
    event:
      'APTEL modifies its own order and allows a fine to be paid to the NDRF instead of the PM CARES Fund — accepting the argument that a fund declared not to be a government fund, and kept outside CAG audit, cannot compel donations.',
    category: 'legal',
  },
  {
    date: '2020-12-01',
    dateDisplay: 'Dec 2020',
    event:
      'Trust deed published on the website, describing "a private trust". 101 PSUs report ₹2,400 crore CSR donations plus ₹155 crore from PSU staff salaries.',
    category: 'money',
  },
  {
    date: '2020-12-15',
    dateDisplay: 'Dec 2020',
    event:
      'An application seeks prosecution over the fund’s use of the national emblem, illegal for private entities under the State Emblem of India (Prohibition of Improper Use) Act, 2005.',
    category: 'legal',
  },
  {
    date: '2021-01-01',
    dateDisplay: 'Jan 2021',
    event:
      '100 retired civil servants — including A.S. Dulat (former R&AW chief), K. Sujatha Rao (former Secretary, Family Health) and S.C. Behar — write to the Prime Minister, flagging concerns about the fund’s refusal to disclose information under the RTI Act.',
    category: 'legal',
  },
  {
    date: '2021-01-20',
    dateDisplay: 'Jan 2021',
    event:
      'After Indian embassies in Pakistan and China solicited donations on social media, an RTI application asks whether such donations were received; the High Commissions admit soliciting but confirm none were received.',
    category: 'legal',
  },
  {
    date: '2021-04-10',
    dateDisplay: 'Apr 2021',
    event:
      'Ventilator faults persist: Pimpri-Chinchwad (Maharashtra) reports 17 of 72 PM CARES ventilators broken down and unrepaired; Rajasthan writes to the Central Government about faulty units.',
    category: 'spend',
  },
  {
    date: '2021-04-22',
    dateDisplay: '22 Apr 2021',
    event:
      'During the second-wave oxygen crisis, the Delhi High Court is told only 1 of 8 PM CARES oxygen plants sanctioned for Delhi has been built.',
    category: 'spend',
  },
  {
    date: '2021-04-26',
    dateDisplay: '26 Apr 2021',
    event:
      'PMO announces 551 oxygen plants and 100,000 portable oxygen concentrators.',
    category: 'spend',
  },
  {
    date: '2022-02-07',
    dateDisplay: '7 Feb 2022',
    event:
      'The Hindu reports, per the 2020-21 audit, that one-third of ₹10,990 crore was spent — Wikipedia’s lead notes roughly two-thirds of the corpus remains unspent (as of 2022).',
    category: 'money',
  },
  {
    date: '2022-05-30',
    dateDisplay: '30 May 2022',
    event:
      'The PM CARES for Children scheme is announced for children orphaned by COVID-19 — ₹4,000 per month for daily needs, ₹10 lakh at age 23, education-loan support and Ayushman Bharat cover (scheme design per Frontline). Audited statements later show payments to this scheme are the fund’s only recorded programme spending from FY2023-24 through FY2024-25 (FY2022-23 also paid ₹91.87 crore for oxygen concentrators).',
    category: 'spend',
  },
  {
    date: '2026-08-08',
    dateDisplay: '8 Aug 2026',
    event:
      'The Hindu reports the fund has not published audited accounts for roughly two years — a disclosure gap since the FY2022-23 statement.',
    category: 'money',
  },
  {
    date: '2026-08-18',
    dateDisplay: '18 Aug 2026',
    event:
      'The fund publishes audited Receipts & Payments Accounts for FY2023-24 and FY2024-25 together, signed by KKC & Associates LLP on 7 August 2026 (trust sign-off 6 August): year-end balances ₹7,173.03 crore (31 March 2024) and ₹8,452.07 crore (31 March 2025). Reactions (news tier): NCPRI’s Anjali Bhardwaj and Cmde Lokesh Batra (retd) questioned why over ₹8,000 crore sat idle with minimal spending; CHRI’s Venkatesh Nayak called the release timing “curious” and urged a CAG performance audit; Congress said “₹8,452 crore sitting idle while people suffer. PM CARES? Hardly.” The government maintained the fund is reserved for emergencies (The Telegraph).',
    category: 'money',
  },
]

// ---------------------------------------------------------------------------
// Debate — criticism and government defence, presented side by side
// ---------------------------------------------------------------------------

export interface DebatePoint {
  title: string
  detail: string
}

export const criticism: DebatePoint[] = [
  {
    title: 'RTI exemption',
    detail:
      'The PMO refused RTI requests for the trust deed, government documents and tax-exemption certificates (5 June 2020; upheld on appeal; again 17 August 2020), and told the Delhi High Court the fund is "not a public authority" under the RTI Act. A challenge remains pending in the Delhi High Court.',
  },
  {
    title: '"Private trust" vs government character',
    detail:
      'The trust deed states the fund "is neither intended to be or is in fact owned, controlled or substantially financed by any government or any instrumentality of the government", describing it as a private entity "although it bore the national emblem, and used government infrastructure" — yet an RTI reply once described it as "owned by, controlled by and established by the Government of India". It is chaired by the PM with three ministers as trustees, and even holds a government domain name (pmcares.gov.in — revealed by an RTI filed with the National Informatics Centre) that can only be granted to government entities.',
  },
  {
    title: 'No CAG audit',
    detail:
      'The CAG does not audit the fund; it is audited by a private firm (SARC & Associates). CAG officials said they were "not allowed" to audit it, since the fund is "based on donations of individuals and organisations".',
  },
  {
    title: 'FCRA exemption without CAG audit',
    detail:
      'The fund was exempted from all FCRA 2010 provisions — a law that otherwise requires organisations to register and regularly document foreign funds received — even though Home Ministry orders of 2011 and January 2020 tie FCRA exemptions to compulsory CAG audit. India also set aside its 15-year policy of declining foreign aid and directed ambassadors to mobilise donations; the Home Ministry declined to comment on Russian state-owned Rosoboronexport’s pledge, a departure from the prior policy of accepting foreign donations only from NRIs, PIOs and international organisations.',
  },
  {
    title: 'Default and coerced donations',
    detail:
      'Salary deductions by default (later opt-in) for Revenue Department staff for a full year — about 12% of a month’s salary, which many employees could not afford; military and PSU staff deductions; Supreme Court registry contributions with a one-day opt-out window; Delhi University redirecting NDRF-designated funds on MHRD orders, called "a betrayal of trust" by its teachers’ association. Courts joined in: a ₹35,000 donation (plus Aarogya Setu installation) as a Jharkhand HC bail condition, and ₹1,00,000 as costs ordered by the Punjab & Haryana HC. Hospital deduction circulars (AIIMS, Safdarjung, ABVIMS-RML, Lady Hardinge) were withdrawn only after doctors’ protests.',
  },
  {
    title: 'Fraudulent UPI mimics',
    detail:
      'Days after creation, fake UPI handles imitating the fund (such as pmcare@sbi, missing the "s") aimed to scam donors — Delhi Police booked an individual, and Navi Mumbai police registered a case over a fraudulent PhonePe solicitation. The Press Bureau of India issued a public clarification confirming the genuine handles — pmcares@sbi and pmcares@iob.',
  },
  {
    title: 'Ventilator quality and delivery',
    detail:
      'Only 6% of the 50,000 ordered ventilators existed by 24 June 2020; two government clinical committees flagged sub-standard units (recommended only with a back-up ventilator available); hospitals reported faulty or unusable units (Lok Nayak, PGI Chandigarh, Karnataka, Pimpri-Chinchwad, Rajasthan); and some manufacturers (e.g., Trivitron) had no prior ventilator experience.',
  },
  {
    title: 'CSR asymmetry',
    detail:
      'PM CARES qualified for corporate CSR treatment — retrospectively regularised "to remedy the illegality of the original exemption", and revealed via RTI to have been made at the request of Bhaskar Kulbe, an advisor to the PM — while state relief funds, Chief Ministers’ funds and even the PMNRF did not. A government panel described such double tax benefits as a "regressive incentive".',
  },
  {
    title: 'Undisclosed spending rules',
    detail:
      'The fund has not disclosed its spending or procurement guidelines, and substantial litigation regarding the fund is ongoing per Wikipedia’s lead.',
  },
  {
    title: 'Retired civil servants and opposition',
    detail:
      '100 retired civil servants — including A.S. Dulat (former R&AW chief), K. Sujatha Rao and S.C. Behar — wrote to the Prime Minister (January 2021), flagging concerns about the fund’s refusal to disclose information under the RTI Act; opposition parties and legal scholars repeatedly questioned the fund’s structure.',
  },
]

export const defence: DebatePoint[] = [
  {
    title: 'Independent auditors and receipts',
    detail:
      'The Government of India stated (30 July 2020) that "independent auditors who will be appointed by the trustees" would audit the fund, and agreed to start issuing receipts for donations.',
  },
  {
    title: 'A dedicated emergency fund',
    detail:
      'Officials differentiated PM CARES from the PMNRF: its trust deed gives it a defined objective (unlike the PMNRF’s general relief aims) and allows the Prime Minister to appoint experts as advisors in allocating funds — and, not being government spending, it avoids the authorisation processes applicable to government spending.',
  },
  {
    title: 'Supreme Court on audit demands',
    detail:
      'In August 2020 the Supreme Court rejected a CPIL petition seeking transfer of the fund to the NDRF and a CAG audit — holding the government free to transfer between the funds at its discretion, and finding existing national disaster-relief plans sufficient.',
  },
  {
    title: 'Necessity beyond the pandemic',
    detail:
      'The fund was created amid the COVID-19 outbreak, open to contributions from citizens and organisations alike (minimum ₹10) — with the Prime Minister stating it would also cater to future "distressing situations".',
  },
]

// ---------------------------------------------------------------------------
// Litigation — consolidated view of court cases concerning the fund
// ---------------------------------------------------------------------------

export interface LitigationCase {
  case: string
  forum: string
  dateDisplay: string
  outcome: string
}

export const litigation: LitigationCase[] = [
  {
    case: 'Manohar Lal Sharma PIL questioning the fund’s constitution',
    forum: 'Supreme Court',
    dateDisplay: 'Apr 2020',
    outcome: 'Dismissed as "misconceived"',
  },
  {
    case: 'Bail conditions requiring PM CARES donation (six petitioners) + Aarogya Setu install',
    forum: 'Jharkhand High Court',
    dateDisplay: '17 Apr 2020',
    outcome: '₹35,000 donation ordered as a bail condition',
  },
  {
    case: 'Petition seeking declaration of amounts received and spent',
    forum: 'Bombay High Court',
    dateDisplay: '14 May 2020',
    outcome: 'Court sought a response from the Government of India',
  },
  {
    case: 'Criminal complaint against opposition leaders over fund-critical tweets',
    forum: 'Bengaluru (police complaint)',
    dateDisplay: '22 May 2020',
    outcome:
      'Filed under IPC section 153 (provocations with intent to cause riots) and 505(1)(b) (intent to cause fear or alarm in the public)',
  },
  {
    case: 'Petition seeking fund totals and audit details',
    forum: 'Bombay HC, Nagpur bench',
    dateDisplay: '3 Jun 2020',
    outcome: 'Notice issued to the Government of India; petition later dismissed (Aug 2020)',
  },
  {
    case: 'PIL seeking RTI applicability to the fund',
    forum: 'Delhi High Court',
    dateDisplay: '4 Jun 2020',
    outcome: 'Heard; pending',
  },
  {
    case: 'Samyak Gangwal v. PMO — challenge to RTI refusals on establishment and governance',
    forum: 'Delhi High Court',
    dateDisplay: '10 Jun 2020',
    outcome: 'Ongoing; no judgment reported in the article',
  },
  {
    case: 'DU professor’s appeal against salary deductions',
    forum: 'Delhi High Court',
    dateDisplay: '17 Jun 2020',
    outcome: 'Dismissed, with the petitioner called "stone-hearted"',
  },
  {
    case: 'CPIL petition — transfer to NDRF + CAG audit',
    forum: 'Supreme Court',
    dateDisplay: 'Aug 2020',
    outcome: 'Rejected; review petition pending as of Oct 2020',
  },
  {
    case: 'Court costs of ₹1,00,000 directed to the fund',
    forum: 'Punjab & Haryana High Court',
    dateDisplay: 'Aug 2020',
    outcome: 'Deposit into PM CARES ordered as costs',
  },
  {
    case: 'APTEL fine redirected from PM CARES to NDRF',
    forum: 'Appellate Tribunal for Electricity',
    dateDisplay: 'Oct 2020',
    outcome:
      'Own order modified — accepted argument that a non-government, non-CAG-audited fund cannot compel donations',
  },
]

export const pmnrfComparison = [
  { aspect: 'Created', pmCares: '27 March 2020', pmnrf: '1948' },
  {
    aspect: 'Statute / governing law',
    pmCares: 'None; operates from the PMO',
    pmnrf: 'None; managed by the Prime Minister’s Office',
  },
  {
    aspect: 'Audited by',
    pmCares: 'Private auditors (SARC & Associates, since June 2020)',
    pmnrf: 'Also privately audited — SARC & Associates audited the PMNRF in 2019',
  },
  {
    aspect: 'Public disclosure',
    pmCares: 'Donation and expenditure accounts not published',
    pmnrf: 'Donor names and amounts not disclosed',
  },
  {
    aspect: "Prime Minister's role",
    pmCares: 'Chairperson',
    pmnrf: 'Chairperson',
  },
  {
    aspect: 'FCRA foreign donations',
    pmCares: 'Exempted (2020)',
    pmnrf: 'Exempted',
  },
  {
    aspect: 'Unspent balance (March 2020)',
    pmCares: '—',
    pmnrf: '₹3,800 crore',
  },
]

/** Context the article adds about related funds (Existing relief funds section). */
export const relatedFundsNote =
  'The article adds: the PMNRF (1948) provides relief for natural disasters, calamities and riots, and its donations are income-tax exempt; it has complied with audits questioning its spending (e.g., the 2013 Uttarakhand floods). Chief Ministers of several states questioned the preference for PM CARES over state relief funds, and activists suggested the PMNRF could instead be restructured — bringing it under parliamentary oversight and disclosing details of funding and spending. The National Disaster Response Fund (Disaster Management Act, 2005) is publicly funded and does not accept private donations — the government distinguished PM CARES on exactly that basis. The article also notes the precise PM CARES–PMNRF distinction is itself unclear, since PM CARES’ trust deed and other governing documents were not publicly disclosed.'

// ---------------------------------------------------------------------------
// FAQ (answers based solely on the Wikipedia article)
// ---------------------------------------------------------------------------

export const faq = [
  {
    q: 'What is the PM CARES Fund?',
    a: 'A public charitable trust created on 27 March 2020 during the COVID-19 pandemic, chaired by the Prime Minister with the Defence, Home and Finance Ministers as ex-officio trustees. Its trust deed describes it as a private trust.',
  },
  {
    q: 'When was it created, and did the Cabinet discuss it?',
    a: 'It was created on 27 March 2020. An August 2020 RTI reply from the Cabinet Secretariat revealed the Union Cabinet never discussed its establishment.',
  },
  {
    q: 'How much money did it receive?',
    a: '₹3,076.62 crore in the last five days of FY2019-20 and ₹7,913.55 crore of new money in FY2020-21 — the widely-quoted ₹10,990.17 crore “receipts” figure for FY2020-21 (reproduced by Wikipedia) is the receipts-side total including the ₹3,076.62 crore opening balance, per the fund’s own statement. Year-end balance, 31 March 2021: ₹7,013.99 crore. The Times of India estimated ₹10,600 crore within the first two months. Across all six audited years (FY2019-20 → FY2024-25), receipts total ₹16,598.87 crore and payments ₹8,146.81 crore (both derived), closing at ₹8,452.07 crore on 31 March 2025.',
  },
  {
    q: 'How much of the money was spent?',
    a: 'Per the 2020-21 audit reported by The Hindu, about one-third of the ₹10,990 crore received in FY2020-21 was spent, leaving a year-end balance of ₹7,013.99 crore — Wikipedia’s lead notes roughly two-thirds of the corpus remained unspent as of 2022. Per the fund’s audited statements, cumulative payments FY2019-20 → FY2024-25 total ₹8,146.81 crore (derived), leaving ₹8,452.07 crore on 31 March 2025; The Hindu calculates cumulative spending at 18.4% of total income (news tier, attributed).',
  },
  {
    q: 'How is PM CARES different from the PMNRF?',
    a: 'Both are chaired by the Prime Minister, funded by voluntary donations, and receive no government budget money. The Prime Minister’s National Relief Fund (PMNRF) dates from 1948 and held ₹3,800 crore unspent when PM CARES was created. Donations to both are FCRA-exempted, and donor names and amounts are not disclosed for either fund.',
  },
  {
    q: 'Who audits it?',
    a: 'SARC & Associates, a private chartered-accountancy firm appointed in June 2020, audited the fund through FY2022-23; the FY2023-24 and FY2024-25 statements are audited by KKC & Associates LLP (reports signed August 2026). The CAG does not audit the fund.',
  },
  {
    q: 'Is it under the Right to Information Act?',
    a: 'The PMO has refused RTI requests and told the Delhi High Court the fund is not a "public authority". Critics argue its government character — national emblem, PM as chair, three ministers as trustees — makes it an instrumentality of the state.',
  },
  {
    q: 'Could companies count donations as CSR?',
    a: 'Yes. The government allowed PM CARES contributions as CSR expenditure and retrospectively amended Schedule VII of the Companies Act, 2013.',
  },
  {
    q: 'Could it receive foreign donations?',
    a: 'Yes. A government notification exempted PM CARES from all FCRA 2010 provisions, permitting foreign contributions such as one from Russia’s Rosoboronexport.',
  },
  {
    q: 'What was its first major spending?',
    a: 'On 13 May 2020, ₹3,100 crore was allocated: 50,000 made-in-India ventilators, ₹1,000 crore for migrant-worker welfare via states, and ₹100 crore for vaccine-development support.',
  },
  {
    q: 'What legal cases have involved the fund?',
    a: 'Several. The Supreme Court dismissed a PIL by Manohar Lal Sharma as "misconceived" (April 2020) and rejected a CPIL petition seeking NDRF transfer and CAG audit (August 2020; review pending). The Delhi High Court is hearing Samyak Gangwal’s challenge to the PMO’s RTI refusals, and the electricity appellate tribunal APTEL allowed a fine to be paid to the NDRF instead, holding a non-government fund cannot compel donations. Wikipedia’s lead notes substantial litigation is ongoing.',
  },
  {
    q: 'What tax benefits did donors get?',
    a: 'An April 2020 ordinance granted income-tax exemption under section 80G for donations made before 30 June 2020.',
  },
  {
    q: 'What is the full form of PM CARES?',
    a: 'Prime Minister’s Citizen Assistance and Relief in Emergency Situations Fund. It was created on 27 March 2020 during the COVID-19 pandemic and is chaired by the Prime Minister, with the Defence, Home and Finance Ministers as ex-officio trustees.',
  },
  {
    q: 'Is the PM CARES Fund private or government?',
    a: 'Both descriptions appear in official documents. Its trust deed (published December 2020) describes a private trust neither owned, controlled nor substantially financed by any government — yet it is chaired by the Prime Minister with three ministers as trustees, operates from the PMO, and holds a government domain (pmcares.gov.in). The PMO has told the Delhi High Court the fund is not a “public authority” under the RTI Act, and the CAG does not audit it.',
  },
  {
    q: 'What is the PM CARES Fund controversy?',
    a: 'The documented concerns are: refusal of RTI requests; no CAG audit (a private firm audits it); FCRA exemption despite rules usually tying that exemption to CAG audit; salary deductions that were opt-out rather than opt-in in several departments; undisclosed spending and procurement guidelines; and reports of faulty ventilators and slow oxygen-plant delivery. The government’s responses: trustees appoint independent auditors, the fund has a defined emergency purpose, and the Supreme Court rejected a petition seeking transfer to the NDRF and CAG audit (August 2020).',
  },
  {
    q: 'How was the money utilized?',
    a: 'The first major allocation was ₹3,100 crore on 13 May 2020: 50,000 made-in-India ventilators (₹2,000 crore share, derived), ₹1,000 crore for migrant-worker welfare via states, and ₹100 crore for vaccine-development support. Per the 2020-21 audit reported by The Hindu, about one-third of the ₹10,990 crore received that year was spent. Independent reports flagged delivery gaps: only 2,923 of 50,000 ventilators manufactured by 24 June 2020, and of 162 sanctioned oxygen plants 11 were installed (5 operational) per Scroll.in (April 2021) against a government claim of 33. In FY2024-25, per the fund’s audited statement (primary source), payments totalled ₹87,85,291 (₹0.88 crore) — the PM CARES for Children Scheme (₹87,84,840) plus bank/SMS charges (₹451) — while implementing agencies refunded ₹324.66 crore to the fund.',
  },
  {
    q: 'How much money is in the PM CARES Fund now?',
    a: 'The most recent published figure is ₹8,452.07 crore on 31 March 2025 (savings bank ₹605.41 crore + fixed deposits ₹7,846.65 crore), from the fund’s audited Receipts & Payments Account for FY2024-25 — KKC & Associates LLP, report dated 7 August 2026 (pmcares.gov.in, accessed 28 August 2026). The total amount received across the six audited years (FY2019-20 → FY2024-25) is ₹16,598.87 crore (derived). Earlier: ₹7,013.99 crore on 31 March 2021 (pmcares.gov.in figures via Wikipedia).',
  },
  {
    q: 'What has the PM CARES Fund spent in recent years?',
    a: 'After payments of ₹3,976.17 crore in FY2020-21 and ₹3,716.29 crore in FY2021-22, audited payments fell to ₹437.87 crore in FY2022-23 — ₹346.00 crore for PM CARES for Children and ₹91.87 crore for 99,986 oxygen concentrators, per the statement — then ₹15.60 crore in FY2023-24 and ₹0.88 crore in FY2024-25 — from FY2023-24 onward the only payments (the fund’s entire recorded programme utilization in those years) were PM CARES for Children and bank charges. Domestic donations declined every year, from ₹7,183.78 crore in FY2020-21 to ₹479.05 crore in FY2024-25 (audited statements).',
  },
]

// ---------------------------------------------------------------------------
// Sources and caveats
// ---------------------------------------------------------------------------

export const sources = [
  { label: 'PM CARES Fund — Wikipedia (article source for this site)', url: WIKIPEDIA_URL },
  { label: 'pmcares.gov.in — official fund website', url: 'https://www.pmcares.gov.in' },
  {
    label: 'pmcares.gov.in — audited Receipts & Payments Account FY2024-25 (primary source, accessed 28 August 2026)',
    url: AUDITED_STATEMENT_URL,
  },
  {
    label: 'pmcares.gov.in — audited statement FY2023-24 (primary source, accessed 28 August 2026)',
    url: 'https://pmcares.gov.in/assets/donation/pdf/Audited_Statement_2023_24.pdf',
  },
  {
    label: 'pmcares.gov.in — audited statement FY2022-23 (primary source, accessed 28 August 2026)',
    url: 'https://pmcares.gov.in/assets/donation/pdf/Audited_Statement_2022_23.pdf',
  },
  {
    label: 'pmcares.gov.in — audited statement FY2021-22 (primary source, accessed 28 August 2026)',
    url: 'https://pmcares.gov.in/assets/donation/pdf/Audited_Statement_2021_22.pdf',
  },
  {
    label: 'pmcares.gov.in — audited statement FY2020-21 (primary source, accessed 28 August 2026)',
    url: 'https://pmcares.gov.in/assets/donation/pdf/Audited_Statement_2020_21.pdf',
  },
  {
    label: 'pmcares.gov.in — audited statement FY2019-20 (primary source, accessed 28 August 2026)',
    url: 'https://pmcares.gov.in/assets/donation/pdf/Audited%20Statement.PDF',
  },
  ...newsSources.map((s) => ({
    label: `${s.outlet} (${s.publishedDisplay}) — ${s.title} (news tier)`,
    url: s.url,
  })),
  {
    label: 'The Hindu (7 Feb 2022) — "One-third of ₹10,990 crore spent: 2020-21 audit" (as cited by Wikipedia)',
    url: WIKIPEDIA_URL,
  },
  {
    label: 'Times of India (19 May 2020) — two-month donation estimate (as cited by Wikipedia)',
    url: WIKIPEDIA_URL,
  },
]

export const dataCaveats = [
  'FY2022-23 → FY2024-25 audited-statement figures are primary sources (pmcares.gov.in, accessed 28 August 2026), shown separately from Wikipedia-sourced figures; the tiers are never mixed in one chart or total.',
  'The FY2024-25 receipts total (₹1,279.91 crore) is derived from the statement’s printed totals (₹8,452.95 − ₹7,173.03); itemized lines are reproduced as printed.',
  'FY2023-24 figures were first published to this site as a closing balance only; v2.1 adds the full row from the fund’s separately published FY2023-24 audited statement.',
  'The ₹10,990.17 crore “Receipts” figure for FY2020-21, reproduced by Wikipedia, is the receipts-side total including the ₹3,076.62 crore opening balance (per the fund’s own FY2020-21 statement); new money that year was ₹7,913.55 crore (derived). This site no longer shows the previous ₹14,066.79 crore “received, both years” figure, which double-counted the opening balance.',
  'August 2026 reactions, release timeline and audit-integrity observations are a news tier (The Hindu, The Telegraph, Frontline, India Today, India This Week, Scroll.in, Newslaundry; 18–22 August 2026) — attributed to named people and outlets, never presented as audited fact. Where a news figure conflicted with a statement, the statement won and the news figure was dropped (e.g., one outlet’s FY2023-24 “interest ₹407.50 crore” — the statement shows ₹137.69 crore of savings-bank interest).',
  'The Wikipedia article is tagged “needs update (July 2026)” and still covers FY2019-20 and FY2020-21 only; this site’s FY2021-22 → FY2024-25 figures come from the fund’s own audited statements, which are newer than the article.',
  'The ventilator share (₹2,000 crore) of the 13 May 2020 allocation is derived arithmetic (3,100 − 1,000 − 100); the article itself does not state it explicitly.',
  'The ₹10,600 crore two-month figure and the 53/42/5 donor mix are Times of India estimates, not audited accounts.',
  'The two PSU figures (32 PSUs, ₹2,105 cr, Aug 2020; 101 PSUs, ₹2,400 cr CSR + ₹155 cr salaries, Dec 2020) cover different counts and periods — they must not be summed.',
  'Receipts and balances come from the fund’s own website (private audit), not from the CAG.',
  'Where the article gives only month-level dates, this site shows month-level dates rather than inventing a day.',
  'The Wikipedia article is tagged "needs update (July 2026)"; statements like "two-thirds unspent" reflect the article’s state as of 2022.',
  'The final outcome of the Delhi High Court RTI case is not stated in the article; no verdict is claimed here.',
  'Naming follows the source article verbatim: where Wikipedia writes "Press Bureau of India" (the government agency is formally the Press Information Bureau), this site keeps the article\'s wording.',
  'Some widely-quoted donation amounts (Akshay Kumar ₹25 crore, L&T ₹150 crore, BCCI ₹51 crore and others) appear only in cited headlines, not the article body text — they are shown only in the clearly-labeled "headline-only" list and never charted as facts.',
]

// ---------------------------------------------------------------------------
// About this site — mission, methodology, limitations, feedback
// ---------------------------------------------------------------------------

export const about = {
  what: 'An independent, non-commercial public-information page about India’s PM CARES Fund, built for citizens who want the documented facts — money in, money out, and the debate around transparency — presented graphically and quick to scan.',
  funding: 'This project has no funding, no sponsors and no revenue.',
  repoUrl: 'https://github.com/nilukush/pm-cares-fund-information',
  feedbackUrl: 'https://github.com/nilukush/pm-cares-fund-information/issues',
  principles: [
    {
      title: 'Three labeled tiers',
      detail:
        'Article facts come from one source: the English Wikipedia article on the PM CARES Fund (accessed 16 August 2026). Figures for FY2019-20 through FY2024-25 are verified against the fund’s own audited statements (pmcares.gov.in, accessed 28 August 2026) — a primary tier, never mixed with article-only figures in a chart or total. August 2026 reactions and coverage come from named news outlets — a news tier, always attributed; where tiers disagree, the audited statement wins.',
    },
    {
      title: 'Labeled uncertainty',
      detail:
        'Estimates are marked "estimate", arithmetic-derived numbers are marked "derived", and where the article gives only a month, the site shows only a month — dates are never invented.',
    },
    {
      title: 'Both sides, no verdict',
      detail:
        'Criticism and the government’s defence appear side by side, exactly as documented in the source. The site itself draws no conclusion and takes no position.',
    },
    {
      title: 'No money, no tracking',
      detail:
        'The site is unaffiliated with the Government of India and the PM CARES Fund. It carries no advertising, no analytics and no tracking cookies — there is nothing to sell and nothing measured.',
    },
  ] as DebatePoint[],
  methodology: [
    {
      title: '1 · Extraction',
      detail:
        'Article figures, dates, names and quotations were extracted from the article into a single typed data file; the audited FY2024-25 statement figures come from the fund’s published PDF into the same file. The website renders exclusively from that file — no facts are hard-coded in pages or charts.',
    },
    {
      title: '2 · Independent cross-check',
      detail:
        'The extracted facts were verified against the article’s raw source text (wikitext) by an independent reviewer over three rounds. Seven factual errors and a number of unsupported statements found in earlier drafts were corrected; the final review confirmed every article-tier figure, date, actor and quote is supported by the article.',
    },
    {
      title: '3 · Automated checks',
      detail:
        'An automated test suite (currently over 130 tests) verifies data integrity — allocation totals add up, the timeline is chronological, amounts are positive, pages render correct structure and formatting — and runs on every change and before every deployment.',
    },
  ] as DebatePoint[],
  limitations: [
    'The Wikipedia article is itself tagged "needs update (July 2026)"; some statements (for example, how much of the corpus remains unspent) reflect the article’s state as of 2022.',
    'This page is a snapshot of one article. Developments after the access date may not be reflected, and figures are shown as the article reports them, with their attributions.',
  ],
}
