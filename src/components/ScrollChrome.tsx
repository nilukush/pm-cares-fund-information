import { useEffect, useState } from 'react'
import { Icon } from './icons'

/**
 * Reading-progress bar (under the header) + back-to-top button.
 * Both are passive-scroll driven and render in a hidden state on the server.
 */
export function ScrollChrome() {
  const [progress, setProgress] = useState(0)
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0)
      setShowTop(window.scrollY > 800)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <div
        aria-hidden="true"
        className="fixed left-0 top-[60px] z-50 h-0.5 w-full origin-left bg-chart-2"
        style={{ transform: `scaleX(${progress})` }}
      />
      <a
        href="#overview"
        aria-label="Back to top"
        className={`fixed bottom-5 right-5 z-40 grid h-11 w-11 place-items-center rounded-full bg-accent text-white shadow-lg transition-opacity duration-200 hover:bg-accent-strong ${
          showTop ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <Icon name="up" />
      </a>
    </>
  )
}
