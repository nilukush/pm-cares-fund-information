/**
 * Formatting helpers for the PM CARES data layer.
 * All amounts on the site are expressed in ₹ crore, as reported by Wikipedia.
 */

const INVALID = '—'

function groupIndianDigits(value: number): string {
  const isNegative = value < 0
  const [intPart, decPart] = Math.abs(value).toString().split('.')
  let grouped: string
  if (intPart.length <= 3) {
    grouped = intPart
  } else {
    // Indian numbering: last 3 digits, then groups of 2 (lakh, crore, …)
    const last3 = intPart.slice(-3)
    const rest = intPart.slice(0, -3)
    grouped = `${rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',')},${last3}`
  }
  return `${isNegative ? '-' : ''}${grouped}${decPart ? `.${decPart}` : ''}`
}

/** Indian-locale digit grouping, e.g. 123456 → "1,23,456". */
export function formatINR(value: number): string {
  return groupIndianDigits(value)
}

/** ₹ crore amount for cards/labels, e.g. 3100 → "₹3,100 cr". Invalid input → "—". */
export function formatCrore(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value) || value < 0) {
    return INVALID
  }
  return `₹${groupIndianDigits(value)} cr`
}

/** Percentage with configurable decimals (default 1), trailing zeros trimmed. Invalid → "—". */
export function formatPercent(value: number | null | undefined, decimals = 1): string {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return INVALID
  }
  return `${Number(value.toFixed(decimals))}%`
}
