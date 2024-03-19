import {
  type DependenciesMap,
  type DependencyFactory,
  type MockFactory
} from './InversionOfControlContract';

/**
 * @class InversionOfControl
 * @description
 * This class is a simple inversion of control container that allows you to register and retrieve dependencies.
 * @example
 * ```ts
 * interface Dependencies {
 *   'Core/Env': Env;
 *   'Core/Config': Config;
 *   'Service/Database': Database;
 * }
 *
 * const ioc = new InversionOfControl();
 *
 * ioc.register('Core/Env', () => new Env);
 *
 * ioc.register('Core/Config', (dependencies) => {
 *   const env = dependencies.use('Core/Env');
 *   return new Config(env);
 * });
 *
 * ioc.registerSingleton('Service/Database', (dependencies) => {
 *   const config = dependencies.use('Core/Config');
 *   return new Database(config);
 * });
 * ```
 */
export default class InversionOfControl<
  ContainerContract extends DependenciesMap,
  Namespace extends keyof ContainerContract = keyof ContainerContract
> {
  /**
   * @description
   * Map of registered dependencies.
   * @private
   */
  private readonly dependencies = new Map<Namespace, DependencyFactory>();

  /**
   * @description
   * Map of registered instances for singletons.
   * @private
   */
  private readonly instances = new Map<Namespace, any>();

  /**
   * @description
   * Map of registered mocks.
   * @private
   */
  private readonly mocks = new Map<Namespace, MockFactory>();

  /**
   * @description
   * Flag to enable or disable the use of mocks.
   * @private
   */
  private useMocksFlag: boolean = false;

  /**
   * @description
   * Enables the use of mocks.
   * @example
   * ```ts
   * const ioc = new InversionOfControl();
   * ioc.enableMocks();
   * ioc.use('Service/Logger'); // Returns the mock
   * ```
   * @returns {this}
   */
  enableMocks(): this {
    this.useMocksFlag = true;
    return this;
  }

  /**
   * @description
   * Disables the use of mocks.
   * @example
   * ```ts
   * const ioc = new InversionOfControl();
   * ioc.enableMocks();
   * ioc.use('Service/Logger'); // Returns the mock
   * ioc.disableMocks();
   * ioc.use('Service/Logger'); // Returns the original instance
   * ```
   */
  disableMocks(): this {
    this.useMocksFlag = false;
    return this;
  }

  /**
   * @description
   * Clears all registered mocks.
   * @example
   * ```ts
   * const ioc = new InversionOfControl();
   * ioc.mock('Service/Logger', () => ({ log: jest.fn() }));
   * ioc.clearMocks();
   * ioc.use('Service/Logger'); // Returns the original instance
   * ```
   * @returns {this}
   */
  clearMocks(): this {
    this.mocks.clear();
    return this;
  }

  /**
   * @description
   * Registers a dependency for a given namespace.
   * @example
   * ```ts
   * const ioc = new InversionOfControl();
   * ioc.register('Service/Logger', () => ({ log: console.log }));
   * const logger = ioc.use('Service/Logger'); // Returns the original instance
   * logger.log('Hello, world!');
   * ```
   * @param namespace
   * @param dependencyFactory
   */
  register(namespace: Namespace, dependencyFactory: DependencyFactory): this {
    this.dependencies.set(namespace, dependencyFactory);
    return this;
  }

  /**
   *
   * @param namespace
   * @param singletonFactory
   * @description
   * Registers a singleton for a given namespace.
   * @example
   * ```ts
   * const ioc = new InversionOfControl();
   * ioc.registerSingleton('Service/Logger', () => ({ log: console.log }));
   * const logger = ioc.use('Service/Logger'); // Returns the original instance
   * logger.log('Hello, world!');
   * ```
   */
  registerSingleton(
    namespace: Namespace,
    singletonFactory: DependencyFactory
  ): this {
    const instance = this.instances.get(namespace);
    if (!instance) {
      // @ts-expect-error
      this.instances.set(namespace, singletonFactory(this));
    }
    return this;
  }

  /**
   * @description
   * Registers a mock for a given namespace.
   * @param namespace
   * @param mockFactory
   * @example
   * ```ts
   * const ioc = new InversionOfControl();
   * ioc.mock('Service/Logger', () => ({ log: jest.fn() }));
   * ioc.enableMocks();
   * ioc.use('Service/Logger'); // Returns the mock
   * ```
   */
  mock<Namespace extends keyof ContainerContract>(
    namespace: Namespace,
    mockFactory: MockFactory
  ): this {
    // @ts-expect-error
    this.mocks.set(namespace, mockFactory);
    return this;
  }

  /**
   * @description
   * Retrieves a dependency from the container.
   * @example
   * ```ts
   * const ioc = new InversionOfControl();
   * ioc.register('Service/Logger', () => ({ log: console.log }));
   * ioc.use('Service/Logger'); // Returns the original instance
   * ```
   * @param namespace
   */
  use(namespace: Namespace): ContainerContract[Namespace] {
    if (this.useMocksFlag) {
      const mockFactory = this.mocks.get(namespace);
      if (mockFactory) {
        const originalValue = this.getOriginalValue(namespace);
        // @ts-expect-error
        return mockFactory(this, originalValue) as ContainerContract[Namespace];
      }
    }

    return this.getOriginalValue(namespace);
  }

  /**
   * @description
   * Retrieves the original value for a given namespace.
   * @param namespace
   * @private
   */
  private getOriginalValue(namespace: Namespace): ContainerContract[Namespace] {
    const instance = this.instances.get(namespace);
    if (instance) {
      return instance as ContainerContract[Namespace];
    }

    const factory = this.dependencies.get(namespace);
    if (!factory) {
      throw new Error(`No binding found for key: ${String(namespace)}`);
    }

    // @ts-expect-error
    return factory(this) as ContainerContract[Namespace];
  }
}
