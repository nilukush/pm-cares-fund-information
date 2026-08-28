/**
 * Recharts chart implementations, split out of their sections so Recharts
 * loads on demand (via ChartSlot) instead of bloating the initial bundle.
 * Each chart reads its data from src/data/fund directly; the sections keep
 * the KPI strips, data tables and notes.
 */
import { useEffect, useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
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
import {
  auditedSeries,
  donorMix,
  firstAllocation,
  institutionalDonations,
} from '../data/fund'
import { formatCrore, formatINR } from '../lib/format'

const DONUT_COLORS = ['var(--color-chart-1)', 'var(--color-chart-2)', 'var(--color-chart-4)']

export function AuditedBalanceBarChart() {
  const barData = auditedSeries.map((y) => ({
    year: y.fiscalYear.slice(2),
    Balance: y.closingBalanceCrore,
    balanceLabel: formatINR(y.closingBalanceCrore),
  }))

  return (
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
  )
}

export function FinancesDonutChart() {
  const donutData = donorMix.map((d) => ({
    name: d.label,
    value: d.sharePercent,
  }))

  return (
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
  )
}

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

export function DonationsBarChart() {
  const desktop = useDesktop()
  const sorted = [...institutionalDonations].sort((a, b) => b.amountCrore - a.amountCrore)
  const data = sorted.map((d) => ({
    label: desktop ? d.label : (COMPACT_LABELS[d.label] ?? d.label),
    Amount: d.amountCrore,
    amountLabel: formatCrore(d.amountCrore),
  }))

  return (
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
  )
}

export function SpendingBarChart() {
  const SHORT_LABELS = ['Ventilators', 'Migrant welfare', 'Vaccine R&D']
  const allocData = firstAllocation.items.map((i, idx) => ({
    label: SHORT_LABELS[idx],
    Amount: i.amountCrore,
    amountLabel: formatCrore(i.amountCrore),
  }))
  const BAR_COLORS = ['var(--color-chart-1)', 'var(--color-chart-2)', 'var(--color-chart-4)']

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={allocData}
        margin={{ top: 24, right: 8, left: 8, bottom: 20 }}
        accessibilityLayer
      >
        <XAxis dataKey="label" tick={{ fontSize: 12 }} stroke="var(--color-secondary)" interval={0} />
        <YAxis tick={{ fontSize: 12 }} stroke="var(--color-secondary)" />
        <Tooltip
          formatter={(v) => formatCrore(Number(v))}
          cursor={{ fill: 'var(--color-muted)' }}
        />
        <Bar dataKey="Amount" radius={[4, 4, 0, 0]} maxBarSize={90}>
          <LabelList
            dataKey="amountLabel"
            position="top"
            style={{ fontSize: 12, fill: 'var(--color-secondary)' }}
          />
          {allocData.map((entry, i) => (
            <Cell key={entry.label} fill={BAR_COLORS[i % BAR_COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
