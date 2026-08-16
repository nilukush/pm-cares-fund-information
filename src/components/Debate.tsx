import { criticism, defence, pmnrfComparison, type DebatePoint } from '../data/fund'

function PointList({ points, tone }: { points: DebatePoint[]; tone: 'concern' | 'response' }) {
  const titleClass =
    tone === 'concern'
      ? 'border-l-4 border-chart-5 bg-muted/50'
      : 'border-l-4 border-chart-1 bg-muted/50'
  return (
    <ul className="flex flex-col gap-4">
      {points.map((p) => (
        <li key={p.title} className={`rounded-r-lg p-4 ${titleClass}`}>
          <h4 className="text-base font-semibold text-primary">{p.title}</h4>
          <p className="mt-1.5 text-sm leading-relaxed text-foreground">{p.detail}</p>
        </li>
      ))}
    </ul>
  )
}

/** Debate: criticism and government defence side by side, plus PMNRF comparison. */
export function Debate() {
  return (
    <div className="flex flex-col gap-10">
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-primary">
            Criticism &amp; controversies
          </h3>
          <PointList points={criticism} tone="concern" />
        </div>
        <div>
          <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-primary">
            The government&rsquo;s defence
          </h3>
          <PointList points={defence} tone="response" />
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
        <div className="border-b border-border bg-muted px-4 py-3 sm:px-6">
          <h3 className="text-lg font-semibold text-primary">
            PM CARES vs PMNRF (Prime Minister's National Relief Fund)
          </h3>
          <p className="mt-1 text-sm text-secondary">
            Comparison synthesised from facts in the Wikipedia article (see Sources). The PMNRF
            dates from 1948.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border text-secondary">
                <th scope="col" className="px-4 py-3 font-semibold sm:px-6">
                  Aspect
                </th>
                <th scope="col" className="px-4 py-3 font-semibold sm:px-6">
                  PM CARES
                </th>
                <th scope="col" className="px-4 py-3 font-semibold sm:px-6">
                  PMNRF
                </th>
              </tr>
            </thead>
            <tbody>
              {pmnrfComparison.map((row) => (
                <tr key={row.aspect} className="border-b border-border/60 last:border-0">
                  <th scope="row" className="px-4 py-3 font-medium text-secondary sm:px-6">
                    {row.aspect}
                  </th>
                  <td className="px-4 py-3 text-foreground sm:px-6">{row.pmCares}</td>
                  <td className="px-4 py-3 text-foreground sm:px-6">{row.pmnrf}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
