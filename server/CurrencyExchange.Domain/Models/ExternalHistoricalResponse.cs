using System.Collections.Generic;

namespace CurrencyExchange.Domain.Models
{
  public class ExternalHistoricalResponse
  {
    public string Result { get; set; } = string.Empty;
    public string Documentation { get; set; } = string.Empty;
    public string Terms_of_use { get; set; } = string.Empty;
    public int Year { get; set; }
    public int Month { get; set; }
    public int Day { get; set; }
    public string Base_code { get; set; } = string.Empty;
    public Dictionary<string, decimal> Conversion_rates { get; set; } = new Dictionary<string, decimal>();
  }
}
