"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var thenables = _ref.thenables,
      catchables = _ref.catchables;
  return {
    /**
     * @description handles response that were successful
     * @param _name {string} name of the noun object
     * @param _method {string} the name of http method
     * @param _resObj {axios.response} the axios response
     * @return {Object}
     */
    handleThenables: function handleThenables(_name, _method, _resObj) {
      var _isNameAvailableInCal = this.isNameAvailableInCallables(_name, _method, thenables),
          found = _isNameAvailableInCal.found,
          index = _isNameAvailableInCal.index,
          wasFoundThroughMethod = _isNameAvailableInCal.wasFoundThroughMethod;

      if (found) {
        return wasFoundThroughMethod ? thenables[Object.keys(thenables)[index]](_resObj, _name) : thenables[Object.keys(thenables)[index]](_resObj);
      } else {
        return _resObj;
      }
    },

    /**
     * @description handles response that where failure
     * @param _name {string} name of the noun object
     * @param _method {string} the name of http method
     * @param _errorObj {Error} the AxiosInstance response
     * @return {*}
     */
    handleCatchables: function handleCatchables(_name, _method, _errorObj) {
      var _isNameAvailableInCal2 = this.isNameAvailableInCallables(_name, _method, catchables),
          found = _isNameAvailableInCal2.found,
          index = _isNameAvailableInCal2.index,
          wasFoundThroughMethod = _isNameAvailableInCal2.wasFoundThroughMethod;

      if (found) {
        return wasFoundThroughMethod ? catchables[Object.keys(catchables)[index]](_errorObj, _name) : catchables[Object.keys(catchables)[index]](_errorObj);
      } else {
        throw new Error(_errorObj);
      }
    },

    /**
     * @description checks if the name or method ha been defined in the thenables or catchables object
     * @param _name {string} name of method that made the request
     * @param _method {string} http method name
     * @param _callable {{thenables,catchables}} the thenables or catchables object
     * @return {{found,wasFoundThroughMethod,index}} Object which gives infomation on if a callable was found, was found through
     * the method name and the index it was found
     */
    isNameAvailableInCallables: function isNameAvailableInCallables(_name, _method, _callable) {
      var _result = {},
          _index = undefined,
          _tranformedArray = Object.keys(_callable).map(function (obj) {
        return obj.toLowerCase();
      });

      var index = _tranformedArray.indexOf(_name.toLowerCase());
      if (index !== -1) {
        _result = { found: true, wasFoundThroughMethod: false, index: index };
      } else {
        var _methodIndex = _tranformedArray.indexOf(_method.toLowerCase());
        if (_methodIndex !== -1) {
          _result = {
            found: true,
            wasFoundThroughMethod: true,
            index: _methodIndex
          };
        } else {
          _result = { found: false, wasFoundThroughMethod: false, index: -1 };
        }
      }
      return _result;
    }
  };
};