using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using CurrencyExchange.API.Models;
using CurrencyExchange.Domain.Models;
using CurrencyExchange.Infrastructure.Repositories;

namespace CurrencyExchange.API.Controllers
{
  [ApiController]
  [Route("api/conversions")]
  public class ConversionControllerPost : ControllerBase
  {
    private readonly IConversionRepository _repo;

    public ConversionControllerPost(IConversionRepository repo)
    {
      _repo = repo;
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] ConversionDto dto)
    {
      var conversion = new Conversion
      {
        Id = ObjectId.GenerateNewId().ToString(),
        UserId = dto.UserId,
        FromCurrency = dto.FromCurrency,
        ToCurrency = dto.ToCurrency,
        Amount = dto.Amount,
        Rate = dto.Rate,
        Result = dto.Result,
        Date = dto.Date
      };

      await _repo.AddAsync(conversion);
      return CreatedAtAction(
          actionName: nameof(Post),
          routeValues: new { id = conversion.Id },
          value: conversion
      );
    }
  }
}
