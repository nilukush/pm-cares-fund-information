import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  institutionalDonations,
  militaryBreakdown,
  salaryDeductionExamples,
} from '../data/fund'
import { formatCrore } from '../lib/format'
import { ChartCard } from './ChartCard'

/** Institutional donations: horizontal bars + military breakdown + salary examples. */
export function Donations() {
  const sorted = [...institutionalDonations].sort((a, b) => b.amountCrore - a.amountCrore)
  const data = sorted.map((d) => ({
    label: d.label,
    Amount: d.amountCrore,
    amountLabel: formatCrore(d.amountCrore),
  }))

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="lg:col-span-3">
        <ChartCard
          title="Institutional contributions"
          subtitle="Selected donation figures reported in the article body text, in ₹ crore. Periods differ — see notes; figures must not be summed."
          ariaLabel="Horizontal bar chart of institutional contributions in crore rupees: 101 PSUs CSR 2,400 crore; 32 PSUs 2,105 crore; banks and financial institutions 204.75 crore; Indian military 203.67 crore; PSU staff salaries 155 crore; educational institutions 21.81 crore."
          tableHeaders={['Source', 'Amount (₹ cr)', 'Notes']}
          tableRows={sorted.map((d) => [d.label, d.amountCrore, d.note])}
        >
          <ResponsiveContainer width="100%" height={340}>
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 4, right: 76, left: 4, bottom: 4 }}
            >
              <CartesianGrid horizontal={false} stroke="var(--color-border)" />
              <XAxis
                type="number"
                tick={{ fontSize: 12 }}
                stroke="var(--color-secondary)"
                tickFormatter={(v) => formatCrore(Number(v))}
              />
              <YAxis
                type="category"
                dataKey="label"
                width={150}
                tick={{ fontSize: 11 }}
                stroke="var(--color-secondary)"
              />
              <Tooltip
                formatter={(v) => formatCrore(Number(v))}
                cursor={{ fill: 'var(--color-muted)' }}
              />
              <Bar
                dataKey="Amount"
                fill="var(--color-chart-1)"
                radius={[0, 4, 4, 0]}
                maxBarSize={26}
              >
                <LabelList
                  dataKey="amountLabel"
                  position="right"
                  style={{ fontSize: 11, fill: 'var(--color-secondary)' }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="flex flex-col gap-6 lg:col-span-2">
        <div className="rounded-xl border border-border bg-surface p-4 shadow-sm sm:p-6">
          <h3 className="text-lg font-semibold text-primary">Military breakdown</h3>
          <p className="mt-1 text-sm text-secondary">
            The Defence Ministry sought one day's salary (~₹500 crore) from the armed forces;
            ₹203.67 crore was received.
          </p>
          <ul className="mt-4 divide-y divide-border/60 text-sm">
            {militaryBreakdown.map((m) => (
              <li key={m.label} className="flex items-center justify-between gap-4 py-2.5">
                <span className="text-secondary">{m.label}</span>
                <span className="tnum font-semibold text-primary">{formatCrore(m.amountCrore)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-border bg-surface p-4 shadow-sm sm:p-6">
          <h3 className="text-lg font-semibold text-primary">Salary-deduction practices</h3>
          <p className="mt-1 text-sm text-secondary">
            Examples reported around the fund (a recurring theme in the transparency debate):
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-foreground">
            {salaryDeductionExamples.map((s) => (
              <li key={s.slice(0, 24)}>{s}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
