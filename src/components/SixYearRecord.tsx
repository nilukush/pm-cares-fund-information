import {
  auditedSeries,
  auditedSeriesTotals,
  donationsByYear,
  donationsByYearNote,
  finances,
} from '../data/fund'
import { formatCrore, formatINR } from '../lib/format'
import { AuditedStatement } from './AuditedStatement'
import { ChartCard } from './ChartCard'
import { ChartSlot } from './ChartSlot'

/** Six-year audited record: closing-balance chart + donations-decline table (primary tier),
 * with the FY2024-25 statement folded in as an expandable deep-dive. */
export function SixYearRecord() {
  return (
    <div className="flex flex-col gap-6">
      <ChartCard
        title="Six years of audited balances"
        subtitle="Closing balance at each 31 March, ₹ crore — the fund's own audited Receipts & Payments Accounts (pmcares.gov.in, primary tier). FY2019-20 and FY2020-21 also appear in the Wikipedia article."
        badge="Primary sources"
        ariaLabel="Bar chart: closing balance at 31 March of each financial year, FY2019-20 through FY2024-25, in crore rupees, from the fund's audited statements. 2020: 3,076.62; 2021: 7,013.99; 2022: 5,415.66; 2023: 6,283.68; 2024: 7,173.03; 2025: 8,452.07. The data table also lists each year's printed receipts-side total, including the widely-quoted ₹10,990.17 crore for FY2020-21, which includes the opening balance."
        note={
          <>
            Receipts-side totals are as printed in each audited statement and include the
            opening balance; “receipts during the year” = printed total − opening.{' '}
            {finances.fy202021ReceiptsNote} {finances.corpusStatementNote} {finances.unspentQuote}{' '}
            PM CARES for Children, announced 30 May 2022 for children orphaned by COVID-19,
            provides ₹4,000/month for daily needs, ₹10 lakh at age 23, education-loan support
            and Ayushman Bharat cover (scheme design per Frontline). Payments to this scheme
            are the fund’s only recorded programme spending from FY2023-24 through FY2024-25
            (FY2022-23 also paid ₹91.87 crore for 99,986 oxygen concentrators — audited
            statements). Across the six years, receipts total{' '}
            {formatCrore(auditedSeriesTotals.receiptsCrore)} and payments{' '}
            {formatCrore(auditedSeriesTotals.paymentsCrore)} (both derived).
          </>
        }
        tableHeaders={[
          'Fiscal year',
          'Receipts-side total, printed (₹ cr)',
          'Receipts during year (₹ cr)',
          'Payments (₹ cr)',
          'Closing balance (₹ cr)',
        ]}
        numericColumns={[1, 2, 3, 4]}
        tableCaption="Six-year audited record: printed receipts-side totals, receipts during the year, payments and closing balances, in crore rupees"
        tableRows={auditedSeries.map((y) => [
          y.fiscalYear,
          formatINR(y.receiptsSideTotalCrore),
          `${formatINR(y.receiptsDuringCrore)}${y.receiptsDerived ? ' (derived)' : ''}`,
          formatINR(y.paymentsTotalCrore),
          formatINR(y.closingBalanceCrore),
        ])}
      >
        <ChartSlot load={() => import('./charts').then((m) => m.AuditedBalanceBarChart)} />
      </ChartCard>

      <div className="overflow-hidden rounded-xl border border-white/15 bg-white/5">
        <div className="border-b border-white/15 px-4 py-3 sm:px-6">
          <h3 className="text-lg font-semibold text-primary-foreground">Donations by year</h3>
        </div>
        <div className="overflow-x-auto px-4 py-4 sm:px-6">
          <table className="w-full min-w-[36rem] text-sm text-primary-foreground">
            <caption className="sr-only">
              Domestic and foreign donations by financial year from the audited statements
            </caption>
            <thead>
              <tr className="border-b border-white/15 text-left text-primary-foreground/80">
                <th scope="col" className="py-2 pr-4 font-medium">Fiscal year</th>
                <th scope="col" className="py-2 pr-4 text-right font-medium">Domestic (₹ cr)</th>
                <th scope="col" className="py-2 pr-4 text-right font-medium">Foreign (₹ cr)</th>
                <th scope="col" className="py-2 pr-4 text-right font-medium">Total (derived)</th>
                <th scope="col" className="py-2 text-right font-medium">YoY (derived)</th>
              </tr>
            </thead>
            <tbody>
              {donationsByYear.map((d) => (
                <tr key={d.fiscalYear} className="border-b border-white/10 last:border-b-0">
                  <th scope="row" className="py-2 pr-4 text-left font-normal text-primary-foreground/80">{d.fiscalYear}</th>
                  <td className="tnum py-2 pr-4 text-right">{formatINR(d.domesticCrore)}</td>
                  <td className="tnum py-2 pr-4 text-right">{formatINR(d.foreignCrore)}</td>
                  <td className="tnum py-2 pr-4 text-right font-semibold">{formatINR(d.totalCrore)}</td>
                  <td className="tnum py-2 text-right text-primary-foreground/80">
                    {d.yoyChangePercent !== undefined ? `${d.yoyChangePercent.toFixed(1)}%` : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-3 text-sm leading-relaxed text-primary-foreground/80">{donationsByYearNote}</p>
        </div>
      </div>

      <details open className="group">
        <summary className="flex w-full cursor-pointer items-center justify-between gap-4 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-left marker:content-none select-none sm:px-6">
          <span className="text-sm font-semibold text-primary-foreground">
            Deep dive — FY2024-25 statement (primary source)
          </span>
          <span aria-hidden="true" className="shrink-0 font-display text-xl leading-none text-chart-2 transition-transform duration-200 group-open:rotate-45">
            +
          </span>
        </summary>
        <div className="mt-3">
          <AuditedStatement />
        </div>
      </details>
    </div>
  )
}
