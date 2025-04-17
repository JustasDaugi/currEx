import type { Currency, TimePeriod } from "@/types";

export const DEFAULT_CURRENCIES: Currency[] = [
  { code: "USD", name: "US Dollar" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "British Pound" },
  { code: "JPY", name: "Japanese Yen" },
];

export const DEFAULT_CURRENCY_PAIRS = [
  "USD/EUR",
  "USD/GBP",
  "EUR/USD",
  "GBP/USD",
  "EUR/GBP",
];

export type TimePeriodKey = "7d" | "1m" | "3m" | "6m"

export const TIME_PERIODS: Record<TimePeriodKey, TimePeriod> = {
  "7d": { label: "7D", days: 7 },
  "1m": { label: "1M", days: 30 },
  "3m": { label: "3M", days: 90 },
  "6m": { label: "6M", days: 180 },
}
