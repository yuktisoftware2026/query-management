import { useState, useEffect } from 'react'

export const useFetch = (fetchFn, dependencies = []) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    const loadData = async () => {
      try {
        setLoading(true)
        setError(null)
        const result = await fetchFn()
        if (isMounted) {
          setData(result)
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to fetch data')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadData()

    return () => {
      isMounted = false
    }
  }, dependencies)

  return { data, loading, error }
}
