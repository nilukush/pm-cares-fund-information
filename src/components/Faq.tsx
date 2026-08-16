import { faq } from '../data/fund'

/** FAQ as native disclosure widgets (keyboard-accessible by default). */
export function Faq() {
  return (
    <div className="mx-auto max-w-3xl">
      <ul className="flex flex-col gap-3">
        {faq.map((f, i) => (
          <li key={f.q}>
            <details className="group rounded-xl border border-border bg-surface shadow-sm open:bg-muted/40">
              <summary className="flex cursor-pointer items-center justify-between gap-4 rounded-xl px-4 py-4 text-left text-base font-semibold text-primary marker:content-none select-none sm:px-6">
                <span>{f.q}</span>
                <span
                  aria-hidden="true"
                  className="shrink-0 font-display text-xl leading-none text-accent transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <div className="px-4 pb-4 text-sm leading-relaxed text-foreground sm:px-6">
                {f.a}
                <span className="sr-only"> (FAQ item {i + 1} of {faq.length})</span>
              </div>
            </details>
          </li>
        ))}
      </ul>
    </div>
  )
}
