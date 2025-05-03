using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace CurrencyExchange.Domain.Models
{
  public class ExternalHistoricalResponse
  {
    [JsonPropertyName("success")]
    public bool Success { get; set; }

    [JsonPropertyName("terms")]
    public string Terms { get; set; } = string.Empty;

    [JsonPropertyName("privacy")]
    public string Privacy { get; set; } = string.Empty;

    [JsonPropertyName("timeframe")]
    public bool TimeFrame { get; set; }

    [JsonPropertyName("start_date")]
    public DateTime StartDate { get; set; }

    [JsonPropertyName("end_date")]
    public DateTime EndDate { get; set; }

    [JsonPropertyName("source")]
    public string Source { get; set; } = string.Empty;

    [JsonPropertyName("quotes")]
    public Dictionary<string, Dictionary<string, decimal>> Quotes { get; set; }
        = new Dictionary<string, Dictionary<string, decimal>>();
  }
}
