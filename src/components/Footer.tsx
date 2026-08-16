import { DATA_AS_OF, WIKIPEDIA_URL } from '../data/fund'
import { NAV_ITEMS } from './Header'

/** Footer: neutrality disclaimer, section mini-nav + data vintage. */
export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <p className="max-w-4xl text-sm leading-relaxed text-primary-foreground/85">
          <strong className="font-semibold text-primary-foreground">Neutrality note:</strong>{' '}
          this is an independent, non-commercial public-information page summarizing the
          Wikipedia article on the PM CARES Fund. It is not affiliated with the Government of
          India or the PM CARES Fund. Criticism and the government&rsquo;s defence are both
          presented as reported by the source.
        </p>
        <nav aria-label="Sections" className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="text-primary-foreground/80 underline-offset-2 hover:text-primary-foreground hover:underline"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <p className="mt-4 text-sm text-primary-foreground/70">
          Data as of: {DATA_AS_OF} ·{' '}
          <a
            href={WIKIPEDIA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-1 underline-offset-2 hover:text-primary-foreground"
          >
            Read the source article
          </a>
        </p>
      </div>
    </footer>
  )
}
