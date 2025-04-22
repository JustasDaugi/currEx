using System;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using CurrencyExchange.Domain.Models;
using CurrencyExchange.API.Constants;

namespace CurrencyExchange.API.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class CurrencyExchangeController : ControllerBase
  {
    private readonly IConfiguration _configuration;
    private readonly IHttpClientFactory _httpClientFactory;

    public CurrencyExchangeController(IConfiguration configuration, IHttpClientFactory httpClientFactory)
    {
      _configuration = configuration;
      _httpClientFactory = httpClientFactory;
    }

    [HttpGet("convert")]
    public async Task<IActionResult> Convert(
        [FromQuery] decimal amount,
        [FromQuery(Name = "from")] string fromCurrency,
        [FromQuery(Name = "to")] string toCurrency)
    {
      var endpoint = _configuration["CurrencyApi:ConversionEndpoint"];
      if (string.IsNullOrEmpty(endpoint))
      {
        return StatusCode(500, ErrorMessages.ApiEndpointNotConfigured);
      }

      var client = _httpClientFactory.CreateClient();
      var requestUrl = $"{endpoint}/{fromCurrency}/{toCurrency}";

      ExternalConversionResponse externalResponse;
      try
      {
        externalResponse = await client.GetFromJsonAsync<ExternalConversionResponse>(requestUrl);
      }
      catch (Exception ex)
      {
        return StatusCode(500, ErrorMessages.ExternalApiError + ex.Message);
      }

      if (externalResponse == null || externalResponse.Result.ToLower() != "success")
      {
        return StatusCode(500, ErrorMessages.RetrievalFailed);
      }

      var conversionResult = new ConversionResult
      {
        Amount = amount,
        FromCurrency = fromCurrency,
        ToCurrency = toCurrency,
        Rate = externalResponse.Conversion_rate,
        Result = amount * externalResponse.Conversion_rate,
        Date = DateTime.TryParse(externalResponse.Time_last_update_utc, out DateTime dt) ? dt : DateTime.UtcNow
      };

      return Ok(conversionResult);
    }

    [HttpGet("currencies")]
    public IActionResult GetCurrencies()
    {
      var currencies = new[]
      {
                new { Code = "USD", Name = "US Dollar" },
                new { Code = "EUR", Name = "Euro" },
                new { Code = "GBP", Name = "British Pound" },
                new { Code = "JPY", Name = "Japanese Yen" }
            };

      return Ok(currencies);
    }
  }
}
