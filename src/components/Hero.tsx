import { auditedStatementFY202425, finances, identity, totalReceiptsCrore } from '../data/fund'
import { formatCrore } from '../lib/format'
import { StatCard } from './StatCard'

/** Above-the-fold summary: what the fund is, plus headline figures. */
export function Hero() {
  return (
    <div className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
        <p className="font-display text-sm font-semibold tracking-wide text-chart-2">
          PUBLIC INFORMATION · SOURCED FROM WIKIPEDIA + PMCARES.GOV.IN
        </p>
        <h1 className="mt-3 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
          What is the PM CARES Fund?
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-primary-foreground/90 sm:text-lg">
          {identity.fullName} — created on{' '}
          <strong className="font-semibold">{identity.formedOnDisplay}</strong> during the
          COVID-19 pandemic, chaired by the Prime Minister of India. This page presents the
          fund's reported figures — money in, money out, and the debate around transparency —
          as charts you can scan in minutes.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Created"
            value={identity.formedOnDisplay}
            note="Registered public charitable trust, New Delhi"
          />
          <StatCard
            label="Received in first 5 days"
            value={formatCrore(finances.years[0].receiptsCrore)}
            note="27–31 March 2020 (FY2019-20)"
          />
          <StatCard
            label="FY2020-21 receipts"
            value={formatCrore(finances.years[1].receiptsCrore)}
            note={`Total across both years: ${formatCrore(totalReceiptsCrore)}`}
          />
          <StatCard
            label="Latest balance · 31 March 2025"
            value={formatCrore(auditedStatementFY202425.closingBalanceCrore)}
            note={`Audited statement (primary source) · ${formatCrore(finances.years[1].balanceCrore)} on 31 Mar 2021 via Wikipedia`}
          />
        </div>

        <ul className="mt-6 flex flex-wrap gap-2 text-sm" aria-label="Key legal status facts">
          {[
            `Minimum donation ₹${identity.minimumDonationINR}`,
            'Not audited by CAG',
            'FCRA-exempted (foreign donations allowed)',
            '80G income-tax exemption',
            'Govt position: not under RTI',
          ].map((chip) => (
            <li
              key={chip}
              className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-primary-foreground/90"
            >
              {chip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
