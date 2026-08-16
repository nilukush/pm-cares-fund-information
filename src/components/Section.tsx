import type { ReactNode } from 'react'

interface SectionProps {
  id: string
  title: string
  lead?: string
  children: ReactNode
  dark?: boolean
}

/** Consistent page section with anchor id, heading and optional lead paragraph. */
export function Section({ id, title, lead, children, dark = false }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={
        dark
          ? 'bg-primary text-primary-foreground scroll-mt-16'
          : 'bg-background text-foreground scroll-mt-16'
      }
    >
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
        <h2
          id={`${id}-heading`}
          className={
            dark
              ? 'text-2xl font-bold tracking-tight sm:text-3xl'
              : 'text-2xl font-bold tracking-tight text-primary sm:text-3xl'
          }
        >
          {title}
        </h2>
        {lead && (
          <p
            className={
              dark
                ? 'mt-3 max-w-3xl text-base text-primary-foreground/85'
                : 'mt-3 max-w-3xl text-base text-secondary'
            }
          >
            {lead}
          </p>
        )}
        <div className="mt-8">{children}</div>
      </div>
    </section>
  )
}
