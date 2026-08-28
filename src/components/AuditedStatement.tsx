import { auditedStatementFY202425 } from '../data/fund'
import { formatINR } from '../lib/format'

function CroreTable({
  rows,
  caption,
}: {
  rows: Array<[label: string, value: string]>
  caption: string
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[32rem] text-sm">
        <caption className="sr-only">{caption}</caption>
        <tbody>
          {rows.map(([label, value]) => (
            <tr key={label} className="border-b border-border last:border-b-0">
              <th scope="row" className="py-2 pr-4 text-left font-normal text-foreground/80">
                {label}
              </th>
              <td className="tnum py-2 pl-4 text-right font-semibold text-foreground">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** The fund's own audited FY2024-25 statement — a labeled primary-source tier,
 * kept visually and semantically separate from the Wikipedia-sourced figures. */
export function AuditedStatement() {
  const s = auditedStatementFY202425
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border bg-muted px-4 py-3 sm:px-6">
        <h3 className="text-lg font-semibold text-primary">
          Audited statement — FY2024-25 (primary source)
        </h3>
        <span className="rounded-full border border-border bg-surface px-3 py-0.5 text-xs font-semibold text-accent-strong">
          pmcares.gov.in · accessed {s.accessedDisplay}
        </span>
      </div>
      <div className="flex flex-col gap-5 px-4 py-5 sm:px-6">
        <p className="text-sm leading-relaxed text-foreground">
          The fund’s own audited Receipts &amp; Payments Account for the year ended 31 March 2025 —
          audited by {s.auditorFirm} ({s.auditorRegistration}), report dated {s.reportDated}. This
          block is a clearly labeled primary-source tier; its figures are never mixed with the
          article-sourced charts above.
        </p>

        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary">
              Year summary (₹ crore)
            </h4>
            <CroreTable
              caption="Audited FY2024-25 year summary in crore rupees"
              rows={[
                [`Opening balance · 1 Apr 2024 (savings ₹${s.openingSplit.savingsBankCrore.toFixed(2)} + fixed deposits ₹${s.openingSplit.fixedDepositsCrore.toFixed(2)})`, formatINR(s.openingBalanceCrore)],
                ['Receipts during the year (derived)', formatINR(s.receiptsTotalCrore)],
                ['Payments during the year', formatINR(s.paymentsTotalCrore)],
                [`Closing balance · 31 Mar 2025 (savings ₹${s.closingSplit.savingsBankCrore.toFixed(2)} + fixed deposits ₹${s.closingSplit.fixedDepositsCrore.toFixed(2)})`, formatINR(s.closingBalanceCrore)],
              ]}
            />
            <p className="mt-3 text-sm leading-relaxed text-foreground/80">{s.priorYearNote}</p>
          </div>

          <div>
            <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary">
              Receipts during the year (₹ crore)
            </h4>
            <CroreTable
              caption="Audited FY2024-25 receipts during the year, itemized, in crore rupees"
              rows={s.receiptsItemized.map((item) => [item.label, formatINR(item.amountCrore)])}
            />
            <h4 className="mb-2 mt-5 text-sm font-semibold uppercase tracking-wide text-primary">
              Payments (₹)
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[32rem] text-sm">
                <caption className="sr-only">
                  Audited FY2024-25 payments itemized, in rupees
                </caption>
                <tbody>
                  {s.paymentsItemized.map((item) => (
                    <tr key={item.label} className="border-b border-border last:border-b-0">
                      <th scope="row" className="py-2 pr-4 text-left font-normal text-foreground/80">
                        {item.label}
                      </th>
                      <td className="tnum py-2 pl-4 text-right font-semibold text-foreground">
                        {item.amountRupee !== undefined ? formatINR(item.amountRupee) : '—'}
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-border">
                    <th scope="row" className="py-2 pr-4 text-left font-semibold text-foreground">
                      Total payments
                    </th>
                    <td className="tnum py-2 pl-4 text-right font-semibold text-foreground">
                      {formatINR(s.paymentsTotalRupee)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 text-sm leading-relaxed text-foreground/90">
          <p>{s.receiptsNote}</p>
          <p>{s.paymentsContextNote}</p>
          <p className="border-t border-border pt-3 text-foreground/80">
            {s.sourceNote}{' '}
            <a
              href={s.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent underline underline-offset-2 hover:text-accent-strong"
            >
              Audited_Statement_2024_25.pdf
            </a>{' '}
            (accessed {s.accessedDisplay}).
          </p>
        </div>
      </div>
    </div>
  )
}
