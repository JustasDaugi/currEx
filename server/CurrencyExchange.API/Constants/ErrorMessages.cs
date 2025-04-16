namespace CurrencyExchange.API.Constants
{
  public static class ErrorMessages
  {
    public const string ApiEndpointNotConfigured = "API endpoint not configured.";
    public const string FutureDateNotAllowed = "Cannot request a future date.";
    public const string ExternalApiError = "Error calling external API: ";
    public const string RetrievalFailed = "Failed to retrieve valid conversion data.";
  }
}
