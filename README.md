[![Coverage Status](https://codecov.io/gh/ahmetegesel/global-error-handler/branch/master/graph/badge.svg)](https://codecov.io/gh/ahmetegesel/global-error-handler)
[![npm version](https://badge.fury.io/js/global-error-handler.svg)](https://badge.fury.io/js/global-error-handler)

# global-error-handler
This package is for handling error in any type of Javascript application in an aspect oriented way.

## Installation
```
npm install global-error-handler
```

## Why would you need this?

Main idea of this implementation is to handle different types of errors in their
own custom way without introducing handler implementation to the code where you
throw the error. 

You would reap the benefit of this package in an application that you would have
multiple types of `errors` and each of them has different way of being handled.

To understand better, see the _**Usage**_ section.

## Usage
There are two ways of registering an `ErrorHandler`.

### Register with a unique 'string' key
```
// someMain.js

const globalErrorHandler = new GlobalErrorHandler();

const someHandler = error => {
 // processing error code comes here
}

globalErrorHandler.register({
    key: 'someKey',
    handler: someHandler
})

// someComponent.js

const globalErrorHandler = require('./path/to/global-error-handler/instance')

globalErrorHandler.handle(new Error('Some Error'), 'someError');

...

const someError = { message: 'someError' };
globalErrorHandler.handle(someError, 'someError');

...
```

### Register with an `Error` class
You can also reigster an `ErrorHandler` by passing a class which inherits `Error`
class which is defined by default in Javascript.

This way you can have the benefit of being able to use `throw` keyword and make your app
catch the error and pass it to `GlobalErrorHandler` to handle it.
```
// someMain.js

const globalErrorHandler = new GlobalErrorHandler();

class SomeError extends Error {}

const someHandler = error => {
 // processing error code comes here
}

globalErrorHandler.register({
    key: SomeError,
    handler: someHandler
})

// in a browser app
window.onerror = (message, url, line, column, error) => {
  globalErrorHandler.handle(error);
};

// someComponent.js
const SomeError = require('./path/to/SomeError');

...
throw new SomeError('Some message');
...
```
