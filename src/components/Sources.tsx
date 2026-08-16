import { dataCaveats, sources } from '../data/fund'

/** Sources: caveats list + reference links. */
export function Sources() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-xl border border-border bg-surface p-4 shadow-sm sm:p-6">
        <h3 className="text-lg font-semibold text-primary">Data caveats</h3>
        <p className="mt-1 text-sm text-secondary">
          Figures above carry these caveats from the source material:
        </p>
        <ul className="mt-4 list-disc space-y-2.5 pl-5 text-sm leading-relaxed text-foreground">
          {dataCaveats.map((c) => (
            <li key={c.slice(0, 24)}>{c}</li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-border bg-surface p-4 shadow-sm sm:p-6">
        <h3 className="text-lg font-semibold text-primary">References</h3>
        <p className="mt-1 text-sm text-secondary">
          All content on this page is summarized from the following sources:
        </p>
        <ul className="mt-4 flex flex-col gap-3 text-sm">
          {sources.map((s) => (
            <li key={s.label}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="break-words font-medium text-accent-strong underline decoration-2 underline-offset-2 transition-colors hover:text-accent"
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
