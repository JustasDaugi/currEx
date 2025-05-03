using Microsoft.AspNetCore.Mvc;

namespace CurrencyExchange.API.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class CurrenciesController : ControllerBase
  {
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
