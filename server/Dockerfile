FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY server/CurrencyExchange.API/CurrencyExchange.API.csproj server/CurrencyExchange.API/
COPY server/CurrencyExchange.Domain/CurrencyExchange.Domain.csproj server/CurrencyExchange.Domain/
COPY server/CurrencyExchange.Infrastructure/CurrencyExchange.Infrastructure.csproj \
    server/CurrencyExchange.Infrastructure/
RUN dotnet restore server/CurrencyExchange.API/CurrencyExchange.API.csproj

COPY server/ server/
WORKDIR /src/server/CurrencyExchange.API
RUN dotnet publish -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .
ENV ASPNETCORE_URLS=http://+:80
ENTRYPOINT ["dotnet", "CurrencyExchange.API.dll"]
