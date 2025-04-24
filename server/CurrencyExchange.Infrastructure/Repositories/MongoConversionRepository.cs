using CurrencyExchange.Domain.Models;
using CurrencyExchange.Infrastructure.Repositories;
using CurrencyExchange.Infrastructure.Settings;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CurrencyExchange.Infrastructure.Repositories
{
  public class MongoConversionRepository : IConversionRepository
  {
    private readonly IMongoCollection<Conversion> _collection;

    public MongoConversionRepository(
        IMongoClient client,
        IOptions<MongoSettings> opts)
    {
      var db = client.GetDatabase(opts.Value.DatabaseName);
      _collection = db.GetCollection<Conversion>("conversions");
    }

    public Task AddAsync(Conversion conversion) =>
        _collection.InsertOneAsync(conversion);

    public Task<IEnumerable<Conversion>> GetRecentByUserAsync(string userId, int limit = 10) =>
        _collection
            .Find(c => c.UserId == userId)
            .SortByDescending(c => c.Date)
            .Limit(limit)
            .ToListAsync()
            .ContinueWith(t => (IEnumerable<Conversion>)t.Result);
  }
}
