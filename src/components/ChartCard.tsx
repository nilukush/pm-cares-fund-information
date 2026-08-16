import type { ReactNode } from 'react'

interface ChartCardProps {
  title: string
  subtitle?: string
  badge?: string
  /** Accessible description of what the chart shows (must contain the word "chart"). */
  ariaLabel: string
  children: ReactNode
  /** Text note rendered OUTSIDE the role="img" region so screen readers reach it. */
  note?: ReactNode
  tableHeaders: string[]
  tableRows: (string | number)[][]
}

/**
 * Chart container with an accessible name and an always-available data table
 * alternative (open by default; users may collapse it).
 */
export function ChartCard({
  title,
  subtitle,
  badge,
  ariaLabel,
  children,
  note,
  tableHeaders,
  tableRows,
}: ChartCardProps) {
  return (
    <article className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-4 shadow-sm sm:p-6">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-lg font-semibold text-primary">{title}</h3>
          {badge && (
            <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-secondary">
              {badge}
            </span>
          )}
        </div>
        {subtitle && <p className="mt-1 text-sm text-secondary">{subtitle}</p>}
      </div>

      <div role="img" aria-label={ariaLabel} className="min-h-64 w-full">
        {children}
      </div>

      {note && <p className="text-sm leading-relaxed text-secondary">{note}</p>}

      <details open className="rounded-lg bg-muted/60 p-3">
        <summary className="cursor-pointer text-sm font-semibold text-accent-strong select-none">
          View data as table
        </summary>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border text-secondary">
                {tableHeaders.map((h) => (
                  <th key={h} scope="col" className="py-2 pr-4 font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, i) => (
                <tr key={i} className="border-b border-border/60 last:border-0">
                  {row.map((cell, j) => (
                    <td key={j} className="py-2 pr-4 tnum">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </article>
  )
}
