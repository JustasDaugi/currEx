using CurrencyExchange.Domain.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CurrencyExchange.Infrastructure.Repositories
{
  public interface IConversionRepository
  {
    Task AddAsync(Conversion conversion);
    Task<IEnumerable<Conversion>> GetRecentByUserAsync(string userId, int limit = 10);
  }
}
