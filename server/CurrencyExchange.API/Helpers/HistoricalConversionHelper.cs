namespace CurrencyExchange.API.Helpers
{
  public static class HistoricalConversionHelper
  {
    public static string BuildRequestUrl(string historicalEndpoint, string baseCurrency, int year, int month, int day)
    {
      return $"{historicalEndpoint}/{baseCurrency}/{year}/{month}/{day}";
    }
  }
}
