import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { donorMix, finances, identity, totalReceiptsCrore } from '../data/fund'
import { formatCrore, formatINR } from '../lib/format'
import { ChartCard } from './ChartCard'

const DONUT_COLORS = ['var(--color-chart-1)', 'var(--color-chart-2)', 'var(--color-chart-4)']

/** Finances: KPI strip, receipts vs year-end balance (bars), estimated donor mix (donut). */
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
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-3" aria-label="Key financial facts">
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
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={barData}
            margin={{ top: 24, right: 8, left: 8, bottom: 4 }}
            accessibilityLayer
          >
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
            >
              <LabelList
                dataKey="receiptsLabel"
                position="top"
                style={{ fontSize: 11, fill: 'var(--color-secondary)' }}
              />
            </Bar>
            <Bar
              dataKey="Balance"
              fill="var(--color-chart-3)"
              radius={[4, 4, 0, 0]}
              maxBarSize={72}
            >
              <LabelList
                dataKey="balanceLabel"
                position="top"
                style={{ fontSize: 11, fill: 'var(--color-secondary)' }}
              />
            </Bar>
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
        numericColumns={[1]}
        tableRows={donorMix.map((d) => [d.label, `${d.sharePercent}%`])}
      >
        <ResponsiveContainer width="100%" height={300}>
          <PieChart accessibilityLayer>
            <text
              x="50%"
              y="45%"
              textAnchor="middle"
              fontSize={13}
              fontWeight={700}
              fill="var(--color-primary)"
            >
              First 2 months
            </text>
            <text
              x="50%"
              y="45%"
              dy={18}
              textAnchor="middle"
              fontSize={11}
              fill="var(--color-secondary)"
            >
              ToI estimate · May 2020
            </text>
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
    </div>
  )
}
