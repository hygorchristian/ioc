import { expect } from 'vitest';
import InversionOfControl from '../InversionOfControl';

interface TestDependencies {
  'Service/Logger': { log: (message: string) => void };
  'Service/Database': { query: (sql: string) => any };
}

describe('InversionOfControl', () => {
  let ioc: InversionOfControl<TestDependencies>;

  beforeEach(() => {
    ioc = new InversionOfControl<TestDependencies>();
  });

  it('registers and retrieves a dependency', () => {
    const logger = { log: vitest.fn() };
    ioc.register('Service/Logger', () => logger);
    expect(ioc.use('Service/Logger')).toBe(logger);
  });

  it('registers and retrieves a singleton dependency', () => {
    const database = { query: vitest.fn() };
    ioc.registerSingleton('Service/Database', () => database);
    expect(ioc.use('Service/Database')).toBe(database);
    // Ensure singleton behavior
    expect(ioc.use('Service/Database')).toBe(database);
  });

  it('enables and uses mocks correctly', () => {
    // Arrange
    const logger = { log: vitest.fn() };
    const mockLogger = { log: vitest.fn() };

    // Act
    ioc.register('Service/Logger', () => logger);
    ioc.mock('Service/Logger', () => mockLogger);
    ioc.enableMocks();

    // Assert
    expect(ioc.use('Service/Logger')).toBe(mockLogger);
  });

  it('disables mocks and returns original instances', () => {
    const logger = { log: vitest.fn() };
    const mockLogger = { log: vitest.fn() };
    ioc.register('Service/Logger', () => logger);
    ioc.mock('Service/Logger', () => mockLogger);
    ioc.enableMocks();
    ioc.disableMocks();
    expect(ioc.use('Service/Logger')).toBe(logger);
  });

  it('throws when no binding is found', () => {
    // @ts-expect-error
    expect(() => ioc.use('Service/NonExistent')).toThrow();
  });

  it('clear all mocks', () => {
    const logger = 'original logger';
    const mockLogger = 'mock logger';
    ioc.register('Service/Logger', () => logger);
    ioc.mock('Service/Logger', () => mockLogger);

    ioc.enableMocks();

    expect(ioc.use('Service/Logger')).toBe(mockLogger);

    ioc.clearMocks();

    expect(ioc.use('Service/Logger')).toBe(logger);
    expect(ioc.use('Service/Logger')).not.toBe(mockLogger);
  });

  // Additional tests for clearMocks, etc.
});
