import { useEffect, useState } from 'react'
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
  militaryNotes,
  salaryDeductionExamples,
  voluntaryDonors,
} from '../data/fund'
import { formatCrore } from '../lib/format'
import { ChartCard } from './ChartCard'

/** Compact chart labels for narrow screens; full labels in the table below. */
const COMPACT_LABELS: Record<string, string> = {
  '101 PSUs — CSR funds': '101 PSUs',
  '32 PSUs': '32 PSUs',
  'Banks & financial institutions': 'Banks',
  'Indian military (total)': 'Military',
  'PSU staff salaries': 'PSU staff',
  'Educational institutions': 'Education',
}

function useDesktop(): boolean {
  const [desktop, setDesktop] = useState(true)
  useEffect(() => {
    if (typeof window.matchMedia === 'undefined') return
    const mq = window.matchMedia('(min-width: 1024px)')
    const update = () => setDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return desktop
}

/** Institutional donations: horizontal bars + military breakdown + salary examples. */
export function Donations() {
  const desktop = useDesktop()
  const sorted = [...institutionalDonations].sort((a, b) => b.amountCrore - a.amountCrore)
  const data = sorted.map((d) => ({
    label: desktop ? d.label : (COMPACT_LABELS[d.label] ?? d.label),
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
              margin={{ top: 4, right: desktop ? 76 : 56, left: 4, bottom: 4 }}
              accessibilityLayer
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
                width={desktop ? 150 : 96}
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
          <p className="mt-3 text-xs leading-relaxed text-secondary">{militaryNotes}</p>
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

        <div className="rounded-xl border border-border bg-surface p-4 shadow-sm sm:p-6">
          <h3 className="text-lg font-semibold text-primary">Who pledged support</h3>
          <p className="mt-1 text-sm text-secondary">
            Donors named in the article body text (no amounts given there):
          </p>
          <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-secondary">
            Corporations &amp; foundations
          </p>
          <ul className="mt-2 flex flex-wrap gap-2 text-sm">
            {voluntaryDonors.corporations.map((c) => (
              <li key={c} className="rounded-full bg-muted px-3 py-1 text-foreground">
                {c}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-secondary">
            Individuals
          </p>
          <ul className="mt-2 flex flex-wrap gap-2 text-sm">
            {voluntaryDonors.individuals.map((i) => (
              <li key={i} className="rounded-full bg-muted px-3 py-1 text-foreground">
                {i}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-secondary">
            Headline-only amounts — never stated in the article body
          </p>
          <ul className="mt-2 divide-y divide-border/60 text-sm">
            {voluntaryDonors.titleOnlyAmounts.map((t) => (
              <li key={t.label} className="flex flex-wrap items-baseline justify-between gap-2 py-1.5">
                <span className="text-foreground">{t.label}</span>
                <span className="tnum text-secondary">{t.amount}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs leading-relaxed text-secondary">
            These figures appear only in cited headlines and are not treated as facts elsewhere on
            this site.
          </p>
        </div>
      </div>
    </div>
  )
}
