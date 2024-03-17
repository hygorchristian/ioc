# ioc :electric_plug:

A lightweight and flexible dependency injection container for Node.js, designed to simplify the management of service
dependencies in your applications.

## Features :sparkles:

- **Simple API**: Easy to use for registering and resolving dependencies.
- **Support for Mocks**: Facilitates testing by allowing the substitution of mock implementations.
- **Singletons and Transient Services**: Supports both single instance and multiple instances service lifetimes.

## Installation :package:

Install `ioc` using npm:

```bash
npm install @hygorchristian/ioc
```

Or using yarn:

```bash
yarn add @hygorchristian/ioc
```

## Quick Start :rocket:

First, import `IoC` and create an instance of your container:

```ts
import IoC from '@hygorchristian/ioc';

const ioc = new IoC();
```

Next, register some services:

```ts
ioc.singleton('ServiceName', () => new Service());
```

And use them:

```ts
const serviceInstance = ioc.use('ServiceName');
```

## Examples :bulb:

Here's a basic example of setting up `IoC` in a Node.js application:

```ts
import IoC from '@hygorchristian/ioc';
import {MyService} from './services/MyService';

const ioc = new IoC();

ioc.singleton('MyService', () => new MyService());

const myService = ioc.use('MyService');
```

For a more detailed guide and advanced usage, please refer to the [documentation]().

## Contributing :handshake:

We welcome contributions to `ioc`! If you have suggestions, bug reports, or contributions, please open an issue or pull
request on our [GitHub repository](https://github.com/hygorchristian/ioc).

## Reporting Issues :mag:

Found a bug or have a feature request? Please report it using
the [GitHub Issue Tracker](https://github.com/hygorchristian/ioc/issues).

## License :balance_scale:

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
