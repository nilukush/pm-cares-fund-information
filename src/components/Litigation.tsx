import { litigation } from '../data/fund'

/** Consolidated litigation table (the article's dedicated court-case section). */
export function Litigation() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <caption className="sr-only">
            Court cases concerning the PM CARES Fund, as documented on Wikipedia
          </caption>
          <thead>
            <tr className="border-b border-border bg-muted text-secondary">
              <th scope="col" className="px-4 py-3 font-semibold sm:px-6">
                Case
              </th>
              <th scope="col" className="px-4 py-3 font-semibold sm:px-6">
                Forum
              </th>
              <th scope="col" className="px-4 py-3 font-semibold sm:px-6">
                When
              </th>
              <th scope="col" className="px-4 py-3 font-semibold sm:px-6">
                Outcome / status
              </th>
            </tr>
          </thead>
          <tbody>
            {litigation.map((c) => (
              <tr key={c.case} className="border-b border-border/60 last:border-0">
                <td className="px-4 py-3 text-foreground sm:px-6">{c.case}</td>
                <td className="px-4 py-3 text-secondary sm:px-6">{c.forum}</td>
                <td className="px-4 py-3 tnum text-secondary sm:px-6">{c.dateDisplay}</td>
                <td className="px-4 py-3 text-foreground sm:px-6">{c.outcome}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
