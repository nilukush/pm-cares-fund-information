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
})
