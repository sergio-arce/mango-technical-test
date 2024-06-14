import { render, screen, waitFor } from '@testing-library/react'
import Exercise2 from '../../exercise2/page'

// Mock useFetchPrices to simulate different states
jest.mock('../../hooks', () => ({
  useFetchPrices: jest.fn(),
}))

const { useFetchPrices } = require('../../hooks')

describe("Exercise 1", () => {

  beforeEach(() => {
    useFetchPrices.mockReset()
  })

  it("should render 'Exercise 1'", () => {
    useFetchPrices.mockReturnValue({ loading: false, data: null, error: null })
    render(<Exercise2 />)
    expect(
      screen.getByRole("heading", {
        name: /exercise 2/i
      })
    ).toBeInTheDocument()
  })

  it("should show loading component when fetching data", () => {
    useFetchPrices.mockReturnValue({ loading: true, data: null, error: null })
    render(<Exercise2 />)
    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })

  it("should show error message if fetch fails", () => {
    useFetchPrices.mockReturnValue({ loading: false, data: null, error: 'Error fetching data' })
    render(<Exercise2 />)
    expect(screen.getByText('Error fetching data')).toBeInTheDocument()
  })

  it("should render Range component with data", async () => {
    useFetchPrices.mockReturnValue({ loading: false, data: { rangeValues: [1.99, 5.99, 10.99, 30.99, 50.99, 70.99] }, error: null })
    render(<Exercise2 />)
    await waitFor(() => expect(screen.getByText('1.99 €')).toBeInTheDocument())
    await waitFor(() => expect(screen.getByText('70.99 €')).toBeInTheDocument())
  })

  it("should render 'Go back' link", () => {
    useFetchPrices.mockReturnValue({ loading: false, data: null, error: null })
    render(<Exercise2 />)
    expect(screen.getByText('< Go back')).toBeInTheDocument()
  })
})