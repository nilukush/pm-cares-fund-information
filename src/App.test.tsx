import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'
import { about, faq, timeline } from './data/fund'

describe('App shell — landmarks and navigation', () => {
  it('renders a skip-to-content link', () => {
    render(<App />)
    expect(
      screen.getByRole('link', { name: /skip to main content/i }),
    ).toHaveAttribute('href', '#main')
  })

  it('embeds JSON-LD structured data for search engines and LLMs', () => {
    render(<App />)
    expect(document.querySelectorAll('script[type="application/ld+json"]').length).toBe(1)
  })

  it('renders exactly one h1 naming the fund', () => {
    render(<App />)
    const h1 = screen.getAllByRole('heading', { level: 1 })
    expect(h1).toHaveLength(1)
    expect(h1[0]).toHaveTextContent(/PM CARES Fund/i)
  })

  it('nav links to all eight sections', () => {
    render(<App />)
    for (const id of [
      'overview',
      'finances',
      'donations',
      'spending',
      'timeline',
      'debate',
      'litigation',
      'faq',
      'sources',
      'references',
      'about',
    ]) {
      const link = document.querySelector(`header nav a[href="#${id}"]`)
      expect(link, `nav link to #${id}`).not.toBeNull()
    }
  })
})

describe('Key figures are visible with correct formatting', () => {
  it('shows first-five-day receipts, FY2020-21 receipts and year-end balance', () => {
    render(<App />)
    expect(screen.getAllByText('₹3,076.62 cr').length).toBeGreaterThan(0)
    expect(screen.getAllByText('₹10,990.17 cr').length).toBeGreaterThan(0)
    // FY2020-21 closing balance: Hero note (₹-formatted) + six-year table
    expect(screen.getAllByText(/7,013\.99/).length).toBeGreaterThanOrEqual(2)
  })

  it('marks estimated data as estimates', () => {
    render(<App />)
    expect(screen.getAllByText(/estimate/i).length).toBeGreaterThan(0)
  })
})

describe('Charts — accessible alternatives', () => {
  it('every chart exposes an aria-label and a data table alternative', () => {
    render(<App />)
    const charts = screen.getAllByRole('img', { name: /chart/i })
    expect(charts.length).toBeGreaterThanOrEqual(4)
    const tables = screen.getAllByRole('table')
    expect(tables.length).toBeGreaterThanOrEqual(4)
  })
})

describe('Timeline section', () => {
  it('renders every timeline event with its display date', () => {
    render(<App />)
    for (const e of timeline) {
      expect(screen.getAllByText(e.dateDisplay).length).toBeGreaterThan(0)
    }
  })
})

describe('Debate section — both sides present', () => {
  it('renders criticism and government defence blocks with the PMNRF table', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', { name: /^criticism & controversies/i, level: 3 }),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /government.{0,20}defence|defence/i })).toBeInTheDocument()
    expect(screen.getAllByText(/PM National Relief Fund|PMNRF/i).length).toBeGreaterThan(0)
  })
})

describe('FAQ section', () => {
  it('renders every question as a disclosure summary with its answer', () => {
    render(<App />)
    for (const f of faq) {
      expect(screen.getAllByText(f.q).length).toBeGreaterThan(0)
    }
  })
})

describe('Sources and neutrality', () => {
  it('links to the Wikipedia article and shows caveats', () => {
    render(<App />)
    const wiki = screen.getAllByRole('link', {
      name: /PM CARES Fund — Wikipedia/i,
    })
    expect(wiki.length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/accessed 16 August 2026/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText(/not affiliated/i)).toBeInTheDocument()
  })
})

describe('References section — full Wikipedia citation list', () => {
  it('renders the citation count and sample citations as links', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /^references\b/i, level: 2 })).toBeInTheDocument()
    expect(screen.getAllByText(/citations? as cited by/i).length).toBeGreaterThan(0)
    const official = screen.getAllByRole('link', { name: /about pm cares fund/i })
    expect(official.length).toBeGreaterThan(0)
    expect(official[0]).toHaveAttribute('href', expect.stringContaining('pmcares.gov.in'))
  })

  it('lists the article’s see-also entries', () => {
    render(<App />)
    expect(screen.getAllByText(/COVID-Crypto Relief Fund/i).length).toBeGreaterThan(0)
  })
})

describe('Completeness pass — new sections and enriched content', () => {
  it('renders the litigation section with its cases', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /^litigation/i, level: 2 })).toBeInTheDocument()
    expect(screen.getAllByText(/APTEL/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Gangwal/i).length).toBeGreaterThan(0)
  })

  it('renders the audit card with SARC & Associates detail', () => {
    render(<App />)
    expect(screen.getAllByText(/Sunil Kumar Gupta/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/SARC & Associates/).length).toBeGreaterThan(0)
  })

  it('renders voluntary donors and the satirical-game card', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /who pledged support/i })).toBeInTheDocument()
    expect(screen.getAllByText('Shah Rukh Khan').length).toBeGreaterThan(0)
    expect(screen.getAllByText(/pmcares\.fund/).length).toBeGreaterThan(0)
  })
})

describe('UI/UX audit pass — additive improvements', () => {
  it('Finance KPI strip surfaces the headline story (six-year total, balance, auditor)', () => {
    render(<App />)
    expect(screen.getAllByText('₹16,598.87 cr').length).toBeGreaterThanOrEqual(1)
    expect(screen.queryByText('₹14,066.79 cr')).toBeNull()
    expect(screen.getAllByText(/Audited by/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/not the CAG/i).length).toBeGreaterThanOrEqual(1)
  })

  it('Timeline groups its events by year with counts', () => {
    render(<App />)
    expect(screen.getAllByText(/2020/).length).toBeGreaterThan(0)
    expect(screen.getByText(/\d+ events · 27 Mar 2020 – 18 Aug 2026/)).toBeInTheDocument()
    const y2020 = screen.getByText((_, el) =>
      el?.tagName === 'H3' ? el.textContent?.startsWith('2020') ?? false : false,
    )
    expect(y2020).toBeInTheDocument()
  })

  it('Debate shows visible headings with documented-count chips', () => {
    render(<App />)
    expect(
      screen.getByText(/10 documented concerns/i, { exact: false }),
    ).toBeInTheDocument()
    expect(screen.getByText(/4 documented responses/i, { exact: false })).toBeInTheDocument()
  })

  it('FAQ questions are headings for screen-reader navigation', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', { name: faq[0].q, level: 3 }),
    ).toBeInTheDocument()
  })

  it('Section headers carry SVG icons; footer has a section mini-nav', () => {
    render(<App />)
    const header = document.querySelector('header')
    expect(header!.querySelectorAll('a[href^="#"]').length).toBeGreaterThanOrEqual(11)
    const footer = document.querySelector('footer')
    const footerLinks = footer!.querySelectorAll('a[href^="#"]')
    expect(footerLinks.length).toBeGreaterThanOrEqual(11)
  })
})

describe('About & methodology section', () => {
  it('renders with a heading and the site mission', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /about this site/i })).toBeInTheDocument()
    expect(screen.getByText(about.what, { exact: false })).toBeInTheDocument()
  })

  it('shows all editorial principles and methodology steps', () => {
    render(<App />)
    for (const p of [...about.principles, ...about.methodology]) {
      expect(screen.getByText(p.title)).toBeInTheDocument()
    }
  })

  it('offers a feedback link to GitHub issues and names the limitations', () => {
    render(<App />)
    const feedback = screen.getByRole('link', { name: /report an error/i })
    expect(feedback).toHaveAttribute('href', about.feedbackUrl)
    expect(screen.getByText(/snapshot of one article/i)).toBeInTheDocument()
  })
})

describe('Audited FY2024-25 statement — primary-source tier', () => {
  it('renders the card with the closing balance, auditor and source link', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 3, name: /audited statement/i })).toBeInTheDocument()
    expect(screen.getAllByText(/8,452\.07/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/KKC & Associates/).length).toBeGreaterThan(0)
    const pdf = screen.getByRole('link', { name: /Audited_Statement_2024_25\.pdf/i })
    expect(pdf).toHaveAttribute('rel', 'noopener noreferrer')
    expect(screen.getAllByText(/accessed 28 August 2026/i).length).toBeGreaterThan(0)
  })

  it('labels derived receipts and links the FY2023-24 row to the six-year record', () => {
    render(<App />)
    expect(screen.getAllByText(/derived/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/7,173\.03/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/six-year record above/i).length).toBeGreaterThan(0)
  })

  it('shows the latest balance in the Hero stat strip', () => {
    render(<App />)
    expect(screen.getByText('Latest balance · 31 March 2025')).toBeInTheDocument()
    expect(screen.getAllByText('₹8,452.07 cr').length).toBeGreaterThanOrEqual(2)
  })

  it('adds the auditor-history addendum to the audit card', () => {
    render(<App />)
    expect(screen.getByText(/Auditor history \(primary sources\)/i)).toBeInTheDocument()
    expect(screen.getAllByText(/22084884AXGCSU1642/).length).toBeGreaterThan(0)
  })
})

describe('v2.1 — six-year record, donations and news coverage', () => {
  it('renders the six-year audited record with all six closing balances', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 3, name: /six years of audited balances/i })).toBeInTheDocument()
    expect(screen.getAllByText(/3,076\.62/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/5,415\.66/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/6,283\.68/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/7,173\.03/).length).toBeGreaterThan(0)
  })

  it('renders coverage & reactions with attributed quotes and the defence', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 3, name: /coverage & reactions/i })).toBeInTheDocument()
    expect(screen.getAllByText(/Anjali Bhardwaj/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Lokesh Batra/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Venkatesh Nayak/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/reserved for crises/i).length).toBeGreaterThan(0)
  })

  it('renders the donations-by-year table with derived YoY labels', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 3, name: /donations by year/i })).toBeInTheDocument()
    expect(screen.getAllByText(/7,183\.78/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/−29\.7%|-29\.7%/).length).toBeGreaterThan(0)
  })

  it('Hero relabels the FY2020-21 receipts stat and drops the two-year sum', () => {
    render(<App />)
    expect(screen.getByText('FY2020-21 receipts (as published)')).toBeInTheDocument()
    expect(screen.getAllByText(/new money that year/i).length).toBeGreaterThan(0)
    expect(screen.queryByText(/Total across both years/)).toBeNull()
  })
})

describe('v2.2 — Finances consolidation', () => {
  it('retires the two-year chart and swaps KPI 2 to six-year payments', () => {
    render(<App />)
    expect(screen.queryByText('Money in vs money left')).toBeNull()
    expect(screen.queryByText('Year-end balance · 31 Mar 2021')).toBeNull()
    expect(screen.getAllByText('Payments over six years (derived)').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('₹8,146.81 cr').length).toBeGreaterThanOrEqual(1)
  })

  it('six-year table shows printed receipts-side totals incl. the article figure 10,990.17', () => {
    render(<App />)
    expect(screen.getByRole('columnheader', { name: /receipts-side total, printed/i })).toBeInTheDocument()
    expect(screen.getAllByText('10,990.17').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/two-thirds of the corpus remains unspent/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/September 2020/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/receipts-side total including/i).length).toBeGreaterThanOrEqual(1)
  })

  it('exposes exactly four chart images after retiring the two-year chart', () => {
    render(<App />)
    expect(screen.getAllByRole('img', { name: /chart/i })).toHaveLength(4)
  })

  it('folds the FY2024-25 statement into an open deep-dive inside the six-year record', () => {
    render(<App />)
    const h3 = screen.getByRole('heading', { level: 3, name: /audited statement — FY2024-25/i })
    const details = h3.closest('details')
    expect(details).not.toBeNull()
    expect(details).toHaveAttribute('open')
    expect(document.getElementById('finances')!.contains(details)).toBe(true)
  })

  it('moves coverage & reactions into the debate section', () => {
    render(<App />)
    const debate = document.getElementById('debate')!
    const finances = document.getElementById('finances')!
    expect(within(debate).getByRole('heading', { level: 3, name: /coverage & reactions/i })).toBeInTheDocument()
    expect(within(finances).queryByRole('heading', { level: 3, name: /coverage & reactions/i })).toBeNull()
  })
})
