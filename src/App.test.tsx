import { render, screen } from '@testing-library/react'
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
    expect(screen.getAllByText('₹7,013.99 cr').length).toBeGreaterThan(0)
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
    expect(screen.getByRole('heading', { name: /^references$/i, level: 2 })).toBeInTheDocument()
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
