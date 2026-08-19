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
