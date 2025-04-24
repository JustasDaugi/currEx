using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace CurrencyExchange.Domain.Models
{
  public class Conversion
  {
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = default!;

    public string UserId { get; set; } = null!;
    public DateTime Date { get; set; }
    public string FromCurrency { get; set; } = null!;
    public string ToCurrency { get; set; } = null!;
    public decimal Amount { get; set; }
    public decimal Rate { get; set; }
    public decimal Result { get; set; }
  }
}
