export interface Currency {
  code: string;
  name: string;
}

export interface ConversionResult {
  result: number;
}

export interface HistoricalDataPoint {
  date: string;
  formattedDate: string;
  rate: number;
  isIncrease?: boolean;
}

export interface TimePeriod {
  label: string;
  days: number;
}

export interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; payload: HistoricalDataPoint }>;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface TimeframeApiResponse {
  base_code: string;
  start_date: string;
  end_date: string;
  conversion_rates: Record<string, Record<string, number>>;
}
