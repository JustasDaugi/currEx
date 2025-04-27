# currEx

## Description

A full-stack currency conversion app with:  
- Real-time and historical rates via ExchangeRate-API  
- MongoDB for storing user Email/passwords and user conversion history  
- Google OAuth sign-up and login

## Prerequisites

- .NET 8 SDK:
    * Follow setup instructions from this link, specifying the ubuntu version - https://learn.microsoft.com/en-us/dotnet/core/install/linux-ubuntu-install?tabs=dotnet8&pivots=os-linux-ubuntu-your_ubuntu_version
- Node.js 18+ and npm:
```bash
    sudo apt update
 ```
Then install Node.js:
```bash
sudo apt install nodejs
 ```
- MongoDB
    * Install MongoDB by following the instructions from this link - https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/
- Docker
    * Install and Setup Docker - https://www.docker.com/get-started/ 

## Images
![Image](https://github.com/user-attachments/assets/a041a26d-8a25-4325-8c1f-4914dc3957b1)

![Image](https://github.com/user-attachments/assets/824208eb-7e34-4b65-b327-d24bee260043)

![Image](https://github.com/user-attachments/assets/0dbb6a6e-02b2-43a4-b962-9f4d0d087f68)

## Setup (Build and run with Docker)

### Edit `.env` in project root and fill in:

(Running the app in a development environment requires API_KEY, GOOGLE_CLIENT_ID, and GOOGLE_CLIENT_SECRET to be filled in server/CurrencyExchange.API/appsettings.json)

1. API_KEY - signup for a free api key on https://www.exchangerate-api.com/
2. GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET:
    1. Create an account on Google Cloud Console
    2. Create a new project
    3. Select APIs and Services
    4. Select Credentials >> At the top, select Create Credentials
    5. Select OAuth Client ID
    6. Under Application Type, select Web Application
    7. Under Authorised Javascript Origins, paste in http://localhost:3000
    8. Under Authorised Redirect URIs, paste in http://localhost:5243/api/auth/google/callback
    9. Click Create. This will generate a CLIENT ID and CLIENT SECRET. 
    10. Paste these in to the root level .env file


## Run With Docker Compose
### From the project root:

```bash
docker-compose up -d --build
```

### Frontend
### Run Locally
```bash
cd client
npm install
npm run dev
```
---

## Backend
### From the project root, run:

```bash
dotnet build
dotnet run --project server/CurrencyExchange.API/CurrencyExchange.API.csproj
```
