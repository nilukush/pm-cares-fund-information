import { auditedStatementFY202425, donorMix, finances, identity, totalReceiptsCrore } from '../data/fund'
import { formatCrore, formatINR } from '../lib/format'
import { ChartCard } from './ChartCard'
import { ChartSlot } from './ChartSlot'

/** Finances: KPI strip, receipts vs year-end balance (bars), estimated donor mix (donut). */
export function Finances() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Key financial facts">
        <div className="rounded-xl border border-white/15 bg-white/5 p-4">
          <p className="text-sm text-primary-foreground/80">Received, both years</p>
          <p className="tnum mt-1 text-2xl font-bold text-primary-foreground">
            {formatCrore(totalReceiptsCrore)}
          </p>
        </div>
        <div className="rounded-xl border border-white/15 bg-white/5 p-4">
          <p className="text-sm text-primary-foreground/80">Year-end balance · 31 Mar 2021</p>
          <p className="tnum mt-1 text-2xl font-bold text-primary-foreground">
            {formatCrore(finances.years[1].balanceCrore)}
          </p>
        </div>
        <div className="rounded-xl border border-white/15 bg-white/5 p-4">
          <p className="text-sm text-primary-foreground/80">Audited by</p>
          <p className="mt-1 text-sm font-semibold leading-snug text-primary-foreground">
            {identity.auditor}
            <span className="font-normal text-primary-foreground/80"> — not the CAG</span>
          </p>
        </div>
        <div className="rounded-xl border border-white/15 bg-white/5 p-4">
          <p className="text-sm text-primary-foreground/80">Latest balance · 31 Mar 2025</p>
          <p className="tnum mt-1 text-2xl font-bold text-primary-foreground">
            {formatCrore(auditedStatementFY202425.closingBalanceCrore)}
          </p>
          <p className="mt-1 text-xs text-primary-foreground/70">Primary source — audited statement, below</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
      <ChartCard
        title="Money in vs money left"
        subtitle="Receipts and year-end balance per fiscal year, in ₹ crore (pmcares.gov.in figures via Wikipedia)"
        ariaLabel="Bar chart: receipts versus year-end balance for FY2019-20 and FY2020-21, in crore rupees. FY2019-20: receipts and balance both ₹3,076.62 crore. FY2020-21: receipts ₹10,990.17 crore, balance ₹7,013.99 crore."
        note={
          <>
            {finances.unspentQuote} {finances.corpusStatementNote}
          </>
        }
        tableHeaders={['Fiscal year', 'Receipts (₹ cr)', 'Year-end balance (₹ cr)']}
        numericColumns={[1, 2]}
        tableRows={finances.years.map((y) => [
          `${y.fiscalYear} (${y.period})`,
          formatINR(y.receiptsCrore),
          formatINR(y.balanceCrore),
        ])}
      >
        <ChartSlot load={() => import('./charts').then((m) => m.FinancesBarChart)} />
      </ChartCard>

      <ChartCard
        title="Who donated?"
        subtitle="Estimated mix of the first two months of donations (Times of India, 19 May 2020)"
        badge="Estimate"
        ariaLabel="Donut chart: estimated donor mix of the first two months — private-sector corporations and employees 53 percent, PSUs and PSU employees 42 percent, individuals 5 percent. Based on a Times of India estimate, not audited accounts."
        note={
          <>
            {finances.estimateNote} {finances.twoMonthEstimateNote}
          </>
        }
        tableHeaders={['Donor group', 'Share']}
        numericColumns={[1]}
        tableRows={donorMix.map((d) => [d.label, `${d.sharePercent}%`])}
      >
        <ChartSlot load={() => import('./charts').then((m) => m.FinancesDonutChart)} />
      </ChartCard>
      </div>
    </div>
  )
}
