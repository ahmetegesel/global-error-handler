const defaultOptions = {
  override: true,
};

export default class GlobalErrorHandler {
  constructor() {
    this.errorHandlers = {};
    this.register({ key: 'default', handler: (error) => console.error(error) });
  }

  isRegistered(errorHandlerKey) {
    return !!this.errorHandlers[errorHandlerKey];
  }

  register(errorHandler, options) {
    if (!errorHandler) {
      throw new Error('errorHandler cannot be undefined');
    }

    let { key, handler } = errorHandler;

    if (!key) {
      throw new Error('You must provide a key for the handler.');
    }

    if (typeof key === 'function' && new key() instanceof Error) {
      key = key.name;
    } else if (typeof key !== 'string') {
      throw new Error('You must provide a valid key for the handler.');
    }

    if (!handler || typeof handler !== 'function') {
      throw new Error('You must provide a valid Error handler function.');
    }

    const handlerOptions = { ...defaultOptions, ...options };

    if (this.isRegistered(key) && !handlerOptions.override) {
      return false;
    }

    this.errorHandlers[key] = handler;

    return true;
  }

  handle(error, handlerKey) {
    const handler =
      this.errorHandlers[handlerKey || error.constructor.name] || this.errorHandlers.default;

    handler(error);
  }
}
