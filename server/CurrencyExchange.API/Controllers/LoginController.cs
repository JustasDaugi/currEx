using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using CurrencyExchange.API.Models;
using CurrencyExchange.Domain.Models;
using CurrencyExchange.Domain.Repositories;
using CurrencyExchange.API.Services;

namespace CurrencyExchange.API.Controllers
{
  [ApiController]
  [Route("api/auth")]
  public class LoginController : ControllerBase
  {
    private readonly IUserRepository _users;
    private readonly JwtTokenService _jwtService;

    public LoginController(IUserRepository users, JwtTokenService jwtService)
    {
      _users = users;
      _jwtService = jwtService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto dto)
    {
      var user = await _users.GetByEmailAsync(dto.Email);
      if (user == null ||
          PasswordHasher.HashPassword(dto.Password) != user.PasswordHash)
      {
        return Unauthorized(new { message = "Invalid credentials." });
      }

      var token = _jwtService.GenerateToken(user);

      return Ok(new
      {
        token,
        user = new
        {
          user.Id,
          user.Name,
          user.Email
        }
      });
    }

    [HttpGet("me")]
    [Authorize]
    public IActionResult Me()
    {
      var idClaim = User.FindFirstValue(JwtRegisteredClaimNames.Sub);
      var emailClaim = User.FindFirstValue(JwtRegisteredClaimNames.Email);
      var nameClaim = User.FindFirstValue(JwtRegisteredClaimNames.Name);

      return Ok(new
      {
        user = new
        {
          Id = int.Parse(idClaim!),
          Name = nameClaim,
          Email = emailClaim
        }
      });
    }
  }
}
