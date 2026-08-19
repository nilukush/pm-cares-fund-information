import { useEffect, useState, type ComponentType } from 'react'

interface ChartSlotProps {
  /**
   * Resolves the chart component after mount via dynamic import, keeping
   * Recharts out of the initial JS bundle. Prerendered HTML and the pre-JS
   * view show the placeholder below; the ChartCard data table is the static
   * alternative, so no information waits on this load.
   */
  load: () => Promise<ComponentType>
}

export function ChartSlot({ load }: ChartSlotProps) {
  const [Chart, setChart] = useState<ComponentType | null>(null)
  useEffect(() => {
    let alive = true
    // Resolved once per mount: the load closure is fixed at each call site.
    // A failed chunk load leaves the placeholder in place — the data table
    // below the chart remains the always-available fallback.
    load()
      .then((chart) => {
        if (alive) setChart(() => chart)
      })
      .catch(() => {})
    return () => {
      alive = false
    }
  }, [])
  if (Chart !== null) return <Chart />
  return <p className="py-16 text-center text-sm text-secondary">Loading chart…</p>
}
