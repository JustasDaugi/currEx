using System;

namespace CurrencyExchange.Domain.Models
{
  public class ConversionResult
  {
    public decimal Amount { get; set; }
    public string FromCurrency { get; set; } = string.Empty;
    public string ToCurrency { get; set; } = string.Empty;
    public decimal Result { get; set; }
    public decimal Rate { get; set; }
    public DateTime Date { get; set; }
  }
}
