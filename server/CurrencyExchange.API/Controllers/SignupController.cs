using System;
using Microsoft.AspNetCore.Mvc;
using CurrencyExchange.API.Models;
using CurrencyExchange.Domain.Models;
using CurrencyExchange.Domain.Repositories;
using CurrencyExchange.API.Services;

namespace CurrencyExchange.API.Controllers
{
  [ApiController]
  [Route("api/auth")]
  public class SignupController : ControllerBase
  {
    private readonly IUserRepository _users;

    public SignupController(IUserRepository users)
    {
      _users = users;
    }

    [HttpPost("signup")]
    public async Task<IActionResult> SignUp([FromBody] SignUpDto dto)
    {
      var existing = await _users.GetByEmailAsync(dto.Email);
      if (existing != null)
        return Conflict(new { message = "A user with that email already exists." });

      var user = new User
      {
        Id = Guid.NewGuid().ToString(),
        Name = dto.Name,
        Email = dto.Email,
        PasswordHash = PasswordHasher.HashPassword(dto.Password),
        CreatedAt = DateTime.UtcNow
      };

      await _users.AddAsync(user);

      return Ok(new
      {
        user.Id,
        user.Name,
        user.Email
      });
    }
  }
}
