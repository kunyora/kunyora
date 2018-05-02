"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = GenerateCrud;

var _res = require("../res");

var _res2 = _interopRequireDefault(_res);

var _camelcase = require("camelcase");

var _camelcase2 = _interopRequireDefault(_camelcase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description generate the crud methods for making the request
 * @param nouns {string[]|{path,name}[]} the nouns of the RESTFUL API
 * @param req {AxiosInstance} an axios request instance
 * @param method {string}
 * @param accessor {string}
 * @param res {Object}
 * @return {function(config)} the request function
 */
function generateMethod(_ref) {
  var noun = _ref.noun,
      req = _ref.req,
      method = _ref.method,
      accessor = _ref.accessor,
      res = _ref.res;

  return function () {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var newConfig = Object.assign({}, config);
    //@Todo if path is set use the path instead of noun.path
    var path = config.endpoint || noun.path;
    return req(_extends({
      url: "/" + path + "/" + (newConfig.ID ? newConfig.ID : "")
    }, newConfig, {
      method: method
    })).then(function (response) {
      return res.handleThenables((0, _camelcase2.default)(accessor + "-" + noun.name), accessor, response);
    }).catch(function (err) {
      return res.handleCatchables((0, _camelcase2.default)(accessor + "-" + noun.name), accessor, err);
    });
  };
}

/**
 * @description used by the kunyora factory fn to generate all the  CRUD request for the nouns
 * @param req {axios} the axios request instance
 * @param config {object} the config passed to the kunyora factory function
 * @return {object}
 * @constructor
 */
function GenerateCrud(req, config) {
  var crud = {};
  var res = (0, _res2.default)(config);

  config.nouns.forEach(function (noun) {
    var methods = [["get", "get"], ["create", "post"], ["update", "put"], ["partUpdate", "patch"], ["delete", "delete"]];
    methods.forEach(function (method) {
      crud[(0, _camelcase2.default)(method[0] + "-" + noun.name)] = generateMethod({
        noun: noun,
        req: req,
        method: method[1],
        accessor: method[0],
        res: res
      });
    });
  });
  return crud;
}