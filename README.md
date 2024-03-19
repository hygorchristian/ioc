# IOC - Inversion of Control

A lightweight and flexible dependency injection container for Node.js, designed to simplify the management of service dependencies in your applications. The `ioc` package provides a straightforward approach to implementing inversion of control, supporting singleton and transient service lifetimes, and facilitating testing with mock implementations.


## Table of Contents

- [Features :sparkles:](#features-sparkles)
- [Installation :package:](#installation-package)
- [Quick Start :rocket:](#quick-start-rocket)
- [Documentation :books:](#documentation-books)
- [Contributing :handshake:](#contributing-handshake)
- [Issues and Feature Requests :mag:](#issues-and-feature-requests-mag)
- [License :balance_scale:](#license-balance_scale)

## Features :sparkles:

- **Simple API**: Intuitive methods for registering, resolving, and mocking dependencies.
- **Support for Mocks**: Easily replace real implementations with mocks for testing.
- **Singletons and Transient Services**: Choose between single instance (singleton) or multiple instances (transient) for your services.
- **TypeScript Support**: Fully typed for excellent IntelliSense and type checking.

## Installation :package:

```bash
npm install @hygorchristian/ioc
# or
yarn add @hygorchristian/ioc
```

## Quick Start :rocket:

### Creating an IoC Container

Import `InversionOfControl` from the package and instantiate it:

```ts
import InversionOfControl from '@hygorchristian/ioc';

// Define your container contract
interface Dependencies {
  'Core/Env': Env;
  'Service/Database': Database;
}

const ioc = new InversionOfControl<Dependencies>();
```

> **Note**: The `Dependencies` interface is used to define the contract of your container.
> It should contain the keys of your services and their respective types. This is optional, but recommended for better type checking and IntelliSense.

### Registering Services

Register your services with the container:

```ts
// Register a transient service
ioc.register('Core/Env', () => new Env());

// Register a service that depends on another service
ioc.register('Service/Database', (dependencies) => {
  const env = dependencies.use('Core/Env');
  return new Config(env);
})

// Register a singleton service that depends on another service
ioc.registerSingleton('Service/Database', (dependencies) => {
  const config = dependencies.use('Service/Config');
  return new Database(config)
});
```

> **Note**: It's recommended to register your services in the entry point of your application, such as `index.ts` or `app.ts` if you want your dependencies to be globally available.

### Resolving Services

Resolve an instance of your service:

```ts
const database = ioc.use('Service/Database');
```

### Using Mocks for Testing

Replace implementations with mocks for testing purposes:

```ts
ioc.mock('Service/Database', () => new MockDatabase());
ioc.enableMocks();
const mockDatabase = ioc.use('Service/Database');
```

## Documentation :books:

For detailed documentation, including advanced features and examples, visit [GitHub repository documentation](https://github.com/hygorchristian/ioc).

## Contributing :handshake:

Contributions are welcome! Please refer to the [contribution guidelines](https://github.com/hygorchristian/ioc/CONTRIBUTING.md) for more information.

## Issues and Feature Requests :mag:

Encountered a bug or have an idea? Please open an issue on the [GitHub Issue Tracker](https://github.com/hygorchristian/ioc/issues).

## License :balance_scale:

`ioc` is licensed under the MIT License. See the [LICENSE](https://github.com/hygorchristian/ioc/LICENSE.md) file for more details.
