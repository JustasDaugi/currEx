import type { ConversionResult } from "@/types";

const CONVERT_PATH = process.env.NEXT_PUBLIC_CONVERT_PATH;
const BASE = process.env.NEXT_PUBLIC_API_BASE;

export async function formatRequest(
  amount: number,
  fromCurrency: string,
  toCurrency: string
): Promise<ConversionResult> {
  const params = new URLSearchParams({
    amount: String(amount),
    from: fromCurrency,
    to: toCurrency,
  });

  const url = `${BASE}${CONVERT_PATH}?${params}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Conversion failed");
  }
  return response.json();
}
