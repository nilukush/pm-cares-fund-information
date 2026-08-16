import { describe, expect, it } from 'vitest'
import { references, seeAlso } from './references'

describe('references — Wikipedia citation extract (auto-generated)', () => {
  it('captures the full citation list of the article', () => {
    expect(references.length).toBeGreaterThanOrEqual(100)
  })

  it('every citation has a title; nearly all have URLs and publishers', () => {
    for (const r of references) {
      expect(r.title.length).toBeGreaterThan(3)
    }
    expect(references.filter((r) => r.url).length).toBeGreaterThanOrEqual(100)
    expect(references.filter((r) => r.work).length).toBeGreaterThanOrEqual(100)
  })

  it('includes the official fund website and the article’s see-also links', () => {
    expect(references.some((r) => r.url.includes('pmcares.gov.in'))).toBe(true)
    expect(seeAlso.length).toBe(2)
    expect(seeAlso.some((s) => s.label.includes('National Relief Fund'))).toBe(true)
    expect(seeAlso.some((s) => s.label.includes('COVID-Crypto'))).toBe(true)
  })
})
