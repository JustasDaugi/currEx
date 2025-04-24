using CurrencyExchange.Domain.Models;
using CurrencyExchange.Domain.Repositories;
using CurrencyExchange.Infrastructure.Settings;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace CurrencyExchange.Infrastructure.Repositories
{
  public class MongoUserRepository : IUserRepository
  {
    private readonly IMongoCollection<User> _col;
    public MongoUserRepository(IMongoClient client, IOptions<MongoSettings> opts)
    {
      var db = client.GetDatabase(opts.Value.DatabaseName);
      _col = db.GetCollection<User>("users");
    }

    public Task AddAsync(User user) =>
      _col.InsertOneAsync(user);

    public Task<User?> GetByEmailAsync(string email) =>
      _col.Find(u => u.Email == email).FirstOrDefaultAsync();
  }
}
