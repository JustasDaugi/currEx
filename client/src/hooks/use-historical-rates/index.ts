"use client";

import { useState, useEffect } from "react";
import { format, subDays, isFuture, startOfDay } from "date-fns";
import type { HistoricalDataPoint, HistoricalApiResponse } from "@/types";
import { fetchHistoricalRate } from "@/api/currency/historical";
import { getDaysToFetch } from "@/utils/date-utils";

const generateDatesToFetch = (period: string): Date[] => {
  const daysToFetch = getDaysToFetch(period);
  const now = new Date();
  const today = startOfDay(now);

  return Array.from({ length: daysToFetch }, (_, i) => daysToFetch - 1 - i)
    .map((days) => subDays(now, days))
    .filter((date) => !isFuture(date) && date < today);
};

const createDataPoint = (
  date: Date,
  result: HistoricalApiResponse,
  targetCurrency: string
): HistoricalDataPoint | null => {
  if (!result.conversion_rates || !result.conversion_rates[targetCurrency]) {
    console.warn(
      `No rate found for ${targetCurrency} on ${format(date, "MMM d")}`
    );
    return null;
  }

  return {
    date: date.toISOString(),
    formattedDate: format(date, "MMM d"),
    rate: result.conversion_rates[targetCurrency],
  };
};

const addTrendIndicators = (
  dataPoints: HistoricalDataPoint[]
): HistoricalDataPoint[] => {
  return dataPoints.map((point, index) => {
    const prevRate = index > 0 ? dataPoints[index - 1].rate : point.rate;
    return {
      ...point,
      isIncrease: point.rate > prevRate,
    };
  });
};

const fetchDataForDate = async (
  date: Date,
  baseCurrency: string,
  targetCurrency: string
): Promise<HistoricalDataPoint | null> => {
  try {
    const result = await fetchHistoricalRate(baseCurrency, date);
    return createDataPoint(date, result, targetCurrency);
  } catch (err) {
    console.error(`Error fetching data for ${format(date, "MMM d")}:`, err);
    return null;
  }
};

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

  useEffect(() => {
    const fetchHistoricalData = async () => {
      setIsLoading(true);
      setError(null);
      setHistoricalData([]);

      try {
        const datesToFetch = generateDatesToFetch(period);

        const results = await Promise.all(
          datesToFetch.map((date) =>
            fetchDataForDate(date, baseCurrency, targetCurrency)
          )
        );

        const dataPoints = results.filter(Boolean) as HistoricalDataPoint[];

        if (dataPoints.length === 0) {
          setError(
            "No data available"
          );
          return;
        }

        const processedData = addTrendIndicators(dataPoints);
        setHistoricalData(processedData);
      } catch (err) {
        console.error("Error fetching historical data:", err);
        setError("Failed to fetch historical data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistoricalData();
  }, [baseCurrency, targetCurrency, period]);

  return { historicalData, isLoading, error };
}
