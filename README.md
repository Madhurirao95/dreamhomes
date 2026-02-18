# DREAMHOMES Server

Backend API for the DREAMHOMES application, built with ASP.NET Core 10.0 and Entity Framework Core.

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [Contributing](#contributing)

## 🏠 About

DREAMHOMES Server is a RESTful API backend that powers the DREAMHOMES property management application. It provides secure authentication, property management, user management, and real-time communication capabilities through SignalR integration.

## ✨ Features

- 🔐 **JWT Authentication** - Secure token-based authentication
- 👤 **Identity Management** - ASP.NET Core Identity for user management
- 🗺️ **Geospatial Support** - NetTopologySuite for location-based queries
- 📊 **Entity Framework Core** - Code-first database approach with SQL Server
- ✅ **Input Validation** - Custom validator pattern for request validation
- 🔄 **AutoMapper** - Object-to-object mapping
- 📝 **API Documentation** - Swagger/OpenAPI documentation
- 🧪 **Comprehensive Testing** - Unit tests with NUnit/Moq and BDD integration tests with SpecFlow

## 🛠️ Tech Stack

### Core Framework
- **.NET**: 10.0
- **C#**: 12.0
- **ASP.NET Core**: 10.0

### Database & ORM
- **SQL Server**: Database engine
- **Entity Framework Core**: 10.0.2
- **NetTopologySuite**: 10.0.2 - Geospatial data support

### Authentication & Security
- **ASP.NET Core Identity**: 10.0.2 - User management
- **JWT Bearer Authentication**: 10.0.2 - Token-based auth

### Libraries & Tools
- **AutoMapper**: 16.0.0 - Object mapping
- **Swashbuckle (Swagger)**: 10.1.0 - API documentation

### Testing Frameworks
- **NUnit**: 4.4.0 - Unit testing framework
- **Moq**: 4.20.70 - Mocking library
- **SpecFlow**: 3.9.74 - BDD testing with Gherkin
- **FluentAssertions**: 8.8.0 - Assertion library
- **Coverlet**: 3.2.0 - Code coverage

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **.NET SDK**: 10.0 or higher - [Download here](https://dotnet.microsoft.com/download)
- **SQL Server**: 2019 or higher (Express edition works fine)
- **Visual Studio 2022** (17.12+) or **VS Code** with C# extension
- **SQL Server Management Studio (SSMS)** - Optional but recommended

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Madhurirao95/dreamhomesserver.git
cd dreamhomesserver
```

2. **Restore NuGet packages**
```bash
dotnet restore
```

3. **Update the connection string**

Edit `appsettings.json` and update the connection string to match your SQL Server instance:
```json
"ConnectionStrings": {
  "SqlConnection": "Server=YOUR_SERVER_NAME;Database=DreamHomes;Trusted_Connection=True;TrustServerCertificate=True"
}
```

4. **Apply database migrations**
```bash
cd DREAMHOMES
dotnet ef database update
```

If migrations don't exist yet, create them:
```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```

5. **Run the application**
```bash
dotnet run
```

The API will be available at `https://localhost:9000` (or the port specified in launchSettings.json)

## ⚙️ Configuration

### JWT Settings

Configure JWT authentication in `appsettings.json`:

```json
"JwtBearerTokenSettings": {
  "SecretKey": "YOUR_SECRET_KEY_HERE",
  "Audience": "https://localhost:4200",
  "Issuer": "https://localhost:9000",
  "ExpiryTimeInMinutes": 1440
}
```

**Security Note**: 
- Change the `SecretKey` to a strong, unique value in production
- Never commit sensitive keys to source control
- Use environment variables or Azure Key Vault for production secrets

### CORS Configuration

The API is configured to allow requests from the Angular frontend at `https://localhost:4200`. Update CORS settings in `Program.cs` or `Startup.cs` if your frontend runs on a different port.

### Connection String

Update the SQL Server connection string for your environment:

**Development (Windows Authentication)**:
```json
"SqlConnection": "Server=YOUR_SERVER;Database=DreamHomes;Trusted_Connection=True;TrustServerCertificate=True"
```

**Production (SQL Authentication)**:
```json
"SqlConnection": "Server=YOUR_SERVER;Database=DreamHomes;User Id=YOUR_USER;Password=YOUR_PASSWORD;TrustServerCertificate=True"
```

## 🗄️ Database Setup

### Using Entity Framework Migrations

1. **Create a new migration**
```bash
dotnet ef migrations add MigrationName
```

2. **Update the database**
```bash
dotnet ef database update
```

3. **Remove last migration** (if needed)
```bash
dotnet ef migrations remove
```

### Database Features

- **Identity Tables**: User authentication and authorization
- **Geospatial Data**: Location-based property queries using NetTopologySuite
- **Code-First Approach**: Database schema defined in C# models

## 🏃 Running the Application

### Development Mode

```bash
dotnet run
```

Or with watch mode (auto-restart on file changes):
```bash
dotnet watch run
```

### Production Build

```bash
dotnet publish -c Release -o ./publish
```

## 📚 API Documentation

Once the application is running, access the Swagger UI documentation at:

```
https://localhost:9000/swagger
```

Swagger provides:
- Interactive API documentation
- Request/response examples
- Try-it-out functionality for testing endpoints

## 🧪 Testing

The solution includes comprehensive test coverage across multiple projects:

### Test Projects

1. **DREAMHOMESTEST** - Unit Tests
   - Framework: NUnit 3.13.3
   - Mocking: Moq 4.20.70
   - Coverage: Coverlet 3.2.0
   - Tests business logic, services, and repositories

2. **Integration Tests** - BDD Tests
   - Framework: SpecFlow 3.9.74 with NUnit
   - Assertions: FluentAssertions 8.8.0
   - Tests API endpoints and workflows using Gherkin syntax
   - Living documentation support

### Running Tests

**Run all tests**:
```bash
dotnet test
```

**Run unit tests only**:
```bash
dotnet test DREAMHOMESTEST/DREAMHOMESTEST.csproj
```

**Run integration tests only**:
```bash
dotnet test "Integration Tests/IntegrationTests.csproj"
```

**Run tests with code coverage**:
```bash
dotnet test /p:CollectCoverage=true /p:CoverletOutputFormat=opencover
```

**Run tests with detailed output**:
```bash
dotnet test --verbosity normal
```

### Test Structure

**Unit Tests (DREAMHOMESTEST)**:
- Service layer tests
- Repository layer tests
- Validator tests
- AutoMapper profile tests
- Uses Moq for dependency mocking

**Integration Tests**:
- Feature files written in Gherkin syntax
- Step definitions for API testing
- End-to-end workflow validation
- Database integration testing

## 📁 Project Structure

```
dreamhomesserver/
├── DREAMHOMES/              # Main API project (.NET 10.0)
│   ├── Controllers/         # API endpoints
│   ├── Models/             # Domain models and entities
│   │   └── Enums/          # Enumeration types
│   ├── Services/           # Business logic layer
│   ├── Repositories/       # Data access layer
│   ├── Data/               # DbContext and configurations
│   ├── DTOs/               # Data Transfer Objects
│   ├── Validators/         # FluentValidation validators
│   ├── Profiles/           # AutoMapper profiles
│   └── Program.cs          # Application entry point
├── DREAMHOMESTEST/         # Unit tests (NUnit + Moq)
│   ├── Services/           # Service layer tests
│   ├── Repositories/       # Repository tests
│   └── Validators/         # Validation tests
├── Integration Tests/      # BDD tests (SpecFlow + NUnit)
│   ├── Features/           # Gherkin feature files
│   ├── StepDefinitions/    # Step definition classes
│   ├── Drivers/            # Test infrastructure
│   └── Support/            # Helper classes
└── DREAMHOMES.sln          # Solution file
```

## 🏗️ Architecture

### Layered Architecture

The application follows a clean architecture pattern:

1. **Controllers Layer**: HTTP request handling and routing
2. **Services Layer**: Business logic and orchestration
3. **Repository Layer**: Data access and persistence
4. **Models Layer**: Domain entities and DTOs

### Key Patterns

- **Repository Pattern**: Data access abstraction
- **Dependency Injection**: Built-in ASP.NET Core DI
- **DTO Pattern**: Data Transfer Objects for API contracts
- **Mapper Pattern**: AutoMapper for object transformations
- **Validator Pattern**: Custom validation for input validation

### Authentication Flow

1. User sends credentials to `/api/auth/login`
2. Server validates credentials against Identity database
3. JWT token generated with claims
4. Client includes token in `Authorization: Bearer {token}` header
5. Middleware validates token on protected endpoints

## 🔐 Security

- JWT token-based authentication
- Password hashing via ASP.NET Core Identity
- HTTPS enforcement
- CORS policy configuration
- SQL injection protection via parameterized queries (EF Core)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards

- Follow C# coding conventions
- Write unit tests for new features
- Add integration tests for new endpoints
- Update API documentation
- Use meaningful commit messages

### Testing Requirements

- Maintain test coverage above 80%
- Write unit tests using NUnit and Moq
- Add integration tests using SpecFlow for new features
- Ensure all tests pass before submitting PR

## 📄 Related Projects

- **Frontend Repository**: [dreamhomes](https://github.com/Madhurirao95/dreamhomes) - Angular 17 client application

## 🌐 Live Demo & Deployment

The API is deployed on Azure and serves the DREAMHOMES frontend application.

- **Live Application**: [https://dreamhomes-7hqb.vercel.app/](https://dreamhomes-7hqb.vercel.app/)
- **Frontend**: Vercel
- **Backend API**: Azure App Service (Free Tier)

> **Important**: This API is hosted on Azure's free tier, which has daily usage quotas and resource limitations. If the API is unresponsive or the live demo is not working, the daily quota may have been exceeded. For local setup instructions, please refer to the [Getting Started](#getting-started) section, or contact [madhurirao95@gmail.com](mailto:madhurirao95@gmail.com) to schedule a personal demonstration.

### Real-Time Chat Feature

The backend includes SignalR hub implementation for real-time communication between buyers and agents.

#### Testing Real-Time Chat

To test the chat functionality with multiple users:

**Setup:**
1. Open the application in two separate browsers (or one normal + one incognito window)
2. **Browser A**: Login as buyer
   - Email: `test@gmail.com`
   - Password: `Test@123`
3. **Browser B**: Login as agent
   - Email: `agent@gmail.com`
   - Password: `Test@123`

**Testing Flow:**

**Buyer Side (Browser A):**
1. Navigate to any property listing
2. Click on the property address to view details
3. Scroll to the bottom of the page
4. Click **"Chat with a Local Expert!"** button (bottom-right corner)
5. Chat dialog opens

**Agent Side (Browser B):**
1. Incoming chat request appears from `test@gmail.com`
2. Click **"Accept"** to establish connection

**Real-Time Features:**
- ✅ Instant message delivery via SignalR
- ✅ No polling or page refresh required
- ✅ WebSocket connection for low-latency communication
- ✅ Connection state management
- ✅ Message persistence

#### SignalR Configuration

The backend handles:
- WebSocket connections
- Message routing between users
- Connection lifecycle management
- User presence tracking
- Chat session management

See the SignalR hub implementation in the codebase for technical details.

## 🔧 Troubleshooting

### Common Issues

**Database connection fails**:
- Verify SQL Server is running
- Check connection string in appsettings.json
- Ensure database exists or run migrations

**JWT authentication fails**:
- Verify SecretKey matches between configuration and token generation
- Check token expiry time
- Ensure Audience and Issuer URLs are correct

**Migration errors**:
- Delete existing migrations and recreate
- Check for model configuration conflicts
- Ensure database provider (SQL Server) is correct

**Test failures**:
- Ensure test database is accessible
- Check that all NuGet packages are restored
- Verify mock configurations in unit tests

**SignalR connection issues**:
- Verify WebSocket support is enabled
- Check CORS configuration for SignalR endpoints
- Ensure firewall allows WebSocket connections
- Check Azure configuration for WebSocket support

## 📊 Version Information

- **.NET Version**: 10.0
- **Entity Framework Core**: 10.0.2
- **C# Language Version**: 12.0
- **Test Framework**: NUnit 4.4.0 / NUnit 3.13.3
- **BDD Framework**: SpecFlow 3.9.74

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Check existing issues for solutions

## 👨‍💻 Author

**Madhurirao95**

- GitHub: [@Madhurirao95](https://github.com/Madhurirao95)

---

Built with ❤️ using ASP.NET Core 10.0