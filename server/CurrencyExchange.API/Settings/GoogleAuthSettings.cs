namespace CurrencyExchange.API.Settings
{
  public class GoogleAuthSettings
  {
    public string ClientId { get; set; } = null!;
    public string ClientSecret { get; set; } = null!;
    public string RedirectUri { get; set; } = null!;
  }
}