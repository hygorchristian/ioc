import { describe } from 'vitest';
import InversionOfControl from '../InversionOfControl';

type Logger = () => string;
type Database = () => boolean;

interface Dependencies {
  'Service/Logger': Logger;
  'Service/Database': Database;
}
describe('Coersion', () => {
  const ioc = new InversionOfControl<Dependencies>();

  it('registers and retrieves a dependency', () => {
    const logger: Logger = () => 'logger';
    ioc.register('Service/Logger', () => logger);

    const result: Logger = ioc.use('Service/Logger');

    expect(result).toBe(logger);
  });

  it('registers and retrieves a singleton dependency', () => {
    const database: Database = () => true;
    ioc.registerSingleton('Service/Database', () => database);

    const result: Database = ioc.use('Service/Database');

    expect(result).toBe(database);
  });

  it('give a typecheck error when using a bind that was not defined', () => {
    const notExisting = 'not existing';

    // @ts-expect-error
    ioc.register('Service/NotExisting', () => notExisting);

    // @ts-expect-error
    const result: never = ioc.use('Service/NotExisting');

    expect(result).toBe(notExisting);
  });

  it('give a typecheck error when no binding is found', () => {
    // @ts-expect-error
    expect(() => ioc.use('Service/NonExistent')).toThrow();
  });
});
