using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CurrencyExchange.Infrastructure.Repositories;

namespace CurrencyExchange.API.Controllers
{
  [ApiController]
  [Route("api/conversions")]
  public class ConversionControllerGet : ControllerBase
  {
    private readonly IConversionRepository _repo;

    public ConversionControllerGet(IConversionRepository repo)
    {
      _repo = repo;
    }

    [HttpGet("{userId}")]
    public async Task<IActionResult> GetByUser(string userId)
    {
      var conversions = await _repo.GetRecentByUserAsync(userId);
      return Ok(conversions);
    }
  }
}
