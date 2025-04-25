# CurrencyExchange

A full-stack currency conversion app with:  
- Real-time and historical rates via ExchangeRate-API  
- MongoDB for user data and conversion history  
- Email/password and Google OAuth authentication  
- .NET 8 backend + Next.js + Docker Compose

## Prerequisites

- [.NET 8 SDK]  
- Node.js 18+ and npm  
- MongoDB
- Docker

## Setup

### Environment Variables

Edit `.env` and fill in:
  
- `API_KEY`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`

---

## Frontend

### Run Locally
```bash
cd client
npm install
npm run dev
```
---
## Backend
### Run Locally from project root

```bash
dotnet build
dotnet run --project server/CurrencyExchange.API/CurrencyExchange.API.csproj
```