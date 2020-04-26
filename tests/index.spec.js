import GlobalErrorHandler from '../src';

test('register should throw error when errorHandler is not given', () => {
  const globalErrorHandler = new GlobalErrorHandler();
  expect(() => globalErrorHandler.register(undefined)).toThrowError(
    'errorHandler cannot be undefined'
  );
});

test('register should throw error when key or handler is not given in errorHandler parameter', () => {
  const globalErrorHandler = new GlobalErrorHandler();

  const errorHandler1 = {
    key: undefined,
    handler: jest.fn(),
  };

  const errorHandler2 = {
    key: {},
    handler: jest.fn(),
  };

  const errorHandler3 = {
    key: 'someErrorHandler3',
    handler: undefined,
  };

  const errorHandler4 = {
    key: 'someErrorHandler4',
    handler: {},
  };

  expect(() => globalErrorHandler.register(errorHandler1)).toThrowError(
    'You must provide a key for the handler.'
  );
  expect(() => globalErrorHandler.register(errorHandler2)).toThrowError(
    'You must provide a valid key for the handler.'
  );
  expect(() => globalErrorHandler.register(errorHandler3)).toThrowError(
    'You must provide a valid Error handler function.'
  );
  expect(() => globalErrorHandler.register(errorHandler4)).toThrowError(
    'You must provide a valid Error handler function.'
  );
});

test('register should register given errorHandler', () => {
  const globalErrorHandler = new GlobalErrorHandler();

  const errorHandler = {
    key: 'errorHandler',
    handler: jest.fn(),
  };

  globalErrorHandler.register(errorHandler);

  expect(globalErrorHandler.errorHandlers[errorHandler.key]).toEqual(errorHandler.handler);
});

test('register should do nothing when there is already register handler with given key and override option is true', () => {
  const globalErrorHandler = new GlobalErrorHandler();

  const errorHandler = {
    key: 'errorHandler',
    handler: jest.fn(),
  };

  const status1 = globalErrorHandler.register(errorHandler, {
    override: false,
  });
  const status2 = globalErrorHandler.register(errorHandler, {
    override: false,
  });

  expect(status1).toBe(true);
  expect(status2).toBe(false);
});

test('register should override existing handler when override option is true', () => {
  const globalErrorHandler = new GlobalErrorHandler();

  const errorHandler1 = {
    key: 'errorHandler',
    handler: jest.fn().mockName('errorHandler1'),
  };
  const errorHandler2 = {
    key: 'errorHandler',
    handler: jest.fn().mockName('errorHandler2'),
  };

  const status1 = globalErrorHandler.register(errorHandler1, {
    override: false,
  });
  const status2 = globalErrorHandler.register(errorHandler2, {
    override: true,
  });

  expect(status1).toBe(true);
  expect(status2).toBe(true);
  expect(globalErrorHandler.errorHandlers['errorHandler']).toEqual(errorHandler2.handler);
});

test('handle should invoke handler with the given key', () => {
  const globalErrorHandler = new GlobalErrorHandler();

  const handler = jest.fn();
  const errorHandler = {
    key: 'errorHandler',
    handler,
  };

  globalErrorHandler.register(errorHandler);

  globalErrorHandler.handle(new Error(), errorHandler.key);

  expect(handler).toHaveBeenCalledTimes(1);
});

test('handle should be able to decide which handler to invoke by the constructor name of the given Error', () => {
  const globalErrorHandler = new GlobalErrorHandler();

  class SomeError extends Error {}

  const handler = jest.fn((error) => error);
  const errorHandler = {
    key: SomeError,
    handler,
  };

  globalErrorHandler.register(errorHandler);

  const error = new SomeError('SomeError');
  globalErrorHandler.handle(error);

  expect(handler).toHaveBeenNthCalledWith(1, error);
});

test('handle should invoke default handler when there is no applicable custom error handler', () => {
  const globalErrorHandler = new GlobalErrorHandler();

  const handler = jest.fn((error) => error);
  const errorHandler = {
    key: 'default',
    handler,
  };

  globalErrorHandler.register(errorHandler, {
    override: true,
  });

  const error = new Error('Some Error');
  globalErrorHandler.handle(error);

  expect(handler).toHaveBeenNthCalledWith(1, error);
});
