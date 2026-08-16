import { audit } from '../data/fund'

/** Audit & auditors — the article's full SARC & Associates detail. */
export function AuditCard() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
      <h3 className="border-b border-border bg-muted px-4 py-3 text-lg font-semibold text-primary sm:px-6">
        Audit &amp; auditors
      </h3>
      <div className="px-4 py-4 sm:px-6">
        <p className="text-sm leading-relaxed text-foreground">
          <span className="font-semibold">{audit.firm}</span> — {audit.appointed}. Everything the
          article records about the fund’s auditing:
        </p>
        <ul className="mt-3 list-disc space-y-2.5 pl-5 text-sm leading-relaxed text-foreground">
          {audit.details.map((d) => (
            <li key={d.slice(0, 28)}>{d}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
