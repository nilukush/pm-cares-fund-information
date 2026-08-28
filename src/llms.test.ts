import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const llms = readFileSync(resolve(process.cwd(), 'public/llms.txt'), 'utf8')

describe('llms.txt — AI-assistant grounding file', () => {
  it('declares the primary-source audited statement with URL and accessed date', () => {
    expect(llms).toContain('https://pmcares.gov.in/assets/donation/pdf/Audited_Statement_2024_25.pdf')
    expect(llms).toMatch(/accessed 28 August 2026/i)
  })

  it('carries the audited FY2024-25 balance and labels derived figures', () => {
    expect(llms).toContain('8,452.07')
    expect(llms).toMatch(/derived/i)
    expect(llms).toContain('KKC & Associates')
  })

  it('keeps the Wikipedia attribution intact', () => {
    expect(llms).toContain('https://en.wikipedia.org/wiki/PM_CARES_Fund')
  })

  it('carries the six-year record and the corrected FY2020-21 framing', () => {
    expect(llms).toContain('6,283.68')
    expect(llms).toContain('5,415.66')
    expect(llms).toContain('7,913.55')
    expect(llms).toContain('16,598.87')
    expect(llms).toContain('346.00')
    expect(llms).not.toContain('14,066.79')
  })

  it('declares the news tier', () => {
    expect(llms).toMatch(/news tier/i)
    expect(llms).toContain('18 August 2026')
  })
})
