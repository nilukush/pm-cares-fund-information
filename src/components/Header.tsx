const NAV_ITEMS = [
  { id: 'overview', label: 'Overview' },
  { id: 'finances', label: 'Finances' },
  { id: 'donations', label: 'Donations' },
  { id: 'spending', label: 'Spending' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'debate', label: 'Debate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'sources', label: 'Sources' },
  { id: 'about', label: 'About' },
]

/** Sticky header with anchor navigation to every section. */
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 sm:px-6">
        <a
          href="#overview"
          className="flex shrink-0 items-center gap-2 rounded-sm font-display text-sm font-bold tracking-tight sm:text-base"
        >
          <span aria-hidden="true" className="text-chart-2">
            ₹
          </span>
          PM CARES · Facts &amp; Figures
        </a>
        <nav aria-label="Sections" className="relative min-w-0 flex-1">
          <ul className="flex items-center gap-1 overflow-x-auto py-1 text-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {NAV_ITEMS.map((item) => (
              <li key={item.id} className="shrink-0">
                <a
                  href={`#${item.id}`}
                  className="rounded-md px-3 py-2 text-primary-foreground/85 transition-colors duration-200 hover:bg-white/10 hover:text-primary-foreground"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          {/* Scroll affordance for the overflow nav on small screens */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-primary to-transparent"
          />
        </nav>
      </div>
    </header>
  )
}
