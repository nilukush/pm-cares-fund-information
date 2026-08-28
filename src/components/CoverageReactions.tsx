import type { NewsKind } from '../data/fund'
import {
  newsAnalysisNotes,
  newsDefence,
  newsDisclosureLag,
  newsReactions,
  newsSources,
} from '../data/fund'

/** August 2026 news coverage of the audited statements — attributed quotes,
 * criticism beside defence, never presented as audited fact. */
export function CoverageReactions() {
  const kindLabel: Record<NewsKind, string> = {
    criticism: 'Criticism',
    defence: 'Defence',
    'audit-observation': 'Audit observation',
  }
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border bg-muted px-4 py-3 sm:px-6">
        <h3 className="text-lg font-semibold text-primary">Coverage &amp; reactions — August 2026</h3>
        <span className="rounded-full border border-border bg-surface px-3 py-0.5 text-xs font-semibold text-accent-strong">
          News tier · 18–22 Aug 2026
        </span>
      </div>
      <div className="flex flex-col gap-5 px-4 py-5 sm:px-6">
        <p className="text-sm leading-relaxed text-foreground">
          The fund published its FY2023-24 and FY2024-25 audited accounts together on 18 August
          2026, ten days after The Hindu reported a roughly two-year disclosure gap. What
          followed, as reported by named outlets — a news tier, attributed throughout, never
          presented as audited fact:
        </p>

        <ul className="flex flex-col gap-3">
          {newsReactions.map((r) => {
            const src = newsSources.find((s) => s.id === r.sourceId)
            return (
              <li
                key={r.quote.slice(0, 40)}
                className="rounded-lg border border-border bg-background p-3"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
                  {kindLabel[r.kind]}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-foreground">{r.quote}</p>
                <p className="mt-1 text-xs text-secondary">
                  — {r.attribution}
                  {src ? ` (${src.publishedDisplay})` : ''}
                </p>
              </li>
            )
          })}
        </ul>

        <div className="rounded-lg border border-accent/30 bg-accent/5 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent-strong">
            Government position
          </p>
          <p className="mt-1 text-sm leading-relaxed text-foreground">{newsDefence}</p>
        </div>

        <div className="flex flex-col gap-2 text-sm leading-relaxed text-foreground/90">
          <p>{newsDisclosureLag}</p>
          {newsAnalysisNotes.map((n) => (
            <p key={n.slice(0, 40)}>{n}</p>
          ))}
        </div>

        <ul className="flex flex-wrap gap-x-4 gap-y-1 border-t border-border pt-3 text-xs text-secondary">
          {newsSources.map((s) => (
            <li key={s.id}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-accent-strong"
              >
                {s.outlet} · {s.publishedDisplay}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
