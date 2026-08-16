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
export const DATA_AS_OF = 'Wikipedia, accessed 16 August 2026 (article tagged "needs update – July 2026")'

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
  purposeScope:
    'Created amid the COVID-19 pandemic; the Prime Minister stated it would also cater to future "distressing situations". Enables micro-donations.',
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
  corpusStatementNote:
    'A statement uploaded to the fund’s website in September 2020 disclosed ₹30.76 billion received between 27 and 31 March 2020 — already below The Times of India’s ₹10,600 crore two-month estimate — but not the names or identities of donors.',
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
    note: 'December 2020; a separate count/period from the 32-PSU figure below.',
  },
  {
    label: '32 PSUs',
    amountCrore: 2105,
    note: 'Reported August 2020 (The Indian Express); do not sum with the 101-PSU figure. Per the RTI replies, in one case the CSR allocation had been exceeded, and in others the allocation had not been finally decided when the transfer was made.',
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
  'The Army shared its figure on Twitter (May 2020) but did not reply to a later RTI petition; the Navy declined to disclose contributions made under any other heads of accounts.'

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
  ],
}

/** Salary-deduction practices described in the article (non-₹-figure examples). */
export const salaryDeductionExamples = [
  'Supreme Court registry: 3 days’ salary (officers), 2 (non-gazetted), 1 (Group C) — resolution of 19 April 2020; the circular gave employees one day to opt out, and silence counted as consent',
  'Revenue Department staff: 1 day’s salary per month, April 2020–March 2021 — initially opt-out (“default”), opt-in from 30 April 2020 after criticism; critics noted it amounted to 12% of a month’s salary, and a former Comptroller-General of Defence Accounts said the opt-out design left employees vulnerable to professional consequences',
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
  cmssNote:
    'Responsibility for constructing the plants lay with the Central Medical Services Society, an autonomous institution under the Central Health Ministry — not with state governments.',
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
    'Ventilators purchased under PM CARES drew quality criticism: two government clinical-evaluation committees (16 May and 1 June 2020) flagged sub-standard units, recommending use only with a back-up ventilator available. Several hospitals returned units as unusable, and some manufacturers had no prior ventilator experience.',
  hospitalEpisodes:
    'Lok Nayak Hospital (Delhi) found ventilators usable for only 10–15% of patients; PGI Chandigarh declined to use 10 units found faulty; Karnataka’s loan scheme was unsuccessful as ventilators did not meet updated oxygen-treatment protocols; Pimpri-Chinchwad (Maharashtra) reported 17 of 72 units broken down and unrepaired (April 2021); Rajasthan formally complained to the Centre about faulty units (April 2021).',
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
      'Delhi University is criticised after funds collected for the National Disaster Relief Fund are redirected to PM CARES without disclosing it to donors — officials say this was on orders of the Ministry of Human Resources Development; DUTA calls it "a betrayal of trust".',
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
      'A Bengaluru lawyer files a criminal complaint against Sonia Gandhi and other opposition leaders over tweets criticising the fund — under IPC sections 153 and 505(1)(b).',
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
      'Opposition leaders criticise the acceptance of donations from Chinese-owned companies after the 2020 China–India skirmishes; Punjab CM Amarinder Singh says such donations ought to be returned.',
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
      'Hospital ventilator problems mount: Lok Nayak Hospital (Delhi) finds units deliver insufficient oxygen for all but 10–15% of patients; PGI Chandigarh declines to use 10 faulty units; a BJP leader urges Mumbai’s Municipal Commissioner to act against officials leaving PM CARES ventilators unused.',
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
      '100 retired civil servants — including A.S. Dulat (former R&AW chief), K. Sujatha Rao and S.C. Behar — write to the Prime Minister, flagging concerns about the fund’s refusal to disclose information under the RTI Act.',
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
      'The trust deed states the fund "is neither intended to be or is in fact owned, controlled or substantially financed by any government or any instrumentality of the government" — yet an RTI reply once described it as "owned by, controlled by and established by the Government of India". It uses the national emblem, is chaired by the PM with three ministers as trustees, and even holds a government domain name (pmcares.gov.in — revealed by an RTI filed with the National Informatics Centre) that can only be granted to government entities.',
  },
  {
    title: 'No CAG audit',
    detail:
      'The CAG does not audit the fund; it is audited by a private firm (SARC & Associates). CAG officials said they were "not allowed" to audit it, since the fund is "based on donations of individuals and organisations".',
  },
  {
    title: 'FCRA exemption without CAG audit',
    detail:
      'The fund was exempted from all FCRA 2010 provisions — even though Home Ministry orders of 2011 and January 2020 tie FCRA exemptions to compulsory CAG audit. India also set aside its 15-year policy of declining foreign aid and directed ambassadors to mobilise donations; the Home Ministry declined to comment on Russian state-owned Rosoboronexport’s pledge, a departure from the prior policy of accepting foreign donations only from NRIs, PIOs and international organisations.',
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
      'Officials differentiated PM CARES from the PMNRF, arguing that a dedicated fund for the COVID-19 emergency enabled faster, focused decisions.',
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
    outcome: 'Filed under IPC sections 153 and 505(1)(b)',
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
  'The article adds: the PMNRF (1948) provides relief for natural disasters, calamities and riots, and its donations are income-tax exempt; it has complied with audits questioning its spending (e.g., the 2013 Uttarakhand floods). Chief Ministers of several states questioned the preference for PM CARES over state relief funds, and activists suggested the PMNRF could instead be restructured under parliamentary oversight. The National Disaster Response Fund (Disaster Management Act, 2005) is publicly funded and does not accept private donations — the government distinguished PM CARES on exactly that basis.'

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
    q: 'What legal cases have involved the fund?',
    a: 'Several. The Supreme Court dismissed a PIL by Manohar Lal Sharma as "misconceived" (April 2020) and rejected a CPIL petition seeking NDRF transfer and CAG audit (August 2020; review pending). The Delhi High Court is hearing Samyak Gangwal’s challenge to the PMO’s RTI refusals, and the electricity appellate tribunal APTEL allowed a fine to be paid to the NDRF instead, holding a non-government fund cannot compel donations. Wikipedia’s lead notes substantial litigation is ongoing.',
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
      title: 'Single source',
      detail:
        'Every fact on this site comes from one source: the English Wikipedia article on the PM CARES Fund (accessed 16 August 2026). Nothing is added from memory, opinion or other outlets.',
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
