import { useEffect, useState } from 'react'

// Interface for fetch state
interface FetchState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

export const useFetchPrices = <T,>(url: string): FetchState<T> => {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const fetchData = async () => {
      setState({ data: null, loading: true, error: null })

      try {
        // Fetch data from the given URL
        const response = await fetch(url, { signal })
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`)
        }
        const data = await response.json()
        setState({ data, loading: false, error: null })
      } catch (error: any) {
        if (error.name !== 'AbortError') {
          // Handle fetch error
          setState({ data: null, loading: false, error: error.message })
        }
      }
    }

    // Call fetch data function
    fetchData()

    // Cleanup function to abort fetch on unmount
    return () => {
      controller.abort()
    }
  }, [url])

  return state
}
