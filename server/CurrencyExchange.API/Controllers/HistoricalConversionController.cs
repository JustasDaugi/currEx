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
  public class HistoricalConversionController : ControllerBase
  {
    private readonly IConfiguration _configuration;
    private readonly IHttpClientFactory _httpClientFactory;

    public HistoricalConversionController(
        IConfiguration configuration,
        IHttpClientFactory httpClientFactory)
    {
      _configuration = configuration;
      _httpClientFactory = httpClientFactory;
    }

    [HttpGet("timeframe")]
    public async Task<IActionResult> GetTimeFrame(
        [FromQuery(Name = "base")] string baseCurrency,
        [FromQuery(Name = "start_date")] DateTime startDate,
        [FromQuery(Name = "end_date")] DateTime endDate,
        [FromQuery] string currencies)
    {
      var endpoint = _configuration["CurrencyApi:TimeFrameEndpoint"];
      if (string.IsNullOrEmpty(endpoint))
        return StatusCode(500, ErrorMessages.ApiEndpointNotConfigured);

      if (endDate < startDate)
        return BadRequest("end_date must be on or after start_date.");

      if (endDate > DateTime.UtcNow.Date || startDate > DateTime.UtcNow.Date)
        return BadRequest(ErrorMessages.FutureDateNotAllowed);

      var url = endpoint
          + $"&start_date={startDate:yyyy-MM-dd}"
          + $"&end_date={endDate:yyyy-MM-dd}"
          + $"&source={baseCurrency}"
          + $"&currencies={currencies}";

      ExternalHistoricalResponse external;
      try
      {
        var client = _httpClientFactory.CreateClient();
        external = await client.GetFromJsonAsync<ExternalHistoricalResponse>(url);
      }
      catch (Exception ex)
      {
        return StatusCode(500, ErrorMessages.ExternalApiError + ex.Message);
      }

      if (external == null || !external.Success || !external.TimeFrame)
        return StatusCode(500, ErrorMessages.RetrievalFailed);

      return Ok(new
      {
        base_code = external.Source,
        start_date = external.StartDate,
        end_date = external.EndDate,
        conversion_rates = external.Quotes
      });
    }
  }
}
