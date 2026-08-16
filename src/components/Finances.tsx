import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { donorMix, finances } from '../data/fund'
import { formatCrore, formatINR } from '../lib/format'
import { ChartCard } from './ChartCard'

const DONUT_COLORS = ['var(--color-chart-1)', 'var(--color-chart-2)', 'var(--color-chart-4)']

/** Finances: receipts vs year-end balance (bars) and estimated donor mix (donut). */
export function Finances() {
  const barData = finances.years.map((y) => ({
    year: y.fiscalYear,
    Receipts: y.receiptsCrore,
    Balance: y.balanceCrore,
    receiptsLabel: formatCrore(y.receiptsCrore),
    balanceLabel: formatCrore(y.balanceCrore),
  }))

  const donutData = donorMix.map((d) => ({
    name: d.label,
    value: d.sharePercent,
  }))

  return (
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
        tableRows={finances.years.map((y) => [
          `${y.fiscalYear} (${y.period})`,
          formatINR(y.receiptsCrore),
          formatINR(y.balanceCrore),
        ])}
      >
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData} margin={{ top: 24, right: 8, left: 8, bottom: 4 }}>
            <XAxis dataKey="year" tick={{ fontSize: 13 }} stroke="var(--color-secondary)" />
            <YAxis
              tick={{ fontSize: 12 }}
              stroke="var(--color-secondary)"
              tickFormatter={(v) => formatINR(Number(v))}
            />
            <Tooltip
              formatter={(v) => formatCrore(Number(v))}
              cursor={{ fill: 'var(--color-muted)' }}
            />
            <Legend wrapperStyle={{ fontSize: 13 }} />
            <Bar
              dataKey="Receipts"
              fill="var(--color-chart-1)"
              radius={[4, 4, 0, 0]}
              maxBarSize={72}
            />
            <Bar
              dataKey="Balance"
              fill="var(--color-chart-3)"
              radius={[4, 4, 0, 0]}
              maxBarSize={72}
            />
          </BarChart>
        </ResponsiveContainer>
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
        tableRows={donorMix.map((d) => [d.label, `${d.sharePercent}%`])}
      >
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={donutData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={62}
              outerRadius={100}
              paddingAngle={2}
              strokeWidth={1}
            >
              {donutData.map((entry, i) => (
                <Cell key={entry.name} fill={DONUT_COLORS[i % DONUT_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(v) => `${v}%`} />
            <Legend wrapperStyle={{ fontSize: 13 }} />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  )
}
