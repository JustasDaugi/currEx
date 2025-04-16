using System;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using CurrencyExchange.Domain.Models;
using CurrencyExchange.API.Helpers;
using CurrencyExchange.API.Constants;

namespace CurrencyExchange.API.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class HistoricalConversionController : ControllerBase
  {
    private readonly IConfiguration _configuration;
    private readonly IHttpClientFactory _httpClientFactory;

    public HistoricalConversionController(IConfiguration configuration, IHttpClientFactory httpClientFactory)
    {
      _configuration = configuration;
      _httpClientFactory = httpClientFactory;
    }

    [HttpGet("convert")]
    public async Task<IActionResult> ConvertHistorical(
        [FromQuery(Name = "base")] string baseCurrency,
        [FromQuery] int year,
        [FromQuery] int month,
        [FromQuery] int day)
    {
      var historicalEndpoint = _configuration["CurrencyApi:HistoricalEndpoint"];
      if (string.IsNullOrEmpty(historicalEndpoint))
      {
        return StatusCode(500, ErrorMessages.ApiEndpointNotConfigured);
      }

      var requestedDate = new DateTime(year, month, day);
      if (requestedDate > DateTime.UtcNow.Date)
      {
        return BadRequest(ErrorMessages.FutureDateNotAllowed);
      }

      var requestUrl = HistoricalConversionHelper.BuildRequestUrl(historicalEndpoint, baseCurrency, year, month, day);

      ExternalHistoricalResponse externalResponse;
      try
      {
        var client = _httpClientFactory.CreateClient();
        externalResponse = await client.GetFromJsonAsync<ExternalHistoricalResponse>(requestUrl);
      }
      catch (Exception ex)
      {
        return StatusCode(500, ErrorMessages.ExternalApiError + ex.Message);
      }

      if (externalResponse == null ||
          !externalResponse.Result.Equals("success", StringComparison.OrdinalIgnoreCase))
      {
        return StatusCode(500, ErrorMessages.RetrievalFailed);
      }

      return Ok(new
      {
        base_code = externalResponse.Base_code,
        date = new DateTime(externalResponse.Year, externalResponse.Month, externalResponse.Day),
        conversion_rates = externalResponse.Conversion_rates
      });
    }
  }
}
