"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Req;

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _req = require("../util/req");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description creates an AxiosInstance
 * @param config
 * @return {AxiosInstance}
 * @constructor
 */
function Req(config) {
  var reqConfig = (0, _req.allowedReqProps)(config);
  return _axios2.default.create(reqConfig);
}