/**
 * Hand-written 24px stroke icons (no icon library, ~1.5 KB total).
 * One per section, consistent 1.8px stroke, currentColor.
 */
export type IconName =
  | 'overview'
  | 'finances'
  | 'donations'
  | 'spending'
  | 'timeline'
  | 'debate'
  | 'litigation'
  | 'faq'
  | 'sources'
  | 'references'
  | 'about'
  | 'up'

const PATHS: Record<IconName, React.ReactNode> = {
  overview: (
    <>
      <path d="M8 6h13M8 12h13M8 18h13" />
      <circle cx="3.5" cy="6" r="1" />
      <circle cx="3.5" cy="12" r="1" />
      <circle cx="3.5" cy="18" r="1" />
    </>
  ),
  finances: <path d="M4 20h16M7 16v-4M12 16V7M17 16v-7" />,
  donations: (
    <>
      <circle cx="9" cy="9" r="5.5" />
      <path d="M13.5 7.6A5.5 5.5 0 1 1 7.6 13.5" />
    </>
  ),
  spending: <path d="M21 8l-9-5-9 5v8l9 5 9-5V8zM3 8l9 5 9-5M12 13v8" />,
  timeline: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </>
  ),
  debate: (
    <>
      <path d="M4 5h12v8H8l-4 3V5z" />
      <path d="M20 9v8l-3-2h-4" />
    </>
  ),
  litigation: (
    <>
      <path d="M14 4l6 6M13 5l-7 7 3 3 7-7" />
      <path d="M3 21h9M6 12l3 3" />
    </>
  ),
  faq: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.6 9.2a2.6 2.6 0 1 1 3.6 2.4c-.8.4-1.2.9-1.2 1.8M12 17h.01" />
    </>
  ),
  sources: <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />,
  references: (
    <>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </>
  ),
  about: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8h.01M12 12v4" />
    </>
  ),
  up: <path d="M12 19V5M5 12l7-7 7 7" />,
}

export function Icon({ name, className = 'h-5 w-5' }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {PATHS[name]}
    </svg>
  )
}
