namespace CurrencyExchange.Domain.Models
{
  public class ExternalConversionResponse
  {
    public string Result { get; set; } = string.Empty;
    public string Documentation { get; set; } = string.Empty;
    public string Terms_of_use { get; set; } = string.Empty;
    public long Time_last_update_unix { get; set; }
    public string Time_last_update_utc { get; set; } = string.Empty;
    public long Time_next_update_unix { get; set; }
    public string Time_next_update_utc { get; set; } = string.Empty;
    public string Base_code { get; set; } = string.Empty;
    public string Target_code { get; set; } = string.Empty;
    public decimal Conversion_rate { get; set; }
  }
}
