"use client";

import { useState } from "react";
import { formatRequest } from "@/api/currency/format";
import { useAuthStore } from "@/stores/auth";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE!;
const CONVERTIONS_PATH = process.env.NEXT_PUBLIC_CONVERSIONS_PATH!;

export function useCurrencyConverter() {
  const [amount, setAmount] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("EUR");
  const [result, setResult] = useState<number>(0);
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const user = useAuthStore((s) => s.user);

  const handleConvert = async () => {
    setIsConverting(true);
    try {
      const data = await formatRequest(amount, fromCurrency, toCurrency);
      setResult(data.result);
      setError(null);

      if (user) {
        await fetch(`${API_BASE}${CONVERTIONS_PATH}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.id,
            fromCurrency,
            toCurrency,
            amount,
            rate: data.result / (amount || 1),
            result: data.result,
            date: new Date().toISOString(),
          }),
        });
      }
    } catch (err) {
      console.error("Conversion error:", err);
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setIsConverting(false);
    }
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

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
  };
}
