export interface Currency {
  code: string
  name: string
}

export interface ConversionResult {
  result: number
}

export interface HistoricalDataPoint {
  date: string
  formattedDate: string
  rate: number
  isIncrease?: boolean
}

export interface HistoricalApiResponse {
  base_code: string
  date: string
  conversion_rates: Record<string, number>
}


export interface TimePeriod {
  label: string
  days: number
}

export interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; payload: HistoricalDataPoint }>;
}
