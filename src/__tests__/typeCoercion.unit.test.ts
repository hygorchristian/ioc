/*
 * @hygorchristian/ioc
 *
 * Copyright (c) 2024 Hygor Christian Dias <hygor.christian@gmail.com>.
 *
 * For the full copyright and license information, please view the LICENSE file that was distributed with this source code.
 */

import { describe } from 'vitest';
import InversionOfControl from '../InversionOfControl';

type Logger = () => string;
type Database = () => boolean;

interface Dependencies {
  'Service/Logger': Logger;
  'Service/Database': Database;
}

/**
 * @description
 * If this test have type coercion issues, it will work the same way, but we expect to see type errors.
 * This will pass the tests but it will fail the linting, and the package will not be published with linting or type errors
 */
describe('Type Coercion', () => {
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
