import { act, render, screen } from '@testing-library/react'
import type { ComponentType } from 'react'
import { describe, expect, it } from 'vitest'
import { ChartSlot } from './ChartSlot'

describe('ChartSlot — deferred chart loading', () => {
  it('shows a placeholder until the chart module resolves, then renders the chart', async () => {
    let resolveChart: (chart: ComponentType) => void = () => {}
    const pending = new Promise<ComponentType>((resolve) => {
      resolveChart = resolve
    })
    render(<ChartSlot load={() => pending} />)

    expect(screen.getByText(/loading chart/i)).toBeInTheDocument()

    await act(async () => {
      resolveChart(() => <p>CHART READY</p>)
    })
    expect(await screen.findByText('CHART READY')).toBeInTheDocument()
  })

  it('ignores module resolution after unmount (no crash, no state leak)', async () => {
    let resolveChart: (chart: ComponentType) => void = () => {}
    const pending = new Promise<ComponentType>((resolve) => {
      resolveChart = resolve
    })
    const { unmount } = render(<ChartSlot load={() => pending} />)
    unmount()

    await act(async () => {
      resolveChart(() => <p>LATE RESOLUTION</p>)
    })
    expect(screen.queryByText('LATE RESOLUTION')).not.toBeInTheDocument()
  })
})
