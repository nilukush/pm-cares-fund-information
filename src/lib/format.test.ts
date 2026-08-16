import { describe, expect, it } from 'vitest'
import { formatCrore, formatINR, formatPercent } from './format'

describe('formatINR — Indian digit grouping', () => {
  it('groups the last three digits, then pairs', () => {
    expect(formatINR(123456)).toBe('1,23,456')
  })

  it('leaves numbers up to 999 ungrouped', () => {
    expect(formatINR(999)).toBe('999')
  })

  it('groups exactly four digits as thousands', () => {
    expect(formatINR(1000)).toBe('1,000')
  })

  it('keeps two decimal places when present', () => {
    expect(formatINR(10991.17)).toBe('10,991.17')
  })

  it('preserves a negative sign after grouping', () => {
    expect(formatINR(-123456)).toBe('-1,23,456')
  })

  it('groups crore-scale numbers in lakh/crore pairs', () => {
    expect(formatINR(3092000)).toBe('30,92,000')
  })
})

describe('formatCrore — ₹ crore amounts for charts and cards', () => {
  it('renders whole crore amounts with the cr suffix', () => {
    expect(formatCrore(3100)).toBe('₹3,100 cr')
  })

  it('renders decimal crore amounts compactly', () => {
    expect(formatCrore(10991.17)).toBe('₹10,991.17 cr')
  })

  it('renders small amounts without grouping', () => {
    expect(formatCrore(100)).toBe('₹100 cr')
  })

  it('returns an em dash for null, undefined, NaN or negative input', () => {
    expect(formatCrore(null)).toBe('—')
    expect(formatCrore(undefined)).toBe('—')
    expect(formatCrore(Number.NaN)).toBe('—')
    expect(formatCrore(-1)).toBe('—')
  })
})

describe('formatPercent — share-of-total labels', () => {
  it('formats to one decimal by default', () => {
    expect(formatPercent(35.46)).toBe('35.5%')
  })

  it('honours an explicit decimal count', () => {
    expect(formatPercent(35.44, 2)).toBe('35.44%')
  })

  it('drops trailing zeros', () => {
    expect(formatPercent(50)).toBe('50%')
  })

  it('returns an em dash for invalid input', () => {
    expect(formatPercent(Number.NaN)).toBe('—')
  })
})
