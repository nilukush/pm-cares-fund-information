import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import App from './App'

// Mocked so the test asserts OUR wiring (beacons mounted, app intact) rather
// than @vercel/* internals, which differ between dev/prod environments.
// v2 API: React components live on the /react subpath as named exports.
vi.mock('@vercel/analytics/react', () => ({
  Analytics: () => <script data-testid="vercel-analytics" />,
}))
vi.mock('@vercel/speed-insights/react', () => ({
  SpeedInsights: () => <script data-testid="vercel-speed-insights" />,
}))

describe('Analytics & performance beacons', () => {
  it('mounts Vercel Web Analytics and Speed Insights without breaking the app', () => {
    render(<App />)
    expect(screen.getByTestId('vercel-analytics')).toBeInTheDocument()
    expect(screen.getByTestId('vercel-speed-insights')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/PM CARES Fund/i)
  })
})
