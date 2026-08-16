import { timeline, type TimelineCategory } from '../data/fund'

const CATEGORY_STYLES: Record<TimelineCategory, { dot: string; chip: string; label: string }> = {
  // Chip colors chosen for ≥4.5:1 on the light background; dots are decorative.
  fund: { dot: 'bg-chart-2', chip: 'text-chart-1', label: 'Fund' },
  money: { dot: 'bg-chart-5', chip: 'text-chart-5', label: 'Money' },
  legal: { dot: 'bg-chart-6', chip: 'text-chart-6', label: 'Legal' },
  spend: { dot: 'bg-chart-4', chip: 'text-chart-4', label: 'Spending' },
}

/** Vertical timeline with category-coded markers. */
export function Timeline() {
  return (
    <div>
      <ul className="mb-6 flex flex-wrap gap-4 text-sm" aria-label="Timeline category legend">
        {(Object.keys(CATEGORY_STYLES) as TimelineCategory[]).map((cat) => (
          <li key={cat} className="flex items-center gap-2 text-secondary">
            <span
              aria-hidden="true"
              className={`inline-block h-3 w-3 rounded-full ${CATEGORY_STYLES[cat].dot}`}
            />
            {CATEGORY_STYLES[cat].label}
          </li>
        ))}
      </ul>

      <ol className="relative ml-3 border-l-2 border-border">
        {timeline.map((e) => {
          const style = CATEGORY_STYLES[e.category]
          return (
            <li key={e.date + e.dateDisplay} className="relative pb-8 pl-6 last:pb-0">
              <span
                aria-hidden="true"
                className={`absolute -left-[0.45rem] top-1.5 h-3.5 w-3.5 rounded-full ring-4 ring-background ${style.dot}`}
              />
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="tnum rounded-md bg-muted px-2 py-0.5 text-xs font-bold text-primary">
                  {e.dateDisplay}
                </span>
                <span className={`text-xs font-semibold uppercase tracking-wide ${style.chip}`}>
                  {style.label}
                </span>
              </div>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-foreground">{e.event}</p>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
