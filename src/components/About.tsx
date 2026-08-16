import { about } from '../data/fund'

/**
 * About & methodology: who runs this page, how facts are sourced and verified,
 * known limitations, and the feedback channel.
 */
export function About() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-surface p-4 shadow-sm sm:p-6">
          <h3 className="text-lg font-semibold text-primary">What this is</h3>
          <p className="mt-3 text-sm leading-relaxed text-foreground">{about.what}</p>
          <p className="mt-3 text-sm leading-relaxed text-foreground">{about.funding}</p>
          <a
            href={about.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block break-words text-sm font-medium text-accent-strong underline decoration-2 underline-offset-2 transition-colors hover:text-accent"
          >
            Full source code is public on GitHub
          </a>
        </div>

        <div className="rounded-xl border border-border bg-surface p-4 shadow-sm sm:p-6">
          <h3 className="text-lg font-semibold text-primary">How facts are verified</h3>
          <ol className="mt-3 flex flex-col gap-4">
            {about.methodology.map((m) => (
              <li key={m.title}>
                <p className="text-sm font-semibold text-primary">{m.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-foreground">{m.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-surface p-4 shadow-sm sm:p-6">
          <h3 className="text-lg font-semibold text-primary">Editorial principles</h3>
          <ul className="mt-3 flex flex-col gap-4">
            {about.principles.map((p) => (
              <li key={p.title} className="border-l-4 border-chart-1 pl-3">
                <p className="text-sm font-semibold text-primary">{p.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-foreground">{p.detail}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-border bg-surface p-4 shadow-sm sm:p-6">
          <h3 className="text-lg font-semibold text-primary">Known limitations</h3>
          <ul className="mt-3 list-disc space-y-2.5 pl-5 text-sm leading-relaxed text-foreground">
            {about.limitations.map((l) => (
              <li key={l.slice(0, 24)}>{l}</li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-secondary">Spotted something wrong?</p>
          <a
            href={about.feedbackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-accent-strong"
          >
            Report an error on GitHub
          </a>
        </div>
      </div>
    </div>
  )
}
