/**
 * Single source of truth for all site content.
 * Every figure below is taken from the English Wikipedia article "PM CARES Fund"
 * (accessed 15 August 2026), which itself reproduces figures from pmcares.gov.in,
 * news reports and official statements. Estimates and derived values are flagged.
 * Corrected against the raw wikitext per the Verifier agent's cross-check.
 */

export const WIKIPEDIA_URL = 'https://en.wikipedia.org/wiki/PM_CARES_Fund'
export const SITE_URL = 'https://pm-cares-fund-information.vercel.app/'
export const SITE_NAME = 'PM CARES Fund — Facts, Figures & Timeline'
export const DATA_AS_OF = 'Wikipedia, accessed 15 August 2026 (article tagged "needs update – July 2026")'

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
}

export const identity: Identity = {
  fullName:
    "Prime Minister's Citizen Assistance and Relief in Emergency Situations Fund",
  shortName: 'PM CARES Fund',
  formedOn: '2020-03-27',
  formedOnDisplay: '27 March 2020',
  registration:
    'Registered public charitable trust in New Delhi under the Registration Act, 1908; the trust deed (published December 2020) describes it as "a private trust"',
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
}

// ---------------------------------------------------------------------------
// Finances — receipts & balances as published on pmcares.gov.in (via Wikipedia)
// ---------------------------------------------------------------------------

export interface FiscalYearFinance {
  fiscalYear: string
  period: string
  receiptsCrore: number
  balanceCrore: number
}

export const finances = {
  years: [
    {
      fiscalYear: '2019–20',
      period: '27–31 March 2020 only',
      receiptsCrore: 3076.62,
      balanceCrore: 3076.62,
    },
    {
      fiscalYear: '2020–21',
      period: 'full financial year',
      receiptsCrore: 10990.17,
      balanceCrore: 7013.99,
    },
  ] as FiscalYearFinance[],
  /** Wikipedia lead, as of 2022: "two-thirds of the corpus remains unspent". */
  unspentQuote:
    'Roughly two-thirds of the corpus remains unspent (Wikipedia lead, as of 2022); The Hindu reported "one-third of ₹10,990 crore spent" per the 2020-21 audit.',
  /** Times of India estimate, 19 May 2020 — NOT an audited figure. */
  twoMonthEstimateCrore: 10600,
  twoMonthEstimateNote:
    'Times of India estimate (19 May 2020): ₹10,600 crore (US$1.4 billion) received in the first two months — an estimate, not audited accounts.',
  estimateNote: 'Donor mix is a Times of India estimate (19 May 2020), not audited accounts.',
}

export const totalReceiptsCrore = finances.years.reduce((acc, y) => acc + y.receiptsCrore, 0)

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
    note: 'December 2020; a separate count/period from the 32-PSU figure below',
  },
  {
    label: '32 PSUs',
    amountCrore: 2105,
    note: 'Reported August 2020 (The Indian Express); do not sum with the 101-PSU figure',
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
    note: 'Staff salaries/pensions from 20 IITs plus NCERT, BHU, AMU and Central Sanskrit University (₹218.1 million as reported; no per-institution breakdown given)',
  },
]

export const militaryBreakdown = [
  { label: 'Army', amountCrore: 157 },
  { label: 'Air Force', amountCrore: 29.18 },
  { label: 'Navy (officers & sailors)', amountCrore: 12.41 },
  { label: 'Navy (civilians)', amountCrore: 4.36 },
]

/** Salary-deduction practices described in the article (non-₹-figure examples). */
export const salaryDeductionExamples = [
  'Supreme Court registry: 3 days’ salary (officers), 2 (non-gazetted), 1 (Group C) — resolution of 19 April 2020',
  'Revenue Department staff: 1 day’s salary per month, April 2020–March 2021 — initially opt-out (“default”), opt-in from 30 April 2020 after criticism',
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
      note: 'Derived by arithmetic (3,100 − 1,000 − 100); the article states the ₹3,100 crore total, the migrant and vaccine shares, and the 50,000-ventilator order',
    },
    {
      label: 'Migrant worker welfare (via states/UTs)',
      amountCrore: 1000,
      derived: false,
      note: 'Stated as "an additional sum" of ₹1,000 crore for state welfare of migrants',
    },
    {
      label: 'COVID-19 vaccine development support',
      amountCrore: 100,
      derived: false,
      note: 'Wikipedia lead notes this had not been allotted as of 2022',
    },
  ],
}

// ---------------------------------------------------------------------------
// Implementation programmes — promise vs delivery
// ---------------------------------------------------------------------------

export const oxygenProgramme = {
  sanctionedPlants: 162,
  sanctionedNote: 'PSA oxygen plants tendered October 2020 (150 plants), later increased by 12 more',
  installedScroll: 11,
  operationalScroll: 5,
  scrollNote: 'Scroll.in, April 2021: 11 installed, only 5 operational',
  governmentClaimInstalled: 33,
  governmentClaimNote: 'Health Ministry claim, 18 April 2021',
  delhiSanctioned: 8,
  delhiBuilt: 1,
  delhiNote: 'Told to the Delhi High Court, 22 April 2021',
  april2021Announcement: '26 April 2021 (PMO): 551 oxygen plants + 100,000 portable oxygen concentrators',
}

export const ventilatorProgramme = {
  ordered: 50000,
  madeBy: '2020-06-24',
  madeByDate: 2923,
  madeByNote: 'Only 2,923 of 50,000 ventilators (6%) manufactured by 24 June 2020',
  qualityNote:
    'Ventilators purchased under PM CARES drew quality criticism; several hospitals returned units as unusable, and government evaluation panels flagged defects.',
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
      'A day after creation, the government allows PM CARES donations to count as CSR expenditure; Schedule VII of the Companies Act, 2013 is later retrospectively amended.',
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
      'PM CARES is exempted from all FCRA 2010 provisions, permitting foreign contributions; an April ordinance grants 80G income-tax exemption for donations before 30 June 2020.',
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
    date: '2020-04-17',
    dateDisplay: '17 Apr 2020',
    event:
      'Jharkhand High Court sets a ₹35,000 PM CARES donation as a bail condition for six petitioners.',
    category: 'legal',
  },
  {
    date: '2020-04-19',
    dateDisplay: '19 Apr 2020',
    event:
      'Supreme Court registry resolves to donate salary deductions (3/2/1 days by grade) to PM CARES.',
    category: 'money',
  },
  {
    date: '2020-04-20',
    dateDisplay: '20 Apr 2020',
    event:
      'Delhi University is criticised after funds designated for the National Disaster Relief Fund are redirected to PM CARES.',
    category: 'money',
  },
  {
    date: '2020-05-13',
    dateDisplay: '13 May 2020',
    event:
      'First allocation of ₹3,100 crore: 50,000 made-in-India ventilators, ₹1,000 crore for migrant-worker welfare via states, ₹100 crore for vaccine development support.',
    category: 'spend',
  },
  {
    date: '2020-05-19',
    dateDisplay: '19 May 2020',
    event:
      'Times of India estimates ₹10,600 crore (US$1.4 billion) was received in the first two months — 53% from private corporations & employees, 42% PSUs, 5% individuals (estimate, not audited).',
    category: 'money',
  },
  {
    date: '2020-06-05',
    dateDisplay: '5 Jun 2020',
    event:
      'PMO refuses the first RTI request seeking fund details; a second refusal follows on 17 August 2020.',
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
    date: '2020-06-24',
    dateDisplay: '24 Jun 2020',
    event:
      'Only 2,923 of the 50,000 ordered ventilators (6%) have been manufactured.',
    category: 'spend',
  },
  {
    date: '2020-08-01',
    dateDisplay: 'Aug 2020',
    event:
      'Cabinet Secretariat RTI reply reveals the Union Cabinet never discussed the fund’s creation. The Supreme Court rejects a CPIL petition seeking the fund’s transfer to the NDRF and a CAG audit.',
    category: 'legal',
  },
  {
    date: '2020-10-01',
    dateDisplay: 'Oct 2020',
    event:
      'RTI reveals the pmcares.gov.in domain was registered by NIC; tender issued for 150 PSA oxygen plants.',
    category: 'spend',
  },
  {
    date: '2020-12-01',
    dateDisplay: 'Dec 2020',
    event:
      'Trust deed published on the website, describing "a private trust". 101 PSUs report ₹2,400 crore CSR donations plus ₹155 crore from PSU staff salaries.',
    category: 'money',
  },
  {
    date: '2021-01-01',
    dateDisplay: 'Jan 2021',
    event:
      '100 retired civil servants write an open letter flagging the fund’s refusal to disclose under RTI and demanding greater transparency.',
    category: 'legal',
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
      'The PMO refused RTI requests (5 June and 17 August 2020) and told the Delhi High Court the fund is "not a public authority" under the RTI Act.',
  },
  {
    title: '"Private trust" vs government character',
    detail:
      'The trust deed describes a private trust not part of government accounts — yet an RTI reply once described it as "owned by, controlled by and established by the Government of India". It uses the national emblem and is chaired by the PM with three ministers as trustees, which critics argue makes it a public authority.',
  },
  {
    title: 'No CAG audit',
    detail:
      'The CAG does not audit the fund; it is audited by a private firm (SARC & Associates). CAG officials were reported as saying they were "not allowed" to audit it.',
  },
  {
    title: 'FCRA exemption without CAG audit',
    detail:
      'The fund was exempted from all FCRA 2010 provisions, enabling foreign donations (including one from Russia’s Rosoboronexport) — while critics point out that FCRA-exempted bodies are ordinarily expected to face CAG audit.',
  },
  {
    title: 'Default and coerced donations',
    detail:
      'Salary deductions by default (later opt-in) for Revenue Department staff for a full year; military and PSU staff deductions; Supreme Court registry contributions; a ₹35,000 donation set as a bail condition in Jharkhand HC; Delhi University redirecting NDRF-designated funds.',
  },
  {
    title: 'Fraudulent UPI mimics',
    detail:
      'Days after creation, fake UPI handles imitating the fund (such as pmcare@sbi) aimed to scam donors; the Press Bureau of India issued a public clarification confirming the genuine handles — pmcares@sbi and pmcares@iob.',
  },
  {
    title: 'Ventilator quality and delivery',
    detail:
      'Only 6% of the 50,000 ordered ventilators existed by 24 June 2020; purchased units drew quality criticism, several hospitals returned ventilators as unusable, and the manufacturers involved lacked prior experience.',
  },
  {
    title: 'Retired civil servants and opposition',
    detail:
      '100 retired civil servants wrote an open letter (January 2021) flagging the fund’s refusal to disclose under RTI and demanding greater transparency; opposition parties and legal scholars repeatedly questioned the fund’s structure.',
  },
]

export const defence: DebatePoint[] = [
  {
    title: 'Independent auditors and receipts',
    detail:
      'The Government of India stated (30 July 2020) that the trustees appointed independent auditors and that donation receipts are issued to donors.',
  },
  {
    title: 'A dedicated emergency fund',
    detail:
      'Officials differentiated PM CARES from the PMNRF, arguing that a dedicated fund for the COVID-19 emergency enabled faster, focused decisions.',
  },
  {
    title: 'Supreme Court on audit demands',
    detail:
      'In August 2020 the Supreme Court rejected a CPIL petition that sought transfer of the fund to the NDRF and a CAG audit.',
  },
  {
    title: 'Necessity during the pandemic',
    detail:
      'The fund was created as a distress-response measure amid the COVID-19 outbreak, open to contributions from citizens and organisations alike — with a minimum donation of ₹10.',
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
    a: '₹3,076.62 crore in the last five days of FY2019-20 and ₹10,990.17 crore in FY2020-21, leaving a year-end balance of ₹7,013.99 crore (figures from pmcares.gov.in via Wikipedia). The Times of India estimated ₹10,600 crore within the first two months.',
  },
  {
    q: 'How much of the money was spent?',
    a: 'Per the 2020-21 audit reported by The Hindu, about one-third of the ₹10,990 crore received in FY2020-21 was spent, leaving a year-end balance of ₹7,013.99 crore — Wikipedia’s lead notes roughly two-thirds of the corpus remained unspent as of 2022.',
  },
  {
    q: 'How is PM CARES different from the PMNRF?',
    a: 'Both are chaired by the Prime Minister, funded by voluntary donations, and receive no government budget money. The Prime Minister’s National Relief Fund (PMNRF) dates from 1948 and held ₹3,800 crore unspent when PM CARES was created. Donations to both are FCRA-exempted, and donor names and amounts are not disclosed for either fund.',
  },
  {
    q: 'Who audits it?',
    a: 'SARC & Associates, a private chartered-accountancy firm appointed in June 2020 for three years. The CAG does not audit the fund.',
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
    q: 'What tax benefits did donors get?',
    a: 'An April 2020 ordinance granted income-tax exemption under section 80G for donations made before 30 June 2020.',
  },
]

// ---------------------------------------------------------------------------
// Sources and caveats
// ---------------------------------------------------------------------------

export const sources = [
  { label: 'PM CARES Fund — Wikipedia (primary source for this site)', url: WIKIPEDIA_URL },
  { label: 'pmcares.gov.in — official fund website', url: 'https://www.pmcares.gov.in' },
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
  'The ventilator share (₹2,000 crore) of the 13 May 2020 allocation is derived arithmetic (3,100 − 1,000 − 100); the article itself does not state it explicitly.',
  'The ₹10,600 crore two-month figure and the 53/42/5 donor mix are Times of India estimates, not audited accounts.',
  'The two PSU figures (32 PSUs, ₹2,105 cr, Aug 2020; 101 PSUs, ₹2,400 cr CSR + ₹155 cr salaries, Dec 2020) cover different counts and periods — they must not be summed.',
  'Receipts and balances come from the fund’s own website (private audit), not from the CAG.',
  'Where the article gives only month-level dates, this site shows month-level dates rather than inventing a day.',
  'The Wikipedia article is tagged "needs update (July 2026)"; statements like "two-thirds unspent" reflect the article’s state as of 2022.',
  'The final outcome of the Delhi High Court RTI case is not stated in the article; no verdict is claimed here.',
  'Naming follows the source article verbatim: where Wikipedia writes "Press Bureau of India" (the government agency is formally the Press Information Bureau), this site keeps the article\'s wording.',
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
      title: 'Single source',
      detail:
        'Every fact on this site comes from one source: the English Wikipedia article on the PM CARES Fund (accessed 15 August 2026). Nothing is added from memory, opinion or other outlets.',
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
        'Every figure, date, name and quotation was extracted from the article into a single typed data file. The website renders exclusively from that file — no facts are hard-coded in pages or charts.',
    },
    {
      title: '2 · Independent cross-check',
      detail:
        'The extracted facts were verified against the article’s raw source text (wikitext) by an independent reviewer over three rounds. Seven factual errors and a number of unsupported statements found in earlier drafts were corrected; the final review confirmed every figure, date, actor and quote is supported by the article.',
    },
    {
      title: '3 · Automated checks',
      detail:
        'An automated test suite (44 tests) verifies data integrity — allocation totals add up, the timeline is chronological, amounts are positive, pages render correct structure and formatting — and runs on every change and before every deployment.',
    },
  ] as DebatePoint[],
  limitations: [
    'The Wikipedia article is itself tagged "needs update (July 2026)"; some statements (for example, how much of the corpus remains unspent) reflect the article’s state as of 2022.',
    'This page is a snapshot of one article. Developments after the access date may not be reflected, and figures are shown as the article reports them, with their attributions.',
  ],
}
