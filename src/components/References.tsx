import { references, seeAlso } from '../data/references'

/**
 * Full citation list of the source Wikipedia article, in article order,
 * plus the article's see-also entries. (The article has no separate
 * "External links" section.)
 */
export function References() {
  return (
    <div className="flex flex-col gap-6">
      <p className="max-w-3xl text-sm leading-relaxed text-secondary">
        Every claim on this site traces to the English Wikipedia article, which itself rests
        on the {references.length} citations below — reproduced in article order, exactly as
        cited there. The article has no separate “External links” section; its see-also
        entries follow the list.
      </p>

      <details open className="rounded-xl border border-border bg-surface p-4 shadow-sm sm:p-6">
        <summary className="cursor-pointer text-base font-semibold text-primary select-none">
          All {references.length} citations as cited by Wikipedia
        </summary>
        <ol className="mt-4 list-decimal space-y-2.5 pl-5 text-sm leading-snug text-foreground sm:columns-2 sm:gap-8">
          {references.map((r, i) => (
            <li key={`${i}-${r.title.slice(0, 24)}`} className="break-inside-avoid">
              {r.url ? (
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-accent-strong underline decoration-1 underline-offset-2 transition-colors hover:text-accent"
                >
                  {r.title}
                </a>
              ) : (
                <span className="font-medium text-foreground">{r.title}</span>
              )}
              {r.work && <span className="text-secondary"> — {r.work}</span>}
              {r.date && <span className="text-secondary"> ({r.date})</span>}
            </li>
          ))}
        </ol>
      </details>

      <div className="rounded-xl border border-border bg-surface p-4 shadow-sm sm:p-6">
        <h3 className="text-lg font-semibold text-primary">See also (per the article)</h3>
        <ul className="mt-3 flex flex-col gap-2 text-sm">
          {seeAlso.map((s) => (
            <li key={s.label}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-accent-strong underline decoration-2 underline-offset-2 transition-colors hover:text-accent"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
