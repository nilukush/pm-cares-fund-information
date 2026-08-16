import type { ReactNode } from 'react'
import { Icon, type IconName } from './icons'

interface SectionProps {
  id: string
  title: string
  lead?: string
  icon?: IconName
  children: ReactNode
  dark?: boolean
}

/** Consistent page section with anchor id, icon, heading, permalink and optional lead. */
export function Section({ id, title, lead, icon, children, dark = false }: SectionProps) {
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
        <div className="group flex items-center gap-3">
          {icon && (
            <span
              aria-hidden="true"
              className={
                dark
                  ? 'grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/10 text-chart-2'
                  : 'grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent'
              }
            >
              <Icon name={icon} />
            </span>
          )}
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
          <a
            href={`#${id}`}
            aria-label={`Permalink to ${title}`}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-md font-normal text-accent opacity-0 transition-opacity focus:opacity-100 hover:bg-accent/10 group-hover:opacity-100"
          >
            #
          </a>
        </div>
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
