import { identity } from '../data/fund'

/** Identity / governance card for the Overview section. */
export function IdentityCard() {
  const rows: [string, string][] = [
    ['Full name', identity.fullName],
    ['Type', identity.registration],
    ['Operates from', identity.address],
    ['Chairperson (ex-officio)', `${identity.chairperson} — Prime Minister of India`],
    ['Ex-officio trustees', identity.exOfficioTrustees.join(' · ')],
    ['Other trustees', identity.additionalTrustees],
    ['Advisory board', identity.advisoryBoard],
    ['Trustee list disclosure', identity.trusteesPublicNote],
    ['Auditor', `${identity.auditor} — ${identity.auditorNote}`],
    ['Stated purpose', identity.purposeScope],
    ['Website', identity.website],
    [
      'Minimum donation',
      `₹${identity.minimumDonationINR} (any citizen could donate)`,
    ],
    ['Law Ministry petitions', identity.lawMinistryNote],
  ]

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
      <h3 className="border-b border-border bg-muted px-4 py-3 text-lg font-semibold text-primary sm:px-6">
        About the fund
      </h3>
      <dl className="divide-y divide-border/60">
        {rows.map(([term, detail]) => (
          <div key={term} className="grid gap-1 px-4 py-3 sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-semibold text-secondary">{term}</dt>
            <dd className="text-sm leading-relaxed text-foreground sm:col-span-2">{detail}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
