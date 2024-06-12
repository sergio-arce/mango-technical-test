'use client'

import Link from 'next/link'
import { Loading, Range } from '../components'
import { useFetchPrices } from '../hooks'
import { NormalPrice } from '../types/interfaces'
import { _URL_ } from '../utils/constants'

export default function Exercise1() {

  const { data, loading, error } = useFetchPrices<NormalPrice>(`${_URL_}normal-price`)

  return <>
    <h2>Exercise 1</h2>
    {loading && <Loading />}
    {error && <span className="error">{error}</span>}
    {data && <Range min={data.min} max={data.max} currency="€" />}
    <Link href="/" className="go-back">{"< Go back"}</Link>
  </>
}