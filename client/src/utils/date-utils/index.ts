import { TIME_PERIODS, type TimePeriodKey } from "@/constants"

export function getDaysToFetch(period: string): number {
  if (period in TIME_PERIODS) {
    return TIME_PERIODS[period as TimePeriodKey].days
  }

  return 7
}
