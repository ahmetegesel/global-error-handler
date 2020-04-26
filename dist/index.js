"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var defaultOptions = {
  override: true
};

var GlobalErrorHandler = /*#__PURE__*/function () {
  function GlobalErrorHandler() {
    _classCallCheck(this, GlobalErrorHandler);

    this.errorHandlers = {};
    this.register({
      key: 'default',
      handler: function handler(error) {
        return console.error(error);
      }
    });
  }

  _createClass(GlobalErrorHandler, [{
    key: "isRegistered",
    value: function isRegistered(errorHandlerKey) {
      return !!this.errorHandlers[errorHandlerKey];
    }
  }, {
    key: "register",
    value: function register(errorHandler, options) {
      if (!errorHandler) {
        throw new Error('errorHandler cannot be undefined');
      }

      var key = errorHandler.key,
          handler = errorHandler.handler;

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

      var handlerOptions = _objectSpread({}, defaultOptions, {}, options);

      if (this.isRegistered(key) && !handlerOptions.override) {
        return false;
      }

      this.errorHandlers[key] = handler;
      return true;
    }
  }, {
    key: "handle",
    value: function handle(error, handlerKey) {
      var handler = this.errorHandlers[handlerKey || error.constructor.name] || this.errorHandlers["default"];
      handler(error);
    }
  }]);

  return GlobalErrorHandler;
}();

exports["default"] = GlobalErrorHandler;