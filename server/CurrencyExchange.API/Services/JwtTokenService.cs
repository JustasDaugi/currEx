using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using CurrencyExchange.Domain.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace CurrencyExchange.API.Services
{
  public class JwtTokenService
  {
    private readonly IConfiguration _config;

    public JwtTokenService(IConfiguration config)
    {
      _config = config;
    }

    public string GenerateToken(User user)
    {
      var jwtSection = _config.GetSection("JwtSettings");
      var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSection["Key"]));
      var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
      var expires = DateTime.UtcNow.AddMinutes(
          double.Parse(jwtSection["ExpiresInMinutes"])
      );

      var claims = new[]
      {
                new Claim(JwtRegisteredClaimNames.Sub,   user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Name,  user.Name),
                new Claim(JwtRegisteredClaimNames.Jti,   Guid.NewGuid().ToString()),
            };

      var token = new JwtSecurityToken(
          issuer: jwtSection["Issuer"],
          audience: jwtSection["Audience"],
          claims: claims,
          notBefore: DateTime.UtcNow,
          expires: expires,
          signingCredentials: creds
      );

      return new JwtSecurityTokenHandler().WriteToken(token);
    }
  }
}
