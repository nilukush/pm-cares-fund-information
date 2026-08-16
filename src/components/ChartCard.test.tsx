import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ChartCard } from './ChartCard'

describe('ChartCard data table readability', () => {
  it('applies the tabular mono font ONLY to numeric columns', () => {
    render(
      <ChartCard
        title="Test chart"
        ariaLabel="Bar chart for testing"
        tableHeaders={['Source', 'Amount (₹ cr)', 'Notes']}
        numericColumns={[1]}
        tableRows={[
          ['101 PSUs — CSR funds', 2400, 'A long explanatory note in prose form.'],
        ]}
      >
        <div />
      </ChartCard>,
    )
    const sourceCell = screen.getByText('101 PSUs — CSR funds')
    const amountCell = screen.getByText('2400')
    const noteCell = screen.getByText(/A long explanatory note/)
    expect(sourceCell.className).not.toContain('tnum')
    expect(noteCell.className).not.toContain('tnum')
    expect(amountCell.className).toContain('tnum')
  })

  it('headers align with their columns (numeric headers share the tabular style)', () => {
    render(
      <ChartCard
        title="Test chart"
        ariaLabel="Bar chart for testing"
        tableHeaders={['Source', 'Amount (₹ cr)']}
        numericColumns={[1]}
        tableRows={[['32 PSUs', 2105]]}
      >
        <div />
      </ChartCard>,
    )
    const sourceHeader = screen.getByRole('columnheader', { name: 'Source' })
    const amountHeader = screen.getByRole('columnheader', { name: /Amount/ })
    expect(sourceHeader.className).not.toContain('tnum')
    expect(amountHeader.className).toContain('tnum')
  })
})
