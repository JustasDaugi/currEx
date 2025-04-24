using System;

namespace CurrencyExchange.API.Models
{
  public class ConversionDto
  {
    public string UserId { get; set; } = null!;
    public string FromCurrency { get; set; } = null!;
    public string ToCurrency { get; set; } = null!;
    public decimal Amount { get; set; }
    public decimal Rate { get; set; }
    public decimal Result { get; set; }
    public DateTime Date { get; set; }
  }
}
