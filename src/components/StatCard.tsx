interface StatCardProps {
  label: string
  value: string
  note?: string
}

/** Large-figure statistic card (tabular numerals for stable alignment). */
export function StatCard({ label, value, note }: StatCardProps) {
  return (
    <div className="flex flex-col gap-1 rounded-xl border border-border bg-surface p-4 shadow-sm">
      <span className="text-sm font-medium text-secondary">{label}</span>
      <span className="tnum text-2xl font-bold text-primary sm:text-[1.7rem]">{value}</span>
      {note && <span className="text-xs leading-snug text-secondary">{note}</span>}
    </div>
  )
}
