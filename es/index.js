"use strict";

var _req2 = require("./req");

var _req3 = _interopRequireDefault(_req2);

var _crudGen = require("./crud-gen");

var _crudGen2 = _interopRequireDefault(_crudGen);

var _option = require("./option");

var _option2 = _interopRequireDefault(_option);

var _events = require("./events");

var _events2 = _interopRequireDefault(_events);

var _store = require("./store");

var _store2 = _interopRequireDefault(_store);

var _middlewares = require("./middlewares");

var _middlewares2 = _interopRequireDefault(_middlewares);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This function is used to create the client instance. It accepts an object of configs
 * and formats them to return a client instance
 *
 * Used in the form
 * ```
 *    const clientInstance = kunyoraClient({...config})
 *
 * ```
 *
 * @return {object}
 * @param {object} config
 */
function kunyoraClient(config) {
  var opt = (0, _option2.default)(config);
  var _req = (0, _req3.default)(opt);
  var _emitter = new _events2.default();
  var _crud = (0, _crudGen2.default)(_req, opt);
  var _middleware = (0, _middlewares2.default)(opt);
  return Object.assign({}, _emitter, _req, _crud, _middleware, { store: _store2.default });
}

module.exports = kunyoraClient;

try {
  window.KunyoraClient = module.exports;
} catch (err) {
  // do nothing
}