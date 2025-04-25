using CurrencyExchange.API.Services;
using CurrencyExchange.API.Settings;
using CurrencyExchange.Domain.Repositories;
using CurrencyExchange.Infrastructure.Repositories;
using CurrencyExchange.Infrastructure.Settings;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<MongoSettings>(
    builder.Configuration.GetSection("Mongo"));

builder.Services.Configure<GoogleAuthSettings>(
    builder.Configuration.GetSection("GoogleAuth"));

builder.Services.Configure<ClientAppSettings>(
    builder.Configuration.GetSection("ClientApp"));

builder.Services.AddSingleton<IMongoClient>(sp =>
{
  var opts = sp.GetRequiredService<IOptions<MongoSettings>>().Value;
  return new MongoClient(opts.ConnectionString);
});
builder.Services.AddScoped<IConversionRepository, MongoConversionRepository>();
builder.Services.AddScoped<IUserRepository, MongoUserRepository>();

builder.Services.AddSingleton<JwtTokenService>();
builder.Services.AddHttpClient();
builder.Services.AddControllers();

builder.Services.AddCors(o => o.AddPolicy("AllowLocalhost3000", p =>
{
  p.WithOrigins("http://localhost:3000")
   .AllowAnyHeader()
   .AllowAnyMethod()
   .AllowCredentials();
}));

var app = builder.Build();
app.UseRouting();
app.UseCors("AllowLocalhost3000");
app.UseAuthorization();
app.MapControllers();
app.Run();
