import { describe, expect, it } from 'vitest'
import {
  WIKIPEDIA_URL,
  about,
  criticism,
  dataCaveats,
  defence,
  donorMix,
  faq,
  finances,
  firstAllocation,
  identity,
  institutionalDonations,
  militaryBreakdown,
  oxygenProgramme,
  pmnrfComparison,
  sources,
  timeline,
  totalReceiptsCrore,
  ventilatorProgramme,
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

  it('exposes the sum of receipts as the total corpus figure', () => {
    const sum = finances.years.reduce((acc, y) => acc + y.receiptsCrore, 0)
    expect(totalReceiptsCrore).toBeCloseTo(sum, 1)
    expect(totalReceiptsCrore).toBeCloseTo(14066.79, 1)
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
