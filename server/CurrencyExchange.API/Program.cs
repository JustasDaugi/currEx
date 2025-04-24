using CurrencyExchange.Domain.Repositories;
using CurrencyExchange.Infrastructure.Repositories;
using CurrencyExchange.Infrastructure.Settings;
using CurrencyExchange.API.Services;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<MongoSettings>(
    builder.Configuration.GetSection("Mongo"));

builder.Services.AddSingleton<IMongoClient>(sp =>
{
  var settings = sp.GetRequiredService<IOptions<MongoSettings>>().Value;
  return new MongoClient(settings.ConnectionString);
});

builder.Services.AddScoped<IConversionRepository, MongoConversionRepository>();
builder.Services.AddScoped<IUserRepository, MongoUserRepository>();

builder.Services.AddSingleton<JwtTokenService>();

builder.Services.AddControllers();
builder.Services.AddHttpClient();

builder.Services.AddCors(options =>
{
  options.AddPolicy("AllowLocalhost3000", policy =>
  {
    policy
          .WithOrigins("http://localhost:3000")
          .AllowAnyHeader()
          .AllowAnyMethod()
          .AllowCredentials();
  });
});

var app = builder.Build();

app.UseRouting();
app.UseCors("AllowLocalhost3000");
app.UseAuthorization();
app.MapControllers();
app.Run();
