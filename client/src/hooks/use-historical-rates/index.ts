"use client";

import { useState, useEffect, useCallback } from "react";
import { format, subDays, startOfDay } from "date-fns";
import type { HistoricalDataPoint, TimeframeApiResponse } from "@/types";
import { fetchHistoricalTimeframe } from "@/api/currency/historical";
import { getDaysToFetch } from "@/utils/date-utils";

function calculateDateRange(period: string): {
  startDate: Date;
  endDate: Date;
} {
  const daysToFetch = getDaysToFetch(period);
  const today = startOfDay(new Date());
  const endDate = subDays(today, 1);
  const startDate = subDays(endDate, daysToFetch - 1);
  return { startDate, endDate };
}

/** Turn API response into a sorted list of data points */
function transformApiResponse(
  response: TimeframeApiResponse,
  base: string,
  target: string
): Omit<HistoricalDataPoint, "isIncrease">[] {
  return Object.entries(response.conversion_rates)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([dateStr, rates]) => {
      const key = `${base}${target}`;
      const rate = rates[key] ?? rates[target]!;
      return {
        date: dateStr,
        formattedDate: format(new Date(dateStr), "MMM d"),
        rate,
      };
    });
}

/** Annotate each point with whether the rate increased from the previous day */
function addTrendIndicators(
  data: HistoricalDataPoint[]
): HistoricalDataPoint[] {
  return data.map((pt, i, arr) => ({
    ...pt,
    isIncrease: i > 0 ? pt.rate > arr[i - 1].rate : false,
  }));
}

export function useHistoricalRates(
  baseCurrency: string,
  targetCurrency: string,
  period: string
) {
  const [historicalData, setHistoricalData] = useState<HistoricalDataPoint[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadHistoricalData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setHistoricalData([]);

    const { startDate, endDate } = calculateDateRange(period);

    try {
      const response = await fetchHistoricalTimeframe(
        baseCurrency,
        startDate,
        endDate,
        targetCurrency
      );
      const rawPoints = transformApiResponse(
        response,
        baseCurrency,
        targetCurrency
      );

      if (rawPoints.length === 0) {
        setError("No data available");
        return;
      }

      setHistoricalData(addTrendIndicators(rawPoints));
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Failed to load historical data"
      );
    } finally {
      setIsLoading(false);
    }
  }, [baseCurrency, targetCurrency, period]);

  useEffect(() => {
    loadHistoricalData();
  }, [loadHistoricalData]);

  return { historicalData, isLoading, error };
}
