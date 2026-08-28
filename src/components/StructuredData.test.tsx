import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SITE_URL, WIKIPEDIA_URL, faq } from '../data/fund'
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
})
