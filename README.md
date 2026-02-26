# DREAMHOMES

A modern web application for discovering and managing dream homes, built with Angular 17 and integrated mapping capabilities.

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Development](#development)
- [Build](#build)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Contributing](#contributing)
- [Live Demo](#live-demo)

## 🏠 About

DREAMHOMES is a frontend application designed to help users find and explore their ideal homes. Built with Angular 17, it features interactive maps, location-based search with geocoding, and real-time updates through SignalR integration.

## ✨ Features

- 🗺️ Interactive maps powered by Leaflet
- 📍 Location-based search with Geoapify geocoding autocomplete
- 🎨 Modern UI with Angular Material components
- 🔄 Real-time updates via SignalR
- 📱 Responsive design for all devices
- 🔍 Advanced property search and filtering

## 🛠️ Tech Stack

### Core Framework
- **Angular**: 17.3.12
- **TypeScript**: 5.4.5
- **RxJS**: 7.8.0

### UI & Styling
- **Angular Material**: 17.3.10
- **Angular CDK**: 17.3.10
- **SCSS**: For custom styling

### Mapping & Geolocation
- **Leaflet**: 1.9.4 - Interactive maps
- **Leaflet GeoSearch**: 4.2.2 - Location search functionality
- **Geoapify Geocoder**: 2.0.3 - Geocoding autocomplete

### Real-time Communication
- **Microsoft SignalR**: 9.0.6 - Real-time updates

### Development Tools
- **Angular CLI**: 17.3.9
- **ESLint**: Code quality and linting
- **Karma & Jasmine**: Testing framework

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18.13.0 or higher (recommended for Angular 17)
- **npm**: v9.0.0 or higher
- **Angular CLI**: Install globally with `npm install -g @angular/cli`

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Madhurirao95/dreamhomes.git
cd dreamhomes
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm start
```

4. **Open your browser**
Navigate to `http://localhost:4200/`

The application will automatically reload when you make changes to the source files.

## 💻 Development

### Development Server

Run the development server:
```bash
npm start
# or
ng serve
```

Navigate to `http://localhost:4200/`. The application will hot-reload on file changes.

### Code Scaffolding

Generate new components, services, and other Angular elements:

```bash
# Generate a new component
ng generate component components/component-name

# Generate a service
ng generate service services/service-name

# Generate other elements
ng generate directive|pipe|guard|interface|enum|module
```

### Code Quality

This project uses **ESLint** with TypeScript configuration for code quality and consistency. The linting rules follow the Standard TypeScript configuration.

To run the linter:
```bash
ng lint
```

## 🏗️ Build

### Development Build
```bash
npm run build
# or
ng build
```

### Production Build
```bash
ng build --configuration production
```

The build artifacts will be stored in the `dist/` directory.

### Watch Mode
For continuous building during development:
```bash
npm run watch
```

## 🧪 Testing

### Unit Tests

Execute unit tests via Karma:
```bash
npm test
# or
ng test
```

Tests run in watch mode by default and will re-execute on file changes.

### Test Coverage

Generate code coverage reports:
```bash
ng test --code-coverage
```

Coverage reports will be generated in the `coverage/` directory.

## 📁 Project Structure

```
dreamhomes/
├── .vscode/              # VS Code workspace settings
├── src/
│   ├── app/             # Application components, services, and modules
│   ├── assets/          # Static assets (images, icons, etc.)
│   ├── environments/    # Environment configurations
│   └── styles/          # Global styles
├── angular.json         # Angular CLI configuration
├── package.json         # Project dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── .eslintrc.json       # ESLint configuration
└── README.md           # Project documentation
```

## 📜 Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `npm start` | `ng serve` | Start development server |
| `npm run build` | `ng build` | Build the project |
| `npm run watch` | `ng build --watch --configuration development` | Build in watch mode |
| `npm test` | `ng test` | Run unit tests |
| `npm run lint` | `ng lint` | Run ESLint |

## 🔧 Configuration

### API Keys

If you're using Geoapify services, you may need to configure API keys. Check the environment files in `src/environments/` for configuration options.

### Map Configuration

Leaflet map settings can be customized in the respective component files. Refer to the [Leaflet documentation](https://leafletjs.com/) for available options.

## 📚 Additional Resources

- [Angular Documentation](https://angular.io/docs)
- [Angular Material Components](https://material.angular.io/components)
- [Leaflet Documentation](https://leafletjs.com/)
- [Geoapify Documentation](https://www.geoapify.com/docs)
- [SignalR Documentation](https://docs.microsoft.com/en-us/aspnet/core/signalr/)

## 🌐 Live Demo

The application is deployed and accessible at:
- **Live Application**: [https://dreamhomes-7hqb.vercel.app/](https://dreamhomes-7hqb.vercel.app/)
- **Frontend Hosting**: Vercel
- **Backend API**: Azure App Service (Free Tier)

> **Important**: This API is hosted on Azure's free tier, which has daily usage quotas and resource limitations. If the API is unresponsive or the live demo is not working, the daily quota may have been exceeded. For local setup instructions, please refer to the [Getting Started](#getting-started) section, or contact [madhurirao95@gmail.com](mailto:madhurirao95@gmail.com) to schedule a personal demonstration.

### Testing Real-Time Chat Feature

DREAMHOMES includes real-time chat functionality powered by SignalR, allowing buyers to connect with agents instantly. To test this feature:

#### Setup Instructions

1. **Open two separate browser sessions:**
   - Browser A: Normal window
   - Browser B: Incognito/Private window (or different browser)

2. **Login with test accounts:**
   - **Browser A (Buyer)**: 
     - Email: `test@gmail.com`
     - Password: `Test@123`
   - **Browser B (Agent)**: 
     - Email: `agent@gmail.com`
     - Password: `Test@123`

#### Testing the Chat

**In Browser A (Buyer Account):**
1. Browse available property listings
2. Click on any property address to view details
3. Scroll to the bottom of the property details page
4. Click the **"Chat with a Local Expert!"** button in the bottom-right corner
5. The chat dialog will open

**In Browser B (Agent Account):**
1. You will see an incoming chat request from `test@gmail.com`
2. Click **"Accept"** to start the conversation

**Observe Real-Time Features:**
- ✅ Messages appear instantly on both sides
- ✅ No page refresh required
- ✅ Live typing indicators
- ✅ Real-time connection status

This demonstrates the SignalR integration enabling seamless communication between users.

## 👨‍💻 Author

**Madhurirao95**

- GitHub: [@Madhurirao95](https://github.com/Madhurirao95)

---

Built with ❤️ using Angular 17