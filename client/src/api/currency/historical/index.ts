import type { HistoricalApiResponse } from "@/types";

const BASE = process.env.NEXT_PUBLIC_API_BASE;
const HISTORICAL_PATH = process.env.NEXT_PUBLIC_HISTORICAL_PATH;

export async function fetchHistoricalRate(
  baseCurrency: string,
  date: Date
): Promise<HistoricalApiResponse> {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();

  const params = new URLSearchParams({
    base: baseCurrency,
    year: String(y),
    month: String(m),
    day: String(d),
  });

  const url = `${BASE}${HISTORICAL_PATH}?${params}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch data for ${date.toDateString()}: ${response.statusText}`
    );
  }

  return response.json();
}
