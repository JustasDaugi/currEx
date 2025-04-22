import type { Currency } from "@/types";

const BASE = process.env.NEXT_PUBLIC_API_BASE;
const CURRENCIES_PATH = process.env.NEXT_PUBLIC_CURRENCIES_PATH;

export async function fetchCurrencies(): Promise<Currency[]> {
  const url = `${BASE}${CURRENCIES_PATH}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch currencies");
  }
  return response.json();
}
