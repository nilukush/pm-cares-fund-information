import { describe, expect, it } from 'vitest'
import {
  WIKIPEDIA_URL,
  about,
  audit,
  auditedSeries,
  auditedSeriesTotals,
  auditedStatementFY202425,
  criticism,
  dataCaveats,
  donationsByYear,
  defence,
  donorMix,
  faq,
  finances,
  firstAllocation,
  identity,
  institutionalDonations,
  litigation,
  militaryBreakdown,
  newsAnalysisNotes,
  newsDefence,
  newsReactions,
  newsSources,
  oxygenProgramme,
  pmnrfComparison,
  popularCulture,
  relatedFundsNote,
  sources,
  timeline,
  ventilatorProgramme,
  voluntaryDonors,
} from './fund'

describe('identity — fund basics', () => {
  it('has the exact official name and formation date', () => {
    expect(identity.fullName).toBe(
      "Prime Minister's Citizen Assistance and Relief in Emergency Situations Fund",
    )
    expect(identity.formedOn).toBe('2020-03-27')
  })

  it('is chaired by the PM with three ex-officio ministerial trustees', () => {
    expect(identity.chairperson).toBe('Narendra Modi')
    expect(identity.exOfficioTrustees).toHaveLength(3)
  })

  it('records auditor, minimum donation and registration details', () => {
    expect(identity.auditor).toContain('SARC')
    expect(identity.minimumDonationINR).toBe(10)
    expect(identity.registration).toContain('Registration Act, 1908')
  })
})

describe('finances — receipts and balances (pmcares.gov.in figures via Wikipedia)', () => {
  it('reports both fiscal years with exact receipts and year-end balances', () => {
    expect(finances.years).toHaveLength(2)
    const fy20 = finances.years[0]
    const fy21 = finances.years[1]
    expect(fy20.fiscalYear).toBe('2019–20')
    expect(fy20.receiptsCrore).toBeCloseTo(3076.62, 2)
    expect(fy20.balanceCrore).toBeCloseTo(3076.62, 2)
    expect(fy21.fiscalYear).toBe('2020–21')
    expect(fy21.receiptsCrore).toBeCloseTo(10990.17, 2)
    expect(fy21.balanceCrore).toBeCloseTo(7013.99, 2)
  })

  it('keeps balances non-negative and within opening+receipts', () => {
    for (const y of finances.years) {
      expect(y.balanceCrore).toBeGreaterThanOrEqual(0)
      expect(y.receiptsCrore).toBeGreaterThan(0)
    }
  })

  it('labels the FY2020-21 receipts figure as a side-total that includes the opening balance', () => {
    expect(finances.fy202021ReceiptsNote).toMatch(/10,990\.17/)
    expect(finances.fy202021ReceiptsNote).toMatch(/3,076\.62/)
    expect(finances.fy202021ReceiptsNote).toMatch(/7,913\.55/)
    expect(finances.fy202021ReceiptsNote).toMatch(/derived/i)
  })

  it('donor-mix estimate shares add to 100% and are flagged as estimates', () => {
    const sum = donorMix.reduce((acc, d) => acc + d.sharePercent, 0)
    expect(sum).toBeCloseTo(100, 1)
    expect(donorMix.length).toBe(3)
    expect(finances.estimateNote).toBeTruthy()
  })
})

describe('institutionalDonations — chartable amounts from article body text', () => {
  it('every entry has a positive amount, a label and a note', () => {
    expect(institutionalDonations.length).toBeGreaterThanOrEqual(5)
    for (const d of institutionalDonations) {
      expect(d.amountCrore).toBeGreaterThan(0)
      expect(d.label.length).toBeGreaterThan(3)
      expect(d.note.length).toBeGreaterThan(3)
    }
  })

  it('includes the 101-PSU CSR figure and the military total', () => {
    const labels = institutionalDonations.map((d) => d.label).join(' ')
    expect(institutionalDonations.some((d) => d.amountCrore === 2400)).toBe(true)
    expect(institutionalDonations.some((d) => Math.abs(d.amountCrore - 203.67) < 0.01)).toBe(true)
    expect(labels).toContain('PSU')
  })

  it('military branch breakdown is consistent with the military total (±1 crore)', () => {
    const sum = militaryBreakdown.reduce((acc, m) => acc + m.amountCrore, 0)
    const total = institutionalDonations.find((d) =>
      d.label.toLowerCase().includes('military'),
    )!.amountCrore
    expect(Math.abs(sum - total)).toBeLessThan(1)
  })
})

describe('firstAllocation — 13 May 2020 announcement', () => {
  it('totals ₹3,100 crore with three components', () => {
    expect(firstAllocation.totalCrore).toBe(3100)
    expect(firstAllocation.items).toHaveLength(3)
    const sum = firstAllocation.items.reduce((acc, i) => acc + i.amountCrore, 0)
    expect(sum).toBeCloseTo(firstAllocation.totalCrore, 2)
  })

  it('marks the ventilator share as derived arithmetic', () => {
    const vent = firstAllocation.items.find((i) => i.label.toLowerCase().includes('ventilator'))!
    expect(vent.amountCrore).toBe(2000)
    expect(vent.derived).toBe(true)
    expect(firstAllocation.items.find((i) => i.label.toLowerCase().includes('migrant'))!.amountCrore).toBe(1000)
    expect(firstAllocation.items.find((i) => i.label.toLowerCase().includes('vaccine'))!.amountCrore).toBe(100)
  })
})

describe('implementation programmes — oxygen and ventilators', () => {
  it('oxygen: sanctioned exceeds installed in both reported snapshots', () => {
    expect(oxygenProgramme.sanctionedPlants).toBe(162)
    expect(oxygenProgramme.installedScroll).toBeLessThan(oxygenProgramme.sanctionedPlants)
    expect(oxygenProgramme.governmentClaimInstalled).toBeLessThan(oxygenProgramme.sanctionedPlants)
    expect(oxygenProgramme.delhiSanctioned).toBe(8)
    expect(oxygenProgramme.delhiBuilt).toBe(1)
  })

  it('ventilators: 50,000 ordered; 2,923 made by 24 June 2020', () => {
    expect(ventilatorProgramme.ordered).toBe(50000)
    expect(ventilatorProgramme.madeBy).toBe('2020-06-24')
    expect(ventilatorProgramme.madeByDate).toBe(2923)
  })
})

describe('timeline — chronological events', () => {
  it('has at least 16 events, strictly chronological, each with display date and text', () => {
    expect(timeline.length).toBeGreaterThanOrEqual(16)
    for (let i = 1; i < timeline.length; i++) {
      expect(timeline[i].date >= timeline[i - 1].date).toBe(true)
    }
    for (const e of timeline) {
      expect(e.event.length).toBeGreaterThan(10)
      expect(e.dateDisplay.length).toBeGreaterThan(3)
      expect(['fund', 'money', 'legal', 'spend']).toContain(e.category)
    }
  })

  it('covers creation, first allocation and the audit headline', () => {
    const text = timeline.map((e) => `${e.date} ${e.event}`).join(' ')
    expect(text).toContain('2020-03-27')
    expect(text).toContain('3,100')
    expect(text).toContain('one-third')
  })
})

describe('debate — criticism and defence presented side by side', () => {
  it('has at least 6 criticism and 4 defence items with substance', () => {
    expect(criticism.length).toBeGreaterThanOrEqual(6)
    expect(defence.length).toBeGreaterThanOrEqual(4)
    for (const c of criticism) {
      expect(c.title.length).toBeGreaterThan(5)
      expect(c.detail.length).toBeGreaterThan(20)
    }
    for (const d of defence) {
      expect(d.title.length).toBeGreaterThan(5)
      expect(d.detail.length).toBeGreaterThan(20)
    }
  })

  it('includes the PMNRF comparison table', () => {
    expect(pmnrfComparison.length).toBeGreaterThanOrEqual(6)
    for (const row of pmnrfComparison) {
      expect(row.pmCares.length).toBeGreaterThan(0)
      expect(row.pmnrf.length).toBeGreaterThan(0)
    }
  })
})

describe('faq, sources and caveats', () => {
  it('answers the two highest-intent public queries (spent + PMNRF comparison)', () => {
    expect(faq.some((f) => /how much of the money was spent/i.test(f.q))).toBe(true)
    expect(faq.some((f) => /different from the PMNRF/i.test(f.q))).toBe(true)
  })

  it('has at least 6 non-empty FAQ entries', () => {
    expect(faq.length).toBeGreaterThanOrEqual(6)
    for (const f of faq) {
      expect(f.q.length).toBeGreaterThan(10)
      expect(f.a.length).toBeGreaterThan(30)
    }
  })

  it('cites the Wikipedia article and lists caveats', () => {
    expect(WIKIPEDIA_URL).toBe('https://en.wikipedia.org/wiki/PM_CARES_Fund')
    expect(sources.some((s) => s.url === WIKIPEDIA_URL)).toBe(true)
    expect(dataCaveats.length).toBeGreaterThanOrEqual(3)
  })
})

describe('about — site methodology metadata', () => {
  it('describes what the site is with substance', () => {
    expect(about.what.length).toBeGreaterThan(80)
    expect(about.funding.length).toBeGreaterThan(20)
  })

  it('states at least 3 editorial principles and 3 verification steps', () => {
    expect(about.principles.length).toBeGreaterThanOrEqual(3)
    expect(about.methodology.length).toBeGreaterThanOrEqual(3)
    for (const p of [...about.principles, ...about.methodology]) {
      expect(p.title.length).toBeGreaterThan(5)
      expect(p.detail.length).toBeGreaterThan(40)
    }
  })

  it('discloses known limitations and a working feedback channel', () => {
    expect(about.limitations.length).toBeGreaterThanOrEqual(2)
    expect(about.feedbackUrl).toBe(
      'https://github.com/nilukush/pm-cares-fund-information/issues',
    )
    expect(about.repoUrl).toBe('https://github.com/nilukush/pm-cares-fund-information')
  })
})

describe('completeness pass — content added from the full-article audit', () => {
  it('timeline covers at least 30 events and stays chronological', () => {
    expect(timeline.length).toBeGreaterThanOrEqual(30)
    for (let i = 1; i < timeline.length; i++) {
      expect(timeline[i].date >= timeline[i - 1].date).toBe(true)
    }
  })

  it('captures the hospital salary-deduction reversal episode (AIIMS + 3 Delhi hospitals)', () => {
    const text = timeline.map((e) => e.event).join(' ')
    expect(text).toContain('AIIMS')
    expect(text).toContain('Safdarjung')
    expect(text).toContain('Lady Hardinge')
    expect(text).toMatch(/withdraw/i)
  })

  it('captures the 60,000-ventilator claim and state-wise deliveries', () => {
    expect(ventilatorProgramme.claim60000.dateDisplay).toBe('21 Jun 2020')
    expect(ventilatorProgramme.stateDeliveries.length).toBeGreaterThanOrEqual(5)
    expect(ventilatorProgramme.stateDeliveries.find((s) => s.state === 'Maharashtra')!.units).toBe(275)
    expect(ventilatorProgramme.stateDeliveries.find((s) => s.state === 'Rajasthan')!.units).toBe(75)
  })

  it('exposes the full SARC & Associates detail from the article', () => {
    expect(audit.firm).toContain('SARC')
    expect(audit.details.join(' ')).toContain('Sunil Kumar Gupta')
    expect(audit.details.join(' ')).toContain('Make in India')
    expect(audit.details.join(' ')).toMatch(/selection and appointment process[^.]*not been made public/i)
    expect(audit.details.join(' ')).toMatch(/replacing another private firm/i)
  })

  it('lists the litigation cases with dates and outcomes', () => {
    expect(litigation.length).toBeGreaterThanOrEqual(9)
    for (const c of litigation) {
      expect(c.case.length).toBeGreaterThan(10)
      expect(c.dateDisplay.length).toBeGreaterThan(3)
      expect(c.outcome.length).toBeGreaterThan(5)
    }
    const all = litigation.map((c) => `${c.case} ${c.outcome}`).join(' ')
    expect(all).toContain('CPIL')
    expect(all).toContain('Gangwal')
    expect(all).toContain('APTEL')
    expect(all).toContain('Sharma')
  })

  it('lists voluntary donors from the body text and clearly labels headline-only amounts', () => {
    expect(voluntaryDonors.corporations.length).toBeGreaterThanOrEqual(7)
    expect(voluntaryDonors.individuals.length).toBeGreaterThanOrEqual(4)
    expect(voluntaryDonors.corporations.join(' ')).toContain('TATA Trust')
    expect(voluntaryDonors.individuals).toContain('Shah Rukh Khan')
    expect(voluntaryDonors.titleOnlyAmounts.length).toBeGreaterThanOrEqual(6)
    for (const t of voluntaryDonors.titleOnlyAmounts) {
      expect(t.note.toLowerCase()).toContain('headline')
    }
  })

  it('captures the satirical game and oxygen-programme responsibility', () => {
    expect(popularCulture.domain).toBe('pmcares.fund')
    expect(popularCulture.summary).toContain('Reddit')
    expect(oxygenProgramme.cmssNote).toContain('Central Medical Services Society')
  })

  it('criticism now covers hospital reversals, CSR asymmetry and undisclosed spending rules', () => {
    expect(criticism.length).toBeGreaterThanOrEqual(9)
    const all = criticism.map((c) => `${c.title} ${c.detail}`).join(' ')
    expect(all).toContain('AIIMS')
    expect(all).toMatch(/regressive incentive/i)
    expect(all).toMatch(/spending or procurement guidelines/i)
  })

  it('defence reflects the fund’s stated purpose beyond COVID-19', () => {
    expect(defence.map((d) => d.detail).join(' ')).toContain('distressing situations')
  })

  it('captures the re-audit cross-validated gaps (Ahmedabad, Karnataka counts, experts, purpose)', () => {
    expect(ventilatorProgramme.hospitalEpisodes).toContain('Ahmedabad')
    expect(ventilatorProgramme.hospitalEpisodes).toContain('2,025')
    expect(ventilatorProgramme.hospitalEpisodes).toContain('640')
    expect(identity.purposeScope).toContain('disaster management and research')
    expect(identity.expertsNote).toContain('advisory panel of ten members')
    expect(defence.map((d) => d.detail).join(' ')).toContain('authorisation processes')
    expect(ventilatorProgramme.qualityNote).toContain('no guidelines or standards')
    expect(voluntaryDonors.titleOnlyAmounts.length).toBeGreaterThanOrEqual(10)
    const allTimeline = timeline.map((e) => e.event).join(' ')
    expect(allTimeline).toContain('Praveen Kumar')
    expect(allTimeline).toContain('Prabhakar Shinde')
  })

  it('captures the four final-audit sub-clauses (DUTA channels, PMO RTI denial, IPC glosses, PMNRF disclosure)', () => {
    const allTimeline = timeline.map((e) => e.event).join(' ')
    expect(allTimeline).toContain('Staff Associations')
    expect(allTimeline).toContain('Vice Chancellor’s Relief Fund')
    expect(allTimeline).toMatch(/intent to cause riots/)
    expect(allTimeline).toMatch(/fear or alarm/)
    const psuNote = institutionalDonations.find((d) => d.label === '32 PSUs')!.note
    expect(psuNote).toMatch(/Prime Minister’s Office was denied/)
    expect(relatedFundsNote).toMatch(/disclosing details of funding and spending/)
  })
})

describe('audited statement — FY2024-25 primary tier', () => {
  it('is marked as a primary source with URL, accessed date and auditor', () => {
    expect(auditedStatementFY202425.sourceTier).toBe('primary')
    expect(auditedStatementFY202425.sourceUrl).toBe(
      'https://pmcares.gov.in/assets/donation/pdf/Audited_Statement_2024_25.pdf',
    )
    expect(auditedStatementFY202425.accessedDisplay).toContain('28 August 2026')
    expect(auditedStatementFY202425.auditorFirm).toContain('KKC & Associates')
    expect(auditedStatementFY202425.reportDated).toContain('7 August 2026')
  })

  it('carries the identity-verified figures exactly', () => {
    expect(auditedStatementFY202425.openingBalanceCrore).toBeCloseTo(7173.03, 2)
    expect(auditedStatementFY202425.receiptsTotalCrore).toBeCloseTo(1279.91, 2)
    expect(auditedStatementFY202425.paymentsTotalRupee).toBe(8785291)
    expect(auditedStatementFY202425.paymentsTotalCrore).toBeCloseTo(0.88, 2)
    expect(auditedStatementFY202425.closingBalanceCrore).toBeCloseTo(8452.07, 2)
    expect(auditedStatementFY202425.priorYearClosingCrore).toBeCloseTo(7173.03, 2)
  })

  it('satisfies the statement’s accounting identity within scan tolerance', () => {
    const { openingBalanceCrore, receiptsTotalCrore, paymentsTotalCrore, closingBalanceCrore } =
      auditedStatementFY202425
    // stored figures are 2dp-rounded, so the rupee-exact identity holds within ±0.02 crore
    expect(Math.abs(openingBalanceCrore + receiptsTotalCrore - paymentsTotalCrore - closingBalanceCrore)).toBeLessThanOrEqual(0.02)
    expect(
      Math.abs(
        auditedStatementFY202425.openingSplit.savingsBankCrore +
          auditedStatementFY202425.openingSplit.fixedDepositsCrore -
          openingBalanceCrore,
      ),
    ).toBeLessThanOrEqual(0.02)
    expect(
      Math.abs(
        auditedStatementFY202425.closingSplit.savingsBankCrore +
          auditedStatementFY202425.closingSplit.fixedDepositsCrore -
          closingBalanceCrore,
      ),
    ).toBeLessThanOrEqual(0.02)
  })

  it('payments itemization sums to the rupee-exact total', () => {
    const itemized = auditedStatementFY202425.paymentsItemized.reduce(
      (acc, item) => acc + (item.amountRupee ?? 0),
      0,
    )
    expect(itemized).toBe(auditedStatementFY202425.paymentsTotalRupee)
  })

  it('receipts itemization is consistent with the derived total', () => {
    const itemized = auditedStatementFY202425.receiptsItemized.reduce(
      (acc, item) => acc + item.amountCrore,
      0,
    )
    // six 2dp-rounded lines can drift from the exact sum by at most 0.03 crore
    expect(Math.abs(itemized - auditedStatementFY202425.receiptsTotalCrore)).toBeLessThanOrEqual(0.03)
  })

  it('double-anchors the FY2023-24 closing balance and labels derived receipts', () => {
    expect(auditedStatementFY202425.priorYearClosingCrore).toBe(
      auditedStatementFY202425.openingBalanceCrore,
    )
    expect(auditedStatementFY202425.receiptsDerived).toBe(true)
    expect(auditedStatementFY202425.receiptsNote).toMatch(/derived/i)
    for (const item of auditedStatementFY202425.receiptsItemized) {
      expect(item.amountCrore).toBeGreaterThan(0)
    }
  })

  it('keeps article rows and the primary tier separate (no mixed finances.years)', () => {
    expect(finances.years).toHaveLength(2)
    for (const y of finances.years) {
      expect(y.sourceTier).toBe('article')
    }
  })

  it('adds the five query-aligned FAQ aliases and the recent-spending FAQ', () => {
    expect(faq.length).toBe(18)
    expect(faq.some((f) => /full form of PM CARES/i.test(f.q))).toBe(true)
    expect(faq.some((f) => /private or government/i.test(f.q))).toBe(true)
    expect(faq.some((f) => /controversy/i.test(f.q))).toBe(true)
    expect(faq.some((f) => /how was the money utilized/i.test(f.q))).toBe(true)
    expect(faq.some((f) => /how much money is in the PM CARES Fund now/i.test(f.q))).toBe(true)
    expect(faq.some((f) => /what has the PM CARES Fund spent in recent years/i.test(f.q))).toBe(true)
    const utilizationFaq = faq.find((f) => /how was the money utilized/i.test(f.q))
    expect(utilizationFaq).toBeDefined()
    const utilization = utilizationFaq?.a ?? ''
    expect(utilization).toContain('₹87,85,291')
    expect(utilization).toContain('PM CARES for Children')
    expect(utilization).toContain('324.66')
  })

  it('uses the total-amount and utilization phrasing people search for', () => {
    const nowFaq = faq.find((f) => /how much money is in the PM CARES Fund now/i.test(f.q))
    expect(nowFaq).toBeDefined()
    expect(nowFaq?.a).toContain('total amount')
    expect(nowFaq?.a).toContain('16,598.87')
    expect(faq.some((f) => /utilization/i.test(f.a))).toBe(true)
  })

  it('declares the primary source in sources and the caveats', () => {
    expect(sources.some((s) => s.url.includes('Audited_Statement_2024_25'))).toBe(true)
    expect(dataCaveats.some((c) => /primary source/i.test(c))).toBe(true)
    expect(about.principles.some((p) => /three labeled tiers/i.test(p.title))).toBe(true)
  })
})

describe('auditedSeries — six-year primary record', () => {
  it('has six fiscal years FY2019-20 → FY2024-25 in order', () => {
    expect(auditedSeries.map((y) => y.fiscalYear)).toEqual([
      '2019–20',
      '2020–21',
      '2021–22',
      '2022–23',
      '2023–24',
      '2024–25',
    ])
  })

  it('each year satisfies opening + receipts-during − payments = closing within 0.02 crore', () => {
    for (const y of auditedSeries) {
      expect(
        Math.abs(y.openingBalanceCrore + y.receiptsDuringCrore - y.paymentsTotalCrore - y.closingBalanceCrore),
      ).toBeLessThanOrEqual(0.02)
    }
  })

  it('closing balances match the verified figures', () => {
    const closings = auditedSeries.map((y) => y.closingBalanceCrore)
    expect(closings[0]).toBeCloseTo(3076.62, 2)
    expect(closings[1]).toBeCloseTo(7013.99, 2)
    expect(closings[2]).toBeCloseTo(5415.66, 2)
    expect(closings[3]).toBeCloseTo(6283.68, 2)
    expect(closings[4]).toBeCloseTo(7173.03, 2)
    expect(closings[5]).toBeCloseTo(8452.07, 2)
  })

  it('receipts-during match and carry derived flags', () => {
    const rows = auditedSeries.map((y) => [y.receiptsDuringCrore, y.receiptsDerived] as const)
    expect(rows[0][0]).toBeCloseTo(3076.62, 2)
    expect(rows[0][1]).toBe(false)
    expect(rows[1][0]).toBeCloseTo(7913.55, 2)
    expect(rows[1][1]).toBe(true)
    expect(rows[2][0]).toBeCloseTo(2117.95, 2)
    expect(rows[3][0]).toBeCloseTo(1305.9, 2)
    expect(rows[4][0]).toBeCloseTo(904.94, 2)
    expect(rows[5][0]).toBeCloseTo(1279.91, 2)
  })

  it('chain continuity: each opening equals the prior closing', () => {
    for (let i = 1; i < auditedSeries.length; i++) {
      expect(auditedSeries[i].openingBalanceCrore).toBe(auditedSeries[i - 1].closingBalanceCrore)
    }
  })

  it('FY2022-23 PM CARES for Children payment is 346.00 crore (printed), not 34.60', () => {
    const fy2223 = auditedSeries.find((y) => y.fiscalYear === '2022–23')
    const children = fy2223?.paymentsItemized?.find((p) => /children/i.test(p.label))
    expect(children).toBeDefined()
    expect(children?.amountCrore).toBeCloseTo(346.0, 2)
    expect(children?.amountCrore).not.toBeCloseTo(34.6, 1)
    const oxygen = fy2223?.paymentsItemized?.find((p) => /concentrators/i.test(p.label))
    expect(oxygen?.amountCrore).toBeCloseTo(91.87, 2)
  })

  it('FY2022-23 payments itemization sums to 437.87 within 0.02', () => {
    const fy2223 = auditedSeries.find((y) => y.fiscalYear === '2022–23')
    const sum = (fy2223?.paymentsItemized ?? []).reduce((a, p) => a + p.amountCrore, 0)
    expect(Math.abs(sum - (fy2223?.paymentsTotalCrore ?? 0))).toBeLessThanOrEqual(0.02)
  })

  it('auditors: SARC with UDINs for FY2021-22/FY2022-23; KKC without UDIN for FY2023-24/FY2024-25', () => {
    const byFy = (fy: string) => auditedSeries.find((y) => y.fiscalYear === fy)?.auditor
    expect(byFy('2021–22')?.firm).toContain('SARC')
    expect(byFy('2021–22')?.udin).toBe('22084884AXGCSU1642')
    expect(byFy('2022–23')?.udin).toBe('24084884BKIKDZ2614')
    expect(byFy('2023–24')?.firm).toContain('KKC')
    expect(byFy('2023–24')?.udin).toBeUndefined()
    expect(byFy('2024–25')?.udin).toBeUndefined()
  })

  it('omits itemization where scan digits are garbled, with notes', () => {
    const fy2021 = auditedSeries.find((y) => y.fiscalYear === '2020–21')
    const fy2122 = auditedSeries.find((y) => y.fiscalYear === '2021–22')
    expect(fy2021?.receiptsItemized).toBeUndefined()
    expect(fy2021?.receiptsItemizationNote).toBeTruthy()
    expect(fy2122?.receiptsItemized).toBeUndefined()
    expect(fy2122?.receiptsItemizationNote).toBeTruthy()
  })

  it('FY2024-25 row equals the auditedStatementFY202425 card figures (anti-drift)', () => {
    const fy2425 = auditedSeries.find((y) => y.fiscalYear === '2024–25')
    expect(fy2425?.openingBalanceCrore).toBe(auditedStatementFY202425.openingBalanceCrore)
    expect(fy2425?.receiptsDuringCrore).toBe(auditedStatementFY202425.receiptsTotalCrore)
    expect(fy2425?.paymentsTotalCrore).toBe(auditedStatementFY202425.paymentsTotalCrore)
    expect(fy2425?.closingBalanceCrore).toBe(auditedStatementFY202425.closingBalanceCrore)
  })

  it('every row links a verified pmcares.gov.in statement URL', () => {
    for (const y of auditedSeries) {
      expect(y.statementUrl).toMatch(/^https:\/\/pmcares\.gov\.in\/assets\/donation\/pdf\//)
    }
  })

  it('derived six-year totals equal the sums', () => {
    const receipts = auditedSeries.reduce((a, y) => a + y.receiptsDuringCrore, 0)
    const payments = auditedSeries.reduce((a, y) => a + y.paymentsTotalCrore, 0)
    expect(Math.abs(auditedSeriesTotals.receiptsCrore - receipts)).toBeLessThanOrEqual(0.02)
    expect(Math.abs(auditedSeriesTotals.paymentsCrore - payments)).toBeLessThanOrEqual(0.02)
    expect(auditedSeriesTotals.receiptsCrore).toBeCloseTo(16598.87, 1)
    expect(auditedSeriesTotals.paymentsCrore).toBeCloseTo(8146.81, 1)
  })
})

describe('donationsByYear — primary-tier decline series', () => {
  it('declines monotonically FY2020-21 → FY2024-25 (domestic and foreign)', () => {
    for (let i = 1; i < donationsByYear.length; i++) {
      expect(donationsByYear[i].domesticCrore).toBeLessThan(donationsByYear[i - 1].domesticCrore)
      expect(donationsByYear[i].foreignCrore).toBeLessThan(donationsByYear[i - 1].foreignCrore)
    }
  })

  it('FY2024-25 YoY ≈ −29.7% and totals are consistent', () => {
    const last = donationsByYear[donationsByYear.length - 1]
    expect(last.yoyChangePercent).toBeCloseTo(-29.7, 0)
    expect(last.totalCrore).toBeCloseTo(last.domesticCrore + last.foreignCrore, 2)
  })

  it('excludes FY2019-20 with an explanatory note', () => {
    expect(donationsByYear.some((d) => d.fiscalYear === '2019–20')).toBe(false)
    expect(donationsByYear[0].fiscalYear).toBe('2020–21')
  })
})

describe('news tier — August 2026 coverage', () => {
  it('lists seven news sources with outlet and date', () => {
    expect(newsSources).toHaveLength(7)
    for (const s of newsSources) {
      expect(s.outlet).toBeTruthy()
      expect(s.url).toMatch(/^https:\/\//)
      expect(s.publishedDisplay).toBeTruthy()
    }
  })

  it('every reaction carries a quote, attribution and a source id', () => {
    for (const r of newsReactions) {
      expect(r.quote).toBeTruthy()
      expect(r.attribution).toMatch(/,/)
      expect(newsSources.some((s) => s.id === r.sourceId)).toBe(true)
      expect(['criticism', 'defence', 'audit-observation']).toContain(r.kind)
    }
  })

  it('includes the government defence adjacent to criticism', () => {
    expect(newsDefence).toMatch(/reserved for crises/i)
    expect(newsDefence).toMatch(/Telegraph/)
    expect(newsReactions.some((r) => r.kind === 'criticism')).toBe(true)
    expect(newsReactions.some((r) => r.kind === 'audit-observation')).toBe(true)
  })

  it('drops news figures that conflict with the statements', () => {
    const allNewsText = [...newsReactions.map((r) => r.quote), ...newsAnalysisNotes].join(' ')
    expect(allNewsText).not.toContain('407.50')
    expect(allNewsText).not.toContain('34.60') // the mis-scaled children figure never appears
  })
})

describe('v2.1 — timeline, sources and caveats', () => {
  it('covers the 2022 Children scheme and the 2026 disclosure events', () => {
    const dates = timeline.map((e) => e.date)
    expect(dates).toContain('2022-05-30')
    expect(dates).toContain('2026-08-08')
    expect(dates).toContain('2026-08-18')
    const release = timeline.find((e) => e.date === '2026-08-18')
    expect(release?.event).toContain('8,452.07')
    expect(release?.event).toContain('KKC')
  })

  it('declares seven news sources and the statement PDFs in sources', () => {
    const newsCount = sources.filter((s) => /news tier|The Hindu|Scroll|India Today|Frontline|Telegraph|India This Week|Newslaundry/.test(s.label)).length
    expect(newsCount).toBeGreaterThanOrEqual(7)
    const pdfCount = sources.filter((s) => s.url.includes('pmcares.gov.in/assets/donation/pdf')).length
    expect(pdfCount).toBeGreaterThanOrEqual(6)
  })

  it('caveats explain the FY2020-21 relabel and the news tier', () => {
    expect(dataCaveats.some((c) => /double-count|14,066\.79/.test(c))).toBe(true)
    expect(dataCaveats.some((c) => /news tier/i.test(c))).toBe(true)
    expect(about.principles.some((p) => /three labeled tiers/i.test(p.title))).toBe(true)
  })
})
