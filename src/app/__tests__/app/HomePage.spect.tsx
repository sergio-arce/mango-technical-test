import { render, screen } from '@testing-library/react'

import HomePage from '../../page'


describe("Home Page", () => {

  it("should render 'Exercise 1", () => {
    render(<HomePage />)
    expect(screen.getByText('Exercise 1')).toBeInTheDocument()
  })

  it("should render 'Exercise 2", () => {
    render(<HomePage />)
    expect(screen.getByText('Exercise 2')).toBeInTheDocument()
  })
})