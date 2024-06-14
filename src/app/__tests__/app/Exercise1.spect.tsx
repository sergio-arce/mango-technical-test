import { render, screen, waitFor } from '@testing-library/react'
import Exercise1 from '../../exercise1/page'

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
    render(<Exercise1 />)
    expect(
      screen.getByRole("heading", {
        name: /exercise 1/i
      })
    ).toBeInTheDocument()
  })

  it("should show loading component when fetching data", () => {
    useFetchPrices.mockReturnValue({ loading: true, data: null, error: null })
    render(<Exercise1 />)
    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })

  it("should show error message if fetch fails", () => {
    useFetchPrices.mockReturnValue({ loading: false, data: null, error: 'Error fetching data' })
    render(<Exercise1 />)
    expect(screen.getByText('Error fetching data')).toBeInTheDocument()
  })

  it("should render Range component with data", async () => {
    useFetchPrices.mockReturnValue({ loading: false, data: { min: 1, max: 100 }, error: null })
    render(<Exercise1 />)
    await waitFor(() => expect(screen.getByText('1 €')).toBeInTheDocument())
    await waitFor(() => expect(screen.getByText('100 €')).toBeInTheDocument())
  })

  it("should render 'Go back' link", () => {
    useFetchPrices.mockReturnValue({ loading: false, data: null, error: null })
    render(<Exercise1 />)
    expect(screen.getByText('< Go back')).toBeInTheDocument()
  })
})