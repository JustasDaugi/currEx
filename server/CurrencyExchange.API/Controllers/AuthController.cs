using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using CurrencyExchange.API.Settings;
using CurrencyExchange.API.Models;
using CurrencyExchange.Domain.Models;
using CurrencyExchange.Domain.Repositories;
using CurrencyExchange.API.Services;

namespace CurrencyExchange.API.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class AuthController : ControllerBase
  {
    private readonly GoogleAuthSettings _google;
    private readonly ClientAppSettings _clientApp;
    private readonly IUserRepository _users;
    private readonly JwtTokenService _tokens;
    private readonly IHttpClientFactory _httpFactory;

    public AuthController(
        IConfiguration config,
        IUserRepository users,
        JwtTokenService tokens,
        IHttpClientFactory httpFactory)
    {
      _google = config.GetSection("GoogleAuth").Get<GoogleAuthSettings>()!;
      _clientApp = config.GetSection("ClientApp").Get<ClientAppSettings>()!;
      _users = users;
      _tokens = tokens;
      _httpFactory = httpFactory;
    }

    [HttpGet("google")]
    public IActionResult GoogleLogin()
    {
      var state = Guid.NewGuid().ToString("N");
      var url =
          "https://accounts.google.com/o/oauth2/v2/auth" +
          $"?client_id={Uri.EscapeDataString(_google.ClientId)}" +
          $"&redirect_uri={Uri.EscapeDataString(_google.RedirectUri)}" +
          "&response_type=code" +
          "&scope=openid%20email%20profile" +
          $"&state={state}" +
          "&access_type=offline" +
          "&prompt=consent";

      return Redirect(url);
    }

    [HttpGet("google/callback")]
    public async Task<IActionResult> GoogleCallback(
        [FromQuery] string code,
        [FromQuery] string state)
    {
      var client = _httpFactory.CreateClient();
      var req = new HttpRequestMessage(HttpMethod.Post, "https://oauth2.googleapis.com/token")
      {
        Content = new FormUrlEncodedContent(new Dictionary<string, string>
        {
          ["code"] = code,
          ["client_id"] = _google.ClientId,
          ["client_secret"] = _google.ClientSecret,
          ["redirect_uri"] = _google.RedirectUri,
          ["grant_type"] = "authorization_code"
        })
      };

      var tokenRespMsg = await client.SendAsync(req);
      tokenRespMsg.EnsureSuccessStatusCode();
      var tokenData = await tokenRespMsg.Content.ReadFromJsonAsync<GoogleTokenResponse>();
      if (tokenData is null || string.IsNullOrEmpty(tokenData.id_token))
        return StatusCode(500, "Failed to get tokens from Google");

      var payload = await Google.Apis.Auth.GoogleJsonWebSignature.ValidateAsync(tokenData.id_token);

      var user = await _users.GetByEmailAsync(payload.Email!);
      if (user is null)
      {
        user = new User
        {
          Id = Guid.NewGuid().ToString(),
          Name = payload.Name!,
          Email = payload.Email!,
          PasswordHash = string.Empty,
          CreatedAt = DateTime.UtcNow
        };
        await _users.AddAsync(user);
      }

      var jwt = _tokens.GenerateToken(user);
      var redirect = $"{_clientApp.BaseUrl.TrimEnd('/')}/auth/callback#token={Uri.EscapeDataString(jwt)}";
      return Redirect(redirect);
    }
  }
}
