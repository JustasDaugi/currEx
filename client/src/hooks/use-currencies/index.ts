"use client"

import { useState, useEffect } from "react"
import type { Currency } from "@/types"
import { DEFAULT_CURRENCIES } from "@/constants"
import { fetchCurrencies } from "@/api/currency/convert"

export function useCurrencies() {
  const [currencies, setCurrencies] = useState<Currency[]>(DEFAULT_CURRENCIES)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const getCurrencies = async () => {
      setIsLoading(true)
      try {
        const data = await fetchCurrencies()
        if (data.length > 0) {
          setCurrencies(data)
        }
        setError(null)
      } catch (err) {
        console.error("Error fetching currencies:", err)
        setError(err instanceof Error ? err : new Error("Unknown error"))
      } finally {
        setIsLoading(false)
      }
    }

    getCurrencies()
  }, [])

  return { currencies, isLoading, error }
}
