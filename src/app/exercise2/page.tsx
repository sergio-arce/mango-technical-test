'use client'

import Link from 'next/link'
import { Loading, Range } from '../components'
import { useFetchPrices } from '../hooks'
import { RangePrices } from '../types/interfaces'
import { _URL_ } from '../utils/constants'

export default function Exercise2() {

  const { data, loading, error } = useFetchPrices<RangePrices>(`${_URL_}range-prices`)

  return <>
    <h2>Exercise 2</h2>
    {loading && <Loading />}
    {error && <p>{error}</p>}
    {data && <Range rangeValues={data.rangeValues} currency="€" />}
    <Link href="/" className="go-back">{"< Go back"}</Link>
  </>
}
