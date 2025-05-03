import type { TimeframeApiResponse } from "@/types";

const BASE = process.env.NEXT_PUBLIC_API_BASE;
const TIMEFRAME_PATH = process.env.NEXT_PUBLIC_HISTORICAL_TIMEFRAME_PATH;

export async function fetchHistoricalTimeframe(
  baseCurrency: string,
  startDate: Date,
  endDate: Date,
  currencies: string
): Promise<TimeframeApiResponse> {
  const params = new URLSearchParams();
  params.set("base", baseCurrency);
  params.set("start_date", startDate.toISOString().slice(0, 10));
  params.set("end_date", endDate.toISOString().slice(0, 10));
  params.set("currencies", currencies);

  const url = `${BASE}${TIMEFRAME_PATH}?${params.toString()}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error();
  }
  return res.json();
}
