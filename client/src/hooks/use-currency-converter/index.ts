"use client"

import { useState } from "react"
import { formatRequest } from "@/api/currency/format"

export function useCurrencyConverter() {
  const [amount, setAmount] = useState<number>(1)
  const [fromCurrency, setFromCurrency] = useState<string>("USD")
  const [toCurrency, setToCurrency] = useState<string>("EUR")
  const [result, setResult] = useState<number>(0)
  const [isConverting, setIsConverting] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  const handleConvert = async () => {
    setIsConverting(true)
    try {
      const data = await formatRequest(amount, fromCurrency, toCurrency)
      setResult(data.result)
      setError(null)
    } catch (err) {
      console.error("Error during conversion:", err)
      setError(err instanceof Error ? err : new Error("Unknown error"))
    } finally {
      setIsConverting(false)
    }
  }

  const handleSwap = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  return {
    amount,
    setAmount,
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    result,
    isConverting,
    error,
    handleConvert,
    handleSwap,
  }
}
