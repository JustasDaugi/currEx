namespace CurrencyExchange.API.Models
{
  public class SignUpDto
  {
    public string Name { get; set; } = default!;
    public string Email { get; set; } = default!;
    public string Password { get; set; } = default!;
  }
}
