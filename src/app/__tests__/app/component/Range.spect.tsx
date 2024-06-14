import React from 'react'
import { render, screen } from '@testing-library/react'
import { Range } from '../../../components'

describe('Range Component', () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the Range component with provided min and max values', () => {
    render(<Range min={2} max={50} currency="€" />)
    expect(screen.getByText('2 €')).toBeInTheDocument()
    expect(screen.getByText('50 €')).toBeInTheDocument()
  })

  it('renders the Range component with provided range values', () => {
    render(<Range rangeValues={[5.99, 10.99, 30.99]} currency="€" />)
    expect(screen.getByText('5.99 €')).toBeInTheDocument()
    expect(screen.getByText('30.99 €')).toBeInTheDocument()
  })

})