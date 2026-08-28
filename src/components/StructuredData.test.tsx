import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { DATA_AS_OF_ISO, SITE_URL, WIKIPEDIA_URL, faq } from '../data/fund'
import { StructuredData } from './StructuredData'

function getGraph() {
  const el = document.querySelector('script[type="application/ld+json"]')
  expect(el).not.toBeNull()
  return JSON.parse(el!.textContent ?? '{}')
}

describe('StructuredData — schema.org JSON-LD', () => {
  it('renders exactly one JSON-LD script with a valid @graph', () => {
    render(<StructuredData />)
    expect(document.querySelectorAll('script[type="application/ld+json"]').length).toBe(1)
    const data = getGraph()
    expect(data['@context']).toBe('https://schema.org')
    expect(Array.isArray(data['@graph'])).toBe(true)
  })

  it('describes the WebSite and WebPage at the canonical URL', () => {
    render(<StructuredData />)
    const graph = getGraph()['@graph'] as Array<Record<string, unknown>>
    const website = graph.find((n) => n['@type'] === 'WebSite') as Record<string, unknown>
    const webpage = graph.find((n) => n['@type'] === 'WebPage') as Record<string, unknown>
    expect(website.url).toBe(SITE_URL)
    expect(webpage.url).toBe(SITE_URL)
    expect(String(webpage.name)).toMatch(/PM CARES Fund/i)
  })

  it('exposes every FAQ entry as FAQPage Questions', () => {
    render(<StructuredData />)
    const graph = getGraph()['@graph'] as Array<Record<string, unknown>>
    const faqPage = graph.find((n) => n['@type'] === 'FAQPage') as Record<string, unknown>
    const questions = faqPage.mainEntity as Array<Record<string, unknown>>
    expect(questions.length).toBe(faq.length)
    expect(questions[0].name).toBe(faq[0].q)
    const answer = questions[0].acceptedAnswer as Record<string, unknown>
    expect(answer.text).toBe(faq[0].a)
  })

  it('marks the financial figures as a Dataset derived from Wikipedia', () => {
    render(<StructuredData />)
    const graph = getGraph()['@graph'] as Array<Record<string, unknown>>
    const dataset = graph.find((n) => n['@type'] === 'Dataset') as Record<string, unknown>
    expect(String(dataset.name)).toMatch(/PM CARES Fund/i)
    expect(dataset.isBasedOn).toBe(WIKIPEDIA_URL)
  })

  it('extends the Dataset to FY2024-25 with the primary-source balance', () => {
    render(<StructuredData />)
    const graph = getGraph()['@graph'] as Array<Record<string, unknown>>
    const dataset = graph.find((n) => n['@type'] === 'Dataset') as Record<string, unknown>
    expect(String(dataset.name)).toMatch(/FY2024-25/)
    expect(dataset.temporalCoverage).toBe('2020-03/2025-03')
    const variables = dataset.variableMeasured as string[]
    const primary = variables.find((v) => /primary source/i.test(v))
    expect(primary).toMatch(/8452\.07/)
  })

  it('carries the six-year audited series in variableMeasured', () => {
    render(<StructuredData />)
    const graph = getGraph()['@graph'] as Array<Record<string, unknown>>
    const dataset = graph.find((n) => n['@type'] === 'Dataset') as Record<string, unknown>
    const variables = dataset.variableMeasured as string[]
    const series = variables.find((v) => /audited statements\)/i.test(v))
    expect(series).toMatch(/2022–23: 6283\.68/)
    expect(series).toMatch(/2021–22: 5415\.66/)
  })

  it('labels the article-tier receipts row as the printed receipts-side total', () => {
    render(<StructuredData />)
    const graph = getGraph()['@graph'] as Array<Record<string, unknown>>
    const dataset = graph.find((n) => n['@type'] === 'Dataset') as Record<string, unknown>
    const variables = dataset.variableMeasured as string[]
    const printed = variables.find((v) => /receipts-side total as printed/i.test(v))
    expect(printed, 'article-tier row is relabeled, not a bare "Receipts"').toBeDefined()
    expect(printed).toMatch(/2020–21: 10990\.17/)
  })

  it('exposes machine-readable freshness dates from the data layer', () => {
    expect(DATA_AS_OF_ISO, 'exported in fund.ts as an ISO date').toMatch(/^\d{4}-\d{2}-\d{2}$/)
    render(<StructuredData />)
    const graph = getGraph()['@graph'] as Array<Record<string, unknown>>
    const webpage = graph.find((n) => n['@type'] === 'WebPage') as Record<string, unknown>
    const dataset = graph.find((n) => n['@type'] === 'Dataset') as Record<string, unknown>
    expect(webpage.dateModified).toBe(DATA_AS_OF_ISO)
    expect(dataset.modifiedDate).toBe(DATA_AS_OF_ISO)
  })
})
