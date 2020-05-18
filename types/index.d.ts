export interface HandlerOptions {
  override: boolean;
}

export interface ErrorHandler {
  key: string;
  handler: Function;
}

export class GlobalErrorHandler {
  register(errorHandler: ErrorHandler, options: HandlerOptions): boolean;
  isRegistered(errorHandlerKey: string): boolean;
  handle(error: Error | any, errorHandlerKey: string): void;
}
