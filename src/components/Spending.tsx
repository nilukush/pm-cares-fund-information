import { firstAllocation, oxygenProgramme, ventilatorProgramme } from '../data/fund'
import { ChartCard } from './ChartCard'
import { ChartSlot } from './ChartSlot'

function Progress({
  label,
  promised,
  delivered,
  deliveredLabel,
  note,
}: {
  label: string
  promised: number
  delivered: number
  deliveredLabel: string
  note: string
}) {
  const pct = Math.min(100, Math.round((delivered / promised) * 100))
  return (
    <div className="rounded-xl border border-border bg-surface p-4 shadow-sm sm:p-6">
      <h3 className="text-base font-semibold text-primary">{label}</h3>
      <div className="mt-3 flex items-baseline justify-between gap-3 text-sm">
        <span className="text-secondary">Promised</span>
        <span className="tnum text-lg font-bold text-primary">{promised.toLocaleString('en-IN')}</span>
      </div>
      <div
        className="mt-2 h-3 w-full overflow-hidden rounded-full bg-muted"
        role="presentation"
      >
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-3 text-sm">
        <span className="text-secondary">Delivered (reported)</span>
        <span className="tnum text-lg font-bold text-accent-strong">{deliveredLabel}</span>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-secondary">
        {note} — {pct}% of the promised figure.
      </p>
    </div>
  )
}

/** Spending: first allocation chart + promise-vs-delivery cards. */
export function Spending() {

  return (
    <div className="flex flex-col gap-6">
      <ChartCard
        title={firstAllocation.headline}
        subtitle={`Announced ${firstAllocation.dateDisplay}. The ventilator share is derived arithmetic (₹3,100 cr total − ₹1,000 cr migrants − ₹100 cr vaccine); Wikipedia does not state it explicitly.`}
        badge="Includes derived figure"
        ariaLabel="Bar chart of the 13 May 2020 first allocation in crore rupees: ventilators 2,000 crore (derived), migrant worker welfare 1,000 crore, vaccine development support 100 crore."
        tableHeaders={['Purpose', 'Amount (₹ cr)', 'Notes']}
        numericColumns={[1]}
        tableRows={firstAllocation.items.map((i) => [
          i.label,
          i.amountCrore,
          i.derived ? `${i.note} [derived]` : i.note,
        ])}
      >
        <ChartSlot load={() => import('./charts').then((m) => m.SpendingBarChart)} />
      </ChartCard>

      <div className="grid gap-6 md:grid-cols-3">
        <Progress
          label="Ventilators"
          promised={ventilatorProgramme.ordered}
          delivered={ventilatorProgramme.madeByDate}
          deliveredLabel={ventilatorProgramme.madeByDate.toLocaleString('en-IN')}
          note={`Manufactured by 24 June 2020. ${ventilatorProgramme.qualityNote}`}
        />
        <Progress
          label="Oxygen plants (Scroll report)"
          promised={oxygenProgramme.sanctionedPlants}
          delivered={oxygenProgramme.installedScroll}
          deliveredLabel={`${oxygenProgramme.installedScroll} (only ${oxygenProgramme.operationalScroll} operational)`}
          note={`Scroll.in, April 2021. ${oxygenProgramme.sanctionedNote}. The government claimed ${oxygenProgramme.governmentClaimInstalled} installed (18 Apr 2021).`}
        />
        <Progress
          label="Oxygen plants for Delhi"
          promised={oxygenProgramme.delhiSanctioned}
          delivered={oxygenProgramme.delhiBuilt}
          deliveredLabel={`${oxygenProgramme.delhiBuilt} built`}
          note={`Told to the Delhi High Court on 22 April 2021. Later, on 26 April 2021, 551 plants + 1,00,000 concentrators were announced. ${oxygenProgramme.cmssNote}`}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-surface p-4 shadow-sm sm:p-6">
          <h3 className="text-lg font-semibold text-primary">
            State-wise ventilator deliveries (24 June 2020)
          </h3>
          <p className="mt-1 text-sm text-secondary">{ventilatorProgramme.stateDeliveriesNote}</p>
          <ul className="mt-4 divide-y divide-border/60 text-sm">
            {ventilatorProgramme.stateDeliveries.map((s) => (
              <li key={s.state} className="flex items-center justify-between gap-4 py-2.5">
                <span className="text-secondary">{s.state}</span>
                <span className="tnum font-semibold text-primary">{s.units}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm leading-relaxed text-secondary">
            <span className="font-semibold text-foreground">{ventilatorProgramme.claim60000.dateDisplay}:</span>{' '}
            {ventilatorProgramme.claim60000.note}
          </p>
        </div>

        <div className="rounded-xl border border-border bg-surface p-4 shadow-sm sm:p-6">
          <h3 className="text-lg font-semibold text-primary">Ventilators in hospitals</h3>
          <p className="mt-2 text-sm leading-relaxed text-foreground">
            {ventilatorProgramme.hospitalEpisodes}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-secondary">{oxygenProgramme.slowdownNote}</p>
        </div>
      </div>
    </div>
  )
}
