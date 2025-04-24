using System;

namespace CurrencyExchange.Domain.Models
{
  public class Conversion
  {
    public string Id { get; set; } = default!;
    public string UserId { get; set; } = default!;
    public DateTime Date { get; set; }
    public string FromCurrency { get; set; } = default!;
    public string ToCurrency { get; set; } = default!;
    public decimal Amount { get; set; }
    public decimal Rate { get; set; }
    public decimal Result { get; set; }
  }
}
