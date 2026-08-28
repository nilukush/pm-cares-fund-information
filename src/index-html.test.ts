import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const html = readFileSync(resolve(process.cwd(), 'index.html'), 'utf8')

describe('Social-card titles are entity-encoded HTML', () => {
  it('og:title and twitter:title encode & as &amp; (like <title>)', () => {
    for (const tag of ['og:title', 'twitter:title']) {
      const match = html.match(new RegExp(`${tag}" content="([^"]*)"`))
      expect(match, `${tag} meta tag present`).not.toBeNull()
      const content = match?.[1] ?? ''
      expect(content, `${tag} uses &amp;`).toContain('&amp;')
      expect(content, `${tag} has no raw ampersand`).not.toMatch(/ & /)
    }
  })
})

describe('noscript carries the corrected FY2020-21 framing', () => {
  it('states new money received, never the receipts-side total, for FY2020-21', () => {
    const match = html.match(/<noscript>([\s\S]*?)<\/noscript>/)
    expect(match, 'noscript block present').not.toBeNull()
    const noscript = match?.[1] ?? ''
    expect(noscript).toContain('₹3,076.62 crore in FY2019-20')
    expect(noscript).toContain('₹7,913.55 crore of new money in FY2020-21')
    expect(noscript, 'receipts-side total must not be framed as money received').not.toContain('10,990.17')
  })
})
