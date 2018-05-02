"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = Option;

var _invariant = require("invariant");

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultConfig = {
  nouns: [],
  thenables: {},
  catchables: {},
  headers: {}
};

/**
 * This function re-formats the config object supplied by the user by concatenating the object with a default config
 * used by the application
 * It returns an object containing the reformatted config along with the nouns generated from the url configs supplied by the user
 *
 * @return {Object}
 * @param {object} config
 *
 */
function Option(config) {
  var option = Object.assign({}, defaultConfig, config);
  option.nouns = generateNouns(option);
  //@Todo validate thenables and catchables
  return option;
}

/**
 * This simple function formats the path supplied by the user in the config such that it appears as if its camelCased
 * For instance, path: admin/login becomes adminLogin.
 * removes all alphabets that comes after a forward slash and replaces them by a camelCased representation of the alphabet itself
 *
 * @return {string}
 * @param {string} name
 */
function formatSlash(name) {
  return name.replace(/\/+(\w)/g, function (m, p1) {
    return p1.toUpperCase();
  });
}

/**
 * This function generates a standard noun that the application uses internally
 * The standard noun basically has the structure {path: value, name: value}
 * It generate the standard noun by also formatting the name property using the [formatSlash] helper function
 *
 * @return {Array}
 * @param nouns {string[]|object[]}
 */
function generateNouns(_ref) {
  var _ref$nouns = _ref.nouns,
      nouns = _ref$nouns === undefined ? [] : _ref$nouns;

  return nouns.map(function (noun, index) {
    if (typeof noun === "string") {
      validateNounString(noun);
      return { path: noun, name: formatSlash(noun) };
    } else if ((typeof noun === "undefined" ? "undefined" : _typeof(noun)) === "object" && noun !== null) {
      validateNounObject(noun);
      return { path: noun.path, name: formatSlash(noun.name) };
    } else {
      throw Error("Error: all nouns should either be a string or an object");
    }
  });
}

/**
 * This function simply validates the nouns which are of type string
 *
 * @param {string} str
 * @param {string} type
 */
function validateNounString(str, type) {
  (0, _invariant2.default)(typeof str === "string", "Error: " + !!type ? "property " + type + " in noun not a string" : "noun passed is not a string");
  (0, _invariant2.default)(/^[0-9a-zA-Z_/]+$/.test(str), "Error: " + !!type ? "property " + type + " in noun contains invalid char. alphanumeric and underscore allowed" : " noun contains invalid char. alphanumeric and underscore allowed");
}

/**
 * This function validates nouns of type object by using validateNounString internally
 *
 * @param {object{string, string}} param0
 */
function validateNounObject(_ref2) {
  var path = _ref2.path,
      name = _ref2.name;

  validateNounString(path, "path");
  validateNounString(name, "name");
}