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

## 🏠 About

DREAMHOMES is an application designed to help users find and explore their ideal homes. Built with Angular 17, it features interactive maps, location-based search with geocoding, and real-time updates through SignalR integration.

## ✨ Features

- 🗺️ Interactive maps powered by Leaflet
- 📍 Location-based search with Geoapify geocoding autocomplete
- 🎨 Modern UI with Angular Material components
- 🔄 Real-time updates via SignalR
- 📱 Responsive design for all devices

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

## 👨‍💻 Author

**Madhurirao95**

- GitHub: [@Madhurirao95](https://github.com/Madhurirao95)

---

Built with ❤️ using Angular 17