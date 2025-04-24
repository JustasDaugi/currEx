using CurrencyExchange.Domain.Models;
using System.Threading.Tasks;

namespace CurrencyExchange.Domain.Repositories
{
  public interface IUserRepository
  {
    Task AddAsync(User user);
    Task<User?> GetByEmailAsync(string email);
  }
}
